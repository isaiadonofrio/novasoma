import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  BookOpen,
  Activity,
  Dumbbell,
  UserCheck,
  AlertTriangle,
  Lightbulb,
  Plus,
  Check
} from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels.js';
import { MediaViewer } from './MediaViewer.jsx';
import { MiniBodyMap } from './MiniBodyMap.jsx';
import { isBodyweightEquipment, isAnimatedGifUrl } from '../utils/exerciseImport.js';

export function ExerciseDetailModal({
  exercise,
  onClose,
  routines = [],
  onAddToRoutine
}) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'anatomy'
  const [selectedRoutineId, setSelectedRoutineId] = useState(routines[0]?.id || '');
  const [addedConfirm, setAddedConfirm] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!exercise) return null;

  const usesGear = typeof exercise.requiresEquipment === 'boolean'
    ? exercise.requiresEquipment
    : !isBodyweightEquipment(exercise.equipment);

  const primaryMuscle = MUSCLE_LABELS[exercise.muscleKey] || exercise.muscleKey || 'Full Body';
  const mechanicsLabel = exercise.mechanics || (exercise.isWarmup ? 'Mobility' : 'Compound');
  const levelLabel = exercise.level || 'Intermediate';
  const equipLabel = usesGear ? (exercise.equipment || 'Equipment') : 'Bodyweight';
  const isGif = isAnimatedGifUrl(exercise.illustration);

  const executionSteps = exercise.execution
    ? [
        exercise.execution.setup && {
          step: '01',
          title: 'Setup & Stance',
          text: exercise.execution.setup
        },
        exercise.execution.eccentric && {
          step: '02',
          title: 'Lowering (Eccentric)',
          text: exercise.execution.eccentric
        },
        exercise.execution.concentric && {
          step: '03',
          title: 'Execution & Lockout (Concentric)',
          text: exercise.execution.concentric
        },
        exercise.execution.breathing && {
          step: '04',
          title: 'Breathing Cadence',
          text: exercise.execution.breathing
        }
      ].filter(Boolean)
    : [];

  const handleSendToRoutine = () => {
    if (!onAddToRoutine || !selectedRoutineId) return;
    onAddToRoutine(selectedRoutineId, exercise);
    setAddedConfirm(true);
    setTimeout(() => setAddedConfirm(false), 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="gymmane-db-detail-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="db-dialog-header">
          <div className="db-dialog-header-info">
            <div className="db-detail-badges-row">
              <span className="detail-pattern-kicker">
                {exercise.pattern || 'Movement Guide'}
              </span>
              {exercise.isWarmup && (
                <span className="detail-warmup-tag">Warm-Up</span>
              )}
            </div>
            <h2 className="db-dialog-title">{exercise.name}</h2>
            <p className="db-dialog-scientific">
              {exercise.scientificName || exercise.subtitle}
            </p>
          </div>

          <div className="db-dialog-header-actions">
            <button
              type="button"
              className="close-db-btn"
              onClick={onClose}
              title="Close guide"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Split Workspace */}
        <div className="db-guide-shell">
          {/* Left Stage: Media & Quick Specs */}
          <aside className="db-guide-left-stage">
            <div className="db-guide-media-frame">
              {exercise.illustration ? (
                <>
                  <img
                    src={exercise.illustration}
                    alt={`${exercise.name} movement demonstration`}
                    className="db-detail-media-img"
                  />
                  {isGif && (
                    <span className="db-detail-media-tag">Animated GIF</span>
                  )}
                </>
              ) : (
                <div className="db-detail-media-empty">
                  <Dumbbell size={28} color="var(--dim)" />
                  <span>Curated Canonical Exercise</span>
                </div>
              )}
            </div>

            {exercise.customVideoUrl && (
              <div className="spotlight-video-wrapper">
                <MediaViewer
                  src={exercise.customVideoUrl}
                  alt={exercise.name}
                  className="spotlight-video-frame"
                  autoPlay={false}
                />
              </div>
            )}

            {/* Specs Table */}
            <dl className="db-guide-specs-list">
              <div className="guide-spec-row">
                <dt>Equipment</dt>
                <dd>
                  <span className={`db-equip-status-pill ${usesGear ? 'gear' : 'bodyweight'}`}>
                    {usesGear ? <Dumbbell size={11} /> : <UserCheck size={11} />}
                    <span>{equipLabel}</span>
                  </span>
                </dd>
              </div>
              <div className="guide-spec-row">
                <dt>Target Muscle</dt>
                <dd className="spec-emphasis">{primaryMuscle}</dd>
              </div>
              <div className="guide-spec-row">
                <dt>Mechanics</dt>
                <dd>{mechanicsLabel}</dd>
              </div>
              <div className="guide-spec-row">
                <dt>Difficulty</dt>
                <dd>{levelLabel}</dd>
              </div>
            </dl>

            {/* Quick Add to Workout dock (if available) */}
            {routines.length > 0 && onAddToRoutine && (
              <div className="db-guide-action-dock">
                <label className="guide-dock-label" htmlFor="guide-routine-select">
                  Add to workout
                </label>
                <div className="guide-dock-controls">
                  <select
                    id="guide-routine-select"
                    value={selectedRoutineId}
                    onChange={(e) => setSelectedRoutineId(e.target.value)}
                    className="send-routine-select"
                  >
                    {routines.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn-gymmane-primary send-routine-btn"
                    onClick={handleSendToRoutine}
                  >
                    {addedConfirm ? <Check size={14} /> : <Plus size={14} />}
                    <span>{addedConfirm ? 'Added' : 'Add'}</span>
                  </button>
                </div>
              </div>
            )}
          </aside>

          {/* Right Stage: Cues & Anatomy */}
          <div className="db-guide-right-pane">
            <div className="db-guide-tabs-bar" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'form'}
                className={`db-guide-tab-btn ${activeTab === 'form' ? 'active' : ''}`}
                onClick={() => setActiveTab('form')}
              >
                <BookOpen size={14} />
                <span>Form & Execution</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'anatomy'}
                className={`db-guide-tab-btn ${activeTab === 'anatomy' ? 'active' : ''}`}
                onClick={() => setActiveTab('anatomy')}
              >
                <Activity size={14} />
                <span>Muscles & Anatomy</span>
              </button>
            </div>

            <div className="db-guide-right-scroll" ref={scrollRef}>
              {activeTab === 'form' && (
                <div className="guide-panel animate-fade">
                  {executionSteps.length > 0 ? (
                    <div className="execution-steps-track">
                      {executionSteps.map((s) => (
                        <div key={s.step} className="execution-step-row">
                          <div className="step-number-col">
                            <span className="step-num-pill">{s.step}</span>
                          </div>
                          <div className="step-body-col">
                            <h4 className="step-name">{s.title}</h4>
                            <p className="step-text">{s.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="guide-empty-note">
                      <p>Standard execution cues apply. Focus on controlled tempo and posture.</p>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {Array.isArray(exercise.execution?.commonMistakes) &&
                    exercise.execution.commonMistakes.length > 0 && (
                      <div className="editorial-cues-card mistakes-card">
                        <div className="cues-card-header">
                          <AlertTriangle size={15} color="var(--danger)" />
                          <h4>Common Technical Faults</h4>
                        </div>
                        <ul className="cues-bullet-list">
                          {exercise.execution.commonMistakes.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Pro Tip */}
                  {exercise.execution?.proTip && (
                    <div className="editorial-cues-card protip-card">
                      <div className="cues-card-header">
                        <Lightbulb size={15} color="var(--clay)" />
                        <h4>Biomechanist Cues</h4>
                      </div>
                      <p className="protip-text">{exercise.execution.proTip}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'anatomy' && (
                <div className="guide-panel animate-fade">
                  <div className="anatomy-spotlight-card">
                    <div className="anatomy-bodymap-box">
                      <MiniBodyMap
                        primaryKeys={exercise.muscleKey ? [exercise.muscleKey] : []}
                        secondaryKeys={exercise.secondaryKeys || []}
                        className="detail-mini-body"
                      />
                    </div>

                    <div className="anatomy-lists-box">
                      {/* Primary */}
                      <div className="anatomy-group-block">
                        <span className="anatomy-label primary">Primary Agonist</span>
                        <div className="muscle-tags-wrap">
                          {exercise.targetMuscles?.primary?.map((m) => (
                            <span key={m} className="muscle-tag primary">
                              {m}
                            </span>
                          )) || <span className="muscle-tag primary">{primaryMuscle}</span>}
                        </div>
                      </div>

                      {/* Secondary */}
                      {exercise.targetMuscles?.secondary &&
                        exercise.targetMuscles.secondary.length > 0 && (
                          <div className="anatomy-group-block">
                            <span className="anatomy-label secondary">Synergists / Secondary</span>
                            <div className="muscle-tags-wrap">
                              {exercise.targetMuscles.secondary.map((m) => (
                                <span key={m} className="muscle-tag secondary">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Stabilizers */}
                      {exercise.targetMuscles?.stabilizers &&
                        exercise.targetMuscles.stabilizers.length > 0 && (
                          <div className="anatomy-group-block">
                            <span className="anatomy-label stabilizers">Stabilizers</span>
                            <div className="muscle-tags-wrap">
                              {exercise.targetMuscles.stabilizers.map((m) => (
                                <span key={m} className="muscle-tag stabilizer">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
