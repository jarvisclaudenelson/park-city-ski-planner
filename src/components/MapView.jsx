import { useRef, useState, useEffect, useCallback } from 'react';

export default function MapView() {
  const containerRef = useRef(null);
  const [zoom,      setZoom]      = useState(1);
  const [pan,       setPan]       = useState({ x: 0, y: 0 });
  const [dragging,  setDragging]  = useState(false);
  const [dragStart, setDragStart] = useState(null);

  const touchRef = useRef({ lastDist: 0, lastCenter: null });

  function clampZoom(z) { return Math.min(6, Math.max(1, z)); }

  /* ── Mouse handlers (desktop) ──────────────────────────────────────── */
  function onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.85 : 1.15;
    setZoom(z => clampZoom(z * delta));
  }
  function onMouseDown(e) {
    if (e.touches) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }
  function onMouseMove(e) {
    if (!dragging || !dragStart || e.touches) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }
  function onMouseUp() { setDragging(false); setDragStart(null); }

  /* ── Touch handlers (mobile) ───────────────────────────────────────── */
  function touchDist(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  }

  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      const d = touchDist(e.touches[0], e.touches[1]);
      touchRef.current.lastDist = d;
      touchRef.current.lastCenter = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    } else if (e.touches.length === 1) {
      setDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  }, [pan]);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const d = touchDist(e.touches[0], e.touches[1]);
      const scale = d / (touchRef.current.lastDist || d);
      setZoom(z => clampZoom(z * scale));
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
      </div>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1">
        {[['＋', 1.3], ['－', 0.77], ['↺', 'reset']].map(([lbl, val]) => (
          <button key={lbl}
            onClick={() => {
              if (val === 'reset') { setZoom(1); setPan({ x: 0, y: 0 }); }
              else setZoom(z => clampZoom(z * val));
            }}
            className="w-10 h-10 md:w-8 md:h-8 bg-black/70 active:bg-black/90 hover:bg-black/90 text-white rounded-lg md:rounded text-sm font-bold
              flex items-center justify-center backdrop-blur-sm transition-colors"
          >{lbl}</button>
        ))}
      </div>
    </div>
  );
}
