import React from 'react';
import { Play, Dumbbell, Award, Flame, Sparkles } from 'lucide-react';

export function Navbar({ 
  routines, 
  activeRoutineId, 
  onSelectRoutine, 
  onStartPresentation,
  totalWorkoutsCompleted = 0
}) {
  return (
    <header className="gymmane-nav-header">
      <div className="nav-container">
        {/* Brand */}
        <div className="gymmane-brand">
          <div className="brand-logo-icon">
            <Dumbbell size={20} color="#0A0908" />
          </div>
          <div className="brand-titles">
            <span className="brand-main">CORPO</span>
            <span className="brand-tag">DIARIO DI ALLENAMENTO</span>
          </div>
        </div>

        {/* Routine Pills */}
        <div className="nav-routine-tabs">
          {routines.map(r => (
            <button
              key={r.id}
              type="button"
              className={`nav-tab-btn ${r.id === activeRoutineId ? 'active' : ''}`}
              onClick={() => onSelectRoutine(r.id)}
            >
              <span>{r.shortTitle || r.title}</span>
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div className="nav-right-actions">
          {totalWorkoutsCompleted > 0 && (
            <div className="streak-badge" title="Sessioni completate">
              <Sparkles size={14} color="#D9A184" />
              <span>{totalWorkoutsCompleted} {totalWorkoutsCompleted === 1 ? 'allenamento' : 'allenamenti'}</span>
            </div>
          )}

          <button
            type="button"
            className="gymmane-cta-btn"
            onClick={() => onStartPresentation(0)}
          >
            <Play size={15} fill="currentColor" />
            <span>ALLENATI ORA</span>
          </button>
        </div>
      </div>
    </header>
  );
}
