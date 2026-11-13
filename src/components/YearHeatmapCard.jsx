import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Flame, CalendarDays } from 'lucide-react';
import { calculateMonthGroupedHeatmap } from '../utils/analytics';
import { formatVolumeCompact } from '../utils/formatting';

export function YearHeatmapCard({ workoutHistory = [], onSelectDate }) {
  const heatmap = useMemo(
    () => calculateMonthGroupedHeatmap(workoutHistory),
    [workoutHistory]
  );
  const [hoveredCell, setHoveredCell] = useState(null);
  const [pinnedCell, setPinnedCell] = useState(null);
  const scrollWrapRef = useRef(null);

  // Align narrow mobile viewports to keep the current month visible on mount
  useEffect(() => {
    const el = scrollWrapRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const currentBlock = el.querySelector('.heatmap-month-block.is-current');
    if (currentBlock) {
      el.scrollLeft = Math.max(0, currentBlock.offsetLeft - el.clientWidth / 2 + currentBlock.clientWidth / 2);
    }
  }, []);

  const inspectedCell = hoveredCell || pinnedCell;

  const detailText = useMemo(() => {
    if (!inspectedCell) {
      return heatmap.totalWorkoutsYear > 0
        ? 'Hover or tap any day square to inspect session details.'
        : 'Log your first workout to light up your annual consistency map.';
    }
    if (inspectedCell.count === 0) {
      return `${inspectedCell.dateLabel} · No workout logged`;
    }
    const mins = Math.max(1, Math.round(inspectedCell.durationSeconds / 60));
    const parts = [
      inspectedCell.dateLabel,
      `${inspectedCell.count} workout${inspectedCell.count > 1 ? 's' : ''}`,
      `${mins} min`,
    ];
    if (inspectedCell.volumeKg > 0) {
      parts.push(formatVolumeCompact(inspectedCell.volumeKg));
    }
    if (inspectedCell.titles.length > 0) {
      parts.push(inspectedCell.titles.slice(0, 2).join(', '));
    }
    return parts.join(' · ');
  }, [inspectedCell, heatmap.totalWorkoutsYear]);

  return (
    <section className="year-heatmap-card" aria-label="Full-year workout activity heatmap">
      <div className="year-heatmap-header">
        <div className="year-heatmap-kicker-row">
          <span className="consistency-kicker">ANNUAL ACTIVITY</span>
          <span className="year-heatmap-range">{heatmap.rangeLabel}</span>
        </div>

        <div className="year-heatmap-stats-pills">
          <span className="heatmap-stat-pill">
            <CalendarDays size={13} />
            <strong>{heatmap.activeDaysYear}</strong> active days
          </span>
          <span className="heatmap-stat-pill">
            <strong>{heatmap.totalWorkoutsYear}</strong> workouts
          </span>
          <span className="heatmap-stat-pill accent">
            <Flame size={13} />
            <strong>{heatmap.bestStreakDays}d</strong> best streak
          </span>
        </div>
      </div>

      <div ref={scrollWrapRef} className="heatmap-scroll-wrap">
        <div className="heatmap-months-grouped">
          <div className="heatmap-weekday-axis" aria-hidden="true">
            <span className="heatmap-axis-head-spacer" />
            <div className="heatmap-weekday-rows">
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
              <span />
            </div>
          </div>

          <div className="heatmap-months-row">
            {heatmap.months.map((month) => (
              <div
                key={month.key}
                className={`heatmap-month-block ${month.isCurrentMonth ? 'is-current' : ''}`}
              >
                <div className="heatmap-month-head">
                  <span className="heatmap-month-name">
                    {month.label}
                    {month.yearLabel ? (
                      <span className="heatmap-month-yr"> {month.yearLabel}</span>
                    ) : null}
                  </span>
                  {month.workoutsCount > 0 && (
                    <span
                      className="heatmap-month-count"
                      title={`${month.workoutsCount} workout${month.workoutsCount > 1 ? 's' : ''} in ${month.label}`}
                    >
                      {month.workoutsCount}
                    </span>
                  )}
                </div>

                <div className="heatmap-month-weeks">
                  {month.weeks.map((week, wIdx) => (
                    <div key={`${month.key}-w${wIdx}`} className="heatmap-week-col">
                      {week.map((day) => {
                        if (day.isPad) {
                          return (
                            <span
                              key={day.dateKey}
                              className="heatmap-day-pad"
                              aria-hidden="true"
                            />
                          );
                        }

                        const isPinned = pinnedCell?.dateKey === day.dateKey;
                        const cellTitle = day.isFuture
                          ? `${day.dateLabel} (Upcoming)`
                          : day.count > 0
                          ? `${day.dateLabel}: ${day.count} workout${day.count > 1 ? 's' : ''}`
                          : `${day.dateLabel}: Rest day`;

                        return (
                          <button
                            key={day.dateKey}
                            type="button"
                            disabled={day.isFuture}
                            className={[
                              'heatmap-day-cell',
                              `lvl-${day.level}`,
                              day.isToday ? 'is-today' : '',
                              day.isFuture ? 'is-future' : '',
                              isPinned ? 'is-selected' : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            title={cellTitle}
                            aria-label={cellTitle}
                            onMouseEnter={() => !day.isFuture && setHoveredCell(day)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onFocus={() => !day.isFuture && setHoveredCell(day)}
                            onBlur={() => setHoveredCell(null)}
                            onClick={() => {
                              if (day.isFuture) return;
                              setPinnedCell((prev) =>
                                prev?.dateKey === day.dateKey ? null : day
                              );
                              if (onSelectDate) {
                                onSelectDate(day.dateKey);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="year-heatmap-footer">
        <span className={`heatmap-inspect-text ${inspectedCell ? 'active' : ''}`}>
          {detailText}
        </span>

        <div className="heatmap-legend" aria-label="Activity intensity legend">
          <span className="heatmap-legend-lbl">Less</span>
          <span className="heatmap-legend-swatch lvl-0" aria-hidden="true" />
          <span className="heatmap-legend-swatch lvl-1" aria-hidden="true" />
          <span className="heatmap-legend-swatch lvl-2" aria-hidden="true" />
          <span className="heatmap-legend-swatch lvl-3" aria-hidden="true" />
          <span className="heatmap-legend-swatch lvl-4" aria-hidden="true" />
          <span className="heatmap-legend-lbl">More</span>
        </div>
      </div>
    </section>
  );
}

