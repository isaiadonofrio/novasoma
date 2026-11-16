import { AlertTriangle, Trophy } from 'lucide-react';

export function FinishWorkoutModal({
  isOpen,
  completedSetsCount,
  totalSetsAcrossWorkout,
  onClose,
  onDiscard,
  onConfirmFinish,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop finish-confirm-backdrop" role="dialog" aria-modal="true" aria-labelledby="finish-dialog-title">
      <div className="finish-confirm-card">
        <div className="finish-confirm-header">
          <div className="finish-confirm-icon-wrap">
            {completedSetsCount === 0 ? <AlertTriangle size={22} color="var(--warn)" /> : <Trophy size={22} color="var(--bronze)" />}
          </div>
          <h3 id="finish-dialog-title" className="finish-confirm-title">
            {completedSetsCount === 0 ? 'No Sets Completed' : 'Finish Workout Early?'}
          </h3>
        </div>
        <p className="finish-confirm-desc">
          {completedSetsCount === 0
            ? 'You have not checked off any completed sets yet. Would you like to discard this workout or save an empty session to history?'
            : `You have completed ${completedSetsCount} of ${totalSetsAcrossWorkout} planned sets. Would you like to finish and save your progress now?`}
        </p>
        <div className="finish-confirm-actions">
          {completedSetsCount === 0 ? (
            <>
              <button
                type="button"
                className="btn-gymmane-secondary finish-btn-cancel"
                onClick={onClose}
              >
                Keep Working
              </button>
              <button
                type="button"
                className="finish-btn-discard"
                onClick={onDiscard}
              >
                Discard Session
              </button>
              <button
                type="button"
                className="btn-gymmane-primary finish-btn-save"
                onClick={onConfirmFinish}
              >
                Save Anyway
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn-gymmane-secondary finish-btn-cancel"
                onClick={onClose}
              >
                Resume Workout
              </button>
              <button
                type="button"
                className="btn-gymmane-primary finish-btn-save"
                onClick={onConfirmFinish}
              >
                Finish &amp; Save ({completedSetsCount}/{totalSetsAcrossWorkout})
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
