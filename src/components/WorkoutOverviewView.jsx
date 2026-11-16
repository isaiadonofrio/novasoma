import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Plus, 
  Trash2, 
  Clock, 
  Layers, 
  Dumbbell, 
  Link2,
  Edit3,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Check,
  RotateCcw,
  Unlink,
  ArrowDownUp
} from 'lucide-react';
import {
  dropExerciseInRoutine,
  getSupersetInfoMap,
  isRestTimerEnabledForExercise,
  insertExerciseByPhase,
  normalizeSupersetGroups,
  reorderExerciseInRoutine,
  toggleSupersetLinkWithNext,
  unlinkExerciseFromSuperset,
  unlinkSupersetGroup
} from '../utils/workoutSets';
import { MiniBodyMap } from './MiniBodyMap';
import { ExerciseDetailModal } from './ExerciseDetailModal';
import { ExercisePickerModal } from './ExercisePickerModal';
import { WorkoutEditorModal } from './WorkoutEditorModal';
import { ConfirmModal } from './ConfirmModal';
import { OverviewExerciseRow } from './overview/OverviewExerciseRow';
import { SAVE_NOTICE_TIMEOUT_MS } from '../utils/constants';

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
  const saveNoticeTimerRef = useRef(null);
  const [viewingExerciseGuide, setViewingExerciseGuide] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isEditingWorkoutMeta, setIsEditingWorkoutMeta] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const triggerSaveNotice = () => {
    setSaveNotice(true);
    if (saveNoticeTimerRef.current) {
      clearTimeout(saveNoticeTimerRef.current);
    }
    saveNoticeTimerRef.current = setTimeout(() => {
      setSaveNotice(false);
      saveNoticeTimerRef.current = null;
    }, SAVE_NOTICE_TIMEOUT_MS);
  };

  useEffect(() => {
    return () => {
      if (saveNoticeTimerRef.current) {
        clearTimeout(saveNoticeTimerRef.current);
      }
    };
  }, []);

  const handleEnterEditMode = () => {
    setDraftWorkout(workout);
    setIsEditMode(true);
  };

  // Check if draft has unsaved changes compared to committed workout
  const hasUnsavedChanges = useMemo(() => {
    if (!isEditMode) return false;
    return JSON.stringify(draftWorkout) !== JSON.stringify(workout);
  }, [isEditMode, draftWorkout, workout]);

  const activeWorkout = isEditMode ? draftWorkout : workout;
  const supersetMap = getSupersetInfoMap(activeWorkout.exercises || []);

  const timelineGroups = useMemo(() => {
    const groups = [];
    const exercises = activeWorkout.exercises || [];
    let i = 0;
    while (i < exercises.length) {
      const ex = exercises[i];
      const ssInfo = supersetMap.get(i);
      if (ssInfo && ssInfo.isFirst) {
        const groupId = ssInfo.groupId;
        const members = [];
        while (i < exercises.length && exercises[i]?.supersetGroup === groupId) {
          members.push({
            exercise: exercises[i],
            index: i,
            ssInfo: supersetMap.get(i)
          });
          i++;
        }
        groups.push({
          type: 'superset',
          groupId,
          letter: ssInfo.letter,
          rangeLabel: ssInfo.rangeLabel,
          label: ssInfo.label,
          isWarmup: Boolean(ex.isWarmup),
          members
        });
      } else {
        groups.push({
          type: 'single',
          exercise: ex,
          index: i,
          isWarmup: Boolean(ex.isWarmup)
        });
        i++;
      }
    }
    return groups;
  }, [activeWorkout.exercises, supersetMap]);

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
    triggerSaveNotice();
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
    setDraftWorkout(prev => ({
      ...prev,
      exercises: reorderExerciseInRoutine(prev.exercises, index, delta)
    }));
  };

  const handleDropExercise = (sourceIdx, targetIdx) => {
    if (sourceIdx === null || targetIdx === null || sourceIdx === targetIdx) return;
    setDraftWorkout(prev => ({
      ...prev,
      exercises: dropExerciseInRoutine(prev.exercises, sourceIdx, targetIdx)
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

  const handleBreakCircuit = (groupId) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: unlinkSupersetGroup(prev.exercises, groupId)
    }));
  };

  const handleUpdateExerciseSets = (index, nextSets) => {
    const clamped = Math.max(1, Math.min(10, Number(nextSets) || 3));
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => {
        if (i !== index) return ex;
        let repsList = Array.isArray(ex.customRepsPerSet) ? [...ex.customRepsPerSet] : null;
        if (repsList) {
          if (repsList.length < clamped) {
            while (repsList.length < clamped) {
              repsList.push(ex.defaultReps || '10');
            }
          } else if (repsList.length > clamped) {
            repsList = repsList.slice(0, clamped);
          }
        }
        return { ...ex, defaultSets: clamped, customRepsPerSet: repsList };
      })
    }));
  };

  const handleRemoveSpecificSet = (index, setIdx) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => {
        if (i !== index) return ex;
        const currentSets = ex.defaultSets || 3;
        if (currentSets <= 1) return ex;
        const newCount = currentSets - 1;
        let repsList = Array.isArray(ex.customRepsPerSet)
          ? [...ex.customRepsPerSet]
          : Array.from({ length: currentSets }, () => ex.defaultReps || '10');
        repsList.splice(setIdx, 1);
        let intentsList = Array.isArray(ex.customIntentsPerSet) ? [...ex.customIntentsPerSet] : null;
        if (intentsList) {
          intentsList.splice(setIdx, 1);
        }
        return {
          ...ex,
          defaultSets: newCount,
          defaultReps: repsList[0] || ex.defaultReps,
          customRepsPerSet: repsList,
          customIntentsPerSet: intentsList
        };
      })
    }));
  };

  const handleSetRowReps = (index, setIdx, repsValue) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => {
        if (i !== index) return ex;
        const totalSets = ex.defaultSets || 3;
        const list = Array.isArray(ex.customRepsPerSet) && ex.customRepsPerSet.length === totalSets
          ? [...ex.customRepsPerSet]
          : Array.from({ length: totalSets }, () => ex.defaultReps || '10');
        list[setIdx] = repsValue;
        return {
          ...ex,
          defaultReps: setIdx === 0 ? repsValue : ex.defaultReps,
          customRepsPerSet: list
        };
      })
    }));
  };

  const handleSetAllRowsReps = (index, repsValue) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => {
        if (i !== index) return ex;
        const totalSets = ex.defaultSets || 3;
        return {
          ...ex,
          defaultReps: repsValue,
          customRepsPerSet: Array.from({ length: totalSets }, () => repsValue)
        };
      })
    }));
  };

  const handleSetRowIntent = (index, setIdx, intentValue) => {
    setDraftWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => {
        if (i !== index) return ex;
        const totalSets = ex.defaultSets || 3;
        const list = Array.isArray(ex.customIntentsPerSet) && ex.customIntentsPerSet.length === totalSets
          ? [...ex.customIntentsPerSet]
          : Array.from({ length: totalSets }, (_, s) => {
              const num = s + 1;
              const isFinal = num === totalSets;
              return ex.isWarmup
                ? 'RPE 5-6 · Establish neuromuscular motor pattern'
                : num === 1
                ? 'RPE 7-8 · Clean form & crisp bar velocity'
                : isFinal
                ? 'RPE 9-9.5 · Push near technical breakdown'
                : 'RPE 8-8.5 · Controlled eccentric cadence';
            });
        list[setIdx] = intentValue;
        return {
          ...ex,
          customIntentsPerSet: list
        };
      })
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
      const nextWorkout = {
        ...workout,
        ...updatedMeta
      };
      onUpdateWorkout(nextWorkout);
      setDraftWorkout(nextWorkout);
      triggerSaveNotice();
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

  const formatRepsSummary = (reps, customList = null) => {
    if (Array.isArray(customList) && customList.length > 0) {
      const unique = Array.from(new Set(customList.map(r => String(r || '').trim())));
      if (unique.length === 1) {
        return formatRepsSummary(unique[0]);
      }
      return unique.join(' · ');
    }
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

  const renderExerciseCard = (exercise, idx, ssInfo = null) => {
    const exerciseKey = exercise.id || `ex-${idx}`;
    return (
      <OverviewExerciseRow
        key={exerciseKey}
        exercise={exercise}
        idx={idx}
        ssInfo={ssInfo}
        totalExercises={activeWorkout.exercises.length}
        nextExercise={activeWorkout.exercises[idx + 1]}
        isEditMode={isEditMode}
        isExpanded={expandedIds.has(exerciseKey)}
        draggedIdx={draggedIdx}
        dragOverIdx={dragOverIdx}
        onSetDraggedIdx={setDraggedIdx}
        onSetDragOverIdx={setDragOverIdx}
        onDropExercise={handleDropExercise}
        onMoveExercise={moveExercise}
        onViewGuide={setViewingExerciseGuide}
        onToggleExpand={toggleExpandExercise}
        onToggleSupersetWithNext={handleToggleSupersetWithNext}
        onUnlinkSuperset={handleUnlinkSuperset}
        onRemoveExercise={removeExercise}
        onStartLive={onStartLive}
        onEnterEditMode={handleEnterEditMode}
        onRemoveSpecificSet={handleRemoveSpecificSet}
        onSetRowReps={handleSetRowReps}
        onStepRestSeconds={handleStepRestSeconds}
        onToggleTimer={handleToggleTimer}
        onSetRowIntent={handleSetRowIntent}
        onUpdateExerciseDropSets={handleUpdateExerciseDropSets}
        onUpdateExerciseSets={handleUpdateExerciseSets}
        onSetAllRowsReps={handleSetAllRowsReps}
        formatRepsSummary={formatRepsSummary}
      />
    );
  };

  return (
    <div className="gymmane-overview-view">
      <div className="gymmane-wrap">
        {/* Navigation Bar / Mode Bar */}
        {!isEditMode && !hasUnsavedChanges ? (
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
                <SlidersHorizontal size={13} />
                <span>ROUTINE BUILDER</span>
              </span>
              {hasUnsavedChanges ? (
                <span className="editor-unsaved-badge">
                  <span className="unsaved-pulse-dot" />
                  Unsaved Changes
                </span>
              ) : (
                <span className="editor-synced-badge">
                  <Check size={12} />
                  Synced
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
                {hasUnsavedChanges ? (
                  <span className="hero-editing-tag unsaved">● Unsaved Edits</span>
                ) : isEditMode ? (
                  <span className="hero-editing-tag">Manage Mode</span>
                ) : null}
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
                  <span>Edit Info</span>
                </button>
                {onDeleteWorkout && (
                  <button
                    type="button"
                    className="quick-delete-workout-btn"
                    onClick={handleDeleteCurrentWorkout}
                    title="Delete routine"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>

            <div className="overview-hero-cta-box">
              <button
                type="button"
                className="btn-gymmane-primary big-cta"
                disabled={activeWorkout.exercises.length === 0}
                title={activeWorkout.exercises.length === 0 ? 'Add at least one exercise to start' : 'Start guided session'}
                onClick={() => {
                  if (hasUnsavedChanges) {
                    onUpdateWorkout(draftWorkout);
                  }
                  onStartLive(0);
                }}
              >
                <Play size={15} fill="currentColor" />
                <span>Start Workout</span>
              </button>
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
                ? 'Managing exercises: drag or tap arrows to reorder, pair supersets, remove exercises, and customize sets & reps in-table.' 
                : 'Preview mode: view movement profiles, expand in-depth architecture to customize sets and reps, or reorder.'}
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

            {activeWorkout.exercises.length > 0 && (
              <button 
                type="button" 
                className={`btn-reorder-manage-toggle ${isEditMode ? 'active' : ''}`}
                onClick={() => {
                  if (!isEditMode) {
                    handleEnterEditMode();
                  } else {
                    setIsEditMode(false);
                  }
                }}
                title={isEditMode ? 'Exit reordering mode' : 'Reorder exercises, pair supersets, and manage routine'}
              >
                <SlidersHorizontal size={13} />
                <span>{isEditMode ? 'Done Managing' : 'Reorder & Manage'}</span>
              </button>
            )}

            <button 
              type="button" 
              className="btn-gymmane-primary btn-add-exercise-direct"
              onClick={() => {
                if (!isEditMode) handleEnterEditMode();
                setIsPickerOpen(true);
              }}
              title="Add an exercise from your library"
            >
              <Plus size={15} />
              <span>Add Exercise</span>
            </button>
          </div>
        </div>

        {/* Exercises List */}
        {activeWorkout.exercises.length === 0 ? (
          <div className="empty-overview-exercises">
            <Dumbbell size={36} color="var(--faint)" />
            <p>
              This workout has no exercises yet. Add movements from your library to build this routine.
            </p>
            <button 
              type="button" 
              className="btn-gymmane-primary"
              onClick={() => {
                if (!isEditMode) handleEnterEditMode();
                setIsPickerOpen(true);
              }}
            >
              <Plus size={16} />
              <span>Add First Exercise</span>
            </button>
          </div>
        ) : (
          <div className="overview-exercises-timeline">
            {timelineGroups.map((group, groupIdx) => {
              const isFirstWarmup = groupIdx === 0 && group.isWarmup;
              const isFirstMain = !group.isWarmup && (groupIdx === 0 || timelineGroups[groupIdx - 1]?.isWarmup);

              if (group.type === 'single') {
                return (
                  <React.Fragment key={group.exercise.id || `single-${group.index}`}>
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
                    {renderExerciseCard(group.exercise, group.index, null)}
                  </React.Fragment>
                );
              }

              // Superset Circuit Capsule (Option A)
              const lastMember = group.members[group.members.length - 1];
              const circuitRestSecs = lastMember?.exercise?.defaultRestSeconds || 90;

              return (
                <React.Fragment key={`capsule-${group.groupId}`}>
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

                  <div className="timeline-superset-capsule animate-fade">
                    {/* Capsule Header */}
                    <div className="superset-capsule-header">
                      <div className="capsule-header-left">
                        <div className="capsule-badge-pill">
                          <Link2 size={13} className="capsule-link-icon" />
                          <span className="capsule-badge-text">SUPERSET {group.rangeLabel || group.letter}</span>
                        </div>
                        <div className="capsule-sub-info">
                          <span className="capsule-count-tag">{group.members.length} Movements · Alternate Rounds</span>
                          <span className="capsule-hint-text">
                            Perform {group.members.map((m) => `#${m.ssInfo?.code || m.index + 1}`).join(' then ')} back-to-back with 0s rest
                          </span>
                        </div>
                      </div>

                      {isEditMode && (
                        <button
                          type="button"
                          className="btn-break-superset-circuit"
                          onClick={() => handleBreakCircuit(group.groupId)}
                          title="Break this superset circuit into independent exercises"
                        >
                          <Unlink size={13} />
                          <span>Break Circuit</span>
                        </button>
                      )}
                    </div>

                    {/* Capsule Body */}
                    <div className="superset-capsule-body">
                      {group.members.map((member, memberIdx) => {
                        const isLastMember = memberIdx === group.members.length - 1;
                        return (
                          <React.Fragment key={member.exercise.id || `ss-ex-${member.index}`}>
                            {renderExerciseCard(member.exercise, member.index, member.ssInfo)}
                            {!isLastMember && (
                              <div className="superset-transition-divider">
                                <div className="transition-rule" />
                                <div className="transition-badge">
                                  <ArrowDownUp size={12} />
                                  <span>Immediate Transition · 0s Rest</span>
                                </div>
                                <div className="transition-rule" />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Capsule Footer */}
                    <div className="superset-capsule-footer">
                      <Clock size={12} />
                      <span>
                        Circuit Recovery: <b>{circuitRestSecs}s Rest</b> following round completion
                      </span>
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
          existingExercises={activeWorkout.exercises}
          onSelectExercise={handlePickFromDatabase}
          onClose={() => setIsPickerOpen(false)}
        />
      )}

      {/* Flagship Read-Only Exercise Guide Modal */}
      {viewingExerciseGuide && (
        <ExerciseDetailModal
          exercise={viewingExerciseGuide}
          allExercises={exerciseDatabase}
          onSelectExercise={setViewingExerciseGuide}
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
