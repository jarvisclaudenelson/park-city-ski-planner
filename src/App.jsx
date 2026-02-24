import React, { useState, useEffect } from 'react';

const parkCityData = {
  lifts: [
    { id: 'quicksilver', name: 'Quicksilver Gondola', base: 'Canyons Village', peak: 'Silver Cloud' },
    { id: 'canyons', name: 'Canyons Gondola', base: 'Canyons Village', peak: 'Canyons Peak' },
    { id: 'tombstone', name: 'Tombstone Lift', base: 'Canyons Village', peak: 'Tombstone' },
    { id: 'saddleback', name: 'Saddleback Lift', base: 'Canyons Village', peak: 'Saddleback' },
    { id: 'redpine', name: 'Red Pine Lift', base: 'Canyons Village', peak: 'Red Pine' },
    { id: 'homestake', name: 'Homestake Lift', base: 'Canyons Village', peak: 'Homestake' },
    { id: 'frostwood', name: 'Frostwood Lift', base: 'Canyons Village', peak: 'Frostwood' },
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
  ],
  runs: [
    // Treasure Peak (Legacy area) - Payday Lift
    { id: 'homerun', name: 'Homerun', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 2.5, peak: 'Treasure' },
    { id: 'claimjumper', name: 'Claimjumper', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 2.2, peak: 'Treasure' },
    { id: 'discovery', name: 'Discovery', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 1.8, peak: 'Treasure' },
    { id: 'pickaxe', name: 'Pickaxe', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 1.9, peak: 'Treasure' },
    { id: 'naildriver', name: 'Naildriver', difficulty: 'black', terrain: 'groomed', lift: 'payday', length: 1.5, peak: 'Treasure' },
    { id: 'last_chance', name: 'Last Chance', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 1.6, peak: 'Treasure' },
    { id: 'pioneer', name: 'Pioneer', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 1.4, peak: 'Treasure' },
    { id: 'silver_hollow', name: 'Silver Hollow', difficulty: 'blue', terrain: 'trees', lift: 'payday', length: 1.3, peak: 'Treasure' },
    { id: 'ontario_bowl', name: 'Ontario Bowl', difficulty: 'double', terrain: 'powders', lift: 'payday', length: 1.2, peak: 'Treasure' },
    { id: 'bridge_cone', name: 'Bridge Cone', difficulty: 'black', terrain: 'moguls', lift: 'payday', length: 1.1, peak: 'Treasure' },
    { id: 'milly_bowl', name: 'Milly Bowl', difficulty: 'double', terrain: 'powders', lift: 'payday', length: 1.0, peak: 'Treasure' },

    // Bonanza Peak - Bonanza Lift
    { id: 'bonanza', name: 'Bonanza', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 2.4, peak: 'Bonanza' },
    { id: 'STS', name: 'Shooting Star', difficulty: 'black', terrain: 'groomed', lift: 'bonanza', length: 2.1, peak: 'Bonanza' },
    { id: 'comet', name: 'Comet', difficulty: 'blue', terrain: 'moguls', lift: 'bonanza', length: 1.7, peak: 'Bonanza' },
    { id: 'asteroid', name: 'Asteroid', difficulty: 'black', terrain: 'moguls', lift: 'bonanza', length: 1.6, peak: 'Bonanza' },
    { id: 'flare', name: 'Flare', difficulty: 'double', terrain: 'powders', lift: 'bonanza', length: 1.3, peak: 'Bonanza' },
    { id: 'star_gazer', name: 'Star Gazer', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 1.8, peak: 'Bonanza' },
    { id: 'meteor', name: 'Meteor', difficulty: 'black', terrain: 'groomed', lift: 'bonanza', length: 1.5, peak: 'Bonanza' },
    { id: 'rocket', name: 'Rocket', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 1.9, peak: 'Bonanza' },
    { id: 'space_station', name: 'Space Station', difficulty: 'green', terrain: 'groomed', lift: 'bonanza', length: 1.4, peak: 'Bonanza' },
    { id: 'gravity', name: 'Gravity', difficulty: 'black', terrain: 'trees', lift: 'bonanza', length: 1.2, peak: 'Bonanza' },
    { id: 'orbit', name: 'Orbit', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 1.6, peak: 'Bonanza' },
    { id: 'launch_pad', name: 'Launch Pad', difficulty: 'green', terrain: 'groomed', lift: 'bonanza', length: 1.1, peak: 'Bonanza' },
    { id: 'moon_dust', name: 'Moon Dust', difficulty: 'double', terrain: 'powders', lift: 'bonanza', length: 0.9, peak: 'Bonanza' },

    // Crescent Peak - Crescent Lift
    { id: 'crescent', name: 'Crescent', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 2.0, peak: 'Crescent' },
    { id: 'crescent_face', name: 'Crescent Face', difficulty: 'black', terrain: 'moguls', lift: 'crescent', length: 1.8, peak: 'Crescent' },
    { id: 'crescent_bowl', name: 'Crescent Bowl', difficulty: 'black', terrain: 'powders', lift: 'crescent', length: 1.5, peak: 'Crescent' },
    { id: 'solar', name: 'Solar', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 1.7, peak: 'Crescent' },
    { id: 'lunar', name: 'Lunar', difficulty: 'black', terrain: 'groomed', lift: 'crescent', length: 1.6, peak: 'Crescent' },
    { id: 'eclipse', name: 'Eclipse', difficulty: 'double', terrain: 'powders', lift: 'crescent', length: 1.2, peak: 'Crescent' },
    { id: 'waxing', name: 'Waxing', difficulty: 'green', terrain: 'groomed', lift: 'crescent', length: 1.4, peak: 'Crescent' },
    { id: 'waning', name: 'Waning', difficulty: 'blue', terrain: 'trees', lift: 'crescent', length: 1.3, peak: 'Crescent' },
    { id: 'gibbous', name: 'Gibbous', difficulty: 'black', terrain: 'moguls', lift: 'crescent', length: 1.1, peak: 'Crescent' },
    { id: 'new_moon', name: 'New Moon', difficulty: 'double', terrain: 'trees', lift: 'crescent', length: 0.9, peak: 'Crescent' },
    { id: 'phases', name: 'Phases', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 1.5, peak: 'Crescent' },
    { id: 'tidal', name: 'Tidal', difficulty: 'green', terrain: 'groomed', lift: 'crescent', length: 1.2, peak: 'Crescent' },

    // Town Lift area
    { id: 'townrun', name: 'Town Run', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 2.2, peak: 'Town' },
    { id: 'mainstreet', name: 'Mainstreet', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 2.0, peak: 'Town' },
    { id: 'millsite', name: 'Millsite', difficulty: 'black', terrain: 'moguls', lift: 'townlift', length: 1.8, peak: 'Town' },
    { id: 'cream', name: 'Cream', difficulty: 'double', terrain: 'powders', lift: 'townlift', length: 1.4, peak: 'Town' },
    { id: 'old_town', name: 'Old Town', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 1.9, peak: 'Town' },
    { id: 'heber_ave', name: 'Heber Avenue', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 1.7, peak: 'Town' },
    { id: 'empire', name: 'Empire', difficulty: 'black', terrain: 'groomed', lift: 'townlift', length: 1.6, peak: 'Town' },
    { id: 'prospector', name: 'Prospector', difficulty: 'blue', terrain: 'trees', lift: 'townlift', length: 1.5, peak: 'Town' },
    { id: 'silver_king', name: 'Silver King', difficulty: 'black', terrain: 'powders', lift: 'townlift', length: 1.3, peak: 'Town' },
    { id: 'upper_main', name: 'Upper Main', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 1.4, peak: 'Town' },
    { id: 'lower_main', name: 'Lower Main', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 1.3, peak: 'Town' },

    // Silver Cloud Peak - Silver Cloud Lift, Condor Lift
    { id: 'silvercloud_run', name: 'Silver Cloud', difficulty: 'blue', terrain: 'groomed', lift: 'silvercloud', length: 2.3, peak: 'Silver Cloud' },
    { id: 'dreamscape', name: 'Dreamscape', difficulty: 'blue', terrain: 'groomed', lift: 'silvercloud', length: 2.1, peak: 'Silver Cloud' },
    { id: 'chevron', name: 'Chevron', difficulty: 'black', terrain: 'moguls', lift: 'silvercloud', length: 1.9, peak: 'Silver Cloud' },
    { id: 'conquer', name: 'Conquer', difficulty: 'black', terrain: 'groomed', lift: 'silvercloud', length: 2.0, peak: 'Silver Cloud' },
    { id: 'victory', name: 'Victory', difficulty: 'double', terrain: 'powders', lift: 'silvercloud', length: 1.5, peak: 'Silver Cloud' },
    { id: 'condor_run', name: 'Condor', difficulty: 'black', terrain: 'groomed', lift: 'condor', length: 2.0, peak: 'Silver Cloud' },
    { id: 'high_line', name: 'High Line', difficulty: 'double', terrain: 'powders', lift: 'condor', length: 1.4, peak: 'Silver Cloud' },
    { id: 'alta_view', name: 'Alta View', difficulty: 'blue', terrain: 'groomed', lift: 'condor', length: 1.8, peak: 'Silver Cloud' },
    { id: 'sunrise', name: 'Sunrise', difficulty: 'green', terrain: 'groomed', lift: 'condor', length: 1.5, peak: 'Silver Cloud' },
    { id: 'sunset', name: 'Sunset', difficulty: 'blue', terrain: 'groomed', lift: 'condor', length: 1.7, peak: 'Silver Cloud' },
    { id: 'nimbus', name: 'Nimbus', difficulty: 'black', terrain: 'moguls', lift: 'condor', length: 1.3, peak: 'Silver Cloud' },
    { id: 'stratus', name: 'Stratus', difficulty: 'blue', terrain: 'trees', lift: 'condor', length: 1.2, peak: 'Silver Cloud' },
    { id: 'cumulus', name: 'Cumulus', difficulty: 'green', terrain: 'groomed', lift: 'condor', length: 1.4, peak: 'Silver Cloud' },
    { id: 'cirrus', name: 'Cirrus', difficulty: 'black', terrain: 'powders', lift: 'condor', length: 1.1, peak: 'Silver Cloud' },
    { id: 'apex', name: 'Apex', difficulty: 'double', terrain: 'trees', lift: 'condor', length: 0.9, peak: 'Silver Cloud' },

    // Canyons Peak (Quicksilver area) - Quicksilver Gondola, Canyons Gondola
    { id: 'quicksilver_run', name: 'Quicksilver', difficulty: 'blue', terrain: 'groomed', lift: 'quicksilver', length: 2.5, peak: 'Silver Cloud' },
    { id: 'redstone', name: 'Redstone', difficulty: 'blue', terrain: 'groomed', lift: 'quicksilver', length: 2.2, peak: 'Silver Cloud' },
    { id: 'sirocco', name: 'Sirocco', difficulty: 'black', terrain: 'powders', lift: 'quicksilver', length: 1.8, peak: 'Silver Cloud' },
    { id: 'chinook', name: 'Chinook', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 2.1, peak: 'Canyons Peak' },
    { id: 'bighorn', name: 'Bighorn', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 1.9, peak: 'Canyons Peak' },
    { id: 'mountain', name: 'Mountain', difficulty: 'black', terrain: 'moguls', lift: 'canyons', length: 1.8, peak: 'Canyons Peak' },
    { id: 'mercury', name: 'Mercury', difficulty: 'black', terrain: 'groomed', lift: 'canyons', length: 1.6, peak: 'Canyons Peak' },
    { id: 'venus', name: 'Venus', difficulty: 'blue', terrain: 'trees', lift: 'canyons', length: 1.5, peak: 'Canyons Peak' },
    { id: 'mars', name: 'Mars', difficulty: 'black', terrain: 'powders', lift: 'canyons', length: 1.4, peak: 'Canyons Peak' },
    { id: 'jupiter', name: 'Jupiter', difficulty: 'double', terrain: 'powders', lift: 'canyons', length: 1.2, peak: 'Canyons Peak' },
    { id: 'saturn', name: 'Saturn', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 1.7, peak: 'Canyons Peak' },
    { id: 'uranus', name: 'Uranus', difficulty: 'green', terrain: 'groomed', lift: 'canyons', length: 1.3, peak: 'Canyons Peak' },
    { id: 'neptune', name: 'Neptune', difficulty: 'black', terrain: 'trees', lift: 'canyons', length: 1.1, peak: 'Canyons Peak' },
    { id: 'pluto', name: 'Pluto', difficulty: 'double', terrain: 'trees', lift: 'canyons', length: 0.8, peak: 'Canyons Peak' },

    // Tombstone Peak - Tombstone Lift
    { id: 'tombstone_run', name: 'Tombstone', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 2.0, peak: 'Tombstone' },
    { id: 'kisses', name: 'Kisses', difficulty: 'black', terrain: 'powders', lift: 'tombstone', length: 1.7, peak: 'Tombstone' },
    { id: 'reef', name: 'Reef', difficulty: 'black', terrain: 'moguls', lift: 'tombstone', length: 1.6, peak: 'Tombstone' },
    { id: 'graves', name: 'Graves', difficulty: 'double', terrain: 'powders', lift: 'tombstone', length: 1.4, peak: 'Tombstone' },
    { id: 'outlaw', name: 'Outlaw', difficulty: 'black', terrain: 'groomed', lift: 'tombstone', length: 1.8, peak: 'Tombstone' },
    { id: 'desperado', name: 'Desperado', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 1.5, peak: 'Tombstone' },
    { id: 'bandit', name: 'Bandit', difficulty: 'black', terrain: 'trees', lift: 'tombstone', length: 1.3, peak: 'Tombstone' },
    { id: 'rustler', name: 'Rustler', difficulty: 'double', terrain: 'trees', lift: 'tombstone', length: 1.1, peak: 'Tombstone' },
    { id: 'sheriff', name: 'Sheriff', difficulty: 'green', terrain: 'groomed', lift: 'tombstone', length: 1.4, peak: 'Tombstone' },
    { id: 'deputy', name: 'Deputy', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 1.2, peak: 'Tombstone' },
    { id: 'marshall', name: 'Marshall', difficulty: 'black', terrain: 'moguls', lift: 'tombstone', length: 1.0, peak: 'Tombstone' },
    { id: 'posse', name: 'Posse', difficulty: 'double', terrain: 'powders', lift: 'tombstone', length: 0.9, peak: 'Tombstone' },

    // Red Pine Peak - Red Pine Lift, Ironwood Lift
    { id: 'redpine_run', name: 'Red Pine', difficulty: 'blue', terrain: 'groomed', lift: 'redpine', length: 2.2, peak: 'Red Pine' },
    { id: 'wedge', name: 'Wedge', difficulty: 'black', terrain: 'powders', lift: 'redpine', length: 1.9, peak: 'Red Pine' },
    { id: 'pinecone', name: 'Pinecone', difficulty: 'blue', terrain: 'trees', lift: 'redpine', length: 1.7, peak: 'Red Pine' },
    { id: 'ironwood_run', name: 'Ironwood', difficulty: 'blue', terrain: 'groomed', lift: 'ironwood', length: 1.8, peak: 'Red Pine' },
    { id: 'juniper', name: 'Juniper', difficulty: 'green', terrain: 'groomed', lift: 'ironwood', length: 1.5, peak: 'Red Pine' },
    { id: 'spruce', name: 'Spruce', difficulty: 'black', terrain: 'moguls', lift: 'ironwood', length: 1.4, peak: 'Red Pine' },
    { id: 'fir', name: 'Fir', difficulty: 'blue', terrain: 'groomed', lift: 'ironwood', length: 1.6, peak: 'Red Pine' },
    { id: 'cedar', name: 'Cedar', difficulty: 'black', terrain: 'trees', lift: 'ironwood', length: 1.3, peak: 'Red Pine' },
    { id: 'aspen', name: 'Aspen', difficulty: 'blue', terrain: 'groomed', lift: 'redpine', length: 1.5, peak: 'Red Pine' },
    { id: 'maple', name: 'Maple', difficulty: 'green', terrain: 'groomed', lift: 'redpine', length: 1.4, peak: 'Red Pine' },
    { id: 'oak', name: 'Oak', difficulty: 'black', terrain: 'powders', lift: 'redpine', length: 1.2, peak: 'Red Pine' },
    { id: 'birch', name: 'Birch', difficulty: 'double', terrain: 'trees', lift: 'redpine', length: 0.9, peak: 'Red Pine' },

    // Homestake Peak - Homestake Lift
    { id: 'homestake_run', name: 'Homestake', difficulty: 'blue', terrain: 'groomed', lift: 'homestake', length: 2.1, peak: 'Homestake' },
    { id: 'dutch', name: 'Dutch', difficulty: 'black', terrain: 'moguls', lift: 'homestake', length: 1.8, peak: 'Homestake' },
    { id: 'miner', name: 'Miner', difficulty: 'green', terrain: 'groomed', lift: 'homestake', length: 1.6, peak: 'Homestake' },
    { id: 'prospector2', name: 'Prospector', difficulty: 'blue', terrain: 'groomed', lift: 'homestake', length: 1.9, peak: 'Homestake' },
    { id: 'sluice', name: 'Sluice', difficulty: 'black', terrain: 'trees', lift: 'homestake', length: 1.4, peak: 'Homestake' },
    { id: 'nugget', name: 'Nugget', difficulty: 'double', terrain: 'powders', lift: 'homestake', length: 1.2, peak: 'Homestake' },
    { id: 'vein', name: 'Vein', difficulty: 'blue', terrain: 'trees', lift: 'homestake', length: 1.3, peak: 'Homestake' },
    { id: 'lode', name: 'Lode', difficulty: 'black', terrain: 'groomed', lift: 'homestake', length: 1.5, peak: 'Homestake' },
    { id: 'placer', name: 'Placer', difficulty: 'green', terrain: 'groomed', lift: 'homestake', length: 1.2, peak: 'Homestake' },
    { id: 'quartz', name: 'Quartz', difficulty: 'black', terrain: 'moguls', lift: 'homestake', length: 1.1, peak: 'Homestake' },
    { id: 'fools_gold', name: 'Fools Gold', difficulty: 'double', terrain: 'trees', lift: 'homestake', length: 0.9, peak: 'Homestake' },

    // Thaynes Peak - Thaynes Canyon Lift, Drift Lift
    { id: 'thaynes_run', name: 'Thaynes', difficulty: 'blue', terrain: 'groomed', lift: 'thaynes', length: 2.0, peak: 'Thaynes' },
    { id: 'thaynes_face', name: 'Thaynes Face', difficulty: 'black', terrain: 'moguls', lift: 'thaynes', length: 1.8, peak: 'Thaynes' },
    { id: 'thaynes_bowl', name: 'Thaynes Bowl', difficulty: 'double', terrain: 'powders', lift: 'thaynes', length: 1.5, peak: 'Thaynes' },
    { id: 'drift_run', name: 'Drift', difficulty: 'blue', terrain: 'groomed', lift: 'drift', length: 1.6, peak: 'Thaynes' },
    { id: 'float_run', name: 'Float', difficulty: 'green', terrain: 'groomed', lift: 'drift', length: 1.4, peak: 'Thaynes' },
    { id: 'snow_drift', name: 'Snow Drift', difficulty: 'black', terrain: 'powders', lift: 'drift', length: 1.2, peak: 'Thaynes' },
    { id: 'blower', name: 'Blower', difficulty: 'double', terrain: 'powders', lift: 'drift', length: 1.0, peak: 'Thaynes' },
    { id: 'squall', name: 'Squall', difficulty: 'blue', terrain: 'trees', lift: 'drift', length: 1.3, peak: 'Thaynes' },
    { id: 'gust', name: 'Gust', difficulty: 'black', terrain: 'moguls', lift: 'drift', length: 1.1, peak: 'Thaynes' },
    { id: 'blizzard', name: 'Blizzard', difficulty: 'double', terrain: 'trees', lift: 'drift', length: 0.9, peak: 'Thaynes' },
    { id: 'whiteout', name: 'Whiteout', difficulty: 'blue', terrain: 'groomed', lift: 'thaynes', length: 1.7, peak: 'Thaynes' },
    { id: 'frost', name: 'Frost', difficulty: 'green', terrain: 'groomed', lift: 'thaynes', length: 1.4, peak: 'Thaynes' },
    { id: 'freeze', name: 'Freeze', difficulty: 'black', terrain: 'groomed', lift: 'thaynes', length: 1.5, peak: 'Thaynes' },

    // Saddleback - Saddleback Lift
    { id: 'saddleback_run', name: 'Saddleback', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.9, peak: 'Saddleback' },
    { id: 'kildeer', name: 'Kildeer', difficulty: 'black', terrain: 'powders', lift: 'saddleback', length: 1.7, peak: 'Saddleback' },
    { id: 'buckskin', name: 'Buckskin', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.8, peak: 'Saddleback' },
    { id: 'mustang', name: 'Mustang', difficulty: 'black', terrain: 'trees', lift: 'saddleback', length: 1.5, peak: 'Saddleback' },
    { id: 'palomino', name: 'Palomino', difficulty: 'green', terrain: 'groomed', lift: 'saddleback', length: 1.4, peak: 'Saddleback' },
    { id: 'stallion', name: 'Stallion', difficulty: 'double', terrain: 'powders', lift: 'saddleback', length: 1.3, peak: 'Saddleback' },
    { id: 'foal', name: 'Foal', difficulty: 'green', terrain: 'groomed', lift: 'saddleback', length: 1.2, peak: 'Saddleback' },
    { id: 'roan', name: 'Roan', difficulty: 'blue', terrain: 'trees', lift: 'saddleback', length: 1.4, peak: 'Saddleback' },
    { id: 'paint', name: 'Paint', difficulty: 'black', terrain: 'moguls', lift: 'saddleback', length: 1.3, peak: 'Saddleback' },
    { id: 'cayuse', name: 'Cayuse', difficulty: 'double', terrain: 'trees', lift: 'saddleback', length: 1.0, peak: 'Saddleback' },
    { id: 'appaloosa', name: 'Appaloosa', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.6, peak: 'Saddleback' },
    { id: 'bronco', name: 'Bronco', difficulty: 'black', terrain: 'powders', lift: 'saddleback', length: 1.2, peak: 'Saddleback' },

    // Eagle Peak - Eagle Lift, Float Lift
    { id: 'eagle_run', name: 'Eagle', difficulty: 'blue', terrain: 'groomed', lift: 'eagle', length: 2.0, peak: 'Eagle' },
    { id: 'eagle_falls', name: 'Eagle Falls', difficulty: 'black', terrain: 'powders', lift: 'eagle', length: 1.8, peak: 'Eagle' },
    { id: 'golden_eagle', name: 'Golden Eagle', difficulty: 'black', terrain: 'moguls', lift: 'eagle', length: 1.7, peak: 'Eagle' },
    { id: 'bald_eagle', name: 'Bald Eagle', difficulty: 'double', terrain: 'powders', lift: 'eagle', length: 1.5, peak: 'Eagle' },
    { id: 'soar', name: 'Soar', difficulty: 'blue', terrain: 'groomed', lift: 'eagle', length: 1.8, peak: 'Eagle' },
    { id: 'dive', name: 'Dive', difficulty: 'black', terrain: 'trees', lift: 'eagle', length: 1.4, peak: 'Eagle' },
    { id: 'talons', name: 'Talons', difficulty: 'double', terrain: 'trees', lift: 'eagle', length: 1.2, peak: 'Eagle' },
    { id: 'wingspan', name: 'Wingspan', difficulty: 'green', terrain: 'groomed', lift: 'eagle', length: 1.6, peak: 'Eagle' },
    { id: 'aerie', name: 'Aerie', difficulty: 'blue', terrain: 'groomed', lift: 'float', length: 1.7, peak: 'Eagle' },
    { id: 'osprey', name: 'Osprey', difficulty: 'black', terrain: 'powders', lift: 'float', length: 1.5, peak: 'Eagle' },
    { id: 'falcon', name: 'Falcon', difficulty: 'black', terrain: 'moguls', lift: 'float', length: 1.4, peak: 'Eagle' },
    { id: 'hawk', name: 'Hawk', difficulty: 'blue', terrain: 'trees', lift: 'float', length: 1.3, peak: 'Eagle' },
    { id: 'kestrel', name: 'Kestrel', difficulty: 'green', terrain: 'groomed', lift: 'float', length: 1.5, peak: 'Eagle' },
    { id: 'merlin', name: 'Merlin', difficulty: 'black', terrain: 'groomed', lift: 'float', length: 1.6, peak: 'Eagle' },
    { id: 'condor_eagle', name: 'Condor Ridge', difficulty: 'double', terrain: 'powders', lift: 'float', length: 1.1, peak: 'Eagle' },

    // Golf Peak - Golf Lift
    { id: 'golf_run', name: 'Golf', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.8, peak: 'Golf' },
    { id: 'fairway', name: 'Fairway', difficulty: 'blue', terrain: 'groomed', lift: 'golf', length: 1.9, peak: 'Golf' },
    { id: 'green_run', name: 'The Green', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.5, peak: 'Golf' },
    { id: 'bunker', name: 'Bunker', difficulty: 'black', terrain: 'moguls', lift: 'golf', length: 1.4, peak: 'Golf' },
    { id: 'rough', name: 'The Rough', difficulty: 'blue', terrain: 'trees', lift: 'golf', length: 1.6, peak: 'Golf' },
    { id: 'hazard', name: 'Hazard', difficulty: 'black', terrain: 'powders', lift: 'golf', length: 1.3, peak: 'Golf' },
    { id: 'tee_box', name: 'Tee Box', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.4, peak: 'Golf' },
    { id: 'clubhouse', name: 'Clubhouse', difficulty: 'blue', terrain: 'groomed', lift: 'golf', length: 1.7, peak: 'Golf' },
    { id: 'caddy', name: 'Caddy', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.3, peak: 'Golf' },
    { id: 'birdie', name: 'Birdie', difficulty: 'black', terrain: 'groomed', lift: 'golf', length: 1.5, peak: 'Golf' },
    { id: 'eagle_golf', name: 'Eagle', difficulty: 'double', terrain: 'powders', lift: 'golf', length: 1.2, peak: 'Golf' },
    { id: 'par_three', name: 'Par Three', difficulty: 'blue', terrain: 'moguls', lift: 'golf', length: 1.4, peak: 'Golf' },

    // Peak 9990 - Peak 9990 Lift
    { id: 'peak_run', name: 'Peak 9990', difficulty: 'blue', terrain: 'groomed', lift: 'peak9990', length: 2.0, peak: 'Peak 9990' },
    { id: 'summit_run', name: 'Summit', difficulty: 'black', terrain: 'groomed', lift: 'peak9990', length: 1.9, peak: 'Peak 9990' },
    { id: 'nine_nine', name: 'Nine Nine', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.6, peak: 'Peak 9990' },
    { id: 'cloud_nine', name: 'Cloud Nine', difficulty: 'black', terrain: 'powders', lift: 'peak9990', length: 1.7, peak: 'Peak 9990' },
    { id: 'high_noon', name: 'High Noon', difficulty: 'blue', terrain: 'trees', lift: 'peak9990', length: 1.5, peak: 'Peak 9990' },
    { id: 'vertical_limit', name: 'Vertical Limit', difficulty: 'double', terrain: 'trees', lift: 'peak9990', length: 1.3, peak: 'Peak 9990' },
    { id: 'drop_zone', name: 'Drop Zone', difficulty: 'black', terrain: 'moguls', lift: 'peak9990', length: 1.4, peak: 'Peak 9990' },
    { id: 'thin_air', name: 'Thin Air', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.2, peak: 'Peak 9990' },
    { id: 'altitude', name: 'Altitude', difficulty: 'blue', terrain: 'groomed', lift: 'peak9990', length: 1.8, peak: 'Peak 9990' },
    { id: 'saddle_up', name: 'Saddle Up', difficulty: 'green', terrain: 'groomed', lift: 'peak9990', length: 1.4, peak: 'Peak 9990' },
    { id: 'edge', name: 'The Edge', difficulty: 'black', terrain: 'trees', lift: 'peak9990', length: 1.1, peak: 'Peak 9990' },
    { id: 'extreme', name: 'Extreme', difficulty: 'double', terrain: 'powders', lift: 'peak9990', length: 1.0, peak: 'Peak 9990' },
    { id: 'apex_9990', name: 'Apex', difficulty: 'blue', terrain: 'groomed', lift: 'peak9990', length: 1.7, peak: 'Peak 9990' },
    { id: 'zenith', name: 'Zenith', difficulty: 'black', terrain: 'powders', lift: 'peak9990', length: 1.5, peak: 'Peak 9990' },
    { id: 'pinnacle', name: 'Pinnacle', difficulty: 'double', terrain: 'trees', lift: 'peak9990', length: 1.2, peak: 'Peak 9990' },

    // Additional Bonanza Peak runs - Cleavage Lift
    { id: 'cleavage_run', name: 'Cleavage', difficulty: 'black', terrain: 'moguls', lift: 'cleavage', length: 1.6, peak: 'Bonanza' },
    { id: 'split', name: 'Split', difficulty: 'blue', terrain: 'groomed', lift: 'cleavage', length: 1.5, peak: 'Bonanza' },
    { id: 'crack', name: 'Crack', difficulty: 'double', terrain: 'powders', lift: 'cleavage', length: 1.3, peak: 'Bonanza' },
    { id: 'fracture', name: 'Fracture', difficulty: 'black', terrain: 'trees', lift: 'cleavage', length: 1.2, peak: 'Bonanza' },
    { id: 'fissure', name: 'Fissure', difficulty: 'blue', terrain: 'groomed', lift: 'cleavage', length: 1.4, peak: 'Bonanza' },
    { id: 'crevasse', name: 'Crevasse', difficulty: 'double', terrain: 'trees', lift: 'cleavage', length: 1.0, peak: 'Bonanza' },

    // Additional Town Lift area - Spur Lift
    { id: 'spur_run', name: 'Spur', difficulty: 'blue', terrain: 'groomed', lift: 'spur', length: 1.7, peak: 'Town' },
    { id: 'spur_trees', name: 'Spur Trees', difficulty: 'black', terrain: 'trees', lift: 'spur', length: 1.4, peak: 'Town' },
    { id: 'cowboy', name: 'Cowboy', difficulty: 'black', terrain: 'moguls', lift: 'spur', length: 1.5, peak: 'Town' },
    { id: 'rodeo', name: 'Rodeo', difficulty: 'blue', terrain: 'groomed', lift: 'spur', length: 1.6, peak: 'Town' },
    { id: 'bronc', name: 'Bronc', difficulty: 'double', terrain: 'powders', lift: 'spur', length: 1.2, peak: 'Town' },

    // Additional Silver Cloud runs from Quicksilver
    { id: 'velocity', name: 'Velocity', difficulty: 'black', terrain: 'groomed', lift: 'quicksilver', length: 1.9, peak: 'Silver Cloud' },
    { id: 'momentum', name: 'Momentum', difficulty: 'blue', terrain: 'trees', lift: 'quicksilver', length: 1.6, peak: 'Silver Cloud' },
    { id: 'acceleration', name: 'Acceleration', difficulty: 'green', terrain: 'groomed', lift: 'quicksilver', length: 1.5, peak: 'Silver Cloud' },
    { id: 'terminal', name: 'Terminal', difficulty: 'double', terrain: 'powders', lift: 'quicksilver', length: 1.4, peak: 'Silver Cloud' },
    { id: 'kinetic', name: 'Kinetic', difficulty: 'black', terrain: 'moguls', lift: 'quicksilver', length: 1.5, peak: 'Silver Cloud' },

    // Frostwood runs
    { id: 'frostwood_run', name: 'Frostwood', difficulty: 'blue', terrain: 'groomed', lift: 'frostwood', length: 1.6, peak: 'Red Pine' },
    { id: 'frost', name: 'Jack Frost', difficulty: 'green', terrain: 'groomed', lift: 'frostwood', length: 1.3, peak: 'Red Pine' },
    { id: 'ice_crystal', name: 'Ice Crystal', difficulty: 'black', terrain: 'trees', lift: 'frostwood', length: 1.2, peak: 'Red Pine' },
    { id: 'snowflake', name: 'Snowflake', difficulty: 'blue', terrain: 'trees', lift: 'frostwood', length: 1.4, peak: 'Red Pine' },
    { id: 'icicle', name: 'Icicle', difficulty: 'black', terrain: 'powders', lift: 'frostwood', length: 1.1, peak: 'Red Pine' },
  ],
  chalets: [
    { id: 'midmountain', name: 'Mid-Mountain Lodge' },
    { id: 'summit', name: 'Summit House' },
    { id: 'cloudfive', name: 'Cloud Five' },
    { id: 'canyonsvillage', name: 'Canyons Village' },
  ]
};

