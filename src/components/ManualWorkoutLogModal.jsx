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
  Plus
} from 'lucide-react';
import { toLocalDateKey } from '../utils/analytics';
import { formatVolumeCompact } from '../utils/formatting';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { ConfirmModal } from './ConfirmModal';

const DURATION_PRESETS = [30, 45, 60, 75, 90];

const RPE_PRESETS = [
  { value: 'RPE 6', label: 'Moderate', sub: 'RPE 6 · Aerobic', color: 'teal' },
  { value: 'RPE 7-8', label: 'Target', sub: 'RPE 7-8 · Working', color: 'clay' },
  { value: 'RPE 8-9', label: 'Heavy', sub: 'RPE 8-9 · Near Limit', color: 'ember' },
  { value: 'RPE 9-10', label: 'Maximum', sub: 'RPE 9-10 · All-Out', color: 'red' },
];

const CUSTOM_ACTIVITY_PRESETS = [
  { label: '🏃 Run / Jogging', title: 'Running Session', duration: 45, category: 'Cardio' },
  { label: '🚴 Cycling', title: 'Cycling Session', duration: 45, category: 'Cardio' },
  { label: '🏊 Swimming', title: 'Swimming Workout', duration: 45, category: 'Cardio' },
  { label: '💪 Gym Split', title: 'Custom Gym Workout', duration: 60, category: 'Strength' },
  { label: '🧘 Mobility / Yoga', title: 'Mobility & Stretching', duration: 30, category: 'Mobility' },
  { label: '⚽ Sports / Games', title: 'Sports Activity', duration: 60, category: 'Sports' },
];

/**
 * Automatically computes an indicative volume in kg for a routine
 * based on user history of that routine, or estimated from planned sets & equipment.
 */
