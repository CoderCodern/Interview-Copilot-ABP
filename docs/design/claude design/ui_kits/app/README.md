# App UI kit — Interview Copilot

A high-fidelity, interactive recreation of the product web app. Open `index.html`.

Screens (sidebar navigation routes between them):
- **Dashboard** — today's focus hero, readiness ring, stat strip, study tracks, upcoming sessions, recent notes.
- **Resume Analysis** — parsed skills (matched / gap), experience, career profile + strength readout.
- **Job & Skill Gap** — extracted requirements table, per-requirement match, overall match score.
- **Mock Interview** — live AI interview chat (recording state, typing indicator, composer).
- **AI Assistant** — assistant chat grounded in resume/notes, with suggestion pills.
- Company Research / Plan / Schedule / Progress / Profile — framed placeholders (built in the full product).

Files: `index.html` (wiring) · `app.css` (layout) · `Icons.jsx` (icon set → `window.ICIcons`) · `AppShell.jsx` · `Dashboard.jsx` · `ResumeAnalysis.jsx` · `JobAnalysis.jsx` · `Chat.jsx` · `app.jsx` (routing).

Composes design-system components from `window.InterviewCopilotDesignSystem_d59c8c` (NavItem, ReadinessRing, Meter, Button, Badge, Tag, Tabs, Avatar, IconButton, EmptyState). Toggle light/dark from the sidebar.
