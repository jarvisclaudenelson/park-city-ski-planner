import { buildGraph, bfs, dijkstra, SKILL_LEVELS } from './routeGraph.js';

export { SKILL_LEVELS };

export const CHALETS = [
  { id: 'mid_mountain_lodge', name: 'Mid-Mountain Lodge',  area: 'mid_mountain_pc',   side: 'Park City' },
  { id: 'summit_house',       name: 'Summit House',        area: 'bonanza_area',       side: 'Park City' },
  { id: 'viking_yurt',        name: 'Viking Yurt',         area: 'silverlode_area',    side: 'Park City' },
  { id: 'miners_camp',        name: "Miner's Camp",        area: 'canyons_mid',        side: 'Canyons'   },
  { id: 'norwegian',          name: 'Norwegian',           area: 'dreamcatcher_area',  side: 'Canyons'   },
  { id: 'tombstone_bbq',      name: 'Tombstone BBQ',       area: 'tombstone_canyons',  side: 'Canyons'   },
];

export const START_LOCATIONS = [
  { id: 'park_city_base', name: 'Park City Mountain Village' },
  { id: 'town',           name: 'Park City Town (Town Lift)' },
  { id: 'canyons_base',   name: 'Canyons Village'            },
  { id: 'frostwood',      name: 'Frostwood (Canyons)'        },
];

export const END_LOCATIONS = [
  { id: 'park_city_base', name: 'Park City Mountain Village' },
  { id: 'town',           name: 'Park City Town'             },
  { id: 'canyons_base',   name: 'Canyons Village'            },
];

const LUNCH_DURATION  = 45; // minutes at the chalet
const AVG_LAP_MINUTES = 18; // realistic average including brief rests

