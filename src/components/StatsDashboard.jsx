import React, { useMemo, useState } from 'react';
import { Flame, Check, Award } from 'lucide-react';
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

  const progressRatio = Math.min(1, streak.activeDaysThisWeek / Math.max(1, goalTarget));
  const ringRadius = 21;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference * (1 - progressRatio);

  // Determine today's Monday=0..Sunday=6 index
  const todayJs = now.getDay();
  const todayMondayIdx = todayJs === 0 ? 6 : todayJs - 1;

  const captionText =
    streak.activeDaysThisWeek >= goalTarget
      ? `Weekly goal hit — ${streak.activeDaysThisWeek} active days logged`
      : streak.activeDaysThisWeek > 0
      ? `${goalTarget - streak.activeDaysThisWeek} more session${goalTarget - streak.activeDaysThisWeek === 1 ? '' : 's'} to reach your ${goalTarget}-day target`
      : 'Complete your first session to kick off your weekly rhythm';

  return (
    <section className="consistency-card" aria-label="Weekly consistency">
      <div className="consistency-top-row">
        <div className="consistency-title-block">
          <span className="consistency-kicker">YOUR WEEK</span>
          <h3 className="consistency-heading">Consistency</h3>
        </div>

        <div className="consistency-badges-group">
          <span
            className={`consistency-streak-pill ${streak.currentStreakDays > 0 ? 'hot' : ''}`}
            title="Current consecutive day streak"
          >
            <Flame size={14} />
            {streak.currentStreakDays > 0 ? `${streak.currentStreakDays}d streak` : '0 sess.'}
          </span>
          {bestStreak > 0 && (
            <span className="consistency-best-pill" title="Longest streak ever">
              <Award size={13} />
              Best {bestStreak}d
            </span>
          )}
        </div>
      </div>

      <div className="consistency-body-row">
        <div
          className="consistency-ring-wrap"
          title={`${streak.activeDaysThisWeek} of ${goalTarget} weekly target sessions`}
        >
          <svg className="consistency-ring-svg" viewBox="0 0 54 54" aria-hidden="true">
            <circle className="consistency-ring-track" cx="27" cy="27" r={ringRadius} />
            <circle
              className="consistency-ring-fill"
              cx="27"
              cy="27"
              r={ringRadius}
              strokeDasharray={ringCircumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className="consistency-ring-val">{streak.activeDaysThisWeek}</span>
        </div>

        <div className="consistency-days-wrap">
          <div className="weekly-days-pills" role="list" aria-label="Weekly workout days">
            {streak.weeklyActivityMap.map((done, idx) => {
              const isToday = idx === todayMondayIdx;
              return (
                <div
                  key={WEEKDAY_NAMES[idx]}
                  role="listitem"
                  className={`week-day-pill ${done ? 'active' : ''} ${isToday ? 'is-today' : ''}`}
                  title={`${WEEKDAY_NAMES[idx]}: ${done ? 'Completed' : isToday ? 'Today' : 'Rest / Planned'}`}
                >
                  <span className="week-day-letter">{WEEKDAY_LETTERS[idx]}</span>
                  <span className="week-day-dot">
                    {done ? <Check size={12} strokeWidth={3} /> : null}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compact Weekly Snapshot Strip */}
      <div className="week-mini-stats">
        <div className="week-mini-stat">
          <span className="week-mini-lbl">This Week</span>
          <span className="week-mini-val">{weekSummary.weekTime}</span>
          <span className="week-mini-sub">
            {weekSummary.weekSessions} session{weekSummary.weekSessions === 1 ? '' : 's'} logged
          </span>
        </div>
        <div className="week-mini-stat">
          <span className="week-mini-lbl">Streak Record</span>
          <span className="week-mini-val">{bestStreak}d</span>
          <span className="week-mini-sub">
            {weekSummary.totalSessions} total completed
          </span>
        </div>
      </div>

      <div className="consistency-footer-row">
        <p className="consistency-caption">{captionText}</p>
        <div className="consistency-goal-controls">
          {onChangeGoalTarget && (
            <button
              type="button"
              className="goal-step-btn"
              onClick={() => onChangeGoalTarget(Math.max(1, goalTarget - 1))}
              disabled={goalTarget <= 1}
              aria-label="Decrease weekly goal"
              title="Decrease weekly target"
            >
              -
            </button>
          )}
          <span className="consistency-goal-chip">{streak.activeDaysThisWeek}/{goalTarget} goal</span>
          {onChangeGoalTarget && (
            <button
              type="button"
              className="goal-step-btn"
              onClick={() => onChangeGoalTarget(Math.min(7, goalTarget + 1))}
              disabled={goalTarget >= 7}
              aria-label="Increase weekly goal"
              title="Increase weekly target"
            >
              +
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
