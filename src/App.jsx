import React, { useState, useEffect } from 'react';
import { INITIAL_ROUTINES } from './data/workouts';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { WorkoutOverviewView } from './components/WorkoutOverviewView';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { WorkoutSummaryModal } from './components/WorkoutSummaryModal';
import './App.css';

export function App() {
  // Saved routines in localStorage or fallback to defaults
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem('corpo_routines');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ROUTINES;
  });

  // Current view: 'home' | 'overview'
  const [currentView, setCurrentView] = useState('home');
  const [activeRoutineId, setActiveRoutineId] = useState(routines[0]?.id || 'legs-power');

  // Presentation modal (1 exercise at a time live presentation mode)
  const [isPresentationActive, setIsPresentationActive] = useState(false);
  const [liveRoutine, setLiveRoutine] = useState(null);
  const [startExerciseIndex, setStartExerciseIndex] = useState(0);

  // Workout completion summary
  const [completedSummary, setCompletedSummary] = useState(null);

  // Workout history
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('corpo_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('corpo_routines', JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem('corpo_history', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  const currentRoutine = routines.find(r => r.id === activeRoutineId) || routines[0];

  // Actions
  const handleSelectRoutineToView = (id) => {
    setActiveRoutineId(id);
    setCurrentView('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartRoutineLive = (id, index = 0) => {
    const target = routines.find(r => r.id === id) || routines[0];
    setLiveRoutine(target);
    setStartExerciseIndex(index);
    setIsPresentationActive(true);
  };

  const handleCreateRoutine = (newWorkout) => {
    setRoutines(prev => [newWorkout, ...prev]);
    setActiveRoutineId(newWorkout.id);
    setCurrentView('overview');
  };

  const handleUpdateRoutine = (updatedWorkout) => {
    setRoutines(prev => prev.map(r => r.id === updatedWorkout.id ? updatedWorkout : r));
  };

  const handleDeleteRoutine = (id) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa scheda?')) return;
    setRoutines(prev => prev.filter(r => r.id !== id));
    setCurrentView('home');
  };

  const handleWorkoutComplete = (summaryData) => {
    setIsPresentationActive(false);
    setCompletedSummary(summaryData);

    const newHistoryItem = {
      id: Date.now(),
      routineId: liveRoutine.id,
      routineTitle: liveRoutine.title,
      date: new Date().toISOString(),
      durationSeconds: summaryData.durationSeconds,
      completedSets: summaryData.completedSets,
      totalSets: summaryData.totalSets
    };

    setWorkoutHistory(prev => [newHistoryItem, ...prev]);
  };

  return (
    <div className="gymmane-app">
      {/* Top Navbar */}
      <Navbar 
        routines={routines}
        activeRoutineId={activeRoutineId}
        onSelectRoutine={(id) => {
          setActiveRoutineId(id);
          setCurrentView('overview');
        }}
        onStartPresentation={() => handleStartRoutineLive(activeRoutineId, 0)}
        totalWorkoutsCompleted={workoutHistory.length}
      />

      {/* Main View Router */}
      <main className="app-main-content">
        {currentView === 'home' && (
          <HomeView 
            routines={routines}
            onSelectRoutineToView={handleSelectRoutineToView}
            onStartRoutineLive={(id) => handleStartRoutineLive(id, 0)}
            onCreateRoutine={handleCreateRoutine}
            onDeleteRoutine={handleDeleteRoutine}
            totalWorkoutsCompleted={workoutHistory.length}
          />
        )}

        {currentView === 'overview' && currentRoutine && (
          <WorkoutOverviewView 
            workout={currentRoutine}
            onBack={() => setCurrentView('home')}
            onStartLive={(idx) => handleStartRoutineLive(currentRoutine.id, idx)}
            onUpdateWorkout={handleUpdateRoutine}
            onDeleteWorkout={handleDeleteRoutine}
          />
        )}
      </main>

      {/* Presentation Fullscreen Mode (1 exercise at a time) */}
      {isPresentationActive && liveRoutine && (
        <ActiveWorkoutModal 
          routine={liveRoutine}
          initialIndex={startExerciseIndex}
          onClose={() => setIsPresentationActive(false)}
          onCompleteWorkout={handleWorkoutComplete}
        />
      )}

      {/* Celebration Modal */}
      {completedSummary && liveRoutine && (
        <WorkoutSummaryModal 
          summary={completedSummary}
          routine={liveRoutine}
          onClose={() => setCompletedSummary(null)}
          onRestart={() => {
            setCompletedSummary(null);
            handleStartRoutineLive(liveRoutine.id, 0);
          }}
        />
      )}

      {/* Minimal Footer */}
      <footer className="gymmane-footer">
        <div className="gymmane-wrap footer-inner">
          <div>
            <span className="footer-brand-title">CORPO</span>
            <p>Diario di allenamento minimale, privato e senza distrazioni.</p>
          </div>
          <span className="footer-right-note">
            Tutti i tuoi dati rimangono privati sul tuo browser • Zero account • Zero pubblicità
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
