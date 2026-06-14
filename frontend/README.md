# Interview Copilot — Frontend

The web front end for Interview Copilot, a warm, editorial AI career companion. This is a **UI-only** build: every screen is fully designed and interactive, but nothing is wired to the backend yet (data is in-component mock data, auth is simulated). The backend (.NET 10 / ABP) is handled separately.

Built with **Next.js 14 (App Router) + TypeScript**, faithfully porting the project's design system (`docs/design/claude design`) — warm paper/espresso palette, Newsreader serif over Inter, clay accent, layered warm shadows, light/dark themes.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

Other scripts: `npm run lint` (ESLint), `npm run typecheck` (`tsc --noEmit`).

> Note: webfonts load from Google Fonts and the login page uses a hosted background video, so the first load looks best with network access. The UI renders fine offline (system-font and gradient fallbacks).

## What's included

Marketing + auth:

- `/` — editorial landing page (typewriter hero, workflow, quote band, CTA).
- `/login` — sign in / register, with the mouse-scrub video background. Submitting (or "Continue with Google") routes to the dashboard.

The product app (left-sidebar shell, "New prep" button, light/dark toggle, first-run onboarding dialog):

- `/dashboard` — today's focus hero, readiness ring, stat strip, study tracks, sessions, notes.
- `/resume` — parsed resume: matched/gap skills, experience, education, career profile.
- `/jobs` — JD → skill-gap analysis with three switchable views (match map / requirements table / coverage) and a score rail. "Add job" launches the onboarding flow.
- `/company` — company research: culture, facts, interview-loop stages, what they'll probe, recent news.
- `/plan` — day-by-day preparation timeline with projected readiness and time allocation.
- `/schedule` — week calendar of study blocks and mock sessions, with an "up next" rail.
- `/mock` — live AI mock interview chat (recording state, typing indicator).
- `/assistant` — AI assistant chat grounded in resume/notes, with suggestion pills.
- `/knowledge` — question bank, notes and flashcards with confidence tracking and a review-status rail.
- `/progress` — readiness trend, study-time chart, per-track breakdown and mock-score history.
- `/profile` — account details, target role, notification switches and connected accounts.

The onboarding flow (resume → job description → generate plan) is a 3-step dialog reachable from "New prep" in the sidebar or "Add job" on the Jobs screen; finishing routes to the plan.

## Project layout

```
src/
  app/
    layout.tsx              root layout (+ no-flash theme script)
    page.tsx                "/" landing
    login/page.tsx          "/login"
    (app)/
      layout.tsx            authenticated shell (AppShell)
      dashboard/ resume/ jobs/ mock/ assistant/
      company/ plan/ schedule/ progress/ profile/
  components/
    ds/                     design-system primitives (Button, Badge, Tag,
                            Card, Meter, ReadinessRing, Tabs, Input, …)
    app/                    AppShell + product screens
    marketing/              Landing + Login
    icons.tsx               Lucide-style icon set
  styles/
    globals.css             design tokens + base layer (linked everywhere)
    app.css                 app shell + screen layout
    marketing.css           landing page
    login.css               auth page
  lib/theme.ts              light/dark theme helpers
```

## Theming

Light is the warm paper default; dark is a warm espresso theme. The toggle lives in the sidebar ("Evening mode" / "Morning mode") and persists to `localStorage`. All colors come from semantic CSS custom properties defined in `globals.css` — components reference `var(--surface)`, `var(--text)`, `var(--accent)`, etc., never hard-coded values.

## Wiring up the backend later

Screens currently use static mock data defined inside each component and a simulated auth flow. To connect the real API (`/api/v1/*` per `docs/API/api-v1.md`), replace the in-component constants with data fetching and swap the simulated login in `components/marketing/Login.tsx` for the real auth call.
