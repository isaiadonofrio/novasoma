import React from 'react';
import { Play, Dumbbell, Award, Flame, Sparkles, Sun, Moon } from 'lucide-react';

export function Navbar({ 
  routines, 
  currentView = 'home',
  activeRoutineId, 
  theme = 'dark',
  onToggleTheme,
  onNavigateHome,
  onSelectRoutine, 
  onStartPresentation,
  totalWorkoutsCompleted = 0
}) {
  return (
    <header className="gymmane-nav-header">
      <div className="nav-container">
        {/* Brand */}
        <div 
          className="gymmane-brand"
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          title="Torna alla Libreria Schede"
          onKeyDown={(e) => e.key === 'Enter' && onNavigateHome && onNavigateHome()}
        >
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
          <button
            type="button"
            className={`nav-tab-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={onNavigateHome}
          >
            <span>LIBRERIA</span>
          </button>
          {routines.map(r => (
            <button
              key={r.id}
              type="button"
              className={`nav-tab-btn ${currentView === 'overview' && r.id === activeRoutineId ? 'active' : ''}`}
              onClick={() => onSelectRoutine(r.id)}
            >
              <span>{r.shortTitle || r.title}</span>
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div className="nav-right-actions">
          {onToggleTheme && (
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? "Passa a Tema Chiaro" : "Passa a Tema Scuro"}
              aria-label="Cambia tema chiaro/scuro"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

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
