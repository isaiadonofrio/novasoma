import { useState, useMemo } from 'react';
import {
  Play,
  Search,
  Plus,
  Clock,
  Dumbbell,
  Layers,
  Edit3,
  Trash2,
  Copy,
  Activity,
  ChevronRight
} from 'lucide-react';
import { BodyMap } from './BodyMap';
import { MiniBodyMap } from './MiniBodyMap';
import { ConfirmModal } from './ConfirmModal';
import { MUSCLE_LABELS } from '../data/muscleLabels';

function getRoutineMuscleKeys(routine) {
  const primarySet = new Set();
  const secondarySet = new Set();
  (routine?.exercises || []).forEach((ex) => {
    if (ex.muscleKey) primarySet.add(ex.muscleKey);
    if (Array.isArray(ex.secondaryKeys)) {
      ex.secondaryKeys.forEach((k) => secondarySet.add(k));
    }
  });
  return {
    primaryKeys: Array.from(primarySet),
    secondaryKeys: Array.from(secondarySet)
  };
}

function formatCompactReps(reps) {
  if (!reps) return '8-12';
  return String(reps)
    .replace(/\s+/g, ' ')
    .replace(/per gamba|per lato|per leg|per side/gi, '/side')
    .replace(/\/lato\b|\/gamba\b/gi, '/side')
    .replace(/sec(onds?|ondi)?/gi, 's')
    .replace(/reps?/gi, '')
    .replace(/\s*-\s*/g, '-')
    .trim();
}

const CATEGORIES = [
  'All',
  'Legs',
  'Upper Body',
  'Push',
  'Pull',
  'Full Body',
  'Core & Functional'
];

function getCategoryToneClass(category = '') {
  const norm = String(category || '').toLowerCase();
  if (norm.includes('leg') || norm.includes('lower') || norm.includes('glute')) {
    return 'category-tone-legs';
  }
  if (norm.includes('full') || norm.includes('body')) {
    return 'category-tone-fullbody';
  }
  if (norm.includes('core') || norm.includes('functional') || norm.includes('spine') || norm.includes('mobility')) {
    return 'category-tone-core';
  }
  if (norm.includes('upper') || norm.includes('push') || norm.includes('pull')) {
    return 'category-tone-upper';
  }
  if (norm.includes('cardio') || norm.includes('conditioning') || norm.includes('power')) {
    return 'category-tone-power';
  }
  return 'category-tone-default';
}

function getDifficultyTone(difficulty = '') {
  const norm = String(difficulty || '').toLowerCase();
  if (norm.includes('advanced')) return 'tier-advanced';
  if (norm.includes('intermediate')) return 'tier-intermediate';
  if (norm.includes('beginner')) return 'tier-beginner';
  return 'tier-intermediate';
}

