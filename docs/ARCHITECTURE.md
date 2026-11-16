# Nova Soma — System Architecture

## 1. Tech Stack Overview

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **UI Runtime** | React 19 | Declarative state, hash views (`HomeView`, `WorkoutOverviewView`, `ExerciseDatabaseView`), portals/modals |
| **Bundler & PWA** | Vite 8 + `vite-plugin-pwa` (Workbox) | Code-split bundles (`react-vendor`, `icons-vendor`, `exercise-data`) + full offline asset precaching |
| **Styling** | Layered Pure CSS + Design Tokens | Warm Linen editorial Light system rooted in `src/styles/tokens.css` |
| **Icons & Typefaces** | `lucide-react` | Crisp structural UI icons |
| **Static QA** | `oxlint` + `typescript` (`tsc --noEmit`) | Zero-warning lint & JSDoc-typed JS verified against `src/types/models.d.ts` |
| **Automated Tests** | `node --test` + `@playwright/test` | Deterministic domain logic suite + headless Chromium E2E flows |
| **CI/CD** | GitHub Actions | Full test gate -> production build -> GitHub Pages artifact deployment |

---

## 2. Repository Layout

```text
.
├── .github/workflows/deploy.yml   # CI gate (lint -> typecheck -> test -> build -> E2E) & Pages deploy
├── AGENTS.md                      # AI & contributor rules and invariants
├── README.md                      # Project landing page & quickstart
├── docs/
│   ├── ARCHITECTURE.md            # System modules, schemas & data flows (this file)
│   ├── PROJECT_STATE.md           # Live verified stats & context snapshot for AI helpers
│   └── VISION_AND_ROADMAP.md      # Product vision & versioned timeline
├── e2e/
│   └── app.spec.js                # End-to-end Playwright specs against vite preview
├── public/
│   └── logo.jpg                   # PWA manifest icon asset
├── src/
│   ├── App.jsx                    # Top-level hash router, modal orchestrator & global keyboard guards
│   ├── App.css / index.css        # Core styles + token import (@import './styles/tokens.css')
│   ├── assets/
│   │   ├── anatomy/               # body.svg interactive/mini anatomy diagram
│   │   ├── brand/                 # logo-nova-soma.jpg
│   │   └── exercises/             # 127 illustrated exercise assets (.jpg / .webp)
│   ├── components/
│   │   ├── overview/              # OverviewExerciseRow.jsx (table/cards inside routine overview)
│   │   ├── player/                # PlayerHeader, PlayerQueueDrawer, PlayerGuideDrawer, FinishWorkoutModal
│   │   └── ...                    # HomeView, StatsDashboard, YearHeatmapCard, ExerciseDatabaseView, modals
│   ├── data/
│   │   ├── exercises/             # 8 canonical category files + barrel index.js (127 movements)
│   │   ├── exerciseConstants.js   # Shared sets/reps/category metadata
│   │   ├── exerciseDatabase.js    # Re-export & curated movement utilities
│   │   ├── exerciseMedia.js       # Static ESM import map binding all 127 exercise IDs -> assets
│   │   ├── exerciseTaxonomy.js    # Planes, chains, joint actions & 4 scientific source standards
│   │   ├── muscleLabels.js        # Display labels & muscle mapping metadata
│   │   └── workouts.js            # INITIAL_ROUTINES (leg-workout-1 & leg-workout-2)
│   ├── styles/
│   │   ├── tokens.css             # Canonical CSS custom properties (colors, typography, shadows, spring timing)
│   │   ├── layout.css             # Navigation shell & container geometry
│   │   ├── home-dashboard.css     # Weekly consistency, heatmap, hero session launcher
│   │   ├── routines.css           # Routine grid & overview studio cards
│   │   ├── exercise-db.css        # Somatic Library filters, taxonomy cards & detail modals
│   │   ├── active-workout.css     # Studio Workout Player & sticky set logger HUD
│   │   ├── anatomy-map.css        # Body silhouette highlight layers
│   │   ├── modals.css             # Centered/sheet modal overlays & confirmation states
│   │   ├── log-modal.css          # Manual session logging & backup UI
│   │   └── responsive.css         # Tablet & mobile breakpoints
│   ├── types/
│   │   └── models.d.ts            # Authoritative TypeScript interfaces for checkJs
│   └── utils/
│       ├── analytics.js           # Streak, volume (kg/t), solar-year heatmap & weekly frequency calculations
│       ├── audio.js               # Web Audio API feedback tones + node disconnect disposal
│       ├── confetti.js            # Singleton canvas confetti celebration + RAF cleanup
│       ├── constants.js           # Timing presets, rest multipliers & default exercise config
│       ├── demoData.js            # 14-session showcase generator anchored cleanly around personal routines
│       ├── exerciseImport.js      # Single-exercise JSON parser & validator (reserved for v0.7 UI)
│       ├── formatting.js          # Time, volume, duration & category resolvers
│       ├── migrations.js          # Legacy storage hydration, exercise merge & extra-default pruning
│       ├── storage.js             # STORAGE_KEYS, safe JSON parse/save, backup export/import & draft expiry
│       ├── useBodyScrollLock.js   # Reference-counted body scroll locking for nested modals
│       ├── useFocusTrap.js        # Accessible modal Tab loop & Escape handling
│       └── workoutSets.js         # Phase ordering, contiguous superset normalization, drop-sets & timer configs
└── tests/                         # 8 *.test.mjs unit test files (41 tests)
```

