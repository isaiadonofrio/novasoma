export interface ExerciseBiomechanics {
  plane: string;
  chain: string;
  laterality: string;
  loadVector: string;
  resistanceProfile: string;
  jointActions: string;
}

export interface Exercise {
  id: string;
  sourceId?: string;
  name: string;
  scientificName?: string;
  subtitle?: string;
  pattern?: string;
  equipment?: string;
  requiresEquipment?: boolean;
  mechanics?: string;
  level?: string;
  muscleKey: string;
  secondaryKeys?: string[];
  defaultSets?: number;
  defaultReps?: string;
  defaultRestSeconds?: number;
  defaultDropSets?: number;
  rpe?: string;
  lastRecord?: string;
  illustration?: string;
  mediaType?: string;
  customVideoUrl?: string;
  isWarmup?: boolean;
  phase?: 'warmup' | 'main' | 'decompression' | string;
  supersetGroup?: string | null;
  customRepsPerSet?: string[];
  customIntentsPerSet?: string[];
  familyId?: string;
  familyName?: string;
  variationType?: string;
  variationLabel?: string;
  biomechanics?: ExerciseBiomechanics;
}

export interface Routine {
  id: string;
  title: string;
  shortTitle?: string;
  category?: string;
  difficulty?: string;
  durationMinutes?: number;
  estimatedMinutes?: number;
  description?: string;
  exercises: Exercise[];
}

export interface LoggedSetEntry {
  setNum?: number;
  reps?: string;
  weight?: string;
  completed?: boolean;
  isDropset?: boolean;
  exerciseName?: string;
  sourceId?: string;
}

export interface WorkoutSession {
  id?: string;
  routineId?: string | null;
  routineTitle?: string;
  category?: string;
  date?: string;
  completedAt?: string;
  durationSeconds?: number;
  durationMinutes?: number;
  completedSets?: number;
  totalSets?: number;
  volumeKg?: number;
  intensity?: string | number;
  rpe?: string | number;
  notes?: string | null;
  isManual?: boolean;
  loggedSets?: Record<string, LoggedSetEntry[]>;
}

export interface ActiveDraft {
  routineId: string;
  currentIndex: number;
  workoutElapsedSeconds: number;
  loggedSets: Record<string, LoggedSetEntry[]>;
  updatedAt?: string;
}
