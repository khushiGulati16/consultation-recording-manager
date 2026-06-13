# Consultation Recording Manager — Humara Pandit

A web application for astrologers and platform admins to organize, search, and review consultation recordings between astrologers and clients — with AI-assisted transcription and summarization.

Built as part of the Humara Pandit Placement Process — Assignment Submission.

---

## Problem Statement

Astrologers conduct hundreds of consultation calls every week. Important context — remedies suggested, gemstones recommended, follow-up dates — often gets lost. This tool aims to give the platform a single place to:

- Store and organize consultation recordings
- Search recordings by client, astrologer, topic, or tag
- Auto-generate transcripts and summaries using AI
- Track transcription coverage and consultation analytics

---

## Features

- Recording library — Card-based view of all consultations with astrologer, client, date, duration, topic, and tags
- Search & filters — Search by client name, astrologer, topic, or tag. Filter by astrologer and topic dropdowns
- AI transcription — One-click "Generate Transcript with AI" simulates Whisper-style transcription + summary generation
- Transcript viewer — Modal showing full transcript + AI-generated summary
- Status badges — Transcribed / Pending / Processing states at a glance
- Upload flow — UI placeholder only ("Coming Soon"), not functional yet
- Analytics dashboard — UI placeholder only ("Under Construction"), not built yet

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React 18 + Vite | Fast dev server, modern component model |
| Styling | Inline styles (CSS-in-JS) | No build-time CSS dependency conflicts, fast iteration under time pressure |
| State | React useState | App scope is small enough that Redux/Context would be over-engineering |
| Fonts | Inter (Google Fonts) | Clean, readable UI typography |
| AI (planned/production) | OpenAI Whisper API for transcription, GPT for summarization | Industry-standard speech-to-text with strong multilingual (Hindi/English) support |
| Storage (planned/production) | Supabase / Firebase Storage | Quick to set up, handles file uploads + metadata DB together |

---

## Getting Started

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit http://localhost:5173

### Build for production

npm run build
npm run preview

---

## Project Structure

consultation-recording-manager/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx        # React entry point
│   ├── index.css       # Global styles & reset
│   └── App.jsx         # Main application (all components)
├── README.md
└── NOTES_AND_AI_USAGE.md

---

## Future Improvements

- Build out the Analytics dashboard
- Make the Upload Recording feature functional
- Connect a real transcription API (e.g. Whisper)
- Add backend persistence instead of in-memory state

---

## Assumptions

- This is a frontend-only prototype — transcription is simulated (no real backend/API calls)
- Mock data represents realistic Indian astrology consultation scenarios (Kundali, Guna Milan, Mangal Dosha, Dasha periods, etc.)
- Authentication/authorization is out of scope for this challenge
- Upload and Analytics are UI placeholders only and not functional in this version, due to time constraints

---

## Demo Video

See the attached demo video for a walkthrough of the working features.