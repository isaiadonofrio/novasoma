import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Dumbbell,
  Layers,
  Trash2,
  Check,
  X,
  Flame
} from 'lucide-react';
import { toLocalDateKey } from '../utils/analytics';
import { formatVolumeCompact, formatSessionDuration } from '../utils/formatting';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { ConfirmModal } from './ConfirmModal';

const DURATION_PRESETS = [30, 45, 60, 75, 90];
const RPE_PRESETS = [
  { value: 'RPE 6', label: 'RPE 6 · Moderate' },
  { value: 'RPE 7-8', label: 'RPE 7-8 · Target Effort' },
  { value: 'RPE 8-9', label: 'RPE 8-9 · Heavy Output' },
  { value: 'RPE 9-10', label: 'RPE 9-10 · Max Technical' },
];

export function ManualWorkoutLogModal({
  isOpen = false,
  initialDateKey = null,
  routines = [],
  workoutHistory = [],
  onSaveSession,
  onDeleteSession,
  onClose,
}) {
  const [todayKey] = useState(() => toLocalDateKey(new Date()));
  const [selectedDateKey, setSelectedDateKey] = useState(() => initialDateKey || toLocalDateKey(new Date()));

  const [selectedRoutineId, setSelectedRoutineId] = useState(() => routines[0]?.id || null);
  const [workoutTitle, setWorkoutTitle] = useState(() => routines[0]?.title || 'Workout Session');
  const [durationMinutes, setDurationMinutes] = useState(() => routines[0]?.durationMinutes || 60);
  const [volumeKg, setVolumeKg] = useState('');
  const [selectedRpe, setSelectedRpe] = useState('RPE 7-8');
  const [notes, setNotes] = useState('');
  const [pendingDeleteSession, setPendingDeleteSession] = useState(null);

  useBodyScrollLock(isOpen);

  const handleSelectRoutine = (routine) => {
    if (!routine) {
      setSelectedRoutineId(null);
      setWorkoutTitle('Custom Workout');
      setDurationMinutes(60);
      setVolumeKg('');
      return;
    }
    setSelectedRoutineId(routine.id);
    setWorkoutTitle(routine.title);
    setDurationMinutes(routine.durationMinutes || 60);
  };

  // Find all workouts already logged for the selected date
  const existingOnDate = useMemo(() => {
    if (!selectedDateKey) return [];
    return workoutHistory.filter(
      (s) => toLocalDateKey(s.date || s.completedAt) === selectedDateKey
    );
  }, [workoutHistory, selectedDateKey]);

  const formattedDateTitle = useMemo(() => {
    if (!selectedDateKey) return 'Select Date';
    const [year, month, day] = selectedDateKey.split('-').map(Number);
    const d = new Date(year, month - 1, day, 12, 0, 0);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, [selectedDateKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDateKey) return;

    const chosenRoutine = routines.find((r) => r.id === selectedRoutineId) || null;
    const finalMinutes = Math.max(1, Number(durationMinutes) || 60);
    const dateIso = `${selectedDateKey}T12:00:00.000Z`;

    const newSession = {
      id: `manual-${Date.now()}`,
      routineId: chosenRoutine?.id || null,
      routineTitle: workoutTitle.trim() || chosenRoutine?.title || 'Workout Session',
      date: dateIso,
      completedAt: dateIso,
      durationSeconds: finalMinutes * 60,
      volumeKg: Math.max(0, Number(volumeKg) || 0),
      rpe: selectedRpe || null,
      notes: notes.trim() || null,
      isManual: true,
      loggedSets: chosenRoutine?.exercises
        ? Object.fromEntries(
            chosenRoutine.exercises.map((ex, i) => [
              ex.id || `ex-${i}`,
              Array.from({ length: ex.defaultSets || 3 }, () => ({
                reps: String(ex.defaultReps || '10'),
                weightKg: 0,
                completed: true
              }))
            ])
          )
        : {}
    };

    onSaveSession(newSession);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !pendingDeleteSession) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, pendingDeleteSession]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-log-modal-title"
    >
      <div className="manual-log-modal-card animate-fade">
        {/* Modal Header */}
        <div className="manual-log-header">
          <div className="manual-log-head-info">
            <div className="manual-log-title-row">
              <div className="manual-log-icon-badge">
                <Calendar size={18} />
              </div>
              <div>
                <h2 id="manual-log-modal-title" className="manual-log-heading">
                  Log Workout Session
                </h2>
                <span className="manual-log-subdate">{formattedDateTitle}</span>
              </div>
            </div>
          </div>

          <div className="manual-log-date-picker-wrap">
            <input
              type="date"
              className="manual-log-date-input"
              value={selectedDateKey}
              max={todayKey}
              onChange={(e) => e.target.value && setSelectedDateKey(e.target.value)}
              title="Change date to log"
            />
            <button
              type="button"
              className="close-editor-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="manual-log-body">
          {/* Section: Existing Workouts on this day (if any) */}
          {existingOnDate.length > 0 && (
            <div className="manual-log-existing-box">
              <div className="manual-log-existing-header">
                <span className="existing-count-pill">
                  <Check size={12} strokeWidth={3} />
                  <span>{existingOnDate.length} logged on this date</span>
                </span>
                <span className="existing-note-text">
                  You can remove any session or add another below.
                </span>
              </div>

              <div className="existing-sessions-list">
                {existingOnDate.map((session, sIdx) => {
                  const durationSecs = Number(session.durationSeconds) || 0;
                  const vol = Number(session.volumeKg) || 0;
                  return (
                    <div key={session.id || sIdx} className="existing-session-card">
                      <div className="existing-session-info">
                        <span className="existing-session-title">
                          {session.routineTitle || 'Workout Session'}
                        </span>
                        <div className="existing-session-meta">
                          {durationSecs > 0 && (
                            <span className="meta-item">
                              <Clock size={11} />
                              {formatSessionDuration(durationSecs)}
                            </span>
                          )}
                          {vol > 0 && (
                            <span className="meta-item">
                              <Dumbbell size={11} />
                              {formatVolumeCompact(vol)}
                            </span>
                          )}
                          {session.rpe && (
                            <span className="meta-item rpe-tag">
                              {session.rpe}
                            </span>
                          )}
                        </div>
                      </div>

                      {onDeleteSession && (
                        <button
                          type="button"
                          className="btn-delete-existing-session"
                          onClick={() => setPendingDeleteSession(session)}
                          title="Delete this logged session"
                          aria-label="Delete this session"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form to Log New Workout */}
          <form id="manual-workout-form" onSubmit={handleSubmit} className="manual-log-form">
            {/* Quick Routine Selector */}
            <div className="form-field-group">
              <label className="manual-field-label">
                <Layers size={13} />
                <span>Select Workout Blueprint</span>
              </label>

              <div className="routine-select-chips-grid">
                {routines.map((routine) => {
                  const isSelected = selectedRoutineId === routine.id;
                  const exCount = routine.exercises?.length || 0;
                  return (
                    <button
                      key={routine.id}
                      type="button"
                      className={`routine-chip-card ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectRoutine(routine)}
                    >
                      <div className="routine-chip-head">
                        <span className="routine-chip-title">{routine.title}</span>
                        {isSelected && <Check size={13} className="routine-chip-check" />}
                      </div>
                      <div className="routine-chip-sub">
                        <span>{routine.category || 'General'}</span>
                        <span>·</span>
                        <span>{exCount} ex</span>
                        <span>·</span>
                        <span>~{routine.durationMinutes || 60}m</span>
                      </div>
                    </button>
                  );
                })}

                <button
                  type="button"
                  className={`routine-chip-card custom ${selectedRoutineId === null ? 'active' : ''}`}
                  onClick={() => handleSelectRoutine(null)}
                >
                  <div className="routine-chip-head">
                    <span className="routine-chip-title">+ Custom Workout</span>
                    {selectedRoutineId === null && <Check size={13} className="routine-chip-check" />}
                  </div>
                  <div className="routine-chip-sub">
                    <span>Manual entry without blueprint</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Workout Title Input */}
            <div className="form-field-group">
              <label className="manual-field-label" htmlFor="manual-workout-title">
                Session Name
              </label>
              <input
                id="manual-workout-title"
                type="text"
                className="manual-text-input"
                value={workoutTitle}
                onChange={(e) => setWorkoutTitle(e.target.value)}
                placeholder="e.g. Leg Workout 1, Morning Cardio, Pull Day"
                required
              />
            </div>

            {/* Duration & Volume Row */}
            <div className="form-two-col-row">
              {/* Duration */}
              <div className="form-field-group">
                <label className="manual-field-label">
                  <Clock size={13} />
                  <span>Duration (Minutes)</span>
                </label>
                <div className="duration-input-box">
                  <input
                    type="number"
                    min="1"
                    max="600"
                    className="manual-text-input num-input"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                  />
                  <div className="duration-quick-chips">
                    {DURATION_PRESETS.map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        className={`btn-duration-chip ${Number(durationMinutes) === mins ? 'active' : ''}`}
                        onClick={() => setDurationMinutes(mins)}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Volume */}
              <div className="form-field-group">
                <label className="manual-field-label">
                  <Dumbbell size={13} />
                  <span>Estimated Volume (kg, optional)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  className="manual-text-input num-input"
                  value={volumeKg}
                  onChange={(e) => setVolumeKg(e.target.value)}
                  placeholder="e.g. 3500 (optional)"
                />
              </div>
            </div>

            {/* Perceived Intensity (RPE) */}
            <div className="form-field-group">
              <label className="manual-field-label">
                <Flame size={13} />
                <span>Perceived Effort &amp; RPE</span>
              </label>
              <div className="rpe-chips-row">
                {RPE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`btn-rpe-chip ${selectedRpe === preset.value ? 'active' : ''}`}
                    onClick={() => setSelectedRpe(preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="form-field-group">
              <label className="manual-field-label" htmlFor="manual-workout-notes">
                Session Notes &amp; Reflections (optional)
              </label>
              <textarea
                id="manual-workout-notes"
                className="manual-textarea"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did the session feel? Any personal records or technical cues to remember?"
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="manual-log-footer">
          <button
            type="button"
            className="btn-gymmane-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="manual-workout-form"
            className="btn-gymmane-primary manual-submit-btn"
          >
            <Check size={16} />
            <span>Save to Heatmap &amp; Schedule</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Session Deletion */}
      {pendingDeleteSession && (
        <ConfirmModal
          title="Delete Workout Session?"
          message={`Are you sure you want to delete "${pendingDeleteSession.routineTitle || 'Workout Session'}" from ${formattedDateTitle}?`}
          confirmLabel="Delete Session"
          tone="danger"
          onConfirm={() => {
            if (onDeleteSession) {
              onDeleteSession(pendingDeleteSession.id || pendingDeleteSession.date);
            }
            setPendingDeleteSession(null);
          }}
          onCancel={() => setPendingDeleteSession(null)}
        />
      )}
    </div>
  );
}
