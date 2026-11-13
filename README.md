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
* **100% Offline-First Architecture**: All personal workout logs, custom exercises, routines, and heatmaps remain strictly within your device's browser local storage (`localStorage`). No telemetry, no third-party tracking, and zero remote database transmissions.
* **One-Click Portable Backups**: Export and import your entire workout history as a portable JSON file across PC, tablet, and mobile.

---

## Tech Stack

* **Framework**: React 19 + Vite 8
* **Styling**: Pure CSS Architecture (Obsidian Dark & Warm Linen Light themes)
* **Icons**: Lucide React
* **Testing & Linting**: Node Test Runner (`node:test`) + Oxlint
* **Deployment**: GitHub Actions CI/CD to GitHub Pages

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

# Run unit tests
npm test

# Run linter
npm run lint

# Build production bundle
npm run build
```

---

## Privacy & Data Sovereignty

Nova Soma does not track, send, or store your personal training data on external cloud servers. All routines, weights, repetitions, and history are kept exclusively on your device.

---

## License

Private & proprietary — © Nova Psiche. All rights reserved.
