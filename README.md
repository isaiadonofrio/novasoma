# NOVA SOMA

> **Minimalist Biomechanics & Somatic Training Engine**  
> *A Nova Psiche Project* • [www.novapsiche.com](https://www.novapsiche.com)

Nova Soma is a high-performance, distraction-free home workout and biomechanics web application. Designed around the classical Greek concept of **Sōma** (Σῶμα — *the physical body and its vitality*), it is built to operate 100% locally and offline on your device with zero cloud tracking, zero account walls, and complete personal data privacy.

---

## Key Features

* **Studio Workout Player**: Centered 2-column studio layout optimized across desktop, tablet, and mobile with sticky quick-complete HUD.
* **Pre-Planned Supersets & Drop Sets**: Clean visual cues for paired exercises, automatic 20% drop set load calculations, and seamless transitions.
* **Intelligent Timers**: Wall-clock timestamp tracking for both rest countdowns and session elapsed time with zero drift during backgrounding or mobile screen locks.
* **Somatic Exercise Library**: Interactive muscle map, movement patterns, form cues, and equipment tagging with lightweight local WebP assets.
* **100% Offline-First PWA Architecture**: Installable Progressive Web App with Workbox asset precaching and local-only `localStorage` persistence. Zero telemetry, zero account walls, and zero remote database transmissions.
* **One-Click Portable Backups & Showcase Demo Mode**: Export and import your entire workout history as a portable JSON file across devices, or load 5 weeks of realistic sample sessions in one click from **Local Data & Backup**.

---

## Tech Stack

* **Framework**: React 19 + Vite 8 + `vite-plugin-pwa`
* **Styling**: Pure CSS Architecture (Warm Linen editorial Light theme)
* **Icons**: Lucide React
* **Type Checking & Linting**: TypeScript (`tsc --noEmit` via `checkJs` + JSDoc models) & Oxlint
* **Testing**: Node Test Runner (`node:test`) + Playwright E2E (`playwright test`)
* **Deployment**: GitHub Actions CI/CD (`lint` → `typecheck` → `test` → `build` → `test:e2e`) to GitHub Pages

---

## Architecture Overview

```text
src/
├── components/
│   ├── player/        # Modular Studio Player (PlayerHeader, PlayerQueueDrawer, PlayerGuideDrawer, FinishWorkoutModal)
│   ├── overview/      # Routine Builder & In-Depth Sets Editor (OverviewExerciseRow)
│   └── ...            # HomeView, StatsDashboard, YearHeatmapCard, ExerciseDatabaseView, DataBackupModal
├── data/
│   ├── exercises/     # 127 canonical movements across 8 biomechanical categories (127/127 illustrated)
│   └── exerciseTaxonomy.js
├── types/             # Shared TypeScript domain definitions (models.d.ts)
└── utils/             # Analytics, set/superset engine, wall-clock timers, demoData, safe localStorage
```

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/isaiadonofrio/novasoma.git
cd novasoma

# Install dependencies
npm install

# Start local development server
npm run dev

# Run linter & TypeScript typecheck
npm run lint
npm run typecheck

# Run unit tests
npm test

# Build production PWA bundle & run Playwright E2E suite
npm run build
npm run test:e2e
```

---

## Privacy & Data Sovereignty

Nova Soma does not track, send, or store your personal training data on external cloud servers. All routines, weights, repetitions, and history are kept exclusively on your device.

---

## License

Private & proprietary — © Nova Psiche. All rights reserved.
