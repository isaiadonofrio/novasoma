import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Upload, HardDrive, Check, AlertTriangle } from 'lucide-react';
import {
  STORAGE_KEYS,
  buildBackupPayload,
  getLocalStorageUsageKb,
  parseBackupPayload,
  safeReadJson,
} from '../utils/storage';

export function DataBackupModal({
  routines,
  exerciseDatabase,
  workoutHistory,
  theme,
  weeklyGoal = 4,
  onRestoreBackup,
  onClose,
}) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const usageKb = getLocalStorageUsageKb();
  const activeDraft = safeReadJson(STORAGE_KEYS.ACTIVE_DRAFT, null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleExport = () => {
    try {
      const payload = buildBackupPayload({
        routines,
        exerciseDatabase,
        workoutHistory,
        theme,
        weeklyGoal,
      });
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const dateStamp = new Date().toISOString().slice(0, 10);
      const link = document.createElement('a');
      link.href = url;
      link.download = `corpo-backup-${dateStamp}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus({
        type: 'success',
        message: `Backup downloaded (${routines.length} routines, ${exerciseDatabase.length} exercises, ${workoutHistory.length} sessions).`,
      });
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not generate backup file on this browser.',
      });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    try {
      const text = await file.text();
      const restored = parseBackupPayload(text);
      onRestoreBackup(restored);
      setStatus({
        type: 'success',
        message: `Restored ${restored.routines.length} routines, ${restored.exerciseDatabase.length} exercises, and ${restored.workoutHistory.length} sessions locally.`,
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.message || 'Failed to restore backup file.',
      });
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="data-backup-title"
    >
      <div className="summary-modal-card data-backup-modal">
        <div className="data-backup-header">
          <div className="data-backup-title-wrap">
            <span className="data-backup-eyebrow">LOCAL DEVICE STORAGE</span>
            <h2 id="data-backup-title">Data & Backup</h2>
          </div>
          <button
            type="button"
            className="summary-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <p className="data-backup-lead">
          All routines, exercises, logs, and history are saved exclusively in this device&apos;s browser storage with zero cloud tracking or external uploads.
        </p>

        <div className="data-backup-stats">
          <div className="data-backup-stat">
            <span>ROUTINES</span>
            <strong>{routines.length}</strong>
          </div>
          <div className="data-backup-stat">
            <span>EXERCISES</span>
            <strong>{exerciseDatabase.length}</strong>
          </div>
          <div className="data-backup-stat">
            <span>SESSIONS</span>
            <strong>{workoutHistory.length}</strong>
          </div>
          <div className="data-backup-stat">
            <span>USED SPACE</span>
            <strong>{usageKb} KB</strong>
          </div>
        </div>

        {activeDraft?.routineId && (
          <div className="data-backup-draft-note">
            <HardDrive size={14} />
            <span>An unfinished workout session draft is saved locally and will resume automatically.</span>
          </div>
        )}

        {status && (
          <div className={`data-backup-status ${status.type === 'error' ? 'is-error' : 'is-success'}`}>
            {status.type === 'error' ? <AlertTriangle size={15} /> : <Check size={15} />}
            <span>{status.message}</span>
          </div>
        )}

        <div className="data-backup-actions">
          <button
            type="button"
            className="data-backup-btn is-primary"
            onClick={handleExport}
          >
            <Download size={16} />
            <span>Export JSON Backup</span>
          </button>

          <button
            type="button"
            className="data-backup-btn is-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
            <span>Restore from JSON</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="visually-hidden-input"
            aria-label="Choose backup JSON file"
          />
        </div>
      </div>
    </div>
  );
}
