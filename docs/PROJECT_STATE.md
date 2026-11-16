# Nova Soma — Live Project State (AI Context Snapshot)

> **Purpose**: Single-glance status snapshot so AI coding assistants and contributors can immediately contextualize Nova Soma's current codebase scale, active features, resolved technical debt, quality metrics, and intentionally deferred scope.

**Current Stage**: `v0.5` — Mobile Gym Readiness, Bespoke Brand & Media Craft  
**Theme Mode**: Light-Only (**Warm Linen Editorial**) — `0` dark-mode selectors remaining  
**Data Mode**: `100%` Local-First PWA (`localStorage` only, zero backend/cloud calls)

---

## 1. Verified Codebase & Catalog Metrics

| Domain | Verified State | Location |
| :--- | :--- | :--- |
| **Canonical Exercises** | `135` unique movements (`127` illustrated, `8` pending images) | [`src/data/exercises/`](../src/data/exercises/index.js) |
| **Movement Categories** | `8` modular files (`16 + 13 + 19 + 23 + 23 + 14 + 21 + 6`) | `src/data/exercises/1_*.js` – `8_*.js` |
| **Illustrated Media Assets** | `127` local `.jpg` / `.webp` files (`mcgill-curl-up.jpg` `22.4 kB`) | [`src/assets/exercises/`](../src/assets/exercises/) + [`exerciseMedia.js`](../src/data/exerciseMedia.js) |
| **Brand & Anatomy Assets** | `logo.svg`, `logo.png`, `favicon.png`, `body.svg` | [`src/assets/brand/`](../src/assets/brand/), [`src/assets/anatomy/`](../src/assets/anatomy/) |
| **PWA & Favicon Assets** | `favicon.svg`, `favicon.png`, `logo-192.png`, `logo-512.png` | [`public/`](../public/) |
| **Default Seeded Routines** | `2` personal routines (`leg-workout-1`, `leg-workout-2`, `7` warm-up movements each) | [`src/data/workouts.js`](../src/data/workouts.js) |
| **Demo Showcase History** | `14` sessions (alternating the 2 routines + 6 manual logs) | [`src/utils/demoData.js`](../src/utils/demoData.js) |
| **Stylesheets** | `10` pruned CSS modules (`202.43 kB` built / `31.14 kB` gzip) | [`src/styles/`](../src/styles/) |
| **Storage Keys** | `11` managed keys (`STORAGE_KEYS`) | [`src/utils/storage.js`](../src/utils/storage.js) |
| **Unit Tests (`node:test`)** | `45 / 45` passing across `9` test files | [`tests/`](../tests/) |
| **E2E Tests (Playwright)** | `5 / 5` passing (desktop + `390×844` mobile & undo flows) | [`e2e/app.spec.js`](../e2e/app.spec.js) |

### Canonical Library Distribution (`135` Movements)
- `1_warmupAndMobility.js`: `16`
- `2_squatsAndKneeFlexion.js`: `13`
- `3_hipHingesAndGlutes.js`: `19`
- `4_pushUpperBody.js`: `23`
- `5_pullUpperBody.js`: `23`
- `6_lungesAndUnilateral.js`: `14`
- `7_coreAndSpineStability.js`: `21`
- `8_conditioningAndPower.js`: `6`

*(Equipment split verified via Exercise Library rules: `102` Equipment Loaded, `33` Bodyweight Only · Region split: `62` Lower Body, `53` Upper Body, `20` Core & Spine.)*

---

## 2. Recent Architectural & Polish Resolutions (v0.4–v0.5)