function parseTimeToMinutes(timeStr = '09:00') {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function calcMaxLaps(parkOpen, parkClose, hasLunch) {
  const openMin  = parseTimeToMinutes(parkOpen);
  const closeMin = parseTimeToMinutes(parkClose);
  const total    = Math.max(0, closeMin - openMin);
  const skiing   = total - (hasLunch ? LUNCH_DURATION : 0);
  return Math.min(24, Math.max(3, Math.floor(skiing / AVG_LAP_MINUTES)));
}

/* ── Internal helpers ─────────────────────────────────────────────────────── */

/** BFS using ONLY lift edges → Map<summitArea, liftSegArray> */
function liftsOnlyBFS(graph, startArea) {
  const reached = new Map([[startArea, []]]);
  const queue   = [startArea];
  while (queue.length) {
    const cur = queue.shift();
    for (const { to, edge } of (graph[cur] || [])) {
      if (edge.type !== 'lift' || reached.has(to)) continue;
      const path = [...reached.get(cur), { ...edge, from: cur, to }];
      reached.set(to, path);
      queue.push(to);
    }
  }
  return reached; // Map<area, liftSeg[]>
}

function trailEdgesFrom(graph, area) {
  return (graph[area] || []).filter(e => e.edge.type === 'trail');
}

function scoreTrail(trailEdge, visitedAreas, visitedTrails, preferred, optimizeFor) {
  let s = 0;
  if (preferred.includes(trailEdge.edge.difficulty)) s += 6;
  if (!visitedTrails.has(trailEdge.edge.id))         s += 8;  // strong bonus for new trail
  if (!visitedAreas.has(trailEdge.to))               s += (optimizeFor === 'coverage' ? 10 : 4);
  return s;
}

function scoreLiftPath(liftPath, summit, visitedAreas, visitedLifts, optimizeFor) {
  let s = 0;
  if (!visitedAreas.has(summit))                                      s += (optimizeFor === 'coverage' ? 12 : 4);
  if (liftPath.some(l => !visitedLifts.has(l.id)))                   s += 4;
  s -= (liftPath.length - 1) * 1; // minor penalty for multi-lift chains
  return s;
}

/**
 * Generate one lap: BFS lifts from `area`, then pick the highest-scoring
 * trail from any reachable summit.
 * Returns { liftSegs, trailSeg, nextArea } or null.
 */
function oneLap(graph, area, visitedAreas, visitedTrails, visitedLifts, preferred, optimizeFor) {
  const reachable = liftsOnlyBFS(graph, area);

  let best = null, bestScore = -Infinity;

  for (const [summit, liftPath] of reachable) {
    if (summit === area && liftPath.length === 0) continue;
    const liftScore = scoreLiftPath(liftPath, summit, visitedAreas, visitedLifts, optimizeFor);

    for (const trailEdge of trailEdgesFrom(graph, summit)) {
      const tScore = scoreTrail(trailEdge, visitedAreas, visitedTrails, preferred, optimizeFor);
      const total  = liftScore + tScore;
      if (total > bestScore) {
        bestScore = total;
        best = {
          liftSegs: liftPath,
          trailSeg: { ...trailEdge.edge, from: summit, to: trailEdge.to },
          nextArea: trailEdge.to,
        };
      }
    }
  }
  return best;
}

/* ── Public API ───────────────────────────────────────────────────────────── */

export function planRoute(trailData, config) {
  const {
    startArea,
    endArea,
    skillLevel     = 'intermediate',
    optimizeFor    = 'terrain',
    lunchStop      = false,
    lunchChalet    = null,
    closedLifts    = [],
    closedTrails   = [],
    bannedSegments = new Set(),
    parkOpen       = '09:00',
    parkClose      = '16:00',
  } = config;

  if (!startArea || !endArea) return { error: 'Please choose a start and end location.' };

  const allClosedLifts  = [...closedLifts,  ...[...bannedSegments].filter(id =>
    trailData.lifts.find(l => l.id === id))];
  const allClosedTrails = [...closedTrails, ...[...bannedSegments].filter(id =>
    trailData.trails.find(t => t.id === id))];

  const preferred = SKILL_LEVELS[skillLevel] || SKILL_LEVELS.intermediate;
  const graph     = buildGraph(trailData, allClosedLifts, allClosedTrails, preferred);
  const opts      = { preferredDifficulties: preferred, optimizeFor };

  const maxLaps      = calcMaxLaps(parkOpen, parkClose, lunchStop && !!lunchChalet);
  const raw          = [];
  let   current      = startArea;
  // Pre-mark base/village areas as visited so they never get "new area" explore bonuses;
  // skiers don't want to be routed to a base lodge as a fun new destination mid-day.
  const BASE_AREAS   = ['town', 'park_city_base', 'canyons_base', 'frostwood'];
  const visitedAreas = new Set([startArea, ...BASE_AREAS]);
  const visitedTrail = new Set();
  const visitedLifts = new Set();
  let   lunchDone    = false;
  const lunchAt      = Math.ceil(maxLaps / 2);

  for (let lap = 0; lap < maxLaps; lap++) {
    // Lunch break at midpoint
    if (lunchStop && !lunchDone && lap === lunchAt && lunchChalet) {
      if (current !== lunchChalet.area) {
        const path = dijkstra(graph, current, lunchChalet.area, { ...opts, visitedAreas })
                  || bfs(graph, current, lunchChalet.area);
        if (path?.length) {
          raw.push(...path);
          path.forEach(s => { visitedAreas.add(s.to); visitedAreas.add(s.from); });
          current = lunchChalet.area;
        }
      }
      raw.push({
        type: 'lunch', id: `lunch_${lunchChalet.area}`,
        label: `Lunch at ${lunchChalet.name}`, area: lunchChalet.area,
        from: current, to: current,
      });
      lunchDone = true;
    }

    const lap_ = oneLap(graph, current, visitedAreas, visitedTrail, visitedLifts, preferred, optimizeFor);
    if (!lap_) break;

    // Add lift sequence
    lap_.liftSegs.forEach(seg => {
      raw.push(seg);
      visitedAreas.add(seg.to);
      visitedLifts.add(seg.id);
    });
    // Add trail
    raw.push(lap_.trailSeg);
    visitedAreas.add(lap_.trailSeg.to);
    visitedTrail.add(lap_.trailSeg.id);
    current = lap_.nextArea;
  }

  // Route back to end if needed
  if (current !== endArea) {
    const returnPath = dijkstra(graph, current, endArea, { ...opts, visitedAreas })
                    || bfs(graph, current, endArea);
    if (returnPath?.length) {
      raw.push(...returnPath);
    } else if (endArea !== startArea) {
      // Last resort: try with all difficulties open
      const allGraph = buildGraph(trailData, allClosedLifts, [], SKILL_LEVELS.expert);
      const fb = bfs(allGraph, current, endArea);
      if (!fb) return { error: `Couldn't find a route back to your end location from here. Try adjusting skill level or re-opening trails.` };
      raw.push(...fb);
    }
  }

  if (!raw.length) {
    return { error: 'No route could be generated. Try relaxing your skill level or re-opening some lifts/trails.' };
  }

  // Deduplicate back-to-back identical segments (shouldn't happen, but safety net)
  const deduped = raw.filter((seg, i) =>
    i === 0 || !(seg.type === raw[i-1].type && seg.id === raw[i-1].id && seg.from === raw[i-1].from));

  // Annotate with sequence numbers and elapsed time
  let liftNum = 0, runNum = 0, elapsed = 0;
  const DIFF_COST_LOCAL = { easy: 5, more_difficult: 7, most_difficult: 9, experts_only: 12, terrain_park: 4 };
  const segments = deduped.map((seg, idx) => {
    const minutesFromOpen = elapsed;
    if (seg.type === 'lift')  { elapsed += 8; return { ...seg, liftNum: ++liftNum, segIdx: idx, minutesFromOpen }; }
    if (seg.type === 'trail') { elapsed += DIFF_COST_LOCAL[seg.difficulty] ?? 7; return { ...seg, runNum: ++runNum, segIdx: idx, minutesFromOpen }; }
    if (seg.type === 'lunch') { elapsed += LUNCH_DURATION; return { ...seg, segIdx: idx, minutesFromOpen }; }
    return { ...seg, segIdx: idx, minutesFromOpen };
  });

  const runs    = segments.filter(s => s.type === 'trail').length;
  const lifts   = segments.filter(s => s.type === 'lift').length;
  const totalMinutes = elapsed;

  return { segments, runs, lifts, totalMinutes, parkOpen };
}
