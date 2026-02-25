import React, { useState, useRef } from 'react';

// Park City trail map background image URL
// Removed Unsplash URL; using SVG topographic background instead

// Park City mountain layout data with coordinates (percentage-based for responsive scaling)
export const mountainLayout = {
  peaks: {
    'Treasure': { x: 55, y: 75, name: 'Treasure Peak' },
    'Bonanza': { x: 45, y: 60, name: 'Bonanza Peak' },
    'Crescent': { x: 35, y: 45, name: 'Crescent Peak' },
    'Town': { x: 65, y: 85, name: 'Town Lift Area' },
    'Silver Cloud': { x: 50, y: 50, name: 'Silver Cloud' },
    'Canyons Peak': { x: 25, y: 35, name: 'Canyons Peak' },
    'Tombstone': { x: 20, y: 55, name: 'Tombstone' },
    'Red Pine': { x: 30, y: 40, name: 'Red Pine' },
    'Homestake': { x: 15, y: 45, name: 'Homestake' },
    'Thaynes': { x: 40, y: 55, name: 'Thaynes Peak' },
    'Saddleback': { x: 10, y: 60, name: 'Saddleback' },
    'Eagle': { x: 5, y: 50, name: 'Eagle Peak' },
    'Golf': { x: 70, y: 70, name: 'Golf Peak' },
    'Peak 9990': { x: 8, y: 40, name: 'Peak 9990' },
    'Jupiter Peak': { x: 42, y: 25, name: 'Jupiter Peak' },
    'Murdoch': { x: 12, y: 35, name: 'Murdoch' },
    'Pioneer Ridge': { x: 60, y: 30, name: 'Pioneer Ridge' },
  },
  lifts: {
    'payday': { name: 'Payday Lift', x1: 55, y1: 90, x2: 55, y2: 75 },
    'bonanza': { name: 'Bonanza Lift', x1: 45, y1: 80, x2: 45, y2: 60 },
    'crescent': { name: 'Crescent Lift', x1: 35, y1: 70, x2: 35, y2: 45 },
    'townlift': { name: 'Town Lift', x1: 65, y1: 95, x2: 65, y2: 85 },
    'silvercloud': { name: 'Silver Cloud Lift', x1: 52, y1: 65, x2: 50, y2: 50 },
    'condor': { name: 'Condor Lift', x1: 48, y1: 60, x2: 50, y2: 50 },
    'quicksilver': { name: 'Quicksilver Gondola', x1: 30, y1: 75, x2: 50, y2: 50 },
    'canyons': { name: 'Canyons Gondola', x1: 25, y1: 80, x2: 25, y2: 35 },
    'tombstone': { name: 'Tombstone Lift', x1: 20, y1: 75, x2: 20, y2: 55 },
    'redpine': { name: 'Red Pine Lift', x1: 30, y1: 60, x2: 30, y2: 40 },
    'ironwood': { name: 'Ironwood Lift', x1: 32, y1: 55, x2: 30, y2: 40 },
    'homestake': { name: 'Homestake Lift', x1: 15, y1: 65, x2: 15, y2: 45 },
    'thaynes': { name: 'Thaynes Canyon Lift', x1: 40, y1: 75, x2: 40, y2: 55 },
    'drift': { name: 'Drift Lift', x1: 38, y1: 70, x2: 40, y2: 55 },
    'saddleback': { name: 'Saddleback Lift', x1: 10, y1: 75, x2: 10, y2: 60 },
    'eagle': { name: 'Eagle Lift', x1: 5, y1: 65, x2: 5, y2: 50 },
    'float': { name: 'Float Lift', x1: 7, y1: 60, x2: 5, y2: 50 },
    'golf': { name: 'Golf Lift', x1: 70, y1: 80, x2: 70, y2: 70 },
    'peak9990': { name: 'Peak 9990 Lift', x1: 8, y1: 55, x2: 8, y2: 40 },
    'cleavage': { name: 'Cleavage Lift', x1: 43, y1: 75, x2: 45, y2: 60 },
    'spur': { name: 'Spur Lift', x1: 63, y1: 90, x2: 65, y2: 85 },
    'frostwood': { name: 'Frostwood Lift', x1: 28, y1: 50, x2: 30, y2: 40 },
    'jupiter': { name: 'Jupiter Lift', x1: 42, y1: 40, x2: 42, y2: 25 },
    'murdoch': { name: 'Murdoch Lift', x1: 12, y1: 50, x2: 12, y2: 35 },
    'pioneer': { name: 'Pioneer Lift', x1: 58, y1: 45, x2: 60, y2: 30 },
  },
  connections: [
    { from: 'Treasure', to: 'Bonanza', difficulty: 'blue' },
    { from: 'Bonanza', to: 'Crescent', difficulty: 'blue' },
    { from: 'Crescent', to: 'Silver Cloud', difficulty: 'blue' },
    { from: 'Silver Cloud', to: 'Canyons Peak', difficulty: 'blue' },
    { from: 'Treasure', to: 'Town', difficulty: 'green' },
    { from: 'Bonanza', to: 'Silver Cloud', difficulty: 'blue' },
    { from: 'Thaynes', to: 'Bonanza', difficulty: 'black' },
    { from: 'Thaynes', to: 'Crescent', difficulty: 'blue' },
    { from: 'Red Pine', to: 'Canyons Peak', difficulty: 'blue' },
    { from: 'Homestake', to: 'Red Pine', difficulty: 'blue' },
    { from: 'Tombstone', to: 'Red Pine', difficulty: 'blue' },
    { from: 'Saddleback', to: 'Tombstone', difficulty: 'blue' },
    { from: 'Eagle', to: 'Homestake', difficulty: 'blue' },
    { from: 'Peak 9990', to: 'Eagle', difficulty: 'black' },
    { from: 'Golf', to: 'Treasure', difficulty: 'green' },
    { from: 'Jupiter Peak', to: 'Crescent', difficulty: 'black' },
    { from: 'Pioneer Ridge', to: 'Silver Cloud', difficulty: 'blue' },
  ]
};

