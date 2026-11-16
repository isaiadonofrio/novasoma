import { RotateCcw, X } from 'lucide-react';

/**
 * Editorial floating Undo notification pill rendered bottom-center.
 * Supports hover/focus timer pause and optional elevated offset inside the live player.
 */
export function UndoToast({
  toast,
  onUndo,
  onDismiss,
  onPause,
  onResume,
  inPlayer = false,
}) {
  if (!toast) return null;

  return (
    <div
      className={`undo-toast-wrap ${inPlayer ? 'in-player' : ''}`}
      role="status"
      aria-live="polite"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocus={onPause}
      onBlur={onResume}
    >
      <div className="undo-toast-pill">
        <span className="undo-toast-message">{toast.message}</span>
        <button
          type="button"
          className="undo-toast-action"
          onClick={onUndo}
        >
          <RotateCcw size={13} strokeWidth={2.5} />
          <span>Undo</span>
        </button>
        <button
          type="button"
          className="undo-toast-close"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
