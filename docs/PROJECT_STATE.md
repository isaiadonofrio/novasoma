# Nova Soma — Live Project State (AI Context Snapshot)

> **Purpose**: Single-glance status snapshot so AI coding assistants and contributors can immediately contextualize Nova Soma's current codebase scale, active features, resolved technical debt, quality metrics, and intentionally deferred scope.

**Current Stage**: `v0.4` — Foundation Hardening, Asset Organization & Documentation  
**Theme Mode**: Light-Only (**Warm Linen Editorial**) — `0` dark-mode selectors remaining  
**Data Mode**: `100%` Local-First PWA (`localStorage` only, zero backend/cloud calls)

---

## 1. Verified Codebase & Catalog Metrics

| Domain | Verified State | Location |
| :--- | :--- | :--- |
| **Canonical Exercises** | `127` unique movements (`127/127` illustrated) | [`src/data/exercises/`](../src/data/exercises/index.js) |
| **Movement Categories** | `8` modular files (`8 + 13 + 19 + 23 + 23 + 14 + 21 + 6`) | `src/data/exercises/1_*.js` – `8_*.js` |
| **Illustrated Media Assets** | `127` local `.jpg` / `.webp` files | [`src/assets/exercises/`](../src/assets/exercises/) + [`exerciseMedia.js`](../src/data/exerciseMedia.js) |
| **Brand & Anatomy Assets** | `logo-nova-soma.jpg`, `body.svg` | [`src/assets/brand/`](../src/assets/brand/), [`src/assets/anatomy/`](../src/assets/anatomy/) |
| **Default Seeded Routines** | `2` personal routines (`leg-workout-1`, `leg-workout-2`) | [`src/data/workouts.js`](../src/data/workouts.js) |
| **Demo Showcase History** | `14` sessions (alternating the 2 routines + 6 manual logs) | [`src/utils/demoData.js`](../src/utils/demoData.js) |
| **Stylesheets** | `10` CSS modules anchored in `tokens.css` | [`src/styles/`](../src/styles/) |
| **Storage Keys** | `10` managed keys (`STORAGE_KEYS`) | [`src/utils/storage.js`](../src/utils/storage.js) |
| **Unit Tests (`node:test`)** | `41 / 41` passing across `8` test files | [`tests/`](../tests/) |
| **E2E Tests (Playwright)** | `4 / 4` passing in Chromium against `vite preview` | [`e2e/app.spec.js`](../e2e/app.spec.js) |

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

## 2. Recent Architectural & Cleanup Resolutions (v0.4)

1. **Routine Focus & Cleanup**: Removed 4 extra seeded starter routines (`full-body-movement-restoration`, `bodyweight-movement-flow`, `kettlebell-functional-carry`, `mcgill-decompression-reset`); added one-time `PRUNED_EXTRA_DEFAULTS` migration in [`src/utils/migrations.js`](../src/utils/migrations.js).
2. **Migration Extraction**: Extracted legacy catalog normalization, title migration, canonical biomechanics/media backfill, and record derivation out of [`src/App.jsx`](../src/App.jsx) into `src/utils/migrations.js`.
3. **Asset Reorganization**: Moved `127` exercise images into `src/assets/exercises/`, `body.svg` into `src/assets/anatomy/`, and `logo-nova-soma.jpg` into `src/assets/brand/`; removed unused template `public/favicon.svg`.
4. **Dead CSS & Token Deduplication**: Stripped `83` dead `[data-theme="dark"]` blocks across `active-workout.css`, `home-dashboard.css`, and `modals.css`; consolidated `:root` tokens into [`src/styles/tokens.css`](../src/styles/tokens.css) imported by [`src/index.css`](../src/index.css).
5. **Memory & Resource Leak Fixes**:
   - Web Audio oscillator/gain self-disconnect in [`src/utils/audio.js`](../src/utils/audio.js) (`osc.onended` + `dispose()`).
   - Singleton canvas/RAF tracking & cleanup in [`src/utils/confetti.js`](../src/utils/confetti.js).
   - Unmount-safe Blob `URL.revokeObjectURL` cleanup timer in [`src/components/DataBackupModal.jsx`](../src/components/DataBackupModal.jsx).
6. **Intentional UI Subtraction & Motion Polish**:
   - Removed redundant eyebrow kickers (`PERSONAL ARCHIVE`, `YOUR WEEK`), streak flame emoji, duplicate `#library` date header, and unused category filter strip on Home when `routines.length <= 2`.
   - Added `--ease-spring` damped transitions, soft Warm-Linen tonal elevations, button tactile `:active` scale, and `@media (prefers-reduced-motion: reduce)` guards.

---

## 3. Known Gaps & Intentionally Deferred Scope

- **Intentional Deferrals (Do Not Implement Without User Approval)**:
  - Custom Exercise Creator / JSON Import UI (engine helper [`src/utils/exerciseImport.js`](../src/utils/exerciseImport.js) is already tested and ready for **v0.7**).
  - Per-exercise PR badges & progression trend charts (scoped for **v0.6**).
- **Upcoming Visual Polish Items**:
  - Replace square JPEG logo [`src/assets/brand/logo-nova-soma.jpg`](../src/assets/brand/logo-nova-soma.jpg) with a bespoke transparent SVG monogram (**v0.5**).
  - Re-compress `mcgill-curl-up.jpg` (`~303 kB` in `dist/assets/`) down to match the `~15–38 kB` range of sibling assets (**v0.5**).

---

## 4. Latest Build & Quality Gate Baseline

Verified locally against final workspace files:
- `npm run lint`: `Found 0 warnings and 0 errors` (`65` files via `oxlint`)
- `npm run typecheck`: `0` errors (`tsc --noEmit`)
- `npm test`: `41` passed, `0` failed
- `npm run build`: `2135` modules transformed; `PWA v2.0.0` precache `139 entries (3815.35 KiB)`
- `npm run test:e2e`: `4` passed (`e2e/app.spec.js`)
