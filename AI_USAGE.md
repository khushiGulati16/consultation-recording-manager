# AI Usage Declaration

This file documents how AI tools were used during the development of this project, in line with the assignment requirements for transparency.

---

## AI Tool Used

- **Claude (Anthropic)** — used as a coding assistant throughout the project

---

## How AI Was Used

1. **Project scaffolding** — Generated the initial Vite + React project structure (`package.json`, `vite.config.js`, `index.html`, entry files).
2. **Component development** — Drafted the core `App.jsx` component including:
   - Recording list & card UI
   - Search and filter logic
   - Upload modal with form validation
   - Transcript viewer modal with mock AI transcription flow
   - Analytics dashboard with topic/astrologer breakdowns
3. **Mock data generation** — Created realistic sample consultation data (Kundali analysis, marriage compatibility, health consultations) reflecting real astrology consultation terminology, to make the prototype feel authentic.
4. **Documentation** — Assisted in writing the README, project notes, and this AI usage file.
5. **Styling decisions** — Suggested color palette, layout, and component structure following a warm, editorial design aesthetic suitable for the astrology domain.

---

## What Was NOT AI-Generated / Requires Human Review

- **Architecture decisions** — The choice of tech stack (React + Vite, inline styling, in-memory state) was reviewed and confirmed to fit the 48-hour timeframe.
- **Real AI integration** — The "Generate Transcript with AI" feature is currently a **simulation** (setTimeout delay + static text). In a production version, this would call a real transcription API (e.g., OpenAI Whisper) — this integration has NOT been built and would require:
  - API key setup
  - Audio file processing pipeline
  - Error handling for failed transcriptions
- **Testing** — No automated tests were written; manual testing was performed in the browser.
- **Backend/Database** — No backend exists; this is a frontend-only prototype. All data is in-memory (React state) and resets on page refresh.

---

## Reasoning Behind AI Usage

Given the 48-hour timeframe and the goal stated in the assignment — *"to evaluate how candidates think, structure their code, make engineering decisions, and deliver a working solution"* — AI was used as a **productivity multiplier** for boilerplate and repetitive UI code, while architecture, feature scope, and design decisions were directed and reviewed by the candidate.

This declaration is provided in good faith and in accordance with the submission guidelines.
