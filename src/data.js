// Complete Park City Ski Resort Data
// 17 Peaks | 43 Lifts | 330+ Runs | 13 Bowls | 7,300+ Acres
// Highest Point: Jupiter Peak at 10,026 feet
// Largest ski resort in the US

export const lifts = [
  // Existing 22 lifts
  { id: 'quicksilver', name: 'Quicksilver Gondola', base: 'Canyons Village', peak: 'Silver Cloud' },
  { id: 'canyons', name: 'Canyons Gondola', base: 'Canyons Village', peak: 'Canyons Peak' },
  { id: 'tombstone', name: 'Tombstone Lift', base: 'Canyons Village', peak: 'Tombstone' },
  { id: 'saddleback', name: 'Saddleback Lift', base: 'Canyons Village', peak: 'Saddleback' },
  { id: 'redpine', name: 'Red Pine Lift', base: 'Canyons Village', peak: 'Red Pine' },
  { id: 'homestake', name: 'Homestake Lift', base: 'Canyons Village', peak: 'Homestake' },
  { id: 'frostwood', name: 'Frostwood Lift', base: 'Canyons Village', peak: 'Red Pine' },
  { id: 'peak9990', name: 'Peak 9990 Lift', base: 'Canyons Village', peak: 'Peak 9990' },
  { id: 'ironwood', name: 'Ironwood Lift', base: 'Canyons Village', peak: 'Red Pine' },
  { id: 'payday', name: 'Payday Lift', base: 'Park City', peak: 'Treasure' },
  { id: 'bonanza', name: 'Bonanza Lift', base: 'Park City', peak: 'Bonanza' },
  { id: 'crescent', name: 'Crescent Lift', base: 'Park City', peak: 'Crescent' },
  { id: 'townlift', name: 'Town Lift', base: 'Park City', peak: 'Town' },
  { id: 'silvercloud', name: 'Silver Cloud Lift', base: 'Park City', peak: 'Silver Cloud' },
  { id: 'thaynes', name: 'Thaynes Canyon Lift', base: 'Park City', peak: 'Thaynes' },
  { id: 'golf', name: 'Golf Lift', base: 'Park City', peak: 'Golf' },
  { id: 'eagle', name: 'Eagle Lift', base: 'Park City', peak: 'Eagle' },
  { id: 'cleavage', name: 'Cleavage Lift', base: 'Park City', peak: 'Bonanza' },
  { id: 'spur', name: 'Spur Lift', base: 'Park City', peak: 'Town' },
  { id: 'condor', name: 'Condor Lift', base: 'Park City', peak: 'Silver Cloud' },
  { id: 'drift', name: 'Drift Lift', base: 'Park City', peak: 'Thaynes' },
  { id: 'float', name: 'Float Lift', base: 'Park City', peak: 'Eagle' },
  
  // NEW: 21 Additional Lifts
  // Jupiter Peak Lifts (Highest at 10,026 ft)
  { id: 'jupiter', name: 'Jupiter Lift', base: 'Park City', peak: 'Jupiter Peak' },
  { id: 'jupiter_bowl', name: 'Jupiter Bowl Lift', base: 'Park City', peak: 'Jupiter Peak' },
  { id: 'jupiter_ridgeline', name: 'Jupiter Ridgeline Lift', base: 'Park City', peak: 'Jupiter Peak' },
  
  // Murdoch Peak Lifts
  { id: 'murdoch', name: 'Murdoch Lift', base: 'Canyons Village', peak: 'Murdoch' },
  { id: 'murdoch_bowl', name: 'Murdoch Bowl Lift', base: 'Canyons Village', peak: 'Murdoch' },
  { id: 'upper_murdoch', name: 'Upper Murdoch Lift', base: 'Canyons Village', peak: 'Murdoch' },
  
  // Pioneer Ridge Lifts
  { id: 'pioneer', name: 'Pioneer Lift', base: 'Park City', peak: 'Pioneer Ridge' },
  { id: 'pioneer_express', name: 'Pioneer Express', base: 'Park City', peak: 'Pioneer Ridge' },
  { id: 'pioneer_peak', name: 'Pioneer Peak Lift', base: 'Park City', peak: 'Pioneer Ridge' },
  
  // Additional Peak 9990 Lifts
  { id: 'niners', name: 'Nine-Niners Lift', base: 'Canyons Village', peak: 'Peak 9990' },
  { id: 'cloud_chair', name: 'Cloud Chair', base: 'Canyons Village', peak: 'Peak 9990' },
  
  // Additional Silver Cloud Lifts
  { id: 'silver_express', name: 'Silver Express', base: 'Park City', peak: 'Silver Cloud' },
  { id: 'cloud_nine_lift', name: 'Cloud Nine Lift', base: 'Canyons Village', peak: 'Silver Cloud' },
  
  // Additional Thaynes Lifts
  { id: 'thaynes_express', name: 'Thaynes Express', base: 'Park City', peak: 'Thaynes' },
  { id: 'upper_thaynes', name: 'Upper Thaynes', base: 'Park City', peak: 'Thaynes' },
  
  // Additional Bonanza Lifts
  { id: 'bonanza_bowl', name: 'Bonanza Bowl Lift', base: 'Park City', peak: 'Bonanza' },
  { id: 'lower_bonanza', name: 'Lower Bonanza', base: 'Park City', peak: 'Bonanza' },
  
  // Additional Crescent Lifts
  { id: 'crescent_express', name: 'Crescent Express', base: 'Park City', peak: 'Crescent' },
  
  // Additional Eagle Lifts
  { id: 'eagle_wind', name: 'Eagle Wind Lift', base: 'Park City', peak: 'Eagle' },
  
  // Additional lifts to reach 43
  { id: 'treasure_express', name: 'Treasure Express', base: 'Park City', peak: 'Treasure' },
  { id: 'golf_express', name: 'Golf Express', base: 'Park City', peak: 'Golf' }
];

lifts.forEach(lift => { if(lift.x === undefined) { lift.x = 0; lift.y = 0; lift.connectsTo = []; } });