export function RoutinesSection({
  routines = [],
  onSelectRoutineToView,
  onStartRoutineLive,
  onOpenCreateWorkout,
  onDuplicateRoutine,
  onDeleteRoutine
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [showBodyMap, setShowBodyMap] = useState(false);
  const [pendingDeleteRoutine, setPendingDeleteRoutine] = useState(null);

  const handleToggleMuscle = (muscleKey) => {
    setSelectedMuscles((prev) =>
      prev.includes(muscleKey) ? prev.filter((m) => m !== muscleKey) : [...prev, muscleKey]
    );
  };

  const filteredRoutines = useMemo(() => {
    return routines.filter((r) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.exercises || []).some((ex) => ex.name.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'All' ||
        (r.category || '').toLowerCase().includes(selectedCategory.toLowerCase());

      const matchesMuscles =
        selectedMuscles.length === 0 ||
        (r.exercises || []).some(
          (ex) =>
            selectedMuscles.includes(ex.muscleKey) ||
            (ex.secondaryKeys && ex.secondaryKeys.some((k) => selectedMuscles.includes(k)))
        );

      return matchesSearch && matchesCategory && matchesMuscles;
    });
  }, [routines, searchQuery, selectedCategory, selectedMuscles]);

  const handleDeleteClick = (e, routine) => {
    e.stopPropagation();
    if (!onDeleteRoutine) return;
    setPendingDeleteRoutine(routine);
  };

  const handleDuplicateClick = (e, routine) => {
    e.stopPropagation();
    if (!onDuplicateRoutine) return;
    onDuplicateRoutine(routine.id);
  };

  return (
    <section className="home-routines-catalog-section" aria-label="Your Workouts">
      <div className="gymmane-wrap">
        <div className="home-routines-divider-header">
          <div>
            <span className="home-date-kicker">PERSONAL ARCHIVE</span>
            <div className="home-routines-title-row">
              <h2 className="home-routines-section-title">Your Workouts</h2>
              <span className="home-routines-count-pill">{filteredRoutines.length}</span>
            </div>
          </div>

          {onOpenCreateWorkout && (
            <button
              type="button"
              className="btn-gymmane-primary"
              onClick={onOpenCreateWorkout}
            >
              <Plus size={16} />
              <span>New Workout</span>
            </button>
          )}
        </div>

        <div className="home-toolbar-strip">
          <div className="toolbar-controls-grid">
            <div className="search-box-home">
              <Search size={16} className="search-icon-muted" />
              <input
                type="text"
                placeholder="Search workouts or exercises..."
                aria-label="Search workouts or exercises"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-field"
              />
            </div>

            <div className="category-chips-list" role="group" aria-label="Filter by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`toggle-bodymap-btn ${showBodyMap || selectedMuscles.length > 0 ? 'active' : ''}`}
              onClick={() => setShowBodyMap((prev) => !prev)}
              title="Filter by tapping muscles on the figure"
            >
              <Activity size={15} />
              <span>Muscles {selectedMuscles.length > 0 ? `(${selectedMuscles.length})` : ''}</span>
            </button>
          </div>

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

        {routines.length === 0 ? (
          <div className="empty-routines-box">
            <Dumbbell size={40} color="var(--clay)" />
            <h3>No workouts created yet</h3>
            <p>Create your first custom workout routine in seconds.</p>
            <button
              type="button"
              className="btn-gymmane-primary"
              onClick={onOpenCreateWorkout}
            >
              <Plus size={16} />
              <span>Create your first workout</span>
            </button>
          </div>
        ) : filteredRoutines.length === 0 ? (
          <div className="empty-routines-box">
            <Dumbbell size={36} color="var(--dim)" />
            <h3>No workouts found</h3>
            <p>Try adjusting your search query or clearing active filters.</p>
            <button
              type="button"
              className="btn-gymmane-secondary"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedMuscles([]);
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="routines-cards-grid">
            {filteredRoutines.map((routine) => {
              const { primaryKeys, secondaryKeys } = getRoutineMuscleKeys(routine);
              const exercises = routine.exercises || [];
              const hasExercises = exercises.length > 0;
              const categoryTone = getCategoryToneClass(routine.category);
              const difficultyTone = getDifficultyTone(routine.difficulty);
              const totalSets = exercises.reduce(
                (sum, ex) => sum + (parseInt(ex.defaultSets, 10) || 3),
                0
              );
              const warmupCount = exercises.filter((ex) => ex.isWarmup).length;
              const mainExercises = exercises.filter((ex) => !ex.isWarmup);
              const previewExercises = (mainExercises.length > 0 ? mainExercises : exercises).slice(0, 3);
              const remainingCount = Math.max(0, exercises.length - previewExercises.length);
              const visibleMuscles = primaryKeys.slice(0, 4);
              const extraMusclesCount = Math.max(0, primaryKeys.length - visibleMuscles.length);

              return (
                <article
                  key={routine.id}
                  className={`routine-folder-card ${categoryTone}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectRoutineToView(routine.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectRoutineToView(routine.id);
                    }
                  }}
                  aria-label={`Open routine ${routine.title}`}
                >
                  <div className="routine-folder-top-row">
                    <div className="routine-card-badges">
                      <span className={`routine-folder-tab ${categoryTone}`}>
                        {routine.category || 'Workout'}
                      </span>
                      {routine.difficulty && (
                        <span className="routine-level-pill">
                          <span className={`routine-level-pip ${difficultyTone}`} />
                          <span>{routine.difficulty}</span>
                        </span>
                      )}
                    </div>
                    <div className="routine-card-top-actions">
                      {onDuplicateRoutine && (
                        <button
                          type="button"
                          className="card-action-icon-btn"
                          onClick={(e) => handleDuplicateClick(e, routine)}
                          title="Duplicate workout"
                          aria-label={`Duplicate ${routine.title}`}
                        >
                          <Copy size={13} />
                        </button>
                      )}
                      {onDeleteRoutine && (
                        <button
                          type="button"
                          className="card-action-icon-btn delete"
                          onClick={(e) => handleDeleteClick(e, routine)}
                          title="Delete workout"
                          aria-label={`Delete ${routine.title}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="routine-folder-body">
                    <div className="routine-folder-main">
                      <div className="routine-folder-copy">
                        <h3 className="routine-clean-title">{routine.title}</h3>
                        <div className="routine-clean-meta">
                          <span className="routine-meta-item">
                            <Dumbbell size={13} />
                            {exercises.length} {exercises.length === 1 ? 'exercise' : 'exercises'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="routine-meta-item">
                            <Clock size={13} />
                            ~{routine.durationMinutes} min
                          </span>
                          {hasExercises && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="routine-meta-item">
                                <Layers size={13} />
                                {totalSets} sets
                              </span>
                            </>
                          )}
                        </div>

                        {visibleMuscles.length > 0 && (
                          <div className="routine-muscle-tags">
                            {visibleMuscles.map((key) => (
                              <span key={key} className="routine-muscle-tag">
                                {MUSCLE_LABELS[key] || key}
                              </span>
                            ))}
                            {extraMusclesCount > 0 && (
                              <span className="routine-muscle-tag more">
                                +{extraMusclesCount}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="routine-folder-sil" title="Target muscle activation">
                        <MiniBodyMap
                          primaryKeys={primaryKeys}
                          secondaryKeys={secondaryKeys}
                          className="card-mini-body"
                        />
                      </div>
                    </div>

                    {hasExercises ? (
                      <div className="routine-preview-tray">
                        <div className="routine-preview-list">
                          {previewExercises.map((ex, previewIdx) => (
                            <div key={`${ex.id}-${previewIdx}`} className="routine-preview-item">
                              <div className="routine-preview-thumb">
                                {ex.illustration ? (
                                  <img
                                    src={ex.illustration}
                                    alt={ex.name}
                                    loading="lazy"
                                  />
                                ) : (
                                  <Dumbbell size={14} />
                                )}
                              </div>
                              <div className="routine-preview-info">
                                <span className="routine-preview-name">{ex.name}</span>
                                <span className="routine-preview-sub">
                                  {MUSCLE_LABELS[ex.muscleKey] || ex.muscleKey}
                                </span>
                              </div>
                              <span className="routine-preview-volume">
                                {ex.defaultSets || 3} × {formatCompactReps(ex.defaultReps)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="routine-preview-footer">
                          <span className="routine-phase-summary">
                            {warmupCount > 0 && mainExercises.length > 0 ? (
                              <>
                                <span className="phase-pill-mini warmup">● {warmupCount} warm-up</span>
                                <span className="phase-dot-sep">·</span>
                                <span className="phase-pill-mini main">▲ {mainExercises.length} main</span>
                              </>
                            ) : (
                              `${exercises.length} ${exercises.length === 1 ? 'exercise' : 'exercises'} planned`
                            )}
                          </span>
                          <span className="routine-preview-more">
                            {remainingCount > 0 ? `+${remainingCount} more` : 'View workout'}
                            <ChevronRight size={13} />
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="routine-preview-empty">
                        No exercises in this workout yet — click Edit to add some.
                      </div>
                    )}

                    <div
                      className="routine-card-actions-bar"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="btn-card-secondary"
                        onClick={() => onSelectRoutineToView(routine.id)}
                      >
                        <Edit3 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        className="btn-card-primary"
                        disabled={!hasExercises}
                        title={hasExercises ? 'Start workout' : 'Add at least one exercise first'}
                        onClick={() => onStartRoutineLive(routine.id)}
                      >
                        <Play size={13} fill="currentColor" />
                        <span>Start Workout</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {pendingDeleteRoutine && (
        <ConfirmModal
          title="Delete Workout?"
          message={`Permanently delete "${pendingDeleteRoutine.title}"? Your completed session logs remain untouched.`}
          confirmLabel="Delete Workout"
          onConfirm={() => {
            onDeleteRoutine?.(pendingDeleteRoutine.id);
            setPendingDeleteRoutine(null);
          }}
          onCancel={() => setPendingDeleteRoutine(null)}
        />
      )}
    </section>
  );
}

