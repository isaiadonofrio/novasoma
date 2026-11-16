export const MUSCLE_LABELS = {
  chest: 'Chest',
  back: 'Back',
  shoulders: 'Shoulders',
  biceps: 'Biceps',
  triceps: 'Triceps',
  trapezius: 'Traps',
  abdomen: 'Abs & Core',
  obliques: 'Obliques',
  forearm: 'Forearms',
  quads: 'Quads',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves'
};

export function getMuscleRegionTone(muscleKey = '') {
  const k = String(muscleKey || '').toLowerCase();
  if (['quads', 'hamstrings', 'glutes', 'calves', 'region:lower'].includes(k)) {
    return 'lower';
  }
  if (['abdomen', 'obliques', 'region:core'].includes(k)) {
    return 'core';
  }
  if (k === 'all') {
    return 'all';
  }
  return 'upper';
}
