import React, { useState } from 'react';
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
  Edit3
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

export function WorkoutOverviewView({ 
  workout, 
  exerciseDatabase = [],
  onBack, 
  onStartLive, 
  onUpdateWorkout, 
  onDeleteWorkout
}) {
  const [viewingExerciseGuide, setViewingExerciseGuide] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isEditingWorkoutMeta, setIsEditingWorkoutMeta] = useState(false);
  const [confirmState, setConfirmState] = useState(null);

  const supersetMap = getSupersetInfoMap(workout.exercises || []);

  const moveExercise = (index, delta) => {
    const newIdx = index + delta;
    if (newIdx < 0 || newIdx >= workout.exercises.length) return;
    const newExs = [...workout.exercises];
    const [moved] = newExs.splice(index, 1);
    newExs.splice(newIdx, 0, moved);
    onUpdateWorkout({
      ...workout,
      exercises: normalizeSupersetGroups(newExs)
    });
  };

  const handleToggleSupersetWithNext = (index) => {
    onUpdateWorkout({
      ...workout,
      exercises: toggleSupersetLinkWithNext(workout.exercises, index)
    });
  };

  const handleUnlinkSuperset = (index) => {
    onUpdateWorkout({
      ...workout,
      exercises: unlinkExerciseFromSuperset(workout.exercises, index)
    });
  };

  const handleUpdateExerciseSets = (index, nextSets) => {
    const clamped = Math.max(1, Math.min(10, Number(nextSets) || 3));
    onUpdateWorkout({
      ...workout,
      exercises: workout.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultSets: clamped } : ex
      )
    });
  };

  const handleStepRestSeconds = (index, deltaSeconds) => {
    const current = Number(workout.exercises[index]?.defaultRestSeconds) || 60;
    const nextVal = Math.max(15, Math.min(300, current + deltaSeconds));
    onUpdateWorkout({
      ...workout,
      exercises: workout.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultRestSeconds: nextVal, timerEnabled: true } : ex
      )
    });
  };

  const handleToggleTimer = (index) => {
    const current = workout.exercises[index];
    const currentlyEnabled = isRestTimerEnabledForExercise(current);
    onUpdateWorkout({
      ...workout,
      exercises: workout.exercises.map((ex, i) =>
        i === index
          ? {
              ...ex,
              timerEnabled: !currentlyEnabled,
              defaultRestSeconds: !currentlyEnabled ? (Number(ex.defaultRestSeconds) || 60) : 0
            }
          : ex
      )
    });
  };

  const REP_CYCLE_PRESETS = ['8-10', '10-12', '12-15', '15-20', '6-8', '30s', '45s', '60s'];

  const handleCycleReps = (index) => {
    const current = String(workout.exercises[index]?.defaultReps || '').trim();
    const foundIdx = REP_CYCLE_PRESETS.indexOf(current);
    const nextReps = foundIdx >= 0 && foundIdx < REP_CYCLE_PRESETS.length - 1
      ? REP_CYCLE_PRESETS[foundIdx + 1]
      : REP_CYCLE_PRESETS[0];
    onUpdateWorkout({
      ...workout,
      exercises: workout.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultReps: nextReps } : ex
      )
    });
  };

  const handleUpdateExerciseDropSets = (index, nextCount) => {
    const clamped = Math.max(0, Math.min(5, Number(nextCount) || 0));
    onUpdateWorkout({
      ...workout,
      exercises: workout.exercises.map((ex, i) =>
        i === index ? { ...ex, defaultDropSets: clamped } : ex
      )
    });
  };

  const removeExercise = (index) => {
    const target = workout.exercises[index];
    setConfirmState({
      title: 'Remove Exercise?',
      message: `Remove "${target?.name || 'this exercise'}" from ${workout.title}? It will remain in your Exercise Library.`,
      confirmLabel: 'Remove',
      onConfirm: () => {
        const newExs = normalizeSupersetGroups(workout.exercises.filter((_, i) => i !== index));
        onUpdateWorkout({
          ...workout,
          exercises: newExs
        });
        setConfirmState(null);
      }
    });
  };

  const buildUniqueWorkoutExercise = (exerciseData) => {
    const alreadyExists = workout.exercises.some(ex => ex.id === exerciseData.id);
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
    onUpdateWorkout({
      ...workout,
      exercises: insertExerciseByPhase(workout.exercises, instance)
    });
    setIsPickerOpen(false);
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
    new Set((workout.exercises || []).map((ex) => ex.muscleKey).filter(Boolean))
  );
  const routineSecondaryMuscles = Array.from(
    new Set((workout.exercises || []).flatMap((ex) => ex.secondaryKeys || []).filter(Boolean))
  );

  return (
    <div className="gymmane-overview-view">
      <div className="gymmane-wrap">
        {/* Navigation Breadcrumb */}
        <div className="overview-nav-bar">
          <button type="button" className="overview-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Workout Hero Summary */}
        <div className="overview-hero-card">
          <div className="overview-hero-main">
            <div className="overview-hero-copy">
              <div className="hero-meta-strip">
                <span className="overview-category-badge">{workout.category}</span>
                <span className="overview-diff-badge">{workout.difficulty || 'All Levels'}</span>
              </div>

              <h1 className="overview-title-loud">{workout.title}</h1>
              {workout.description && (
                <p className="overview-description-text">{workout.description}</p>
              )}
            </div>

            {workout.exercises.length > 0 && (
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
                <span>~{workout.durationMinutes} min</span>
              </div>
              <div className="quick-stat-pill">
                <Layers size={14} color="var(--clay)" />
                <span>{workout.exercises.length} {workout.exercises.length === 1 ? 'exercise' : 'exercises'}</span>
              </div>

              <div className="quick-meta-actions">
                <button
                  type="button"
                  className="quick-edit-workout-meta-btn"
                  onClick={() => setIsEditingWorkoutMeta(true)}
                >
                  <Edit3 size={13} />
                  <span>Edit details</span>
                </button>
                {onDeleteWorkout && (
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

            <button
              type="button"
              className="btn-gymmane-primary big-cta"
              disabled={workout.exercises.length === 0}
              title={workout.exercises.length === 0 ? 'Add at least one exercise to start' : 'Start guided session'}
              onClick={() => onStartLive(0)}
            >
              <Play size={15} fill="currentColor" />
              <span>Start Workout</span>
            </button>
          </div>
        </div>

        {/* Exercises Section Header */}
        <div className="overview-timeline-heading-row">
          <div>
            <h2 className="timeline-title">Workout Exercises ({workout.exercises.length})</h2>
            <p className="timeline-sub">
              Plan sets, drop sets, timers, or pair consecutive exercises as supersets before starting.
            </p>
          </div>

          <button 
            type="button" 
            className="btn-gymmane-primary"
            onClick={() => setIsPickerOpen(true)}
          >
            <Plus size={16} />
            <span>Add Exercise</span>
          </button>
        </div>

        {/* Exercises List */}
        {workout.exercises.length === 0 ? (
          <div className="empty-overview-exercises">
            <Dumbbell size={36} color="var(--faint)" />
            <p>This workout has no exercises yet. Add one from your library or create a new one!</p>
            <button 
              type="button" 
              className="btn-gymmane-primary"
              onClick={() => setIsPickerOpen(true)}
            >
              <Plus size={16} />
              <span>Add First Exercise</span>
            </button>
          </div>
        ) : (
          <div className="overview-exercises-timeline">
            {workout.exercises.map((exercise, idx) => {
              const primaryMuscle = MUSCLE_LABELS[exercise.muscleKey] || exercise.muscleKey;
              const isFirstWarmup = idx === 0 && exercise.isWarmup;
              const isFirstMain = !exercise.isWarmup && (idx === 0 || workout.exercises[idx - 1]?.isWarmup);
              const ssInfo = supersetMap.get(idx);
              const nextEx = workout.exercises[idx + 1];
              const canLinkWithNext = Boolean(nextEx) && Boolean(nextEx.isWarmup) === Boolean(exercise.isWarmup);
              const isLinkedWithNext = Boolean(
                canLinkWithNext &&
                exercise.supersetGroup &&
                exercise.supersetGroup === nextEx?.supersetGroup
              );
              const timerOn = isRestTimerEnabledForExercise(exercise);
              const dropCount = parseInt(exercise.defaultDropSets, 10) || 0;

              const renderRepsBadge = (reps) => {
                if (!reps) return null;
                const str = String(reps).trim();
                if (/reps?|\d\s*s\b|sec|secondi|\bmin\b/i.test(str)) {
                  return <span className="row-spec-badge">{str}</span>;
                }
                if (/per (gamba|lato|leg|side)|\/(lato|gamba|side|leg)/i.test(str)) {
                  const num = str.replace(/per (gamba|lato|leg|side)|\/(lato|gamba|side|leg)/gi, '').trim();
                  return (
                    <span className="row-spec-badge">
                      <b>{num}</b> reps/side
                    </span>
                  );
                }
                return (
                  <span className="row-spec-badge">
                    <b>{str}</b> reps
                  </span>
                );
              };

              return (
                <React.Fragment key={exercise.id || idx}>
                  {isFirstWarmup && (
                    <div className="workout-phase-divider warmup">
                      <span className="phase-pill">Warm-Up & Activation</span>
                    </div>
                  )}

                  {isFirstMain && (
                    <div className="workout-phase-divider main">
                      <span className="phase-pill">Main Workout</span>
                    </div>
                  )}

                  <div
                    className={`overview-exercise-row-card clean-text-card ${exercise.isWarmup ? 'warmup-row' : ''} ${ssInfo ? 'in-superset' : ''} ${ssInfo?.isFirst ? 'superset-start' : ''} ${ssInfo?.isLast ? 'superset-end' : ''}`}
                  >
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
                        {exercise.name}
                      </h3>
                      <p className="row-exercise-sub">{exercise.subtitle || exercise.scientificName}</p>

                      <div className="row-specs-strip">
                        {/* Sets Stepper */}
                        <div className="row-plan-param-stepper" role="group" aria-label={`Sets for ${exercise.name}`}>
                          <button
                            type="button"
                            className="param-step-btn"
                            disabled={(exercise.defaultSets || 3) <= 1}
                            onClick={() => handleUpdateExerciseSets(idx, (exercise.defaultSets || 3) - 1)}
                            title="Decrease sets"
                            aria-label="Decrease sets"
                          >
                            −
                          </button>
                          <span className="param-step-label">
                            <b>{exercise.defaultSets || 3}</b> sets
                          </span>
                          <button
                            type="button"
                            className="param-step-btn"
                            disabled={(exercise.defaultSets || 3) >= 10}
                            onClick={() => handleUpdateExerciseSets(idx, (exercise.defaultSets || 3) + 1)}
                            title="Increase sets"
                            aria-label="Increase sets"
                          >
                            +
                          </button>
                        </div>

                        {/* Reps Cycle Badge */}
                        <button
                          type="button"
                          className="row-spec-badge clickable-reps"
                          onClick={() => handleCycleReps(idx)}
                          title="Click to cycle rep target presets (8-10, 10-12, 12-15...)"
                        >
                          {renderRepsBadge(exercise.defaultReps)}
                        </button>

                        {/* Rest Timer Stepper */}
                        <div className="row-plan-param-stepper" role="group" aria-label={`Rest timer for ${exercise.name}`}>
                          <button
                            type="button"
                            className="param-step-btn"
                            disabled={!timerOn || (exercise.defaultRestSeconds || 60) <= 15}
                            onClick={() => handleStepRestSeconds(idx, -15)}
                            title="Decrease rest (-15s)"
                            aria-label="Decrease rest"
                          >
                            −
                          </button>
                          <button
                            type="button"
                            className={`param-step-label timer-toggle ${timerOn ? '' : 'is-untimed'}`}
                            onClick={() => handleToggleTimer(idx)}
                            title="Click to toggle timer On/Off"
                          >
                            <Clock size={11} />
                            {timerOn ? <b>{exercise.defaultRestSeconds || 60}s</b> : 'Untimed'}
                          </button>
                          <button
                            type="button"
                            className="param-step-btn"
                            disabled={!timerOn || (exercise.defaultRestSeconds || 60) >= 300}
                            onClick={() => handleStepRestSeconds(idx, +15)}
                            title="Increase rest (+15s)"
                            aria-label="Increase rest"
                          >
                            +
                          </button>
                        </div>

                        {/* Drop Sets Stepper */}
                        {dropCount > 0 ? (
                          <div className="row-plan-drop-stepper" role="group" aria-label={`Drop sets for ${exercise.name}`}>
                            <button
                              type="button"
                              className="drop-step-btn"
                              onClick={() => handleUpdateExerciseDropSets(idx, dropCount - 1)}
                              title="Remove 1 drop set"
                              aria-label={`Decrease drop sets for ${exercise.name}`}
                            >
                              −
                            </button>
                            <span className="drop-step-label">
                              <Flame size={11} />
                              <b>+{dropCount}</b> drop {dropCount === 1 ? 'set' : 'sets'}
                            </span>
                            <button
                              type="button"
                              className="drop-step-btn"
                              disabled={dropCount >= 5}
                              onClick={() => handleUpdateExerciseDropSets(idx, dropCount + 1)}
                              title="Add 1 more drop set (max 5)"
                              aria-label={`Increase drop sets for ${exercise.name}`}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="row-plan-pill-btn dropset"
                            onClick={() => handleUpdateExerciseDropSets(idx, 1)}
                            title="Plan a Drop Set after the working sets"
                          >
                            <Flame size={11} />
                            <span>+ Drop Set</span>
                          </button>
                        )}
                        {canLinkWithNext && !isLinkedWithNext && (
                          <button
                            type="button"
                            className="row-plan-pill-btn superset"
                            onClick={() => handleToggleSupersetWithNext(idx)}
                            title={`Pair "${exercise.name}" with next exercise "${nextEx.name}" as a Superset`}
                          >
                            <Link2 size={11} />
                            <span>Pair Superset</span>
                          </button>
                        )}
                        {isLinkedWithNext && (
                          <button
                            type="button"
                            className="row-plan-pill-btn superset active"
                            onClick={() => handleToggleSupersetWithNext(idx)}
                            title={`Unpair "${nextEx.name}" from Superset ${ssInfo?.letter || ''}`}
                          >
                            <Unlink2 size={11} />
                            <span>Unpair {ssInfo?.letter || 'Superset'}</span>
                          </button>
                        )}
                        {ssInfo && !isLinkedWithNext && (
                          <button
                            type="button"
                            className="row-plan-pill-btn superset active"
                            onClick={() => handleUnlinkSuperset(idx)}
                            title={`Remove "${exercise.name}" from ${ssInfo.label}`}
                          >
                            <Unlink2 size={11} />
                            <span>Leave {ssInfo.label}</span>
                          </button>
                        )}
                        {exercise.lastRecord && (
                          <span className="row-spec-record">Record: <b>{exercise.lastRecord}</b></span>
                        )}
                      </div>
                    </div>

                    <div className="row-actions-group">
                      <div className="reorder-btns-box">
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
                          disabled={idx === workout.exercises.length - 1}
                          onClick={() => moveExercise(idx, 1)}
                          title="Move down"
                          className="btn-reorder-item"
                          aria-label="Move down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>

                      <div className="crud-actions-box">
                        <button 
                          type="button"
                          className="row-action-icon-btn guide-btn"
                          onClick={() => setViewingExerciseGuide(exercise)}
                          title="View exercise guide, anatomy and cues"
                        >
                          <BookOpen size={15} />
                        </button>

                        <button 
                          type="button"
                          className="row-action-icon-btn delete-btn"
                          onClick={() => removeExercise(idx)}
                          title="Remove exercise"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <button 
                        type="button"
                        className="btn-play-from-here"
                        onClick={() => onStartLive(idx)}
                        title="Start workout from this exercise"
                      >
                        <Play size={13} fill="currentColor" />
                        <span>Start</span>
                      </button>
                    </div>
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
          existingExercises={workout.exercises}
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
          workout={workout}
          onSave={(updatedWorkout) => {
            onUpdateWorkout(updatedWorkout);
            setIsEditingWorkoutMeta(false);
          }}
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
