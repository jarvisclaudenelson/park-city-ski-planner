import { useRef, useState, useCallback } from 'react';

export default function MapView() {
  const containerRef = useRef(null);
  const [zoom, setZoom]     = useState(1);
  const [pan, setPan]       = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  // Use refs for values needed in handlers to avoid stale closures
  const panRef  = useRef(pan);
  const zoomRef = useRef(zoom);
  const dragRef = useRef(null);         // { x, y } of pointer at drag start
  const panAtDragStart = useRef(null);   // pan snapshot at drag start
  const touchRef = useRef({ lastDist: 0, lastCenter: null });

  panRef.current  = pan;
  zoomRef.current = zoom;

  function clampZoom(z) { return Math.min(6, Math.max(1, z)); }

  /**
   * Zoom toward a point in screen space.
   * Adjusts pan so the point under the cursor stays fixed.
   */
  function zoomAtPoint(factor, clientX, clientY) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const oldZoom = zoomRef.current;
    const newZoom = clampZoom(oldZoom * factor);
    if (newZoom === oldZoom) return;

    const p = panRef.current;

    // Point in container-local coords
    const cx = clientX - rect.left - rect.width  / 2;
    const cy = clientY - rect.top  - rect.height / 2;

    // Keep the world point under the cursor fixed:
    // (cx - pan) / zoom  must stay constant before and after
    const newPanX = cx - (cx - p.x) * (newZoom / oldZoom);
    const newPanY = cy - (cy - p.y) * (newZoom / oldZoom);

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  }

  /* ── Mouse handlers (desktop) ──────────────────────────────────────── */
  function onWheel(e) {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.85 : 1.15;
    zoomAtPoint(factor, e.clientX, e.clientY);
  }

  function onMouseDown(e) {
    if (e.button !== 0) return;           // left-click only
    setDragging(true);
    dragRef.current = { x: e.clientX, y: e.clientY };
    panAtDragStart.current = { ...panRef.current };
  }

  function onMouseMove(e) {
    if (!dragRef.current || !panAtDragStart.current) return;
    setPan({
      x: panAtDragStart.current.x + (e.clientX - dragRef.current.x),
      y: panAtDragStart.current.y + (e.clientY - dragRef.current.y),
    });
  }

  function onMouseUp() {
    setDragging(false);
    dragRef.current = null;
    panAtDragStart.current = null;
  }

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
      dragRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panAtDragStart.current = { ...panRef.current };
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const d = touchDist(e.touches[0], e.touches[1]);
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;

      // Pinch-zoom toward center of the two fingers
      const ratio = d / (touchRef.current.lastDist || d);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const oldZoom = zoomRef.current;
        const newZoom = clampZoom(oldZoom * ratio);

        const lx = cx - rect.left - rect.width  / 2;
        const ly = cy - rect.top  - rect.height / 2;

        const p = panRef.current;
        let newPanX = lx - (lx - p.x) * (newZoom / oldZoom);
        let newPanY = ly - (ly - p.y) * (newZoom / oldZoom);

        // Also apply finger-drag offset
        if (touchRef.current.lastCenter) {
          newPanX += cx - touchRef.current.lastCenter.x;
          newPanY += cy - touchRef.current.lastCenter.y;
        }

        setZoom(newZoom);
        setPan({ x: newPanX, y: newPanY });
      }

      touchRef.current.lastDist = d;
      touchRef.current.lastCenter = { x: cx, y: cy };
    } else if (e.touches.length === 1 && dragRef.current && panAtDragStart.current) {
      setPan({
        x: panAtDragStart.current.x + (e.touches[0].clientX - dragRef.current.x),
        y: panAtDragStart.current.y + (e.touches[0].clientY - dragRef.current.y),
      });
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    setDragging(false);
    dragRef.current = null;
    panAtDragStart.current = null;
    touchRef.current.lastDist = 0;
    touchRef.current.lastCenter = null;
  }, []);

  /* ── Transform: scale first, then translate (pan is in screen px) ── */
  const transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;

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
          transform,
          transformOrigin: 'center center',
          transition:      dragging ? 'none' : 'transform 0.1s ease-out',
          willChange:      'transform',
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
              else {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                  zoomAtPoint(val, rect.left + rect.width / 2, rect.top + rect.height / 2);
                }
              }
            }}
            className="w-10 h-10 md:w-8 md:h-8 bg-black/70 active:bg-black/90 hover:bg-black/90 text-white rounded-lg md:rounded text-sm font-bold
              flex items-center justify-center backdrop-blur-sm transition-colors"
          >{lbl}</button>
        ))}
      </div>
    </div>
  );
}
