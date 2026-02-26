/**
 * Approximate area positions on the trail map image (3687×2337 px).
 * Coordinates are in pixels relative to the original image dimensions.
 * Used to draw SVG route overlays.
 *
 * Map orientation: Park City side = LEFT, Canyons Village = RIGHT.
 */
export const MAP_W = 3687;
export const MAP_H = 2337;

export const AREA_COORDS = {
  // ── Park City side (left) ─────────────────────────────────────────────────
  town:                { x:  100, y: 1810 },  // Historic Park City / Town Lift base
  park_city_base:      { x:  350, y: 1700 },  // Park City Mountain Village
  lower_mountain_pc:   { x:  275, y: 1380 },  // Lower mountain lifts (Payday Express, Crescent)
  mid_mountain_pc:     { x:  490, y:  960 },  // Mid-Mountain Lodge
  bonanza_area:        { x:  665, y:  455 },  // Summit House (top of Bonanza lift)
  mcconkeys_bowl:      { x:  455, y:  250 },  // McConkey's Bowl
  jupiter_peak:        { x:  625, y:   60 },  // Jupiter Peak (10,026 ft)
  thaynes_canyon:      { x:  890, y:  430 },  // Thaynes Canyon
  silverlode_area:     { x: 1060, y:  700 },  // Silverlode / Viking Yurt
  tombstone_ridge:     { x: 1080, y:  960 },  // Tombstone Ridge (PC side)

  // ── Cross-resort connector ────────────────────────────────────────────────
  dreamcatcher_area:   { x: 1010, y: 1160 },  // Dreamcatcher / cross-resort connection

  // ── Canyons side (right) ──────────────────────────────────────────────────
  canyons_mid:         { x:  950, y:  920 },  // Miner's Camp (Quicksilver gondola exit)
  tombstone_canyons:   { x: 1160, y: 1060 },  // Tombstone BBQ (Canyons side)
  iron_mountain:       { x: 1460, y:  830 },  // Iron Mountain area
  ninety_nine_90:      { x: 1630, y:  150 },  // Ninety-Nine 90 Peak (9,990 ft)
  dreamscape_area:     { x: 1760, y:  550 },  // Dreamscape area
  saddleback:          { x: 2360, y: 1260 },  // Saddleback area
  high_meadow:         { x: 2610, y: 1110 },  // High Meadow
  canyons_base:        { x: 2260, y: 1680 },  // Canyons Village base
  frostwood:           { x: 2120, y: 1770 },  // Frostwood (Sunrise lift base)
  sun_peak:            { x: 2920, y:  900 },  // Sun Peak / Sun Lodge
  super_condor_area:   { x: 3160, y:  760 },  // Super Condor area
  murdock_peak:        { x: 3400, y:  190 },  // Murdock Peak (highest Canyons peak)
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
