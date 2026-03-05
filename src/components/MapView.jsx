import { useRef, useState, useEffect, useCallback } from 'react';
import { MAP_W, MAP_H, AREA_COORDS, DIFF_COLOR, LIFT_COLOR, areaCoord } from '../data/coordinates.js';

const VIEWBOX = `0 0 ${MAP_W} ${MAP_H}`;

const MARKERS = [
  { id: 'arr-lift',  color: LIFT_COLOR   },
  { id: 'arr-easy',  color: DIFF_COLOR.easy   },
  { id: 'arr-blue',  color: DIFF_COLOR.more_difficult   },
  { id: 'arr-black', color: DIFF_COLOR.most_difficult   },
  { id: 'arr-db',    color: DIFF_COLOR.experts_only     },
  { id: 'arr-park',  color: DIFF_COLOR.terrain_park     },
];

function markerForSeg(seg) {
  if (seg.type === 'lift')   return 'url(#arr-lift)';
  if (!seg.difficulty)       return null;
  const map = { easy:'arr-easy', more_difficult:'arr-blue', most_difficult:'arr-black', experts_only:'arr-db', terrain_park:'arr-park' };
  return `url(#${map[seg.difficulty] || 'arr-black'})`;
}

function segColor(seg) {
  if (seg.type === 'lift') return LIFT_COLOR;
  return DIFF_COLOR[seg.difficulty] || '#94a3b8';
}

function Marker({ x, y, color, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r={36} fill={color} opacity="0.25" />
      <circle cx={x} cy={y} r={20} fill={color} />
      <text x={x} y={y + 55} textAnchor="middle" fill="white" fontSize="36" fontWeight="bold"
        style={{ paintOrder: 'stroke', stroke: '#0f172a', strokeWidth: 8 }}>
        {label}
      </text>
    </g>
  );
}