1. **v0.5 Bespoke Brand & Icons**: Integrated crisp transparent vector emblem [`src/assets/brand/logo.svg`](../src/assets/brand/logo.svg) + generated `192×192` & `512×512` PWA PNG icons in [`public/`](../public/), updating [`Navbar.jsx`](../src/components/Navbar.jsx), [`index.html`](../index.html), and [`vite.config.js`](../vite.config.js).
2. **v0.5 Mobile Gym Readiness**:
   - Automatic Screen Wake Lock hook ([`src/utils/useWakeLock.js`](../src/utils/useWakeLock.js)) keeping screens awake while `ActiveWorkoutModal` is mounted and visible.
   - Guarded mobile haptic pulses ([`src/utils/haptics.js`](../src/utils/haptics.js)) on set completion, timer zero (even when audio chime is muted), and Undo recovery.
   - Dedicated **Mobile Chronograph Sheet Dock & Live Player Overhaul (`<= 720px`)** inside [`ActiveWorkoutModal.jsx`](../src/components/ActiveWorkoutModal.jsx) & [`active-workout.css`](../src/styles/active-workout.css): uniform `36px` mobile top bar, non-clipping workout ribbon pills (`min-width: max-content`), clean horizontal exercise header (`54×54px` tappable illustration thumb + title/meta + `Form` pill, with redundant `Demo` button & `NEXT` set tag removed), `1.05rem` set numerals with solid Warm Bronze active set badge, adaptive 1-input/2-input mobile set steppers, and rounded Chronograph timer sheet kept intentionally distinct from Desktop's circular ring Chronograph HUD.
   - `390×844` mobile ergonomic polish in [`src/styles/responsive.css`](../src/styles/responsive.css) (safe-area sticky dock padding, expanded tap targets, nowrap home/library badges, zero horizontal scroll, with conflicting legacy player rules removed so `active-workout.css` is the single source of truth).
3. **v0.5 Undo Recovery & Smooth Image Decode**:
   - Non-blocking `5s` Undo toast system ([`useUndoToast.js`](../src/utils/useUndoToast.js) + [`UndoToast.jsx`](../src/components/UndoToast.jsx)) across draft discard, routine delete, session delete, and player set removal.
   - Re-encoded `mcgill-curl-up.jpg` (`302.6 kB` -> `22.4 kB`) and added shared smooth `<FadeImage />` decode reveal in [`MediaViewer.jsx`](../src/components/MediaViewer.jsx) and [`ExerciseDatabaseView.jsx`](../src/components/ExerciseDatabaseView.jsx).
4. **v0.5 Leg Warm-Up Expansion (`127 -> 135` Movements)**: Added `Lateral Glute Step-Down` (`Bodyweight`, `Single Dumbbell`, `Kettlebell`, `Loop Resistance Band`) and `Elevated Ankle Dorsiflexion Mobilization` (`Closed-Chain Weight-Bearing Talocrural Dorsiflexion Mobilization`, with `Bodyweight`, `Single Dumbbell`, `Kettlebell`, `Loop Resistance Band` variations), all timed in seconds (`30-45s/side`), added `wu-dumbbell-glute-step-down` and `wu-elevated-ankle-dorsiflexion` alongside existing warm-ups in both leg routines ([workouts.js](../src/data/workouts.js)), and wired idempotent one-time `localStorage` migration ([routineMigrations.js](../src/utils/routineMigrations.js) + [migrations.js](../src/utils/migrations.js)).
5. **v0.5 CSS Bloat Removal**: Pruned `530` dead pre-redesign CSS rules (`321.0 KB` -> `246.5 KB` raw before mobile sheet styles; built CSS down from `259.91 kB` -> `202.29 kB`) via AST-verified PostCSS audit.
6. **v0.4 Baseline (Retained)**: Pruned extra starter routines to `leg-workout-1` & `leg-workout-2`, extracted [`migrations.js`](../src/utils/migrations.js), fixed Web Audio / Confetti RAF / Backup blob leaks, stripped `83` dead dark-mode selectors, and established docs suite.

---

## 3. Intentionally Deferred Scope (Next Roadmap Batches)

- **v0.6 — Strength Progression Intelligence** *(Deferred until user requests)*:
  - Tactile Barbell Plate Calculator inside the live player, per-exercise PR badges, and estimated 1RM (e1RM) trend sparklines.
- **v0.7 — Exercise Authoring & Routine Workflows**:
  - Single-exercise JSON/form creator UI wired to [`src/utils/exerciseImport.js`](../src/utils/exerciseImport.js) and routine cloning refinements.

---

## 4. Latest Build & Quality Gate Baseline

Verified locally against final workspace files:
- `npm run lint`: `Found 0 warnings and 0 errors` (`71` files via `oxlint`)
- `npm run typecheck`: `0` errors (`tsc --noEmit`)
- `npm test`: `45` passed, `0` failed (`9` files in `tests/`)
- `npm run build`: `2140` modules transformed; `PWA v2.0.0` precache `145 entries (3630.50 KiB)`
- `npm run test:e2e`: `5` passed (`e2e/app.spec.js`, desktop + mobile `390×844`)
