function formatTime(parkOpen, offsetMinutes) {
  const [oh, om] = (parkOpen || '09:00').split(':').map(Number);
  const total = oh * 60 + om + offsetMinutes;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

const DIFF_STYLE = {
  easy:           { bg: 'bg-green-700',  text: 'text-green-100',  label: '● Easy'          },
  more_difficult: { bg: 'bg-blue-700',   text: 'text-blue-100',   label: '■ Blue'          },
  most_difficult: { bg: 'bg-gray-700',   text: 'text-gray-100',   label: '◆ Black'         },
  experts_only:   { bg: 'bg-red-800',    text: 'text-red-100',    label: '◆◆ Dbl Black'   },
  terrain_park:   { bg: 'bg-purple-700', text: 'text-purple-100', label: 'P Park'          },
};

function DiffBadge({ difficulty }) {
  const s = DIFF_STYLE[difficulty];
  if (!s) return null;
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-semibold shrink-0 ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

function SegmentRow({ seg, onRemove, trailData, parkOpen }) {
  const timeLabel = seg.minutesFromOpen != null ? formatTime(parkOpen, seg.minutesFromOpen) : null;

  if (seg.type === 'lift') {
    const lift = trailData?.lifts.find(l => l.id === seg.id);
    const baseArea   = trailData?.areas.find(a => a.id === seg.from)?.name || seg.from;
    const summitArea = trailData?.areas.find(a => a.id === seg.to)?.name   || seg.to;
    return (
      <li className="flex items-start gap-3 py-3 px-4 border-b border-slate-700/50 hover:bg-slate-700/20">
        <div className="shrink-0 text-center w-14">
          <span className="text-amber-400 text-lg block">⬆</span>
          {timeLabel && <span className="text-xs text-slate-500">{timeLabel}</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white">{seg.name}</div>
          <div className="text-xs text-slate-400 mt-0.5 capitalize">
            {lift?.type} · {baseArea} → {summitArea} · ~8 min
          </div>
        </div>
        <button
          onClick={() => onRemove(seg.id)}
          title="Remove and recalculate"
          className="text-slate-600 hover:text-red-400 text-sm mt-0.5 transition-colors shrink-0"
        >✕</button>
      </li>
    );
  }

  if (seg.type === 'trail') {
    const runMin = seg.difficulty === 'easy' ? 5 : seg.difficulty === 'experts_only' ? 12 : 7;
    return (
      <li className="flex items-start gap-3 py-3 px-4 border-b border-slate-700/50 hover:bg-slate-700/20">
        <div className="shrink-0 text-center w-14">
          <span className="text-sky-400 text-lg block">⬇</span>
          {timeLabel && <span className="text-xs text-slate-500">{timeLabel}</span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-white">{seg.name}</span>
            <DiffBadge difficulty={seg.difficulty} />
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {seg.area} · ~{runMin} min
          </div>
        </div>
        <button
          onClick={() => onRemove(seg.id)}
          title="Remove and recalculate"
          className="text-slate-600 hover:text-red-400 text-sm mt-0.5 transition-colors shrink-0"
        >✕</button>
      </li>
    );
  }

  if (seg.type === 'lunch') {
    return (
      <li className="flex items-center gap-3 py-3 px-4 border-b border-slate-700/50 bg-amber-900/20">
        <div className="shrink-0 text-center w-14">
          <span className="text-xl block">🍽️</span>
          {timeLabel && <span className="text-xs text-slate-500">{timeLabel}</span>}
        </div>
        <div>
          <div className="text-sm font-medium text-amber-200">{seg.label}</div>
          <div className="text-xs text-slate-400">~45 min break</div>
        </div>
      </li>
    );
  }

  return null;
}

export default function RouteResult({ result, trailData, onRemoveSegment, onRecalculate, onViewMap }) {
  const parkOpen = result?.parkOpen || '09:00';

  if (!result) return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="text-4xl mb-4">🗺️</div>
      <p className="text-slate-400 text-sm">
        Fill in the Plan form and hit <strong className="text-slate-300">Calculate My Route</strong> to generate your day plan.
      </p>
    </div>
  );

  if (result.error) return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
      <div className="text-4xl">⚠️</div>
      <p className="text-red-300 text-sm">{result.error}</p>
      <button onClick={onRecalculate}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors">
        ← Back to Planner
      </button>
    </div>
  );

  const { segments, runs, lifts, totalMinutes } = result;
  const hours   = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const endTime = formatTime(parkOpen, totalMinutes);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Summary bar */}
      <div className="px-4 py-3 border-b border-slate-700 bg-slate-800 shrink-0">
        <h2 className="text-sm font-semibold text-white mb-2">Your Day Plan</h2>
        <div className="flex gap-2 text-xs flex-wrap">
          <div className="bg-slate-700 rounded px-2 py-1 text-slate-200">
            <span className="text-sky-400 font-bold">{runs}</span> runs
          </div>
          <div className="bg-slate-700 rounded px-2 py-1 text-slate-200">
            <span className="text-amber-400 font-bold">{lifts}</span> lifts
          </div>
          <div className="bg-slate-700 rounded px-2 py-1 text-slate-200">
            ⏱ ~{hours > 0 ? `${hours}h ` : ''}{minutes}m
          </div>
          <div className="bg-slate-700 rounded px-2 py-1 text-slate-200">
            Done ~{endTime}
          </div>
        </div>
      </div>

      {/* Segments list */}
      <ul className="flex-1 overflow-y-auto">
        {segments.map((seg, i) => (
          <SegmentRow
            key={`${seg.type}-${seg.id || i}`}
            seg={seg}
            trailData={trailData}
            parkOpen={parkOpen}
            onRemove={onRemoveSegment}
          />
        ))}
      </ul>

      {/* Action buttons */}
      <div className="shrink-0 border-t border-slate-700 p-3 flex gap-2">
        <button
          onClick={onViewMap}
          className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          🗺️ View on Map
        </button>
        <button
          onClick={onRecalculate}
          className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          ↺ New Plan
        </button>
      </div>
    </div>
  );
}
