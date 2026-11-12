import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Dumbbell,
  BookOpen,
  Activity,
  AlertTriangle,
  Lightbulb,
  Wind,
  ArrowLeft,
  Edit3,
  Plus,
  X,
  Trash2,
  Camera,
  Video,
  Check,
  Sparkles,
  UserCheck,
  ArrowRightLeft,
  ChevronRight,
  History
} from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels';
import { isBodyweightEquipment, isAnimatedGifUrl } from '../utils/exerciseImport';
import { ExerciseEditorModal } from './ExerciseEditorModal';
import { MediaViewer } from './MediaViewer';
import { MiniBodyMap } from './MiniBodyMap';
import { ConfirmModal } from './ConfirmModal';

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
  { label: 'Pull-Up Bar', match: (ex) => {
    const eq = (ex.equipment || '').toLowerCase();
    return eq.includes('pull-up bar');
  } },
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
  onSaveExercise,
  onDeleteExercise,
  routines = [],
  workoutHistory = [],
  onAddExerciseToRoutine,
  onBack
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');

  const [activeExerciseDetail, setActiveExerciseDetail] = useState(null);
  const [detailTab, setDetailTab] = useState('form'); // 'form' | 'anatomy' | 'alternatives'
  const [editingExercise, setEditingExercise] = useState(null);
  const [isCreatingExercise, setIsCreatingExercise] = useState(false);
  const [editorInitialTab, setEditorInitialTab] = useState('general');
  const [pendingDeleteExercise, setPendingDeleteExercise] = useState(null);

  const [targetRoutineId, setTargetRoutineId] = useState(routines[0]?.id || '');
  const [addedToRoutineConfirm, setAddedToRoutineConfirm] = useState(null);
  const rightScrollRef = useRef(null);

  useEffect(() => {
    if (!activeExerciseDetail || editingExercise || isCreatingExercise || pendingDeleteExercise) {
      return undefined;
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveExerciseDetail(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeExerciseDetail, editingExercise, isCreatingExercise, pendingDeleteExercise]);

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

  const openExerciseDetail = (ex) => {
    setAddedToRoutineConfirm(null);
    setDetailTab('form');
    setActiveExerciseDetail(ex);
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTop = 0;
    }
  };

  const handleSave = (exerciseData) => {
    if (onSaveExercise) {
      onSaveExercise(exerciseData);
    }
    if (activeExerciseDetail && activeExerciseDetail.id === exerciseData.id) {
      setActiveExerciseDetail(exerciseData);
    }
    setEditingExercise(null);
    setIsCreatingExercise(false);
  };

  const handleDelete = (exercise) => {
    setPendingDeleteExercise(exercise);
  };

  const confirmDeleteExercise = () => {
    if (!pendingDeleteExercise) return;
    const exercise = pendingDeleteExercise;
    setPendingDeleteExercise(null);
    if (onDeleteExercise) {
      onDeleteExercise(exercise.id);
    }
    if (activeExerciseDetail?.id === exercise.id) {
      setActiveExerciseDetail(null);
    }
  };

  const handleSendToRoutine = (exercise) => {
    const resolvedId = routines.some(r => r.id === targetRoutineId)
      ? targetRoutineId
      : routines[0]?.id;
    if (!resolvedId || !onAddExerciseToRoutine) return;
    onAddExerciseToRoutine(resolvedId, exercise);
    const routineName = routines.find(r => r.id === resolvedId)?.shortTitle || routines.find(r => r.id === resolvedId)?.title || 'workout';
    setAddedToRoutineConfirm(`Added to ${routineName}`);
    setTimeout(() => setAddedToRoutineConfirm(null), 2200);
  };

  const detailUsesGear = activeExerciseDetail ? getRequiresEquipment(activeExerciseDetail) : false;

  const detailHistoryLogs = React.useMemo(() => {
    if (!activeExerciseDetail || !Array.isArray(workoutHistory) || workoutHistory.length === 0) {
      return [];
    }
    const targetIds = new Set(
      [
        activeExerciseDetail.id,
        activeExerciseDetail.sourceId,
        activeExerciseDetail.id?.replace(/^wu-/, 'ex-'),
      ].filter(Boolean)
    );
    const logs = [];
    for (const session of workoutHistory) {
      if (!session?.loggedSets || typeof session.loggedSets !== 'object') continue;
      for (const [key, sets] of Object.entries(session.loggedSets)) {
        if (!Array.isArray(sets)) continue;
        const normalizedKey = key.replace(/-\d{10,}$/, '').replace(/^wu-/, 'ex-');
        const matchesKey =
          targetIds.has(key) ||
          targetIds.has(normalizedKey) ||
          sets.some((s) => s?.sourceId && targetIds.has(s.sourceId));
        if (!matchesKey) continue;
        const completedSets = sets.filter((s) => s?.completed);
        if (completedSets.length === 0) continue;
        const bestLabel = completedSets
          .map((s) => {
            const w = String(s.weight ?? '').trim();
            const r = String(s.reps ?? '').trim();
            return w ? `${w}kg × ${r || '-'}` : `${r || '-'} reps`;
          })
          .join(' · ');
        logs.push({
          id: `${session.id || session.date}-${key}`,
          date: session.date || session.completedAt,
          routineTitle: session.routineTitle || 'Workout',
          summary: bestLabel,
        });
        break;
      }
      if (logs.length >= 3) break;
    }
    return logs;
  }, [activeExerciseDetail, workoutHistory]);

  const detailAlternatives = activeExerciseDetail
    ? exercisesList
        .filter((cand) => cand.id !== activeExerciseDetail.id && cand.muscleKey === activeExerciseDetail.muscleKey)
        .slice(0, 6)
    : [];

  const executionSteps = activeExerciseDetail?.execution
    ? [
        activeExerciseDetail.execution.setup && {
          step: '01',
          title: 'Setup & Stance',
          text: activeExerciseDetail.execution.setup
        },
        activeExerciseDetail.execution.eccentric && {
          step: '02',
          title: 'Lowering (Eccentric)',
          text: activeExerciseDetail.execution.eccentric
        },
        activeExerciseDetail.execution.concentric && {
          step: '03',
          title: 'Drive & Lockout (Concentric)',
          text: activeExerciseDetail.execution.concentric
        }
      ].filter(Boolean)
    : [];

  return (
    <div className="gymmane-database-page">
      {/* Top Header Section */}
      <section className="db-view-header">
        <div className="gymmane-wrap">
          <button
            type="button"
            className="db-back-btn"
            onClick={onBack}
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>

          <div className="db-view-title-row">
            <div className="db-title-col">
              <div className="db-kinesiology-badge">
                <BookOpen size={13} />
                <span>Personal Exercise Catalog</span>
              </div>
              <h1 className="db-view-title">Exercise Library</h1>
              <p className="db-view-subtitle">
                Explore clean movement profiles, anatomy focus, equipment needs, and coaching cues for every exercise.
              </p>
            </div>

            <div className="db-header-actions-box">
              <button
                type="button"
                className="btn-gymmane-primary create-ex-btn"
                onClick={() => {
                  setEditorInitialTab('general');
                  setIsCreatingExercise(true);
                }}
              >
                <Plus size={16} />
                <span>New / Import Exercise</span>
              </button>
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

          {exercisesList.length === 0 ? (
            <div className="db-empty-box">
              <Dumbbell size={48} color="var(--clay)" />
              <h3>Your Exercise Library Is Ready</h3>
              <p>No exercises have been added yet. Create or import your first exercise to get started.</p>
              <button
                type="button"
                className="btn-gymmane-primary"
                onClick={() => setIsCreatingExercise(true)}
              >
                <Plus size={16} />
                <span>Add First Exercise</span>
              </button>
            </div>
          ) : filteredExercises.length === 0 ? (
            <div className="db-empty-box">
              <Dumbbell size={44} color="var(--faint)" />
              <h3>No exercises found</h3>
              <p>No exercises match your current filters or search query.</p>
              <button
                type="button"
                className="btn-gymmane-secondary"
                onClick={() => { setSelectedMuscle('All'); setSelectedEquipment('All'); setSearchQuery(''); }}
              >
                Reset filters
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
                    onClick={() => openExerciseDetail(ex)}
                  >
                    <div
                      className="db-card-media-wrapper"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditorInitialTab('media');
                        setEditingExercise(ex);
                      }}
                      title={ex.illustration || ex.customVideoUrl ? 'View / Edit movement media' : 'Click to upload image or GIF'}
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
                          <span className="placeholder-action-hint">Click to edit media</span>
                        </div>
                      ) : (
                        <div className="db-card-photo-placeholder">
                          <div className="placeholder-badge">
                            <Camera size={18} />
                            <span>NO IMAGE YET</span>
                          </div>
                          <span className="placeholder-action-hint">+ Add Photo or GIF</span>
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
                        {ex.subtitle || ex.scientificName || 'Custom exercise profile'}
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
                            openExerciseDetail(ex);
                          }}
                        >
                          <BookOpen size={14} />
                          <span>View Guide</span>
                        </button>

                        <button
                          type="button"
                          className="db-card-edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditorInitialTab('general');
                            setEditingExercise(ex);
                          }}
                          title="Edit exercise"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
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

      {/* Flagship Editorial Split-Pane Exercise Guide Modal */}
      {activeExerciseDetail && (
        <div className="modal-backdrop" onClick={() => setActiveExerciseDetail(null)}>
          <div className="gymmane-db-detail-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Clean Compact Modal Header */}
            <div className="db-dialog-header">
              <div className="db-dialog-header-info">
                <div className="db-detail-badges-row">
                  <span className="detail-pattern-kicker">
                    {activeExerciseDetail.pattern || 'Movement Guide'}
                  </span>
                  {activeExerciseDetail.isWarmup && (
                    <span className="detail-warmup-tag">Warm-Up</span>
                  )}
                </div>
                <h2 className="db-dialog-title">{activeExerciseDetail.name}</h2>
                <p className="db-dialog-scientific">
                  {activeExerciseDetail.scientificName || activeExerciseDetail.subtitle}
                </p>
              </div>

              <div className="db-dialog-header-actions">
                <button
                  type="button"
                  className="btn-guide-ghost-danger"
                  onClick={() => handleDelete(activeExerciseDetail)}
                  title="Delete exercise from library"
                  aria-label="Delete exercise"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  type="button"
                  className="btn-gymmane-secondary db-edit-btn"
                  onClick={() => {
                    setEditorInitialTab('general');
                    setEditingExercise(activeExerciseDetail);
                  }}
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="close-db-btn"
                  onClick={() => setActiveExerciseDetail(null)}
                  title="Close"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Split Workspace: Left Visual & Quick-Add Stage | Right Tabbed Guide */}
            <div className="db-guide-shell">
              {/* LEFT STAGE */}
              <aside className="db-guide-left-stage">
                <div
                  className="db-guide-media-frame"
                  onClick={() => {
                    setEditorInitialTab('media');
                    setEditingExercise(activeExerciseDetail);
                  }}
                  title="Click to upload an image or animated GIF"
                >
                  {activeExerciseDetail.illustration ? (
                    <>
                      <img
                        src={activeExerciseDetail.illustration}
                        alt={`${activeExerciseDetail.name} movement demonstration`}
                        className="db-detail-media-img"
                      />
                      {isAnimatedGifUrl(activeExerciseDetail.illustration) && (
                        <span className="db-detail-media-tag">
                          <Sparkles size={11} />
                          Animated GIF
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="db-detail-media-empty">
                      <Camera size={26} color="var(--dim)" />
                      <span>No visual yet</span>
                      <span className="media-empty-cta">+ Upload Image / GIF</span>
                    </div>
                  )}
                </div>

                {activeExerciseDetail.customVideoUrl && (
                  <div className="spotlight-video-wrapper">
                    <MediaViewer
                      src={activeExerciseDetail.customVideoUrl}
                      alt={activeExerciseDetail.name}
                      className="spotlight-video-frame"
                      autoPlay={false}
                    />
                  </div>
                )}

                {/* Concise Key-Value Taxonomy Table (Zero nested boxes) */}
                <dl className="db-guide-specs-list">
                  <div className="guide-spec-row">
                    <dt>Equipment</dt>
                    <dd>
                      <span className={`db-equip-status-pill ${detailUsesGear ? 'gear' : 'bodyweight'}`}>
                        {detailUsesGear ? <Dumbbell size={11} /> : <UserCheck size={11} />}
                        <span>{activeExerciseDetail.equipment || 'Bodyweight'}</span>
                      </span>
                    </dd>
                  </div>
                  <div className="guide-spec-row">
                    <dt>Target Muscle</dt>
                    <dd className="spec-emphasis">
                      {MUSCLE_LABELS[activeExerciseDetail.muscleKey] || activeExerciseDetail.muscleKey}
                    </dd>
                  </div>
                  <div className="guide-spec-row">
                    <dt>Mechanics</dt>
                    <dd>{activeExerciseDetail.mechanics || (activeExerciseDetail.isWarmup ? 'Mobility' : 'Compound')}</dd>
                  </div>
                  <div className="guide-spec-row">
                    <dt>Difficulty</dt>
                    <dd>{activeExerciseDetail.level || 'Intermediate'}</dd>
                  </div>
                </dl>

                {detailHistoryLogs.length > 0 && (
                  <div className="detail-history-strip">
                    <div className="detail-history-head">
                      <History size={13} />
                      <span>Recent Logged Sessions</span>
                    </div>
                    <div className="detail-history-rows">
                      {detailHistoryLogs.map((log) => (
                        <div key={log.id} className="detail-history-row">
                          <span className="detail-history-date">
                            {log.date
                              ? new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                              : 'Logged'}
                          </span>
                          <span className="detail-history-summary">{log.summary}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sticky Add-to-Workout Action Dock */}
                {routines.length > 0 && onAddExerciseToRoutine && (
                  <div className="db-guide-action-dock">
                    <label className="guide-dock-label" htmlFor="guide-routine-select">
                      Add to workout
                    </label>
                    <div className="guide-dock-controls">
                      <select
                        id="guide-routine-select"
                        value={routines.some(r => r.id === targetRoutineId) ? targetRoutineId : (routines[0]?.id || '')}
                        onChange={(e) => setTargetRoutineId(e.target.value)}
                        className="send-routine-select"
                      >
                        {routines.map(r => (
                          <option key={r.id} value={r.id}>{r.title}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="btn-gymmane-primary send-routine-btn"
                        onClick={() => handleSendToRoutine(activeExerciseDetail)}
                      >
                        {addedToRoutineConfirm ? <Check size={14} /> : <Plus size={14} />}
                        <span>{addedToRoutineConfirm ? 'Added' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </aside>

              {/* RIGHT TABBED EDITORIAL CONSOLE */}
              <div className="db-guide-right-pane">
                <div className="db-guide-tabs-bar" role="tablist" aria-label="Exercise guide sections">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={detailTab === 'form'}
                    className={`db-guide-tab-btn ${detailTab === 'form' ? 'active' : ''}`}
                    onClick={() => setDetailTab('form')}
                  >
                    <BookOpen size={14} />
                    <span>Form & Execution</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={detailTab === 'anatomy'}
                    className={`db-guide-tab-btn ${detailTab === 'anatomy' ? 'active' : ''}`}
                    onClick={() => setDetailTab('anatomy')}
                  >
                    <Activity size={14} />
                    <span>Muscles & Anatomy</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={detailTab === 'alternatives'}
                    className={`db-guide-tab-btn ${detailTab === 'alternatives' ? 'active' : ''}`}
                    onClick={() => setDetailTab('alternatives')}
                  >
                    <ArrowRightLeft size={14} />
                    <span>Alternatives ({detailAlternatives.length})</span>
                  </button>
                </div>

                <div className="db-guide-right-scroll" ref={rightScrollRef}>
                  {detailTab === 'form' && (
                    <div className="guide-panel animate-fade">
                      {/* Numbered Scannable Timeline */}
                      {executionSteps.length > 0 ? (
                        <ol className="guide-timeline-list">
                          {executionSteps.map((item) => (
                            <li key={item.step} className="guide-timeline-step">
                              <span className="timeline-step-badge">{item.step}</span>
                              <div className="timeline-step-body">
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="guide-empty-copy">
                          No step-by-step instructions entered yet. Click Edit to add cues.
                        </p>
                      )}

                      {/* Breathing Strip */}
                      {activeExerciseDetail.execution?.breathing && (
                        <div className="guide-inline-callout breathing">
                          <Wind size={16} color="var(--sage)" />
                          <div>
                            <strong>Breathing</strong>
                            <p>{activeExerciseDetail.execution.breathing}</p>
                          </div>
                        </div>
                      )}

                      {/* Coach Cue Highlight */}
                      {activeExerciseDetail.execution?.proTip && (
                        <div className="guide-inline-callout coach-cue">
                          <Lightbulb size={16} color="var(--clay)" />
                          <div>
                            <strong>Coach Cue</strong>
                            <p>{activeExerciseDetail.execution.proTip}</p>
                          </div>
                        </div>
                      )}

                      {/* Common Mistakes Checklist */}
                      {activeExerciseDetail.execution?.commonMistakes?.length > 0 && (
                        <div className="guide-mistakes-block">
                          <div className="guide-mistakes-header">
                            <AlertTriangle size={15} color="var(--danger)" />
                            <span>Avoid These Common Mistakes</span>
                          </div>
                          <ul className="guide-mistakes-list">
                            {activeExerciseDetail.execution.commonMistakes.map((mis, i) => (
                              <li key={i}>{mis}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {detailTab === 'anatomy' && (
                    <div className="guide-panel animate-fade">
                      {/* Paired Visual Silhouette + Inline Muscle Chip Groups */}
                      <div className="guide-anatomy-hero">
                        <div className="guide-anatomy-bodymap" title="Target muscle highlight">
                          <MiniBodyMap
                            primaryKeys={activeExerciseDetail.muscleKey ? [activeExerciseDetail.muscleKey] : []}
                            secondaryKeys={activeExerciseDetail.secondaryKeys || []}
                            className="guide-mini-body"
                          />
                        </div>

                        <div className="guide-anatomy-summary">
                          <span className="anatomy-group-kicker">PRIMARY FOCUS</span>
                          <h3>{MUSCLE_LABELS[activeExerciseDetail.muscleKey] || activeExerciseDetail.muscleKey}</h3>
                          <p>
                            {detailUsesGear
                              ? `Loaded ${activeExerciseDetail.mechanics?.toLowerCase() || 'strength'} movement using ${activeExerciseDetail.equipment}.`
                              : 'Bodyweight movement requiring no external apparatus.'}
                          </p>
                        </div>
                      </div>

                      <div className="guide-muscle-groups-stack">
                        <div className="muscle-chip-section">
                          <span className="muscle-group-label primary">Primary Movers</span>
                          <div className="muscle-chips-wrap">
                            {(activeExerciseDetail.targetMuscles?.primary || []).length > 0 ? (
                              activeExerciseDetail.targetMuscles.primary.map((m, i) => (
                                <span key={i} className="muscle-token primary">{m}</span>
                              ))
                            ) : (
                              <span className="muscle-token primary">
                                {MUSCLE_LABELS[activeExerciseDetail.muscleKey] || 'General'}
                              </span>
                            )}
                          </div>
                        </div>

                        {(activeExerciseDetail.targetMuscles?.secondary || []).length > 0 && (
                          <div className="muscle-chip-section">
                            <span className="muscle-group-label secondary">Secondary Synergists</span>
                            <div className="muscle-chips-wrap">
                              {activeExerciseDetail.targetMuscles.secondary.map((m, i) => (
                                <span key={i} className="muscle-token secondary">{m}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {(activeExerciseDetail.targetMuscles?.stabilizers || []).length > 0 && (
                          <div className="muscle-chip-section">
                            <span className="muscle-group-label stabilizers">Stabilizers</span>
                            <div className="muscle-chips-wrap">
                              {activeExerciseDetail.targetMuscles.stabilizers.map((m, i) => (
                                <span key={i} className="muscle-token stabilizer">{m}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {detailTab === 'alternatives' && (
                    <div className="guide-panel animate-fade">
                      <div className="guide-alternatives-intro">
                        <span>
                          Exercises targeting <b>{MUSCLE_LABELS[activeExerciseDetail.muscleKey] || activeExerciseDetail.muscleKey}</b> if equipment is unavailable or you want a variation.
                        </span>
                      </div>

                      {detailAlternatives.length > 0 ? (
                        <div className="guide-alternatives-list">
                          {detailAlternatives.map((alt) => {
                            const altUsesGear = getRequiresEquipment(alt);
                            return (
                              <button
                                key={alt.id}
                                type="button"
                                className="guide-alt-card"
                                onClick={() => openExerciseDetail(alt)}
                              >
                                <div className="guide-alt-thumb">
                                  {alt.illustration ? (
                                    <img src={alt.illustration} alt={alt.name} loading="lazy" />
                                  ) : (
                                    <Dumbbell size={16} color="var(--dim)" />
                                  )}
                                </div>
                                <div className="guide-alt-info">
                                  <strong>{alt.name}</strong>
                                  <div className="guide-alt-meta">
                                    <span className={`db-equip-status-pill ${altUsesGear ? 'gear' : 'bodyweight'}`}>
                                      {altUsesGear ? (alt.equipment || 'Equipment') : 'Bodyweight'}
                                    </span>
                                    <span className="guide-alt-dot">·</span>
                                    <span>{alt.level || 'Intermediate'}</span>
                                  </div>
                                </div>
                                <ChevronRight size={16} className="guide-alt-arrow" />
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="guide-empty-copy">
                          No other exercises currently target this same primary muscle group in your library.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor / Creation Modal */}
      {(editingExercise || isCreatingExercise) && (
        <ExerciseEditorModal
          exercise={editingExercise}
          initialTab={editorInitialTab}
          onSave={handleSave}
          onClose={() => {
            setEditingExercise(null);
            setIsCreatingExercise(false);
            setEditorInitialTab('general');
          }}
        />
      )}

      {pendingDeleteExercise && (
        <ConfirmModal
          title="Delete Exercise"
          message={`Delete "${pendingDeleteExercise.name}" from your exercise library?`}
          confirmLabel="Delete Exercise"
          onConfirm={confirmDeleteExercise}
          onCancel={() => setPendingDeleteExercise(null)}
        />
      )}
    </div>
  );
}

export default ExerciseDatabaseView;
