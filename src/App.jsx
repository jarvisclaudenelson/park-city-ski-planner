import { useState, useCallback } from 'react';
import trailMapData from './data/trail-map.json';
import Header      from './components/Header.jsx';
import PlannerForm from './components/PlannerForm.jsx';
import StatusPanel from './components/StatusPanel.jsx';
import RouteResult from './components/RouteResult.jsx';
import MapView     from './components/MapView.jsx';
import BottomNav   from './components/BottomNav.jsx';
import { planRoute } from './utils/routeCalc.js';

export default function App() {
  const [closedLifts,   setClosedLifts]   = useState(new Set());
  const [closedTrails,  setClosedTrails]  = useState(new Set());
  const [result,        setResult]        = useState(null);
  const [routeConfig,   setRouteConfig]   = useState(null);
  const [bannedSegs,    setBannedSegs]    = useState(new Set());
  const [calculating,   setCalculating]   = useState(false);
  const [activeTab,     setActiveTab]     = useState('plan');

  // ── Lift / trail status toggles ─────────────────────────────────────────
  const toggleLift = useCallback(id => {
    setClosedLifts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleTrail = useCallback(id => {
    setClosedTrails(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const resetStatus = useCallback(() => {
    setClosedLifts(new Set());
    setClosedTrails(new Set());
  }, []);

  // ── Route calculation ───────────────────────────────────────────────────
  const calculate = useCallback((formConfig) => {
    setCalculating(true);
    setBannedSegs(new Set());
    setRouteConfig(formConfig);

    setTimeout(() => {
      const res = planRoute(trailMapData, {
        ...formConfig,
        closedLifts:  [...closedLifts],
        closedTrails: [...closedTrails],
        bannedSegments: new Set(),
      });
      setResult(res);
      setActiveTab('route');
      setCalculating(false);
    }, 80);
  }, [closedLifts, closedTrails]);

  const removeSegment = useCallback((segId) => {
    const newBanned = new Set(bannedSegs);
    newBanned.add(segId);
    setBannedSegs(newBanned);

    const res = planRoute(trailMapData, {
      ...routeConfig,
      closedLifts:  [...closedLifts],
      closedTrails: [...closedTrails],
      bannedSegments: newBanned,
    });
    setResult(res);
  }, [bannedSegs, routeConfig, closedLifts, closedTrails]);

  const recalculate = useCallback(() => {
    setBannedSegs(new Set());
    setResult(null);
    setActiveTab('plan');
  }, []);

  const goToMap = useCallback(() => {
    setActiveTab('map');
  }, []);

  // ── Tab panel content ──────────────────────────────────────────────────
  const panelContent = () => {
    switch (activeTab) {
      case 'plan':
        return <PlannerForm onCalculate={calculate} calculating={calculating} />;
      case 'status':
        return (
          <StatusPanel
            trailData={trailMapData}
            closedLifts={closedLifts}
            closedTrails={closedTrails}
            onToggleLift={toggleLift}
            onToggleTrail={toggleTrail}
            onReset={resetStatus}
          />
        );
      case 'route':
        return (
          <RouteResult
            result={result}
            trailData={trailMapData}
            onRemoveSegment={removeSegment}
            onRecalculate={recalculate}
            onViewMap={goToMap}
          />
        );
      default:
        return null;
    }
  };

  const showMap = activeTab === 'map';

  return (
    <div className="app-shell">
      {/* Desktop header — hidden on mobile */}
      <Header
        activeTab={showMap ? 'route' : activeTab}
        setActiveTab={setActiveTab}
        routeReady={!!result && !result.error}
      />

      {/* ── Mobile: full-screen panels ──────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col md:hidden">
        {showMap ? (
          <div className="flex-1 relative">
            <MapView result={result} trailData={trailMapData} />
            <button
              onClick={() => setActiveTab('route')}
              className="absolute top-3 left-3 z-10 bg-black/70 active:bg-black/90 text-white
                text-sm px-3 py-2 rounded-lg backdrop-blur-sm"
            >
              ← Route
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            {panelContent()}
          </div>
        )}
      </div>

      {/* ── Desktop: sidebar + map ──────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden hidden md:flex">
        <aside
          className={`
            shrink-0 border-r border-slate-700 bg-slate-800 flex flex-col overflow-hidden
            transition-all duration-200
            ${showMap ? 'w-0 opacity-0 pointer-events-none' : 'w-96'}
          `}
        >
          <div className="flex-1 overflow-hidden flex flex-col">
            {panelContent()}
          </div>
        </aside>

        <main className="flex-1 overflow-hidden relative">
          <MapView result={result} trailData={trailMapData} />
          {showMap && (
            <button
              onClick={() => setActiveTab('route')}
              className="absolute top-3 left-3 z-10 bg-black/70 hover:bg-black/90 text-white
                text-sm px-3 py-2 rounded-lg backdrop-blur-sm transition-colors"
            >
              ← Route
            </button>
          )}
        </main>
      </div>

      {/* Bottom tab bar — mobile only */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        routeReady={!!result && !result.error}
      />
    </div>
  );
}
