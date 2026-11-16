import { Fragment } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Link2,
  ListChecks,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

export function PlayerHeader({
  routineTitle,
  workoutElapsedSeconds,
  sessionVolumeKg,
  soundEnabled,
  onToggleSound,
  onClose,
  onRequestFinish,
  formatTime,
  isQueueOpen,
  onToggleQueueDrawer,
  completedSetsCount,
  totalSetsAcrossWorkout,
  prevBlockExercise,
  nextBlockExercise,
  onGoToPrevBlock,
  onGoToNextBlock,
  ribbonNodes,
  activeRibbonRef,
  onGoToExercise,
  activeNavSetsDone,
}) {
  return (
    <>
      {/* Balanced Studio Top Navigation Bar */}
      <header className="player-header">
        <div className="player-header-inner">
          <div className="player-header-left">
            <button
              type="button"
              className="player-icon-btn"
              onClick={onClose}
              title="Close session (Esc)"
              aria-label="Close session"
            >
              <X size={18} />
            </button>
            <span className="player-elapsed-clock">
              <Clock size={12} />
              {formatTime(workoutElapsedSeconds)}
            </span>
          </div>

          <div className="player-session-meta">
            <span className="player-routine-name">{routineTitle}</span>
          </div>

          <div className="player-header-right">
            {sessionVolumeKg > 0 && (
              <span className="player-volume-chip" title="Session tonnage lifted">
                {sessionVolumeKg.toLocaleString()} kg
              </span>
            )}
            <button
              type="button"
              className="player-icon-btn"
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
              aria-label="Audio"
            >
              {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>
            <button
              type="button"
              className="player-finish-btn"
              onClick={onRequestFinish}
            >
              <Trophy size={15} />
              <span>Finish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Unified Exercise Progress Ribbon */}
      <nav className="player-workout-ribbon" aria-label="Workout timeline and navigation">
        <button
          type="button"
          className={`ribbon-outline-trigger ${isQueueOpen ? 'open' : ''}`}
          onClick={onToggleQueueDrawer}
          aria-expanded={isQueueOpen}
          title="Open detailed Workout Outline (Q)"
          aria-label="Toggle workout outline"
        >
          <ListChecks size={15} />
          <span className="ribbon-outline-label">Outline</span>
          <span className="ribbon-outline-count">{completedSetsCount}/{totalSetsAcrossWorkout}</span>
        </button>

        <button
          type="button"
          className="ribbon-step-arrow prev"
          onClick={onGoToPrevBlock}
          disabled={!prevBlockExercise}
          title={prevBlockExercise ? `Previous: ${prevBlockExercise.name} (Left Arrow)` : 'First block in workout'}
          aria-label={prevBlockExercise ? `Previous: ${prevBlockExercise.name}` : 'First block'}
        >
          <ArrowLeft size={15} />
        </button>

        <div className="ribbon-segments-track" role="list" aria-label="Exercise progress track">
          {ribbonNodes.map((node, nodeIdx) => {
            const pct = node.totalSets > 0 ? Math.round((node.doneSets / node.totalSets) * 100) : 0;
            const showPhaseTag =
              nodeIdx === 0 || ribbonNodes[nodeIdx - 1].phaseInfo.key !== node.phaseInfo.key;

            return (
              <Fragment key={node.key}>
                {showPhaseTag && (
                  <span className={`ribbon-phase-tag is-${node.phaseInfo.key}`}>
                    {node.phaseInfo.shortLabel}
                  </span>
                )}
                {node.type === 'superset' ? (
                  <button
                    ref={node.isCurrent ? activeRibbonRef : null}
                    type="button"
                    role="listitem"
                    className={`ribbon-node-pill is-superset ${node.isCurrent ? 'is-current' : ''} ${node.isDone ? 'is-done' : ''} ${node.isWarmup ? 'is-warmup' : ''}`}
                    onClick={() => onGoToExercise(node.startIdx)}
                    title={`Superset ${node.ss.rangeLabel || node.ss.letter}: ${node.members.map((m, pos) => `#${node.ss.memberIndices[pos] + 1} ${m.name}`).join(' + ')} (${node.doneSets}/${node.totalSets} sets)`}
                    aria-label={`Superset ${node.ss.rangeLabel || node.ss.letter}, ${node.doneSets} of ${node.totalSets} sets`}
                  >
                    {!node.isCurrent && pct > 0 && (
                      <span className="ribbon-node-fill" style={{ width: `${pct}%` }} aria-hidden="true" />
                    )}
                    <span className="ribbon-node-content">
                      <span className="ribbon-ss-tag">
                        <Link2 size={10} />
                        <span>{node.ss.rangeLabel || node.ss.letter}</span>
                      </span>
                      <span className="ribbon-node-prog">
                        {node.isDone ? <Check size={11} strokeWidth={3} /> : `${node.doneSets}/${node.totalSets}`}
                      </span>
                    </span>
                  </button>
                ) : (
                  <button
                    ref={node.isCurrent ? activeRibbonRef : null}
                    type="button"
                    role="listitem"
                    className={`ribbon-node-pill ${node.isCurrent ? 'is-current' : ''} ${node.isDone ? 'is-done' : ''} ${node.isWarmup ? 'is-warmup' : ''}`}
                    onClick={() => onGoToExercise(node.idx)}
                    title={`${node.idx + 1}. ${node.ex.name} (${node.doneSets}/${node.totalSets} sets)`}
                    aria-label={`Exercise ${node.idx + 1}: ${node.ex.name}, ${node.doneSets} of ${node.totalSets} sets`}
                  >
                    {!node.isCurrent && pct > 0 && (
                      <span className="ribbon-node-fill" style={{ width: `${pct}%` }} aria-hidden="true" />
                    )}
                    <span className="ribbon-node-content">
                      <span className="ribbon-num-tag">
                        {node.isDone ? <Check size={10} strokeWidth={3} /> : node.idx + 1}
                      </span>
                      <span className="ribbon-node-prog">
                        {node.doneSets}/{node.totalSets}
                      </span>
                    </span>
                  </button>
                )}
              </Fragment>
            );
          })}
        </div>

        {nextBlockExercise ? (
          <button
            type="button"
            className={`ribbon-step-arrow next ${activeNavSetsDone ? 'ready-advance' : ''}`}
            onClick={onGoToNextBlock}
            title={`Next: ${nextBlockExercise.name} (Right Arrow)`}
            aria-label={`Next: ${nextBlockExercise.name}`}
          >
            <ArrowRight size={15} />
          </button>
        ) : (
          <button
            type="button"
            className="ribbon-step-arrow next finish-mode ready-advance"
            onClick={onRequestFinish}
            title="Finish & Save Workout"
            aria-label="Finish and save workout"
          >
            <Trophy size={14} />
          </button>
        )}
      </nav>
    </>
  );
}
