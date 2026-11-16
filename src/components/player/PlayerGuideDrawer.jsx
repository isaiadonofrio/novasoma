import { Activity, AlertTriangle, Lightbulb, Wind, X } from 'lucide-react';
import { MiniBodyMap } from '../MiniBodyMap';
import { formatTargetPrescription, shouldShowExerciseRpe } from '../../utils/workoutSets';

export function PlayerGuideDrawer({
  isOpen,
  onClose,
  guideExercise,
  guidePhaseInfo,
  guidePrimaryMuscleName,
  guideVariations,
  currentSuperset,
  supersetMembers,
  resolvedGuideIdx,
  onSelectGuideExercise,
  guideTab,
  onSelectGuideTab,
  guideExecution,
  guideCommonMistakes,
}) {
  if (!isOpen || !guideExercise) return null;

  return (
    <div
      className="guide-drawer-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="guide-pullout-drawer"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        aria-label="Exercise Technique & Anatomy Guide"
      >
        <div className="drawer-sheet-handle" aria-hidden="true" />
        <div className="guide-drawer-header">
          <div className="guide-header-copy">
            <div className="guide-kicker-row">
              <span className={`guide-phase-pill is-${guidePhaseInfo.key}`}>{guidePhaseInfo.label}</span>
              <span className="guide-drawer-kicker">
                {guideExercise.pattern || guidePrimaryMuscleName}
              </span>
            </div>
            <h2>{guideExercise.name}</h2>
            {guideExercise.scientificName && (
              <p className="guide-drawer-sci">{guideExercise.scientificName}</p>
            )}

            <div className="guide-meta-pills">
              <span className="guide-meta-pill">{guideExercise.equipment || 'Bodyweight'}</span>
              {guideExercise.mechanics && <span className="guide-meta-pill">{guideExercise.mechanics}</span>}
              {guideExercise.level && <span className="guide-meta-pill">{guideExercise.level}</span>}
              <span className="guide-meta-pill">Target {formatTargetPrescription(guideExercise)}</span>
              {shouldShowExerciseRpe(guideExercise) && (
                <span className="guide-meta-pill is-accent">RPE {guideExercise.rpe}</span>
              )}
            </div>

            {guideExercise.biomechanics && (
              <div className="guide-biomech-strip">
                <div className="guide-biomech-cell">
                  <span className="guide-biomech-label">Joint Action</span>
                  <span className="guide-biomech-val">{guideExercise.biomechanics.jointActions}</span>
                </div>
                <div className="guide-biomech-cell">
                  <span className="guide-biomech-label">Plane &amp; Vector</span>
                  <span className="guide-biomech-val">
                    {guideExercise.biomechanics.plane} · {guideExercise.biomechanics.loadVector}
                  </span>
                </div>
                <div className="guide-biomech-cell">
                  <span className="guide-biomech-label">Resistance Profile</span>
                  <span className="guide-biomech-val">{guideExercise.biomechanics.resistanceProfile}</span>
                </div>
              </div>
            )}

            {guideVariations.length > 0 && (
              <div className="guide-family-strip">
                <span className="guide-family-label">
                  Movement Family: {guideExercise.familyName}
                </span>
                <div className="guide-family-chips">
                  {guideVariations.slice(0, 4).map((v) => (
                    <span key={v.id} className="guide-family-chip">
                      <b>{v.variationType}</b> {v.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentSuperset && supersetMembers.length > 1 && (
              <div className="guide-partner-switcher" role="group" aria-label={`Inspect Superset ${currentSuperset.rangeLabel || currentSuperset.letter} form guide`}>
                {supersetMembers.map((m) => (
                  <button
                    key={m.ex.id || m.mIdx}
                    type="button"
                    className={`guide-partner-pill ${resolvedGuideIdx === m.mIdx ? 'active' : ''}`}
                    onClick={() => onSelectGuideExercise(m.mIdx)}
                  >
                    <span className="guide-partner-num">#{m.code}</span>
                    <span>{m.ex.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className="player-icon-btn guide-close-btn"
            onClick={onClose}
            aria-label="Close guide"
          >
            <X size={18} />
          </button>
        </div>

        {(guideExercise.illustration || guideExercise.muscleKey || guideExercise.targetMuscles) && (
          <div className="guide-muscles-block guide-anatomy-showcase">
            <div className="guide-visual-pair">
              {guideExercise.illustration && (
                <div className="guide-visual-thumb">
                  <img src={guideExercise.illustration} alt={guideExercise.name} loading="eager" />
                </div>
              )}
              {guideExercise.muscleKey && (
                <div className="guide-anatomy-bodymap">
                  <MiniBodyMap
                    primaryKeys={[guideExercise.muscleKey]}
                    secondaryKeys={guideExercise.secondaryKeys || []}
                    className="guide-mini-body"
                  />
                </div>
              )}
            </div>

            {guideExercise.targetMuscles && (
              <div className="guide-anatomy-tags">
                <div className="guide-muscles-title">
                  <Activity size={13} />
                  <span>TARGET MUSCLES</span>
                </div>
                {(guideExercise.targetMuscles.primary || []).length > 0 && (
                  <div className="guide-muscle-group">
                    <span className="guide-muscle-group-label">Primary</span>
                    <div className="guide-muscle-chips">
                      {guideExercise.targetMuscles.primary.map((m, i) => (
                        <span key={`p-${i}`} className="guide-chip primary">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
                {(guideExercise.targetMuscles.secondary || []).length > 0 && (
                  <div className="guide-muscle-group">
                    <span className="guide-muscle-group-label">Secondary</span>
                    <div className="guide-muscle-chips">
                      {guideExercise.targetMuscles.secondary.map((m, i) => (
                        <span key={`s-${i}`} className="guide-chip secondary">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
                {(guideExercise.targetMuscles.stabilizers || []).length > 0 && (
                  <div className="guide-muscle-group">
                    <span className="guide-muscle-group-label">Stabilizers</span>
                    <div className="guide-muscle-chips">
                      {guideExercise.targetMuscles.stabilizers.map((m, i) => (
                        <span key={`st-${i}`} className="guide-chip">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="guide-tabs-bar-wrap">
          <div className="guide-tabs-bar" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={guideTab === 'cues'}
              className={`guide-tab-btn ${guideTab === 'cues' ? 'active' : ''}`}
              onClick={() => onSelectGuideTab('cues')}
            >
              Execution &amp; Phases
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={guideTab === 'mistakes'}
              className={`guide-tab-btn ${guideTab === 'mistakes' ? 'active' : ''}`}
              onClick={() => onSelectGuideTab('mistakes')}
            >
              Mistakes &amp; Coach Cue
            </button>
          </div>
        </div>

        <div className="guide-drawer-scroll">
          {guideTab === 'cues' ? (
            <div className="cues-list">
              {guideExecution.setup && (
                <div className="cue-row">
                  <span className="cue-num">1</span>
                  <div>
                    <strong>Setup &amp; Alignment</strong>
                    <p>{guideExecution.setup}</p>
                  </div>
                </div>
              )}

              {guideExecution.eccentric && (
                <div className="cue-row">
                  <span className="cue-num">2</span>
                  <div>
                    <strong>Lowering Phase (Eccentric)</strong>
                    <p>{guideExecution.eccentric}</p>
                  </div>
                </div>
              )}

              {guideExecution.concentric && (
                <div className="cue-row">
                  <span className="cue-num">3</span>
                  <div>
                    <strong>Drive Phase (Concentric)</strong>
                    <p>{guideExecution.concentric}</p>
                  </div>
                </div>
              )}

              {guideExecution.breathing && (
                <div className="cues-breathing-pill">
                  <Wind size={15} />
                  <span><strong>Breathing:</strong> {guideExecution.breathing}</span>
                </div>
              )}

              {guideExecution.proTip && (
                <div className="pro-tip-footer">
                  <div className="protip-label-row">
                    <Lightbulb size={14} />
                    <strong>COACH CUE</strong>
                  </div>
                  <p>{guideExecution.proTip}</p>
                </div>
              )}

              {!guideExecution.setup && !guideExecution.eccentric && !guideExecution.concentric && !guideExecution.breathing && !guideExecution.proTip && (
                <p className="cues-empty-note">No technique notes entered for this exercise.</p>
              )}
            </div>
          ) : (
            <div className="mistakes-pane-inner">
              <div className="mistakes-heading">
                <AlertTriangle size={15} color="var(--danger)" />
                <span>Common Mistakes to Avoid</span>
              </div>
              {guideCommonMistakes.length > 0 ? (
                <div className="guide-mistakes-cards">
                  {guideCommonMistakes.map((err, i) => (
                    <div key={i} className="guide-mistake-card">
                      <span className="guide-mistake-icon" aria-hidden="true">
                        <AlertTriangle size={14} />
                      </span>
                      <p>{err}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="cues-empty-note">No common mistakes recorded.</p>
              )}
              {guideExecution.proTip && (
                <div className="pro-tip-footer">
                  <div className="protip-label-row">
                    <Lightbulb size={14} />
                    <strong>COACH CUE</strong>
                  </div>
                  <p>{guideExecution.proTip}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
