# 🏷️ Project Title
**3D Robotic Portfolio Website**

## 🧾 Executive Summary
The **3D Robotic Portfolio Website** is a high-performance, visually immersive web application designed to showcase a developer's portfolio with cinematic flair. Leveraging state-of-the-art web technologies including **React 18, Three.js, and Framer Motion**, it delivers a seamless, interactive user experience. Key differentiators include a physics-based robotic drone simulation, smooth "cinematic" scrolling via Lenis, and a responsive, glassmorphism-inspired UI. This report documents the complete technical state, architecture, and implementation details of the project following recent enhancements to the navigation and skills display systems.

## 📑 Table of Contents
1.  [🧩 Project Overview](#-project-overview)
2.  [🎯 Objectives & Goals](#-objectives--goals)
3.  [✅ Acceptance Criteria](#-acceptance-criteria)
4.  [💻 Prerequisites](#-prerequisites)
5.  [⚙️ Installation & Setup](#-installation--setup)
6.  [🔗 API Documentation](#-api-documentation)
7.  [🖥️ UI / Frontend](#-ui--frontend)
8.  [🔢 Status Codes](#-status-codes)
9.  [🚀 Features](#-features)
10. [🧱 Tech Stack & Architecture](#-tech-stack--architecture)
11. [🛠️ Workflow & Implementation](#-workflow--implementation)
12. [🧪 Testing & Validation](#-testing--validation)
13. [🔍 Validation Summary](#-validation-summary)
14. [🧰 Verification Testing Tools](#-verification-testing-tools--command-examples)
15. [🧯 Troubleshooting & Debugging](#-troubleshooting--debugging)
16. [🔒 Security & Secrets](#-security--secrets)
17. [☁️ Deployment](#-deployment-vercel)
18. [⚡ Quick-Start Cheat Sheet](#-quick-start-cheat-sheet)
19. [🧾 Usage Notes](#-usage-notes)
20. [🧠 Performance & Optimization](#-performance--optimization)
21. [🌟 Enhancements & Features](#-enhancements--features)
22. [🧩 Maintenance & Future Work](#-maintenance--future-work)
23. [🏆 Key Achievements](#-key-achievements)
24. [🧮 High-Level Architecture](#-high-level-architecture)
25. [🗂️ Folder Structure](#-folder-structure-tree)
26. [🧭 How to Demonstrate Live](#-how-to-demonstrate-live-exact-commands)
27. [💡 Summary, Closure & Compliance](#-summary-closure--compliance)

---

## 🧩 Project Overview
A single-page portfolio application that serves as a digital resume and showcase associated with **Mohit Kumar Dey**. It transitions from a standard static site into a dynamic, 3D interactive experience. The core interaction model relies on a custom "Scroll Lock" mechanism that guides users through narrative sections (Hero, About, Services, Skills, Projects) with precise timing and animation.

## 🎯 Objectives & Goals
*   **Immersive UX**: Provide a "wow" factor using 3D elements and smooth scrolling.
*   **Performance**: Maintain 60fps animations even with heavy graphical elements.
*   **Responsiveness**: Ensure full functionality across desktop and mobile devices.
*   **Maintainability**: Use a modular component architecture with TypeScript for type safety.
*   **Robust Navigation**: Guarantee error-free navigation regardless of scroll state or device type.

## ✅ Acceptance Criteria
*   [x] **Mobile Menu**: Hamburger menu must open/close smoothly and navigate correctly to sections without scroll locking issues.
*   [x] **Skills Carousel**: Must scroll infinitely in a seamless loop at a constant 100px/s speed, pausing on hover and resuming instantly.
*   [x] **Hero Section**: 3D Drone must load and respond to interaction; initial scroll lock must automatically release after intro animation.
*   [x] **Performance**: No layout shifts or jank during scrolling.

## 💻 Prerequisites
*   **Node.js**: v18.0.0 or higher
*   **npm**: v9.0.0 or higher
*   **Operating System**: Windows, macOS, or Linux
*   **Browser**: Modern browser with WebGL support (Chrome/Edge/Firefox/Safari)

## ⚙️ Installation & Setup
1.  **Clone the Repository**:
    ```bash
    git clone <repository_url>
    cd 3D-Robotic-Portfolio-Website
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    npm ci
    ```
3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
4.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🔗 API Documentation
*This project is primarily client-side. The backend (`server/index.ts`) serves as a static file host and API proxy.*

*   **`GET /api/*`**: Reserved for future backend API routes (currently minimal).
*   **`GET /*`**: Serves the React SPA (Client-side routing via Wouter).

## 🖥️ UI / Frontend
*   **Pages**:
    *   `Home` (`client/src/pages/home.tsx`): The main entry point orchestrated by `FullPage.tsx`.
*   **Key Components**:
    *   `Header`: Responsive navigation bar with mobile hamburger menu, ScrollLockManager integration, and Lenis scroll control.
    *   `Hero`: 3D Canvas integration, typing text effect, and intro scroll lock logic.
    *   `Skills`: Infinite carousel with `useAnimationFrame` custom loop for precise speed control.
    *   `Projects`, `Services`, `About`: Informational sections with reveal animations.
*   **State Flow**:
    *   **Global Layout**: `FullPage.tsx` initializes `Lenis` (smooth scroll) and exposes it to `window.lenis`.
    *   **Scroll Locking**: `ScrollLockManager` singleton coordinates scroll freezing for specific durations (e.g., during Hero intro).
    *   **Theme**: `ThemeProvider` context manages Light/Dark mode.

**Where to change styles**:
*   Global: `client/src/index.css` (Tailwind directives & custom animations).
*   Component-specific: Inline Tailwind classes within `.tsx` files.
*   Configuration: `tailwind.config.ts`.

## 🔢 Status Codes
*   **200 OK**: Successful resource load / API response.
*   **404 Not Found**: Client-side route not found (handled by `NotFound` page).
*   **500 Internal Server Error**: Backend processing failure.

## 🚀 Features
*   **Cinematic Scrolling**: Custom-tuned Lenis integration for buttery smooth vertical traversal.
*   **3D Drone Interaction**: Interactive Spline/Three.js model in the Hero section.
*   **Infinite Skills Loop**: Custom-engineered carousel that never stutters or resets visibly.
*   **Glassmorphism UI**: High-end aesthetic using backdrop filters and transparency.
*   **Mobile-First Navigation**: Touch-friendly menu with intelligent scroll unlocking.

## 🧱 Tech Stack & Architecture

### Stack
*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS, PostCSS, Lucide Icons
*   **Animation**: Framer Motion, GSAP, Tailwind-Animate
*   **3D/Graphics**: Three.js, @react-three/fiber, @react-three/drei
*   **State/Routing**: Wouter, TanStack Query
*   **Backend**: Express (Node.js)

### Component Diagram (ASCII)
```text
+-------------------------------------------------------+
|                       App.tsx                         |
|  [QueryClientProvider] -> [ThemeProvider] -> [Router] |
+-------------------------------------------------------+
                          |
                          v
+-------------------------------------------------------+
|                      Home.tsx                         |
|                   [FullPage.tsx]                      |
| (Manages Lenis Scroll & ScrollLockManager Singleton)  |
+---------------------------+---------------------------+
                            |
    +-------------+---------+---------+-------------+
    |             |                   |             |
+---+----+   +----+---+         +-----+----+   +----+---+
| Header |   |  Hero  |         |  Skills  |   | Footer |
+--------+   +--------+         +----------+   +--------+
    |            |                   |
[MobileMenu]  [Canvas3D]       [InfiniteLoop]
    |            |                   |
[UnlockScroll] [LockScroll]     [RAF_Animation]
```

## 🛠️ Workflow & Implementation
1.  **Initialization**: `App.tsx` sets up providers.
2.  **Routing**: `Wouter` matches `/` to `Home.tsx`.
3.  **Layout Mount**: `FullPage` mounts, initializes `Lenis`, and assigns it to `window.lenis`.
4.  **Hero Entry**: `Hero` component mounts, `ScrollLockManager` locks scroll for ~6s for intro.
5.  **User Interaction**:
    *   **Desktop**: User scrolls naturally; Lenis interpolates for smoothness.
    *   **Mobile Nav**: User opens hamburger menu -> clicks link -> `Header` unlocks scroll manager -> forces overflow unset -> invokes `lenis.scrollTo`.
6.  **Skills Section**: `Skills` component runs a `useAnimationFrame` loop to translate the X-axis of the skill track at constant speed.

## 🧪 Testing & Validation

| ID | Area | Command / Action | Expected Output | Explanation |
|----|------|------------------|-----------------|-------------|
| T-01 | Build | `npm run build` | `Build complete.` (Exit 0) | Verifies TypeSafety and bundling. |
| T-02 | Mobile Nav | Open Menu -> Click Projects | Menu closes, Page scrolls to Projects. | Ensures `ScrollLockManager` unlock logic works. |
| T-03 | Carousel | Hover over Skills | Carousel pauses instantly. | Verifies interaction handler. |
| T-04 | Carousel | Mouse Leave Skills | Carousel resumes at full speed IMMEDIATELY. | Verifies `useAnimationFrame` custom logic (no easing lag). |
| T-05 | Responsiveness | Resize width < 768px | Hamburger menu appears. | Verifies Tailwind breakpoints. |

## 🔍 Validation Summary
*   **Mobile Menu Fix**: Confirmed effective. The race condition between `overflow: hidden` removal and `scrollTo` execution was resolved by explicitly unsetting overflow and unlocking the global manager before scrolling.
*   **Carousel Speed**: Confirmed effective. The switch from `useAnimationControls` (Framer Motion internal) to `useAnimationFrame` (Manual loop) successfully eliminated the "slow ramp-up" issue.

## 🧰 Verification Testing Tools & Command Examples
*   **ESLint**: `npm run lint` (if configured)
*   **TypeScript Check**: `npx tsc --noEmit`
*   **Vite Preview**: `npm run build && npm run start` to test production build locally.

## 🧯 Troubleshooting & Debugging
*   **Scroll stuck on mobile?**
    *   *Fix*: Ensure `ScrollLockManager` is unlocked. Reload page to reset singleton.
*   **Carousel disappearing?**
    *   *Fix*: Check for duplicate `layoutId` props in `Skills.tsx`. Ensure `totalWidth` calculation is > 0.
*   **"window.lenis is undefined"**
    *   *Fix*: Ensure `FullPage` component is mounted and has finished initialization effect.

## 🔒 Security & Secrets
*   No sensitive API keys are currently stored in the client.
*   Express server should implement rate limiting and Helmet middleware for production deployment.
*   Dependencies are managed via `package-lock.json` to ensure version consistency.

## ☁️ Deployment (Vercel)
1.  **Push to GitHub**.
2.  **Import in Vercel**.
3.  **Settings**:
    *   Framework Preset: `Vite`
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
    *   Install Command: `npm install`
4.  **Environment Variables**: None currently required for static features.

## ⚡ Quick-Start Cheat Sheet
*   `npm run dev`: Start working.
*   `ctrl+c`: Stop server.
*   `npx tsc`: Check for type errors.
*   `Header.tsx`: Go here to edit menu links.

## 🧾 Usage Notes
*   **Images**: Stored in `client/src/components/ui` or external assets.
*   **Content**: Edit text directly in React components (e.g., `Hero.tsx` for bio).
*   **Colors**: Modify `index.css` CSS variables for global theme changes.

## 🧠 Performance & Optimization
*   **Lazy Loading**: Components can be lazy-loaded using `React.lazy` if bundle size grows.
*   **Asset Optimization**: Ensure 3D models are GLB/GLTF compressed (Draco).
*   **Tree Shaking**: Vite automatically tree-shakes unused exports.

## 🌟 Enhancements & Features
*   **Current**: 3D Intro, Infinite Scroll, Sticky Navigation.
*   **Planned**: Blog section, Dark mode toggle (UI present, logic extensible), Backend CMS integration.

## 🧩 Maintenance & Future Work
*   **Regular Updates**: Keep `three` and `framer-motion` updated for performance wins.
*   **Refactoring**: `FullPage` logic could be moved to a context provider for cleaner access to Lenis instance.

## 🏆 Key Achievements
*   Solved complex **Framer Motion + Infinite Loop** conflict (Layout ID collisions).
*   Engineered a **physics-independent animation loop** for the carousel to bypass default spring physics.
*   Fixed **mobile scroll locking** architecture without rewriting the core `LockManager`.

## 🧮 High-Level Architecture
Client-Side Rendered (CSR) Application -> Wrapped in Express Proxy -> Delivered via CDN (Vercel Edge).
Data Flow: Unidirectional (Parent -> Child props).

## 🗂️ Folder Structure (Tree)
```text
3D-Robotic-Portfolio-Website/
├── client/
│   ├── src/
│   │   ├── components/    # UI Components (Hero, Header, Skills...)
│   │   ├── hooks/         # Custom hooks (useMobile, useScroll)
│   │   ├── lib/           # Utilities (queryClient, scrollLockManager)
│   │   ├── pages/         # Route Views (home.tsx)
│   │   ├── App.tsx        # Main App Entry
│   │   └── main.tsx       # DOM Mount Point
│   └── index.html         # HTML Template
├── server/
│   ├── index.ts           # Express Server Entry
│   └── routes.ts          # API Routes
├── package.json           # Dependencies & Scripts
├── tailwind.config.ts     # Styling Config
└── vite.config.ts         # Build Config
```

## 🧭 How to Demonstrate Live (Exact Commands)
1.  Open Terminal.
2.  Run: `npm install` (if fresh).
3.  Run: `npm run dev`.
4.  Open browser to: `http://localhost:3001`.
5.  **Demo Flow**:
    *   Wait for typed text intro.
    *   Scroll down to Skills. Hover to pause. Mouse out to resume instantly.
    *   Resize browser to mobile width.
    *   Open hamburger menu -> Click "Projects" -> Watch it scroll smoothly.

## 💡 Summary, Closure & Compliance
This report confirms that the **3D Robotic Portfolio Website** is feature-complete regarding the requested enhancements. The codebase is clean, typed, and modular. The critical issues regarding mobile navigation and animation timing have been resolved with robust, verified solutions. The project is ready for deployment and handover.
