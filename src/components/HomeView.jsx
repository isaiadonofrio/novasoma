import React, { useMemo, useState, useEffect } from 'react';
import {
  History,
  Sparkles,
  Calendar,
  Play,
  Check
} from 'lucide-react';
import { MiniBodyMap } from './MiniBodyMap';
import { StatsDashboard } from './StatsDashboard';
import { YearHeatmapCard } from './YearHeatmapCard';
import { RoutinesSection } from './RoutinesSection';
import { WorkoutEditorModal } from './WorkoutEditorModal';
import { ManualWorkoutLogModal } from './ManualWorkoutLogModal';
import {
  calculateWeeklyMuscleFrequency,
  toLocalDateKey
} from '../utils/analytics';
import { formatVolumeCompact } from '../utils/formatting';

export function HomeView({
  routines = [],
  workoutHistory = [],
  weeklyGoal = 4,
  onChangeWeeklyGoal,
  onOpenHistory,
  onSelectRoutineToView,
  onStartRoutineLive,
  onCreateRoutine,
  onDuplicateRoutine,
  onDeleteRoutine,
  onLogManualWorkout,
  onDeleteSession
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [manualLogDateKey, setManualLogDateKey] = useState(null);

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

  const todayDisplay = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const todayKey = useMemo(() => toLocalDateKey(now), [now]);

  const weeklyMuscleHits = useMemo(
    () => calculateWeeklyMuscleFrequency(workoutHistory, routines),
    [workoutHistory, routines]
  );

  const todayWorkouts = useMemo(() => {
    return (workoutHistory || []).filter(
      (s) => toLocalDateKey(s.date || s.completedAt) === todayKey
    );
  }, [workoutHistory, todayKey]);

  const isTrainedToday = todayWorkouts.length > 0;

  const recommendedRoutine = useMemo(() => {
    if (!routines || routines.length === 0) return null;
    return routines[0];
  }, [routines]);

  const recentSessions = useMemo(() => {
    return [...(workoutHistory || [])]
      .sort((a, b) => new Date(b.completedAt || b.date || 0) - new Date(a.completedAt || a.date || 0))
      .slice(0, 3);
  }, [workoutHistory]);

  const weeklySummaryStats = useMemo(() => {
    const dayFromMonday = (now.getDay() + 6) % 7;
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - dayFromMonday);
    const mondayKey = toLocalDateKey(monday);

    let weekVol = 0;
    let weekCount = 0;
    (workoutHistory || []).forEach((item) => {
      const k = toLocalDateKey(item.date || item.completedAt);
      if (k && k >= mondayKey) {
        weekCount += 1;
        weekVol += Number(item.volumeKg) || 0;
      }
    });

    return {
      weekVol,
      weekCount,
    };
  }, [workoutHistory, now]);

  return (
    <div className="gymmane-home">
      <section className="home-clean-hero">
        <div className="gymmane-wrap">
          <div className="hero-clean-header-row">
            <div className="hero-brand-date-box">
              <div className="hero-date-icon-frame" title="Today">
                <Calendar size={14} />
              </div>
              <span className="home-date-kicker">TODAY · {todayDisplay}</span>
            </div>
          </div>

          <div className="home-hero-bento">
            {/* Left: Today Focus, Weekly Muscle Hit Map & Recent Sessions */}
            <section className="home-summary-panel" aria-label="Today focus and weekly muscle stimulus">
              {/* Top Banner: Today's Focus & Launch Action */}
              {isTrainedToday ? (
                <div className="today-focus-banner completed animate-fade">
                  <div className="today-focus-header">
                    <span className="today-focus-kicker">
                      <Check size={13} strokeWidth={3} /> COMPLETED TODAY
                    </span>
                    <span className="today-focus-meta-pill">
                      {todayWorkouts[0].durationMinutes || 60}m logged
                    </span>
                  </div>
                  <div className="today-focus-body">
                    <div className="today-focus-info">
                      <h3 className="today-focus-title">
                        {todayWorkouts[0].routineTitle || 'Workout Session'}
                      </h3>
                      <span className="today-focus-sub">
                        {todayWorkouts[0].category || 'Training'} session · Great job keeping up your rhythm!
                      </span>
                    </div>
                    <div className="today-focus-actions">
                      <button
                        type="button"
                        className="btn-focus-view"
                        onClick={() => setManualLogDateKey(todayKey)}
                      >
                        + Log Another
                      </button>
                    </div>
                  </div>
                </div>
              ) : recommendedRoutine ? (
                <div className="today-focus-banner scheduled animate-fade">
                  <div className="today-focus-header">
                    <span className="today-focus-kicker">
                      <Sparkles size={13} /> TODAY'S SCHEDULED WORKOUT
                    </span>
                    <span className="today-focus-meta-pill">
                      ~{recommendedRoutine.estimatedMinutes || 60}m planned
                    </span>
                  </div>
                  <div className="today-focus-body">
                    <div className="today-focus-info">
                      <h3 className="today-focus-title">{recommendedRoutine.title}</h3>
                      <span className="today-focus-sub">
                        {recommendedRoutine.exercises?.length || 0} movements · {recommendedRoutine.category || 'Target Session'}
                      </span>
                    </div>
                    <div className="today-focus-actions">
                      {onStartRoutineLive && (
                        <button
                          type="button"
                          className="btn-focus-start"
                          onClick={() => onStartRoutineLive(recommendedRoutine)}
                          title="Start live workout session"
                        >
                          <Play size={13} fill="currentColor" />
                          <span>Start Workout</span>
                        </button>
                      )}
                      {onSelectRoutineToView && (
                        <button
                          type="button"
                          className="btn-focus-view"
                          onClick={() => onSelectRoutineToView(recommendedRoutine)}
                          title="View routine details"
                        >
                          View Routine
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="today-focus-banner scheduled animate-fade">
                  <div className="today-focus-header">
                    <span className="today-focus-kicker">
                      <Sparkles size={13} /> READY TO TRAIN
                    </span>
                    <span className="today-focus-meta-pill">Schedule Free</span>
                  </div>
                  <div className="today-focus-body">
                    <div className="today-focus-info">
                      <h3 className="today-focus-title">No Routine Scheduled Today</h3>
                      <span className="today-focus-sub">Choose a workout below or take an active recovery day.</span>
                    </div>
                    <div className="today-focus-actions">
                      <button
                        type="button"
                        className="btn-focus-view"
                        onClick={() => setManualLogDateKey(todayKey)}
                      >
                        + Log Workout
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Split: Weekly Muscle Hit Map + Recent Sessions */}
              <div className="home-summary-bottom-split">
                {/* Column 1: Weekly Muscle Hit Map (Color-Coded Frequency) */}
                <div className="weekly-hitmap-box">
                  <div className="hitmap-box-header">
                    <span className="hitmap-title">Weekly Muscle Hits</span>
                    <span className="hitmap-count-pill">
                      {weeklyMuscleHits.trainedMusclesCount} hit this week
                    </span>
                  </div>

                  <div className="hitmap-body-wrap" title="Weekly muscle stimulation frequency (1x Gold, 2x Bronze, 3x+ Ember)">
                    <MiniBodyMap
                      frequencyMap={weeklyMuscleHits.frequencyMap}
                      className="hero-hitmap-body"
                    />
                  </div>

                  <div className="hitmap-legend-row">
                    <span className="hit-legend-chip">
                      <span className="hit-legend-dot hit-1" /> 1x
                    </span>
                    <span className="hit-legend-chip">
                      <span className="hit-legend-dot hit-2" /> 2x
                    </span>
                    <span className="hit-legend-chip">
                      <span className="hit-legend-dot hit-3" /> 3x+
                    </span>
                  </div>
                </div>

                {/* Column 2: Recent Workouts & Basic Stats */}
                <div className="weekly-recent-box">
                  <div className="recent-box-header">
                    <span className="recent-title">Recent Workouts</span>
                    {onOpenHistory && (
                      <button
                        type="button"
                        className="btn-history-dashboard-icon"
                        onClick={onOpenHistory}
                        title={`Workout History (${workoutHistory.length} total logged)`}
                        aria-label="Workout History"
                      >
                        <History size={14} />
                      </button>
                    )}
                  </div>

                  <div className="recent-sessions-list">
                    {recentSessions.length > 0 ? (
                      recentSessions.map((session) => {
                        const sKey = toLocalDateKey(session.date || session.completedAt);
                        let dateLabel = sKey || 'Recent';
                        if (sKey === todayKey) dateLabel = 'Today';
                        else if (sKey) {
                          const diff = Math.round((new Date(`${todayKey}T12:00:00`) - new Date(`${sKey}T12:00:00`)) / 86400000);
                          if (diff === 1) dateLabel = 'Yesterday';
                          else if (diff > 1 && diff < 7) {
                            dateLabel = new Date(`${sKey}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' });
                          }
                        }
                        const mins = Math.max(
                          1,
                          Math.round((Number(session.durationSeconds) || (Number(session.durationMinutes) * 60) || 0) / 60)
                        );
                        const vol = Number(session.volumeKg) || 0;

                        return (
                          <div
                            key={session.id || session.date}
                            className="recent-session-card"
                            onClick={onOpenHistory}
                            title="Click to open workout history"
                          >
                            <div className="session-card-left">
                              <span className="session-card-title">{session.routineTitle || 'Workout'}</span>
                              <span className="session-card-date">{dateLabel} · {session.category || 'General'}</span>
                            </div>
                            <span className="session-card-meta">
                              {mins}m{vol > 0 ? ` · ${formatVolumeCompact(vol)}` : ''}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="recent-empty-prompt">
                        No workouts logged yet this week. Complete your first session to light up your weekly map!
                      </p>
                    )}
                  </div>

                  <div className="recent-stats-bar">
                    <div className="recent-stat-mini">
                      <span className="recent-stat-lbl">This Week</span>
                      <span className="recent-stat-val">
                        {weeklySummaryStats.weekVol > 0 ? formatVolumeCompact(weeklySummaryStats.weekVol) : `${weeklySummaryStats.weekCount} sess.`}
                      </span>
                    </div>
                    <div className="recent-stat-mini">
                      <span className="recent-stat-lbl">Total Completed</span>
                      <span className="recent-stat-val">{workoutHistory.length} sess.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Right: Week Consistency Card */}
            <StatsDashboard
              workoutHistory={workoutHistory}
              goalTarget={weeklyGoal}
              onChangeGoalTarget={onChangeWeeklyGoal}
              onSelectDate={setManualLogDateKey}
            />
          </div>

          {/* Full-Width 53-Week Annual Activity Heatmap */}
          <YearHeatmapCard
            workoutHistory={workoutHistory}
            onSelectDate={setManualLogDateKey}
          />
        </div>
      </section>

      <RoutinesSection
        routines={routines}
        onSelectRoutineToView={onSelectRoutineToView}
        onStartRoutineLive={onStartRoutineLive}
        onOpenCreateWorkout={() => setIsCreating(true)}
        onDuplicateRoutine={onDuplicateRoutine}
        onDeleteRoutine={onDeleteRoutine}
      />

      {isCreating && (
        <WorkoutEditorModal
          workout={null}
          onSave={(newRoutine) => {
            onCreateRoutine(newRoutine);
            setIsCreating(false);
          }}
          onClose={() => setIsCreating(false)}
        />
      )}

      {manualLogDateKey && (
        <ManualWorkoutLogModal
          isOpen={Boolean(manualLogDateKey)}
          initialDateKey={manualLogDateKey}
          routines={routines}
          workoutHistory={workoutHistory}
          onSaveSession={(newSession) => {
            if (onLogManualWorkout) {
              onLogManualWorkout(newSession);
            }
          }}
          onDeleteSession={onDeleteSession}
          onClose={() => setManualLogDateKey(null)}
        />
      )}
    </div>
  );
}
