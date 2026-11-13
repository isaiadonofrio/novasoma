import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Trash2,
  Check,
  X,
  Flame,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';
import { toLocalDateKey } from '../utils/analytics';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { ConfirmModal } from './ConfirmModal';

const RPE_CHOICES = [
  { value: 'RPE 6', label: 'Light', rpe: 'Recovery · RPE 6', tone: 'easy' },
  { value: 'RPE 7-8', label: 'Moderate', rpe: 'Working · RPE 7-8', tone: 'target' },
  { value: 'RPE 8-9', label: 'Hard', rpe: 'Near Limit · RPE 8-9', tone: 'hard' },
  { value: 'RPE 9-10', label: 'Max Effort', rpe: 'All-Out · RPE 10', tone: 'max' },
];

/**
 * Automatically computes indicative volume in kg for a routine
 * based on user history of that routine, or estimated from planned sets & equipment.
 */
function getIndicativeRoutineVolume(routine, workoutHistory = []) {
  if (!routine || !Array.isArray(routine.exercises)) return 0;

  const pastSession = (workoutHistory || []).find(
    (s) => s.routineId === routine.id && Number(s.volumeKg) > 0
  );
  if (pastSession && pastSession.volumeKg) {
    return Math.round(Number(pastSession.volumeKg));
  }

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

  // Parse calendar year & month from selectedDateKey
  const [calendarYear, setCalendarYear] = useState(() => {
    const [y] = (initialDateKey || toLocalDateKey(new Date())).split('-').map(Number);
    return y;
  });
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const [, m] = (initialDateKey || toLocalDateKey(new Date())).split('-').map(Number);
    return m - 1;
  });
  const [showCalendar, setShowCalendar] = useState(false);

  // Default workout selection
  const defaultOption = routines.length > 0 ? `routine:${routines[0].id}` : 'activity:Gym Session';
  const [selectedWorkoutOption, setSelectedWorkoutOption] = useState(defaultOption);
  const [customWorkoutTitle, setCustomWorkoutTitle] = useState('Gym Workout');
  const [durationMinutes, setDurationMinutes] = useState(() => routines[0]?.durationMinutes || 60);
  const [selectedRpe, setSelectedRpe] = useState('RPE 7-8');
  const [notes, setNotes] = useState('');
  const [pendingDeleteSession, setPendingDeleteSession] = useState(null);

  useBodyScrollLock(isOpen);

  // Check if selected date is today
  const isToday = selectedDateKey === todayKey;

  // Formatted date string (e.g. "Tuesday, Sep 22, 2026")
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

  // Calendar month name
  const calendarMonthName = useMemo(() => {
    const d = new Date(calendarYear, calendarMonth, 1);
    return d.toLocaleDateString('en-US', { month: 'long' });
  }, [calendarYear, calendarMonth]);

  // Day shift handler: easily jump 1 day back or forward with 1 tap!
  const handleShiftDay = (delta) => {
    const [year, month, day] = selectedDateKey.split('-').map(Number);
    const d = new Date(year, month - 1, day, 12, 0, 0);
    d.setDate(d.getDate() + delta);
    const newKey = toLocalDateKey(d);
    if (newKey && newKey <= todayKey) {
      setSelectedDateKey(newKey);
      setCalendarYear(d.getFullYear());
      setCalendarMonth(d.getMonth());
    }
  };

  const handleShiftMonth = (delta) => {
    let nextMonth = calendarMonth + delta;
    let nextYear = calendarYear;
    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    } else if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
    setCalendarMonth(nextMonth);
    setCalendarYear(nextYear);
  };

  // Custom CSS-themed calendar days grid generator
  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const jsDay = firstDay.getDay();
    const startOffset = jsDay === 0 ? 6 : jsDay - 1; // Mon = 0..Sun = 6

    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(calendarYear, calendarMonth, 0).getDate();

    const days = [];

    // Previous month filler days
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevM = calendarMonth === 0 ? 11 : calendarMonth - 1;
      const prevY = calendarMonth === 0 ? calendarYear - 1 : calendarYear;
      const key = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dayNum,
        key,
        isCurrentMonth: false,
        isFuture: key > todayKey,
        isSelected: key === selectedDateKey,
        isToday: key === todayKey
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const key = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNum: i,
        key,
        isCurrentMonth: true,
        isFuture: key > todayKey,
        isSelected: key === selectedDateKey,
        isToday: key === todayKey
      });
    }

    // Trailing days to complete 35 or 42 grid cells
    const targetTotal = days.length > 35 ? 42 : 35;
    const remaining = targetTotal - days.length;
    for (let i = 1; i <= remaining; i++) {
      const nextM = calendarMonth === 11 ? 0 : calendarMonth + 1;
      const nextY = calendarMonth === 11 ? calendarYear + 1 : calendarYear;
      const key = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        dayNum: i,
        key,
        isCurrentMonth: false,
        isFuture: key > todayKey,
        isSelected: key === selectedDateKey,
        isToday: key === todayKey
      });
    }

    return days;
  }, [calendarYear, calendarMonth, selectedDateKey, todayKey]);

  // When workout option changes, update duration automatically
  const handleWorkoutOptionChange = (optionValue) => {
    setSelectedWorkoutOption(optionValue);
    if (optionValue.startsWith('routine:')) {
      const rId = optionValue.replace('routine:', '');
      const routine = routines.find((r) => r.id === rId);
      if (routine?.durationMinutes) {
        setDurationMinutes(routine.durationMinutes);
      }
    } else if (optionValue.startsWith('activity:')) {
      const actName = optionValue.replace('activity:', '');
      setCustomWorkoutTitle(actName);
      if (actName.includes('Cardio') || actName.includes('Running')) {
        setDurationMinutes(45);
      } else if (actName.includes('Mobility')) {
        setDurationMinutes(30);
      } else {
        setDurationMinutes(60);
      }
    }
  };

  // Find workouts already logged on selected date
  const existingOnDate = useMemo(() => {
    if (!selectedDateKey) return [];
    return (workoutHistory || []).filter(
      (s) => toLocalDateKey(s.date || s.completedAt) === selectedDateKey
    );
  }, [workoutHistory, selectedDateKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDateKey) return;

    let finalTitle = 'Workout Session';
    let routineId = null;
    let category = 'Strength';
    let indicativeVol = 0;
    let loggedSets = {};

    if (selectedWorkoutOption.startsWith('routine:')) {
      const rId = selectedWorkoutOption.replace('routine:', '');
      const r = routines.find((item) => item.id === rId);
      if (r) {
        finalTitle = r.title;
        routineId = r.id;
        category = r.category || 'Strength';
        indicativeVol = getIndicativeRoutineVolume(r, workoutHistory);
        if (Array.isArray(r.exercises)) {
          loggedSets = Object.fromEntries(
            r.exercises.map((ex, i) => [
              ex.id || `ex-${i}`,
              Array.from({ length: ex.defaultSets || 3 }, () => ({
                reps: String(ex.defaultReps || '10'),
                weightKg: 0,
                completed: true
              }))
            ])
          );
        }
      }
    } else if (selectedWorkoutOption.startsWith('activity:')) {
      finalTitle = selectedWorkoutOption.replace('activity:', '');
      category = finalTitle.includes('Running') || finalTitle.includes('Cycling') ? 'Cardio' : 'General';
    } else {
      finalTitle = customWorkoutTitle.trim() || 'Workout Session';
      category = 'Custom';
    }

    const finalMinutes = Math.max(5, Math.min(360, Number(durationMinutes) || 60));
    const dateIso = `${selectedDateKey}T12:00:00.000Z`;

    const newSession = {
      id: `manual-${Date.now()}`,
      routineId,
      routineTitle: finalTitle,
      category,
      date: dateIso,
      completedAt: dateIso,
      durationSeconds: finalMinutes * 60,
      volumeKg: indicativeVol,
      rpe: selectedRpe || null,
      notes: notes.trim() || null,
      isManual: true,
      loggedSets
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
      aria-labelledby="clean-modal-title"
    >
      <div className="pure-log-modal animate-fade">
        {/* Clean Modal Header */}
        <div className="pure-modal-header">
          <div className="pure-header-left">
            <div className="pure-header-icon">
              <Calendar size={18} />
            </div>
            <h2 id="clean-modal-title" className="pure-header-title">
              Log Workout
            </h2>
          </div>

          <button
            type="button"
            className="pure-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* Existing Session Alert (if already logged on this day) */}
        {existingOnDate.length > 0 && (
          <div className="pure-existing-bar">
            <div className="existing-bar-label">
              <Activity size={13} />
              <span>Already logged: <b>{existingOnDate[0]?.routineTitle || 'Workout'}</b></span>
            </div>
            {onDeleteSession && (
              <button
                type="button"
                className="btn-del-existing"
                onClick={() => setPendingDeleteSession(existingOnDate[0])}
                title="Delete this session"
              >
                <Trash2 size={12} />
                <span>Remove</span>
              </button>
            )}
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="pure-modal-body">
          {/* Section 1: In-Theme Date Picker Directly Below Header */}
          <div className="pure-date-block">
            <div className="pure-date-header">
              <span className="pure-field-label">Date of Workout</span>
              {isToday && <span className="pure-today-pill">Today</span>}
            </div>

            <div className="pure-date-stepper-row">
              <button
                type="button"
                className="pure-date-nav-btn"
                onClick={() => handleShiftDay(-1)}
                title="Previous Day"
                aria-label="Previous Day"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                className="pure-date-display-btn"
                onClick={() => setShowCalendar((prev) => !prev)}
                title="Tap to choose from calendar"
              >
                <Calendar size={14} className="date-icon" />
                <span className="date-display-text">{formattedDateTitle}</span>
                <ChevronDown size={13} className={`chevron-indicator ${showCalendar ? 'open' : ''}`} />
              </button>

              <button
                type="button"
                className="pure-date-nav-btn"
                disabled={isToday}
                onClick={() => handleShiftDay(1)}
                title="Next Day"
                aria-label="Next Day"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Custom In-Theme CSS Calendar Dropdown */}
            {showCalendar && (
              <div className="pure-custom-calendar animate-fade">
                <div className="cal-nav-bar">
                  <button type="button" className="cal-arrow-btn" onClick={() => handleShiftMonth(-1)}>
                    <ChevronLeft size={14} />
                  </button>
                  <span className="cal-title">{calendarMonthName} {calendarYear}</span>
                  <button type="button" className="cal-arrow-btn" onClick={() => handleShiftMonth(1)}>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="cal-weekday-row">
                  <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                </div>

                <div className="cal-day-grid">
                  {calendarDays.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      disabled={d.isFuture}
                      className={`cal-day-button ${d.isSelected ? 'selected' : ''} ${d.isToday ? 'is-today' : ''} ${!d.isCurrentMonth ? 'other-month' : ''}`}
                      onClick={() => {
                        setSelectedDateKey(d.key);
                        setShowCalendar(false);
                      }}
                    >
                      {d.dayNum}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Workout / Routine (Simplified & Uncluttered) */}
          <div className="pure-field-block">
            <label className="pure-field-label" htmlFor="workout-selector-input">
              Workout / Activity
            </label>
            <div className="pure-select-wrap">
              <select
                id="workout-selector-input"
                className="pure-native-select"
                value={selectedWorkoutOption}
                onChange={(e) => handleWorkoutOptionChange(e.target.value)}
              >
                {routines.length > 0 && (
                  <optgroup label="Saved Routines">
                    {routines.map((r) => (
                      <option key={r.id} value={`routine:${r.id}`}>
                        {r.title} ({r.category || 'Routine'})
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="Common Workouts">
                  <option value="activity:Gym Session">Gym Session</option>
                  <option value="activity:Running / Cardio">Running / Cardio</option>
                  <option value="activity:Cycling">Cycling</option>
                  <option value="activity:Swimming">Swimming</option>
                  <option value="activity:Mobility & Stretch">Mobility &amp; Stretch</option>
                  <option value="activity:Sports / Games">Sports / Games</option>
                </optgroup>
                <option value="custom">+ Other (Type Custom Name)</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>

            {selectedWorkoutOption === 'custom' && (
              <input
                type="text"
                className="pure-text-input custom-name animate-fade"
                value={customWorkoutTitle}
                onChange={(e) => setCustomWorkoutTitle(e.target.value)}
                placeholder="e.g. Bouldering, Track Workout, Calisthenics"
                autoFocus
                required
              />
            )}
          </div>

          {/* Section 3: Clean Duration Control (Tactile Slider, No Clutter!) */}
          <div className="pure-field-block">
            <div className="pure-slider-header">
              <label className="pure-field-label" htmlFor="pure-duration-slider">
                Session Duration
              </label>
              <div className="pure-duration-badge">
                <Clock size={12} />
                <span className="duration-val">{durationMinutes}</span>
                <span className="duration-lbl">min</span>
              </div>
            </div>

            <div className="pure-slider-wrap">
              <input
                id="pure-duration-slider"
                type="range"
                min="10"
                max="150"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="pure-slider"
              />
              <div className="pure-slider-labels">
                <span>15m</span>
                <span>30m</span>
                <span>45m</span>
                <span>60m</span>
                <span>75m</span>
                <span>90m</span>
                <span>120m+</span>
              </div>
            </div>
          </div>

          {/* Section 4: Intensity & Difficulty (Clean 4-Button Grid) */}
          <div className="pure-field-block">
            <div className="pure-intensity-header">
              <span className="pure-field-label">
                <Flame size={12} />
                <span>Difficulty &amp; Intensity</span>
              </span>
              <span className="intensity-selected-tag">{selectedRpe}</span>
            </div>

            <div className="pure-intensity-grid">
              {RPE_CHOICES.map((item) => {
                const isSelected = selectedRpe === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    className={`pure-intensity-card ${item.tone} ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedRpe(item.value)}
                    title={item.rpe}
                  >
                    <span className="intensity-title">{item.label}</span>
                    <span className="intensity-sub">{item.rpe.split('·')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Clean Optional Notes Input */}
          <div className="pure-field-block">
            <input
              type="text"
              className="pure-text-input notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes (e.g. felt energized, great pump)..."
            />
          </div>

          {/* Footer Actions */}
          <div className="pure-modal-footer">
            <button
              type="button"
              className="btn-gymmane-secondary pure-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-gymmane-primary pure-submit-btn"
            >
              <Check size={16} />
              <span>Log Workout</span>
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
