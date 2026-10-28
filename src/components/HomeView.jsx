import React, { useState } from 'react';
import { 
  Play, 
  Search, 
  Plus, 
  Clock, 
  Layers, 
  Dumbbell, 
  Eye, 
  Sparkles, 
  Filter,
  Trash2,
  Activity
} from 'lucide-react';
import { BodyMap, MUSCLE_LABELS } from './BodyMap';
import { WorkoutEditorModal } from './WorkoutEditorModal';

export function HomeView({ 
  routines, 
  onSelectRoutineToView, 
  onStartRoutineLive, 
  onCreateRoutine,
  onDeleteRoutine,
  totalWorkoutsCompleted = 0 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutte');
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [showBodyMap, setShowBodyMap] = useState(false);
  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);

  // Categories list
  const categories = ['Tutte', 'Gambe', 'Parte Superiore', 'Full Body', 'Core & Funzionale'];

  // Toggle muscle on body map
  const handleToggleMuscle = (muscleKey) => {
    setSelectedMuscles(prev => {
      if (prev.includes(muscleKey)) {
        return prev.filter(m => m !== muscleKey);
      } else {
        return [...prev, muscleKey];
      }
    });
  };

  // Filter routines
  const filteredRoutines = routines.filter(r => {
    // Search query
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.exercises.some(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const matchesCategory = selectedCategory === 'Tutte' || r.category.toLowerCase().includes(selectedCategory.toLowerCase());

    // Muscle filter (if any selected on body map)
    const matchesMuscles = selectedMuscles.length === 0 || r.exercises.some(ex => {
      return selectedMuscles.includes(ex.muscleKey) || (ex.secondaryKeys && ex.secondaryKeys.some(k => selectedMuscles.includes(k)));
    });

    return matchesSearch && matchesCategory && matchesMuscles;
  });

  return (
    <div className="gymmane-home-view">
      {/* Home Hero Banner */}
      <section className="home-clean-hero">
        <div className="gymmane-wrap">
          <div className="hero-clean-header-row">
            <div>
              <div className="hero-status-tag">
                <span className="dot-clay"></span>
                <span>SCHEDE DI ALLENAMENTO PERSONALI</span>
              </div>
              <h1 className="home-title-loud">
                LE TUE <span className="clay-highlight">SCHEDE</span>
              </h1>
              <p className="home-subtitle">
                Seleziona un workout per visualizzarlo e modificarlo, oppure avvia la sessione guidata esercizio per esercizio.
              </p>
            </div>

            <div className="hero-actions-right">
              <button 
                type="button" 
                className="btn-gymmane-primary"
                onClick={() => setIsCreatingWorkout(true)}
              >
                <Plus size={16} />
                <span>NUOVA SCHEDA</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="home-toolbar-strip">
        <div className="gymmane-wrap">
          <div className="toolbar-controls-grid">
            {/* Search */}
            <div className="search-box-home">
              <Search size={15} className="search-icon-muted" />
              <input 
                type="text"
                placeholder="Cerca per scheda o esercizio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-field"
              />
            </div>

            {/* Category Pills */}
            <div className="category-chips-list">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Toggle Body Map Filter */}
            <button
              type="button"
              className={`toggle-bodymap-btn ${showBodyMap || selectedMuscles.length > 0 ? 'active' : ''}`}
              onClick={() => setShowBodyMap(prev => !prev)}
              title="Filtra toccando i muscoli sul corpo"
            >
              <Activity size={14} />
              <span>MAPPA CORPOREA {selectedMuscles.length > 0 ? `(${selectedMuscles.length})` : ''}</span>
            </button>
          </div>

          {/* Expandable Body Map Drawer */}
          {showBodyMap && (
            <div className="home-bodymap-drawer">
              <BodyMap 
                selectedMuscles={selectedMuscles}
                onToggleMuscle={handleToggleMuscle}
                onClearMuscles={() => setSelectedMuscles([])}
              />
            </div>
          )}
        </div>
      </section>

      {/* Routines Grid */}
      <section className="home-routines-grid-section">
        <div className="gymmane-wrap">
          {filteredRoutines.length === 0 ? (
            <div className="empty-routines-box">
              <Dumbbell size={40} color="#626262" />
              <h3>Nessuna scheda trovata</h3>
              <p>Nessun allenamento corrisponde ai filtri selezionati.</p>
              <button 
                type="button" 
                className="btn-gymmane-secondary"
                onClick={() => { setSelectedCategory('Tutte'); setSearchQuery(''); setSelectedMuscles([]); }}
              >
                Azzera tutti i filtri
              </button>
            </div>
          ) : (
            <div className="routines-cards-grid">
              {filteredRoutines.map((routine) => {
                // Get unique muscle labels for this routine
                const muscleNames = Array.from(
                  new Set(routine.exercises.map(ex => MUSCLE_LABELS[ex.muscleKey] || ex.muscleKey))
                ).slice(0, 3);

                return (
                  <article key={routine.id} className="routine-clean-card">
                    <div className="card-top-category-row">
                      <span className="routine-category-tag">{routine.category}</span>
                      <div className="card-sub-info">
                        <Clock size={13} color="#9A9A9A" />
                        <span>~{routine.durationMinutes} min</span>
                      </div>
                    </div>

                    <h2 className="routine-clean-title">{routine.title}</h2>
                    <p className="routine-clean-desc">{routine.description}</p>

                    {/* Muscle Pills */}
                    <div className="routine-muscles-row">
                      {muscleNames.map((m, i) => (
                        <span key={i} className="routine-muscle-chip">{m}</span>
                      ))}
                      {routine.exercises.length > 3 && (
                        <span className="routine-muscle-chip more">+{routine.exercises.length - 3} altri</span>
                      )}
                    </div>

                    {/* Quick Specs */}
                    <div className="routine-footer-meta">
                      <div className="spec-unit">
                        <Layers size={14} color="#D9A184" />
                        <span><b>{routine.exercises.length}</b> esercizi</span>
                      </div>
                      <div className="spec-unit">
                        <span className="diff-dot"></span>
                        <span>{routine.difficulty || 'Intermedio'}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="routine-card-actions-bar">
                      <button 
                        type="button" 
                        className="btn-card-secondary"
                        onClick={() => onSelectRoutineToView(routine.id)}
                      >
                        <Eye size={15} />
                        <span>VEDI & MODIFICA</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn-card-primary"
                        onClick={() => onStartRoutineLive(routine.id)}
                      >
                        <Play size={15} fill="currentColor" />
                        <span>ALLENATI</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Workout Creation Modal */}
      {isCreatingWorkout && (
        <WorkoutEditorModal 
          onSave={(newWorkout) => {
            onCreateRoutine(newWorkout);
            setIsCreatingWorkout(false);
          }}
          onClose={() => setIsCreatingWorkout(false)}
        />
      )}
    </div>
  );
}