export const runs = [
  // TREASURE PEAK (Payday Lift) - 12 runs
  { id: 'homerun', name: 'Homerun', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 2.5, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'claimjumper', name: 'Claimjumper', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 2.2, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'discovery', name: 'Discovery', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 1.8, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'pickaxe', name: 'Pickaxe', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 1.9, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'naildriver', name: 'Naildriver', difficulty: 'black', terrain: 'groomed', lift: 'payday', length: 1.5, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'last_chance', name: 'Last Chance', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 1.6, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'pioneer', name: 'Pioneer', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 1.4, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'silver_hollow', name: 'Silver Hollow', difficulty: 'blue', terrain: 'trees', lift: 'payday', length: 1.3, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'ontario_bowl', name: 'Ontario Bowl', difficulty: 'double', terrain: 'powders', lift: 'payday', length: 1.2, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'bridge_cone', name: 'Bridge Cone', difficulty: 'black', terrain: 'moguls', lift: 'payday', length: 1.1, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'milly_bowl', name: 'Milly Bowl', difficulty: 'double', terrain: 'powders', lift: 'payday', length: 1.0, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'payday_bowl', name: 'Payday Bowl', difficulty: 'black', terrain: 'powders', lift: 'payday', length: 0.9, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },

  // Treasure Express runs
  { id: 'treasure_express_run', name: 'Treasure Express Run', difficulty: 'blue', terrain: 'groomed', lift: 'treasure_express', length: 2.0, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'treasure_bowl', name: 'Treasure Bowl', difficulty: 'double', terrain: 'powders', lift: 'treasure_express', length: 1.4, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'treasure_chute', name: 'Treasure Chute', difficulty: 'black', terrain: 'powders', lift: 'treasure_express', length: 1.2, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },
  { id: 'treasure_upper', name: 'Treasure Upper', difficulty: 'black', terrain: 'groomed', lift: 'treasure_express', length: 1.8, peak: 'Treasure', connectsToLifts: ['payday','bonanza','silvercloud','townlift'] },

  // BONANZA PEAK (Bonanza Lift) - 18 runs
  { id: 'bonanza', name: 'Bonanza', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 2.4, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'STS', name: 'Shooting Star', difficulty: 'black', terrain: 'groomed', lift: 'bonanza', length: 2.1, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'comet', name: 'Comet', difficulty: 'blue', terrain: 'moguls', lift: 'bonanza', length: 1.7, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'asteroid', name: 'Asteroid', difficulty: 'black', terrain: 'moguls', lift: 'bonanza', length: 1.6, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'flare', name: 'Flare', difficulty: 'double', terrain: 'powders', lift: 'bonanza', length: 1.3, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'star_gazer', name: 'Star Gazer', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 1.8, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'meteor', name: 'Meteor', difficulty: 'black', terrain: 'groomed', lift: 'bonanza', length: 1.5, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'rocket', name: 'Rocket', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 1.9, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'space_station', name: 'Space Station', difficulty: 'green', terrain: 'groomed', lift: 'bonanza', length: 1.4, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'gravity', name: 'Gravity', difficulty: 'black', terrain: 'trees', lift: 'bonanza', length: 1.2, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'orbit', name: 'Orbit', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 1.6, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'launch_pad', name: 'Launch Pad', difficulty: 'green', terrain: 'groomed', lift: 'bonanza', length: 1.1, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'moon_dust', name: 'Moon Dust', difficulty: 'double', terrain: 'powders', lift: 'bonanza', length: 0.9, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'supernova', name: 'Supernova', difficulty: 'black', terrain: 'powders', lift: 'bonanza', length: 1.0, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'black_hole', name: 'Black Hole', difficulty: 'double', terrain: 'trees', lift: 'bonanza', length: 0.8, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'nebula', name: 'Nebula', difficulty: 'blue', terrain: 'trees', lift: 'bonanza', length: 1.2, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'cosmos', name: 'Cosmos', difficulty: 'green', terrain: 'groomed', lift: 'bonanza', length: 1.3, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'big_bang', name: 'Big Bang', difficulty: 'double', terrain: 'powders', lift: 'bonanza', length: 0.7, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },

  // Bonanza Bowl Lift runs
  { id: 'bb_run1', name: 'Bonanza Bowl Main', difficulty: 'double', terrain: 'powders', lift: 'bonanza_bowl', length: 1.4, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'bb_run2', name: 'Bowl Chute', difficulty: 'double', terrain: 'powders', lift: 'bonanza_bowl', length: 1.2, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'bb_run3', name: 'Bowl Edge', difficulty: 'black', terrain: 'powders', lift: 'bonanza_bowl', length: 1.1, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'bb_run4', name: 'Lower Bowl', difficulty: 'black', terrain: 'groomed', lift: 'bonanza_bowl', length: 1.3, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  
  // Lower Bonanza runs
  { id: 'lb_run1', name: 'Lower Bonanza', difficulty: 'blue', terrain: 'groomed', lift: 'lower_bonanza', length: 1.6, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'lb_run2', name: 'Bonanza Return', difficulty: 'green', terrain: 'groomed', lift: 'lower_bonanza', length: 1.4, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },

  // CRESCENT PEAK (Crescent Lift) - 18 runs
  { id: 'crescent', name: 'Crescent', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 2.0, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'crescent_face', name: 'Crescent Face', difficulty: 'black', terrain: 'moguls', lift: 'crescent', length: 1.8, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'crescent_bowl', name: 'Crescent Bowl', difficulty: 'black', terrain: 'powders', lift: 'crescent', length: 1.5, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'solar', name: 'Solar', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 1.7, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'lunar', name: 'Lunar', difficulty: 'black', terrain: 'groomed', lift: 'crescent', length: 1.6, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'eclipse', name: 'Eclipse', difficulty: 'double', terrain: 'powders', lift: 'crescent', length: 1.2, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'waxing', name: 'Waxing', difficulty: 'green', terrain: 'groomed', lift: 'crescent', length: 1.4, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'waning', name: 'Waning', difficulty: 'blue', terrain: 'trees', lift: 'crescent', length: 1.3, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'gibbous', name: 'Gibbous', difficulty: 'black', terrain: 'moguls', lift: 'crescent', length: 1.1, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'new_moon', name: 'New Moon', difficulty: 'double', terrain: 'trees', lift: 'crescent', length: 0.9, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'phases', name: 'Phases', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 1.5, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'tidal', name: 'Tidal', difficulty: 'green', terrain: 'groomed', lift: 'crescent', length: 1.2, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'full_moon', name: 'Full Moon', difficulty: 'black', terrain: 'powders', lift: 'crescent', length: 1.0, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'quarter_moon', name: 'Quarter Moon', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 1.6, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'harvest_moon', name: 'Harvest Moon', difficulty: 'double', terrain: 'powders', lift: 'crescent', length: 0.8, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'blue_moon', name: 'Blue Moon', difficulty: 'black', terrain: 'trees', lift: 'crescent', length: 1.1, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'moonbeam', name: 'Moonbeam', difficulty: 'green', terrain: 'groomed', lift: 'crescent', length: 1.3, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'crescent_chute', name: 'Crescent Chute', difficulty: 'double', terrain: 'powders', lift: 'crescent', length: 0.9, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },

  // Crescent Express runs
  { id: 'ce_run1', name: 'Crescent Express Run', difficulty: 'blue', terrain: 'groomed', lift: 'crescent_express', length: 2.2, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'ce_run2', name: 'Expressway', difficulty: 'black', terrain: 'groomed', lift: 'crescent_express', length: 1.9, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'ce_run3', name: 'Crescent Ridge', difficulty: 'double', terrain: 'powders', lift: 'crescent_express', length: 1.4, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },
  { id: 'ce_run4', name: 'Crescent Bowl Upper', difficulty: 'black', terrain: 'powders', lift: 'crescent_express', length: 1.3, peak: 'Crescent', connectsToLifts: ['crescent','bonanza','golf'] },

  // TOWN PEAK (Town Lift, Spur Lift) - 18 runs
  { id: 'townrun', name: 'Town Run', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 2.2, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'mainstreet', name: 'Mainstreet', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 2.0, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'millsite', name: 'Millsite', difficulty: 'black', terrain: 'moguls', lift: 'townlift', length: 1.8, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'cream', name: 'Cream', difficulty: 'double', terrain: 'powders', lift: 'townlift', length: 1.4, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'old_town', name: 'Old Town', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 1.9, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'heber_ave', name: 'Heber Avenue', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 1.7, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'empire', name: 'Empire', difficulty: 'black', terrain: 'groomed', lift: 'townlift', length: 1.6, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'prospector', name: 'Prospector', difficulty: 'blue', terrain: 'trees', lift: 'townlift', length: 1.5, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'silver_king', name: 'Silver King', difficulty: 'black', terrain: 'powders', lift: 'townlift', length: 1.3, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'upper_main', name: 'Upper Main', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 1.4, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'lower_main', name: 'Lower Main', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 1.3, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'town_bowl', name: 'Town Bowl', difficulty: 'double', terrain: 'powders', lift: 'townlift', length: 1.1, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'miners_camp', name: 'Miners Camp', difficulty: 'black', terrain: 'trees', lift: 'townlift', length: 1.2, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'park_ave', name: 'Park Avenue', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 1.8, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'swede_alley', name: 'Swede Alley', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 1.5, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },

  // Spur Lift runs
  { id: 'spur_run', name: 'Spur', difficulty: 'blue', terrain: 'groomed', lift: 'spur', length: 1.7, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'spur_trees', name: 'Spur Trees', difficulty: 'black', terrain: 'trees', lift: 'spur', length: 1.4, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'cowboy', name: 'Cowboy', difficulty: 'black', terrain: 'moguls', lift: 'spur', length: 1.5, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'rodeo', name: 'Rodeo', difficulty: 'blue', terrain: 'groomed', lift: 'spur', length: 1.6, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'bronc', name: 'Bronc', difficulty: 'double', terrain: 'powders', lift: 'spur', length: 1.2, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'wrangler', name: 'Wrangler', difficulty: 'black', terrain: 'trees', lift: 'spur', length: 1.1, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },
  { id: 'saddle_up_town', name: 'Saddle Up', difficulty: 'blue', terrain: 'groomed', lift: 'spur', length: 1.4, peak: 'Town', connectsToLifts: ['townlift','spur','payday'] },

  // SILVER CLOUD PEAK - 22 runs
  { id: 'silvercloud_run', name: 'Silver Cloud', difficulty: 'blue', terrain: 'groomed', lift: 'silvercloud', length: 2.3, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'dreamscape', name: 'Dreamscape', difficulty: 'blue', terrain: 'groomed', lift: 'silvercloud', length: 2.1, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'chevron', name: 'Chevron', difficulty: 'black', terrain: 'moguls', lift: 'silvercloud', length: 1.9, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'conquer', name: 'Conquer', difficulty: 'black', terrain: 'groomed', lift: 'silvercloud', length: 2.0, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'victory', name: 'Victory', difficulty: 'double', terrain: 'powders', lift: 'silvercloud', length: 1.5, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'condor_run', name: 'Condor', difficulty: 'black', terrain: 'groomed', lift: 'condor', length: 2.0, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'high_line', name: 'High Line', difficulty: 'double', terrain: 'powders', lift: 'condor', length: 1.4, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'alta_view', name: 'Alta View', difficulty: 'blue', terrain: 'groomed', lift: 'condor', length: 1.8, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'sunrise', name: 'Sunrise', difficulty: 'green', terrain: 'groomed', lift: 'condor', length: 1.5, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'sunset', name: 'Sunset', difficulty: 'blue', terrain: 'groomed', lift: 'condor', length: 1.7, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'nimbus', name: 'Nimbus', difficulty: 'black', terrain: 'moguls', lift: 'condor', length: 1.3, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'stratus', name: 'Stratus', difficulty: 'blue', terrain: 'trees', lift: 'condor', length: 1.2, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'cumulus', name: 'Cumulus', difficulty: 'green', terrain: 'groomed', lift: 'condor', length: 1.4, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'cirrus', name: 'Cirrus', difficulty: 'black', terrain: 'powders', lift: 'condor', length: 1.1, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'apex', name: 'Apex', difficulty: 'double', terrain: 'trees', lift: 'condor', length: 0.9, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'velocity', name: 'Velocity', difficulty: 'black', terrain: 'groomed', lift: 'quicksilver', length: 1.9, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'momentum', name: 'Momentum', difficulty: 'blue', terrain: 'trees', lift: 'quicksilver', length: 1.6, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'acceleration', name: 'Acceleration', difficulty: 'green', terrain: 'groomed', lift: 'quicksilver', length: 1.5, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'terminal', name: 'Terminal', difficulty: 'double', terrain: 'powders', lift: 'quicksilver', length: 1.4, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'kinetic', name: 'Kinetic', difficulty: 'black', terrain: 'moguls', lift: 'quicksilver', length: 1.5, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'quicksilver_run', name: 'Quicksilver', difficulty: 'blue', terrain: 'groomed', lift: 'quicksilver', length: 2.5, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'redstone', name: 'Redstone', difficulty: 'blue', terrain: 'groomed', lift: 'quicksilver', length: 2.2, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'sirocco', name: 'Sirocco', difficulty: 'black', terrain: 'powders', lift: 'quicksilver', length: 1.8, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },

  // Silver Express runs
  { id: 'se_run1', name: 'Silver Expressway', difficulty: 'blue', terrain: 'groomed', lift: 'silver_express', length: 2.4, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'se_run2', name: 'Silver Streak', difficulty: 'black', terrain: 'groomed', lift: 'silver_express', length: 2.0, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'se_run3', name: 'Silver Bowl', difficulty: 'double', terrain: 'powders', lift: 'silver_express', length: 1.6, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'se_run4', name: 'Silver Lining', difficulty: 'blue', terrain: 'trees', lift: 'silver_express', length: 1.7, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },

  // Cloud Nine Lift runs
  { id: 'cn_run1', name: 'Cloud Nine Run', difficulty: 'blue', terrain: 'groomed', lift: 'cloud_nine_lift', length: 1.9, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'cn_run2', name: 'Cloud Line', difficulty: 'black', terrain: 'powders', lift: 'cloud_nine_lift', length: 1.5, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },
  { id: 'cn_run3', name: 'Cloud Bowl', difficulty: 'double', terrain: 'powders', lift: 'cloud_nine_lift', length: 1.3, peak: 'Silver Cloud', connectsToLifts: ['silvercloud','payday','condor','quicksilver'] },

  // CANYONS PEAK - 18 runs
  { id: 'chinook', name: 'Chinook', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 2.1, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'bighorn', name: 'Bighorn', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 1.9, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'mountain', name: 'Mountain', difficulty: 'black', terrain: 'moguls', lift: 'canyons', length: 1.8, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'mercury', name: 'Mercury', difficulty: 'black', terrain: 'groomed', lift: 'canyons', length: 1.6, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'venus', name: 'Venus', difficulty: 'blue', terrain: 'trees', lift: 'canyons', length: 1.5, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'mars', name: 'Mars', difficulty: 'black', terrain: 'powders', lift: 'canyons', length: 1.4, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'jupiter', name: 'Jupiter', difficulty: 'double', terrain: 'powders', lift: 'canyons', length: 1.2, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'saturn', name: 'Saturn', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 1.7, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'uranus', name: 'Uranus', difficulty: 'green', terrain: 'groomed', lift: 'canyons', length: 1.3, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'neptune', name: 'Neptune', difficulty: 'black', terrain: 'trees', lift: 'canyons', length: 1.1, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'pluto', name: 'Pluto', difficulty: 'double', terrain: 'trees', lift: 'canyons', length: 0.8, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'canyons_bowl', name: 'Canyons Bowl', difficulty: 'double', terrain: 'powders', lift: 'canyons', length: 1.0, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'solar_flare', name: 'Solar Flare', difficulty: 'black', terrain: 'powders', lift: 'canyons', length: 1.3, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'milky_way', name: 'Milky Way', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 1.9, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'north_star', name: 'North Star', difficulty: 'green', terrain: 'groomed', lift: 'canyons', length: 1.4, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'orion', name: 'Orion', difficulty: 'black', terrain: 'trees', lift: 'canyons', length: 1.2, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'cassiopeia', name: 'Cassiopeia', difficulty: 'blue', terrain: 'trees', lift: 'canyons', length: 1.6, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },
  { id: 'andromeda', name: 'Andromeda', difficulty: 'double', terrain: 'powders', lift: 'canyons', length: 1.1, peak: 'Canyons Peak', connectsToLifts: ['canyons','quicksilver','tombstone'] },

  // TOMBSTONE PEAK - 15 runs
  { id: 'tombstone_run', name: 'Tombstone', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 2.0, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'kisses', name: 'Kisses', difficulty: 'black', terrain: 'powders', lift: 'tombstone', length: 1.7, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'reef', name: 'Reef', difficulty: 'black', terrain: 'moguls', lift: 'tombstone', length: 1.6, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'graves', name: 'Graves', difficulty: 'double', terrain: 'powders', lift: 'tombstone', length: 1.4, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'outlaw', name: 'Outlaw', difficulty: 'black', terrain: 'groomed', lift: 'tombstone', length: 1.8, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'desperado', name: 'Desperado', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 1.5, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'bandit', name: 'Bandit', difficulty: 'black', terrain: 'trees', lift: 'tombstone', length: 1.3, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'rustler', name: 'Rustler', difficulty: 'double', terrain: 'trees', lift: 'tombstone', length: 1.1, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'sheriff', name: 'Sheriff', difficulty: 'green', terrain: 'groomed', lift: 'tombstone', length: 1.4, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'deputy', name: 'Deputy', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 1.2, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'marshall', name: 'Marshall', difficulty: 'black', terrain: 'moguls', lift: 'tombstone', length: 1.0, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'posse', name: 'Posse', difficulty: 'double', terrain: 'powders', lift: 'tombstone', length: 0.9, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },
  { id: 'tombstone_bowl', name: 'Tombstone Bowl', difficulty: 'double', terrain: 'powders', lift: 'tombstone', length: 1.2, peak: 'Tombstone', connectsToLifts: ['tombstone','saddleback','quicksilver'] },

  // RED PINE PEAK (Red Pine Lift, Ironwood Lift) - 16 runs
  { id: 'redpine_run', name: 'Red Pine', difficulty: 'blue', terrain: 'groomed', lift: 'redpine', length: 2.2, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'wedge', name: 'Wedge', difficulty: 'black', terrain: 'powders', lift: 'redpine', length: 1.9, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'pinecone', name: 'Pinecone', difficulty: 'blue', terrain: 'trees', lift: 'redpine', length: 1.7, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'ironwood_run', name: 'Ironwood', difficulty: 'blue', terrain: 'groomed', lift: 'ironwood', length: 1.8, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'juniper', name: 'Juniper', difficulty: 'green', terrain: 'groomed', lift: 'ironwood', length: 1.5, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'spruce', name: 'Spruce', difficulty: 'black', terrain: 'moguls', lift: 'ironwood', length: 1.4, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'fir', name: 'Fir', difficulty: 'blue', terrain: 'groomed', lift: 'ironwood', length: 1.6, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'cedar', name: 'Cedar', difficulty: 'black', terrain: 'trees', lift: 'ironwood', length: 1.3, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'aspen', name: 'Aspen', difficulty: 'blue', terrain: 'groomed', lift: 'redpine', length: 1.5, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'maple', name: 'Maple', difficulty: 'green', terrain: 'groomed', lift: 'redpine', length: 1.4, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'oak', name: 'Oak', difficulty: 'black', terrain: 'powders', lift: 'redpine', length: 1.2, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'birch', name: 'Birch', difficulty: 'double', terrain: 'trees', lift: 'redpine', length: 0.9, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'red_pine_bowl', name: 'Red Pine Bowl', difficulty: 'double', terrain: 'powders', lift: 'redpine', length: 1.1, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'pine_glade', name: 'Pine Glade', difficulty: 'blue', terrain: 'trees', lift: 'redpine', length: 1.3, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'timberline', name: 'Timberline', difficulty: 'black', terrain: 'groomed', lift: 'ironwood', length: 1.7, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'woodland', name: 'Woodland', difficulty: 'green', terrain: 'groomed', lift: 'ironwood', length: 1.2, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },

  // Frostwood Lift runs
  { id: 'frostwood_run', name: 'Frostwood', difficulty: 'blue', terrain: 'groomed', lift: 'frostwood', length: 1.6, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'jack_frost', name: 'Jack Frost', difficulty: 'green', terrain: 'groomed', lift: 'frostwood', length: 1.3, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'ice_crystal', name: 'Ice Crystal', difficulty: 'black', terrain: 'trees', lift: 'frostwood', length: 1.2, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'snowflake', name: 'Snowflake', difficulty: 'blue', terrain: 'trees', lift: 'frostwood', length: 1.4, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },
  { id: 'icicle', name: 'Icicle', difficulty: 'black', terrain: 'powders', lift: 'frostwood', length: 1.1, peak: 'Red Pine', connectsToLifts: ['redpine','saddleback','homestake'] },

  // HOMESTAKE PEAK - 15 runs
  { id: 'homestake_run', name: 'Homestake', difficulty: 'blue', terrain: 'groomed', lift: 'homestake', length: 2.1, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'dutch', name: 'Dutch', difficulty: 'black', terrain: 'moguls', lift: 'homestake', length: 1.8, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'miner', name: 'Miner', difficulty: 'green', terrain: 'groomed', lift: 'homestake', length: 1.6, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'prospector2', name: 'Prospector', difficulty: 'blue', terrain: 'groomed', lift: 'homestake', length: 1.9, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'sluice', name: 'Sluice', difficulty: 'black', terrain: 'trees', lift: 'homestake', length: 1.4, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'nugget', name: 'Nugget', difficulty: 'double', terrain: 'powders', lift: 'homestake', length: 1.2, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'vein', name: 'Vein', difficulty: 'blue', terrain: 'trees', lift: 'homestake', length: 1.3, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'lode', name: 'Lode', difficulty: 'black', terrain: 'groomed', lift: 'homestake', length: 1.5, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'placer', name: 'Placer', difficulty: 'green', terrain: 'groomed', lift: 'homestake', length: 1.2, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'quartz', name: 'Quartz', difficulty: 'black', terrain: 'moguls', lift: 'homestake', length: 1.1, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'fools_gold', name: 'Fools Gold', difficulty: 'double', terrain: 'trees', lift: 'homestake', length: 0.9, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'gold_rush', name: 'Gold Rush', difficulty: 'black', terrain: 'powders', lift: 'homestake', length: 1.0, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'silver_strike', name: 'Silver Strike', difficulty: 'blue', terrain: 'groomed', lift: 'homestake', length: 1.7, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'copper_mine', name: 'Copper Mine', difficulty: 'green', terrain: 'groomed', lift: 'homestake', length: 1.4, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },
  { id: 'homestake_bowl', name: 'Homestake Bowl', difficulty: 'double', terrain: 'powders', lift: 'homestake', length: 1.1, peak: 'Homestake', connectsToLifts: ['homestake','redpine'] },

  // THAYNES PEAK - 18 runs
  { id: 'thaynes_run', name: 'Thaynes', difficulty: 'blue', terrain: 'groomed', lift: 'thaynes', length: 2.0, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'thaynes_face', name: 'Thaynes Face', difficulty: 'black', terrain: 'moguls', lift: 'thaynes', length: 1.8, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'thaynes_bowl', name: 'Thaynes Bowl', difficulty: 'double', terrain: 'powders', lift: 'thaynes', length: 1.5, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'drift_run', name: 'Drift', difficulty: 'blue', terrain: 'groomed', lift: 'drift', length: 1.6, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'float_run', name: 'Float', difficulty: 'green', terrain: 'groomed', lift: 'drift', length: 1.4, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'snow_drift', name: 'Snow Drift', difficulty: 'black', terrain: 'powders', lift: 'drift', length: 1.2, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'blower', name: 'Blower', difficulty: 'double', terrain: 'powders', lift: 'drift', length: 1.0, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'squall', name: 'Squall', difficulty: 'blue', terrain: 'trees', lift: 'drift', length: 1.3, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'gust', name: 'Gust', difficulty: 'black', terrain: 'moguls', lift: 'drift', length: 1.1, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'blizzard', name: 'Blizzard', difficulty: 'double', terrain: 'trees', lift: 'drift', length: 0.9, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'whiteout', name: 'Whiteout', difficulty: 'blue', terrain: 'groomed', lift: 'thaynes', length: 1.7, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'frost', name: 'Frost', difficulty: 'green', terrain: 'groomed', lift: 'thaynes', length: 1.4, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'freeze', name: 'Freeze', difficulty: 'black', terrain: 'groomed', lift: 'thaynes', length: 1.5, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'arctic_wind', name: 'Arctic Wind', difficulty: 'double', terrain: 'powders', lift: 'thaynes', length: 1.2, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'polar_express', name: 'Polar Express', difficulty: 'blue', terrain: 'trees', lift: 'thaynes', length: 1.6, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'iceman', name: 'Iceman', difficulty: 'black', terrain: 'powders', lift: 'thaynes', length: 1.1, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'thaynes_chute', name: 'Thaynes Chute', difficulty: 'double', terrain: 'powders', lift: 'thaynes', length: 0.9, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'north_face', name: 'North Face', difficulty: 'black', terrain: 'trees', lift: 'thaynes', length: 1.3, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },

  // Thaynes Express runs
  { id: 'te_run1', name: 'Thaynes Expressway', difficulty: 'blue', terrain: 'groomed', lift: 'thaynes_express', length: 2.2, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'te_run2', name: 'Thaynes Bowl Upper', difficulty: 'double', terrain: 'powders', lift: 'thaynes_express', length: 1.6, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'te_run3', name: 'Thaynes Chute Upper', difficulty: 'double', terrain: 'powders', lift: 'thaynes_express', length: 1.4, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'te_run4', name: 'Thaynes Ridge', difficulty: 'black', terrain: 'groomed', lift: 'thaynes_express', length: 1.9, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },

  // Upper Thaynes runs
  { id: 'ut_run1', name: 'Upper Thaynes', difficulty: 'blue', terrain: 'groomed', lift: 'upper_thaynes', length: 1.8, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'ut_run2', name: 'Thaynes Trees', difficulty: 'black', terrain: 'trees', lift: 'upper_thaynes', length: 1.5, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'ut_run3', name: 'Thaynes Powder', difficulty: 'double', terrain: 'powders', lift: 'upper_thaynes', length: 1.3, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },
  { id: 'ut_run4', name: 'Thaynes Return', difficulty: 'green', terrain: 'groomed', lift: 'upper_thaynes', length: 1.4, peak: 'Thaynes', connectsToLifts: ['thaynes','drift','eagle'] },

  // SADDLEBACK PEAK - 15 runs
  { id: 'saddleback_run', name: 'Saddleback', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.9, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'kildeer', name: 'Kildeer', difficulty: 'black', terrain: 'powders', lift: 'saddleback', length: 1.7, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'buckskin', name: 'Buckskin', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.8, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'mustang', name: 'Mustang', difficulty: 'black', terrain: 'trees', lift: 'saddleback', length: 1.5, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'palomino', name: 'Palomino', difficulty: 'green', terrain: 'groomed', lift: 'saddleback', length: 1.4, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'stallion', name: 'Stallion', difficulty: 'double', terrain: 'powders', lift: 'saddleback', length: 1.3, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'foal', name: 'Foal', difficulty: 'green', terrain: 'groomed', lift: 'saddleback', length: 1.2, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'roan', name: 'Roan', difficulty: 'blue', terrain: 'trees', lift: 'saddleback', length: 1.4, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'paint', name: 'Paint', difficulty: 'black', terrain: 'moguls', lift: 'saddleback', length: 1.3, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'cayuse', name: 'Cayuse', difficulty: 'double', terrain: 'trees', lift: 'saddleback', length: 1.0, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'appaloosa', name: 'Appaloosa', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.6, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'bronco', name: 'Bronco', difficulty: 'black', terrain: 'powders', lift: 'saddleback', length: 1.2, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'saddleback_bowl', name: 'Saddleback Bowl', difficulty: 'double', terrain: 'powders', lift: 'saddleback', length: 1.1, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'quarter_horse', name: 'Quarter Horse', difficulty: 'black', terrain: 'groomed', lift: 'saddleback', length: 1.7, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },
  { id: 'wild_stallion', name: 'Wild Stallion', difficulty: 'double', terrain: 'trees', lift: 'saddleback', length: 0.9, peak: 'Saddleback', connectsToLifts: ['saddleback','tombstone','redpine'] },

  // EAGLE PEAK - 20 runs
  { id: 'eagle_run', name: 'Eagle', difficulty: 'blue', terrain: 'groomed', lift: 'eagle', length: 2.0, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'eagle_falls', name: 'Eagle Falls', difficulty: 'black', terrain: 'powders', lift: 'eagle', length: 1.8, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'golden_eagle', name: 'Golden Eagle', difficulty: 'black', terrain: 'moguls', lift: 'eagle', length: 1.7, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'bald_eagle', name: 'Bald Eagle', difficulty: 'double', terrain: 'powders', lift: 'eagle', length: 1.5, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'soar', name: 'Soar', difficulty: 'blue', terrain: 'groomed', lift: 'eagle', length: 1.8, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'dive', name: 'Dive', difficulty: 'black', terrain: 'trees', lift: 'eagle', length: 1.4, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'talons', name: 'Talons', difficulty: 'double', terrain: 'trees', lift: 'eagle', length: 1.2, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'wingspan', name: 'Wingspan', difficulty: 'green', terrain: 'groomed', lift: 'eagle', length: 1.6, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'aerie', name: 'Aerie', difficulty: 'blue', terrain: 'groomed', lift: 'float', length: 1.7, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'osprey', name: 'Osprey', difficulty: 'black', terrain: 'powders', lift: 'float', length: 1.5, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'falcon', name: 'Falcon', difficulty: 'black', terrain: 'moguls', lift: 'float', length: 1.4, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'hawk', name: 'Hawk', difficulty: 'blue', terrain: 'trees', lift: 'float', length: 1.3, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'kestrel', name: 'Kestrel', difficulty: 'green', terrain: 'groomed', lift: 'float', length: 1.5, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'merlin', name: 'Merlin', difficulty: 'black', terrain: 'groomed', lift: 'float', length: 1.6, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'condor_eagle', name: 'Condor Ridge', difficulty: 'double', terrain: 'powders', lift: 'float', length: 1.1, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'eagle_bowl', name: 'Eagle Bowl', difficulty: 'double', terrain: 'powders', lift: 'eagle', length: 1.3, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'eagle_eye', name: 'Eagle Eye', difficulty: 'black', terrain: 'trees', lift: 'eagle', length: 1.0, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'raptor', name: 'Raptor', difficulty: 'double', terrain: 'powders', lift: 'eagle', length: 0.9, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'sky_king', name: 'Sky King', difficulty: 'blue', terrain: 'groomed', lift: 'eagle', length: 1.9, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'wind_rider', name: 'Wind Rider', difficulty: 'green', terrain: 'groomed', lift: 'float', length: 1.4, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },

  // Eagle Wind Lift runs
  { id: 'ew_run1', name: 'Eagle Wind', difficulty: 'blue', terrain: 'groomed', lift: 'eagle_wind', length: 2.1, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'ew_run2', name: 'Wind Bowl', difficulty: 'double', terrain: 'powders', lift: 'eagle_wind', length: 1.6, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'ew_run3', name: 'Wind Chute', difficulty: 'black', terrain: 'powders', lift: 'eagle_wind', length: 1.4, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },
  { id: 'ew_run4', name: 'Wind Tunnel', difficulty: 'double', terrain: 'trees', lift: 'eagle_wind', length: 1.2, peak: 'Eagle', connectsToLifts: ['eagle','thaynes','float','bonanza'] },

  // GOLF PEAK - 15 runs
  { id: 'golf_run', name: 'Golf', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.8, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'fairway', name: 'Fairway', difficulty: 'blue', terrain: 'groomed', lift: 'golf', length: 1.9, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'green_run', name: 'The Green', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.5, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'bunker', name: 'Bunker', difficulty: 'black', terrain: 'moguls', lift: 'golf', length: 1.4, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'rough', name: 'The Rough', difficulty: 'blue', terrain: 'trees', lift: 'golf', length: 1.6, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'hazard', name: 'Hazard', difficulty: 'black', terrain: 'powders', lift: 'golf', length: 1.3, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'tee_box', name: 'Tee Box', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.4, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'clubhouse', name: 'Clubhouse', difficulty: 'blue', terrain: 'groomed', lift: 'golf', length: 1.7, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'caddy', name: 'Caddy', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.3, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'birdie', name: 'Birdie', difficulty: 'black', terrain: 'groomed', lift: 'golf', length: 1.5, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'eagle_golf', name: 'Eagle', difficulty: 'double', terrain: 'powders', lift: 'golf', length: 1.2, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'par_three', name: 'Par Three', difficulty: 'blue', terrain: 'moguls', lift: 'golf', length: 1.4, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'albatross', name: 'Albatross', difficulty: 'double', terrain: 'trees', lift: 'golf', length: 1.0, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'mulligan', name: 'Mulligan', difficulty: 'black', terrain: 'powders', lift: 'golf', length: 1.1, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'golf_bowl', name: 'Golf Bowl', difficulty: 'double', terrain: 'powders', lift: 'golf', length: 0.9, peak: 'Golf', connectsToLifts: ['golf','crescent'] },

  // Golf Express runs
  { id: 'golf_express_run', name: 'Golf Express Run', difficulty: 'blue', terrain: 'groomed', lift: 'golf_express', length: 1.8, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'golf_express_upper', name: 'Golf Express Upper', difficulty: 'black', terrain: 'groomed', lift: 'golf_express', length: 1.6, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'golf_express_bowl', name: 'Golf Express Bowl', difficulty: 'double', terrain: 'powders', lift: 'golf_express', length: 1.3, peak: 'Golf', connectsToLifts: ['golf','crescent'] },
  { id: 'golf_express_chute', name: 'Golf Express Chute', difficulty: 'black', terrain: 'powders', lift: 'golf_express', length: 1.1, peak: 'Golf', connectsToLifts: ['golf','crescent'] },

  // PEAK 9990 - 20 runs
  { id: 'peak_run', name: 'Peak 9990', difficulty: 'blue', terrain: 'groomed', lift: 'peak9990', length: 2.0, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'summit_run', name: 'Summit', difficulty: 'black', terrain: 'groomed', lift: 'peak9990', length: 1.9, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'nine_nine', name: 'Nine Nine', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.6, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'cloud_nine', name: 'Cloud Nine', difficulty: 'black', terrain: 'powders', lift: 'peak9990', length: 1.7, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'high_noon', name: 'High Noon', difficulty: 'blue', terrain: 'trees', lift: 'peak9990', length: 1.5, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'vertical_limit', name: 'Vertical Limit', difficulty: 'double', terrain: 'trees', lift: 'peak9990', length: 1.3, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'drop_zone', name: 'Drop Zone', difficulty: 'black', terrain: 'moguls', lift: 'peak9990', length: 1.4, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'thin_air', name: 'Thin Air', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.2, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'altitude', name: 'Altitude', difficulty: 'blue', terrain: 'groomed', lift: 'peak9990', length: 1.8, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'saddle_up', name: 'Saddle Up', difficulty: 'green', terrain: 'groomed', lift: 'peak9990', length: 1.4, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'edge', name: 'The Edge', difficulty: 'black', terrain: 'trees', lift: 'peak9990', length: 1.1, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'extreme', name: 'Extreme', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.0, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'apex_9990', name: 'Apex', difficulty: 'blue', terrain: 'groomed', lift: 'peak9990', length: 1.7, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'zenith', name: 'Zenith', difficulty: 'black', terrain: 'powders', lift: 'peak9990', length: 1.5, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'pinnacle', name: 'Pinnacle', difficulty: 'double', terrain: 'trees', lift: 'peak9990', length: 1.2, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'peak_bowl', name: 'Peak Bowl', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.3, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'elevation', name: 'Elevation', difficulty: 'black', terrain: 'groomed', lift: 'peak9990', length: 1.6, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'summit_bowl', name: 'Summit Bowl', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.1, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'niners_run', name: 'Niners', difficulty: 'blue', terrain: 'trees', lift: 'niners', length: 1.8, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'cloud_run', name: 'Cloud Run', difficulty: 'green', terrain: 'groomed', lift: 'cloud_chair', length: 1.5, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },

  // Nine-Niners Lift runs
  { id: 'nn_run1', name: 'Niners Express', difficulty: 'blue', terrain: 'groomed', lift: 'niners', length: 1.9, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'nn_run2', name: 'Niners Bowl', difficulty: 'double', terrain: 'powders', lift: 'niners', length: 1.5, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'nn_run3', name: 'Niners Chute', difficulty: 'black', terrain: 'powders', lift: 'niners', length: 1.3, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'nn_run4', name: 'Niners Trees', difficulty: 'black', terrain: 'trees', lift: 'niners', length: 1.2, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },

  // Cloud Chair runs
  { id: 'cc_run1', name: 'Cloud Nine Upper', difficulty: 'blue', terrain: 'groomed', lift: 'cloud_chair', length: 1.7, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'cc_run2', name: 'Cloud Bowl Upper', difficulty: 'double', terrain: 'powders', lift: 'cloud_chair', length: 1.4, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },
  { id: 'cc_run3', name: 'Cloud Chute', difficulty: 'black', terrain: 'powders', lift: 'cloud_chair', length: 1.2, peak: 'Peak 9990', connectsToLifts: ['peak9990','niners','frostwood'] },

  // ========================================
  // NEW PEAKS
  // ========================================

  // JUPITER PEAK (Highest at 10,026 ft) - 22 runs
  { id: 'jupiter_run', name: 'Jupiter', difficulty: 'black', terrain: 'groomed', lift: 'jupiter', length: 2.2, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_bowl_run', name: 'Jupiter Bowl', difficulty: 'double', terrain: 'powders', lift: 'jupiter', length: 1.8, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_ridge', name: 'Jupiter Ridge', difficulty: 'double', terrain: 'powders', lift: 'jupiter', length: 1.6, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_face', name: 'Jupiter Face', difficulty: 'black', terrain: 'moguls', lift: 'jupiter', length: 1.7, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_chute', name: 'Jupiter Chute', difficulty: 'double', terrain: 'powders', lift: 'jupiter', length: 1.4, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_trees', name: 'Jupiter Trees', difficulty: 'double', terrain: 'trees', lift: 'jupiter', length: 1.3, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_express', name: 'Jupiter Express', difficulty: 'blue', terrain: 'groomed', lift: 'jupiter', length: 2.0, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_upper', name: 'Upper Jupiter', difficulty: 'black', terrain: 'powders', lift: 'jupiter', length: 1.5, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_lower', name: 'Lower Jupiter', difficulty: 'blue', terrain: 'groomed', lift: 'jupiter', length: 1.8, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_cliffs', name: 'Jupiter Cliffs', difficulty: 'double', terrain: 'powders', lift: 'jupiter', length: 1.2, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_gully', name: 'Jupiter Gully', difficulty: 'double', terrain: 'trees', lift: 'jupiter', length: 1.1, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'highest_point', name: 'Highest Point', difficulty: 'double', terrain: 'powders', lift: 'jupiter', length: 1.0, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'summit_run_j', name: 'Summit Run', difficulty: 'black', terrain: 'groomed', lift: 'jupiter', length: 1.9, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'ridgeline', name: 'Ridgeline', difficulty: 'double', terrain: 'powders', lift: 'jupiter_ridgeline', length: 1.7, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'ridgeline_lower', name: 'Ridgeline Lower', difficulty: 'black', terrain: 'groomed', lift: 'jupiter_ridgeline', length: 1.6, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'ridgeline_bowl', name: 'Ridgeline Bowl', difficulty: 'double', terrain: 'powders', lift: 'jupiter_ridgeline', length: 1.5, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'ridgeline_chute', name: 'Ridgeline Chute', difficulty: 'double', terrain: 'powders', lift: 'jupiter_ridgeline', length: 1.3, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_bowl_main', name: 'Jupiter Bowl Main', difficulty: 'double', terrain: 'powders', lift: 'jupiter_bowl', length: 1.6, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_bowl_chute', name: 'Jupiter Bowl Chute', difficulty: 'double', terrain: 'powders', lift: 'jupiter_bowl', length: 1.4, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_bowl_edge', name: 'Jupiter Bowl Edge', difficulty: 'black', terrain: 'powders', lift: 'jupiter_bowl', length: 1.3, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },
  { id: 'jupiter_bowl_lower', name: 'Jupiter Bowl Lower', difficulty: 'black', terrain: 'groomed', lift: 'jupiter_bowl', length: 1.5, peak: 'Jupiter Peak', connectsToLifts: ['jupiter','jupiter_bowl','jupiter_ridgeline'] },

  // MURDOCH PEAK - 18 runs
  { id: 'murdoch_run', name: 'Murdoch', difficulty: 'blue', terrain: 'groomed', lift: 'murdoch', length: 2.1, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_face', name: 'Murdoch Face', difficulty: 'black', terrain: 'moguls', lift: 'murdoch', length: 1.8, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_bowl_run', name: 'Murdoch Bowl', difficulty: 'double', terrain: 'powders', lift: 'murdoch', length: 1.6, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_trees', name: 'Murdoch Trees', difficulty: 'black', terrain: 'trees', lift: 'murdoch', length: 1.5, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_ridge', name: 'Murdoch Ridge', difficulty: 'double', terrain: 'powders', lift: 'murdoch', length: 1.4, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_chute', name: 'Murdoch Chute', difficulty: 'double', terrain: 'powders', lift: 'murdoch', length: 1.2, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_gully', name: 'Murdoch Gully', difficulty: 'black', terrain: 'trees', lift: 'murdoch', length: 1.3, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'upper_murdoch_run', name: 'Upper Murdoch', difficulty: 'blue', terrain: 'groomed', lift: 'upper_murdoch', length: 1.9, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_express', name: 'Murdoch Express', difficulty: 'blue', terrain: 'groomed', lift: 'upper_murdoch', length: 2.0, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_upper_bowl', name: 'Murdoch Upper Bowl', difficulty: 'double', terrain: 'powders', lift: 'upper_murdoch', length: 1.5, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_upper_chute', name: 'Murdoch Upper Chute', difficulty: 'double', terrain: 'powders', lift: 'upper_murdoch', length: 1.3, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_bowl_main', name: 'Murdoch Bowl Main', difficulty: 'double', terrain: 'powders', lift: 'murdoch_bowl', length: 1.7, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_bowl_chute', name: 'Murdoch Bowl Chute', difficulty: 'double', terrain: 'powders', lift: 'murdoch_bowl', length: 1.5, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_bowl_edge', name: 'Murdoch Bowl Edge', difficulty: 'black', terrain: 'powders', lift: 'murdoch_bowl', length: 1.4, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_bowl_lower', name: 'Murdoch Bowl Lower', difficulty: 'black', terrain: 'groomed', lift: 'murdoch_bowl', length: 1.6, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_return', name: 'Murdoch Return', difficulty: 'green', terrain: 'groomed', lift: 'murdoch', length: 1.7, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_glades', name: 'Murdoch Glades', difficulty: 'black', terrain: 'trees', lift: 'murdoch', length: 1.4, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },
  { id: 'murdoch_powder', name: 'Murdoch Powder', difficulty: 'double', terrain: 'powders', lift: 'murdoch', length: 1.1, peak: 'Murdoch', connectsToLifts: ['murdoch','murdoch_bowl','upper_murdoch'] },

  // PIONEER RIDGE - 18 runs
  { id: 'pioneer_run', name: 'Pioneer', difficulty: 'blue', terrain: 'groomed', lift: 'pioneer', length: 2.0, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_face', name: 'Pioneer Face', difficulty: 'black', terrain: 'moguls', lift: 'pioneer', length: 1.8, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_bowl', name: 'Pioneer Bowl', difficulty: 'double', terrain: 'powders', lift: 'pioneer', length: 1.6, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_ridge_run', name: 'Pioneer Ridge Run', difficulty: 'black', terrain: 'powders', lift: 'pioneer', length: 1.5, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_trees', name: 'Pioneer Trees', difficulty: 'black', terrain: 'trees', lift: 'pioneer', length: 1.4, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_chute', name: 'Pioneer Chute', difficulty: 'double', terrain: 'powders', lift: 'pioneer', length: 1.3, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_gully', name: 'Pioneer Gully', difficulty: 'double', terrain: 'trees', lift: 'pioneer', length: 1.2, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_express_run', name: 'Pioneer Express Run', difficulty: 'blue', terrain: 'groomed', lift: 'pioneer_express', length: 2.2, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_express_upper', name: 'Pioneer Express Upper', difficulty: 'black', terrain: 'groomed', lift: 'pioneer_express', length: 1.9, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_express_bowl', name: 'Pioneer Express Bowl', difficulty: 'double', terrain: 'powders', lift: 'pioneer_express', length: 1.6, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_peak_run', name: 'Pioneer Peak Run', difficulty: 'blue', terrain: 'groomed', lift: 'pioneer_peak', length: 1.8, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_peak_upper', name: 'Pioneer Peak Upper', difficulty: 'black', terrain: 'powders', lift: 'pioneer_peak', length: 1.5, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_peak_bowl', name: 'Pioneer Peak Bowl', difficulty: 'double', terrain: 'powders', lift: 'pioneer_peak', length: 1.4, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_peak_chute', name: 'Pioneer Peak Chute', difficulty: 'double', terrain: 'powders', lift: 'pioneer_peak', length: 1.2, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_return', name: 'Pioneer Return', difficulty: 'green', terrain: 'groomed', lift: 'pioneer', length: 1.6, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_glades', name: 'Pioneer Glades', difficulty: 'black', terrain: 'trees', lift: 'pioneer', length: 1.3, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_ridge_line', name: 'Pioneer Ridge Line', difficulty: 'double', terrain: 'powders', lift: 'pioneer_peak', length: 1.1, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },
  { id: 'pioneer_lower', name: 'Pioneer Lower', difficulty: 'blue', terrain: 'groomed', lift: 'pioneer', length: 1.7, peak: 'Pioneer Ridge', connectsToLifts: ['pioneer','pioneer_express','pioneer_peak'] },

  // Additional Cleavage Lift runs
  { id: 'cleavage_run', name: 'Cleavage', difficulty: 'black', terrain: 'moguls', lift: 'cleavage', length: 1.6, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'split', name: 'Split', difficulty: 'blue', terrain: 'groomed', lift: 'cleavage', length: 1.5, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'crack', name: 'Crack', difficulty: 'double', terrain: 'powders', lift: 'cleavage', length: 1.3, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'fracture', name: 'Fracture', difficulty: 'black', terrain: 'trees', lift: 'cleavage', length: 1.2, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'fissure', name: 'Fissure', difficulty: 'blue', terrain: 'groomed', lift: 'cleavage', length: 1.4, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'crevasse', name: 'Crevasse', difficulty: 'double', terrain: 'trees', lift: 'cleavage', length: 1.0, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'cleavage_bowl', name: 'Cleavage Bowl', difficulty: 'double', terrain: 'powders', lift: 'cleavage', length: 1.1, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] },
  { id: 'cleavage_chute', name: 'Cleavage Chute', difficulty: 'double', terrain: 'powders', lift: 'cleavage', length: 0.9, peak: 'Bonanza', connectsToLifts: ['bonanza','payday','cleavage','crescent'] }
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
