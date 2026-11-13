import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Activity,
  Dumbbell,
  Zap,
  Bike,
  Mountain,
  Waves,
  Sparkles,
  Plus
} from 'lucide-react';
import { toLocalDateKey } from '../utils/analytics';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { ConfirmModal } from './ConfirmModal';

const COMMON_WORKOUTS = [
  { id: 'gym', name: 'Gym Workout', icon: Dumbbell, defaultDuration: 60, tone: 'clay' },
  { id: 'running', name: 'Running / Jogging', icon: Zap, defaultDuration: 45, tone: 'ember' },
  { id: 'cycling', name: 'Cycling / Bike', icon: Bike, defaultDuration: 50, tone: 'teal' },
  { id: 'trekking', name: 'Trekking / Hiking', icon: Mountain, defaultDuration: 90, tone: 'clay' },
  { id: 'swimming', name: 'Swimming', icon: Waves, defaultDuration: 45, tone: 'teal' },
  { id: 'tennis', name: 'Tennis / Padel', icon: Activity, defaultDuration: 60, tone: 'ember' },
  { id: 'mobility', name: 'Mobility & Stretch', icon: Sparkles, defaultDuration: 30, tone: 'clay' },
  { id: 'sports', name: 'Sports & Games', icon: Activity, defaultDuration: 60, tone: 'ember' },
  { id: 'custom', name: '+ Other (Custom)', icon: Plus, defaultDuration: 60, tone: 'custom' },
];

const INTENSITY_CHOICES = [
  { id: 'Light', label: 'Light', tone: 'easy' },
  { id: 'Moderate', label: 'Moderate', tone: 'target' },
  { id: 'Hard', label: 'Hard', tone: 'hard' },
  { id: 'Max Effort', label: 'Max Effort', tone: 'max' },
];