function Legend() {
  const items = [
    { color: LIFT_COLOR,                    label: 'Lift' },
    { color: DIFF_COLOR.easy,               label: 'Easy' },
    { color: DIFF_COLOR.more_difficult,     label: 'Blue' },
    { color: DIFF_COLOR.most_difficult,     label: 'Black' },
    { color: DIFF_COLOR.experts_only,       label: 'Dbl Black' },
  ];
  return (
    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 flex flex-col gap-1.5">
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="w-6 h-1.5 rounded-full" style={{ background: item.color }} />
          <span className="text-xs text-white">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Calculate distance between two touch points */
function touchDist(t1, t2) {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

export default function MapView({ result, trailData }) {
  const containerRef = useRef(null);
  const [activeIdx,   setActiveIdx]   = useState(null);
  const [zoom,        setZoom]        = useState(1);
  const [pan,         setPan]         = useState({ x: 0, y: 0 });
  const [dragging,    setDragging]    = useState(false);
  const [dragStart,   setDragStart]   = useState(null);

  // Touch gesture state
  const touchRef = useRef({ lastDist: 0, lastCenter: null, startPan: null });

  useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); setActiveIdx(null); }, [result]);

  const segments = result?.segments?.filter(s => s.type === 'lift' || s.type === 'trail') || [];

  /* ── Mouse handlers (desktop) ──────────────────────────────────────── */
  function onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.85 : 1.15;
    setZoom(z => Math.min(6, Math.max(1, z * delta)));
  }
  function onMouseDown(e) {
    if (e.touches) return; // handled by touch
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }
  function onMouseMove(e) {
    if (!dragging || !dragStart || e.touches) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }
  function onMouseUp() { setDragging(false); setDragStart(null); }

  /* ── Touch handlers (mobile) ───────────────────────────────────────── */
  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      // Pinch start
      const d = touchDist(e.touches[0], e.touches[1]);
      touchRef.current.lastDist = d;
      touchRef.current.startPan = { ...pan };
      touchRef.current.lastCenter = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    } else if (e.touches.length === 1) {
      // Single finger drag
      setDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  }, [pan]);

  const onTouchMove = useCallback((e) => {
    e.preventDefault(); // prevent page scroll
    if (e.touches.length === 2) {
      const d = touchDist(e.touches[0], e.touches[1]);
      const scale = d / (touchRef.current.lastDist || d);
      setZoom(z => Math.min(6, Math.max(1, z * scale)));
      touchRef.current.lastDist = d;

      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      if (touchRef.current.lastCenter) {
        setPan(p => ({
          x: p.x + (cx - touchRef.current.lastCenter.x),
          y: p.y + (cy - touchRef.current.lastCenter.y),
        }));
      }
      touchRef.current.lastCenter = { x: cx, y: cy };
    } else if (e.touches.length === 1 && dragging && dragStart) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  }, [dragging, dragStart]);

  const onTouchEnd = useCallback(() => {
    setDragging(false);
    setDragStart(null);
    touchRef.current.lastDist = 0;
    touchRef.current.lastCenter = null;
  }, []);

  /* ── Build SVG path data from segments ──────────────────────────────── */
  const routeLines = segments.map((seg, i) => {
    const from = areaCoord(seg.from);
    const to   = areaCoord(seg.to);
    return { seg, from, to, i };
  });

  const startCoord = segments.length ? areaCoord(segments[0].from)  : null;
  const endCoord   = segments.length ? areaCoord(segments[segments.length - 1].to) : null;

  const activeSeg = activeIdx !== null ? segments[activeIdx] : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-slate-900 select-none touch-none"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform:       `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition:      dragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        <img
          src="/trail-map.jpg"
          alt="Park City Mountain Trail Map"
          className="block max-w-none"
          style={{ width: '100%', height: 'auto' }}
          draggable={false}
        />

        <svg
          viewBox={VIEWBOX}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {MARKERS.map(m => (
              <marker key={m.id} id={m.id} viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={m.color} />
              </marker>
            ))}
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {routeLines.map(({ seg, from, to, i }) => {
            const color   = segColor(seg);
            const isLift  = seg.type === 'lift';
            const isActive = activeIdx === i;
            return (
              <line
                key={`${seg.type}-${seg.id}-${i}`}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={color}
                strokeWidth={isActive ? 18 : 10}
                strokeDasharray={isLift ? '30 18' : undefined}
                strokeLinecap="round"
                opacity={isActive ? 1 : 0.85}
                filter={isActive ? 'url(#glow)' : undefined}
                markerEnd={markerForSeg(seg)}
                style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              />
            );
          })}

          {routeLines.map(({ seg, from, to, i }) => (
            <g key={`dot-${i}`}>
              <circle cx={from.x} cy={from.y} r={12} fill="white" opacity="0.8" />
              <circle cx={to.x}   cy={to.y}   r={12} fill="white" opacity="0.8" />
            </g>
          ))}

          {startCoord && <Marker x={startCoord.x} y={startCoord.y} color="#22c55e" label="S" />}
          {endCoord   && endCoord !== startCoord && <Marker x={endCoord.x} y={endCoord.y} color="#ef4444" label="E" />}

          {activeSeg && (() => {
            const mp = routeLines[activeIdx];
            const cx = (mp.from.x + mp.to.x) / 2;
            const cy = (mp.from.y + mp.to.y) / 2;
            const label = activeSeg.type === 'lift'
              ? `⬆ ${activeSeg.name}`
              : `⬇ ${activeSeg.name}`;
            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect x={cx - 200} y={cy - 60} width={400} height={70} rx={14}
                  fill="#0f172a" opacity="0.9" />
                <text x={cx} y={cy - 22} textAnchor="middle" fill="white" fontSize="30" fontWeight="bold">
                  {label}
                </text>
                {activeSeg.difficulty && (
                  <text x={cx} y={cy + 18} textAnchor="middle" fill={segColor(activeSeg)} fontSize="24">
                    {activeSeg.difficulty.replace(/_/g, ' ')}
                  </text>
                )}
              </g>
            );
          })()}
        </svg>
      </div>

      <Legend />

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1">
        {[['＋', 1.3], ['－', 0.77], ['↺', 'reset']].map(([lbl, val]) => (
          <button key={lbl}
            onClick={() => {
              if (val === 'reset') { setZoom(1); setPan({ x: 0, y: 0 }); }
              else setZoom(z => Math.min(6, Math.max(1, z * val)));
            }}
            className="w-10 h-10 md:w-8 md:h-8 bg-black/70 active:bg-black/90 hover:bg-black/90 text-white rounded-lg md:rounded text-sm font-bold
              flex items-center justify-center backdrop-blur-sm transition-colors"
          >{lbl}</button>
        ))}
      </div>

      {!segments.length && (
        <div className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg">
            Calculate a route to see it highlighted on the map
          </div>
        </div>
      )}
    </div>
  );
}
