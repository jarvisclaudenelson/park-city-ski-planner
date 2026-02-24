import React, { useState, useEffect } from 'react';

// Complete Park City Mountain Data
const parkCityData = {
  lifts: [
    { id: 'payday', name: 'Payday Lift', capacity: 4, base: 'Park City', top: 'Treasure Peak', status: 'open' },
    { id: 'bonanza', name: 'Bonanza Lift', capacity: 6, base: 'Park City', top: 'Bonanza Peak', status: 'open' },
    { id: 'crescent', name: 'Crescent Lift', capacity: 4, base: 'Park City', top: 'Crescent', status: 'open' },
    { id: 'townlift', name: 'Town Lift', capacity: 6, base: 'Park City', top: 'Town Lift Top', status: 'open' },
    { id: 'silvercloud', name: 'Silver Cloud Lift', capacity: 6, base: 'Park City', top: 'Silver Cloud', status: 'open' },
    { id: 'quicksilver', name: 'Quicksilver Gondola', capacity: 8, base: 'Canyons Village', top: 'Silver Cloud', status: 'open' },
    { id: 'tombstone', name: 'Tombstone Lift', capacity: 6, base: 'Canyons Village', top: 'Tombstone', status: 'open' },
    { id: 'saddleback', name: 'Saddleback Lift', capacity: 4, base: 'Canyons Village', top: 'Saddleback', status: 'open' },
    { id: 'thaynes', name: 'Thaynes Canyon Lift', capacity: 4, base: 'Park City', top: 'Thaynes', status: 'open' },
    { id: 'golf', name: 'Golf Lift', capacity: 4, base: 'Park City', top: 'Golf', status: 'open' },
    { id: 'eagle', name: 'Eagle Lift', capacity: 4, base: 'Park City', top: 'Eagle', status: 'open' },
    { id: 'homestake', name: 'Homestake Lift', capacity: 6, base: 'Canyons Village', top: 'Homestake', status: 'open' },
    { id: 'redpine', name: 'Red Pine Lift', capacity: 6, base: 'Canyons Village', top: 'Red Pine', status: 'open' },
    { id: 'canyons', name: 'Canyons Gondola', capacity: 8, base: 'Canyons Village', top: 'Canyons Peak', status: 'open' },
    { id: 'frostwood', name: 'Frostwood Lift', capacity: 4, base: 'Canyons Village', top: 'Frostwood', status: 'open' },
  ],
  runs: [
    // Payday/Legacy Area
    { id: 'homerun', name: 'Homerun', difficulty: 'green', terrain: 'groomed', area: 'Legacy', lift: 'payday', status: 'open' },
    { id: 'claimjumper', name: 'Claimjumper', difficulty: 'blue', terrain: 'groomed', area: 'Legacy', lift: 'payday', status: 'open' },
    { id: 'discovery', name: 'Discovery', difficulty: 'green', terrain: 'groomed', area: 'Legacy', lift: 'payday', status: 'open' },
    { id: 'treasure', name: 'Treasure', difficulty: 'blue', terrain: 'groomed', area: 'Legacy', lift: 'payday', status: 'open' },
    
    // Bonanza Area
    { id: 'bonanza', name: 'Bonanza', difficulty: 'blue', terrain: 'groomed', area: 'Bonanza', lift: 'bonanza', status: 'open' },
    { id: 'STS', name: 'Shooting Star', difficulty: 'black', terrain: 'groomed', area: 'Bonanza', lift: 'bonanza', status: 'open' },
    { id: 'galactic', name: 'Galactic', difficulty: 'blue', terrain: 'groomed', area: 'Bonanza', lift: 'bonanza', status: 'open' },
    { id: 'comet', name: 'Comet', difficulty: 'blue', terrain: 'moguls', area: 'Bonanza', lift: 'bonanza', status: 'open' },
    { id: 'asteroid', name: 'Asteroid', difficulty: 'black', terrain: 'moguls', area: 'Bonanza', lift: 'bonanza', status: 'open' },
    
    // Crescent Area
    { id: 'crescent', name: 'Crescent', difficulty: 'blue', terrain: 'groomed', area: 'Crescent', lift: 'crescent', status: 'open' },
    { id: 'crescent_face', name: 'Crescent Face', difficulty: 'black', terrain: 'moguls', area: 'Crescent', lift: 'crescent', status: 'open' },
    { id: 'quarterpath', name: 'Quarterpath', difficulty: 'blue', terrain: 'groomed', area: 'Crescent', lift: 'crescent', status: 'open' },
    
    // Town Lift Area
    { id: 'townrun', name: 'Town Run', difficulty: 'blue', terrain: 'groomed', area: 'Town', lift: 'townlift', status: 'open' },
    { id: 'mainstreet', name: 'Mainstreet', difficulty: 'green', terrain: 'groomed', area: 'Town', lift: 'townlift', status: 'open' },
    { id: 'parkconnect', name: 'Park Connect', difficulty: 'green', terrain: 'groomed', area: 'Town', lift: 'townlift', status: 'open' },
    { id: 'millsite', name: 'Millsite', difficulty: 'black', terrain: 'moguls', area: 'Town', lift: 'townlift', status: 'open' },
    { id: 'spur', name: 'Spur', difficulty: 'black', terrain: 'moguls', area: 'Town', lift: 'townlift', status: 'open' },
    
    // Silver Cloud Area
    { id: 'silvercloud_run', name: 'Silver Cloud', difficulty: 'blue', terrain: 'groomed', area: 'Silver Cloud', lift: 'silvercloud', status: 'open' },
    { id: 'dreamscape', name: 'Dreamscape', difficulty: 'blue', terrain: 'groomed', area: 'Silver Cloud', lift: 'silvercloud', status: 'open' },
    { id: 'chevron', name: 'Chevron', difficulty: 'black', terrain: 'moguls', area: 'Silver Cloud', lift: 'silvercloud', status: 'open' },
    { id: 'conquer', name: 'Conquer', difficulty: 'black', terrain: 'groomed', area: 'Silver Cloud', lift: 'silvercloud', status: 'open' },
    
    // Quicksilver/Canyons Area
    { id: 'quicksilver_run', name: 'Quicksilver', difficulty: 'blue', terrain: 'groomed', area: 'Canyons', lift: 'quicksilver', status: 'open' },
    { id: 'redstone', name: 'Redstone', difficulty: 'blue', terrain: 'groomed', area: 'Canyons', lift: 'quicksilver', status: 'open' },
    { id: 'cascade', name: 'Cascade', difficulty: 'blue', terrain: 'groomed', area: 'Canyons', lift: 'quicksilver', status: 'open' },
    { id: 'sirocco', name: 'Sirocco', difficulty: 'black', terrain: 'powders', area: 'Canyons', lift: 'quicksilver', status: 'open' },
    
    // Tombstone Area
    { id: 'tombstone_run', name: 'Tombstone', difficulty: 'blue', terrain: 'groomed', area: 'Tombstone', lift: 'tombstone', status: 'open' },
    { id: 'kisses', name: 'Kisses', difficulty: 'black', terrain: 'powders', area: 'Tombstone', lift: 'tombstone', status: 'open' },
    { id: 'reef', name: 'Reef', difficulty: 'black', terrain: 'moguls', area: 'Tombstone', lift: 'tombstone', status: 'open' },
    
    // Thaynes Area
    { id: 'thaynes_run', name: 'Thaynes', difficulty: 'blue', terrain: 'groomed', area: 'Thaynes', lift: 'thaynes', status: 'open' },
    { id: 'thaynes_face', name: 'Thaynes Face', difficulty: 'black', terrain: 'moguls', area: 'Thaynes', lift: 'thaynes', status: 'open' },
    { id: 'mollys', name: "Molly's", difficulty: 'blue', terrain: 'groomed', area: 'Thaynes', lift: 'thaynes', status: 'open' },
    
    // Saddleback Area
    { id: 'saddleback_run', name: 'Saddleback', difficulty: 'blue', terrain: 'groomed', area: 'Saddleback', lift: 'saddleback', status: 'open' },
    { id: 'kildeer', name: 'Kildeer', difficulty: 'black', terrain: 'powders', area: 'Saddleback', lift: 'saddleback', status: 'open' },
    
    // Eagle Area
    { id: 'eagle_run', name: 'Eagle', difficulty: 'blue', terrain: 'groomed', area: 'Eagle', lift: 'eagle', status: 'open' },
    { id: 'eagle_falls', name: 'Eagle Falls', difficulty: 'black', terrain: 'powders', area: 'Eagle', lift: 'eagle', status: 'open' },
    { id: 'golden_eagle', name: 'Golden Eagle', difficulty: 'black', terrain: 'moguls', area: 'Eagle', lift: 'eagle', status: 'open' },
    
    // Homestake Area
    { id: 'homestake_run', name: 'Homestake', difficulty: 'blue', terrain: 'groomed', area: 'Homestake', lift: 'homestake', status: 'open' },
    { id: 'dutch', name: 'Dutch', difficulty: 'black', terrain: 'moguls', area: 'Homestake', lift: 'homestake', status: 'open' },
    
    // Red Pine Area
    { id: 'redpine_run', name: 'Red Pine', difficulty: 'blue', terrain: 'groomed', area: 'Red Pine', lift: 'redpine', status: 'open' },
    { id: 'wedge', name: 'Wedge', difficulty: 'black', terrain: 'powders', area: 'Red Pine', lift: 'redpine', status: 'open' },
    { id: 'pinecone', name: 'Pinecone', difficulty: 'blue', terrain: 'trees', area: 'Red Pine', lift: 'redpine', status: 'open' },
    
    // Golf Area
    { id: 'golf_run', name: 'Golf', difficulty: 'green', terrain: 'groomed', area: 'Golf', lift: 'golf', status: 'open' },
    { id: 'chip', name: 'Chip', difficulty: 'green', terrain: 'groomed', area: 'Golf', lift: 'golf', status: 'open' },
    { id: 'putt', name: 'Putt', difficulty: 'blue', terrain: 'groomed', area: 'Golf', lift: 'golf', status: 'open' },
    
    // Frostwood Area
    { id: 'frostwood_run', name: 'Frostwood', difficulty: 'blue', terrain: 'groomed', area: 'Frostwood', lift: 'frostwood', status: 'open' },
    { id: 'wedge_peak', name: 'Wedge Peak', difficulty: 'black', terrain: 'powders', area: 'Frostwood', lift: 'frostwood', status: 'open' },
  ],
  bases: ['Park City', 'Canyons Village']
};

