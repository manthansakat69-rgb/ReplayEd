# ReplayEd — Adaptive Learning & Assessment Platform

A modern, high-performance web authentication portal for **ReplayEd**, featuring real-time 3D floating tech assets, interactive role-switching, session replay indicator, and a strict monochrome (black/white/grey) design system.

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** (v18.x or higher, tested on Node v24)
- **npm** (v9.x or higher)

### Setup & Launch Commands

#### 1. Frontend Development (Port 5173)
```bash
cd replayed-login
npm install
npm run dev
```
Open `http://localhost:5173/` in your browser.

#### 2. Backend API & MySQL Server (Port 5000)
```bash
cd server
npm install
# Set your MySQL root password in server/.env (DB_PASSWORD=your_password)
node setupDb.js   # Automatically creates database 'replayed_db' and imports tables/seeds
npm start         # Launches REST API server on http://localhost:5000
```

> **Note**: Even if MySQL is offline or password is not yet configured, the Express backend automatically runs with an in-memory fallback store so authentication and all portals continue functioning without disruption!

#### 3. Production Build & Deployment
```bash
npm run build
```
The compiled output is located in `dist/`, pre-configured with `_redirects` and `vercel.json` for 1-click deployment on Netlify or Vercel.

---

## 📋 List of All Third-Party Libraries Used (Hackathon Compliance)

In strict accordance with hackathon guidelines, all third-party dependencies are enumerated below:

| Package | Version | Purpose & Rationale |
| :--- | :--- | :--- |
| **`react`** | `^18.3.1` | Core UI library for component architecture and reactive state. |
| **`react-dom`** | `^18.3.1` | DOM renderer for React. |
| **`three`** | `^0.170.0` | 3D graphics rendering engine for procedural WebGL objects. |
| **`@react-three/fiber`** | `^8.17.10` | Declarative Three.js canvas abstraction for React. |
| **`@react-three/drei`** | `^9.121.4` | Production-grade 3D helpers: `<Float>`, `<Environment preset="city">`, camera utilities. |
| **`framer-motion`** | `^11.15.0` | Smooth physics-based UI transitions, animated tabs, and segmented role pill sliding (`layoutId`). |
| **`react-router-dom`** | `^6.28.0` | Client-side routing for `/login`, `/student`, `/teacher`, `/admin` and auth protection. |
| **`lucide-react`** | `^0.468.0` | Feather-derived icons (`GraduationCap`, `Presentation`, `ShieldCheck`, `Eye`, `EyeOff`, etc.). |
| **`tailwindcss`** | `^3.4.16` | Utility-first CSS framework for precise styling and responsive layouts. |
| **`postcss`** | `^8.4.49` | CSS transformation pipeline for Tailwind CSS. |
| **`autoprefixer`** | `^10.4.20` | Vendor prefixing for cross-browser CSS compliance. |
| **`vite`** | `^5.4.11` | Next-generation frontend build tooling and HMR dev server. |
| **`@vitejs/plugin-react`** | `^4.3.4` | Vite plugin for React fast-refresh and JSX transformation. |

---

## 🎨 Design System & Visual Architecture

- **Theme**: Strict Monochrome (`#0a0a0a` dark left panel with radial glow, `#f4f4f5` light background, `#ffffff` card, `#111111` to `#3f3f46` primary button gradient). No colored accents, preserving high-tech editorial polish.
- **Left Panel 3D Engine**:
  - 8 procedural tech objects: Hero Replay Triangle, Code Brackets (`</>`), Terminal Window with blinking cursor, Microchip CPU with pins, Git-Branch Commit Graph, Mechanical Switch Keycap, Curly Braces (`{ }`), and ambient floating particle shards.
  - Interactive mouse parallax tilting.
  - Respects OS `prefers-reduced-motion` settings.
  - Capped DPR (`[1, 1.5]`) and lazy-loaded via `React.lazy + Suspense` with CSS animated gradient fallback.
  - Automatically hidden on screens under 1024px for optimal mobile battery and performance.
- **Right Panel Authentication**:
  - Segmented 3-role switcher with animated sliding pill.
  - Animated tabs: Sign In vs. Create Account.
  - Role-specific dynamic button labels.
  - One-click **Demo Mode** (`Demo mode: continue without login`) for judges and rapid review.
  - Full client-side form validation and keyboard accessibility (`aria-selected`, `role="tablist"`).
