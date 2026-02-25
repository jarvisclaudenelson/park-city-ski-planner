import React, { useState, useEffect } from 'react';
import { lifts, runs, chalets, resortStats, peaks, bowls } from './data';
import MapView from './MapView';

const parkCityData = {
  lifts,
  runs,
  chalets
};

const peakList = [...new Set(parkCityData.runs.map(r => r.peak))];
const bases = ['Park City', 'Canyons Village'];

const difficultyOrder = { 'green': 1, 'blue': 2, 'black': 3, 'double': 4 };

const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:bg-green-500"></div>
  </label>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('lifts');
  const [liftStatus, setLiftStatus] = useState(() => JSON.parse(localStorage.getItem('parkcity_lifts') || '{}'));
  const [runStatus, setRunStatus] = useState(() => JSON.parse(localStorage.getItem('parkcity_runs') || '{}'));
  const [selectedPeaks, setSelectedPeaks] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [terrainFilter, setTerrainFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [planResults, setPlanResults] = useState(null);
  const [startBase, setStartBase] = useState('Park City');
  const [endBase, setEndBase] = useState('Park City');
  const [difficultyPref, setDifficultyPref] = useState('mix');
  const [terrainPref, setTerrainPref] = useState('any');
  const [optimizationMode, setOptimizationMode] = useState('maximize');
  const [skillLevel, setSkillLevel] = useState('intermediate');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('16:00');
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

  const getLiftDuration = () => 10;

  const filteredRuns = parkCityData.runs.filter(r => isOpen(r.id, 'run') && isOpen(r.lift, 'lift') &&
    (!selectedPeaks.length || selectedPeaks.includes(r.peak)) &&
    (difficultyFilter === 'all' || r.difficulty === difficultyFilter) &&
    (terrainFilter === 'all' || r.terrain === terrainFilter));

  const filteredLifts = parkCityData.lifts.filter(l => !selectedPeaks.length || selectedPeaks.includes(l.peak));

  const groupedRuns = filteredRuns.reduce((acc, run) => {
    if (!acc[run.difficulty]) acc[run.difficulty] = [];
    acc[run.difficulty].push(run);
    return acc;
  }, {});

  const sortedDifficulties = Object.keys(groupedRuns).sort((a, b) => difficultyOrder[a] - difficultyOrder[b]);

  const findAlternativeTrail = (currentRun, currentPlan) => {
    const currentLift = currentRun.lift;
    const currentDifficulty = currentRun.difficulty;
    let alternatives = parkCityData.runs.filter(r => 
      r.id !== currentRun.id && 
      r.lift === currentLift && 
      isOpen(r.id, 'run') && 
      isOpen(r.lift, 'lift')
    );
    const difficultyLevels = ['green', 'blue', 'black', 'double'];
    const currentIndex = difficultyLevels.indexOf(currentDifficulty);
    const similarDifficulties = difficultyLevels.filter((_, idx) => Math.abs(idx - currentIndex) <= 1);
    alternatives = alternatives.filter(r => similarDifficulties.includes(r.difficulty));
    const planRunIds = new Set(currentPlan.map(item => item.run?.id).filter(Boolean));
    alternatives = alternatives.filter(r => !planRunIds.has(r.id));
    if (alternatives.length === 0) {
      const currentPeak = currentRun.peak;
      const liftsOnPeak = parkCityData.lifts.filter(l => l.peak === currentPeak).map(l => l.id);
      alternatives = parkCityData.runs.filter(r => 
        r.id !== currentRun.id && 
        liftsOnPeak.includes(r.lift) && 
        isOpen(r.id, 'run') && 
        isOpen(r.lift, 'lift') &&
        similarDifficulties.includes(r.difficulty) &&
        !planRunIds.has(r.id)
      );
    }
    if (alternatives.length === 0) return null;
    return alternatives[Math.floor(Math.random() * alternatives.length)];
  };

  const replaceTrail = (segmentIndex) => {
    if (!planResults || !planResults.segments) return;
    const currentSegment = planResults.segments[segmentIndex];
    if (currentSegment.type !== 'run') return;
    const alternative = findAlternativeTrail(currentSegment.run, planResults.segments);
    if (!alternative) {
      alert('No suitable alternative trail found!');
      return;
    }
    const newSegments = [...planResults.segments];
    newSegments[segmentIndex] = {
      ...currentSegment,
      run: { ...alternative, duration: getRunDuration(alternative) },
      wasReplaced: true,
      originalRun: currentSegment.run
    };
    let currentTime = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const updatedSegments = newSegments.map(segment => {
      const timeStr = `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`;
      const duration = segment.type === 'lift' ? getLiftDuration() : getRunDuration(segment.run);
      currentTime += duration;
      return { ...segment, time: timeStr, duration };
    });
    setPlanResults({ ...planResults, segments: updatedSegments });
  };

  const planMyDay = () => {
    let availableRuns = parkCityData.runs.filter(r => isOpen(r.id, 'run') && isOpen(r.lift, 'lift'));
    if (selectedPeaks.length) availableRuns = availableRuns.filter(r => selectedPeaks.includes(r.peak));
    if (difficultyPref !== 'mix') availableRuns = availableRuns.filter(r => r.difficulty === difficultyPref);
    if (terrainPref !== 'any') availableRuns = availableRuns.filter(r => r.terrain === terrainPref);
    
    // Apply optimization mode
    let usedPeaks = new Set();
    let usedLifts = new Set();
    if (optimizationMode === 'onepeak' && selectedPeaks.length > 0) {
      const targetPeak = selectedPeaks[0];
      availableRuns = availableRuns.filter(r => r.peak === targetPeak);
    } else if (optimizationMode === 'favorites') {
      availableRuns = availableRuns.filter(r => r.favorite);
    }
    
    const startLifts = parkCityData.lifts.filter(l => l.base === startBase && isOpen(l.id, 'lift'));
    if (startLifts.length === 0) {
      alert('No open lifts available at the start base!');
      return;
    }
    const segments = [];
    let currentTime = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    const endTimeMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
    let currentLift = startLifts[Math.floor(Math.random() * startLifts.length)];
    let runsTaken = new Set();
    segments.push({
      type: 'lift',
      lift: currentLift,
      time: `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`,
      duration: getLiftDuration()
    });
    currentTime += getLiftDuration();
    let lunchAdded = false;
    while (currentTime < endTimeMinutes - 30) {
      if (includeLunch && !lunchAdded) {
        const lunchTimeMinutes = parseInt(lunchTime.split(':')[0]) * 60 + parseInt(lunchTime.split(':')[1]);
        if (currentTime >= lunchTimeMinutes - 15 && currentTime <= lunchTimeMinutes + 15) {
          const chalet = parkCityData.chalets.find(c => c.id === lunchChalet);
          segments.push({ type: 'lunch', chalet, time: `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`, duration: 60 });
          currentTime += 60;
          lunchAdded = true;
          continue;
        }
      }
      // Use connectsToLifts metadata for valid run→lift connections
      const run = parkCityData.runs.find(r => r.lift === currentLift.id);
      const validLiftsFromRun = run?.connectsToLifts || [currentLift.id];
      const possibleRuns = availableRuns.filter(r => validLiftsFromRun.includes(r.lift) && !runsTaken.has(r.id));
      if (possibleRuns.length === 0) {
        const currentPeak = currentLift.peak;
        const currentLiftData = parkCityData.lifts.find(l => l.id === currentLift.id);
        const validLiftIds = currentLiftData?.connectsTo || [];
        const liftsFromPeak = parkCityData.lifts.filter(l => validLiftIds.includes(l.id) && isOpen(l.id, 'lift'));
        if (liftsFromPeak.length === 0) break;
        currentLift = liftsFromPeak[Math.floor(Math.random() * liftsFromPeak.length)];
        segments.push({ type: 'lift', lift: currentLift, time: `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`, duration: getLiftDuration() });
        currentTime += getLiftDuration();
        continue;
      }
      const run1 = possibleRuns[Math.floor(Math.random() * possibleRuns.length)];
      runsTaken.add(run1.id);
      segments.push({ type: 'run', run: { ...run1, duration: getRunDuration(run1) }, time: `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`, duration: getRunDuration(run1) });
      currentTime += getRunDuration(run1);

      let additionalRuns = availableRuns.filter(r => r.lift === currentLift.id && !runsTaken.has(r.id));
      if(additionalRuns.length > 0) {
        const run2 = additionalRuns[Math.floor(Math.random() * additionalRuns.length)];
        runsTaken.add(run2.id);
        segments.push({ type: 'run', run: { ...run2, duration: getRunDuration(run2) }, time: `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`, duration: getRunDuration(run2) });
        currentTime += getRunDuration(run2);
      }

      const liftsAtPeak = parkCityData.lifts.filter(l => l.peak === run1.peak && isOpen(l.id, 'lift'));
      if (liftsAtPeak.length === 0) break;
      currentLift = liftsAtPeak[Math.floor(Math.random() * liftsAtPeak.length)];
      segments.push({ type: 'lift', lift: currentLift, time: `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`, duration: getLiftDuration() });
      currentTime += getLiftDuration();
      if (segments.length > 30) break;
    }
    const lastLift = segments[segments.length - 1]?.lift;
    if (lastLift && lastLift.base !== endBase) {
      const liftsToEnd = parkCityData.lifts.filter(l => l.base === endBase && isOpen(l.id, 'lift'));
      if (liftsToEnd.length > 0) {
        const connectingLift = liftsToEnd[Math.floor(Math.random() * liftsToEnd.length)];
        segments.push({ type: 'lift', lift: connectingLift, time: `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`, duration: getLiftDuration(), note: 'To base' });
      }
    }
    setPlanResults({ segments, totalTime: currentTime - (parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1])) });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'black': return 'bg-gray-800';
      case 'double': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'green': return '● Green';
      case 'blue': return '● Blue';
      case 'black': return '● Black';
      case 'double': return '● Double Black';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 text-gray-900">
      <header className="bg-gradient-to-r from-blue-700 to-green-700 py-6 shadow-xl">
        <h1 className="text-4xl font-bold text-center">⛰️ Park City Ski Planner</h1>
        <p className="text-center text-blue-100 mt-2">Plan your perfect day on the mountain</p>
      </header>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 py-3 overflow-x-auto">
          {['lifts', 'runs', 'plan', 'map'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-lg font-semibold whitespace-nowrap transition shadow ${activeTab === tab ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>
              {tab === 'lifts' ? '🚡 Lifts' : tab === 'runs' ? '⛷️ Trails' : tab === 'plan' ? '📋 Plan My Day' : '🗺️ Map'}
            </button>
          ))}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-green-700">Filter by Peak</h3>
          <div className="flex flex-wrap gap-2">
            {peakList.map(p => (
              <button key={p} onClick={() => setSelectedPeaks(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedPeaks.includes(p) ? 'bg-green-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        {activeTab === 'lifts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLifts.map(lift => (
              <div key={lift.id} className="bg-white rounded-xl p-4 border border-gray-300 shadow flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{lift.name}</h3>
                  <p className="text-sm text-gray-600">{lift.base}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-gray-300 rounded text-xs">{lift.peak}</span>
                </div>
                <ToggleSwitch checked={isOpen(lift.id, 'lift')} onChange={() => toggleLift(lift.id)} />
              </div>
            ))}
          </div>
        )}
        {activeTab === 'runs' && (
          <div>
            <div className="flex flex-wrap gap-4 mb-6 items-center">
              <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <option value="all">All Difficulties</option>
                <option value="green">Green</option><option value="blue">Blue</option><option value="black">Black</option><option value="double">Double Black</option>
              </select>
              <select value={terrainFilter} onChange={(e) => setTerrainFilter(e.target.value)} className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <option value="all">All Terrain</option>
                <option value="groomed">Groomed</option><option value="moguls">Moguls</option><option value="powders">Powder</option><option value="trees">Trees</option>
              </select>
              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
                <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-md text-sm transition ${viewMode === 'list' ? 'bg-green-500 text-white shadow' : 'text-gray-700 hover:bg-gray-200'}`}>List View</button>
                <button onClick={() => setViewMode('grouped')} className={`px-4 py-1.5 rounded-md text-sm transition ${viewMode === 'grouped' ? 'bg-green-500 text-white shadow' : 'text-gray-700 hover:bg-gray-200'}`}>Grouped by Difficulty</button>
              </div>
              <span className="text-gray-600 self-center">{filteredRuns.length} runs</span>
            </div>
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRuns.map(run => (
                  <div key={run.id} className="bg-white rounded-xl p-4 border border-gray-300 shadow flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{run.name}</h3>
                      <p className="text-sm text-gray-600">{parkCityData.lifts.find(l => l.id === run.lift)?.name}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(run.difficulty)}`}>{run.difficulty}</span>
                        <span className="px-2 py-1 rounded text-xs bg-gray-300">{run.terrain}</span>
                        <span className="px-2 py-1 rounded text-xs bg-gray-300">{run.length}mi</span>
                      </div>
                    </div>
                    <ToggleSwitch checked={isOpen(run.id, 'run')} onChange={() => toggleRun(run.id)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedDifficulties.map(difficulty => (
                  <div key={difficulty} className="bg-white rounded-xl p-4 border border-gray-300 shadow">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${getDifficultyColor(difficulty)}`}></span>
                      <span className={difficulty === 'green' ? 'text-green-600' : difficulty === 'blue' ? 'text-blue-600' : difficulty === 'black' ? 'text-gray-800' : 'text-red-600'}>{getDifficultyLabel(difficulty)}</span>
                      <span className="text-gray-500 text-sm">({groupedRuns[difficulty].length} runs)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {groupedRuns[difficulty].map(run => (
                        <div key={run.id} className="bg-white rounded-lg p-3 border border-gray-300 shadow flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-sm">{run.name}</h4>
                            <p className="text-xs text-gray-600">{parkCityData.lifts.find(l => l.id === run.lift)?.name}</p>
                            <div className="flex gap-2 mt-1">
                              <span className="px-2 py-0.5 rounded text-xs bg-gray-300">{run.terrain}</span>
                              <span className="px-2 py-0.5 rounded text-xs bg-gray-300">{run.length}mi</span>
                            </div>
                          </div>
                          <ToggleSwitch checked={isOpen(run.id, 'run')} onChange={() => toggleRun(run.id)} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-300 shadow">
              <h2 className="text-2xl font-bold mb-6 text-green-700">Configure Your Day</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Location (Base)</label>
                  <select value={startBase} onChange={(e) => setStartBase(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                    {bases.map(base => <option key={base} value={base}>{base}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Location (Base)</label>
                  <select value={endBase} onChange={(e) => setEndBase(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                    {bases.map(base => <option key={base} value={base}>{base}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                  <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Preference</label>
                  <select value={difficultyPref} onChange={(e) => setDifficultyPref(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                    <option value="mix">Mix</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="black">Black</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Terrain Preference</label>
                  <select value={terrainPref} onChange={(e) => setTerrainPref(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                    <option value="any">Any</option>
                    <option value="groomed">Groomed</option>
                    <option value="moguls">Moguls</option>
                    <option value="powders">Powder</option>
                    <option value="trees">Trees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Optimization</label>
                  <select value={optimizationMode} onChange={(e) => setOptimizationMode(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                    <option value="maximize">Maximize Terrain</option>
                    <option value="favorites">Favorites Only</option>
                    <option value="difficulty">Difficulty Filter</option>
                    <option value="onepeak">One Peak</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeLunch} onChange={(e) => setIncludeLunch(e.target.checked)} className="w-4 h-4 rounded accent-green-500" />
                  <span className="text-gray-700">Include Lunch</span>
                </label>
                {includeLunch && (
                  <>
                    <select value={lunchChalet} onChange={(e) => setLunchChalet(e.target.value)} className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2">
                      {parkCityData.chalets.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <input type="time" value={lunchTime} onChange={(e) => setLunchTime(e.target.value)} className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2" />
                  </>
                )}
              </div>
              <button onClick={planMyDay} className="mt-6 w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-6 py-3 rounded-lg font-bold text-lg transition shadow">
                Generate Plan
              </button>
            </div>
            {planResults && planResults.segments && (
              <div className="bg-white rounded-xl p-6 border border-gray-300 shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-green-700">Your Day Plan</h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Time: <span className="text-gray-900 font-bold">{planResults.totalTime} min</span></p>
                    <p className="text-xs text-gray-500">{planResults.segments.filter(s => s.type === 'run').length} runs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-300">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-xl">🏁</span>
                  </div>
                  <div>
                    <p className="font-bold text-green-700">START</p>
                    <p className="text-sm text-gray-600">{startBase} at {startTime}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {planResults.segments.map((segment, i) => (
                    <div key={i}>
                      {segment.type === 'lift' && (
                        <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg border-l-4 border-green-500 shadow">
                          <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-green-700 font-bold text-xs">🚡</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-green-700">[LIFT]</span>
                              <span className="font-semibold">{segment.lift.name}</span>
                              {segment.note && <span className="text-xs text-gray-600">({segment.note})</span>}
                            </div>
                            <p className="text-xs text-gray-500">To {segment.lift.peak} • {segment.duration} min</p>
                          </div>
                          <span className="text-sm text-gray-600">{segment.time}</span>
                        </div>
                      )}
                      {segment.type === 'run' && (
                        <div className={`flex items-center gap-4 p-3 rounded-lg border-l-4 ${segment.wasReplaced ? 'bg-yellow-100 border-yellow-500 shadow' : 'bg-gray-100 border-green-500 shadow'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getDifficultyColor(segment.run.difficulty)}`}>
                            <span className="text-white font-bold text-xs">⛷️</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-green-700">[TRAIL]</span>
                              <span className="font-semibold">{segment.run.name}</span>
                              {segment.wasReplaced && <span className="text-xs text-yellow-600 bg-yellow-200 px-2 py-0.5 rounded">↻ Replaced</span>}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(segment.run.difficulty)}`}>{segment.run.difficulty}</span>
                              <span className="text-xs text-gray-600">{segment.run.peak} • {segment.duration} min • {segment.run.length} mi</span>
                            </div>
                            {segment.originalRun && <p className="text-xs text-gray-600 mt-1">Replaced: {segment.originalRun.name}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{segment.time}</span>
                            <button onClick={() => replaceTrail(i)} className="ml-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs transition" title="Replace with alternative trail">↻ Replace</button>
                          </div>
                        </div>
                      )}
                      {segment.type === 'lunch' && (
                        <div className="flex items-center gap-4 bg-yellow-100 p-3 rounded-lg border-l-4 border-yellow-500 shadow">
                          <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-yellow-600 font-bold text-xs">🍽️</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-yellow-600">[LUNCH]</span>
                              <span className="font-semibold">{segment.chalet.name}</span>
                            </div>
                            <p className="text-xs text-gray-600">{segment.duration} min break</p>
                          </div>
                          <span className="text-sm text-gray-600">{segment.time}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-300">
                  <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center">
                    <span className="text-xl">🏁</span>
                  </div>
                  <div>
                    <p className="font-bold text-red-700">END</p>
                    <p className="text-sm text-gray-600">{endBase}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'map' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Mountain Map</h2>
              <p className="text-gray-600">Interactive trail map with your planned route overlay. Pan and zoom to explore.</p>
            </div>
            <MapView 
              planResults={planResults}
              parkCityData={parkCityData}
              liftStatus={liftStatus}
              runStatus={runStatus}
              isOpen={isOpen}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
