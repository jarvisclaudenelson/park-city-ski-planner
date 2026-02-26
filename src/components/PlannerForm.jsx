import { useState } from 'react';
import { CHALETS, START_LOCATIONS, END_LOCATIONS, SKILL_LEVELS } from '../utils/routeCalc.js';

const SKILL_OPTIONS = [
  { id: 'beginner',     label: 'Beginner',     sub: 'Green runs only',          icon: '🟢' },
  { id: 'intermediate', label: 'Intermediate', sub: 'Green & blue runs',         icon: '🔵' },
  { id: 'advanced',     label: 'Advanced',     sub: 'Up to black diamond',       icon: '⬛' },
  { id: 'expert',       label: 'Expert',       sub: 'All terrain incl. double ◆', icon: '💀' },
];

const OPT_OPTIONS = [
  { id: 'terrain',  label: 'Stick to My Terrain',    sub: 'Focus on runs matching your level' },
  { id: 'coverage', label: 'Explore the Mountain',   sub: 'Venture into new areas & zones'    },
];

export default function PlannerForm({ onCalculate, calculating }) {
  const [startArea,   setStartArea]   = useState('park_city_base');
  const [endArea,     setEndArea]     = useState('park_city_base');
  const [skillLevel,  setSkillLevel]  = useState('intermediate');
  const [optimizeFor, setOptimizeFor] = useState('terrain');
  const [lunchStop,   setLunchStop]   = useState(false);
  const [lunchChalet, setLunchChalet] = useState(CHALETS[0]);
  const [parkOpen,    setParkOpen]    = useState('09:00');
  const [parkClose,   setParkClose]   = useState('16:00');

  function handleSubmit(e) {
    e.preventDefault();
    onCalculate({ startArea, endArea, skillLevel, optimizeFor, lunchStop, lunchChalet: lunchStop ? lunchChalet : null, parkOpen, parkClose });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4 overflow-y-auto h-full">

      {/* Start / End */}
      <section>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Locations</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Starting At</label>
            <select
              value={startArea}
              onChange={e => setStartArea(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            >
              {START_LOCATIONS.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Ending At</label>
            <select
              value={endArea}
              onChange={e => setEndArea(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            >
              {END_LOCATIONS.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Skill level */}
      <section>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Skill Level</h3>
        <div className="grid grid-cols-2 gap-2">
          {SKILL_OPTIONS.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSkillLevel(opt.id)}
              className={`flex flex-col items-start text-left p-3 rounded-lg border transition-colors
                ${skillLevel === opt.id
                  ? 'border-sky-500 bg-sky-900/40 text-white'
                  : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}
            >
              <span className="text-lg mb-0.5">{opt.icon}</span>
              <span className="text-sm font-medium">{opt.label}</span>
              <span className="text-xs text-slate-400 mt-0.5">{opt.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Optimization */}
      <section>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Route Style</h3>
        <div className="flex flex-col gap-2">
          {OPT_OPTIONS.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setOptimizeFor(opt.id)}
              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-colors
                ${optimizeFor === opt.id
                  ? 'border-sky-500 bg-sky-900/40 text-white'
                  : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'}`}
            >
              <span className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center
                ${optimizeFor === opt.id ? 'border-sky-400' : 'border-slate-500'}`}>
                {optimizeFor === opt.id && <span className="w-2 h-2 rounded-full bg-sky-400 block" />}
              </span>
              <div>
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs text-slate-400">{opt.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lunch stop */}
      <section>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lunch</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() => setLunchStop(!lunchStop)}
            className={`relative w-10 h-5 rounded-full transition-colors
              ${lunchStop ? 'bg-sky-600' : 'bg-slate-600'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform
              ${lunchStop ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
          <span className="text-sm text-slate-300">Stop for lunch</span>
        </label>

        {lunchStop && (
          <div className="mt-3">
            <label className="block text-xs text-slate-400 mb-1">Lunch Chalet</label>
            <select
              value={lunchChalet.id}
              onChange={e => setLunchChalet(CHALETS.find(c => c.id === e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            >
              {CHALETS.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.side})</option>
              ))}
            </select>
          </div>
        )}
      </section>

      {/* Park hours */}
      <section>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Park Hours</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Opens</label>
            <input
              type="time"
              value={parkOpen}
              onChange={e => setParkOpen(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Closes</label>
            <input
              type="time"
              value={parkClose}
              onChange={e => setParkClose(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="mt-auto pt-2">
        <button
          type="submit"
          disabled={calculating}
          className="w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-500 active:bg-sky-700
            text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {calculating ? 'Calculating…' : '⛷️  Calculate My Route'}
        </button>
      </div>
    </form>
  );
}
