import { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  BookOpen,
  Activity,
  Dumbbell,
  UserCheck,
  AlertTriangle,
  Lightbulb,
  Clock,
  Flame,
  Repeat,
  GitBranch,
  GraduationCap
} from 'lucide-react';
import { MUSCLE_LABELS } from '../data/muscleLabels.js';
import {
  enrichExerciseWithTaxonomy,
  getExerciseVariations,
  SCIENTIFIC_SOURCES
} from '../data/exerciseTaxonomy.js';
import { MediaViewer } from './MediaViewer.jsx';
import { MiniBodyMap } from './MiniBodyMap.jsx';
import { getRequiresEquipment, isAnimatedGifUrl } from '../utils/exerciseImport.js';
import { shouldShowExerciseRpe } from '../utils/workoutSets.js';
import { useBodyScrollLock } from '../utils/useBodyScrollLock.js';
import { useFocusTrap } from '../utils/useFocusTrap.js';

export function ExerciseDetailModal({
  exercise,
  allExercises = [],
  onSelectExercise,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'anatomy'
  const [showSourcesInfo, setShowSourcesInfo] = useState(false);
  const trapRef = useFocusTrap(Boolean(exercise));
  const scrollRef = useRef(null);

  // Prevent background scrolling while exercise guide is open
  useBodyScrollLock(Boolean(exercise));

  // Reset scroll to top when toggling between tabs or switching exercises
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab, exercise?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const enrichedExercise = useMemo(() => {
    if (!exercise) return null;
    if (exercise.biomechanics && exercise.familyId) return exercise;
    return enrichExerciseWithTaxonomy(exercise);
  }, [exercise]);

  const siblingVariations = useMemo(
    () => getExerciseVariations(enrichedExercise, allExercises),
    [enrichedExercise, allExercises]
  );

  if (!enrichedExercise) return null;

  const usesGear = getRequiresEquipment(enrichedExercise);

  const primaryMuscle = MUSCLE_LABELS[enrichedExercise.muscleKey] || enrichedExercise.muscleKey || 'Full Body';
  const mechanicsLabel = enrichedExercise.mechanics || (enrichedExercise.isWarmup ? 'Mobility' : 'Compound');
  const levelLabel = enrichedExercise.level || 'Intermediate';
  const equipLabel = usesGear ? (enrichedExercise.equipment || 'Equipment') : 'Bodyweight';
  const isGif = isAnimatedGifUrl(enrichedExercise.illustration);
  const bio = enrichedExercise.biomechanics || null;

  const executionSteps = enrichedExercise.execution
    ? [
        enrichedExercise.execution.setup && {
          step: '01',
          title: 'Setup & Alignment',
          text: enrichedExercise.execution.setup
        },
        enrichedExercise.execution.eccentric && {
          step: '02',
          title: 'Lowering Phase (Eccentric)',
          text: enrichedExercise.execution.eccentric
        },
        enrichedExercise.execution.concentric && {
          step: '03',
          title: 'Drive & Lockout (Concentric)',
          text: enrichedExercise.execution.concentric
        },
        enrichedExercise.execution.breathing && {
          step: '04',
          title: 'Breathing & Bracing',
          text: enrichedExercise.execution.breathing
        }
      ].filter(Boolean)
    : [];

  const formattedRest = enrichedExercise.defaultRestSeconds
    ? `${Math.floor(enrichedExercise.defaultRestSeconds / 60)}m${enrichedExercise.defaultRestSeconds % 60 ? ` ${enrichedExercise.defaultRestSeconds % 60}s` : ''}`
    : '90s';

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exercise-detail-title"
      onClick={onClose}
    >
      <div
        ref={trapRef}
        className="gymmane-db-detail-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="db-dialog-header">
          <div className="db-dialog-header-info">
            <div className="db-detail-badges-row">
              <span className="detail-pattern-kicker">
                {enrichedExercise.pattern || 'Movement Guide'}
              </span>
              {enrichedExercise.isWarmup && (
                <span className="detail-warmup-tag">Warm-Up</span>
              )}
              <span className="detail-meta-chip">{mechanicsLabel}</span>
              <span className="detail-meta-chip">{levelLabel}</span>
              {enrichedExercise.variationType && (
                <span className="detail-variation-type-chip" title={enrichedExercise.variationLabel || ''}>
                  {enrichedExercise.variationType}
                </span>
              )}
            </div>
            <h2 id="exercise-detail-title" className="db-dialog-title">{enrichedExercise.name}</h2>
            <p className="db-dialog-scientific">
              {enrichedExercise.scientificName || enrichedExercise.subtitle}
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
          {/* Left Stage: Media & Functional Biomechanical Dossier */}
          <aside className="db-guide-left-stage">
            <div className="db-guide-media-frame">
              {enrichedExercise.illustration ? (
                <>
                  <img
                    src={enrichedExercise.illustration}
                    alt={`${enrichedExercise.name} movement demonstration`}
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

            {enrichedExercise.customVideoUrl && (
              <div className="spotlight-video-wrapper">
                <MediaViewer
                  src={enrichedExercise.customVideoUrl}
                  alt={enrichedExercise.name}
                  className="spotlight-video-frame"
                  autoPlay={false}
                />
              </div>
            )}

            {/* Functional Overview & Prescription Dossier */}
            <div className="guide-functional-overview">
              <div className="guide-overview-section-header">
                <span className="guide-overview-kicker">BIOMECHANICAL DOSSIER</span>
                <span className={`db-equip-status-pill ${usesGear ? 'gear' : 'bodyweight'}`}>
                  {usesGear ? <Dumbbell size={11} /> : <UserCheck size={11} />}
                  <span>{equipLabel}</span>
                </span>
              </div>

              {/* Authoritative Kinesiology Specs Grid */}
              <div className="guide-overview-specs-grid">
                <div className="guide-spec-tile">
                  <span className="spec-tile-label">JOINT ARTICULATION</span>
                  <span className="spec-tile-value wrap highlight">
                    {bio?.jointActions || enrichedExercise.pattern || 'Functional'}
                  </span>
                </div>
                <div className="guide-spec-tile">
                  <span className="spec-tile-label">PLANE &amp; LOAD VECTOR</span>
                  <span className="spec-tile-value wrap">
                    {bio ? `${bio.plane} · ${bio.loadVector}` : primaryMuscle}
                  </span>
                </div>
                <div className="guide-spec-tile">
                  <span className="spec-tile-label">KINETIC CHAIN</span>
                  <span className="spec-tile-value wrap">
                    {bio ? `${bio.chain} · ${bio.laterality}` : mechanicsLabel}
                  </span>
                </div>
                <div className="guide-spec-tile">
                  <span className="spec-tile-label">RESISTANCE PROFILE</span>
                  <span className="spec-tile-value wrap">
                    {bio?.resistanceProfile || levelLabel}
                  </span>
                </div>
              </div>

              {/* Suggested Training Prescription Blueprint */}
              <div className="guide-prescription-box">
                <div className="prescription-header">
                  <span className="prescription-kicker">TRAINING PRESCRIPTION</span>
                  {shouldShowExerciseRpe(enrichedExercise) && (
                    <span className="prescription-rpe-tag" title="Target Rate of Perceived Exertion">
                      <Flame size={12} />
                      <span>RPE {enrichedExercise.rpe}</span>
                    </span>
                  )}
                </div>

                <div className="prescription-metrics-row">
                  <div className="prescription-metric-cell">
                    <Repeat size={14} className="cell-icon" />
                    <div className="cell-copy">
                      <span className="cell-num">{enrichedExercise.defaultSets || 3} × {enrichedExercise.defaultReps || '8-12'}</span>
                      <span className="cell-sub">Working Volume</span>
                    </div>
                  </div>

                  <div className="prescription-metric-cell">
                    <Clock size={14} className="cell-icon" />
                    <div className="cell-copy">
                      <span className="cell-num">{formattedRest}</span>
                      <span className="cell-sub">Recovery Rest</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scientific Reference Attribution */}
              <div className="guide-scientific-sources-box">
                <button
                  type="button"
                  className="sources-toggle-btn"
                  onClick={() => setShowSourcesInfo((prev) => !prev)}
                  aria-expanded={showSourcesInfo}
                >
                  <GraduationCap size={13} />
                  <span>Standards: NSCA (4th Ed.) · ExRx · Terminologia Anatomica</span>
                  <span className="sources-toggle-caret">{showSourcesInfo ? 'Hide' : 'Sources'}</span>
                </button>
                {showSourcesInfo && (
                  <ul className="sources-detail-list">
                    {SCIENTIFIC_SOURCES.map((src) => (
                      <li key={src.id}>
                        <strong>{src.citation}:</strong> {src.scope}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>

          {/* Right Stage: Cues, Variations & Anatomy */}
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
                <span>Form &amp; Execution</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'anatomy'}
                className={`db-guide-tab-btn ${activeTab === 'anatomy' ? 'active' : ''}`}
                onClick={() => setActiveTab('anatomy')}
              >
                <Activity size={14} />
                <span>Muscles &amp; Anatomy</span>
              </button>
            </div>

            <div className="db-guide-right-scroll" ref={scrollRef}>
              {activeTab === 'form' && (
                <div className="guide-panel animate-fade">
                  {/* Movement Family & Sibling Variations */}
                  {enrichedExercise.familyName && siblingVariations.length > 0 && (
                    <div className="editorial-cues-card variations-card">
                      <div className="cues-card-header variations-header">
                        <GitBranch size={15} color="var(--teal)" />
                        <div>
                          <h4>Movement Family: {enrichedExercise.familyName}</h4>
                          <p className="variations-subtitle">
                            Current: <b>{enrichedExercise.variationLabel}</b> · {siblingVariations.length} related variation{siblingVariations.length === 1 ? '' : 's'}
                          </p>
                        </div>
                      </div>
                      <div className="variations-pills-grid">
                        {siblingVariations.map((variant) => {
                          const canSelect = typeof onSelectExercise === 'function';
                          const PillTag = canSelect ? 'button' : 'div';
                          return (
                            <PillTag
                              key={variant.id}
                              {...(canSelect ? {
                                type: 'button',
                                onClick: () => onSelectExercise(variant),
                                title: `Switch to ${variant.name}`
                              } : {})}
                              className={`variation-sibling-pill ${canSelect ? 'is-clickable' : ''}`}
                            >
                              <span className="variation-pill-top">
                                <span className="variation-type-tag">{variant.variationType || 'Variant'}</span>
                                <span className="variation-equip-tag">{variant.equipment || 'Bodyweight'}</span>
                              </span>
                              <span className="variation-pill-name">{variant.name}</span>
                              {variant.variationLabel && (
                                <span className="variation-pill-desc">{variant.variationLabel}</span>
                              )}
                            </PillTag>
                          );
                        })}
                      </div>
                    </div>
                  )}

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
                  {Array.isArray(enrichedExercise.execution?.commonMistakes) &&
                    enrichedExercise.execution.commonMistakes.length > 0 && (
                      <div className="editorial-cues-card mistakes-card">
                        <div className="cues-card-header">
                          <AlertTriangle size={15} color="var(--danger)" />
                          <h4>Common Technical Faults</h4>
                        </div>
                        <ul className="cues-bullet-list">
                          {enrichedExercise.execution.commonMistakes.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Pro Tip */}
                  {enrichedExercise.execution?.proTip && (
                    <div className="editorial-cues-card protip-card">
                      <div className="cues-card-header">
                        <Lightbulb size={15} color="var(--clay)" />
                        <h4>Biomechanist Cues</h4>
                      </div>
                      <p className="protip-text">{enrichedExercise.execution.proTip}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'anatomy' && (
                <div className="guide-panel animate-fade">
                  <div className="anatomy-spotlight-card">
                    <div className="anatomy-bodymap-box">
                      <MiniBodyMap
                        primaryKeys={enrichedExercise.muscleKey ? [enrichedExercise.muscleKey] : []}
                        secondaryKeys={enrichedExercise.secondaryKeys || []}
                        className="detail-mini-body"
                      />
                    </div>

                    <div className="anatomy-lists-box">
                      {/* Primary */}
                      <div className="anatomy-group-block">
                        <span className="anatomy-label primary">Primary Agonist (Terminologia Anatomica)</span>
                        <div className="muscle-tags-wrap">
                          {enrichedExercise.targetMuscles?.primary?.map((m) => (
                            <span key={m} className="muscle-tag primary">
                              {m}
                            </span>
                          )) || <span className="muscle-tag primary">{primaryMuscle}</span>}
                        </div>
                      </div>

                      {/* Secondary */}
                      {enrichedExercise.targetMuscles?.secondary &&
                        enrichedExercise.targetMuscles.secondary.length > 0 && (
                          <div className="anatomy-group-block">
                            <span className="anatomy-label secondary">Synergists / Secondary</span>
                            <div className="muscle-tags-wrap">
                              {enrichedExercise.targetMuscles.secondary.map((m) => (
                                <span key={m} className="muscle-tag secondary">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Stabilizers */}
                      {enrichedExercise.targetMuscles?.stabilizers &&
                        enrichedExercise.targetMuscles.stabilizers.length > 0 && (
                          <div className="anatomy-group-block">
                            <span className="anatomy-label stabilizers">Stabilizers</span>
                            <div className="muscle-tags-wrap">
                              {enrichedExercise.targetMuscles.stabilizers.map((m) => (
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
