# Nova Soma — Vision, Objectives & Roadmap

> *“Design is thinking made visual through restraint.”*

## 1. North Star Objective

Turn **Nova Soma** into a benchmark-grade, local-first athletic and biomechanical studio application:
- **Somatic Calm over App Clutter**: Every surface mirrors Warm Linen paper, unhurried typography, and tactile hierarchy—giving the lifter clarity before, during, and after every session.
- **Scientific Precision by Default**: Not a generic checklist—every movement carries standardized kinesiological metadata (planes of motion, kinetic chains, load vectors, resistance profiles, joint actions) grounded in NSCA, ACE, NASM, and ExRx taxonomy.
- **Total Data Sovereignty**: Zero logins, zero tracking pixels, zero subscription locks. Your workouts and biometrics live on your hardware, work offline as an installable PWA, and export cleanly to portable JSON at any time.
- **Portfolio-Caliber Engineering**: Modular codebase, strict zero-error static checks, deterministic unit + Playwright browser coverage, and living project documentation.

---

## 2. Architectural & UX Principles

1. **Intentional Subtraction** — If a pill, eyebrow kicker, filter bar, or theme mode does not actively earn its pixels under current usage, remove it.
2. **Respect Motion & Attention** — Transitions use natural damped springs (`--ease-spring`) and honor `prefers-reduced-motion`. Timers run off wall-clock timestamps so locking your phone never skews rest periods.
3. **Single Source of Truth** — Tokens live in `src/styles/tokens.css`, types in `src/types/models.d.ts`, migrations in `src/utils/migrations.js`, and storage keys in `src/utils/storage.js`.
4. **Zero-Leak Runtime** — Audio nodes, animation frames, scroll locks, focus traps, and export Object URLs must self-dispose cleanly.

---

## 3. Release Timeline & Milestones

### Completed Foundations

#### v0.1 — Initial Training Prototype *(Completed)*
- Established local React + Vite application shell with core workout logging, countdown rest timer, and browser history persistence.

#### v0.2 — Biomechanics Studio & 127-Movement Catalog *(Completed)*
- Built modular 8-category movement library (`127` canonical exercises) with interactive SVG muscle mapping (`MiniBodyMap`) and full `ExerciseBiomechanics` taxonomy.
- Implemented contiguous phase ordering (`warmup` → `main` → `decompression`), superset pairing, automatic `-20%` drop-set suggestions, wall-clock timers, and one-click Demo Data showcase mode.

#### v0.3 — Warm Linen Light Redesign, Modular Split, PWA & CI/CD *(Completed)*
- Committed exclusively to the Warm Linen editorial light design system (`Plus Jakarta Sans` + typography hierarchy).
- Decomposed monolithic `ActiveWorkoutModal` into modular `src/components/player/` subcomponents (`PlayerHeader`, `PlayerQueueDrawer`, `PlayerGuideDrawer`, `FinishWorkoutModal`) and `OverviewExerciseRow`.
- Added offline-first `vite-plugin-pwa` Service Worker generation, `oxlint`, TypeScript `checkJs` (`models.d.ts`), `41` unit tests (`node:test`), `4` Playwright E2E critical flow specs, and `.github/workflows/deploy.yml` CI -> GitHub Pages pipeline.

#### v0.4 — Foundation Hardening, Asset Organization & Docs Architecture *(Completed)*
- **Personal Routine Focus**: Pruned generic extra starter routines down to the user's two personal leg routines (`leg-workout-1` & `leg-workout-2`), backed by one-time storage cleanup migration (`PRUNED_EXTRA_DEFAULTS`).
- **Asset & Module Organization**: Separated `src/assets/` into `exercises/`, `brand/`, and `anatomy/`; removed unused template `public/favicon.svg`; extracted `src/utils/migrations.js` out of `App.jsx` (`-200+` lines).
- **CSS & Token Hygiene**: Stripped `83` dead `[data-theme="dark"]` selectors across stylesheets and consolidated all duplicate `:root` tokens into `src/styles/tokens.css`.
- **Leak Fixes**: Added `osc.onended` Web Audio disconnect (`audio.js`), singleton canvas/RAF lifecycle cleanup (`confetti.js`), and tracked export `URL.revokeObjectURL` cleanup (`DataBackupModal.jsx`).
- **Subtraction & Motion Polish**: Removed redundant eyebrow kickers, emoji accents, duplicate `#library` date header, and unused filter bar when `<= 2` routines exist; added damped spring easing and tactile press feedback.
- **Official Documentation**: Created `AGENTS.md`, `docs/VISION_AND_ROADMAP.md`, `docs/ARCHITECTURE.md`, and `docs/PROJECT_STATE.md`.

#### v0.5 — Mobile Gym Readiness, Bespoke Brand & Media Craft *(Current Release)*
- [x] Integrated bespoke transparent SVG Ouroboros Spine brand emblem (`logo.svg`) + crisp PNG/SVG favicons (`favicon.svg`, `favicon.png`, `logo-192.png`, `logo-512.png`).
- [x] Compressed `src/assets/exercises/mcgill-curl-up.jpg` (`1024×1024`, `302.6 kB` -> `800×800`, `22.4 kB`) and added smooth lazy-image decode transitions via shared `<FadeImage />`.
- [x] Added automatic Screen Wake Lock (`useWakeLock`), safe mobile haptic pulses (`haptics.js`), non-blocking `5s` Undo recovery (`useUndoToast` + `<UndoToast />`), a dedicated two-zone **Mobile Chronograph Sheet Dock** (`<= 720px` bottom dock with full-width progress rail, segmented `Exercise | Rest` tabs, and `44px` tactile play CTA distinct from Desktop's ring HUD), and Playwright mobile E2E coverage.
- [x] Pruned `530` dead CSS rules (`~74 kB` source / `~59.7 kB` built CSS reduction) via AST-verified PostCSS cleanup across `src/styles/*.css`.

---

### Upcoming Milestones

#### v0.6 — Strength Progression Intelligence
- [ ] Per-exercise PR detection, estimated 1RM (e1RM) trend sparklines, and session-to-session overload deltas inside Exercise Detail / Overview (scoped after foundation stabilizes).
- [ ] Tactile Barbell Plate Loader utility inside the Live Player set drawer.
- [ ] Weekly muscle-group balance summary refinement grounded in logged sets.

#### v0.7 — Exercise Authoring & Routine Workflows
- [ ] Clean single-exercise JSON / form creator UI in `#library` using existing `parseSingleExerciseJson` validation (`src/utils/exerciseImport.js`).
- [ ] Routine duplication / template cloning and custom phase templates.

#### v0.8 — Program Blocks & Mesocycle Planning
- [ ] Multi-week block progression (accumulation → intensification → deload) without compromising local-first zero-account simplicity.
