import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  BookOpen, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  Layers, 
  Dumbbell, 
  Video,
  Link2,
  Unlink2,
  Flame,
  Edit3,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Trophy,
  Check,
  RotateCcw
} from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels';
import {
  getSupersetInfoMap,
  isRestTimerEnabledForExercise,
  insertExerciseByPhase,
  normalizeSupersetGroups,
  toggleSupersetLinkWithNext,
  unlinkExerciseFromSuperset
} from '../utils/workoutSets';
import { MiniBodyMap } from './MiniBodyMap';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { ExercisePickerModal } from './ExercisePickerModal';
import { WorkoutEditorModal } from './WorkoutEditorModal';
import { ConfirmModal } from './ConfirmModal';

const REP_PRESETS = ['6-8', '8-10', '10-12', '12-15', '15-20', '30s', '45s', '60s'];
const TIMER_PRESETS = [30, 45, 60, 90, 120, 180];

export function WorkoutOverviewView({ 
  workout, 
  exerciseDatabase = [],
  onBack, 
  onStartLive, 
  onUpdateWorkout, 
  onDeleteWorkout
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [draftWorkout, setDraftWorkout] = useState(workout);
  const [saveNotice, setSaveNotice] = useState(false);
  const [viewingExerciseGuide, setViewingExerciseGuide] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isEditingWorkoutMeta, setIsEditingWorkoutMeta] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  const handleEnterEditMode = () => {
    setDraftWorkout(workout);
    setIsEditMode(true);
  };

  // Check if draft has unsaved changes compared to committed workout
  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(draftWorkout) !== JSON.stringify(workout);
  }, [draftWorkout, workout]);

  const activeWorkout = isEditMode ? draftWorkout : workout;
  const supersetMap = getSupersetInfoMap(activeWorkout.exercises || []);

  const allExerciseKeys = (activeWorkout.exercises || []).map((ex, i) => ex.id || `ex-${i}`);
  const allExpanded = allExerciseKeys.length > 0 && allExerciseKeys.every((k) => expandedIds.has(k));

  const toggleExpandExercise = (exerciseKey) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(exerciseKey)) {
        next.delete(exerciseKey);
      } else {
        next.add(exerciseKey);
      }
      return next;
    });
  };

  const toggleAllInDepth = () => {
    if (allExpanded) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(allExerciseKeys));
    }
  };

  // Commit draft to persistent state and exit edit mode
  const handleSaveChanges = () => {
    onUpdateWorkout(draftWorkout);
    setIsEditMode(false);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 3200);
  };

  // Discard draft edits and return to saved workout
  const handleCancelEdit = () => {
    if (hasUnsavedChanges) {
      setConfirmState({
        title: 'Discard Unsaved Changes?',
        message: `Discard all modifications made to "${draftWorkout.title}" and restore the saved workout?`,
        confirmLabel: 'Discard Changes',
        onConfirm: () => {
          setDraftWorkout(workout);
          setIsEditMode(false);
          setConfirmState(null);
        }
      });
    } else {
      setIsEditMode(false);
    }
  };

  // Guard navigation if leaving while unsaved edits exist
  const handleBackGuarded = () => {
    if (isEditMode && hasUnsavedChanges) {
      setConfirmState({
        title: 'Discard Unsaved Changes?',
        message: 'You have unsaved changes in this workout. Leave without saving?',
        confirmLabel: 'Discard & Leave',
        onConfirm: () => {
          setConfirmState(null);
          onBack();
        }
      });
    } else {
      onBack();
    }
  };

  const moveExercise = (index, delta) => {
    const newIdx = index + delta;
    if (newIdx < 0 || newIdx >= draftWorkout.exercises.length) return;
    const newExs = [...draftWorkout.exercises];
    const [moved] = newExs.splice(index, 1);
    newExs.splice(newIdx, 0, moved);
    setDraftWorkout(prev => ({
      ...prev,
      exercises: normalizeSupersetGroups(newExs)
    }));
  };

  const handleToggleSupersetWithNext = (index) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: toggleSupersetLinkWithNext(prev.exercises, index)
    }));
  };

  const handleUnlinkSuperset = (index) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: unlinkExerciseFromSuperset(prev.exercises, index)
    }));
  };

  const handleUpdateExerciseSets = (index, nextSets) => {
    const clamped = Math.max(1, Math.min(10, Number(nextSets) || 3));
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultSets: clamped } : ex
      )
    }));
  };

  const handleSetExerciseReps = (index, repsValue) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultReps: repsValue } : ex
      )
    }));
  };

  const handleSetRestSeconds = (index, seconds) => {
    const val = Math.max(15, Math.min(300, Number(seconds) || 60));
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultRestSeconds: val, timerEnabled: true } : ex
      )
    }));
  };

  const handleStepRestSeconds = (index, deltaSeconds) => {
    const current = Number(draftWorkout.exercises[index]?.defaultRestSeconds) || 60;
    const nextVal = Math.max(15, Math.min(300, current + deltaSeconds));
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultRestSeconds: nextVal, timerEnabled: true } : ex
      )
    }));
  };

  const handleToggleTimer = (index) => {
    const current = draftWorkout.exercises[index];
    const currentlyEnabled = isRestTimerEnabledForExercise(current);
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index
          ? {
              ...ex,
              timerEnabled: !currentlyEnabled,
              defaultRestSeconds: !currentlyEnabled ? (Number(ex.defaultRestSeconds) || 60) : 0
            }
          : ex
      )
    }));
  };

  const handleUpdateExerciseDropSets = (index, nextCount) => {
    const clamped = Math.max(0, Math.min(5, Number(nextCount) || 0));
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultDropSets: clamped } : ex
      )
    }));
  };

  const removeExercise = (index) => {
    const target = draftWorkout.exercises[index];
    setConfirmState({
      title: 'Remove Exercise?',
      message: `Remove "${target?.name || 'this exercise'}" from this workout? You can still click Discard before saving.`,
      confirmLabel: 'Remove',
      onConfirm: () => {
        const newExs = normalizeSupersetGroups(draftWorkout.exercises.filter((_, i) => i !== index));
        setDraftWorkout(prev => ({
          ...prev,
          exercises: newExs
        }));
        setConfirmState(null);
      }
    });
  };

  const buildUniqueWorkoutExercise = (exerciseData) => {
    const alreadyExists = draftWorkout.exercises.some(ex => ex.id === exerciseData.id);
    return {
      ...exerciseData,
      sourceId: exerciseData.sourceId || exerciseData.id,
      id: alreadyExists ? `${exerciseData.id}-${Date.now()}` : exerciseData.id,
      phase: exerciseData.isWarmup ? 'warmup' : 'main',
      isWarmup: Boolean(exerciseData.isWarmup)
    };
  };

  const handlePickFromDatabase = (selectedExercise) => {
    const instance = buildUniqueWorkoutExercise(selectedExercise);
    setDraftWorkout(prev => ({
      ...prev,
      exercises: insertExerciseByPhase(prev.exercises, instance)
    }));
    setIsPickerOpen(false);
  };

  const handleSaveWorkoutMeta = (updatedMeta) => {
    if (isEditMode) {
      setDraftWorkout(prev => ({
        ...prev,
        ...updatedMeta
      }));
    } else {
      onUpdateWorkout({
        ...workout,
        ...updatedMeta
      });
      setSaveNotice(true);
      setTimeout(() => setSaveNotice(false), 3000);
    }
    setIsEditingWorkoutMeta(false);
  };

  const handleDeleteCurrentWorkout = () => {
    if (!onDeleteWorkout) return;
    setConfirmState({
      title: 'Delete Workout?',
      message: `Permanently delete "${workout.title}"? Your Exercise Library and workout history remain intact.`,
      confirmLabel: 'Delete Workout',
      onConfirm: () => {
        setConfirmState(null);
        onDeleteWorkout(workout.id);
      }
    });
  };

  const routinePrimaryMuscles = Array.from(
    new Set((activeWorkout.exercises || []).map((ex) => ex.muscleKey).filter(Boolean))
  );
  const routineSecondaryMuscles = Array.from(
    new Set((activeWorkout.exercises || []).flatMap((ex) => ex.secondaryKeys || []).filter(Boolean))
  );

  const formatRepsSummary = (reps) => {
    if (!reps) return '10 reps';
    const str = String(reps).trim();
    if (/reps?|\d\s*s\b|sec|secondi|\bmin\b/i.test(str)) {
      return str;
    }
    if (/per (gamba|lato|leg|side)|\/(lato|gamba|side|leg)/i.test(str)) {
      const num = str.replace(/per (gamba|lato|leg|side)|\/(lato|gamba|side|leg)/gi, '').trim();
      return `${num} reps/side`;
    }
    return `${str} reps`;
  };

  return (
    <div className="gymmane-overview-view">
      <div className="gymmane-wrap">
        {/* Navigation Bar / Mode Bar */}
        {!isEditMode ? (
          <div className="overview-nav-bar">
            <button type="button" className="overview-back-btn" onClick={handleBackGuarded}>
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>

            <div className="overview-nav-actions">
              {saveNotice && (
                <span className="save-toast-pill animate-fade">
                  <Check size={13} />
                  <span>Workout saved successfully</span>
                </span>
              )}

              <button
                type="button"
                className="btn-enter-edit-mode"
                onClick={handleEnterEditMode}
                title="Edit workout architecture, exercises, sets, reps, and timers"
              >
                <Edit3 size={14} />
                <span>Edit Workout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="workout-editor-action-strip animate-fade">
            <div className="editor-badge-group">
              <button 
                type="button" 
                className="editor-back-pill" 
                onClick={handleBackGuarded} 
                title="Back to home"
              >
                <ArrowLeft size={14} />
              </button>
              <span className="editor-mode-badge">
                <Edit3 size={13} />
                <span>EDITING WORKOUT</span>
              </span>
              {hasUnsavedChanges ? (
                <span className="editor-unsaved-badge">
                  <span className="unsaved-pulse-dot" />
                  Unsaved Changes
                </span>
              ) : (
                <span className="editor-synced-badge">
                  <Check size={12} />
                  No pending changes
                </span>
              )}
            </div>

            <div className="editor-btn-group">
              <button
                type="button"
                className="btn-discard-workout-edits"
                onClick={handleCancelEdit}
                title="Discard all pending changes"
              >
                <RotateCcw size={14} />
                <span>Discard</span>
              </button>

              <button
                type="button"
                className="btn-save-workout-edits"
                onClick={handleSaveChanges}
                disabled={!hasUnsavedChanges}
                title={hasUnsavedChanges ? 'Save changes to workout' : 'No changes to save'}
              >
                <Check size={15} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* Workout Hero Summary */}
        <div className="overview-hero-card">
          <div className="overview-hero-main">
            <div className="overview-hero-copy">
              <div className="hero-meta-strip">
                <span className="overview-category-badge">{activeWorkout.category}</span>
                <span className="overview-diff-badge">{activeWorkout.difficulty || 'All Levels'}</span>
                {isEditMode && (
                  <span className="hero-editing-tag">Draft Mode</span>
                )}
              </div>

              <h1 className="overview-title-loud">{activeWorkout.title}</h1>
              {activeWorkout.description && (
                <p className="overview-description-text">{activeWorkout.description}</p>
              )}
            </div>

            {activeWorkout.exercises.length > 0 && (
              <div className="overview-hero-bodymap">
                <MiniBodyMap
                  primaryKeys={routinePrimaryMuscles}
                  secondaryKeys={routineSecondaryMuscles}
                  className="overview-mini-body"
                />
              </div>
            )}
          </div>

          <div className="overview-quick-stats-row">
            <div className="overview-stats-pills">
              <div className="quick-stat-pill">
                <Clock size={14} color="var(--clay)" />
                <span>~{activeWorkout.durationMinutes} min</span>
              </div>
              <div className="quick-stat-pill">
                <Layers size={14} color="var(--clay)" />
                <span>{activeWorkout.exercises.length} {activeWorkout.exercises.length === 1 ? 'exercise' : 'exercises'}</span>
              </div>

              <div className="quick-meta-actions">
                <button
                  type="button"
                  className="quick-edit-workout-meta-btn"
                  onClick={() => setIsEditingWorkoutMeta(true)}
                  title="Edit title, description, category, and difficulty"
                >
                  <Edit3 size={13} />
                  <span>Edit details</span>
                </button>
                {onDeleteWorkout && !isEditMode && (
                  <button
                    type="button"
                    className="quick-delete-workout-btn"
                    onClick={handleDeleteCurrentWorkout}
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>

            <div className="overview-hero-cta-box">
              {!isEditMode ? (
                <button
                  type="button"
                  className="btn-gymmane-primary big-cta"
                  disabled={activeWorkout.exercises.length === 0}
                  title={activeWorkout.exercises.length === 0 ? 'Add at least one exercise to start' : 'Start guided session'}
                  onClick={() => onStartLive(0)}
                >
                  <Play size={15} fill="currentColor" />
                  <span>Start Workout</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-save-workout-edits big-cta"
                  onClick={handleSaveChanges}
                  disabled={!hasUnsavedChanges}
                  title={hasUnsavedChanges ? 'Save changes to workout' : 'No changes to save'}
                >
                  <Check size={16} />
                  <span>Save Changes</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Exercises Section Header */}
        <div className="overview-timeline-heading-row">
          <div>
            <h2 className="timeline-title">
              Workout Exercises ({activeWorkout.exercises.length})
            </h2>
            <p className="timeline-sub">
              {isEditMode 
                ? 'Editing mode active: adjust sets, target reps, recovery intervals, drop sets, or pair supersets, then click Save Changes.' 
                : 'Preview mode: view clean movement profiles and in-depth training architecture. Click "Edit Workout" to modify.'}
            </p>
          </div>

          <div className="overview-heading-actions">
            {activeWorkout.exercises.length > 0 && (
              <button
                type="button"
                className="btn-toggle-all-indepth"
                onClick={toggleAllInDepth}
                title={allExpanded ? 'Collapse all exercise details' : 'Expand all exercise details in-depth'}
              >
                {allExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{allExpanded ? 'Collapse All Details' : 'Expand All Details'}</span>
              </button>
            )}

            {isEditMode ? (
              <button 
                type="button" 
                className="btn-gymmane-primary"
                onClick={() => setIsPickerOpen(true)}
              >
                <Plus size={16} />
                <span>Add Exercise</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="btn-enter-edit-mode outline"
                onClick={handleEnterEditMode}
              >
                <Edit3 size={14} />
                <span>Edit Workout</span>
              </button>
            )}
          </div>
        </div>

        {/* Exercises List */}
        {activeWorkout.exercises.length === 0 ? (
          <div className="empty-overview-exercises">
            <Dumbbell size={36} color="var(--faint)" />
            <p>
              {isEditMode 
                ? 'This workout has no exercises yet. Add one from your library to start building your workout!'
                : 'This workout has no exercises yet. Click "Edit Workout" to add exercises from your library.'}
            </p>
            {isEditMode ? (
              <button 
                type="button" 
                className="btn-gymmane-primary"
                onClick={() => setIsPickerOpen(true)}
              >
                <Plus size={16} />
                <span>Add First Exercise</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="btn-enter-edit-mode"
                onClick={handleEnterEditMode}
              >
                <Edit3 size={15} />
                <span>Edit Workout</span>
              </button>
            )}
          </div>
        ) : (
          <div className="overview-exercises-timeline">
            {activeWorkout.exercises.map((exercise, idx) => {
              const primaryMuscle = MUSCLE_LABELS[exercise.muscleKey] || exercise.muscleKey;
              const isFirstWarmup = idx === 0 && exercise.isWarmup;
              const isFirstMain = !exercise.isWarmup && (idx === 0 || activeWorkout.exercises[idx - 1]?.isWarmup);
              const ssInfo = supersetMap.get(idx);
              const nextEx = activeWorkout.exercises[idx + 1];
              const canLinkWithNext = Boolean(nextEx) && Boolean(nextEx.isWarmup) === Boolean(exercise.isWarmup);
              const isLinkedWithNext = Boolean(
                canLinkWithNext &&
                exercise.supersetGroup &&
                exercise.supersetGroup === nextEx?.supersetGroup
              );
              const timerOn = isRestTimerEnabledForExercise(exercise);
              const dropCount = parseInt(exercise.defaultDropSets, 10) || 0;
              const exerciseKey = exercise.id || `ex-${idx}`;
              const isExpanded = expandedIds.has(exerciseKey);

              return (
                <React.Fragment key={exerciseKey}>
                  {isFirstWarmup && (
                    <div className="workout-phase-divider warmup">
                      <span className="phase-pill">Warm-Up &amp; Activation</span>
                    </div>
                  )}

                  {isFirstMain && (
                    <div className="workout-phase-divider main">
                      <span className="phase-pill">Main Workout</span>
                    </div>
                  )}

                  <div
                    className={`overview-exercise-row-card clean-text-card ${exercise.isWarmup ? 'warmup-row' : ''} ${ssInfo ? 'in-superset' : ''} ${ssInfo?.isFirst ? 'superset-start' : ''} ${ssInfo?.isLast ? 'superset-end' : ''} ${isExpanded ? 'is-expanded' : ''} ${isEditMode ? 'in-edit-mode' : ''}`}
                  >
                    {/* Main Row Line */}
                    <div className="row-card-main-line">
                      <div className="row-order-index">
                        <span>{ssInfo ? ssInfo.code : String(idx + 1).padStart(2, '0')}</span>
                      </div>

                      {(exercise.illustration || exercise.customVideoUrl) && (
                        <div 
                          className="row-media-thumb" 
                          onClick={() => setViewingExerciseGuide(exercise)}
                          title="View movement guide"
                        >
                          {exercise.illustration ? (
                            <img 
                              src={exercise.illustration} 
                              alt={exercise.name} 
                              className="row-thumb-img" 
                              loading="lazy" 
                            />
                          ) : (
                            <div className="row-thumb-placeholder has-video">
                              <Video size={16} color="var(--clay)" />
                              <span className="thumb-add-hint">VIDEO</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="row-exercise-content">
                        <div className="row-title-line">
                          {ssInfo && (
                            <span className="row-superset-pill">
                              <Link2 size={11} />
                              <span>{ssInfo.label}</span>
                            </span>
                          )}
                          {exercise.isWarmup && (
                            <span className="row-warmup-pill">Warm-Up</span>
                          )}
                          <span className="row-muscle-pill">{primaryMuscle}</span>
                          <span className="row-equipment-text">
                            <Dumbbell size={12} />
                            {exercise.equipment}
                          </span>
                        </div>

                        <h3 
                          className="row-exercise-name clickable-guide-title"
                          onClick={() => setViewingExerciseGuide(exercise)}
                          title="Click to view form guide and biomechanical cues"
                        >
                          <span>{exercise.name}</span>
                          <BookOpen size={13} className="guide-title-icon" aria-hidden="true" />
                        </h3>
                        <p className="row-exercise-sub">{exercise.subtitle || exercise.scientificName}</p>

                        {/* Clean High-Level Summary Badges Strip */}
                        <div className="row-clean-summary-strip">
                          <div className="summary-pill volume-pill" title="Planned Sets and Target Reps">
                            <Layers size={13} className="summary-pill-icon" />
                            <span><b>{exercise.defaultSets || 3} Sets</b> × {formatRepsSummary(exercise.defaultReps)}</span>
                          </div>

                          <div className={`summary-pill rest-pill ${timerOn ? '' : 'untimed'}`} title="Target Recovery Rest Interval">
                            <Clock size={13} className="summary-pill-icon" />
                            <span>{timerOn ? `${exercise.defaultRestSeconds || 60}s Rest` : 'Untimed'}</span>
                          </div>

                          {dropCount > 0 && (
                            <div className="summary-pill dropset-pill" title={`${dropCount} Planned Drop Set(s)`}>
                              <Flame size={13} className="summary-pill-icon" />
                              <span>+{dropCount} Drop {dropCount === 1 ? 'Set' : 'Sets'}</span>
                            </div>
                          )}

                          {ssInfo && (
                            <div className="summary-pill superset-pill" title={`Paired as Superset ${ssInfo.code}`}>
                              <Link2 size={13} className="summary-pill-icon" />
                              <span>Superset {ssInfo.code}</span>
                            </div>
                          )}

                          {exercise.lastRecord && (
                            <div className="summary-pill record-pill" title="Personal Record">
                              <Trophy size={13} className="summary-pill-icon" />
                              <span>Record: <b>{exercise.lastRecord}</b></span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row-actions-group">
                        <button
                          type="button"
                          className={`btn-indepth-pill ${isExpanded ? 'active' : ''}`}
                          onClick={() => toggleExpandExercise(exerciseKey)}
                          title={isExpanded ? 'Collapse in-depth workout prescription' : 'Expand in-depth sets, timing & pairing details'}
                          aria-expanded={isExpanded}
                        >
                          <SlidersHorizontal size={13} />
                          <span>In-Depth</span>
                          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>

                        {/* Edit Mode Reorder Buttons */}
                        {isEditMode && (
                          <div className="reorder-btns-box animate-fade">
                            <button 
                              type="button" 
                              disabled={idx === 0}
                              onClick={() => moveExercise(idx, -1)}
                              title="Move up"
                              className="btn-reorder-item"
                              aria-label="Move up"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button 
                              type="button" 
                              disabled={idx === activeWorkout.exercises.length - 1}
                              onClick={() => moveExercise(idx, 1)}
                              title="Move down"
                              className="btn-reorder-item"
                              aria-label="Move down"
                            >
                              <ArrowDown size={14} />
                            </button>
                          </div>
                        )}

                        <div className="crud-actions-box">
                          <button 
                            type="button"
                            className="row-action-icon-btn guide-btn"
                            onClick={() => setViewingExerciseGuide(exercise)}
                            title="View exercise guide, anatomy and cues"
                          >
                            <BookOpen size={15} />
                          </button>

                          {/* Edit Mode Delete Button */}
                          {isEditMode && (
                            <button 
                              type="button"
                              className="row-action-icon-btn delete-btn animate-fade"
                              onClick={() => removeExercise(idx)}
                              title="Remove exercise from workout"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>

                        {/* Preview Mode Start Button */}
                        {!isEditMode && (
                          <button 
                            type="button"
                            className="btn-play-from-here"
                            onClick={() => onStartLive(idx)}
                            title="Start workout from this exercise"
                          >
                            <Play size={13} fill="currentColor" />
                            <span>Start</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable In-Depth Training Architecture Sheet */}
                    {isExpanded && (
                      <div className="row-indepth-panel animate-fade">
                        {/* Section 1: Sets Architecture & Presets */}
                        <div className="indepth-sets-section">
                          <div className="indepth-section-header">
                            <div className="indepth-section-title">
                              <Layers size={15} color="var(--clay)" />
                              <h4>Sets Architecture &amp; Target Reps</h4>
                            </div>

                            {/* Set Count & Reps Controls (Active in Edit Mode, Read-Only in Preview Mode) */}
                            {isEditMode ? (
                              <div className="indepth-sets-controls animate-fade">
                                <div className="indepth-count-stepper" role="group" aria-label="Adjust total working sets">
                                  <span className="stepper-sublabel">Total Sets:</span>
                                  <button
                                    type="button"
                                    className="indepth-step-btn"
                                    disabled={(exercise.defaultSets || 3) <= 1}
                                    onClick={() => handleUpdateExerciseSets(idx, (exercise.defaultSets || 3) - 1)}
                                    title="Remove 1 set"
                                    aria-label="Remove 1 set"
                                  >
                                    −
                                  </button>
                                  <span className="indepth-step-count"><b>{exercise.defaultSets || 3}</b></span>
                                  <button
                                    type="button"
                                    className="indepth-step-btn"
                                    disabled={(exercise.defaultSets || 3) >= 10}
                                    onClick={() => handleUpdateExerciseSets(idx, (exercise.defaultSets || 3) + 1)}
                                    title="Add 1 set"
                                    aria-label="Add 1 set"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="indepth-rep-presets-row">
                                  <span className="presets-label">Target Reps:</span>
                                  <div className="rep-presets-chips">
                                    {REP_PRESETS.map((repOption) => {
                                      const isSelected = String(exercise.defaultReps || '').trim() === repOption;
                                      return (
                                        <button
                                          key={repOption}
                                          type="button"
                                          className={`rep-preset-chip ${isSelected ? 'active' : ''}`}
                                          onClick={() => handleSetExerciseReps(idx, repOption)}
                                          title={`Set target reps to ${repOption}`}
                                        >
                                          {repOption}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="indepth-sets-preview-badge">
                                <span className="preview-spec-tag">
                                  <b>{exercise.defaultSets || 3} Sets</b> planned · <b>{formatRepsSummary(exercise.defaultReps)}</b>
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Sets Architecture Table */}
                          <div className="indepth-sets-table-wrap">
                            <table className="indepth-sets-table">
                              <thead>
                                <tr>
                                  <th className="col-set">SET</th>
                                  <th className="col-phase">TYPE / PHASE</th>
                                  <th className="col-target">TARGET WORK</th>
                                  <th className="col-rest">RECOVERY REST</th>
                                  <th className="col-intent">LOAD INTENT &amp; RPE</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Array.from({ length: exercise.defaultSets || 3 }).map((_, sIdx) => {
                                  const setNum = sIdx + 1;
                                  const isFinalSet = setNum === (exercise.defaultSets || 3);
                                  const setPhaseName = exercise.isWarmup
                                    ? 'Warm-Up & Prime'
                                    : setNum === 1
                                    ? 'Working Set (Baseline)'
                                    : isFinalSet
                                    ? 'Working Set (Peak Output)'
                                    : 'Working Set (Progressive)';
                                  const setIntent = exercise.isWarmup
                                    ? 'RPE 5-6 · Establish neuromuscular motor pattern'
                                    : setNum === 1
                                    ? 'RPE 7-8 · Clean form & crisp bar velocity'
                                    : isFinalSet
                                    ? 'RPE 9-9.5 · Push near technical breakdown'
                                    : 'RPE 8-8.5 · Controlled eccentric cadence';

                                  return (
                                    <tr key={`set-${setNum}`} className="set-table-row">
                                      <td className="col-set">
                                        <span className="set-index-badge">#{String(setNum).padStart(2, '0')}</span>
                                      </td>
                                      <td className="col-phase">
                                        <span className="set-type-tag">{setPhaseName}</span>
                                      </td>
                                      <td className="col-target">
                                        <strong>{formatRepsSummary(exercise.defaultReps)}</strong>
                                      </td>
                                      <td className="col-rest">
                                        <span className="table-rest-cell">
                                          <Clock size={12} />
                                          {timerOn ? `${exercise.defaultRestSeconds || 60}s` : 'Untimed'}
                                        </span>
                                      </td>
                                      <td className="col-intent">
                                        <span className="table-intent-text">{setIntent}</span>
                                      </td>
                                    </tr>
                                  );
                                })}

                                {/* Drop Set Rows */}
                                {Array.from({ length: dropCount }).map((_, dIdx) => {
                                  const dropNum = dIdx + 1;
                                  const stripPct = dropNum === 1 ? '20%' : `${dropNum * 20}%`;
                                  return (
                                    <tr key={`drop-${dropNum}`} className="set-table-row dropset-row">
                                      <td className="col-set">
                                        <span className="set-index-badge dropset">
                                          <Flame size={11} /> DROP #{dropNum}
                                        </span>
                                      </td>
                                      <td className="col-phase">
                                        <span className="set-type-tag dropset">Drop Set (Immediate AMRAP)</span>
                                      </td>
                                      <td className="col-target">
                                        <strong className="dropset-target-text">To Technical Failure</strong>
                                      </td>
                                      <td className="col-rest">
                                        <span className="table-rest-cell dropset">
                                          <b>0s Rest</b> (Strip −{stripPct} load)
                                        </span>
                                      </td>
                                      <td className="col-intent">
                                        <span className="table-intent-text dropset">
                                          Hypertrophic metabolic stress &amp; recruitment of high-threshold motor units
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Section 2: Controls Hub Grid */}
                        <div className="indepth-controls-grid">
                          {/* Card 1: Rest Timer Hub */}
                          <div className="indepth-hub-card timer-card">
                            <div className="hub-card-header">
                              <div className="hub-header-title">
                                <Clock size={15} color="var(--clay)" />
                                <h5>Rest Interval &amp; Recovery</h5>
                              </div>
                              {isEditMode ? (
                                <button
                                  type="button"
                                  className={`timer-state-toggle-pill ${timerOn ? 'on' : 'off'}`}
                                  onClick={() => handleToggleTimer(idx)}
                                  title="Toggle Rest Timer"
                                >
                                  {timerOn ? 'Timer Active' : 'Untimed'}
                                </button>
                              ) : (
                                <span className={`timer-state-badge ${timerOn ? 'on' : 'off'}`}>
                                  {timerOn ? `${exercise.defaultRestSeconds || 60}s Active` : 'Untimed'}
                                </span>
                              )}
                            </div>

                            <div className="hub-card-body">
                              {isEditMode ? (
                                <>
                                  <div className="hub-timer-presets-row">
                                    {TIMER_PRESETS.map((seconds) => {
                                      const isCur = timerOn && (Number(exercise.defaultRestSeconds) || 60) === seconds;
                                      const label = seconds >= 60 && seconds % 60 === 0 ? `${seconds / 60}m` : `${seconds}s`;
                                      return (
                                        <button
                                          key={seconds}
                                          type="button"
                                          className={`timer-preset-chip ${isCur ? 'active' : ''}`}
                                          onClick={() => handleSetRestSeconds(idx, seconds)}
                                          title={`Set rest interval to ${seconds} seconds`}
                                        >
                                          {label}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  <div className="hub-timer-fine-stepper">
                                    <span className="stepper-helper-label">Fine Adjust:</span>
                                    <div className="stepper-btns-unit">
                                      <button
                                        type="button"
                                        className="fine-step-btn"
                                        disabled={!timerOn || (exercise.defaultRestSeconds || 60) <= 15}
                                        onClick={() => handleStepRestSeconds(idx, -15)}
                                        title="Decrease rest by 15s"
                                      >
                                        −15s
                                      </button>
                                      <span className="fine-step-value">
                                        <b>{timerOn ? `${exercise.defaultRestSeconds || 60}s` : 'Untimed'}</b>
                                      </span>
                                      <button
                                        type="button"
                                        className="fine-step-btn"
                                        disabled={!timerOn || (exercise.defaultRestSeconds || 60) >= 300}
                                        onClick={() => handleStepRestSeconds(idx, 15)}
                                        title="Increase rest by 15s"
                                      >
                                        +15s
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="hub-preview-summary-box">
                                  <p className="hub-preview-val">
                                    Target Rest: <b>{timerOn ? `${exercise.defaultRestSeconds || 60} seconds` : 'Untimed (Self-paced)'}</b>
                                  </p>
                                  <p className="hub-explainer-text">
                                    Rest intervals allow phosphocreatine replenishment to maintain intra-set power and muscle recruitment.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card 2: Drop Sets Protocol */}
                          <div className="indepth-hub-card dropset-card">
                            <div className="hub-card-header">
                              <div className="hub-header-title">
                                <Flame size={15} color="var(--ember)" />
                                <h5>Drop Set Architecture</h5>
                              </div>
                              <span className="hub-status-pill ember">
                                {dropCount === 0 ? 'No Drop Set' : `+${dropCount} Drop ${dropCount === 1 ? 'Set' : 'Sets'}`}
                              </span>
                            </div>

                            <div className="hub-card-body">
                              {isEditMode ? (
                                <>
                                  <div className="dropset-options-row">
                                    {[0, 1, 2, 3].map((count) => {
                                      const isSel = dropCount === count;
                                      return (
                                        <button
                                          key={count}
                                          type="button"
                                          className={`dropset-option-chip ${isSel ? 'active' : ''}`}
                                          onClick={() => handleUpdateExerciseDropSets(idx, count)}
                                          title={count === 0 ? 'Disable drop set' : `Plan ${count} drop set(s)`}
                                        >
                                          {count === 0 ? 'None' : `+${count} Drop`}
                                        </button>
                                      );
                                    })}
                                  </div>

                                  <p className="hub-explainer-text">
                                    Perform immediately following the final set. Strip ~20% load and take to failure without recovery rest.
                                  </p>
                                </>
                              ) : (
                                <div className="hub-preview-summary-box">
                                  <p className="hub-preview-val">
                                    {dropCount > 0 ? (
                                      <span><b>+{dropCount} Drop {dropCount === 1 ? 'Set' : 'Sets'}</b> scheduled post final working set</span>
                                    ) : (
                                      <span>Standard sets only · No drop set configured</span>
                                    )}
                                  </p>
                                  <p className="hub-explainer-text">
                                    Drop sets extend time-under-tension beyond voluntary failure to trigger maximal mechanical tension and metabolic pump.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card 3: Superset Pairing */}
                          <div className="indepth-hub-card superset-card">
                            <div className="hub-card-header">
                              <div className="hub-header-title">
                                <Link2 size={15} color="var(--sage)" />
                                <h5>Superset Circuit Pairing</h5>
                              </div>
                              <span className={`hub-status-pill ${ssInfo ? 'sage' : 'neutral'}`}>
                                {ssInfo ? ssInfo.label : 'Standard Linear'}
                              </span>
                            </div>

                            <div className="hub-card-body">
                              {isEditMode ? (
                                <>
                                  <div className="superset-actions-wrap">
                                    {canLinkWithNext && !isLinkedWithNext && (
                                      <button
                                        type="button"
                                        className="btn-superset-hub-action pair"
                                        onClick={() => handleToggleSupersetWithNext(idx)}
                                      >
                                        <Link2 size={13} />
                                        <span>Pair with Next: <b>{nextEx.name}</b></span>
                                      </button>
                                    )}

                                    {isLinkedWithNext && (
                                      <button
                                        type="button"
                                        className="btn-superset-hub-action unpair active"
                                        onClick={() => handleToggleSupersetWithNext(idx)}
                                      >
                                        <Unlink2 size={13} />
                                        <span>Unpair from <b>{nextEx.name}</b></span>
                                      </button>
                                    )}

                                    {ssInfo && !isLinkedWithNext && (
                                      <button
                                        type="button"
                                        className="btn-superset-hub-action unpair active"
                                        onClick={() => handleUnlinkSuperset(idx)}
                                      >
                                        <Unlink2 size={13} />
                                        <span>Leave {ssInfo.label}</span>
                                      </button>
                                    )}

                                    {!canLinkWithNext && !ssInfo && (
                                      <span className="superset-na-note">
                                        Add another exercise in this phase to pair a superset circuit.
                                      </span>
                                    )}
                                  </div>

                                  <p className="hub-explainer-text">
                                    Paired exercises run back-to-back with 0s rest. Recovery timer triggers after completing both exercises.
                                  </p>
                                </>
                              ) : (
                                <div className="hub-preview-summary-box">
                                  <p className="hub-preview-val">
                                    {ssInfo ? (
                                      <span><b>Superset {ssInfo.code}</b> active · Back-to-back execution</span>
                                    ) : (
                                      <span>Standard linear sequence · Dedicated rest interval</span>
                                    )}
                                  </p>
                                  <p className="hub-explainer-text">
                                    Supersets boost cardiovascular conditioning and training density without sacrificing working load.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Subtle hint when viewing in preview mode */}
                        {!isEditMode && (
                          <div className="preview-edit-mode-hint">
                            <SlidersHorizontal size={13} />
                            <span>Preview Mode · Click <b>Edit Workout</b> at the top to customize sets, reps, timers, or pairings.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Exercise Picker Modal (Database) */}
      {isPickerOpen && (
        <ExercisePickerModal
          exerciseDatabase={exerciseDatabase}
          existingExercises={activeWorkout.exercises}
          onSelectExercise={handlePickFromDatabase}
          onClose={() => setIsPickerOpen(false)}
        />
      )}

      {/* Flagship Read-Only Exercise Guide Modal */}
      {viewingExerciseGuide && (
        <ExerciseDetailModal
          exercise={viewingExerciseGuide}
          onClose={() => setViewingExerciseGuide(null)}
        />
      )}

      {/* Workout Meta Editor Modal */}
      {isEditingWorkoutMeta && (
        <WorkoutEditorModal 
          workout={activeWorkout}
          onSave={handleSaveWorkoutMeta}
          onClose={() => setIsEditingWorkoutMeta(false)}
        />
      )}

      {confirmState && (
        <ConfirmModal
          title={confirmState.title}
          message={confirmState.message}
          confirmLabel={confirmState.confirmLabel}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState(null)}
        />
      )}
    </div>
  );
}
