import { useState, useCallback } from 'react';
import trailMapData from './data/trail-map.json';
import Header      from './components/Header.jsx';
import PlannerForm from './components/PlannerForm.jsx';
import StatusPanel from './components/StatusPanel.jsx';
import RouteResult from './components/RouteResult.jsx';
import MapView     from './components/MapView.jsx';
import { planRoute } from './utils/routeCalc.js';

export default function App() {
  // ── Persistent state ────────────────────────────────────────────────────
  const [closedLifts,   setClosedLifts]   = useState(new Set());
  const [closedTrails,  setClosedTrails]  = useState(new Set());
  const [result,        setResult]        = useState(null);
  const [routeConfig,   setRouteConfig]   = useState(null);
  const [bannedSegs,    setBannedSegs]    = useState(new Set());
  const [calculating,   setCalculating]   = useState(false);
  const [activeTab,     setActiveTab]     = useState('plan');  // 'plan' | 'status' | 'route'

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

    // Small timeout to let the "calculating…" state render
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

  // ── Remove a segment and recalculate ────────────────────────────────────
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

  // ── Sidebar content by tab ───────────────────────────────────────────────
  const sidebarContent = () => {
    switch (activeTab) {
      case 'plan':
        return (
          <PlannerForm
            onCalculate={calculate}
            calculating={calculating}
          />
        );
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

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      <Header
        activeTab={activeTab === 'map' ? 'route' : activeTab}
        setActiveTab={tab => setActiveTab(tab)}
        routeReady={!!result && !result.error}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — hidden on map-fullscreen view on small screens */}
        <aside
          className={`
            shrink-0 border-r border-slate-700 bg-slate-800 flex flex-col overflow-hidden
            transition-all duration-200
            ${activeTab === 'map'
              ? 'w-0 opacity-0 pointer-events-none'
              : 'w-full sm:w-80 md:w-96'}
          `}
        >
          {/* Tab-specific content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {sidebarContent()}
          </div>
        </aside>

        {/* Map — always rendered, takes remaining space */}
        <main className="flex-1 overflow-hidden relative">
          <MapView result={result} trailData={trailMapData} />

          {/* "Back to plan" button when map is fullscreen */}
          {activeTab === 'map' && (
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
    </div>
  );
}
