import { Dumbbell, Flame, ListChecks, Wind, X } from 'lucide-react';

export function PlayerQueueDrawer({
  isOpen,
  onClose,
  currentPhase,
  routineTitle,
  completedSetsCount,
  totalSetsAcrossWorkout,
  completedExercisesCount,
  totalExercisesCount,
  workoutElapsedSeconds,
  formatTime,
  warmupQueueItems,
  mainQueueItems,
  decompressionQueueItems,
  renderPhaseQueueEntries,
}) {
  if (!isOpen) return null;

  const pct = totalSetsAcrossWorkout > 0
    ? Math.round((completedSetsCount / totalSetsAcrossWorkout) * 100)
    : 0;

  return (
    <div
      className="guide-drawer-backdrop queue-overlay-left"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="player-queue-rail overlay-drawer"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        aria-label="Workout exercise outline"
      >
        <div className="player-queue-head">
          <div className="queue-head-top-row">
            <div className="queue-head-title-stack">
              <div className="queue-kicker-row">
                <div className="player-queue-head-title">
                  <ListChecks size={15} />
                  <span>WORKOUT OUTLINE</span>
                </div>
                <span className={`player-phase-tag is-${currentPhase.key}`}>{currentPhase.label}</span>
              </div>
              <h2 className="queue-routine-title">{routineTitle}</h2>
            </div>
            <button
              type="button"
              className="player-queue-close-btn"
              onClick={onClose}
              aria-label="Close outline"
            >
              <X size={16} />
            </button>
          </div>

          <div className="queue-stats-strip">
            <div className="queue-stat-box">
              <span className="queue-stat-label">SETS</span>
              <strong className="queue-stat-value">{completedSetsCount}/{totalSetsAcrossWorkout}</strong>
            </div>
            <div className="queue-stat-box">
              <span className="queue-stat-label">EXERCISES</span>
              <strong className="queue-stat-value">{completedExercisesCount}/{totalExercisesCount}</strong>
            </div>
            <div className="queue-stat-box">
              <span className="queue-stat-label">ELAPSED</span>
              <strong className="queue-stat-value">{formatTime(workoutElapsedSeconds)}</strong>
            </div>
          </div>

          <div className="queue-overall-progress">
            <div className="queue-overall-meta">
              <span>Session Completion</span>
              <strong>{pct}%</strong>
            </div>
            <div className="queue-overall-bar" aria-hidden="true">
              <span style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <div className="player-queue-scroll">
          {warmupQueueItems.length > 0 && (
            <div className="player-queue-group">
              <div className="player-queue-group-label is-warmup">
                <Flame size={13} />
                <span>WARM-UP &amp; MOBILITY</span>
                <small>{warmupQueueItems.length}</small>
              </div>
              <div className="player-queue-items">
                {renderPhaseQueueEntries(warmupQueueItems)}
              </div>
            </div>
          )}

          {mainQueueItems.length > 0 && (
            <div className="player-queue-group">
              <div className="player-queue-group-label is-main">
                <Dumbbell size={13} />
                <span>MAIN WORKOUT</span>
                <small>{mainQueueItems.length}</small>
              </div>
              <div className="player-queue-items">
                {renderPhaseQueueEntries(mainQueueItems)}
              </div>
            </div>
          )}

          {decompressionQueueItems.length > 0 && (
            <div className="player-queue-group">
              <div className="player-queue-group-label is-decompression">
                <Wind size={13} />
                <span>DECOMPRESSION</span>
                <small>{decompressionQueueItems.length}</small>
              </div>
              <div className="player-queue-items">
                {renderPhaseQueueEntries(decompressionQueueItems)}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
