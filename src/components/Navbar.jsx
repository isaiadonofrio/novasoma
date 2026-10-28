import React from 'react';
import { Play, Sparkles, Dumbbell, Calendar, SlidersHorizontal } from 'lucide-react';

export function Navbar({ 
  routines, 
  activeRoutineId, 
  onSelectRoutine, 
  onStartPresentation,
  totalWorkoutsCompleted = 0
}) {
  const current = routines.find(r => r.id === activeRoutineId) || routines[0];

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <div className="app-brand-badge">
          <div className="brand-icon-box">
            <Dumbbell size={20} color="#FFFFFF" />
          </div>
          <div className="brand-text">
            <span className="brand-title">CORPO</span>
            <span className="brand-sub">PRECISION WORKOUT GUIDE</span>
          </div>
        </div>
      </div>

      <div className="navbar-routines-pills">
        {routines.map(r => (
          <button
            key={r.id}
            type="button"
            className={`routine-pill-btn ${r.id === activeRoutineId ? 'active' : ''}`}
            onClick={() => onSelectRoutine(r.id)}
          >
            <span 
              className="pill-dot" 
              style={{ backgroundColor: r.accentColor || '#10B981' }}
            />
            <span className="pill-title">{r.title.split('•')[0].trim()}</span>
          </button>
        ))}
      </div>

      <div className="navbar-right">
        {totalWorkoutsCompleted > 0 && (
          <div className="sessions-counter-badge" title="Allenamenti completati con successo">
            <Sparkles size={14} color="#F59E0B" />
            <span>{totalWorkoutsCompleted} {totalWorkoutsCompleted === 1 ? 'completato' : 'completati'}</span>
          </div>
        )}

        <button
          type="button"
          className="start-workout-nav-cta"
          onClick={() => onStartPresentation(0)}
        >
          <Play size={16} fill="currentColor" />
          <span>Segui Allenamento Live</span>
        </button>
      </div>
    </header>
  );
}