const peaks = [...new Set(parkCityData.runs.map(r => r.peak))];

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-cyan-500"></div>
  </label>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('lifts');
  const [liftStatus, setLiftStatus] = useState(() => JSON.parse(localStorage.getItem('parkcity_lifts') || '{}'));
  const [runStatus, setRunStatus] = useState(() => JSON.parse(localStorage.getItem('parkcity_runs') || '{}'));
  const [selectedPeaks, setSelectedPeaks] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [terrainFilter, setTerrainFilter] = useState('all');
  const [planResults, setPlanResults] = useState(null);
  const [selectedBase, setSelectedBase] = useState('Park City');
  const [difficultyPref, setDifficultyPref] = useState('mix');
  const [terrainPref, setTerrainPref] = useState('any');
  const [skillLevel, setSkillLevel] = useState('intermediate');
  const [startTime, setStartTime] = useState('09:00');
  const [includeLunch, setIncludeLunch] = useState(false);
  const [lunchChalet, setLunchChalet] = useState('midmountain');
  const [lunchTime, setLunchTime] = useState('12:00');

  useEffect(() => localStorage.setItem('parkcity_lifts', JSON.stringify(liftStatus)), [liftStatus]);
  useEffect(() => localStorage.setItem('parkcity_runs', JSON.stringify(runStatus)), [runStatus]);

  const toggleLift = (id) => setLiftStatus(p => ({ ...p, [id]: p[id] === 'closed' ? 'open' : 'closed' }));
  const toggleRun = (id) => setRunStatus(p => ({ ...p, [id]: p[id] === 'closed' ? 'open' : 'closed' }));
  const isOpen = (id, type) => (type === 'lift' ? liftStatus[id] : runStatus[id]) !== 'closed';

  const getRunDuration = (run) => {
    const speeds = { beginner: 10, intermediate: 15, advanced: 20 };
    return Math.round((run.length / (speeds[skillLevel] || 15)) * 60);
  };

  const filteredRuns = parkCityData.runs.filter(r => isOpen(r.id, 'run') && isOpen(r.lift, 'lift') &&
    (!selectedPeaks.length || selectedPeaks.includes(r.peak)) &&
    (difficultyFilter === 'all' || r.difficulty === difficultyFilter) &&
    (terrainFilter === 'all' || r.terrain === terrainFilter));

  const filteredLifts = parkCityData.lifts.filter(l => !selectedPeaks.length || selectedPeaks.includes(l.peak));

  const planMyDay = () => {
    let runs = parkCityData.runs.filter(r => isOpen(r.id, 'run') && isOpen(r.lift, 'lift'));
    if (selectedPeaks.length) runs = runs.filter(r => selectedPeaks.includes(r.peak));
    if (difficultyPref !== 'mix') runs = runs.filter(r => r.difficulty === difficultyPref);
    if (terrainPref !== 'any') runs = runs.filter(r => r.terrain === terrainPref);

    const scored = runs.map(r => ({ ...r, duration: getRunDuration(r), score: Math.random() })).sort((a, b) => b.score - a.score);
    const plan = [];
    let total = 0, hour = parseInt(startTime);
    for (const run of scored) {
      if (total + run.duration > (includeLunch ? 180 : 300)) break;
      plan.push({ ...run, time: `${hour}:00` });
      hour += Math.ceil(run.duration / 60);
      total += run.duration;
    }
    setPlanResults({ runs: plan, totalTime: total });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="bg-gradient-to-r from-cyan-600 to-blue-600 py-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Park City Ski Planner</h1>
        <p className="text-center text-cyan-100 mt-2">Plan your perfect day on the mountain</p>
      </header>

      <nav className="sticky top-0 z-50 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 py-3 overflow-x-auto">
          {['lifts', 'runs', 'plan'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === tab ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-700'}`}>
              {tab === 'lifts' ? '🚡 Lifts' : tab === 'runs' ? '⛷️ Trails' : '📋 Plan My Day'}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">Filter by Peak</h3>
          <div className="flex flex-wrap gap-2">
            {peaks.map(p => (
              <button key={p} onClick={() => setSelectedPeaks(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedPeaks.includes(p) ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'lifts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLifts.map(lift => (
              <div key={lift.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{lift.name}</h3>
                  <p className="text-sm text-slate-400">{lift.base}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-slate-700 rounded text-xs">{lift.peak}</span>
                </div>
                <ToggleSwitch checked={isOpen(lift.id, 'lift')} onChange={() => toggleLift(lift.id)} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'runs' && (
          <div>
            <div className="flex flex-wrap gap-4 mb-6">
              <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2">
                <option value="all">All Difficulties</option>
                <option value="green">Green</option><option value="blue">Blue</option><option value="black">Black</option><option value="double">Double Black</option>
              </select>
              <select value={terrainFilter} onChange={(e) => setTerrainFilter(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2">
                <option value="all">All Terrain</option>
                <option value="groomed">Groomed</option><option value="moguls">Moguls</option><option value="powders">Powder</option><option value="trees">Trees</option>
              </select>
              <span className="text-slate-400 self-center">{filteredRuns.length} runs</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRuns.map(run => (
                <div key={run.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{run.name}</h3>
                    <p className="text-sm text-slate-400">{parkCityData.lifts.find(l => l.id === run.lift)?.name}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${run.difficulty === 'green' ? 'bg-green-600' : run.difficulty === 'blue' ? 'bg-blue-600' : run.difficulty === 'black' ? 'bg-purple-600' : 'bg-red-600'}`}>{run.difficulty}</span>
                      <span className="px-2 py-1 rounded text-xs bg-slate-600">{run.terrain}</span>
                      <span className="px-2 py-1 rounded text-xs bg-slate-600">{run.length}mi</span>
                    </div>
                  </div>
                  <ToggleSwitch checked={isOpen(run.id, 'run')} onChange={() => toggleRun(run.id)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">Configure Your Day</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Start Time</label><input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" /></div>
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Skill Level</label><select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label><select value={difficultyPref} onChange={(e) => setDifficultyPref(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"><option value="mix">Mix</option><option value="green">Green</option><option value="blue">Blue</option><option value="black">Black</option></select></div>
                <div><label className="block text-sm font-medium text-slate-300 mb-2">Terrain</label><select value={terrainPref} onChange={(e) => setTerrainPref(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2"><option value="any">Any</option><option value="groomed">Groomed</option><option value="moguls">Moguls</option><option value="powders">Powder</option><option value="trees">Trees</option></select></div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={includeLunch} onChange={(e) => setIncludeLunch(e.target.checked)} className="w-4 h-4 rounded" /><span>Include Lunch</span></label>
                {includeLunch && (
                  <><select value={lunchChalet} onChange={(e) => setLunchChalet(e.target.value)} className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2">{parkCityData.chalets.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><input type="time" value={lunchTime} onChange={(e) => setLunchTime(e.target.value)} className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" /></>
                )}
              </div>
              <button onClick={planMyDay} className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-bold text-lg">Generate Plan</button>
            </div>

            {planResults && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400">Your Day Plan ({planResults.totalTime} min)</h2>
                <div className="space-y-3">
                  {planResults.runs.map((run, i) => (
                    <div key={i} className="bg-slate-700/50 p-4 rounded-lg flex items-center gap-4">
                      <span className="text-2xl font-bold text-cyan-400">{i + 1}</span>
                      <div><h3 className="font-bold">{run.name}</h3><p className="text-sm text-slate-400">{run.peak} • {run.time} • {run.duration} min</p></div>
                      <span className={`ml-auto px-2 py-1 rounded text-xs ${run.difficulty === 'green' ? 'bg-green-600' : run.difficulty === 'blue' ? 'bg-blue-600' : 'bg-purple-600'}`}>{run.difficulty}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
