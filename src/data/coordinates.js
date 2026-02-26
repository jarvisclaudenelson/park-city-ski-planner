/**
 * Approximate area positions on the trail map image (3687×2337 px).
 * Coordinates are in pixels relative to the original image dimensions.
 * Used to draw SVG route overlays.
 *
 * Map orientation: north = top, Park City side = right, Canyons = left.
 */
export const MAP_W = 3687;
export const MAP_H = 2337;

export const AREA_COORDS = {
  // ── Park City side (right / east) ────────────────────────────────────────
  town:                { x: 3200, y: 2140 },
  park_city_base:      { x: 3000, y: 1970 },
  lower_mountain_pc:   { x: 2820, y: 1760 },
  mid_mountain_pc:     { x: 2620, y: 1490 },
  bonanza_area:        { x: 2380, y: 1140 },
  mcconkeys_bowl:      { x: 2180, y:  830 },
  jupiter_peak:        { x: 1980, y:  430 },
  thaynes_canyon:      { x: 2320, y:  790 },
  silverlode_area:     { x: 2560, y: 1240 },
  tombstone_ridge:     { x: 2520, y: 1320 },

  // ── Cross-resort connector ────────────────────────────────────────────────
  dreamcatcher_area:   { x: 1920, y: 1380 },

  // ── Canyons side (left / west) ────────────────────────────────────────────
  tombstone_canyons:   { x: 1720, y: 1280 },
  iron_mountain:       { x: 1660, y: 1060 },
  ninety_nine_90:      { x: 1450, y:  620 },
  dreamscape_area:     { x: 1530, y:  840 },
  canyons_mid:         { x: 1310, y: 1560 },
  canyons_base:        { x:  820, y: 2060 },
  frostwood:           { x:  980, y: 1940 },
  saddleback:          { x: 1040, y: 1480 },
  high_meadow:         { x:  800, y: 1280 },
  sun_peak:            { x: 1120, y: 1520 },
  super_condor_area:   { x:  680, y: 1400 },
  murdock_peak:        { x:  520, y: 1200 },
};

/** Colour per difficulty for SVG trail lines */
export const DIFF_COLOR = {
  easy:           '#22c55e',  // green-500
  more_difficult: '#3b82f6',  // blue-500
  most_difficult: '#374151',  // gray-700
  experts_only:   '#dc2626',  // red-600
  terrain_park:   '#a855f7',  // purple-500
};

export const LIFT_COLOR = '#f59e0b'; // amber-400

/** Return {x,y} for an area, or centre of map if unknown */
export function areaCoord(areaId) {
  return AREA_COORDS[areaId] || { x: MAP_W / 2, y: MAP_H / 2 };
}
