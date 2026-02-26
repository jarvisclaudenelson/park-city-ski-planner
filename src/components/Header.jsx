export default function Header({ activeTab, setActiveTab, routeReady }) {
  const tabs = [
    { id: 'plan',   label: 'Plan My Day' },
    { id: 'status', label: 'Trail Status' },
    { id: 'route',  label: 'My Route',    badge: routeReady },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-700 shrink-0">
      <div className="flex items-center gap-6 px-4 py-3">
        {/* Logo / title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-2xl">⛷️</span>
          <div>
            <div className="text-white font-bold text-base leading-tight">Park City Mountain</div>
            <div className="text-slate-400 text-xs">Day Planner</div>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              {tab.label}
              {tab.badge && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400" />
              )}
            </button>
          ))}
        </nav>

        {/* Info chip */}
        <div className="ml-auto text-xs text-slate-500 hidden sm:block">
          349 trails · 44 lifts · 7,300 acres
        </div>
      </div>
    </header>
  );
}
