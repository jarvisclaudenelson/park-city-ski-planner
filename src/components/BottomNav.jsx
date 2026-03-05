const TABS = [
  { id: 'plan',   label: 'Plan',   icon: '⛷️' },
  { id: 'status', label: 'Status', icon: '🚦' },
  { id: 'route',  label: 'Route',  icon: '🗺️' },
  { id: 'map',    label: 'Map',    icon: '📍' },
];

export default function BottomNav({ activeTab, setActiveTab, routeReady }) {
  return (
    <nav className="bottom-nav md:hidden">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
        >
          <span className="text-lg leading-none">{tab.icon}</span>
          <span className="text-[10px] leading-tight mt-0.5">{tab.label}</span>
          {tab.id === 'route' && routeReady && (
            <span className="absolute top-1 right-1/4 w-2 h-2 rounded-full bg-green-400" />
          )}
        </button>
      ))}
    </nav>
  );
}
