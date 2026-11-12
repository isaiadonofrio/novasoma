import React from 'react';
import { Play, Sun, Moon, BookOpen, Home } from 'lucide-react';
import logoImg from '../assets/logo nova soma.jpg';

export function Navbar({
  currentView = 'home',
  theme = 'dark',
  onToggleTheme,
  onNavigateHome,
  onNavigateDatabase,
  onStartPresentation,
  hasPlayableRoutine = true
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
          title="Back to Home"
          onKeyDown={(e) => e.key === 'Enter' && onNavigateHome && onNavigateHome()}
        >
          <div className="brand-logo-frame">
            <img src={logoImg} alt="Nova Soma Logo" className="brand-logo-img" />
          </div>
          <span className="brand-main">Nova Soma</span>
        </div>

        {/* Center Segmented Switcher */}
        <nav className="nav-center-links" aria-label="Main navigation">
          <button
            type="button"
            className={`nav-link-btn ${currentView === 'home' || currentView === 'overview' ? 'active' : ''}`}
            onClick={onNavigateHome}
          >
            <Home size={15} />
            <span>Home</span>
          </button>
          {onNavigateDatabase && (
            <button
              type="button"
              className={`nav-link-btn ${currentView === 'database' ? 'active' : ''}`}
              onClick={onNavigateDatabase}
            >
              <BookOpen size={15} />
              <span>Library</span>
            </button>
          )}
        </nav>

        {/* Right Controls */}
        <div className="nav-right-actions">
          {onToggleTheme && (
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle light/dark theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          )}

          <button
            type="button"
            className="gymmane-cta-btn"
            disabled={!hasPlayableRoutine}
            title={hasPlayableRoutine ? 'Start workout' : 'Add at least one exercise to a workout'}
            onClick={() => onStartPresentation && onStartPresentation(0)}
          >
            <Play size={14} fill="currentColor" />
            <span>Train</span>
          </button>
        </div>
      </div>
    </header>
  );
}
