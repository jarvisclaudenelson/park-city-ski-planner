import React, { useState, useRef, useEffect } from 'react';

// Park City mountain layout data with coordinates (percentage-based for responsive scaling)
export const mountainLayout = {
  // Peaks with their relative positions on the map
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
  },
  // Lifts with their start/end positions
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
  },
  // Key connection routes between peaks (simplified trail network)
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
  const svgRef = useRef(null);

  // Get active plan route data
  const getPlanRoute = () => {
    if (!planResults || !planResults.runs || planResults.runs.length === 0) return null;
    
    const route = [];
    planResults.runs.forEach((run, index) => {
      const lift = parkCityData.lifts.find(l => l.id === run.lift);
      const peak = mountainLayout.peaks[run.peak];
      
      if (lift && peak) {
        route.push({
          type: 'lift',
          name: lift.name,
          id: lift.id,
          ...mountainLayout.lifts[run.lift],
          index,
        });
        route.push({
          type: 'run',
          name: run.name,
          id: run.id,
          difficulty: run.difficulty,
          peak: run.peak,
          x: peak.x,
          y: peak.y,
          index,
        });
      }
    });
    return route;
  };

  const planRoute = getPlanRoute();

  // Zoom handlers
  const handleZoomIn = () => setZoom(z => Math.min(z * 1.2, 4));
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(z => Math.max(0.5, Math.min(4, z * delta)));
  };

  // Get run coordinates (offset slightly from peak for visual variety)
  const getRunPosition = (runId, peakName, index) => {
    const peak = mountainLayout.peaks[peakName];
    if (!peak) return { x: 50, y: 50 };
    
    // Offset runs slightly based on index for visual separation
    const offsetX = (index % 3 - 1) * 3;
    const offsetY = Math.floor(index / 3) * 2;
    return {
      x: peak.x + offsetX,
      y: peak.y + offsetY + 5,
    };
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
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
              <input 
                type="checkbox" 
                checked={showLifts} 
                onChange={(e) => setShowLifts(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-500"
              />
              <span className="text-sm text-slate-300">Lifts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showTrails} 
                onChange={(e) => setShowTrails(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-500"
              />
              <span className="text-sm text-slate-300">Trails</span>
            </label>
            {planRoute && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showPlanRoute} 
                  onChange={(e) => setShowPlanRoute(e.target.checked)}
                  className="w-4 h-4 rounded accent-cyan-500"
                />
                <span className="text-sm text-cyan-400 font-medium">Plan Route</span>
              </label>
            )}
          </div>
          
          <div className="flex-1"></div>
          
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            {Object.entries(difficultyLabels).map(([key, label]) => (
              <span key={key} style={{ color: difficultyColors[key] }} className="font-medium">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        className="relative bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
        style={{ height: '600px' }}
      >
        <div 
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <svg 
            ref={svgRef}
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Background */}
            <rect x="0" y="0" width="100" height="100" fill="#0f172a" />
            
            {/* Mountain area background */}
            <ellipse cx="35" cy="50" rx="30" ry="40" fill="#1e293b" opacity="0.5" />
            <ellipse cx="55" cy="65" rx="25" ry="30" fill="#1e293b" opacity="0.5" />
            
            {/* Peak areas */}
            {Object.entries(mountainLayout.peaks).map(([key, peak]) => (
              <g key={key}>
                <circle 
                  cx={peak.x} 
                  cy={peak.y} 
                  r="8" 
                  fill="#334155" 
                  opacity="0.3"
                />
                <text 
                  x={peak.x} 
                  y={peak.y - 12} 
                  textAnchor="middle" 
                  fill="#94a3b8" 
                  fontSize="2.5"
                  fontWeight="bold"
                >
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
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={difficultyColors[conn.difficulty]}
                  strokeWidth="0.8"
                  opacity="0.4"
                  strokeDasharray="2,1"
                />
              );
            })}

            {/* Lifts */}
            {showLifts && Object.entries(mountainLayout.lifts).map(([key, lift]) => {
              const isClosed = liftStatus[key] === 'closed';
              return (
                <g key={key} opacity={isClosed ? 0.3 : 1}>
                  <line
                    x1={lift.x1}
                    y1={lift.y1}
                    x2={lift.x2}
                    y2={lift.y2}
                    stroke={isClosed ? '#ef4444' : '#06b6d4'}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  {/* Lift stations */}
                  <circle cx={lift.x1} cy={lift.y1} r="1.5" fill="#06b6d4" />
                  <circle cx={lift.x2} cy={lift.y2} r="1.5" fill="#06b6d4" />
                  {/* Lift name */}
                  <text 
                    x={(lift.x1 + lift.x2) / 2} 
                    y={(lift.y1 + lift.y2) / 2 - 2} 
                    textAnchor="middle" 
                    fill="#22d3ee" 
                    fontSize="2"
                  >
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
                <g key={run.id} opacity={isClosed ? 0.2 : 0.6}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="1.2"
                    fill={difficultyColors[run.difficulty] || '#64748b'}
                  />
                </g>
              );
            })}

            {/* Plan Route Overlay */}
            {showPlanRoute && planRoute && planRoute.map((item, i) => {
              if (item.type === 'lift') {
                return (
                  <g key={`plan-${i}`}>
                    {/* Highlighted lift line */}
                    <line
                      x1={item.x1}
                      y1={item.y1}
                      x2={item.x2}
                      y2={item.y2}
                      stroke="#fbbf24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    {/* Animated dash effect */}
                    <line
                      x1={item.x1}
                      y1={item.y1}
                      x2={item.x2}
                      y2={item.y2}
                      stroke="#f59e0b"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeDasharray="3,2"
                      opacity="0.7"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="5"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>
                    {/* Sequence number */}
                    <circle cx={item.x2} cy={item.y2} r="3" fill="#fbbf24" />
                    <text 
                      x={item.x2} 
                      y={item.y2 + 1} 
                      textAnchor="middle" 
                      fill="#000" 
                      fontSize="3"
                      fontWeight="bold"
                    >
                      {item.index + 1}
                    </text>
                  </g>
                );
              } else {
                return (
                  <g key={`plan-${i}`}>
                    {/* Highlighted run */}
                    <circle
                      cx={item.x}
                      cy={item.y}
                      r="3"
                      fill={difficultyColors[item.difficulty] || '#3b82f6'}
                      stroke="#fbbf24"
                      strokeWidth="1"
                      opacity="0.9"
                    />
                    {/* Run label */}
                    <rect
                      x={item.x - 8}
                      y={item.y - 12}
                      width="16"
                      height="4"
                      fill="#1e293b"
                      rx="1"
                      opacity="0.9"
                    />
                    <text 
                      x={item.x} 
                      y={item.y - 9} 
                      textAnchor="middle" 
                      fill="#fbbf24" 
                      fontSize="2.5"
                      fontWeight="bold"
                    >
                      {item.name}
                    </text>
                  </g>
                );
              }
            })}

            {/* Start point marker */}
            {showPlanRoute && planRoute && planRoute[0] && (
              <g>
                <circle
                  cx={planRoute[0].x2 || planRoute[0].x}
                  cy={planRoute[0].y2 || planRoute[0].y}
                  r="4"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="1"
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    values="4;6;4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x={planRoute[0].x2 || planRoute[0].x}
                  y={(planRoute[0].y2 || planRoute[0].y) - 6}
                  textAnchor="middle"
                  fill="#22c55e"
                  fontSize="2.5"
                  fontWeight="bold"
                >
                  START
                </text>
              </g>
            )}

            {/* End point marker */}
            {showPlanRoute && planRoute && planRoute[planRoute.length - 1] && (
              <g>
                <circle
                  cx={planRoute[planRoute.length - 1].x || planRoute[planRoute.length - 2]?.x}
                  cy={planRoute[planRoute.length - 1].y || planRoute[planRoute.length - 2]?.y}
                  r="4"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1"
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    values="4;6;4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <text
                  x={planRoute[planRoute.length - 1].x || planRoute[planRoute.length - 2]?.x}
                  y={(planRoute[planRoute.length - 1].y || planRoute[planRoute.length - 2]?.y) - 6}
                  textAnchor="middle"
                  fill="#ef4444"
                  fontSize="2.5"
                  fontWeight="bold"
                >
                  END
                </text>
              </g>
            )}

            {/* Route path line connecting plan items */}
            {showPlanRoute && planRoute && planRoute.length > 1 && (
              <polyline
                points={planRoute.map(item => {
                  if (item.type === 'lift') {
                    return `${item.x2},${item.y2}`;
                  } else {
                    return `${item.x},${item.y}`;
                  }
                }).join(' ')}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.5"
                strokeDasharray="1,1"
                opacity="0.5"
              />
            )}
          </svg>
        </div>

        {/* Pan hint */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-2 rounded-lg text-xs text-slate-400">
          🖱️ Drag to pan • Scroll to zoom
        </div>
      </div>

      {/* Route Summary */}
      {planRoute && planRoute.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Route Summary</h3>
          <div className="flex flex-wrap gap-2">
            {planRoute.filter(item => item.type === 'run').map((item, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg"
              >
                <span className="text-sm font-bold text-slate-400">{i + 1}.</span>
                <span className="text-sm font-medium">{item.name}</span>
                <span 
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ 
                    backgroundColor: difficultyColors[item.difficulty],
                    color: item.difficulty === 'green' || item.difficulty === 'blue' ? 'white' : '#e2e8f0'
                  }}
                >
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
