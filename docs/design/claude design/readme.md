# Interview Copilot — Design System

A warm, editorial design system for **Interview Copilot**, a premium AI career companion that helps professionals prepare for interviews with confidence. The system combines resume intelligence, company research, job-description analysis, interview coaching, and AI-powered mock interviews into one calm workflow.

> The feeling we design for: *"I am preparing for something important — and this tool is helping me succeed."*

---

## Sources this system was built from

This design system was derived from the product's own materials. If you have access, explore them to go deeper:

- **Codebase (read-only):** `Interview Copilot/` — architecture & product docs.
  - `docs/design/interview-prep-dashboard.html` — the **canonical visual reference** ("Folio" warm-editorial dashboard). The token palette, type pairing, shadow system, and component patterns here are lifted directly from it.
  - `docs/architecture/00-overview.md` — system summary, the nine product surfaces, and primary flows.
  - `docs/API/api-v1.md` — REST endpoint catalog; defines what each screen shows (`/dashboard/summary`, resume parsing, JD skill-gap, mock-interview feedback, etc.).
  - `CLAUDE.md` — product memory: modules (Resume, JobDescriptions, CompanyResearch, InterviewPreparation, MockInterview, AI, Knowledge).
- **GitHub:** [`CoderCodern/Interview-Copilot-ABP`](https://github.com/CoderCodern/Interview-Copilot-ABP) — the .NET 10 / ABP modular-monolith backend. Browse it for the domain model, module boundaries, and API contracts behind these screens.

**Brand naming note:** the reference dashboard is internally codenamed "Folio"; the product (and this system) is **Interview Copilot**. We kept the warm-editorial *aesthetic* of Folio and branded everything as Interview Copilot.

---

## Brand personality

Intelligent · Calm · Professional · Modern · Trustworthy · Career-focused.

The product should feel like a quiet, premium notebook crossed with an enterprise dashboard — closer to Linear, Notion, Stripe Dashboard and Claude than to a loud consumer app. Spacious, confident, unhurried.

---

## CONTENT FUNDAMENTALS

How Interview Copilot writes. Copy is **warm, plain, and reassuring** — it speaks like a calm, expert coach, never a hype machine.

- **Voice & person:** Second person ("you", "your on-site"). The AI refers to itself as "the Copilot" or "I" when in conversation ("I've read your resume…"). Encouraging but never gushing.
- **Tone:** Steady and grounding. It acknowledges pressure and reduces it ("Four days until your on-site. Today is a deep-work day."). It states facts and next actions, not adjectives.
- **Casing:** Sentence case everywhere — headings, buttons, nav. The only UPPERCASE is small tracked eyebrows / section labels ("TODAY'S FOCUS", "WORKSPACE"). Never Title Case headlines.
- **Numbers & specifics:** Concrete and personal — "142 / 210 questions", "+6% since last week", "Day 9 of 14". Progress is always real and attributable, never vanity. Tabular numerals.
- **Headlines:** Editorial, often with one *italic serif* emphasis word ("Prepare for something *important*.", "Good morning, *Coder*."). Short.
- **Microcopy:** Direct verbs — "Resume session", "Review notes", "Generate prep plan", "Rewrite with AI". CTAs describe the outcome.
- **Empty states:** Calm and instructive, not cute — a serif line + one sentence of guidance + one action ("No resume yet · Upload a resume and we'll extract your skills, experience and a career profile.").
- **Emoji:** **None.** A single ✓ check glyph appears as a status mark; otherwise icons carry meaning, never emoji.
- **Editorial flourish:** A quiet italic-serif footer line is part of the voice ("*Slow is smooth, smooth is fast.*").

Example copy block (dashboard hero):
> **Today's focus** — System design: payment ledgers & idempotent retries.
> *You marked consistency trade-offs as shaky on Monday. Today pairs two ledger design exercises with your annotated notes.*

---

## VISUAL FOUNDATIONS

The system is **warm minimalism**: soft off-white paper in light mode, espresso/mocha/charcoal-brown in dark mode, a single clay accent, editorial serif display over a precise sans.

### Color
- **Light ground** is the signature `#FAF9F6` paper (`--paper-100`); surfaces step *up* in warmth (`--paper-50` cards, `--paper-0` raised). Borders are warm beige (`--paper-300/400`), never cool gray.
- **Dark mode is warm**, not black — espresso/mocha browns (`--espresso-700` ground → `--espresso-500` raised). Shadows deepen; the inset highlight nearly disappears.
- **One accent: clay** (warm taupe/camel). `--clay-500` in light, lifts to `--clay-400/300` in dark. Used sparingly — primary buttons, active states, edge markers, ring fills, eyebrows. Accent washes are very low alpha (`--accent-soft` 10%, `--accent-softer` 6%).
- **Status hues are muted and warm-leaning** — sage green, amber, terracotta red, slate blue. Surfaces use the tints, text uses the 600.
- Source of truth: `tokens/colors.css` (base ramps + semantic aliases). Components consume **semantic** tokens only.

### Typography
- **Newsreader** (serif, optical sizing) for display, page/section/panel headings, stat values, and big numbers — weights 400/500/600 + italic. Italic is an *editorial accent* (one emphasized word, the brand mark, footer quotes).
- **Inter** for all UI text — nav, body, meta, tables, buttons. Weights 400–650; `550` is the workhorse for active labels.
- **JetBrains Mono** for code/inline-technical only; otherwise numerals are tabular Inter/Newsreader.
- Tight tracking on large serif (`-0.015em`); wide tracking on uppercase eyebrows (`0.09–0.1em`).

### Spacing & layout
- 4px-base scale; layouts are **roomy and editorial** — generous padding (cards 20px, main 34–44px), wide max-widths (~1160px), real breathing room. Density is calm, not cramped.
- Fixed sidebar (256px) + scrolling main. Topbar uses an eyebrow + serif H1 + sub.
- Strong use of CSS grid/flex with `gap`. Two-column "content + aside" and "1.4fr / 1fr" panel splits recur.

### Surfaces, borders, radii, shadows
- **Cards:** warm surface, 1px warm border, radius `--radius-xl` (14px), `--shadow-sm` + a top **inset highlight** (`--inset-line`) so they read as lit paper. Larger containers go 16px; pills are fully round.
- **Shadows are warm** (tinted toward espresso `56,46,36`, never pure black) and layered (2–3 stacked offsets). Elevation: xs → sm → md → lg.
- **Borders** are hairline and warm; `--border-strong` for inputs/emphasis.

### Backgrounds & texture
- A barely-there **fractal-noise paper grain** overlays the page (fixed, ~0.5 opacity, warm-tinted) so surfaces never feel flat. Apply via the `.ic-grain` helper.
- Hero areas add soft **radial accent glows** (very low alpha clay) — no harsh gradients, no purple, no mesh.

### Motion
- Signature easing `--ease-out` `cubic-bezier(0.22,1,0.36,1)` — a confident settle. Durations 0.15s (hover) / 0.2s (cards) / 0.35s (theme) / 1s (ring).
- **Hover:** cards lift `translateY(-2/-3px)` with a stronger shadow + border; buttons lift 1px; nav rows warm their background. CTAs reveal (`→` fades in).
- **Press:** subtle scale-down (`scale(0.99)`) + 1px translate — tactile, never bouncy.
- Loading: shimmer skeletons + a quiet clay spinner; chat shows a 3-dot typing indicator. Reduced-motion friendly (animations are decorative).
- Hero typewriter + fade-up action pills are reserved for the **marketing landing** entry moment.

### Transparency & blur
- Used sparingly and purposefully: the sticky nav frosts (`backdrop-blur`) once scrolled; dialog scrims are a warm 34% espresso wash with a light blur. No glassmorphism elsewhere.

### Imagery vibe
- The product is **type- and data-forward** — there's little photography. When imagery appears it should be warm, calm, and editorial (paper, desks, soft light), never cold stock. Avoid illustration unless commissioned to match the warmth.

---

## ICONOGRAPHY

- **Style:** Lucide-style **line icons** — 24px viewBox, ~1.8 stroke, round caps/joins, `currentColor`. They sit quietly; the active nav icon tints clay.
- **Source:** The product codebase hand-authors inline `<svg>` glyphs (no icon font, no sprite, no raster icons). This system mirrors that: `ui_kits/app/Icons.jsx` is a small React set (`window.ICIcons`) authored to match — reusing the reference dashboard's own paths where they existed (home, calendar, layers, clock, chevrons…) and adding Lucide-equivalent glyphs for the rest.
- **Substitution flag:** No icon binaries existed in the codebase to copy, so new glyphs were drawn to Lucide proportions. If you prefer the real [Lucide](https://lucide.dev) set, it's a drop-in CDN match (same stroke/round style) — swap `ICIcons` for `lucide` and the look is preserved.
- **Status mark:** a single ✓ check glyph indicates "done/strong". **No emoji** anywhere.
- **The brand mark** is not an icon asset — it's a CSS construct: a clay gradient tile with serif initials "i*c*" (italic second letter). See `guidelines/brand-logo.card.html`.

---

## VISUAL ASSETS

The reference is CSS/SVG-driven — there were **no logo files, illustrations, or photographs** in the codebase to copy. Accordingly:
- The **logo/mark** is reproduced as a CSS lockup (gradient tile + serif initials) in `guidelines/brand-logo.card.html`, in light and dark.
- The **paper grain** is an inline SVG data-URI (in `tokens/base.css`), not an image file.
- Icons are inline SVG (`ui_kits/app/Icons.jsx`).

If brand photography/illustration is commissioned later, drop it in `assets/` and keep the warm, calm, paper-lit direction described above.

---

## INDEX / MANIFEST

**Foundations**
- `styles.css` — the single entry point consumers link (import manifest only).
- `tokens/fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `base.css` — fonts, color ramps + semantic aliases, type scale, spacing/radii/shadows/motion, and the opt-in base layer (paper grain, focus rings).

**Foundation cards** (`guidelines/`) — render in the Design System tab:
- Colors: accent ramp, paper neutrals, espresso neutrals, status. Type: serif, sans, scale. Spacing: scale, radii, elevation. Brand: logo & mark.

**Components** (`components/`) — React primitives, `window.InterviewCopilotDesignSystem_d59c8c`:
- `core/` — **Button**, IconButton, Badge, Tag, Avatar, Card
- `forms/` — **Input**, Textarea, Select, Checkbox, Switch
- `feedback/` — **ReadinessRing**, Meter, Spinner, Skeleton, EmptyState
- `navigation/` — NavItem, Tabs
- `overlay/` — Dialog, Toast

**UI kits** (`ui_kits/`)
- `app/` — the product web app: **Dashboard, Resume Analysis, Job & Skill-Gap, Mock Interview, AI Assistant**, plus framed placeholders for Company Research / Plan / Schedule / Progress / Profile. Interactive screen routing. Open `app/index.html`.
- `marketing/` — the editorial landing page with the immersive typewriter hero + workflow. Open `marketing/index.html`.

**Other**
- `SKILL.md` — makes this folder usable as a downloadable Agent Skill.

> **Compiler note:** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` are generated automatically — do not edit. Component cards and UI-kit screens load the bundle and read components from `window.InterviewCopilotDesignSystem_d59c8c`.
