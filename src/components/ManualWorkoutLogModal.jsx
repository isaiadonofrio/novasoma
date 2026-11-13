import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Dumbbell,
  Layers,
  Trash2,
  Check,
  X,
  Flame,
  ChevronDown,
  Sparkles,
  Activity,
  FileText
} from 'lucide-react';
import { toLocalDateKey } from '../utils/analytics';
import { formatVolumeCompact, formatSessionDuration } from '../utils/formatting';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { ConfirmModal } from './ConfirmModal';

const DURATION_PRESETS = [30, 45, 60, 75, 90];

const RPE_LEVELS = [
  { value: 'RPE 6', num: '6', title: 'Moderate', hint: 'Aerobic / Recovery', tone: 'easy' },
  { value: 'RPE 7-8', num: '7-8', title: 'Target', hint: 'Working / 2-3 RIR', tone: 'target' },
  { value: 'RPE 8-9', num: '8-9', title: 'Heavy', hint: 'Near Limit / 1 RIR', tone: 'hard' },
  { value: 'RPE 9-10', num: '9-10', title: 'Max', hint: 'All-Out Effort', tone: 'max' },
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
  const [prevInitialKey, setPrevInitialKey] = useState(initialDateKey);

  // Synchronize when initialDateKey changes across openings without cascading renders
  if (initialDateKey !== prevInitialKey) {
    setPrevInitialKey(initialDateKey);
    setSelectedDateKey(initialDateKey || todayKey);
  }

  const [selectedRoutineId, setSelectedRoutineId] = useState(() => routines[0]?.id || null);
  const [workoutTitle, setWorkoutTitle] = useState(() => routines[0]?.title || 'Workout Session');
  const [durationMinutes, setDurationMinutes] = useState(() => routines[0]?.durationMinutes || 60);
  const [volumeKg, setVolumeKg] = useState('');
  const [selectedRpe, setSelectedRpe] = useState('RPE 7-8');
  const [notes, setNotes] = useState('');
  const [pendingDeleteSession, setPendingDeleteSession] = useState(null);

  useBodyScrollLock(isOpen);

  // Selected routine object
  const currentBlueprint = useMemo(() => {
    if (!selectedRoutineId) return null;
    return routines.find((r) => r.id === selectedRoutineId) || null;
  }, [routines, selectedRoutineId]);

  const handleSelectRoutineId = (id) => {
    if (!id || id === '__custom__') {
      setSelectedRoutineId(null);
      setWorkoutTitle('Custom Workout');
      setDurationMinutes(60);
      setVolumeKg('');
      return;
    }
    const routine = routines.find((r) => r.id === id);
    if (!routine) return;
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

  const formattedDateShort = useMemo(() => {
    if (!selectedDateKey) return 'Date';
    const [year, month, day] = selectedDateKey.split('-').map(Number);
    const d = new Date(year, month - 1, day, 12, 0, 0);
    return d.toLocaleDateString('en-US', {
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
      <div className="manual-log-modal-card pro animate-fade">
        {/* Modal Header */}
        <div className="manual-log-header pro">
          <div className="manual-log-title-row">
            <div className="manual-log-icon-badge pro">
              <Calendar size={18} />
            </div>
            <div>
              <h2 id="manual-log-modal-title" className="manual-log-heading pro">
                Log Workout
              </h2>
              <div className="manual-log-subdate-line">
                <span className="manual-log-subdate pro">{formattedDateTitle}</span>
                {selectedDateKey === todayKey && (
                  <span className="manual-today-pill">Today</span>
                )}
              </div>
            </div>
          </div>

          <div className="manual-log-header-controls">
            {/* Styled Date Picker Chip */}
            <label className="manual-date-picker-chip" title="Choose a date to log">
              <Calendar size={13} className="date-chip-icon" />
              <span className="date-chip-label">{formattedDateShort}</span>
              <ChevronDown size={12} className="date-chip-arrow" />
              <input
                type="date"
                className="manual-date-hidden-input"
                value={selectedDateKey}
                max={todayKey}
                onChange={(e) => e.target.value && setSelectedDateKey(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="manual-log-close-btn"
              onClick={onClose}
              aria-label="Close"
              title="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="manual-log-body pro">
          {/* Section: Existing Workouts on this day (if any) */}
          {existingOnDate.length > 0 && (
            <div className="manual-log-existing-box pro animate-fade">
              <div className="manual-log-existing-header">
                <span className="existing-count-pill">
                  <Activity size={12} />
                  <span>{existingOnDate.length} Logged for this Date</span>
                </span>
                <span className="existing-note-text">
                  Session is included in consistency streaks &amp; weekly volume.
                </span>
              </div>

              <div className="existing-sessions-list">
                {existingOnDate.map((session, sIdx) => {
                  const durationSecs = Number(session.durationSeconds) || 0;
                  const vol = Number(session.volumeKg) || 0;
                  return (
                    <div key={session.id || sIdx} className="existing-session-card pro">
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
          <form id="manual-workout-form" onSubmit={handleSubmit} className="manual-log-form pro">
            {/* Blueprint Selector Card */}
            <div className="pro-blueprint-section">
              <div className="pro-section-head">
                <label className="manual-field-label pro">
                  <Layers size={13} />
                  <span>Workout Blueprint</span>
                </label>
                <div className="blueprint-mode-tags">
                  <button
                    type="button"
                    className={`blueprint-mode-tab ${selectedRoutineId ? 'active' : ''}`}
                    onClick={() => {
                      if (!selectedRoutineId && routines[0]) {
                        handleSelectRoutineId(routines[0].id);
                      }
                    }}
                  >
                    From Routine
                  </button>
                  <button
                    type="button"
                    className={`blueprint-mode-tab ${!selectedRoutineId ? 'active' : ''}`}
                    onClick={() => handleSelectRoutineId('__custom__')}
                  >
                    Custom Workout
                  </button>
                </div>
              </div>

              {selectedRoutineId ? (
                <div className="pro-routine-dropdown-card">
                  <div className="custom-select-wrapper">
                    <select
                      className="pro-routine-native-select"
                      value={selectedRoutineId}
                      onChange={(e) => handleSelectRoutineId(e.target.value)}
                    >
                      {routines.map((routine) => (
                        <option key={routine.id} value={routine.id}>
                          {routine.title} · {routine.category || 'Workout'} ({routine.exercises?.length || 0} exercises, ~{routine.durationMinutes || 60}m)
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="select-arrow-icon" />
                  </div>

                  {currentBlueprint && (
                    <div className="pro-blueprint-meta-bar">
                      <span className="blueprint-category-tag">
                        {currentBlueprint.category || 'Routine'}
                      </span>
                      <span className="blueprint-meta-stat">
                        <Dumbbell size={12} />
                        <b>{currentBlueprint.exercises?.length || 0}</b> exercises
                      </span>
                      <span className="blueprint-meta-stat">
                        <Clock size={12} />
                        <b>~{currentBlueprint.durationMinutes || 60}m</b> planned
                      </span>
                      <span className="blueprint-meta-badge">
                        <Sparkles size={11} /> Auto-populates structure
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pro-custom-workout-banner">
                  <div className="custom-banner-text">
                    <strong>Custom / Freeform Session</strong>
                    <span>Log an unscripted session, cardio, running, outdoor sport, or quick gym split.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Session Name Input */}
            <div className="form-field-group">
              <label className="manual-field-label pro" htmlFor="manual-workout-title">
                <FileText size={13} />
                <span>Session Name</span>
              </label>
              <div className="input-with-icon-wrap">
                <input
                  id="manual-workout-title"
                  type="text"
                  className="manual-text-input pro"
                  value={workoutTitle}
                  onChange={(e) => setWorkoutTitle(e.target.value)}
                  placeholder="e.g. Leg Workout 1, Morning Run, Pull Day"
                  required
                />
              </div>
            </div>

            {/* Metrics: Duration & Volume (2 Columns) */}
            <div className="form-two-col-row pro">
              {/* Duration Field */}
              <div className="form-field-group">
                <label className="manual-field-label pro">
                  <Clock size={13} />
                  <span>Duration (Minutes)</span>
                </label>
                <div className="duration-pro-input-unit">
                  <div className="input-with-suffix-box">
                    <input
                      type="number"
                      min="1"
                      max="600"
                      className="manual-text-input pro num-input"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(e.target.value)}
                    />
                    <span className="input-suffix-tag">min</span>
                  </div>
                  <div className="duration-quick-chips pro">
                    {DURATION_PRESETS.map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        className={`btn-duration-chip pro ${Number(durationMinutes) === mins ? 'active' : ''}`}
                        onClick={() => setDurationMinutes(mins)}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Volume Field */}
              <div className="form-field-group">
                <label className="manual-field-label pro">
                  <Dumbbell size={13} />
                  <span>Estimated Volume (kg)</span>
                </label>
                <div className="input-with-suffix-box">
                  <input
                    type="number"
                    min="0"
                    step="50"
                    className="manual-text-input pro num-input"
                    value={volumeKg}
                    onChange={(e) => setVolumeKg(e.target.value)}
                    placeholder="e.g. 3500"
                  />
                  <span className="input-suffix-tag">kg</span>
                </div>
                <span className="pro-field-hint">Optional · leave blank for bodyweight/cardio</span>
              </div>
            </div>

            {/* Perceived Effort (RPE Gauge) */}
            <div className="form-field-group">
              <div className="rpe-label-row">
                <label className="manual-field-label pro">
                  <Flame size={13} />
                  <span>Perceived Intensity &amp; RPE</span>
                </label>
                <span className="rpe-selected-indicator">{selectedRpe}</span>
              </div>

              <div className="pro-rpe-gauge-grid">
                {RPE_LEVELS.map((level) => {
                  const isSelected = selectedRpe === level.value;
                  return (
                    <button
                      key={level.value}
                      type="button"
                      className={`pro-rpe-card ${level.tone} ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedRpe(level.value)}
                    >
                      <div className="rpe-card-top">
                        <span className="rpe-card-num">{level.num}</span>
                        <span className="rpe-card-title">{level.title}</span>
                      </div>
                      <span className="rpe-card-hint">{level.hint}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Session Notes */}
            <div className="form-field-group">
              <label className="manual-field-label pro" htmlFor="manual-workout-notes">
                <span>Session Reflections &amp; Notes (optional)</span>
              </label>
              <textarea
                id="manual-workout-notes"
                className="manual-textarea pro"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did the workout feel? Any PRs, energy levels, or cues to remember?"
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="manual-log-footer pro">
          <button
            type="button"
            className="btn-gymmane-secondary pro-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="manual-workout-form"
            className="btn-gymmane-primary manual-submit-btn pro"
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
