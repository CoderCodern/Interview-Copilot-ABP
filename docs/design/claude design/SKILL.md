---
name: interview-copilot-design
description: Use this skill to generate well-branded interfaces and assets for Interview Copilot — a premium, warm-minimalist AI career companion — for production or throwaway prototypes/mocks. Contains essential design guidelines, color & type tokens, fonts, iconography, reusable React components, and full UI-kit screens (app + marketing) for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill first — it is the design guide and manifest. Then explore the other files as needed.

**Foundations:** `styles.css` is the single stylesheet to link; it imports everything in `tokens/`. Use the CSS custom properties (semantic tokens like `--surface`, `--text`, `--accent`, `--shadow-md`) rather than hard-coded values. Dark mode is `data-theme="dark"` on `<html>`.

**Components:** React primitives live in `components/<group>/`. They're bundled to `window.InterviewCopilotDesignSystem_d59c8c` by the compiler (`_ds_bundle.js`). See each `*.prompt.md` for usage. Don't re-implement them — compose them.

**UI kits:** `ui_kits/app/` (product screens) and `ui_kits/marketing/` (landing) are full recreations to copy patterns from. `ui_kits/app/Icons.jsx` is the Lucide-style icon set (`window.ICIcons`).

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few focused questions (surface, light/dark, which screens, variations), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Hold the line on the brand:** warm off-white paper / espresso dark, a single clay accent, Newsreader serif over Inter, sentence case, no emoji, roomy editorial layouts, warm layered shadows with a top inset highlight, calm settle-easing motion. Avoid: purple/blue gradients, cool grays, Title Case, emoji, cramped density.
