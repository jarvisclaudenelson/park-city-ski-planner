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
    { id: 'discovery', name: 'Discovery', difficulty: 'green', terrain: 'groomed', lift: 'payday', length: 1.8, peak: 'Treasure' },
    { id: 'bonanza', name: 'Bonanza', difficulty: 'blue', terrain: 'groomed', lift: 'bonanza', length: 2.4, peak: 'Bonanza' },
    { id: 'STS', name: 'Shooting Star', difficulty: 'black', terrain: 'groomed', lift: 'bonanza', length: 2.1, peak: 'Bonanza' },
    { id: 'comet', name: 'Comet', difficulty: 'blue', terrain: 'moguls', lift: 'bonanza', length: 1.7, peak: 'Bonanza' },
    { id: 'asteroid', name: 'Asteroid', difficulty: 'black', terrain: 'moguls', lift: 'bonanza', length: 1.6, peak: 'Bonanza' },
    { id: 'flare', name: 'Flare', difficulty: 'double', terrain: 'powders', lift: 'bonanza', length: 1.3, peak: 'Bonanza' },
    { id: 'crescent', name: 'Crescent', difficulty: 'blue', terrain: 'groomed', lift: 'crescent', length: 2.0, peak: 'Crescent' },
    { id: 'crescent_face', name: 'Crescent Face', difficulty: 'black', terrain: 'moguls', lift: 'crescent', length: 1.8, peak: 'Crescent' },
    { id: 'townrun', name: 'Town Run', difficulty: 'blue', terrain: 'groomed', lift: 'townlift', length: 2.2, peak: 'Town' },
    { id: 'mainstreet', name: 'Mainstreet', difficulty: 'green', terrain: 'groomed', lift: 'townlift', length: 2.0, peak: 'Town' },
    { id: 'millsite', name: 'Millsite', difficulty: 'black', terrain: 'moguls', lift: 'townlift', length: 1.8, peak: 'Town' },
    { id: 'cream', name: 'Cream', difficulty: 'double', terrain: 'powders', lift: 'townlift', length: 1.4, peak: 'Town' },
    { id: 'silvercloud_run', name: 'Silver Cloud', difficulty: 'blue', terrain: 'groomed', lift: 'silvercloud', length: 2.3, peak: 'Silver Cloud' },
    { id: 'dreamscape', name: 'Dreamscape', difficulty: 'blue', terrain: 'groomed', lift: 'silvercloud', length: 2.1, peak: 'Silver Cloud' },
    { id: 'chevron', name: 'Chevron', difficulty: 'black', terrain: 'moguls', lift: 'silvercloud', length: 1.9, peak: 'Silver Cloud' },
    { id: 'conquer', name: 'Conquer', difficulty: 'black', terrain: 'groomed', lift: 'silvercloud', length: 2.0, peak: 'Silver Cloud' },
    { id: 'victory', name: 'Victory', difficulty: 'double', terrain: 'powders', lift: 'silvercloud', length: 1.5, peak: 'Silver Cloud' },
    { id: 'quicksilver_run', name: 'Quicksilver', difficulty: 'blue', terrain: 'groomed', lift: 'quicksilver', length: 2.5, peak: 'Silver Cloud' },
    { id: 'redstone', name: 'Redstone', difficulty: 'blue', terrain: 'groomed', lift: 'quicksilver', length: 2.2, peak: 'Silver Cloud' },
    { id: 'sirocco', name: 'Sirocco', difficulty: 'black', terrain: 'powders', lift: 'quicksilver', length: 1.8, peak: 'Silver Cloud' },
    { id: 'chinook', name: 'Chinook', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 2.1, peak: 'Canyons Peak' },
    { id: 'bighorn', name: 'Bighorn', difficulty: 'blue', terrain: 'groomed', lift: 'canyons', length: 1.9, peak: 'Canyons Peak' },
    { id: 'mountain', name: 'Mountain', difficulty: 'black', terrain: 'moguls', lift: 'canyons', length: 1.8, peak: 'Canyons Peak' },
    { id: 'tombstone_run', name: 'Tombstone', difficulty: 'blue', terrain: 'groomed', lift: 'tombstone', length: 2.0, peak: 'Tombstone' },
    { id: 'kisses', name: 'Kisses', difficulty: 'black', terrain: 'powders', lift: 'tombstone', length: 1.7, peak: 'Tombstone' },
    { id: 'reef', name: 'Reef', difficulty: 'black', terrain: 'moguls', lift: 'tombstone', length: 1.6, peak: 'Tombstone' },
    { id: 'graves', name: 'Graves', difficulty: 'double', terrain: 'powders', lift: 'tombstone', length: 1.4, peak: 'Tombstone' },
    { id: 'redpine_run', name: 'Red Pine', difficulty: 'blue', terrain: 'groomed', lift: 'redpine', length: 2.2, peak: 'Red Pine' },
    { id: 'wedge', name: 'Wedge', difficulty: 'black', terrain: 'powders', lift: 'redpine', length: 1.9, peak: 'Red Pine' },
    { id: 'pinecone', name: 'Pinecone', difficulty: 'blue', terrain: 'trees', lift: 'redpine', length: 1.7, peak: 'Red Pine' },
    { id: 'homestake_run', name: 'Homestake', difficulty: 'blue', terrain: 'groomed', lift: 'homestake', length: 2.1, peak: 'Homestake' },
    { id: 'dutch', name: 'Dutch', difficulty: 'black', terrain: 'moguls', lift: 'homestake', length: 1.8, peak: 'Homestake' },
    { id: 'thaynes_run', name: 'Thaynes', difficulty: 'blue', terrain: 'groomed', lift: 'thaynes', length: 2.0, peak: 'Thaynes' },
    { id: 'thaynes_face', name: 'Thaynes Face', difficulty: 'black', terrain: 'moguls', lift: 'thaynes', length: 1.8, peak: 'Thaynes' },
    { id: 'saddleback_run', name: 'Saddleback', difficulty: 'blue', terrain: 'groomed', lift: 'saddleback', length: 1.9, peak: 'Saddleback' },
    { id: 'kildeer', name: 'Kildeer', difficulty: 'black', terrain: 'powders', lift: 'saddleback', length: 1.7, peak: 'Saddleback' },
    { id: 'eagle_run', name: 'Eagle', difficulty: 'blue', terrain: 'groomed', lift: 'eagle', length: 2.0, peak: 'Eagle' },
    { id: 'eagle_falls', name: 'Eagle Falls', difficulty: 'black', terrain: 'powders', lift: 'eagle', length: 1.8, peak: 'Eagle' },
    { id: 'golden_eagle', name: 'Golden Eagle', difficulty: 'black', terrain: 'moguls', lift: 'eagle', length: 1.7, peak: 'Eagle' },
    { id: 'golf_run', name: 'Golf', difficulty: 'green', terrain: 'groomed', lift: 'golf', length: 1.8, peak: 'Golf' },
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
