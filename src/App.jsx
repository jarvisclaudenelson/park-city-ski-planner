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
    { id: 'homerun', name: 'Homerun', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 2.5, peak: 'Treasure' },
    { id: 'claimjumper', name: 'Claimjumper', difficulty: 'blue', terrain: 'groomed', lift: 'payday', length: 2.2, peak: 'Treasure' },
    { id: 'bonanza', name: 'Bonanza', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 2.4, peak: 'Bonanza' },
    { id: 'crescent', name: 'Crescent', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 2.0, peak: 'Crescent' },
    { id: 'townrun', name: 'Town Run', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 2.2, peak: 'Town' },
    { id: 'silvercloud_run', name: 'Silver Cloud', difficulty: 'blue', terrain: 'groomed', lift: 'silvercloud', length: 2.3, peak: 'Silver Cloud' },
    { id: 'quicksilver_run', name: 'Quicksilver', difficulty: 'blue', terrain: 'groomed', lift: 'quicksilver', length: 2.5, peak: 'Silver Cloud' },
    { id: 'tombstone_run', name: 'Tombstone', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 2.0, peak: 'Tombstone' },
    { id: 'redpine_run', name: 'Red Pine', difficulty: 'blue', terrain: 'groomed', lift: 'redpine', length: 2.2, peak: 'Red Pine' },
    { id: 'homestake_run', name: 'Homestake', difficulty: 'blue', terrain: 'groomed', lift: 'homestake', length: 2.1, peak: 'Homestake' },
    { id: 'thaynes_run', name: 'Thaynes', difficulty: 'blue', terrain: 'groomed', lift: 'thaynes', length: 2.0, peak: 'Thaynes' },
    { id: 'saddleback_run', name: 'Saddleback', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.9, peak: 'Saddleback' },
    { id: 'eagle_run', name: 'Eagle', difficulty: 'blue', terrain: 'groomed', lift: 'eagle', length: 2.0, peak: 'Eagle' },
    { id: 'peak_run', name: 'Peak 9990', difficulty: 'blue', terrain: 'groomed', lift: 'peak9990', length: 2.0, peak: 'Peak 9990' },
  ],
  chalets: [
    { id: 'midmountain', name: 'Mid-Mountain Lodge' },
    { id: 'summit', name: 'Summit House' },
  ]
};

// Helper function to get runs for a lift
const getRunsForLift = (liftId) => parkCityData.runs.filter(r => r.lift === liftId);

