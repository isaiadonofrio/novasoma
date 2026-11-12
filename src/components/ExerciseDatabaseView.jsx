import React, { useState } from 'react';
import {
  Search,
  Dumbbell,
  BookOpen,
  ArrowLeft,
  X,
  UserCheck,
  Video
} from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels.js';
import { isBodyweightEquipment, isAnimatedGifUrl } from '../utils/exerciseImport.js';
import { ExerciseDetailModal } from './ExerciseDetailModal.jsx';

const EQUIPMENT_FILTERS = [
  { label: 'All', match: () => true },
  { label: 'Bodyweight', match: (ex) => !getRequiresEquipment(ex) },
  { label: 'Equipment Needed', match: (ex) => getRequiresEquipment(ex) },
  { label: 'Dumbbells', match: (ex) => (ex.equipment || '').toLowerCase().includes('dumbbell') },
  { label: 'Barbell', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('barbell') || eq.includes('landmine');
  } },
  { label: 'Kettlebell', match: (ex) => (ex.equipment || '').toLowerCase().includes('kettlebell') },
  { label: 'Medicine Ball', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('medicine ball') || eq.includes('med ball') || eq.includes('slam ball');
  } },
  { label: 'Bench', match: (ex) => (ex.equipment || '').toLowerCase().includes('bench') },
  { label: 'Bands / Straps', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('band') || eq.includes('strap') || eq.includes('cable');
  } },
  { label: 'Step / Box', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('step') || eq.includes('box') || eq.includes('elevation');
  } },
  { label: 'Pull-Up Bar', match: (ex) => (ex.equipment || '').toLowerCase().includes('pull-up bar') },
  { label: 'Jump Rope', match: (ex) => (ex.equipment || '').toLowerCase().includes('rope') }
];

function getRequiresEquipment(ex) {
  if (typeof ex?.requiresEquipment === 'boolean') {
    return ex.requiresEquipment;
  }
  return !isBodyweightEquipment(ex?.equipment);
}

const MUSCLE_CATEGORIES = [
  { key: 'All', label: 'All Muscles' },
  { key: 'chest', label: MUSCLE_LABELS.chest },
  { key: 'back', label: MUSCLE_LABELS.back },
  { key: 'shoulders', label: MUSCLE_LABELS.shoulders },
  { key: 'quads', label: MUSCLE_LABELS.quads },
  { key: 'hamstrings', label: MUSCLE_LABELS.hamstrings },
  { key: 'glutes', label: MUSCLE_LABELS.glutes },
  { key: 'calves', label: MUSCLE_LABELS.calves },
  { key: 'biceps', label: MUSCLE_LABELS.biceps },
  { key: 'triceps', label: MUSCLE_LABELS.triceps },
  { key: 'trapezius', label: MUSCLE_LABELS.trapezius },
  { key: 'forearm', label: MUSCLE_LABELS.forearm },
  { key: 'abdomen', label: MUSCLE_LABELS.abdomen },
  { key: 'obliques', label: MUSCLE_LABELS.obliques }
];

