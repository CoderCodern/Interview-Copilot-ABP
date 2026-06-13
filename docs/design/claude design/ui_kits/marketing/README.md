# Marketing UI kit — Interview Copilot

**Entry flow:** `index.html` (Landing) → `login.html` (Sign in) → `../app/index.html` (Dashboard). The landing CTAs and "Sign in" route to Login; Login's submit / Google / create-account all land on the Dashboard; the app sidebar's sign-out returns to Login.

Files in the flow:

- **`index.html` — the landing page (final design).** Editorial hero with a serif headline, blurred intro line, a **typewriter** line spoken by the Copilot, and fade-up **action pills**. The hero's right side is the **Interview readiness** preview card (readiness ring + behavioral / coding / system-design meters). Below: the six-step Workflow, the quote band, and a CTA + footer.
- **`login.html` — sign-in / register.** The mouse-scrub video fills the **whole page as a background** (under a warm scrim for legibility); the auth form floats **centered** over it on a **translucent frosted gradient card** (warm paper at <1 opacity + backdrop-blur — never solid white). Built from DS primitives (Input, Button, Checkbox, Google SSO). A link toggles between Sign in and Create account; submitting routes to the Dashboard.
- **`intro.html`** — the standalone verbatim "Mainframe®" hero spec (Helvetica Now + literal scrub-video), kept as a reference build.

Reuses `../app/Icons.jsx` and design-system components (Button, Input, Checkbox, ReadinessRing, Meter).

Files: `index.html` · `Landing.jsx` · `marketing.css` · `login.html` · `Login.jsx` · `login.css` · `intro.html`.

> The scrub video is loaded from the CloudFront URL in the original spec; a warm gradient fallback keeps both pages intact if that URL ever expires.
