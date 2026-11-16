import { useEffect, useState, useMemo } from 'react';
import { Calendar, Clock, Dumbbell, CheckCircle, Trash2, ChevronDown, ChevronUp, X, Activity, Flame } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';
import {
  formatSessionDuration,
  getSessionDurationSeconds,
  resolveSessionCategory
} from '../utils/formatting';
import { useBodyScrollLock } from '../utils/useBodyScrollLock';
import { useFocusTrap } from '../utils/useFocusTrap';

function formatSessionDate(iso) {
  if (!iso) return 'Unknown date';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Unknown date';
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function WorkoutHistoryModal({
  workoutHistory = [],
  routines = [],
  exerciseDatabase = [],
  onDeleteSession,
  onClose,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [pendingDeleteSession, setPendingDeleteSession] = useState(null);

  useBodyScrollLock();
  const trapRef = useFocusTrap(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !pendingDeleteSession) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, pendingDeleteSession]);

  const exerciseNameById = useMemo(() => {
    const map = new Map();
    exerciseDatabase.forEach((ex) => {
      if (ex?.id) map.set(ex.id, ex.name);
    });
    return map;
  }, [exerciseDatabase]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
    >
      <div ref={trapRef} className="exercise-picker-dialog history-modal-dialog">
        <div className="editor-header">
          <div className="editor-header-title">
            <Calendar size={18} color="var(--clay)" />
            <div>
              <h3 id="history-modal-title">WORKOUT HISTORY ({workoutHistory.length})</h3>
              <span className="editor-active-ex-name">
                Inspect logged weights, completed sets, or remove test sessions
              </span>
            </div>
          </div>

          <button type="button" className="close-editor-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="history-modal-scroll">
          {workoutHistory.length === 0 ? (
            <div className="history-empty-state">
              <Dumbbell size={32} color="var(--faint)" />
              <h4>No sessions logged yet</h4>
              <p>Complete a workout from the player to record your timeline, sets, and lifted volume.</p>
            </div>
          ) : (
            <div className="history-sessions-list">
              {workoutHistory.map((session, idx) => {
                const sessionKey = session.id || session.date || session.completedAt || `session-${idx}`;
                const isExpanded = expandedId === sessionKey;
                const sessionDurationSeconds = getSessionDurationSeconds(session);
                const sessionCategory = resolveSessionCategory(session, routines);
                const isManualLog = Boolean(session.isManual) && !(session.totalSets > 0);
                const manualRpe = session.rpe ?? session.intensity;
                const loggedEntries = session.loggedSets && typeof session.loggedSets === 'object'
                  ? Object.entries(session.loggedSets).filter(([, sets]) => Array.isArray(sets) && sets.some((s) => s.completed))
                  : [];

                return (
                  <article key={sessionKey} className="history-session-card">
                    <div className="history-session-top">
                      <div className="history-session-meta">
                        <span className="history-session-date">
                          {formatSessionDate(session.date || session.completedAt)} · {sessionCategory}
                          {session.isManual && (
                            <span className="history-manual-badge">Manual Log</span>
                          )}
                        </span>
                        <h4 className="history-session-title">
                          {session.routineTitle || 'Workout Session'}
                        </h4>
                        <div className="history-session-chips">
                          <span>
                            <Clock size={12} />
                            {formatSessionDuration(sessionDurationSeconds)}
                          </span>
                          {isManualLog ? (
                            <>
                              <span>
                                <Activity size={12} />
                                {sessionCategory} activity
                              </span>
                              {manualRpe != null && (
                                <span>
                                  <Flame size={12} />
                                  {Number.isFinite(Number(manualRpe)) ? `RPE ${manualRpe}/10` : `${manualRpe} effort`}
                                </span>
                              )}
                            </>
                          ) : (
                            <span>
                              <CheckCircle size={12} />
                              {session.completedSets || 0}/{session.totalSets || 0} sets
                            </span>
                          )}
                          {session.volumeKg > 0 && (
                            <span>
                              <Dumbbell size={12} />
                              {Math.round(session.volumeKg).toLocaleString()} kg
                            </span>
                          )}
                        </div>
                        {session.notes && (
                          <p className="history-session-notes">{session.notes}</p>
                        )}
                      </div>

                      <div className="history-session-actions">
                        {loggedEntries.length > 0 && (
                          <button
                            type="button"
                            className="history-toggle-btn"
                            onClick={() => setExpandedId(isExpanded ? null : sessionKey)}
                          >
                            <span>{isExpanded ? 'Hide Sets' : 'View Sets'}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        )}
                        {onDeleteSession && (
                          <button
                            type="button"
                            className="row-action-icon-btn delete-btn"
                            onClick={() => setPendingDeleteSession(session)}
                            title="Delete session"
                            aria-label="Delete session"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {isExpanded && loggedEntries.length > 0 && (
                      <div className="history-sets-breakdown">
                        {loggedEntries.map(([exId, sets]) => {
                          const completed = sets.filter((s) => s.completed);
                          const baseId = exId.replace(/-\d{10,}$/, '');
                          const label = sets[0]?.exerciseName || exerciseNameById.get(exId) || exerciseNameById.get(baseId) || exId;
                          return (
                            <div key={exId} className="history-exercise-log-row">
                              <span className="history-ex-name">{label}</span>
                              <div className="history-ex-sets-pills">
                                {completed.map((st, idx) => {
                                  const w = String(st.weight ?? '').trim();
                                  const r = String(st.reps ?? '').trim();
                                  const txt = w && r ? `${w}kg × ${r}` : w ? `${w}kg` : `${r || '-'} reps`;
                                  return (
                                    <span key={idx} className={`history-set-pill ${st.isDropset ? 'is-dropset' : ''}`}>
                                      {st.isDropset ? 'DROP' : `#${st.setNum}`}: {txt}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {pendingDeleteSession && (
        <ConfirmModal
          title="Delete Workout Log?"
          message={`Remove "${pendingDeleteSession.routineTitle || 'Workout Session'}" from ${formatSessionDate(pendingDeleteSession.date || pendingDeleteSession.completedAt)}? This updates your streak and heatmap immediately.`}
          confirmLabel="Delete Session"
          onConfirm={() => {
            onDeleteSession(pendingDeleteSession.id || pendingDeleteSession.date || pendingDeleteSession.completedAt);
            setPendingDeleteSession(null);
          }}
          onCancel={() => setPendingDeleteSession(null)}
        />
      )}
    </div>
  );
}

