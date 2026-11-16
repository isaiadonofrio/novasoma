# Nova Soma — Live Project State (AI Context Snapshot)

> **Purpose**: Single-glance status snapshot so AI coding assistants and contributors can immediately contextualize Nova Soma's current codebase scale, active features, resolved technical debt, quality metrics, and intentionally deferred scope.

**Current Stage**: `v0.5` — Mobile Gym Readiness, Bespoke Brand & Media Craft  
**Theme Mode**: Light-Only (**Warm Linen Editorial**) — `0` dark-mode selectors remaining  
**Data Mode**: `100%` Local-First PWA (`localStorage` only, zero backend/cloud calls)

---

## 1. Verified Codebase & Catalog Metrics

| Domain | Verified State | Location |
| :--- | :--- | :--- |
| **Canonical Exercises** | `127` unique movements (`127/127` illustrated) | [`src/data/exercises/`](../src/data/exercises/index.js) |
| **Movement Categories** | `8` modular files (`8 + 13 + 19 + 23 + 23 + 14 + 21 + 6`) | `src/data/exercises/1_*.js` – `8_*.js` |
| **Illustrated Media Assets** | `127` local `.jpg` / `.webp` files (`mcgill-curl-up.jpg` `22.4 kB`) | [`src/assets/exercises/`](../src/assets/exercises/) + [`exerciseMedia.js`](../src/data/exerciseMedia.js) |
| **Brand & Anatomy Assets** | `logo.svg`, `logo.png`, `favicon.png`, `body.svg` | [`src/assets/brand/`](../src/assets/brand/), [`src/assets/anatomy/`](../src/assets/anatomy/) |
| **PWA & Favicon Assets** | `favicon.svg`, `favicon.png`, `logo-192.png`, `logo-512.png` | [`public/`](../public/) |
| **Default Seeded Routines** | `2` personal routines (`leg-workout-1`, `leg-workout-2`) | [`src/data/workouts.js`](../src/data/workouts.js) |
| **Demo Showcase History** | `14` sessions (alternating the 2 routines + 6 manual logs) | [`src/utils/demoData.js`](../src/utils/demoData.js) |
| **Stylesheets** | `10` pruned CSS modules (`200.21 kB` built / `30.92 kB` gzip) | [`src/styles/`](../src/styles/) |
| **Storage Keys** | `10` managed keys (`STORAGE_KEYS`) | [`src/utils/storage.js`](../src/utils/storage.js) |
| **Unit Tests (`node:test`)** | `44 / 44` passing across `9` test files | [`tests/`](../tests/) |
| **E2E Tests (Playwright)** | `5 / 5` passing (desktop + `390×844` mobile & undo flows) | [`e2e/app.spec.js`](../e2e/app.spec.js) |

### Canonical Library Distribution (`127` Movements)
- `1_warmupAndMobility.js`: `8`
- `2_squatsAndKneeFlexion.js`: `13`
- `3_hipHingesAndGlutes.js`: `19`
- `4_pushUpperBody.js`: `23`
- `5_pullUpperBody.js`: `23`
- `6_lungesAndUnilateral.js`: `14`
- `7_coreAndSpineStability.js`: `21`
- `8_conditioningAndPower.js`: `6`

*(Equipment split verified via Exercise Library view: `96` Equipment Loaded, `31` Bodyweight Only · Region split: `54` Lower Body, `53` Upper Body, `20` Core & Spine.)*

---

## 2. Recent Architectural & Polish Resolutions (v0.4–v0.5)

1. **v0.5 Bespoke Brand & Icons**: Integrated crisp transparent vector emblem [`src/assets/brand/logo.svg`](../src/assets/brand/logo.svg) + generated `192×192` & `512×512` PWA PNG icons in [`public/`](../public/), updating [`Navbar.jsx`](../src/components/Navbar.jsx), [`index.html`](../index.html), and [`vite.config.js`](../vite.config.js).
2. **v0.5 Mobile Gym Readiness**:
   - Automatic Screen Wake Lock hook ([`src/utils/useWakeLock.js`](../src/utils/useWakeLock.js)) keeping screens awake while `ActiveWorkoutModal` is mounted and visible.
   - Guarded mobile haptic pulses ([`src/utils/haptics.js`](../src/utils/haptics.js)) on set completion, timer zero (even when audio chime is muted), and Undo recovery.
   - `390×844` mobile ergonomic polish in [`src/styles/responsive.css`](../src/styles/responsive.css) (safe-area sticky dock padding, expanded tap targets, nowrap home/library badges, zero horizontal scroll).
3. **v0.5 Undo Recovery & Smooth Image Decode**:
   - Non-blocking `5s` Undo toast system ([`useUndoToast.js`](../src/utils/useUndoToast.js) + [`UndoToast.jsx`](../src/components/UndoToast.jsx)) across draft discard, routine delete, session delete, and player set removal.
   - Re-encoded `mcgill-curl-up.jpg` (`302.6 kB` -> `22.4 kB`) and added shared smooth `<FadeImage />` decode reveal in [`MediaViewer.jsx`](../src/components/MediaViewer.jsx) and [`ExerciseDatabaseView.jsx`](../src/components/ExerciseDatabaseView.jsx).
4. **v0.5 CSS Bloat Removal**: Pruned `530` dead pre-redesign CSS rules (`321.0 KB` -> `246.5 KB` raw source CSS; built CSS down from `259.91 kB` -> `200.21 kB`) via AST-verified PostCSS audit.
5. **v0.4 Baseline (Retained)**: Pruned extra starter routines to `leg-workout-1` & `leg-workout-2`, extracted [`migrations.js`](../src/utils/migrations.js), fixed Web Audio / Confetti RAF / Backup blob leaks, stripped `83` dead dark-mode selectors, and established docs suite.

---

## 3. Intentionally Deferred Scope (Next Roadmap Batches)

- **v0.6 — Strength Progression Intelligence** *(Deferred until user requests)*:
  - Tactile Barbell Plate Calculator inside the live player, per-exercise PR badges, and estimated 1RM (e1RM) trend sparklines.
- **v0.7 — Exercise Authoring & Routine Workflows**:
  - Single-exercise JSON/form creator UI wired to [`src/utils/exerciseImport.js`](../src/utils/exerciseImport.js) and routine cloning refinements.

---

## 4. Latest Build & Quality Gate Baseline

Verified locally against final workspace files:
- `npm run lint`: `Found 0 warnings and 0 errors` (`70` files via `oxlint`)
- `npm run typecheck`: `0` errors (`tsc --noEmit`)
- `npm test`: `44` passed, `0` failed (`9` files in `tests/`)
- `npm run build`: `2139` modules transformed; `PWA v2.0.0` precache `145 entries (3609.79 KiB)`
- `npm run test:e2e`: `5` passed (`e2e/app.spec.js`, desktop + mobile `390×844`)
