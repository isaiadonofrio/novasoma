import React, { useMemo, useState } from 'react';
import {
  Plus,
  Clock,
  Dumbbell,
  Layers,
  Database,
  Sparkles,
  Activity,
  Calendar
} from 'lucide-react';
import { MiniBodyMap } from './MiniBodyMap';
import { StatsDashboard } from './StatsDashboard';
import { YearHeatmapCard } from './YearHeatmapCard';
import { RoutinesSection } from './RoutinesSection';
import { WorkoutEditorModal } from './WorkoutEditorModal';
import { MUSCLE_LABELS } from '../data/muscleLabels';
import { calculateOverviewDashboardStats } from '../utils/analytics';
import { formatVolumeCompact } from '../utils/formatting';

export function HomeView({
  routines = [],
  exerciseDatabase = [],
  workoutHistory = [],
  weeklyGoal = 4,
  onChangeWeeklyGoal,
  onOpenHistory,
  onSelectRoutineToView,
  onStartRoutineLive,
  onCreateRoutine,
  onDuplicateRoutine,
  onDeleteRoutine
}) {
  const [isCreating, setIsCreating] = useState(false);

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

  const allMuscleCoverage = useMemo(() => {
    const primary = new Set();
    const secondary = new Set();
    routines.forEach((routine) => {
      (routine.exercises || []).forEach((ex) => {
        if (ex.muscleKey) primary.add(ex.muscleKey);
        if (Array.isArray(ex.secondaryKeys)) {
          ex.secondaryKeys.forEach((k) => secondary.add(k));
        }
      });
    });
    return {
      primaryKeys: Array.from(primary),
      secondaryKeys: Array.from(secondary)
    };
  }, [routines]);

  const stats = useMemo(
    () =>
      calculateOverviewDashboardStats(
        routines,
        exerciseDatabase,
        workoutHistory,
        MUSCLE_LABELS
      ),
    [routines, exerciseDatabase, workoutHistory]
  );

  const leadMuscle = stats.muscleBreakdown[0] || null;
  const visibleBreakdown = stats.muscleBreakdown.slice(0, 5);

  return (
    <div className="gymmane-home">
      <section className="home-clean-hero">
        <div className="gymmane-wrap">
          <div className="hero-clean-header-row">
            <div>
              <span className="home-date-kicker">TODAY · {todayDisplay}</span>
              <h1 className="home-title-loud">Overview</h1>
              <p className="home-intro-sub">
                Track weekly rhythm, full-year consistency, and muscle balance across your training plan.
              </p>
            </div>

            <div className="hero-actions-right">
              {onOpenHistory && (
                <button
                  type="button"
                  className="btn-gymmane-secondary"
                  onClick={onOpenHistory}
                >
                  <Calendar size={15} />
                  <span>History{workoutHistory.length > 0 ? ` (${workoutHistory.length})` : ''}</span>
                </button>
              )}
              <button
                type="button"
                className="btn-gymmane-primary"
                onClick={() => setIsCreating(true)}
              >
                <Plus size={16} />
                <span>New Workout</span>
              </button>
            </div>
          </div>

          <div className="home-hero-bento">
            {/* Upgraded General Summary Telemetry Card */}
            <section className="home-summary-panel" aria-label="General training summary">
              <div className="summary-panel-top">
                <div className="summary-panel-copy">
                  <div className="featured-kicker-row">
                    <span className="featured-kicker">TRAINING TELEMETRY</span>
                    <span className="featured-cat-pill">
                      {allMuscleCoverage.primaryKeys.length} target areas
                    </span>
                    {stats.avgDurationMins > 0 && (
                      <span className="featured-cat-pill">
                        ~{stats.avgDurationMins}m avg
                      </span>
                    )}
                  </div>

                  <h2 className="featured-routine-title">General Summary</h2>

                  {stats.lastSessionSummary ? (
                    <div className="last-session-note">
                      <Activity size={13} />
                      <span>
                        Last trained <b>{stats.lastSessionSummary.whenLabel}</b> ·{' '}
                        {stats.lastSessionSummary.title} ({stats.lastSessionSummary.durationLabel}
                        {stats.lastSessionSummary.volumeKg > 0
                          ? ` · ${formatVolumeCompact(stats.lastSessionSummary.volumeKg)}`
                          : ''}
                        )
                      </span>
                    </div>
                  ) : (
                    <p className="summary-panel-desc">
                      Active blueprint spans <b>{stats.totalPlannedExercises} movements</b> and{' '}
                      <b>{stats.totalPlannedSets} programmed sets</b> across {stats.totalRoutines}{' '}
                      routine{stats.totalRoutines === 1 ? '' : 's'}.
                    </p>
                  )}
                </div>

                <div className="featured-bodymap-stage" title="Muscle coverage across all active routines">
                  <MiniBodyMap
                    primaryKeys={allMuscleCoverage.primaryKeys}
                    secondaryKeys={allMuscleCoverage.secondaryKeys}
                    className="hero-mini-body"
                  />
                  <span className="bodymap-stage-caption">Plan Coverage</span>
                </div>
              </div>

              {/* Muscle Focus Distribution Bar */}
              {visibleBreakdown.length > 0 && (
                <div className="summary-focus-strip">
                  <div className="focus-strip-header">
                    <span className="focus-strip-kicker">MUSCLE FOCUS BREAKDOWN</span>
                    {leadMuscle && (
                      <span className="focus-lead-pill">
                        <Sparkles size={11} />
                        Lead: {leadMuscle.label} ({leadMuscle.percent}%)
                      </span>
                    )}
                  </div>

                  <div
                    className="focus-dist-bar"
                    role="img"
                    aria-label="Muscle group distribution across workout plans"
                  >
                    {visibleBreakdown.map((item) => (
                      <div
                        key={item.key}
                        className={`focus-dist-seg tone-${item.toneIndex}`}
                        style={{ width: `${Math.max(6, item.percent)}%` }}
                        title={`${item.label}: ${item.count} exercise${item.count === 1 ? '' : 's'} (${item.percent}%)`}
                      />
                    ))}
                  </div>

                  <div className="focus-legend-row">
                    {visibleBreakdown.map((item) => (
                      <span key={item.key} className="focus-legend-chip">
                        <span className={`focus-legend-dot tone-${item.toneIndex}`} aria-hidden="true" />
                        <span className="focus-legend-name">{item.label}</span>
                        <span className="focus-legend-pct">{item.percent}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 4-Card Telemetry Grid */}
              <div className="home-summary-metrics">
                <div className="summary-metric-pill">
                  <div className="metric-pill-head">
                    <Clock size={13} />
                    <span className="metric-pill-lbl">Training Time</span>
                  </div>
                  <span className="metric-pill-val">{stats.totalTrainingTime}</span>
                  <span className="metric-pill-sub">
                    {stats.completedSessions > 0
                      ? `${stats.completedSessions} logged session${stats.completedSessions === 1 ? '' : 's'}`
                      : 'No sessions logged yet'}
                  </span>
                </div>

                <div className="summary-metric-pill">
                  <div className="metric-pill-head">
                    <Dumbbell size={13} />
                    <span className="metric-pill-lbl">Volume Lifted</span>
                  </div>
                  <span className="metric-pill-val">{formatVolumeCompact(stats.totalVolumeKg)}</span>
                  <span className="metric-pill-sub">
                    {stats.totalCompletedSets > 0
                      ? `${stats.totalCompletedSets} completed sets`
                      : `${stats.totalPlannedSets} sets in blueprint`}
                  </span>
                </div>

                <div className="summary-metric-pill">
                  <div className="metric-pill-head">
                    <Layers size={13} />
                    <span className="metric-pill-lbl">Active Plan</span>
                  </div>
                  <span className="metric-pill-val">{stats.totalRoutines}</span>
                  <span className="metric-pill-sub">
                    {stats.totalPlannedExercises} ex · {stats.totalPlannedSets} sets
                  </span>
                </div>

                <div className="summary-metric-pill">
                  <div className="metric-pill-head">
                    <Database size={13} />
                    <span className="metric-pill-lbl">Exercise Vault</span>
                  </div>
                  <span className="metric-pill-val">{stats.libraryCount}</span>
                  <span className="metric-pill-sub">
                    {stats.libraryEquipmentCount} gear · {stats.libraryBodyweightCount} bodyweight
                  </span>
                </div>
              </div>
            </section>

            {/* Right: Week Consistency Card */}
            <StatsDashboard
              workoutHistory={workoutHistory}
              goalTarget={weeklyGoal}
              onChangeGoalTarget={onChangeWeeklyGoal}
            />
          </div>

          {/* Full-Width 53-Week Annual Activity Heatmap */}
          <YearHeatmapCard workoutHistory={workoutHistory} />
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
    </div>
  );
}
