import { useState, useMemo } from 'react';

const DIFF_COLORS = {
  easy:           'bg-green-700 text-green-100',
  more_difficult: 'bg-blue-700 text-blue-100',
  most_difficult: 'bg-gray-700 text-gray-100',
  experts_only:   'bg-red-800 text-red-100',
  terrain_park:   'bg-purple-700 text-purple-100',
};
const DIFF_LABEL = {
  easy: '●', more_difficult: '■', most_difficult: '◆', experts_only: '◆◆', terrain_park: 'P',
};

export default function StatusPanel({ trailData, closedLifts, closedTrails, onToggleLift, onToggleTrail, onReset }) {
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [view, setView] = useState('lifts'); // 'lifts' | 'trails'

  // Group trails by area
  const trailGroups = useMemo(() => {
    if (!trailData) return {};
    const groups = {};
    trailData.trails.forEach(t => {
      if (!groups[t.area]) groups[t.area] = [];
      groups[t.area].push(t);
    });
    return groups;
  }, [trailData]);

  const closedLiftCount  = closedLifts.size;
  const closedTrailCount = closedTrails.size;

  if (!trailData) return <div className="p-4 text-slate-400 text-sm">Loading…</div>;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white">Trail & Lift Status</h2>
          <button
            onClick={onReset}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            Reset All Open
          </button>
        </div>
        {/* Status summary */}
        <div className="flex gap-2 text-xs text-slate-400">
          <span className="bg-slate-700 px-2 py-1 rounded">
            {closedLiftCount > 0 ? `⚠ ${closedLiftCount} lift${closedLiftCount > 1 ? 's' : ''} closed` : '✓ All lifts open'}
          </span>
          <span className="bg-slate-700 px-2 py-1 rounded">
            {closedTrailCount > 0 ? `⚠ ${closedTrailCount} trail${closedTrailCount > 1 ? 's' : ''} closed` : '✓ All trails open'}
          </span>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 mt-3">
          {['lifts', 'trails'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 py-1.5 text-xs font-medium rounded capitalize transition-colors
                ${view === v ? 'bg-sky-700 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Lifts view */}
        {view === 'lifts' && (
          <ul className="divide-y divide-slate-700/50">
            {trailData.lifts.map(lift => {
              const closed = closedLifts.has(lift.id);
              return (
                <li key={lift.id}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-700/30 transition-colors">
                  <button
                    onClick={() => onToggleLift(lift.id)}
                    className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors
                      ${closed ? 'bg-red-600 border-red-500' : 'border-green-500 bg-green-900/30'}`}
                  >
                    {closed
                      ? <span className="text-white text-xs font-bold">✕</span>
                      : <span className="text-green-400 text-xs">✓</span>
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm truncate ${closed ? 'line-through text-slate-500' : 'text-white'}`}>
                      {lift.name}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">{lift.type}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Trails view — grouped by area */}
        {view === 'trails' && (
          <div className="divide-y divide-slate-700/50">
            {Object.entries(trailGroups).map(([groupName, trails]) => {
              const expanded = expandedGroup === groupName;
              const closedInGroup = trails.filter(t => closedTrails.has(t.id)).length;
              return (
                <div key={groupName}>
                  {/* Group header */}
                  <button
                    onClick={() => setExpandedGroup(expanded ? null : groupName)}
                    className="w-full flex items-center justify-between px-4 py-2.5
                      hover:bg-slate-700/30 text-left transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-white">{groupName}</div>
                      <div className="text-xs text-slate-500">
                        {trails.length} trails
                        {closedInGroup > 0 && <span className="ml-1 text-red-400">· {closedInGroup} closed</span>}
                      </div>
                    </div>
                    <span className={`text-slate-400 text-xs transition-transform ${expanded ? 'rotate-90' : ''}`}>▶</span>
                  </button>

                  {/* Trails in group */}
                  {expanded && (
                    <ul className="pb-1">
                      {trails.map(trail => {
                        const closed = closedTrails.has(trail.id);
                        return (
                          <li key={trail.id}
                            className="flex items-center gap-2.5 pl-6 pr-4 py-2 hover:bg-slate-700/20">
                            <button
                              onClick={() => onToggleTrail(trail.id)}
                              className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors
                                ${closed ? 'bg-red-600 border-red-500' : 'border-slate-500 bg-slate-700'}`}
                            >
                              {closed && <span className="text-white text-xs leading-none">✕</span>}
                            </button>
                            <div className="flex-1 min-w-0 flex items-center gap-1.5">
                              <span className={`text-xs px-1.5 py-0.5 rounded font-bold shrink-0
                                ${DIFF_COLORS[trail.difficulty]}`}>
                                {DIFF_LABEL[trail.difficulty]}
                              </span>
                              <span className={`text-sm truncate ${closed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                {trail.name}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