export function ExerciseDatabaseView({
  exercisesList = [],
  routines = [],
  onAddExerciseToRoutine,
  onBack
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [activeExerciseDetail, setActiveExerciseDetail] = useState(null);

  const activeEquipFilter = EQUIPMENT_FILTERS.find(f => f.label === selectedEquipment) || EQUIPMENT_FILTERS[0];

  const filteredExercises = exercisesList.filter(ex => {
    if (selectedMuscle !== 'All' && ex.muscleKey !== selectedMuscle) return false;
    if (!activeEquipFilter.match(ex)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ex.name?.toLowerCase().includes(q);
      const matchSci = ex.scientificName?.toLowerCase().includes(q);
      const matchEquip = ex.equipment?.toLowerCase().includes(q);
      const matchPattern = ex.pattern?.toLowerCase().includes(q);
      const matchMuscle = MUSCLE_LABELS[ex.muscleKey]?.toLowerCase().includes(q);
      if (!matchName && !matchSci && !matchEquip && !matchPattern && !matchMuscle) return false;
    }

    return true;
  });

  return (
    <div className="gymmane-db-view">
      {/* Top Navigation & Filter Header */}
      <section className="db-view-header">
        <div className="gymmane-wrap">
          <div className="db-top-nav-row">
            <button
              type="button"
              className="db-back-btn"
              onClick={onBack}
              title="Return to Home Overview"
            >
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="db-header-content-row">
            <div>
              <span className="db-kicker">CANONICAL MOVEMENT REPOSITORY</span>
              <h1 className="db-view-title">Exercise Library</h1>
              <p className="db-view-subtitle">
                Explore clean movement profiles, anatomy focus, equipment needs, and biomechanical cues for every exercise.
              </p>
            </div>
          </div>

          {/* Search Bar & Filters Box */}
          <div className="db-toolbar-box">
            <div className="db-search-input-wrap">
              <Search size={18} className="db-search-icon" />
              <input
                type="text"
                placeholder="Search by exercise name, muscle group, movement pattern, or equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="db-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="db-filters-stack">
              <div className="db-filter-row">
                <span className="db-filter-label">EQUIPMENT:</span>
                <div className="db-chips-scroll">
                  {EQUIPMENT_FILTERS.map(eq => (
                    <button
                      key={eq.label}
                      type="button"
                      className={`db-chip ${selectedEquipment === eq.label ? 'active' : ''}`}
                      onClick={() => setSelectedEquipment(eq.label)}
                    >
                      {eq.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="db-filter-row">
                <span className="db-filter-label">MUSCLE GROUP:</span>
                <div className="db-muscle-pills-scroll">
                  {MUSCLE_CATEGORIES.map(cat => (
                    <button
                      key={cat.key}
                      type="button"
                      className={`db-muscle-pill ${selectedMuscle === cat.key ? 'active' : ''}`}
                      onClick={() => setSelectedMuscle(cat.key)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="db-view-main">
        <div className="gymmane-wrap">
          <div className="db-results-bar">
            <span className="db-counter-text">
              Showing <b>{filteredExercises.length}</b> of <b>{exercisesList.length}</b> exercises
            </span>

            {(selectedMuscle !== 'All' || selectedEquipment !== 'All' || searchQuery) && (
              <button
                type="button"
                className="db-reset-filter-link"
                onClick={() => {
                  setSelectedMuscle('All');
                  setSelectedEquipment('All');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredExercises.length === 0 ? (
            <div className="db-empty-box">
              <Dumbbell size={48} color="var(--clay)" />
              <h3>No Movements Found</h3>
              <p>No exercises match your current search or filter combination.</p>
              <button
                type="button"
                className="btn-gymmane-primary"
                style={{ marginTop: '12px' }}
                onClick={() => {
                  setSelectedMuscle('All');
                  setSelectedEquipment('All');
                  setSearchQuery('');
                }}
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="db-catalog-grid">
              {filteredExercises.map(ex => {
                const usesGear = getRequiresEquipment(ex);
                const mechanicsLabel = ex.mechanics || (ex.isWarmup ? 'Mobility' : 'Compound');
                const levelLabel = ex.level || 'Intermediate';
                const equipLabel = usesGear ? (ex.equipment || 'Equipment') : 'Bodyweight';
                const isGif = isAnimatedGifUrl(ex.illustration);

                return (
                  <article
                    key={ex.id}
                    className="db-catalog-card clean-typography-card"
                    onClick={() => setActiveExerciseDetail(ex)}
                  >
                    <div
                      className="db-card-media-wrapper"
                      title="Click to view movement guide"
                    >
                      {ex.illustration ? (
                        <img
                          src={ex.illustration}
                          alt={ex.name}
                          className="db-card-cover-photo"
                          loading="lazy"
                        />
                      ) : ex.customVideoUrl ? (
                        <div className="db-card-photo-placeholder has-video">
                          <div className="placeholder-badge">
                            <Video size={18} color="var(--clay)" />
                            <span>VIDEO TUTORIAL</span>
                          </div>
                          <span className="placeholder-action-hint">View Video</span>
                        </div>
                      ) : (
                        <div className="db-card-photo-placeholder">
                          <div className="placeholder-badge">
                            <Dumbbell size={18} />
                            <span>CANONICAL EXERCISE</span>
                          </div>
                          <span className="placeholder-action-hint">View Guide</span>
                        </div>
                      )}
                      {ex.isWarmup && (
                        <span className="db-warmup-corner-badge">WARM-UP</span>
                      )}
                      {isGif && (
                        <span className="db-gif-corner-badge">GIF</span>
                      )}
                    </div>

                    <div className="db-card-body">
                      <div className="db-card-header-tags">
                        <span className="db-muscle-badge">
                          {MUSCLE_LABELS[ex.muscleKey] || ex.muscleKey}
                        </span>
                        <span
                          className={`db-equip-status-pill ${usesGear ? 'gear' : 'bodyweight'}`}
                          title={equipLabel}
                        >
                          {usesGear ? <Dumbbell size={11} /> : <UserCheck size={11} />}
                          <span>{equipLabel}</span>
                        </span>
                      </div>

                      {ex.pattern && (
                        <div className="db-pattern-kicker" title={ex.pattern}>
                          {ex.pattern}
                        </div>
                      )}

                      <h3 className="db-exercise-title" title={ex.name}>{ex.name}</h3>
                      <p className="db-exercise-subtitle" title={ex.subtitle || ex.scientificName}>
                        {ex.subtitle || ex.scientificName || 'Movement profile'}
                      </p>

                      <div className="db-card-meta-strip">
                        <div className="db-meta-cell">
                          <span className="db-meta-label">GEAR</span>
                          <span className="db-meta-val">{usesGear ? 'Equipment' : 'Bodyweight'}</span>
                        </div>
                        <div className="db-meta-cell">
                          <span className="db-meta-label">MECHANICS</span>
                          <span className="db-meta-val">{mechanicsLabel}</span>
                        </div>
                        <div className="db-meta-cell">
                          <span className="db-meta-label">LEVEL</span>
                          <span className="db-meta-val">{levelLabel}</span>
                        </div>
                      </div>

                      <div className="db-card-footer">
                        <button
                          type="button"
                          className="db-card-cta-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveExerciseDetail(ex);
                          }}
                        >
                          <BookOpen size={14} />
                          <span>View Guide</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Flagship Read-Only Exercise Guide Modal */}
      {activeExerciseDetail && (
        <ExerciseDetailModal
          exercise={activeExerciseDetail}
          onClose={() => setActiveExerciseDetail(null)}
          routines={routines}
          onAddToRoutine={onAddExerciseToRoutine}
        />
      )}
    </div>
  );
}

export default ExerciseDatabaseView;