const App = () => {
  const [activeTab, setActiveTab] = useState('lifts');
  const [liftStatus, setLiftStatus] = useState(() => {
    const saved = localStorage.getItem('parkcity_lifts');
    return saved ? JSON.parse(saved) : {};
  });
  const [runStatus, setRunStatus] = useState(() => {
    const saved = localStorage.getItem('parkcity_runs');
    return saved ? JSON.parse(saved) : {};
  });
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [terrainFilter, setTerrainFilter] = useState('all');
  const [planResults, setPlanResults] = useState(null);
  const [getHomeResults, setGetHomeResults] = useState(null);
  const [selectedBase, setSelectedBase] = useState('Park City');

  useEffect(() => {
    localStorage.setItem('parkcity_lifts', JSON.stringify(liftStatus));
  }, [liftStatus]);

  useEffect(() => {
    localStorage.setItem('parkcity_runs', JSON.stringify(runStatus));
  }, [runStatus]);

  const toggleLift = (liftId) => {
    setLiftStatus(prev => ({
      ...prev,
      [liftId]: prev[liftId] === 'closed' ? 'open' : 'closed'
    }));
  };

  const toggleRun = (runId) => {
    setRunStatus(prev => ({
      ...prev,
      [runId]: prev[runId] === 'closed' ? 'open' : 'closed'
    }));
  };

  const getLiftStatus = (liftId) => liftStatus[liftId] || 'open';
  const getRunStatus = (runId) => runStatus[runId] || 'open';

  const isLiftOpen = (liftId) => getLiftStatus(liftId) === 'open';
  const isRunOpen = (runId) => getRunStatus(runId) === 'open';

  const filteredRuns = parkCityData.runs.filter(run => {
    const open = isRunOpen(run.id) && isLiftOpen(run.lift);
    if (!open) return false;
    if (difficultyFilter !== 'all' && run.difficulty !== difficultyFilter) return false;
    if (terrainFilter !== 'all' && run.terrain !== terrainFilter) return false;
    return true;
  });

  const planMyDay = () => {
    const openRuns = parkCityData.runs.filter(run => 
      isRunOpen(run.id) && isLiftOpen(run.lift)
    );
    
    const byDifficulty = {
      green: openRuns.filter(r => r.difficulty === 'green'),
      blue: openRuns.filter(r => r.difficulty === 'blue'),
      black: openRuns.filter(r => r.difficulty === 'black'),
    };

    const plan = [];
    const added = new Set();

    // Prioritize based on difficulty filter or mix it up
    const priorities = difficultyFilter === 'all' 
      ? ['blue', 'black', 'green'] 
      : [difficultyFilter];

    priorities.forEach(diff => {
      const runs = byDifficulty[diff] || [];
      runs.slice(0, 3).forEach(run => {
        if (!added.has(run.id)) {
          plan.push(run);
          added.add(run.id);
        }
      });
    });

    setPlanResults(plan);
    setGetHomeResults(null);
  };

  const getHome = () => {
    // Find route back to base - simplify to show runs from lifts that go to base
    const baseLifts = parkCityData.lifts.filter(lift => 
      lift.base === selectedBase && isLiftOpen(lift.id)
    );
    
    const homeRuns = parkCityData.runs.filter(run => 
      baseLifts.some(l => l.id === run.lift) && isRunOpen(run.id)
    );
    
    setGetHomeResults(homeRuns);
    setPlanResults(null);
  };

  const resetAll = () => {
    setLiftStatus({});
    setRunStatus({});
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-cyan-400">
          Park City Ski Planner
        </h1>
        
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('lifts')}
              className={`px-6 py-2 rounded-md transition ${activeTab === 'lifts' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Lifts
            </button>
            <button
              onClick={() => setActiveTab('runs')}
              className={`px-6 py-2 rounded-md transition ${activeTab === 'runs' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Trails
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-6 py-2 rounded-md transition ${activeTab === 'plan' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Plan My Day
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`px-6 py-2 rounded-md transition ${activeTab === 'home' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Get Home
            </button>
          </div>
        </div>

        {/* Lifts Tab */}
        {activeTab === 'lifts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkCityData.lifts.map(lift => (
              <div
                key={lift.id}
                className={`p-4 rounded-lg border-2 transition ${
                  isLiftOpen(lift.id) 
                    ? 'border-green-500 bg-green-900/20' 
                    : 'border-red-500 bg-red-900/20'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{lift.name}</h3>
                    <p className="text-sm text-gray-400">{lift.base} → {lift.top}</p>
                    <p className="text-xs text-gray-500">{lift.capacity}-person</p>
                  </div>
                  <button
                    onClick={() => toggleLift(lift.id)}
                    className={`px-4 py-2 rounded font-bold ${
                      isLiftOpen(lift.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {isLiftOpen(lift.id) ? 'OPEN' : 'CLOSED'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Runs Tab */}
        {activeTab === 'runs' && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-4 py-2"
              >
                <option value="all">All Difficulties</option>
                <option value="green">Green (Beginner)</option>
                <option value="blue">Blue (Intermediate)</option>
                <option value="black">Black (Advanced)</option>
              </select>
              <select
                value={terrainFilter}
                onChange={(e) => setTerrainFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded px-4 py-2"
              >
                <option value="all">All Terrain</option>
                <option value="groomed">Groomed</option>
                <option value="moguls">Moguls</option>
                <option value="powders">Powder/Bowl</option>
                <option value="trees">Trees</option>
              </select>
            </div>

            {/* Results count */}
            <p className="text-center text-gray-400 mb-4">
              {filteredRuns.length} runs match your filters
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRuns.map(run => {
                const lift = parkCityData.lifts.find(l => l.id === run.lift);
                return (
                  <div
                    key={run.id}
                    className={`p-4 rounded-lg border-2 transition ${
                      isRunOpen(run.id)
                        ? 'border-green-500 bg-green-900/20'
                        : 'border-red-500 bg-red-900/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{run.name}</h3>
                        <p className="text-sm text-gray-400">{run.area}</p>
                        <p className="text-xs text-gray-500">Lift: {lift?.name}</p>
                      </div>
                      <button
                        onClick={() => toggleRun(run.id)}
                        className={`px-3 py-1 rounded text-sm font-bold ${
                          isRunOpen(run.id)
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        {isRunOpen(run.id) ? 'OPEN' : 'CLOSED'}
                      </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        run.difficulty === 'green' ? 'bg-green-700' :
                        run.difficulty === 'blue' ? 'bg-blue-700' : 'bg-black'
                      }`}>
                        {run.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded text-xs bg-gray-700">
                        {run.terrain}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Plan My Day Tab */}
        {activeTab === 'plan' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-400 mb-4">Get personalized run suggestions based on what's open and your preferences</p>
              <button
                onClick={planMyDay}
                className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg font-bold text-lg"
              >
                Plan My Day
              </button>
            </div>
            
            {planResults && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Your Day Plan</h2>
                <div className="space-y-3">
                  {planResults.map((run, idx) => {
                    const lift = parkCityData.lifts.find(l => l.id === run.lift);
                    return (
                      <div key={run.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-cyan-400">{idx + 1}</span>
                          <div>
                            <h3 className="font-bold">{run.name}</h3>
                            <p className="text-sm text-gray-400">{run.area} • Take {lift?.name}</p>
                          </div>
                          <span className={`ml-auto px-2 py-1 rounded ${
                            run.difficulty === 'green' ? 'bg-green-700' :
                            run.difficulty === 'blue' ? 'bg-blue-700' : 'bg-black'
                          }`}>
                            {run.difficulty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Get Home Tab */}
        {activeTab === 'home' && (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-400 mb-4">Find the best way back to your base at the end of the day</p>
              <div className="flex justify-center gap-4 mb-4">
                {parkCityData.bases.map(base => (
                  <button
                    key={base}
                    onClick={() => setSelectedBase(base)}
                    className={`px-6 py-2 rounded ${
                      selectedBase === base ? 'bg-cyan-600' : 'bg-gray-700'
                    }`}
                  >
                    {base}
                  </button>
                ))}
              </div>
              <button
                onClick={getHome}
                className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg font-bold text-lg"
              >
                Find Route Home
              </button>
            </div>

            {getHomeResults && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Routes to {selectedBase}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getHomeResults.map(run => {
                    const lift = parkCityData.lifts.find(l => l.id === run.lift);
                    return (
                      <div key={run.id} className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-bold">{run.name}</h3>
                        <p className="text-sm text-gray-400">{lift?.name} → {selectedBase}</p>
                        <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                          run.difficulty === 'green' ? 'bg-green-700' :
                          run.difficulty === 'blue' ? 'bg-blue-700' : 'bg-black'
                        }`}>
                          {run.difficulty}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reset */}
        <div className="text-center mt-8">
          <button
            onClick={resetAll}
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            Reset All Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