const difficultyColors = {
  green: '#22c55e',
  blue: '#3b82f6',
  black: '#1f2937',
  double: '#7f1d1d',
};

const difficultyLabels = {
  green: '● Green',
  blue: '● Blue',
  black: '● Black',
  double: '● Double Black',
};

const MapView = ({ planResults, parkCityData, liftStatus, runStatus, isOpen }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLifts, setShowLifts] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [showPlanRoute, setShowPlanRoute] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [useTrailMap, setUseTrailMap] = useState(false);
  const containerRef = useRef(null);

  const getPlanRoute = () => {
    if (!planResults || !planResults.segments || planResults.segments.length === 0) return null;
    const route = [];
    planResults.segments.forEach((segment, index) => {
      if (segment.type === 'lift') {
        // Ensure consistent key matching by converting to lowercase
        const liftId = segment.lift.id.toLowerCase();
        const liftLayout = mountainLayout.lifts[liftId];
        if (liftLayout) {
          route.push({ type: 'lift', name: segment.lift.name, ...liftLayout, index });
        }
      } else if (segment.type === 'run') {
        const peak = mountainLayout.peaks[segment.run.peak];
        if (peak) {
          route.push({ type: 'run', name: segment.run.name, difficulty: segment.run.difficulty, peak: segment.run.peak, x: peak.x, y: peak.y, index });
        }
      }
    });
    return route;
  };

  const planRoute = getPlanRoute();

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.2, 4));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.2, 0.5));
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(z => Math.max(0.5, Math.min(4, z * delta)));
  };

  const getRunPosition = (runId, peakName, index) => {
    const peak = mountainLayout.peaks[peakName];
    if (!peak) return { x: 50, y: 50 };
    const offsetX = (index % 3 - 1) * 3;
    const offsetY = Math.floor(index / 3) * 2;
    return { x: peak.x + offsetX, y: peak.y + offsetY + 5 };
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-300">Zoom:</span>
            <button onClick={handleZoomOut} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">−</button>
            <span className="text-sm text-slate-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">+</button>
            <button onClick={handleReset} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">Reset</button>
          </div>
          <div className="h-6 w-px bg-slate-600"></div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showLifts} onChange={(e) => setShowLifts(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500" />
              <span className="text-sm text-slate-300">Lifts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showTrails} onChange={(e) => setShowTrails(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500" />
              <span className="text-sm text-slate-300">Trails</span>
            </label>
            {planRoute && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showPlanRoute} onChange={(e) => setShowPlanRoute(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500" />
                <span className="text-sm text-cyan-400 font-medium">Plan Route</span>
              </label>
            )}
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-3 text-xs">
            {Object.entries(difficultyLabels).map(([key, label]) => (
              <span key={key} style={{ color: difficultyColors[key] }} className="font-medium">{label}</span>
            ))}
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden" className="relative bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden h-64 md:h-[600px]">
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onWheel={handleWheel}>
          {/* Background Image */}
          {useTrailMap ? (
            <img src="https://www.parkcity.com/-/media/Images/park-city/trail-maps/park-city-trail-map.jpg" onLoad={() => setImageLoaded(true)} className="w-full h-full object-cover" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center' }} />
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-40" style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
              }}>
              <defs>
                <linearGradient id="mountainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a3a3a3" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" fill="url(#mountainGradient)" />
              <path d="M10,80 Q30,20 50,60 T90,50" fill="none" stroke="#4b5563" strokeWidth="1" />
            </svg>
          )}

          
          {/* SVG Overlay */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center' }}>
            {/* Semi-transparent overlay for better visibility */}
            <rect x="0" y="0" width="100" height="100" fill="#0f172a" opacity="0.3" />
            
            {/* Peak areas */}
            {Object.entries(mountainLayout.peaks).map(([key, peak]) => (
              <g key={key}>
                <circle cx={peak.x} cy={peak.y} r="8" fill="#334155" opacity="0.3" />
                <text x={peak.x} y={peak.y - 12} textAnchor="middle" fill="#e2e8f0" fontSize="2" fontWeight="bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  {peak.name}
                </text>
              </g>
            ))}

            {/* Connection trails between peaks */}
            {showTrails && mountainLayout.connections.map((conn, i) => {
              const from = mountainLayout.peaks[conn.from];
              const to = mountainLayout.peaks[conn.to];
              if (!from || !to) return null;
              return (
                <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={difficultyColors[conn.difficulty]} strokeWidth="0.8" opacity="0.6" strokeDasharray="2,1" />
              );
            })}

            {/* Lifts */}
            {showLifts && Object.entries(mountainLayout.lifts).map(([key, lift]) => {
              const isClosed = liftStatus[key] === 'closed';
              return (
                <g key={key} opacity={isClosed ? 0.3 : 1}>
                  <line x1={lift.x1} y1={lift.y1} x2={lift.x2} y2={lift.y2} stroke={isClosed ? '#ef4444' : '#06b6d4'} strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx={lift.x1} cy={lift.y1} r="1.8" fill="#06b6d4" />
                  <circle cx={lift.x2} cy={lift.y2} r="1.8" fill="#06b6d4" />
                  <text x={(lift.x1 + lift.x2) / 2} y={(lift.y1 + lift.y2) / 2 - 2} textAnchor="middle" fill="#22d3ee" fontSize="2" fontWeight="bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {lift.name}
                  </text>
                </g>
              );
            })}

            {/* All runs grouped by peak */}
            {showTrails && parkCityData.runs.map((run, i) => {
              const pos = getRunPosition(run.id, run.peak, i);
              const isClosed = runStatus[run.id] === 'closed' || liftStatus[run.lift] === 'closed';
              return (
                <g key={run.id} opacity={isClosed ? 0.2 : 0.7}>
                  <circle cx={pos.x} cy={pos.y} r="1.5" fill={difficultyColors[run.difficulty] || '#64748b'} stroke="#000" strokeWidth="0.3" />
                </g>
              );
            })}

            {/* Plan Route Overlay */}
            {showPlanRoute && planRoute && planRoute.map((item, i) => {
              if (item.type === 'lift') {
                return (
                  <g key={`plan-${i}`}>
                    <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
                    <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,2" opacity="0.8">
                      <animate attributeName="stroke-dashoffset" from="0" to="5" dur="1s" repeatCount="indefinite" />
                    </line>
                    <circle cx={item.x2} cy={item.y2} r="2.5" fill="#fbbf24" stroke="#000" strokeWidth="0.5" />
                    <text x={item.x2} y={item.y2 + 1} textAnchor="middle" fill="#000" fontSize="3" fontWeight="bold">{item.index + 1}</text>
                  </g>
                );
              } else {
                return (
                  <g key={`plan-${i}`}>
                    <circle cx={item.x} cy={item.y} r="2.5" fill={difficultyColors[item.difficulty] || '#3b82f6'} stroke="#fbbf24" strokeWidth="1.5" opacity="0.95" />
                    <rect x={item.x - 9} y={item.y - 12} width="18" height="4" fill="#1e293b" rx="1" opacity="0.9" />
                    <text x={item.x} y={item.y - 9} textAnchor="middle" fill="#fbbf24" fontSize="2" fontWeight="bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                      {item.name}
                    </text>
                  </g>
                );
              }
            })}

            {/* Start point marker */}
            {showPlanRoute && planRoute && planRoute[0] && (
              <g>
                <circle cx={planRoute[0].x2 || planRoute[0].x} cy={planRoute[0].y2 || planRoute[0].y} r="5" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.9">
                  <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x={planRoute[0].x2 || planRoute[0].x} y={(planRoute[0].y2 || planRoute[0].y) - 8} textAnchor="middle" fill="#22c55e" fontSize="3" fontWeight="bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  START
                </text>
              </g>
            )}

            {/* End point marker */}
            {showPlanRoute && planRoute && planRoute.length > 0 && (
              <g>
                {(() => {
                  const lastItem = planRoute[planRoute.length - 1];
                  const x = lastItem.x || lastItem.x2 || 50;
                  const y = lastItem.y || lastItem.y2 || 50;
                  return (
                    <>
                      <circle cx={x} cy={y} r="5" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.9">
                        <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text x={x} y={y - 8} textAnchor="middle" fill="#ef4444" fontSize="3" fontWeight="bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                        END
                      </text>
                    </>
                  );
                })()}
              </g>
            )}
          </svg>
        </div>

        <div className="absolute bottom-4 left-4 bg-slate-900/90 px-3 py-2 rounded-lg text-xs text-slate-400 border border-slate-700">
          🖱️ Drag to pan • Scroll to zoom
        </div>
        
        <button onClick={() => setUseTrailMap(prev => !prev)} className="absolute top-4 right-4 bg-slate-900/90 px-3 py-2 rounded-lg text-xs text-slate-400 border border-slate-700 hover:bg-slate-700 transition">
          Trail Map Background
        </button>
      </div>

      {planRoute && planRoute.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Route Summary</h3>
          <div className="flex flex-wrap gap-2">
            {planRoute.filter(item => item.type === 'run').map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                <span className="text-sm font-bold text-slate-400">{i + 1}.</span>
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: difficultyColors[item.difficulty], color: item.difficulty === 'green' || item.difficulty === 'blue' ? 'white' : '#e2e8f0' }}>
                  {item.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
