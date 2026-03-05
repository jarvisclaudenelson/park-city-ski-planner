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

/** BFS using ONLY lift edges → Map<summitArea, liftSegArray>
 *  maxHops limits how many consecutive lifts we chain (default 2).
 *  This prevents routes with 3+ lifts in a row without a run. */
function liftsOnlyBFS(graph, startArea, maxHops = 2) {
  const reached = new Map([[startArea, []]]);
  const queue   = [startArea];
  while (queue.length) {
    const cur  = queue.shift();
    const hops = reached.get(cur).length;
    if (hops >= maxHops) continue;
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

// Areas at the base of the resort — penalise trails that dump you here mid-day
const BASE_AREA_SET = new Set(['town', 'park_city_base', 'canyons_base', 'frostwood', 'lower_mountain_pc']);

function scoreTrail(trailEdge, areaVisitCounts, trailVisitCounts, preferred, optimizeFor) {
  let s = 0;
  if (preferred.includes(trailEdge.edge.difficulty)) s += 6;
  const trailVisits = trailVisitCounts.get(trailEdge.edge.id) || 0;
  if (trailVisits === 0)      s += 8;   // bonus for new trail
  else                        s -= trailVisits * 6; // increasing penalty for repeats
  const areaVisits = areaVisitCounts.get(trailEdge.to) || 0;
  if (areaVisits === 0)       s += (optimizeFor === 'coverage' ? 10 : 4);
  else                        s -= areaVisits * 2;  // penalty for revisiting areas
  // Penalise trails ending at base areas — keeps skiers mid-mountain
  if (BASE_AREA_SET.has(trailEdge.to)) s -= 10;
  return s;
}

function scoreLiftPath(liftPath, summit, areaVisitCounts, visitedLifts, optimizeFor) {
  let s = 0;
  const summitVisits = areaVisitCounts.get(summit) || 0;
  if (summitVisits === 0)                                             s += (optimizeFor === 'coverage' ? 12 : 4);
  else                                                                s -= summitVisits * 2;
  if (liftPath.some(l => !visitedLifts.has(l.id)))                   s += 4;
  // Mild penalty for 2-lift chains (common for getting up from base); steep for 3+
  s -= (liftPath.length - 1) * 3;
  return s;
}

/**
 * Generate one lap: BFS lifts from `area`, then pick the highest-scoring
 * trail from any reachable summit.
 * Returns { liftSegs, trailSeg, nextArea } or null.
 */
function oneLap(graph, area, areaVisitCounts, trailVisitCounts, visitedLifts, preferred, optimizeFor) {
  let best = null, bestScore = -Infinity;

  // Helper: evaluate all lift→trail options from a given start area, optionally
  // prefixed by a connecting trail segment.
  function evaluate(startArea, connectTrailSeg) {
    const reachable = liftsOnlyBFS(graph, startArea);
    for (const [summit, liftPath] of reachable) {
      if (summit === startArea && liftPath.length === 0) continue;
      const liftScore = scoreLiftPath(liftPath, summit, areaVisitCounts, visitedLifts, optimizeFor);

      for (const trailEdge of trailEdgesFrom(graph, summit)) {
        // Don't ski the same connecting trail we just used
        if (connectTrailSeg && trailEdge.edge.id === connectTrailSeg.id) continue;
        const tScore = scoreTrail(trailEdge, areaVisitCounts, trailVisitCounts, preferred, optimizeFor);
        let total = liftScore + tScore;
        // Small penalty for needing a connector trail (prefer direct lifts)
        if (connectTrailSeg) total -= 2;
        if (total > bestScore) {
          bestScore = total;
          const liftSegs = connectTrailSeg ? [connectTrailSeg, ...liftPath] : liftPath;
          best = {
            liftSegs,
            trailSeg: { ...trailEdge.edge, from: summit, to: trailEdge.to },
            nextArea: trailEdge.to,
          };
        }
      }
    }
  }

  // Phase 1: direct lifts from current area
  evaluate(area, null);

  // Phase 2: ski a connecting trail to another non-base area, then take lifts
  // from there. This handles cases like silverlode → Claimjumper → mid_mountain → lift.
  for (const trailEdge of trailEdgesFrom(graph, area)) {
    const dest = trailEdge.to;
    if (dest === area) continue;              // no loops
    if (BASE_AREA_SET.has(dest)) continue;    // don't route through base
    const connSeg = { ...trailEdge.edge, from: area, to: dest, type: 'trail' };
    evaluate(dest, connSeg);
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
  // Use visit count maps so repeated visits get increasing penalties
  const areaVisitCounts  = new Map();  // area → visit count
  const trailVisitCounts = new Map();  // trail_id → visit count
  const visitedLifts     = new Set();
  // Pre-mark base areas with high counts so the algorithm avoids routing there
  const BASE_AREAS = ['town', 'park_city_base', 'canyons_base', 'frostwood', 'lower_mountain_pc'];
  BASE_AREAS.forEach(a => areaVisitCounts.set(a, 5));
  areaVisitCounts.set(startArea, (areaVisitCounts.get(startArea) || 0) + 1);
  let   lunchDone    = false;
  const lunchAt      = Math.ceil(maxLaps / 2);

  for (let lap = 0; lap < maxLaps; lap++) {
    // Lunch break at midpoint
    if (lunchStop && !lunchDone && lap === lunchAt && lunchChalet) {
      if (current !== lunchChalet.area) {
        const visitedAreaSet = new Set(areaVisitCounts.keys());
        const path = dijkstra(graph, current, lunchChalet.area, { ...opts, visitedAreas: visitedAreaSet })
                  || bfs(graph, current, lunchChalet.area);
        if (path?.length) {
          raw.push(...path);
          path.forEach(s => {
            areaVisitCounts.set(s.to, (areaVisitCounts.get(s.to) || 0) + 1);
            areaVisitCounts.set(s.from, (areaVisitCounts.get(s.from) || 0) + 1);
          });
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

    const lap_ = oneLap(graph, current, areaVisitCounts, trailVisitCounts, visitedLifts, preferred, optimizeFor);
    if (!lap_) break;

    // Add approach segments (connecting trail + lifts)
    lap_.liftSegs.forEach(seg => {
      raw.push(seg);
      areaVisitCounts.set(seg.to, (areaVisitCounts.get(seg.to) || 0) + 1);
      if (seg.type === 'lift') visitedLifts.add(seg.id);
      if (seg.type === 'trail') trailVisitCounts.set(seg.id, (trailVisitCounts.get(seg.id) || 0) + 1);
    });
    // Add main trail
    raw.push(lap_.trailSeg);
    areaVisitCounts.set(lap_.trailSeg.to, (areaVisitCounts.get(lap_.trailSeg.to) || 0) + 1);
    trailVisitCounts.set(lap_.trailSeg.id, (trailVisitCounts.get(lap_.trailSeg.id) || 0) + 1);
    current = lap_.nextArea;
  }

  // Route back to end if needed
  if (current !== endArea) {
    const visitedAreaSet = new Set(areaVisitCounts.keys());
    const returnPath = dijkstra(graph, current, endArea, { ...opts, visitedAreas: visitedAreaSet })
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
