# AGENTS.md — Nova Soma AI & Contributor Guide

This file defines non-negotiable engineering invariants, workspace layout, and verification protocols for all human contributors and AI coding agents working on **Nova Soma**.

> Always read [`docs/PROJECT_STATE.md`](./docs/PROJECT_STATE.md) and [`docs/VISION_AND_ROADMAP.md`](./docs/VISION_AND_ROADMAP.md) before starting substantial changes so you have exact live project metrics and active roadmap scope.

---

## 1. Product Identity & Design Philosophy

- **App**: Nova Soma (*Sōma* / Σῶμα — Minimalist Biomechanics & Somatic Training Studio)
- **Model**: 100% local-first Progressive Web App (PWA) with zero external APIs, zero accounts, and zero telemetry.
- **Aesthetic System**: **Warm Linen Editorial Light Theme** only (`--linen-bg`, soft tonal paper surfaces, ink slate, terracotta accents).
  - Never add dark theme selectors (`[data-theme="dark"]`) or multi-theme toggles unless the project roadmap explicitly reverses this decision.
  - All design tokens must live in `src/styles/tokens.css` (imported once at the top of `src/index.css`). Do not duplicate `:root` color/shadow variables across component stylesheets.
- **Intentional Subtraction**:
  - Avoid redundant kicker/eyebrow labels (`PERSONAL ARCHIVE`, `YOUR WEEK`), decorative emojis, or filter bars when the dataset is small (`RoutinesSection` intentionally hides category filter pills when `routines.length <= 2`).
  - Motion must feel tactile and calm (`--ease-spring`), and every transition/animation must be guarded or gracefully disabled under `@media (prefers-reduced-motion: reduce)`.

---

## 2. Structural & Technical Invariants

### A. Default Routines & Storage Migrations
- `src/data/workouts.js` seeds **only the user's two personal routines**:
  1. `leg-workout-1`
  2. `leg-workout-2`
- Do **not** re-introduce generic filler sample routines into `INITIAL_ROUTINES`.
- Existing user `localStorage` pruning and legacy catalog normalization live cleanly in `src/utils/migrations.js` (`hydrateExercisesFromStorage`, `hydrateRoutinesFromStorage`, `registerCurrentCatalogInStorage`). Keep `src/App.jsx` free of multi-version migration logic.
- All `localStorage` keys must be declared in `STORAGE_KEYS` inside `src/utils/storage.js` and read/written through safe storage helpers (`parseBackupPayload`, `validateActiveWorkoutDraft`, etc.).

### B. Canonical Exercise Database & Assets Layout
- `127` canonical exercises are split cleanly by movement family across `src/data/exercises/`:
  - `1_warmupAndMobility.js` (`8`)
  - `2_squatsAndKneeFlexion.js` (`13`)
  - `3_hipHingesAndGlutes.js` (`19`)
  - `4_pushUpperBody.js` (`23`)
  - `5_pullUpperBody.js` (`23`)
  - `6_lungesAndUnilateral.js` (`14`)
  - `7_coreAndSpineStability.js` (`21`)
  - `8_conditioningAndPower.js` (`6`)
- Every canonical movement must retain complete `ExerciseBiomechanics` (`plane`, `chain`, `laterality`, `loadVector`, `resistanceProfile`, `jointActions`) matching `src/data/exerciseTaxonomy.js`.
- **Media asset separation**:
  - `src/assets/exercises/` — All `127` illustrated movement `.webp`/`.jpg` assets mapped in `src/data/exerciseMedia.js`.
  - `src/assets/brand/` — Brand vector and PNG emblems (`logo.svg`, `logo.png`, `favicon.png`).
  - `src/assets/anatomy/` — Anatomical body map SVGs (`body.svg`).
- Keep `src/data/exerciseMedia.js` free of UTF-8 BOM (`\uFEFF`) so module parsing and regex integrity tests remain clean.

### C. Contiguous Supersets, Sets & Timers
- **Contiguous Supersets**: Exercises sharing a `supersetGroup` ID must stay immediately adjacent and belong to the same workout phase (`warmup`, `main`, `decompression`). Always mutate/reorder via helpers in `src/utils/workoutSets.js` so singletons are normalized automatically.
- **Wall-Clock Timers**: Rest countdowns and workout elapsed duration in `ActiveWorkoutModal.jsx` must compute deltas from wall-clock `Date.now()` timestamps so mobile sleep/background throttling causes zero timer drift.
- **Resource & Leak Hygiene**:
  - Disconnect Web Audio `OscillatorNode` and `GainNode` inside `osc.onended` (`src/utils/audio.js`).
  - Cancel and remove prior `requestAnimationFrame` + DOM canvas nodes before starting or cleaning up confetti bursts (`src/utils/confetti.js`).
  - Track and clear blob `URL.revokeObjectURL` cleanup timers on modal unmount (`src/components/DataBackupModal.jsx`).
  - Always clean up modal body scroll locks (`useBodyScrollLock`) and focus traps (`useFocusTrap`).

### D. Type Checking & Shared Models
- Domain entities (`Exercise`, `ExerciseBiomechanics`, `Routine`, `LoggedSetEntry`, `WorkoutSession`, `ActiveDraft`) are declared in `src/types/models.d.ts` and enforced on `src/utils/**/*.js` and `src/data/**/*.js` via `tsconfig.json` (`checkJs: true`).
- When changing data structures or adding fields to storage schemas, update `src/types/models.d.ts` and `tests/*.test.mjs` together.

---

## 3. Windows & Local Environment Notes

- **Workspace Folder Special Character**: The local repository path may contain `[◆]` brackets (`01. [◆] Vita\04. [◆] Corpo`), which PowerShell treats as wildcard character ranges. In PowerShell commands, always use:
  - `Set-Location -LiteralPath '<path>'`, OR
  - `npm --prefix "<path>" <script>`
- **Playwright Preview Server**: `npm run test:e2e` spins up `vite preview --host 127.0.0.1 --port 4173` and drives Chromium against it. Never leave orphan build/test artifacts untracked.

---

## 4. Mandatory Verification Gate (Before Every Commit)

Run all five checks after your final edit:

```bash
npm run lint        # oxlint across src/
npm run typecheck   # tsc --noEmit (checkJs + src/types/models.d.ts)
npm test            # node --test tests/*.test.mjs
npm run build       # vite build + VitePWA precache generation
npm run test:e2e    # playwright test against built bundle
```

### Documentation Sync Rule
Before committing structural changes, asset additions, schema updates, or completed roadmap milestones, update **`docs/PROJECT_STATE.md`** (metrics, module inventory, known gaps) and check off completed items in **`docs/VISION_AND_ROADMAP.md`**.