function getIndicativeRoutineVolume(routine, workoutHistory = []) {
  if (!routine || !Array.isArray(routine.exercises)) return 0;

  // 1. If this exact routine was completed in the past with recorded volume, use that benchmark!
  const pastSession = (workoutHistory || []).find(
    (s) => s.routineId === routine.id && Number(s.volumeKg) > 0
  );
  if (pastSession && pastSession.volumeKg) {
    return Math.round(Number(pastSession.volumeKg));
  }

  // 2. Otherwise calculate indicative volume from the exercises
  let totalEstKg = 0;
  routine.exercises.forEach((ex) => {
    const sets = Number(ex.defaultSets) || 3;
    let reps = 10;
    if (ex.defaultReps) {
      const match = String(ex.defaultReps).match(/\d+/);
      if (match) reps = parseInt(match[0], 10);
    }

    const eq = (ex.equipment || '').toLowerCase();
    let unitWeight = 0;
    if (eq.includes('barbell')) {
      unitWeight = 40;
    } else if (eq.includes('dumbbell')) {
      unitWeight = 16;
    } else if (eq.includes('kettlebell')) {
      unitWeight = 16;
    } else if (eq.includes('machine') || eq.includes('cable')) {
      unitWeight = 35;
    } else if (eq.includes('bodyweight') || eq.includes('mat')) {
      unitWeight = 0;
    } else {
      unitWeight = 15;
    }

    totalEstKg += sets * reps * unitWeight;
  });

  return Math.round(totalEstKg / 50) * 50;
}

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

  const [activeTab, setActiveTab] = useState(() => (routines.length > 0 ? 'routine' : 'custom'));
  const [selectedRoutineId, setSelectedRoutineId] = useState(() => routines[0]?.id || null);
  const [customTitle, setCustomTitle] = useState('Custom Workout');
  const [customCategory, setCustomCategory] = useState('Strength');
  const [durationMinutes, setDurationMinutes] = useState(() => routines[0]?.durationMinutes || 60);
  const [selectedRpe, setSelectedRpe] = useState('RPE 7-8');
  const [notes, setNotes] = useState('');
  const [pendingDeleteSession, setPendingDeleteSession] = useState(null);

  useBodyScrollLock(isOpen);

  // Selected routine object
  const selectedRoutine = useMemo(() => {
    if (activeTab !== 'routine' || !selectedRoutineId) return null;
    return routines.find((r) => r.id === selectedRoutineId) || null;
  }, [routines, activeTab, selectedRoutineId]);

  // Indicative volume automatically gathered from the routine
  const indicativeVolumeKg = useMemo(() => {
    if (activeTab !== 'routine' || !selectedRoutine) return 0;
    return getIndicativeRoutineVolume(selectedRoutine, workoutHistory);
  }, [activeTab, selectedRoutine, workoutHistory]);

  const handleSelectRoutine = (routine) => {
    if (!routine) return;
    setSelectedRoutineId(routine.id);
    setDurationMinutes(routine.durationMinutes || 60);
  };

  const handleApplyCustomPreset = (preset) => {
    setCustomTitle(preset.title);
    setCustomCategory(preset.category);
    setDurationMinutes(preset.duration);
  };

  const stepDuration = (delta) => {
    setDurationMinutes((prev) => Math.max(5, Math.min(360, (Number(prev) || 60) + delta)));
  };

  // Find all workouts already logged for the selected date
  const existingOnDate = useMemo(() => {
    if (!selectedDateKey) return [];
    return (workoutHistory || []).filter(
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

    const isRoutine = activeTab === 'routine' && selectedRoutine;
    const finalTitle = isRoutine
      ? selectedRoutine.title
      : customTitle.trim() || 'Workout Session';
    const finalMinutes = Math.max(1, Number(durationMinutes) || 60);
    const dateIso = `${selectedDateKey}T12:00:00.000Z`;

    // Gather realistic volume automatically
    const finalVolume = isRoutine ? indicativeVolumeKg : 0;

    const newSession = {
      id: `manual-${Date.now()}`,
      routineId: isRoutine ? selectedRoutine.id : null,
      routineTitle: finalTitle,
      category: isRoutine ? selectedRoutine.category : customCategory,
      date: dateIso,
      completedAt: dateIso,
      durationSeconds: finalMinutes * 60,
      volumeKg: finalVolume,
      rpe: selectedRpe || null,
      notes: notes.trim() || null,
      isManual: true,
      loggedSets: isRoutine && selectedRoutine.exercises
        ? Object.fromEntries(
            selectedRoutine.exercises.map((ex, i) => [
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
      <div className="clean-workout-log-modal animate-fade">
        {/* Modal Header */}
        <div className="clean-log-header">
          <div className="clean-log-title-area">
            <div className="clean-log-icon">
              <Calendar size={18} />
            </div>
            <div>
              <h2 id="manual-log-modal-title" className="clean-log-heading">
                Log Completed Workout
              </h2>
              <div className="clean-log-subdate">
                <span>{formattedDateTitle}</span>
                {selectedDateKey === todayKey && (
                  <span className="today-badge">Today</span>
                )}
              </div>
            </div>
          </div>

          <div className="clean-log-header-actions">
            {/* Clickable Date Pill */}
            <label className="clean-date-pill" title="Tap to choose date">
              <Calendar size={13} />
              <span>{formattedDateShort}</span>
              <ChevronDown size={12} />
              <input
                type="date"
                className="clean-date-hidden-input"
                value={selectedDateKey}
                max={todayKey}
                onChange={(e) => e.target.value && setSelectedDateKey(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="clean-log-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Existing Sessions Alert Banner */}
        {existingOnDate.length > 0 && (
          <div className="clean-existing-alert">
            <div className="existing-alert-left">
              <Activity size={13} className="alert-icon" />
              <span>
                <b>{existingOnDate.length} session{existingOnDate.length > 1 ? 's' : ''}</b> already logged for this date
              </span>
            </div>
            <div className="existing-session-chips">
              {existingOnDate.map((s, idx) => (
                <span key={s.id || idx} className="existing-pill">
                  <span>{s.routineTitle || 'Workout'}</span>
                  {onDeleteSession && (
                    <button
                      type="button"
                      className="btn-del-mini"
                      onClick={() => setPendingDeleteSession(s)}
                      title="Delete this session"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="clean-log-form">
          {/* Main Selection Tabs */}
          <div className="clean-type-switcher">
            <button
              type="button"
              className={`switcher-tab ${activeTab === 'routine' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('routine');
                if (routines.length > 0 && !selectedRoutineId) {
                  setSelectedRoutineId(routines[0].id);
                }
              }}
            >
              <Layers size={14} />
              <span>From Workout Routine</span>
            </button>
            <button
              type="button"
              className={`switcher-tab ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              <Plus size={14} />
              <span>Other / Custom Activity</span>
            </button>
          </div>

          {/* Routine Mode: Visual Routine Picker & Blueprint Card */}
          {activeTab === 'routine' ? (
            <div className="clean-routine-section">
              {routines.length > 0 ? (
                <>
                  <div className="clean-routine-selector-box">
                    <label className="clean-field-kicker" htmlFor="routine-select-dropdown">
                      Select Completed Routine
                    </label>
                    <div className="routine-select-wrapper">
                      <select
                        id="routine-select-dropdown"
                        className="clean-routine-select"
                        value={selectedRoutineId || ''}
                        onChange={(e) => {
                          const r = routines.find((item) => item.id === e.target.value);
                          if (r) handleSelectRoutine(r);
                        }}
                      >
                        {routines.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.title} · {r.category || 'Workout'} ({r.exercises?.length || 0} exercises · ~{r.durationMinutes || 60}m)
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="select-chevron" />
                    </div>
                  </div>

                  {/* High-Fidelity Routine Spotlight Card */}
                  {selectedRoutine && (
                    <div className="routine-spotlight-card animate-fade">
                      <div className="spotlight-header">
                        <div className="spotlight-title-box">
                          <h3 className="spotlight-title">{selectedRoutine.title}</h3>
                          <div className="spotlight-meta-tags">
                            <span className="spotlight-badge category">
                              {selectedRoutine.category || 'Routine'}
                            </span>
                            <span className="spotlight-badge duration">
                              <Clock size={11} />
                              ~{selectedRoutine.durationMinutes || 60}m
                            </span>
                            <span className="spotlight-badge exercises">
                              <Dumbbell size={11} />
                              {selectedRoutine.exercises?.length || 0} exercises
                            </span>
                          </div>
                        </div>

                        {indicativeVolumeKg > 0 && (
                          <div className="spotlight-volume-badge" title="Indicative volume calculated from routine blueprint">
                            <Sparkles size={12} />
                            <span>~{formatVolumeCompact(indicativeVolumeKg)} est.</span>
                          </div>
                        )}
                      </div>

                      {/* Exercise Name Snippets */}
                      {selectedRoutine.exercises && selectedRoutine.exercises.length > 0 && (
                        <div className="spotlight-exercise-preview">
                          <span className="preview-label">Movements:</span>
                          <span className="preview-list">
                            {selectedRoutine.exercises.slice(0, 4).map((ex) => ex.name).join(' · ')}
                            {selectedRoutine.exercises.length > 4 && ` +${selectedRoutine.exercises.length - 4} more`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="no-routines-empty">
                  <p>You have no saved workout routines yet. You can log an unscripted custom activity below.</p>
                </div>
              )}
            </div>
          ) : (
            /* Custom Activity Mode */
            <div className="clean-custom-section animate-fade">
              <div className="clean-field-group">
                <label className="clean-field-kicker" htmlFor="custom-session-title">
                  Activity Name
                </label>
                <input
                  id="custom-session-title"
                  type="text"
                  className="clean-text-input"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. 5km Morning Run, Bouldering, Swimming"
                  required
                />
              </div>

              {/* Quick Activity Presets */}
              <div className="custom-quick-presets">
                <span className="quick-presets-label">Popular activities:</span>
                <div className="preset-chip-list">
                  {CUSTOM_ACTIVITY_PRESETS.map((preset) => (
                    <button
                      key={preset.title}
                      type="button"
                      className="btn-activity-preset"
                      onClick={() => handleApplyCustomPreset(preset)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Duration Control (Clean & Tactile Stepper) */}
          <div className="clean-duration-row">
            <div className="duration-label-block">
              <span className="clean-field-kicker">Session Duration</span>
              <div className="duration-stepper-wrap">
                <button
                  type="button"
                  className="btn-stepper minus"
                  onClick={() => stepDuration(-5)}
                  title="Subtract 5 minutes"
                >
                  −5
                </button>
                <div className="duration-numeric-display">
                  <input
                    type="number"
                    min="5"
                    max="360"
                    className="duration-stepper-input"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                  />
                  <span className="duration-unit">min</span>
                </div>
                <button
                  type="button"
                  className="btn-stepper plus"
                  onClick={() => stepDuration(5)}
                  title="Add 5 minutes"
                >
                  +5
                </button>
              </div>
            </div>

            {/* Quick duration presets */}
            <div className="duration-quick-bar">
              {DURATION_PRESETS.map((mins) => (
                <button
                  key={mins}
                  type="button"
                  className={`btn-duration-pill ${Number(durationMinutes) === mins ? 'active' : ''}`}
                  onClick={() => setDurationMinutes(mins)}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Perceived Intensity / Effort (RPE) */}
          <div className="clean-rpe-row">
            <div className="rpe-header">
              <span className="clean-field-kicker">
                <Flame size={12} />
                <span>Effort &amp; Intensity</span>
              </span>
              <span className="rpe-active-badge">{selectedRpe}</span>
            </div>

            <div className="rpe-segmented-bar">
              {RPE_PRESETS.map((item) => {
                const isSelected = selectedRpe === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    className={`btn-rpe-segment ${item.color} ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedRpe(item.value)}
                    title={item.sub}
                  >
                    <span className="rpe-segment-label">{item.label}</span>
                    <span className="rpe-segment-sub">{item.sub.split('·')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Notes (Collapsible / Clean) */}
          <div className="clean-notes-row">
            <input
              type="text"
              className="clean-notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add optional reflection or notes (e.g. Felt strong, new PR on squats)..."
            />
          </div>

          {/* Footer Actions */}
          <div className="clean-log-footer">
            <button
              type="button"
              className="btn-gymmane-secondary clean-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-gymmane-primary clean-submit-btn"
            >
              <Check size={16} />
              <span>Log to Heatmap &amp; Schedule</span>
            </button>
          </div>
        </form>
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