---

## 3. Navigation, Routing & State Ownership

- **Hash Navigation (`src/App.jsx`)**:
  - `#` / empty -> `HomeView` (Hero launcher, Weekly Consistency & Year Heatmap stats, Routine Archive cards, Recent Activity)
  - `#workout/<routineId>` -> `WorkoutOverviewView` (Phase grouping, Manage/Reorder mode, In-Depth sets editor, Routine editor trigger)
  - `#library` -> `ExerciseDatabaseView` (127-movement filterable biomechanics atlas)
- **Single-Source State (`App.jsx`)**:
  - Holds `routines`, `exercises`, `history`, `weeklyGoal`, `activeDraft`, plus active overlay flags so modals (`ActiveWorkoutModal`, `WorkoutEditorModal`, `ExercisePickerModal`, `DataBackupModal`, `ManualWorkoutLogModal`, `WorkoutHistoryModal`, `WorkoutSummaryModal`, `ConfirmModal`) synchronize deterministically with `localStorage`.

---

## 4. Persistence & Migration Architecture (`src/utils/storage.js`, `src/utils/migrations.js`)

All persistence uses device-local `localStorage` via safe try/catch wrappers (quota-safe and private-browsing safe).

| `STORAGE_KEYS` Constant | Browser Key | Value & Lifecycle Role |
| :--- | :--- | :--- |
| `ROUTINES` | `corpo_user_routines_v7` | User's saved `Routine[]` JSON array |
| `EXERCISES` | `corpo_user_exercises_v6` | Hydrated `Exercise[]` catalog (`127` canonical + user edits) |
| `HISTORY` | `corpo_history` | Chronological `WorkoutSession[]` log (demo + real sessions) |
| `THEME` | `corpo_theme` | Enforces Light theme (`'light'`) on startup |
| `WEEKLY_GOAL` | `corpo_weekly_goal_v1` | Weekly target session goal (`1–14`) |
| `ACTIVE_DRAFT` | `corpo_active_draft_v1` | In-progress `ActiveDraft` JSON with 24h auto-expiration check |
| `SEEDED_CANONICAL` | `corpo_seeded_canonical_v1` | One-time flag ensuring canonical library seed completed |
| `PRUNED_EXTRA_DEFAULTS` | `corpo_pruned_extra_defaults_v1` | One-time migration flag pruning the 4 legacy seeded extra routines (`EXTRA_SEEDED_ROUTINE_IDS`) |
| `EN_LOCALIZATION` | `corpo_en_localized_v1` | One-time migration flag normalizing legacy Italian titles -> English |
| `SOUND_ENABLED` | `corpo_sound_enabled_v1` | Audio feedback toggle inside Live Player |

### Boot Hydration Flow (`src/App.jsx` -> `src/utils/migrations.js`)
1. `hydrateExercisesFromStorage()` loads stored exercises, merges missing canonical biomechanics/media via `mergeMissingCanonical()`, appends newly added canonical exercises, and removes orphan placeholder entries.
2. `hydrateRoutinesFromStorage(exercises)` loads saved routines, runs one-time `PRUNED_EXTRA_DEFAULTS` filter removing any untouched legacy default routine IDs (`EXTRA_SEEDED_ROUTINE_IDS`), normalizes titles, refreshes canonical illustrations/biomechanics inside routine items, and rebuilds `lastRecord` from recorded history.
3. On state changes, `registerCurrentCatalogInStorage()` keeps local backups aligned.

---

## 5. Workout Engine & Asset Splitting

- **Phases & Supersets (`src/utils/workoutSets.js`)**: Every workout item resolves to `warmup`, `main`, or `decompression`. Adjacent main-block movements linked under a shared `supersetGroup` display paired indicators cleanly; moving items preserves block contiguity and dissolves orphaned single-item groups.
- **Bundle Splitting (`vite.config.js`)**: Rollup splits vendor React (`react-vendor`), Lucide icons (`icons-vendor`), and the 127-movement biomechanics data + asset imports (`exercise-data`) into cache-friendly chunks, precached by Workbox (`maximumFileSizeToCacheInBytes: 4 MiB`).
