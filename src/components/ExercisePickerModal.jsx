import React, { useEffect, useState } from 'react';
import { X, Search, Plus, Dumbbell, BookOpen, Check, Flame } from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels';

export function ExercisePickerModal({
  exerciseDatabase = [],
  existingExercises = [],
  onSelectExercise,
  onClose
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [phaseMode, setPhaseMode] = useState('auto'); // 'auto' | 'warmup' | 'main'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const existingIds = new Set(
    existingExercises.map(ex => ex.sourceId || ex.id)
  );

  const filtered = exerciseDatabase.filter(ex => {
    if (selectedMuscle !== 'All' && ex.muscleKey !== selectedMuscle) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ex.name?.toLowerCase().includes(q);
      const matchSci = ex.scientificName?.toLowerCase().includes(q);
      const matchEquip = ex.equipment?.toLowerCase().includes(q);
      const matchMuscle = MUSCLE_LABELS[ex.muscleKey]?.toLowerCase().includes(q);
      if (!matchName && !matchSci && !matchEquip && !matchMuscle) return false;
    }
    return true;
  });

  const handlePick = (ex) => {
    const isWarmup =
      phaseMode === 'auto'
        ? Boolean(ex.isWarmup)
        : phaseMode === 'warmup';

    onSelectExercise({
      ...ex,
      isWarmup,
      phase: isWarmup ? 'warmup' : 'main'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="exercise-picker-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="editor-header">
          <div className="editor-header-title">
            <BookOpen size={18} color="var(--clay)" />
            <div>
              <h3>ADD EXERCISE TO WORKOUT</h3>
              <span className="editor-active-ex-name">
                Select from your curated Exercise Library
              </span>
            </div>
          </div>

          <div className="editor-header-actions">
            <button type="button" className="close-editor-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Search & Phase Controls */}
        <div className="picker-controls-bar">
          <div className="db-search-input-wrap picker-search-wrap">
            <Search size={16} className="db-search-icon" />
            <input
              type="text"
              placeholder="Search your library (name, muscle, equipment)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="db-search-input"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="picker-filter-row">
            <div className="picker-muscle-select-wrap">
              <label htmlFor="picker-muscle-select">Muscle:</label>
              <select
                id="picker-muscle-select"
                value={selectedMuscle}
                onChange={(e) => setSelectedMuscle(e.target.value)}
              >
                <option value="All">All Muscles</option>
                {Object.entries(MUSCLE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="picker-phase-toggle" role="group" aria-label="Workout phase">
              <button
                type="button"
                className={`phase-opt-btn ${phaseMode === 'auto' ? 'active' : ''}`}
                onClick={() => setPhaseMode('auto')}
                title="Use the exercise's default phase"
              >
                Auto
              </button>
              <button
                type="button"
                className={`phase-opt-btn ${phaseMode === 'warmup' ? 'active' : ''}`}
                onClick={() => setPhaseMode('warmup')}
              >
                <Flame size={12} />
                Warm-Up
              </button>
              <button
                type="button"
                className={`phase-opt-btn ${phaseMode === 'main' ? 'active' : ''}`}
                onClick={() => setPhaseMode('main')}
              >
                Main Block
              </button>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="picker-list-scroll">
          {filtered.length === 0 ? (
            <div className="picker-empty-state">
              <Dumbbell size={32} color="var(--dim)" />
              <p>No exercises match your search or filters.</p>
              <button
                type="button"
                className="btn-gymmane-primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMuscle('All');
                }}
              >
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            <div className="picker-items-grid">
              {filtered.map((ex) => {
                const alreadyIn = existingIds.has(ex.id);
                const muscleLabel = MUSCLE_LABELS[ex.muscleKey] || ex.muscleKey;

                return (
                  <div key={ex.id} className="picker-item-card">
                    <div className="picker-item-main">
                      <div className="picker-item-badges">
                        <span className="row-muscle-pill">{muscleLabel}</span>
                        {ex.isWarmup && (
                          <span className="row-warmup-pill">Warm-Up</span>
                        )}
                        <span className="picker-equip-tag">
                          <Dumbbell size={11} />
                          {ex.equipment || 'Bodyweight'}
                        </span>
                        {alreadyIn && (
                          <span className="picker-already-badge">
                            <Check size={11} />
                            Added
                          </span>
                        )}
                      </div>

                      <h4 className="picker-item-title">{ex.name}</h4>
                      <p className="picker-item-sub">
                        {ex.defaultSets || 3} sets × {ex.defaultReps || '8-12'} · Rest {ex.defaultRestSeconds || 90}s
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn-picker-add"
                      onClick={() => handlePick(ex)}
                    >
                      <Plus size={15} />
                      <span>Add</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
