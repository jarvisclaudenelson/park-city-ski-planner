/**
 * Build a directed adjacency graph from trail-map.json.
 * Nodes  = area IDs
 * Edges  = lifts (base_area → summit_area) + trails (top_area → bottom_area)
 */

export const DIFFICULTY_ORDER = ['easy', 'more_difficult', 'most_difficult', 'experts_only'];

export const SKILL_LEVELS = {
  beginner:     ['easy'],
  intermediate: ['easy', 'more_difficult'],
  advanced:     ['easy', 'more_difficult', 'most_difficult'],
  expert:       ['easy', 'more_difficult', 'most_difficult', 'experts_only'],
};

const LIFT_COST = 8;   // avg minutes
const DIFF_COST = { easy: 5, more_difficult: 7, most_difficult: 9, experts_only: 12, terrain_park: 4 };

export function buildGraph(data, closedLiftIds = [], closedTrailIds = [], allowedDifficulties = []) {
  const adj = {}; // areaId → [{to, edge, cost}]
  const closedLifts  = new Set(closedLiftIds);
  const closedTrails = new Set(closedTrailIds);
  const allowed      = new Set(allowedDifficulties);

  data.areas.forEach(a => { adj[a.id] = []; });

  data.lifts.forEach(lift => {
    if (closedLifts.has(lift.id)) return;
    const src = lift.base_area;
    if (!adj[src]) adj[src] = [];
    adj[src].push({
      to:   lift.summit_area,
      edge: { type: 'lift', id: lift.id, name: lift.name, liftType: lift.type },
      cost: LIFT_COST,
    });

    // Gondolas are bidirectional — add a reverse edge so skiers can traverse
    // back across the resort (e.g. Canyons → PC via Quicksilver).
    if (lift.type === 'gondola') {
      const rev = lift.summit_area;
      if (!adj[rev]) adj[rev] = [];
      adj[rev].push({
        to:   lift.base_area,
        edge: { type: 'lift', id: lift.id + '_rev', name: lift.name, liftType: lift.type },
        cost: LIFT_COST,
      });
    }
  });

  data.trails.forEach(trail => {
    if (closedTrails.has(trail.id)) return;
    if (!allowed.has(trail.difficulty)) return;
    if (trail.top_area === trail.bottom_area) return; // no routing progress
    const src = trail.top_area;
    if (!adj[src]) adj[src] = [];
    adj[src].push({
      to:   trail.bottom_area,
      edge: {
        type:        'trail',
        id:          trail.id,
        name:        trail.name,
        difficulty:  trail.difficulty,
        area:        trail.area,
        top_area:    trail.top_area,
        bottom_area: trail.bottom_area,
      },
      cost: DIFF_COST[trail.difficulty] ?? 7,
    });
  });

  return adj;
}

/** Simple BFS — returns path or null */
export function bfs(graph, start, end) {
  if (start === end) return [];
  const queue   = [[start, []]];
  const visited = new Set([start]);
  while (queue.length) {
    const [cur, path] = queue.shift();
    for (const { to, edge } of (graph[cur] || [])) {
      if (visited.has(to)) continue;
      const p = [...path, { ...edge, from: cur, to }];
      if (to === end) return p;
      visited.add(to);
      queue.push([to, p]);
    }
  }
  return null;
}

/** Min-heap priority queue */
class MinHeap {
  constructor() { this.h = []; }
  push(item) { this.h.push(item); this._up(this.h.length - 1); }
  pop()  {
    const top  = this.h[0];
    const last = this.h.pop();
    if (this.h.length) { this.h[0] = last; this._down(0); }
    return top;
  }
  get size() { return this.h.length; }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p].cost <= this.h[i].cost) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]]; i = p;
    }
  }
  _down(i) {
    const n = this.h.length;
    while (true) {
      let s = i, l = 2*i+1, r = 2*i+2;
      if (l < n && this.h[l].cost < this.h[s].cost) s = l;
      if (r < n && this.h[r].cost < this.h[s].cost) s = r;
      if (s === i) break;
      [this.h[s], this.h[i]] = [this.h[i], this.h[s]]; i = s;
    }
  }
}

/**
 * Dijkstra with preference weights.
 * - Coverage mode: penalise revisiting areas (+4 to cost)
 * - Terrain mode:  reward preferred difficulty (-3 from cost, min 1)
 */
export function dijkstra(graph, start, end, options = {}) {
  const { preferredDifficulties = [], optimizeFor = 'terrain', visitedAreas = new Set() } = options;
  if (start === end) return [];

  const best = {}; // areaId → lowest cost seen
  const pq   = new MinHeap();
  pq.push({ area: start, cost: 0, path: [] });
  best[start] = 0;

  while (pq.size) {
    const { area, cost, path } = pq.pop();
    if (area === end) return path;
    if (cost > (best[area] ?? Infinity) + 0.01) continue;

    for (const { to, edge, cost: ec } of (graph[area] || [])) {
      let c = ec;
      if (edge.type === 'trail') {
        if (preferredDifficulties.includes(edge.difficulty)) c = Math.max(1, c - 3);
      }
      if (optimizeFor === 'coverage' && !visitedAreas.has(to)) {
        c = Math.max(1, c - 2);
      } else if (optimizeFor === 'coverage' && visitedAreas.has(to)) {
        c += 4;
      }
      const nc = cost + c;
      if (nc < (best[to] ?? Infinity)) {
        best[to] = nc;
        pq.push({ area: to, cost: nc, path: [...path, { ...edge, from: area, to }] });
      }
    }
  }
  return null;
}
