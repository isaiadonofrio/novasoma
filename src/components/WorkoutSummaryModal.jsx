import { useEffect } from 'react';
import { Trophy, CheckCircle, Clock, Dumbbell, RotateCcw, X } from 'lucide-react';
import { calculateSessionVolumeKg } from '../utils/analytics';
import { triggerConfettiBurst } from '../utils/confetti';
import { formatSessionDuration } from '../utils/formatting';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { useFocusTrap } from '../utils/useFocusTrap';

export function WorkoutSummaryModal({ summary, routine, onClose, onRestart }) {
  useBodyScrollLock();
  const trapRef = useFocusTrap(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    triggerConfettiBurst();
  }, []);

  const totalVolumeKg = typeof summary.volumeKg === 'number'
    ? summary.volumeKg
    : calculateSessionVolumeKg(summary.loggedSets);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={trapRef} className="summary-modal-card">
        <button type="button" className="summary-close-btn" onClick={onClose} aria-label="Close summary modal">
          <X size={20} />
        </button>

        <div className="summary-trophy-badge">
          <Trophy size={38} color="var(--clay)" />
        </div>

        <h2 id="summary-modal-title" className="summary-title">Workout Completed</h2>
        <p className="summary-routine-name">{routine.title}</p>
        <p className="summary-message">
          Session logged to your weekly consistency tracker. Great job!
        </p>

        <div className={`summary-stats-grid ${totalVolumeKg > 0 ? 'three-cols' : 'two-cols'}`}>
          <div className="summary-stat-box">
            <Clock size={20} color="var(--clay)" />
            <div className="stat-value">{formatSessionDuration(summary.durationSeconds)}</div>
            <div className="stat-caption">Duration</div>
          </div>

          <div className="summary-stat-box">
            <CheckCircle size={20} color="var(--sage)" />
            <div className="stat-value">{summary.completedSets} / {summary.totalSets}</div>
            <div className="stat-caption">Sets Completed</div>
          </div>

          {totalVolumeKg > 0 && (
            <div className="summary-stat-box">
              <Dumbbell size={20} color="var(--brass)" />
              <div className="stat-value">{Math.round(totalVolumeKg)} kg</div>
              <div className="stat-caption">Total Volume</div>
            </div>
          )}
        </div>

        <div className="summary-actions">
          <button type="button" className="btn-gymmane-secondary" onClick={onRestart}>
            <RotateCcw size={16} />
            <span>Repeat</span>
          </button>
          <button type="button" className="btn-gymmane-primary" onClick={onClose}>
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
