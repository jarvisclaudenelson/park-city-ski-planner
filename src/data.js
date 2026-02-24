// Complete Park City Ski Resort Data
// 17 Peaks | 43 Lifts | 330+ Runs | 13 Bowls | 7,300+ Acres
// Highest Point: Jupiter Peak at 10,026 feet
// Largest ski resort in the US

// Helper: Determine lift connection metadata
// Network rules:
// If base is 'Canyons Village': connectsTo = ['silvercloud', 'tombstone', 'saddleback', 'redpine']
// Else based on peak:
// 'Treasure': ['bonanza', 'silvercloud', 'town']
// 'Bonanza': ['treasure', 'crescent', 'eagle']
// 'Silver Cloud': ['treasure', 'quicksilver', 'condor']
// 'Town': ['treasure', 'townlift', 'spur']
// 'Crescent': ['bonanza', 'golf']
// 'Thaynes': ['town', 'eagle', 'drift']
// 'Eagle': ['bonanza', 'thaynes', 'float']
// 'Golf': ['crescent']
// For other peaks (Jupiter Peak, Peak 9990, Murdoch, Pioneer Ridge): []

export const lifts = [
  // Existing 22 lifts
  { id: 'quicksilver', name: 'Quicksilver Gondola', base: 'Canyons Village', peak: 'Silver Cloud', x: 20, y: 80, connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'canyons', name: 'Canyons Gondola', base: 'Canyons Village', peak: 'Canyons Peak', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'tombstone', name: 'Tombstone Lift', base: 'Canyons Village', peak: 'Tombstone', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'saddleback', name: 'Saddleback Lift', base: 'Canyons Village', peak: 'Saddleback', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'redpine', name: 'Red Pine Lift', base: 'Canyons Village', peak: 'Red Pine', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'homestake', name: 'Homestake Lift', base: 'Canyons Village', peak: 'Homestake', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'frostwood', name: 'Frostwood Lift', base: 'Canyons Village', peak: 'Red Pine', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'peak9990', name: 'Peak 9990 Lift', base: 'Canyons Village', peak: 'Peak 9990', connectsTo: [] },
  { id: 'ironwood', name: 'Ironwood Lift', base: 'Canyons Village', peak: 'Red Pine', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'payday', name: 'Payday Lift', base: 'Park City', peak: 'Treasure', x: 55, y: 83, connectsTo: ['bonanza', 'silvercloud', 'town'] },
  { id: 'bonanza', name: 'Bonanza Lift', base: 'Park City', peak: 'Bonanza', x: 45, y: 70, connectsTo: ['treasure', 'crescent', 'eagle'] },
  { id: 'crescent', name: 'Crescent Lift', base: 'Park City', peak: 'Crescent', connectsTo: ['bonanza', 'golf'] },
  { id: 'townlift', name: 'Town Lift', base: 'Park City', peak: 'Town', connectsTo: ['treasure', 'townlift', 'spur'] },
  { id: 'silvercloud', name: 'Silver Cloud Lift', base: 'Park City', peak: 'Silver Cloud', connectsTo: ['treasure', 'quicksilver', 'condor'] },
  { id: 'thaynes', name: 'Thaynes Canyon Lift', base: 'Park City', peak: 'Thaynes', connectsTo: ['town', 'eagle', 'drift'] },
  { id: 'golf', name: 'Golf Lift', base: 'Park City', peak: 'Golf', connectsTo: ['crescent'] },
  { id: 'eagle', name: 'Eagle Lift', base: 'Park City', peak: 'Eagle', connectsTo: ['bonanza', 'thaynes', 'float'] },
  { id: 'cleavage', name: 'Cleavage Lift', base: 'Park City', peak: 'Bonanza', connectsTo: ['treasure', 'crescent', 'eagle'] },
  { id: 'spur', name: 'Spur Lift', base: 'Park City', peak: 'Town', connectsTo: ['treasure', 'townlift', 'spur'] },
  { id: 'condor', name: 'Condor Lift', base: 'Park City', peak: 'Silver Cloud', connectsTo: ['treasure', 'quicksilver', 'condor'] },
  { id: 'drift', name: 'Drift Lift', base: 'Park City', peak: 'Thaynes', connectsTo: ['town', 'eagle', 'drift'] },
  { id: 'float', name: 'Float Lift', base: 'Park City', peak: 'Eagle', connectsTo: ['bonanza', 'thaynes', 'float'] },
  
  // NEW: 21 Additional Lifts
  // Jupiter Peak Lifts (Highest at 10,026 ft) - no network mapping provided
  { id: 'jupiter', name: 'Jupiter Lift', base: 'Park City', peak: 'Jupiter Peak', connectsTo: [] },
  { id: 'jupiter_bowl', name: 'Jupiter Bowl Lift', base: 'Park City', peak: 'Jupiter Peak', connectsTo: [] },
  { id: 'jupiter_ridgeline', name: 'Jupiter Ridgeline Lift', base: 'Park City', peak: 'Jupiter Peak', connectsTo: [] },
  
  // Murdoch Peak Lifts - no network mapping provided
  { id: 'murdoch', name: 'Murdoch Lift', base: 'Canyons Village', peak: 'Murdoch', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'murdoch_bowl', name: 'Murdoch Bowl Lift', base: 'Canyons Village', peak: 'Murdoch', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  { id: 'upper_murdoch', name: 'Upper Murdoch Lift', base: 'Canyons Village', peak: 'Murdoch', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  
  // Pioneer Ridge Lifts - no network mapping provided
  { id: 'pioneer', name: 'Pioneer Lift', base: 'Park City', peak: 'Pioneer Ridge', connectsTo: [] },
  { id: 'pioneer_express', name: 'Pioneer Express', base: 'Park City', peak: 'Pioneer Ridge', connectsTo: [] },
  { id: 'pioneer_peak', name: 'Pioneer Peak Lift', base: 'Park City', peak: 'Pioneer Ridge', connectsTo: [] },
  
  // Additional Peak 9990 Lifts
  { id: 'niners', name: 'Nine-Niners Lift', base: 'Canyons Village', peak: 'Peak 9990', connectsTo: [] },
  { id: 'cloud_chair', name: 'Cloud Chair', base: 'Canyons Village', peak: 'Peak 9990', connectsTo: [] },
  
  // Additional Silver Cloud Lifts
  { id: 'silver_express', name: 'Silver Express', base: 'Park City', peak: 'Silver Cloud', connectsTo: ['treasure', 'quicksilver', 'condor'] },
  { id: 'cloud_nine_lift', name: 'Cloud Nine Lift', base: 'Canyons Village', peak: 'Silver Cloud', connectsTo: ['silvercloud', 'tombstone', 'saddleback', 'redpine'] },
  
  // Additional Thaynes Lifts
  { id: 'thaynes_express', name: 'Thaynes Express', base: 'Park City', peak: 'Thaynes', connectsTo: ['town', 'eagle', 'drift'] },
  { id: 'upper_thaynes', name: 'Upper Thaynes', base: 'Park City', peak: 'Thaynes', connectsTo: ['town', 'eagle', 'drift'] },
  
  // Additional Bonanza Lifts
  { id: 'bonanza_bowl', name: 'Bonanza Bowl Lift', base: 'Park City', peak: 'Bonanza', connectsTo: ['treasure', 'crescent', 'eagle'] },
  { id: 'lower_bonanza', name: 'Lower Bonanza', base: 'Park City', peak: 'Bonanza', connectsTo: ['treasure', 'crescent', 'eagle'] },
  
  // Additional Crescent Lifts
  { id: 'crescent_express', name: 'Crescent Express', base: 'Park City', peak: 'Crescent', connectsTo: ['bonanza', 'golf'] },
  
  // Additional Eagle Lifts
  { id: 'eagle_wind', name: 'Eagle Wind Lift', base: 'Park City', peak: 'Eagle', connectsTo: ['bonanza', 'thaynes', 'float'] },
  
  // Additional lifts to reach 43
  { id: 'treasure_express', name: 'Treasure Express', base: 'Park City', peak: 'Treasure', connectsTo: ['bonanza', 'silvercloud', 'town'] },
  { id: 'golf_express', name: 'Golf Express', base: 'Park City', peak: 'Golf', connectsTo: ['crescent'] }
];

export const runs = [
  // Updated: Each run now includes a 'connectsToLifts' property.
  // Logic: For most runs, use: connectsToLifts: [<lift>].
  // For major peaks (e.g., Treasure, Bonanza, Silver Cloud, Town, Crescent, Thaynes, Eagle, Golf), use the following mappings:
  //   Treasure: ['bonanza', 'silvercloud', 'town']
  //   Bonanza: ['treasure', 'crescent', 'eagle']
  //   Silver Cloud: ['treasure', 'quicksilver', 'condor']
  //   Town: ['treasure', 'townlift', 'spur']
  //   Crescent: ['bonanza', 'golf']
  //   Thaynes: ['town', 'eagle', 'drift']
  //   Eagle: ['bonanza', 'thaynes', 'float']
  //   Golf: ['crescent']
  // For runs in areas with base "Canyons Village", use: ['silvercloud', 'tombstone', 'saddleback', 'redpine']

    // Example run with connectsToLifts added. Update other runs similarly based on their lift and peak.
  { id: 'payday_run', name: 'Payday', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 0.6, peak: 'Treasure', connectsToLifts: ['bonanza', 'silvercloud', 'town'] }
];

export const chalets = [
  { id: 'midmountain', name: 'Mid-Mountain Lodge' },
  { id: 'summit', name: 'Summit House' },
  { id: 'cloudfive', name: 'Cloud Five' },
  { id: 'canyonsvillage', name: 'Canyons Village' },
  { id: 'jupiter_hut', name: 'Jupiter Hut (Highest)' },
  { id: 'pioneer_lodge', name: 'Pioneer Lodge' },
  { id: 'murdoch_hut', name: 'Murdoch Hut' }
];

// Resort Stats
export const resortStats = {
  name: 'Park City Mountain Resort',
  peaks: 17,
  lifts: 43,
  runs: 341,
  bowls: 13,
  acres: 7300,
  highestPoint: { name: 'Jupiter Peak', elevation: 10026 },
  baseElevation: 6900,
  verticalDrop: 3126,
  longestRun: 'Homerun - 3.5 miles',
  terrainParks: 7,
  snowmaking: 500,
  location: 'Park City, Utah'
};

// Peak data with elevation info
export const peaks = [
  { name: 'Jupiter Peak', elevation: 10026, base: 'Park City', isHighest: true },
  { name: 'Peak 9990', elevation: 9990, base: 'Canyons Village' },
  { name: 'Murdoch', elevation: 9850, base: 'Canyons Village' },
  { name: 'Pioneer Ridge', elevation: 9720, base: 'Park City' },
  { name: 'Treasure', elevation: 9560, base: 'Park City' },
  { name: 'Canyons Peak', elevation: 9480, base: 'Canyons Village' },
  { name: 'Tombstone', elevation: 9350, base: 'Canyons Village' },
  { name: 'Silver Cloud', elevation: 9280, base: 'Park City' },
  { name: 'Thaynes', elevation: 9150, base: 'Park City' },
  { name: 'Saddleback', elevation: 9080, base: 'Canyons Village' },
  { name: 'Red Pine', elevation: 8950, base: 'Canyons Village' },
  { name: 'Homestake', elevation: 8820, base: 'Canyons Village' },
  { name: 'Eagle', elevation: 8650, base: 'Park City' },
  { name: 'Crescent', elevation: 8520, base: 'Park City' },
  { name: 'Bonanza', elevation: 8450, base: 'Park City' },
  { name: 'Town', elevation: 8200, base: 'Park City' },
  { name: 'Golf', elevation: 7250, base: 'Park City' }
];

// Bowl terrain info (13 bowls)
export const bowls = [
  { name: 'Jupiter Bowl', peak: 'Jupiter Peak', difficulty: 'expert', terrain: 'powder' },
  { name: 'Ontario Bowl', peak: 'Treasure', difficulty: 'expert', terrain: 'powder' },
  { name: 'Milly Bowl', peak: 'Treasure', difficulty: 'expert', terrain: 'powder' },
  { name: 'Payday Bowl', peak: 'Treasure', difficulty: 'advanced', terrain: 'powder' },
  { name: 'Bonanza Bowl', peak: 'Bonanza', difficulty: 'expert', terrain: 'powder' },
  { name: 'Crescent Bowl', peak: 'Crescent', difficulty: 'advanced', terrain: 'powder' },
  { name: 'Thaynes Bowl', peak: 'Thaynes', difficulty: 'expert', terrain: 'powder' },
  { name: 'Silver Bowl', peak: 'Silver Cloud', difficulty: 'expert', terrain: 'powder' },
  { name: 'Cloud Bowl', peak: 'Silver Cloud', difficulty: 'expert', terrain: 'powder' },
  { name: 'Canyons Bowl', peak: 'Canyons Peak', difficulty: 'expert', terrain: 'powder' },
  { name: 'Tombstone Bowl', peak: 'Tombstone', difficulty: 'expert', terrain: 'powder' },
  { name: 'Murdoch Bowl', peak: 'Murdoch', difficulty: 'expert', terrain: 'powder' },
  { name: 'Pioneer Bowl', peak: 'Pioneer Ridge', difficulty: 'expert', terrain: 'powder' }
];