export function ManualWorkoutLogModal({
  isOpen = false,
  initialDateKey = null,
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

  // Clean workout selection (Classics & Common only)
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('gym');
  const [customWorkoutTitle, setCustomWorkoutTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [intensity, setIntensity] = useState('Moderate');
  const [notes, setNotes] = useState('');
  const [pendingDeleteSession, setPendingDeleteSession] = useState(null);

  // In-theme workout dropdown state
  const [showWorkoutMenu, setShowWorkoutMenu] = useState(false);
  const workoutMenuRef = useRef(null);

  useBodyScrollLock(isOpen);

  // Outside click listener for custom workout dropdown
  useEffect(() => {
    function handleOutsideClick(e) {
      if (workoutMenuRef.current && !workoutMenuRef.current.contains(e.target)) {
        setShowWorkoutMenu(false);
      }
    }
    if (showWorkoutMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [showWorkoutMenu]);

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

  // Day shift handler: jump 1 day back or forward with 1 tap
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
    const startOffset = jsDay === 0 ? 6 : jsDay - 1;

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

  // Selected workout activity lookup
  const selectedWorkout = useMemo(() => {
    return COMMON_WORKOUTS.find((w) => w.id === selectedWorkoutId) || COMMON_WORKOUTS[0];
  }, [selectedWorkoutId]);

  const WorkoutIcon = selectedWorkout.icon;

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

    let finalTitle = 'Gym Workout';
    let category = 'Strength';

    if (selectedWorkoutId === 'custom') {
      finalTitle = customWorkoutTitle.trim() || 'Custom Workout';
      category = 'Custom';
    } else {
      finalTitle = selectedWorkout.name;
      if (['running', 'cycling', 'swimming'].includes(selectedWorkout.id)) {
        category = 'Cardio';
      } else if (selectedWorkout.id === 'trekking') {
        category = 'Outdoor';
      } else if (selectedWorkout.id === 'mobility') {
        category = 'Recovery';
      } else if (['tennis', 'sports'].includes(selectedWorkout.id)) {
        category = 'Sports';
      } else {
        category = 'Strength';
      }
    }

    const finalMinutes = Math.max(5, Math.min(360, Number(durationMinutes) || 60));
    const dateIso = `${selectedDateKey}T12:00:00.000Z`;

    const newSession = {
      id: `manual-${Date.now()}`,
      routineId: null,
      routineTitle: finalTitle,
      category,
      date: dateIso,
      completedAt: dateIso,
      durationMinutes: finalMinutes,
      durationSeconds: finalMinutes * 60,
      volumeKg: 0,
      intensity,
      rpe: intensity,
      notes: notes.trim() || null,
      isManual: true,
      loggedSets: {}
    };

    onSaveSession(newSession);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showWorkoutMenu) {
          setShowWorkoutMenu(false);
        } else if (showCalendar) {
          setShowCalendar(false);
        } else if (!pendingDeleteSession) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, pendingDeleteSession, showWorkoutMenu, showCalendar]);

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
        {/* Modal Header */}
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

        {/* Existing Session Notice (if already logged on this day) */}
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
          {/* Section 1: In-Theme Date Stepper & Calendar */}
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
                onClick={() => {
                  setShowCalendar((prev) => !prev);
                  setShowWorkoutMenu(false);
                }}
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

          {/* Section 2: Workout Type (Classics & Common Only) */}
          <div className="pure-field-block" ref={workoutMenuRef}>
            <label className="pure-field-label">Workout Type</label>

            <div className="pure-custom-select-wrap">
              <button
                type="button"
                className={`pure-workout-display-btn ${showWorkoutMenu ? 'open' : ''}`}
                onClick={() => {
                  setShowWorkoutMenu((prev) => !prev);
                  setShowCalendar(false);
                }}
                aria-haspopup="listbox"
                aria-expanded={showWorkoutMenu}
              >
                <div className="trigger-left">
                  <div className={`trigger-icon-box ${selectedWorkout.tone}`}>
                    <WorkoutIcon size={16} />
                  </div>
                  <span className="trigger-title">
                    {selectedWorkoutId === 'custom'
                      ? (customWorkoutTitle.trim() || 'Custom Workout')
                      : selectedWorkout.name}
                  </span>
                </div>
                <ChevronDown size={14} className={`chevron-indicator ${showWorkoutMenu ? 'open' : ''}`} />
              </button>

              {/* In-Theme Custom Dropdown Menu Panel */}
              {showWorkoutMenu && (
                <div className="pure-custom-dropdown-panel animate-fade" role="listbox">
                  <div className="dropdown-items-list">
                    {COMMON_WORKOUTS.map((item) => {
                      const isSelected = selectedWorkoutId === item.id;
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={`dropdown-item-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedWorkoutId(item.id);
                            setDurationMinutes(item.defaultDuration);
                            setShowWorkoutMenu(false);
                          }}
                        >
                          <div className="item-main">
                            <div className={`item-icon-circle ${item.tone}`}>
                              <ItemIcon size={14} />
                            </div>
                            <span className="item-name">{item.name}</span>
                          </div>
                          {isSelected && <Check size={14} className="item-check" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {selectedWorkoutId === 'custom' && (
              <input
                type="text"
                className="pure-text-input custom-name animate-fade"
                value={customWorkoutTitle}
                onChange={(e) => setCustomWorkoutTitle(e.target.value)}
                placeholder="e.g. Bouldering, Boxing, Calisthenics"
                autoFocus
                required
              />
            )}
          </div>

          {/* Section 3: Clean Duration Control (Tactile Range Slider) */}
          <div className="pure-field-block">
            <div className="pure-slider-header">
              <label className="pure-field-label" htmlFor="pure-duration-slider">
                Duration
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

          {/* Section 4: Simplified Intensity (No Reps / No RPE Clutter) */}
          <div className="pure-field-block">
            <label className="pure-field-label">Intensity</label>

            <div className="pure-intensity-grid">
              {INTENSITY_CHOICES.map((item) => {
                const isSelected = intensity === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`pure-intensity-btn ${item.tone} ${isSelected ? 'active' : ''}`}
                    onClick={() => setIntensity(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 5: Optional Notes */}
          <div className="pure-field-block">
            <input
              type="text"
              className="pure-text-input notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes (e.g. felt great, new PR)..."
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
