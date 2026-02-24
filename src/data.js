// Sample data for Park City Ski Planner

export const lifts = [
  { id: 'lift1', name: 'Alpine Express' },
  { id: 'lift2', name: 'Summit Lift' },
  { id: 'lift3', name: 'Valley Chair' }
];

export const trails = [
  { id: 'trail1', name: 'Green Meadows', difficulty: 'green', terrain: 'groomed' },
  { id: 'trail2', name: 'Blue Ridge', difficulty: 'blue', terrain: 'moguls' },
  { id: 'trail3', name: 'Black Diamond', difficulty: 'black', terrain: 'powder' },
  { id: 'trail4', name: 'Double Trouble', difficulty: 'double-black', terrain: 'trees' },
  { id: 'trail5', name: 'Bowl Run', difficulty: 'blue', terrain: 'bowl' }
];

// Mountain graph: lifts connect to trails and trails connect to lifts
// This is a simple representation where each lift has an array of trail ids it serves, and each trail has an array of lift ids that provide access.

export const mountainGraph = {
  lifts: {
    lift1: { name: 'Alpine Express', connectsTo: ['trail1', 'trail2'] },
    lift2: { name: 'Summit Lift', connectsTo: ['trail3', 'trail4'] },
    lift3: { name: 'Valley Chair', connectsTo: ['trail5'] }
  },
  trails: {
    trail1: { name: 'Green Meadows', connectsTo: ['lift1'] },
    trail2: { name: 'Blue Ridge', connectsTo: ['lift1'] },
    trail3: { name: 'Black Diamond', connectsTo: ['lift2'] },
    trail4: { name: 'Double Trouble', connectsTo: ['lift2'] },
    trail5: { name: 'Bowl Run', connectsTo: ['lift3'] }
  }
};

