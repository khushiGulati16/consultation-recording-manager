# Project Notes — Consultation Recording Manager

## 1. Overview

A single-page React application that lets an astrology platform's team upload, browse, search, and review consultation recordings between astrologers and clients. The app simulates AI-powered transcription and summarization, and provides a basic analytics view.

---

## 2. Tech Stack

- **React 18** — component-based UI, well-suited for a dashboard-style app with multiple interactive views (list, modals, analytics)
- **Vite** — chosen over Create React App for near-instant dev server startup and HMR, critical when working under a 48-hour deadline
- **Inline styles (CSS-in-JS via style objects)** — avoided setting up Tailwind/CSS modules to reduce config overhead and keep the entire UI logic + styling co-located in one file for faster iteration
- **No external state library** — `useState` at the top-level `App` component is sufficient since the data model is small (a single `recordings` array) and there's no deep prop drilling beyond 1-2 levels

---

## 3. Architecture

```
App (root state: recordings, search, filters, selected, modals)
 ├── Header (nav tabs: Recordings / Analytics, Upload button)
 ├── Stats row (4 metric cards)
 ├── Search + Filter bar
 ├── RecordingCard[] (list, filtered)
 ├── TranscriptModal (conditional — shown when a recording is selected)
 │     └── handles "Generate Transcript with AI" simulation
 ├── UploadModal (conditional — shown when uploading)
 └── Analytics view (alternate tab — topic/astrologer breakdown, coverage %)
```

**Data flow**: All state lives in `App`. Child components receive data + callbacks as props (`onClick`, `onUpload`, `onTranscribe`, `onClose`). This keeps the data model centralized and easy to reason about — appropriate given the scope.

**Why not Redux/Context?** The component tree is shallow (max 2 levels deep) and there's a single source of truth. Adding global state management would be premature complexity for this scope — a key engineering judgment call given the "don't over-engineer" spirit of the brief.

---

## 4. Key Engineering Decisions

| Decision | Reasoning |
|---|---|
| Single `App.jsx` file with multiple components | Faster to navigate and review for a small project; easy to split into files later if it grows |
| Mock data reflects real astrology terminology (Kundali, Guna Milan, Mangal Dosha, Dasha) | Shows domain understanding, makes the prototype feel like a real product rather than generic Lorem Ipsum CRUD |
| Simulated AI transcription with `setTimeout` | Demonstrates the UX flow and loading states without requiring API keys / external calls during evaluation |
| Status badges (Transcribed/Pending/Processing) | Gives at-a-glance state visibility — a common pattern in real operational dashboards |
| Analytics tab with progress bars instead of a charting library | Avoids adding a heavy dependency (Chart.js/Recharts) for 2 simple bar visualizations; hand-rolled divs are lighter and fully styleable |

---

## 5. Assumptions

- This is evaluated as a **frontend prototype** — no backend, database, or authentication is required for this round
- "AI usage" in the app (transcription/summarization) can be **simulated** as long as the UX and integration points are clearly designed for a real API
- The target users are platform admins/astrologers reviewing past consultations, not end-clients
- Audio/video files don't need to actually play back in this version — the focus is on metadata, search, and transcript management

---


