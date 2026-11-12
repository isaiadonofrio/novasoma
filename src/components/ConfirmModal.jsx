import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function ConfirmModal({
  title = 'Confirm Action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger', // 'danger' | 'neutral'
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="summary-modal-card confirm-modal-card">
        <div className="confirm-modal-head">
          <div className={`confirm-icon-badge ${tone === 'danger' ? 'is-danger' : ''}`}>
            <AlertTriangle size={18} />
          </div>
          <div className="confirm-modal-copy">
            <h3 id="confirm-modal-title">{title}</h3>
            {message && <p>{message}</p>}
          </div>
          <button
            type="button"
            className="summary-close-btn"
            onClick={onCancel}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="confirm-modal-actions">
          <button type="button" className="btn-gymmane-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={tone === 'danger' ? 'confirm-danger-btn' : 'btn-gymmane-primary'}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

