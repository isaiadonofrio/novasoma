import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Dumbbell,
  Edit3,
  Flame,
  GripVertical,
  Layers,
  Link2,
  Play,
  Plus,
  SlidersHorizontal,
  Trash2,
  Trophy,
  Unlink,
  Video,
} from 'lucide-react';
import { MUSCLE_LABELS } from '../../data/muscleLabels';
import { isRestTimerEnabledForExercise } from '../../utils/workoutSets';

const REP_PRESETS = ['6-8', '8-10', '10-12', '12-15', '15-20', '30s', '45s', '60s'];

export function OverviewExerciseRow({
  exercise,
  idx,
  ssInfo = null,
  totalExercises,
  nextExercise,
  isEditMode,
  isExpanded,
  draggedIdx,
  dragOverIdx,
  onSetDraggedIdx,
  onSetDragOverIdx,
  onDropExercise,
  onMoveExercise,
  onViewGuide,
  onToggleExpand,
  onToggleSupersetWithNext,
  onUnlinkSuperset,
  onRemoveExercise,
  onStartLive,
  onEnterEditMode,
  onRemoveSpecificSet,
  onSetRowReps,
  onStepRestSeconds,
  onToggleTimer,
  onSetRowIntent,
  onUpdateExerciseDropSets,
  onUpdateExerciseSets,
  onSetAllRowsReps,
  formatRepsSummary,
}) {
  const primaryMuscle = MUSCLE_LABELS[exercise.muscleKey] || exercise.muscleKey;
  const canLinkWithNext = Boolean(nextExercise) && Boolean(nextExercise.isWarmup) === Boolean(exercise.isWarmup);
  const timerOn = isRestTimerEnabledForExercise(exercise);
  const dropCount = parseInt(exercise.defaultDropSets, 10) || 0;
  const exerciseKey = exercise.id || `ex-${idx}`;
  const isItemDragging = draggedIdx === idx;
  const isDropTargetAbove = dragOverIdx === idx && draggedIdx !== null && draggedIdx > idx;
  const isDropTargetBelow = dragOverIdx === idx && draggedIdx !== null && draggedIdx < idx;

  let restSummaryText;
  if (ssInfo && !ssInfo.isLast) {
    restSummaryText = '0s Transition';
  } else if (ssInfo && ssInfo.isLast) {
    restSummaryText = `${exercise.defaultRestSeconds || 90}s Round Rest`;
  } else {
    restSummaryText = timerOn ? `${exercise.defaultRestSeconds || 60}s Rest` : 'Untimed';
  }

  return (
    <div
      className={`overview-exercise-row-card clean-text-card ${exercise.isWarmup ? 'warmup-row' : ''} ${ssInfo ? 'in-superset' : ''} ${isExpanded ? 'is-expanded' : ''} ${isEditMode ? 'in-edit-mode' : ''} ${isItemDragging ? 'is-dragging' : ''} ${isDropTargetAbove ? 'drag-target-above' : ''} ${isDropTargetBelow ? 'drag-target-below' : ''}`}
      draggable={isEditMode}
      onDragStart={(e) => {
        if (!isEditMode) return;
        e.dataTransfer.setData('text/plain', String(idx));
        e.dataTransfer.effectAllowed = 'move';
        onSetDraggedIdx(idx);
      }}
      onDragOver={(e) => {
        if (!isEditMode) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverIdx !== idx) {
          onSetDragOverIdx(idx);
        }
      }}
      onDrop={(e) => {
        if (!isEditMode) return;
        e.preventDefault();
        onDropExercise(draggedIdx, idx);
        onSetDraggedIdx(null);
        onSetDragOverIdx(null);
      }}
      onDragEnd={() => {
        onSetDraggedIdx(null);
        onSetDragOverIdx(null);
      }}
    >
      {/* Main Row Line */}
      <div className="row-card-main-line">
        {/* Left: Order index & Drag Hub (in Edit Mode) */}
        <div
          className={`row-order-index ${isEditMode ? 'editable-drag-hub' : ''}`}
          title={isEditMode ? 'Drag to reorder or tap arrows' : undefined}
        >
          {isEditMode ? (
            <div className="drag-index-unit">
              <button
                type="button"
                disabled={idx === 0}
                onClick={(e) => { e.stopPropagation(); onMoveExercise(idx, -1); }}
                className="btn-left-mini-reorder up"
                title="Move up"
                aria-label="Move up"
              >
                <ArrowUp size={11} />
              </button>

              <div className="drag-handle-badge">
                <GripVertical size={12} className="drag-grip-icon" />
                <span className="order-num-text">{ssInfo ? ssInfo.code : String(idx + 1).padStart(2, '0')}</span>
              </div>

              <button
                type="button"
                disabled={idx === totalExercises - 1}
                onClick={(e) => { e.stopPropagation(); onMoveExercise(idx, 1); }}
                className="btn-left-mini-reorder down"
                title="Move down"
                aria-label="Move down"
              >
                <ArrowDown size={11} />
              </button>
            </div>
          ) : (
            <span>{ssInfo ? ssInfo.code : String(idx + 1).padStart(2, '0')}</span>
          )}
        </div>

        {(exercise.illustration || exercise.customVideoUrl) && (
          <div
            className="row-media-thumb"
            role="button"
            tabIndex={0}
            onClick={() => onViewGuide(exercise)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewGuide(exercise);
              }
            }}
            title="View movement guide"
            aria-label={`View movement guide for ${exercise.name}`}
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
                <span>#{ssInfo.code}</span>
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
            role="button"
            tabIndex={0}
            onClick={() => onViewGuide(exercise)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewGuide(exercise);
              }
            }}
            title="Click to view form guide and biomechanical cues"
            aria-label={`Click to view form guide and biomechanical cues for ${exercise.name}`}
          >
            <span>{exercise.name}</span>
          </h3>
          <p className="row-exercise-sub">{exercise.subtitle || exercise.scientificName}</p>

          {/* Clean High-Level Summary Badges Strip */}
          <div className="row-clean-summary-strip">
            <div className="summary-pill volume-pill" title="Planned Sets and Target Reps">
              <Layers size={13} className="summary-pill-icon" />
              <span><b>{exercise.defaultSets || 3} Sets</b> × {formatRepsSummary(exercise.defaultReps, exercise.customRepsPerSet)}</span>
            </div>

            <div className={`summary-pill rest-pill ${ssInfo && !ssInfo.isLast ? 'superset-transition-pill' : (!timerOn ? 'untimed' : '')}`} title="Target Recovery Rest Interval / Transition">
              {ssInfo && !ssInfo.isLast ? (
                <ArrowDownUp size={13} className="summary-pill-icon" />
              ) : (
                <Clock size={13} className="summary-pill-icon" />
              )}
              <span><b>{restSummaryText}</b></span>
            </div>

            {dropCount > 0 && (
              <div className="summary-pill dropset-pill" title={`${dropCount} Planned Drop Set(s)`}>
                <Flame size={13} className="summary-pill-icon" />
                <span>+{dropCount} Drop {dropCount === 1 ? 'Set' : 'Sets'}</span>
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
            onClick={() => onToggleExpand(exerciseKey)}
            title={isExpanded ? 'Collapse in-depth workout prescription' : 'Expand in-depth sets, timing & drop sets'}
            aria-expanded={isExpanded}
          >
            <SlidersHorizontal size={13} />
            <span>In-Depth</span>
            {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {isEditMode && !ssInfo && canLinkWithNext && (
            <button
              type="button"
              className="btn-row-pair-superset"
              onClick={() => onToggleSupersetWithNext(idx)}
              title={`Pair with ${nextExercise?.name} as Superset Circuit`}
            >
              <Link2 size={13} />
              <span>Pair Superset</span>
            </button>
          )}

          {isEditMode && ssInfo && (
            <button
              type="button"
              className="btn-row-unpair-superset"
              onClick={() => onUnlinkSuperset(idx)}
              title="Unlink from superset"
            >
              <Unlink size={13} />
              <span>Unpair</span>
            </button>
          )}

          {isEditMode && (
            <button
              type="button"
              className="row-action-icon-btn delete-btn animate-fade"
              onClick={() => onRemoveExercise(idx)}
              title="Remove exercise from workout"
            >
              <Trash2 size={15} />
            </button>
          )}

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
          <div className="indepth-sets-section">
            <div className="indepth-section-header">
              <div className="indepth-section-title">
                <Layers size={15} color="var(--clay)" />
                <h4>Sets Architecture &amp; Target Reps</h4>
                <button
                  type="button"
                  className="btn-indepth-guide-link"
                  onClick={() => onViewGuide(exercise)}
                  title="Open full movement guide, anatomy and cues"
                >
                  <BookOpen size={12} />
                  <span>Movement Guide</span>
                </button>
              </div>

              <div className="indepth-sets-preview-badge">
                {isEditMode ? (
                  <span className="editing-table-hint">
                    <Edit3 size={12} />
                    <span>In-Table Editing Active · Modify reps, rest &amp; sets directly in the rows</span>
                  </span>
                ) : (
                  <div className="table-preview-actions-box">
                    <span className="preview-spec-tag">
                      <b>{exercise.defaultSets || 3} Sets</b> planned · <b>{formatRepsSummary(exercise.defaultReps, exercise.customRepsPerSet)}</b>
                      {ssInfo && !ssInfo.isLast ? (
                        <span className="preview-rest-tag"> · <b>0s Transition</b> to #{ssInfo.exerciseNumber + 1}</span>
                      ) : (
                        <span className="preview-rest-tag"> · <b>{timerOn ? `${exercise.defaultRestSeconds || 60}s Rest` : 'Untimed'}</b></span>
                      )}
                      {dropCount > 0 && (
                        <span className="preview-drop-tag"> · <b>+{dropCount} Drop {dropCount === 1 ? 'Set' : 'Sets'}</b></span>
                      )}
                    </span>
                    <button
                      type="button"
                      className="btn-enable-table-edit"
                      onClick={onEnterEditMode}
                      title="Customize sets, reps, and timers for this workout"
                    >
                      <Edit3 size={11} />
                      <span>Customize Sets &amp; Reps</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

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
                    const defaultIntent = exercise.isWarmup
                      ? 'RPE 5-6 · Establish neuromuscular motor pattern'
                      : setNum === 1
                        ? 'RPE 7-8 · Clean form & crisp bar velocity'
                        : isFinalSet
                          ? 'RPE 9-9.5 · Push near technical breakdown'
                          : 'RPE 8-8.5 · Controlled eccentric cadence';

                    const rowReps = (exercise.customRepsPerSet && exercise.customRepsPerSet[sIdx]) || exercise.defaultReps || '10-12';
                    const rowIntent = (exercise.customIntentsPerSet && exercise.customIntentsPerSet[sIdx]) || defaultIntent;

                    return (
                      <tr key={`set-${setNum}`} className="set-table-row">
                        <td className="col-set">
                          {isEditMode ? (
                            <div className="table-set-cell-edit">
                              <span className="set-index-badge">#{String(setNum).padStart(2, '0')}</span>
                              {(exercise.defaultSets || 3) > 1 && (
                                <button
                                  type="button"
                                  className="btn-delete-row-set"
                                  onClick={() => onRemoveSpecificSet(idx, sIdx)}
                                  title={`Remove Set #${setNum}`}
                                  aria-label={`Remove Set #${setNum}`}
                                >
                                  <Trash2 size={11} />
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="set-index-badge">#{String(setNum).padStart(2, '0')}</span>
                          )}
                        </td>
                        <td className="col-phase">
                          <span className="set-type-tag">{setPhaseName}</span>
                        </td>
                        <td className="col-target">
                          {isEditMode ? (
                            <div className="table-reps-editor-box">
                              <input
                                id={`overview-reps-${exerciseKey}-${sIdx}`}
                                name={`reps-${exerciseKey}-${sIdx}`}
                                type="text"
                                list={`reps-presets-${exerciseKey}`}
                                className="table-reps-input"
                                value={rowReps}
                                onChange={(e) => onSetRowReps(idx, sIdx, e.target.value)}
                                placeholder="e.g. 10-12"
                                aria-label={`${exercise.name} set ${sIdx + 1} target`}
                                title="Target reps or duration (select from dropdown or type)"
                              />
                              <datalist id={`reps-presets-${exerciseKey}`}>
                                {REP_PRESETS.map((preset) => (
                                  <option key={preset} value={preset} />
                                ))}
                                <option value="8-10 reps/side" />
                                <option value="10-12 reps/side" />
                                <option value="12-15 reps/side" />
                              </datalist>
                            </div>
                          ) : (
                            <strong>{formatRepsSummary(rowReps)}</strong>
                          )}
                        </td>
                        <td className="col-rest">
                          {isEditMode ? (
                            ssInfo && !ssInfo.isLast ? (
                              <div className="table-rest-cell superset-transition">
                                <ArrowDownUp size={11} />
                                <b>0s (Transition to #{ssInfo.exerciseNumber + 1})</b>
                              </div>
                            ) : (
                              <div className="table-rest-stepper-cell">
                                <button
                                  type="button"
                                  className="table-mini-step-btn"
                                  disabled={!timerOn || (exercise.defaultRestSeconds || 60) <= 15}
                                  onClick={() => onStepRestSeconds(idx, -15)}
                                  title="Decrease recovery rest by 15s"
                                >
                                  −15s
                                </button>
                                <span className={`table-rest-val-display ${!timerOn ? 'untimed' : ''}`}>
                                  {timerOn ? `${exercise.defaultRestSeconds || 60}s` : 'Untimed'}
                                </span>
                                <button
                                  type="button"
                                  className="table-mini-step-btn"
                                  disabled={!timerOn || (exercise.defaultRestSeconds || 60) >= 300}
                                  onClick={() => onStepRestSeconds(idx, 15)}
                                  title="Increase recovery rest by 15s"
                                >
                                  +15s
                                </button>
                                <button
                                  type="button"
                                  className={`table-timer-mode-btn ${timerOn ? 'on' : 'off'}`}
                                  onClick={() => onToggleTimer(idx)}
                                  title={timerOn ? 'Set to Untimed' : 'Enable Rest Timer'}
                                >
                                  <Clock size={10} />
                                  <span>{timerOn ? 'Timer' : 'Untimed'}</span>
                                </button>
                              </div>
                            )
                          ) : (
                            ssInfo && !ssInfo.isLast ? (
                              <span className="table-rest-cell superset-transition">
                                <ArrowDownUp size={11} />
                                <b>0s (Transition to #{ssInfo.exerciseNumber + 1})</b>
                              </span>
                            ) : ssInfo && ssInfo.isLast ? (
                              <span className="table-rest-cell superset-round-rest">
                                <Clock size={11} />
                                <b>{timerOn ? `${exercise.defaultRestSeconds || 90}s` : 'Untimed'} (Circuit Rest)</b>
                              </span>
                            ) : (
                              <span className="table-rest-cell">
                                <Clock size={12} />
                                {timerOn ? `${exercise.defaultRestSeconds || 60}s` : 'Untimed'}
                              </span>
                            )
                          )}
                        </td>
                        <td className="col-intent">
                          {isEditMode ? (
                            <div className="table-intent-editor-box">
                              <input
                                id={`overview-intent-${exerciseKey}-${sIdx}`}
                                name={`intent-${exerciseKey}-${sIdx}`}
                                type="text"
                                className="table-intent-input"
                                value={rowIntent}
                                onChange={(e) => onSetRowIntent(idx, sIdx, e.target.value)}
                                placeholder="e.g. RPE 8 · Controlled tempo"
                                aria-label={`${exercise.name} set ${sIdx + 1} cue`}
                                title="Edit load intent or RPE cue"
                              />
                            </div>
                          ) : (
                            <span className="table-intent-text">{rowIntent}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {Array.from({ length: dropCount }).map((_, dIdx) => {
                    const dropNum = dIdx + 1;
                    const stripPct = dropNum === 1 ? '20%' : `${dropNum * 20}%`;
                    return (
                      <tr key={`drop-${dropNum}`} className="set-table-row dropset-row">
                        <td className="col-set">
                          {isEditMode ? (
                            <div className="table-set-cell-edit">
                              <span className="set-index-badge dropset">
                                <Flame size={11} /> DROP #{dropNum}
                              </span>
                              <button
                                type="button"
                                className="btn-delete-row-set drop"
                                onClick={() => onUpdateExerciseDropSets(idx, dropCount - 1)}
                                title="Remove this drop set"
                                aria-label="Remove drop set"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          ) : (
                            <span className="set-index-badge dropset">
                              <Flame size={11} /> DROP #{dropNum}
                            </span>
                          )}
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

              {isEditMode && (
                <div className="table-editor-footer-toolbar animate-fade">
                  <div className="table-footer-btn-group">
                    <button
                      type="button"
                      className="btn-table-action-add add-working-set"
                      disabled={(exercise.defaultSets || 3) >= 10}
                      onClick={() => onUpdateExerciseSets(idx, (exercise.defaultSets || 3) + 1)}
                      title="Add another working set"
                    >
                      <Plus size={13} />
                      <span>Add Working Set</span>
                    </button>

                    {dropCount === 0 ? (
                      <button
                        type="button"
                        className="btn-table-action-add add-dropset"
                        onClick={() => onUpdateExerciseDropSets(idx, 1)}
                        title="Add immediate drop set post final set"
                      >
                        <Flame size={13} />
                        <span>+ Add Drop Set Protocol</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-table-action-add add-dropset active"
                        disabled={dropCount >= 3}
                        onClick={() => onUpdateExerciseDropSets(idx, dropCount + 1)}
                        title="Add another drop set"
                      >
                        <Flame size={13} />
                        <span>+ Add Another Drop ({dropCount}/3)</span>
                      </button>
                    )}
                  </div>

                  <div className="table-footer-batch-presets">
                    <span className="batch-presets-label">Apply to all sets:</span>
                    {REP_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`btn-batch-preset-chip ${String(exercise.defaultReps || '').trim() === preset ? 'active' : ''}`}
                        onClick={() => onSetAllRowsReps(idx, preset)}
                        title={`Set all sets to ${preset}`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