// Helper function to get difficulty order for comparison
const getDifficultyOrder = (diff) => {
  const order = { 'green': 1, 'blue': 2, 'black': 3, 'double': 4 };
  return order[diff] || 2;
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
  const [skillLevel, setSkillLevel] = useState('intermediate');
  const [startTime, setStartTime] = useState('09:00');
  const [excludedRuns, setExcludedRuns] = useState([]);
  const [replacements, setReplacements] = useState({});

  useEffect(() => localStorage.setItem('parkcity_lifts', JSON.stringify(liftStatus)), [liftStatus]);
  useEffect(() => localStorage.setItem('parkcity_runs', JSON.stringify(runStatus)), [runStatus]);

  // Lift-Trail Dependency: When lift is toggled OFF, auto-disable all its trails
  const toggleLift = (id) => {
    const newStatus = liftStatus[id] === 'closed' ? 'open' : 'closed';
    setLiftStatus(p => ({ ...p, [id]: newStatus }));
    
    // If closing the lift, also close all associated runs
    if (newStatus === 'closed') {
      const runsForLift = getRunsForLift(id);
      runsForLift.forEach(run => {
        setRunStatus(prev => ({ ...prev, [run.id]: 'closed' }));
      });
    }
  };
  
  const toggleRun = (id) => setRunStatus(p => ({ ...p, [id]: p[id] === 'closed' ? 'open' : 'closed' }));
  const isOpen = (id, type) => (type === 'lift' ? liftStatus[id] : runStatus[id]) !== 'closed';

  const getRunDuration = (run) => {
    const speeds = { beginner: 10, intermediate: 15, advanced: 20 };
    return Math.round((run.length / (speeds[skillLevel] || 15)) * 60);
  };

  // Find alternative run for excluded trail
  const findAlternative = (excludedRunId, planRuns) => {
    const excludedRun = parkCityData.runs.find(r => r.id === excludedRunId);
    if (!excludedRun) return null;
    
    const excludedLift = excludedRun.lift;
    const excludedPeak = excludedRun.peak;
    const excludedDiff = excludedRun.difficulty;
    
    // Get runs from same lift that are open and not already in plan
    const candidates = parkCityData.runs.filter(r => 
      r.id !== excludedRunId &&
      r.lift === excludedLift &&
      isOpen(r.id, 'run') &&
      isOpen(r.lift, 'lift') &&
      !planRuns.some(pr => pr.id === r.id)
    );
    
    if (candidates.length === 0) {
      // Try runs from same peak with similar difficulty
      const peakCandidates = parkCityData.runs.filter(r =>
        r.id !== excludedRunId &&
        r.peak === excludedPeak &&
        isOpen(r.id, 'run') &&
        isOpen(r.lift, 'lift') &&
        !planRuns.some(pr => pr.id === r.id) &&
        Math.abs(getDifficultyOrder(r.difficulty) - getDifficultyOrder(excludedDiff)) <= 1
      );
      if (peakCandidates.length > 0) {
        return peakCandidates[Math.floor(Math.random() * peakCandidates.length)];
      }
      return null;
    }
    
    // Prefer similar difficulty
    const similarDiff = candidates.filter(r => r.difficulty === excludedDiff);
    if (similarDiff.length > 0) {
      return similarDiff[Math.floor(Math.random() * similarDiff.length)];
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  const excludeRunFromPlan = (runId, index) => {
    const alternative = findAlternative(runId, planResults.runs);
    
    if (alternative) {
      const altWithDuration = { ...alternative, duration: getRunDuration(alternative) };
      const newRuns = [...planResults.runs];
      newRuns[index] = altWithDuration;
      
      setReplacements(prev => ({
        ...prev,
        [index]: { original: runId, replacement: alternative.id }
      }));
      
      setPlanResults({ ...planResults, runs: newRuns });
    }
    
    setExcludedRuns(prev => [...prev, runId]);
  };

  const filteredRuns = parkCityData.runs.filter(r => isOpen(r.id, 'run') && isOpen(r.lift, 'lift') &&
    (!selectedPeaks.length || selectedPeaks.includes(r.peak)) &&
    (difficultyFilter === 'all' || r.difficulty === difficultyFilter) &&
    (terrainFilter === 'all' || r.terrain === terrainFilter));

  const filteredLifts = parkCityData.lifts.filter(l => !selectedPeaks.length || selectedPeaks.includes(l.peak));

  const planMyDay = () => {
    let runs = parkCityData.runs.filter(r => isOpen(r.id, 'run') && isOpen(r.lift, 'lift') && !excludedRuns.includes(r.id));
    if (selectedPeaks.length) runs = runs.filter(r => selectedPeaks.includes(r.peak));
    
    const scored = runs.map(r => ({ ...r, duration: getRunDuration(r), score: Math.random() })).sort((a, b) => b.score - a.score);
    const plan = [];
    let total = 0, hour = parseInt(startTime);
    for (const run of scored.slice(0, 8)) {
      if (total + run.duration > 300) break;
      plan.push({ ...run, time: `${hour.toString().padStart(2, '0')}:00` });
      hour += Math.ceil(run.duration / 60);
      total += run.duration;
    }
    setPlanResults({ runs: plan, totalTime: total });
    setReplacements({});
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'green': return 'bg-green-600';
      case 'blue': return 'bg-blue-600';
      case 'black': return 'bg-purple-600';
      case 'double': return 'bg-red-600';
      default: return 'bg-slate-600';
    }
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
            {filteredLifts.map(lift => {
              const runsForLift = getRunsForLift(lift.id);
              const openRunsCount = runsForLift.filter(r => isOpen(r.id, 'run')).length;
              return (
                <div key={lift.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{lift.name}</h3>
                      <p className="text-sm text-slate-400">{lift.base}</p>
                    </div>
                    <ToggleSwitch checked={isOpen(lift.id, 'lift')} onChange={() => toggleLift(lift.id)} />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="px-2 py-1 bg-slate-700 rounded">{lift.peak}</span>
                    <span className="text-slate-400">{openRunsCount} trails open</span>
                  </div>
                  {liftStatus[lift.id] === 'closed' && (
                    <div className="mt-2 text-xs text-red-400">⚠️ All {runsForLift.length} trails auto-disabled</div>
                  )}
                </div>
              );
            })}
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
                <div key={run.id} className={`bg-slate-800/50 rounded-xl p-4 border flex justify-between items-start ${!isOpen(run.lift, 'lift') ? 'border-red-800 opacity-60' : 'border-slate-700'}`}>
                  <div>
                    <h3 className="font-bold">{run.name}</h3>
                    <p className="text-sm text-slate-400">{parkCityData.lifts.find(l => l.id === run.lift)?.name}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(run.difficulty)}`}>{run.difficulty}</span>
                      <span className="px-2 py-1 rounded text-xs bg-slate-600">{run.terrain}</span>
                      <span className="px-2 py-1 rounded text-xs bg-slate-600">{run.length}mi</span>
                    </div>
                    {!isOpen(run.lift, 'lift') && (
                      <div className="mt-2 text-xs text-red-400">⚠️ Lift closed</div>
                    )}
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
              </div>
              <button onClick={planMyDay} className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-bold text-lg">Generate Plan</button>
            </div>

            {planResults && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400">Your Day Plan ({planResults.totalTime} min)</h2>
                <div className="space-y-4">
                  {planResults.runs.map((run, i) => (
                    <div key={i} className="relative">
                      <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-4">
                        <span className="text-2xl font-bold text-cyan-400">{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-amber-400">🚡 {parkCityData.lifts.find(l => l.id === run.lift)?.name}</span>
                            <span className="text-slate-500">→</span>
                            <span className="text-sm font-medium text-cyan-300">⛷️ {run.name}</span>
                          </div>
                          <p className="text-sm text-slate-400">{run.peak} • {run.time} • {run.duration} min • {run.length} mi</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(run.difficulty)}`}>{run.difficulty}</span>
                          <button 
                            onClick={() => excludeRunFromPlan(run.id, i)}
                            className="ml-2 px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded text-xs font-medium transition"
                            title="Exclude and find alternative"
                          >
                            ✕ Exclude
                          </button>
                        </div>
                      </div>
                      {replacements[i] && (
                        <div className="mt-2 ml-12 text-sm">
                          <span className="text-amber-400">↻ Replaced: </span>
                          <span className="text-slate-400 line-through">{parkCityData.runs.find(r => r.id === replacements[i].original)?.name}</span>
                          <span className="text-slate-500 mx-2">→</span>
                          <span className="text-green-400">{parkCityData.runs.find(r => r.id === replacements[i].replacement)?.name}</span>
                        </div>
                      )}
                      {i < planResults.runs.length - 1 && (
                        <div className="absolute left-8 top-full h-4 border-l-2 border-dashed border-slate-600"></div>
                      )}
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
