import React, { useMemo, useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import {
  calculateStreak,
  calculateBestStreak,
  toLocalDateKey,
  formatHoursMinutes
} from '../utils/analytics';

const WEEKDAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function StatsDashboard({
  workoutHistory = [],
  goalTarget = 4,
  onChangeGoalTarget,
  onSelectDate,
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setNow(new Date());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
  const streak = useMemo(() => calculateStreak(workoutHistory), [workoutHistory]);
  const bestStreak = useMemo(() => calculateBestStreak(workoutHistory), [workoutHistory]);

  const weekSummary = useMemo(() => {
    const dayFromMonday = (now.getDay() + 6) % 7;
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - dayFromMonday);
    const mondayKey = toLocalDateKey(monday);

    let weekSessions = 0;
    let weekSeconds = 0;
    workoutHistory.forEach((item) => {
      const k = toLocalDateKey(item.date || item.completedAt);
      if (k && k >= mondayKey) {
        weekSessions += 1;
        weekSeconds += Number(item.durationSeconds) || 0;
      }
    });

    return {
      weekSessions,
      weekTime: formatHoursMinutes(weekSeconds),
      totalSessions: workoutHistory.length
    };
  }, [workoutHistory, now]);

  // Determine today's Monday=0..Sunday=6 index
  const todayJs = now.getDay();
  const todayMondayIdx = todayJs === 0 ? 6 : todayJs - 1;
  const todayKey = useMemo(() => toLocalDateKey(now), [now]);

  const weekDayDates = useMemo(() => {
    const dayFromMonday = (now.getDay() + 6) % 7;
    const monday = new Date(now);
    monday.setHours(12, 0, 0, 0);
    monday.setDate(now.getDate() - dayFromMonday);

    return WEEKDAY_NAMES.map((_, idx) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + idx);
      const key = toLocalDateKey(d);
      const isFuture = key > todayKey;
      return { date: d, key, isFuture };
    });
  }, [now, todayKey]);

  const isGoalMet = streak.activeDaysThisWeek >= goalTarget;

  const captionText = isGoalMet
    ? `Weekly target reached — ${streak.activeDaysThisWeek} active days logged! 🔥`
    : streak.activeDaysThisWeek > 0
    ? `${goalTarget - streak.activeDaysThisWeek} more session${goalTarget - streak.activeDaysThisWeek === 1 ? '' : 's'} to hit your ${goalTarget}-day target`
    : `Complete your first session to kick off this week's rhythm`;

  return (
    <section className="consistency-card" aria-label="Weekly consistency">
      <div className="consistency-top-row">
        <div className="consistency-title-block">
          <span className="consistency-kicker">YOUR WEEK</span>
          <h3 className="consistency-heading">Weekly Consistency</h3>
        </div>

        <div className="consistency-badges-group">
          <span
            className={`consistency-target-badge ${isGoalMet ? 'goal-met' : ''}`}
            title={`${streak.activeDaysThisWeek} of ${goalTarget} target sessions completed`}
          >
            {isGoalMet ? (
              <>
                <Check size={12} strokeWidth={3} />
                <span>{streak.activeDaysThisWeek}/{goalTarget} Target Met</span>
              </>
            ) : (
              <>
                <span className="target-bullet">●</span>
                <span>{streak.activeDaysThisWeek}/{goalTarget} Target</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="consistency-body-row clean">
        <div className="weekly-days-pills full-width" role="list" aria-label="Weekly workout days">
          {streak.weeklyActivityMap.map((done, idx) => {
            const isToday = idx === todayMondayIdx;
            const dayMeta = weekDayDates[idx];
            const isFuture = dayMeta?.isFuture;
            const dateKey = dayMeta?.key;

            return (
              <button
                key={WEEKDAY_NAMES[idx]}
                type="button"
                disabled={isFuture}
                role="listitem"
                className={`week-day-pill ${done ? 'active' : ''} ${isToday ? 'is-today' : ''} ${isFuture ? 'is-future' : 'clickable'}`}
                title={`${WEEKDAY_NAMES[idx]}: ${
                  done
                    ? 'Completed (Click to view or log another)'
                    : isFuture
                    ? 'Future day'
                    : 'Click to log completed workout'
                }`}
                onClick={() => {
                  if (!isFuture && onSelectDate && dateKey) {
                    onSelectDate(dateKey);
                  }
                }}
              >
                <span className="week-day-letter">{WEEKDAY_LETTERS[idx]}</span>
                <span className="week-day-status">
                  {done ? (
                    <Check size={12} strokeWidth={3} className="done-check" />
                  ) : isToday ? (
                    <span className="today-dot" />
                  ) : null}
                </span>
                {isToday && <span className="today-micro-badge">TODAY</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Weekly Snapshot Strip */}
      <div className="week-mini-stats">
        <div className="week-mini-stat">
          <span className="week-mini-lbl">Time This Week</span>
          <span className="week-mini-val">{weekSummary.weekTime}</span>
          <span className="week-mini-sub">
            {weekSummary.weekSessions} session{weekSummary.weekSessions === 1 ? '' : 's'} logged
          </span>
        </div>
        <div className="week-mini-stat">
          <span className="week-mini-lbl">Current Streak</span>
          <span className="week-mini-val">{streak.currentStreakDays}d</span>
          <span className="week-mini-sub">
            Best: {bestStreak}d record
          </span>
        </div>
      </div>

      <div className="consistency-footer-row">
        <p className="consistency-caption">{captionText}</p>

        {onChangeGoalTarget && (
          <div className="consistency-target-stepper" title="Set your weekly target frequency">
            <span className="target-stepper-lbl">Goal:</span>
            <button
              type="button"
              className="target-stepper-btn"
              onClick={() => onChangeGoalTarget(Math.max(1, goalTarget - 1))}
              disabled={goalTarget <= 1}
              aria-label="Decrease target"
            >
              −
            </button>
            <span className="target-stepper-val">{goalTarget}d</span>
            <button
              type="button"
              className="target-stepper-btn"
              onClick={() => onChangeGoalTarget(Math.min(7, goalTarget + 1))}
              disabled={goalTarget >= 7}
              aria-label="Increase target"
            >
              +
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
