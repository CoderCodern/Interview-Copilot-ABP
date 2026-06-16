# 5. Frontend Architecture

One React application (Vite + TypeScript + Tailwind + shadcn/ui) serves **both portals** as separate route areas behind a shared design system. Keeping them in one app avoids duplicating the build pipeline, auth client, API layer, and component library for what is, today, a small surface. Code-splitting keeps the admin bundle out of the candidate's download.

> Note on existing code: the repo currently has a Next.js frontend. This blueprint targets the brief's stack (React + Vite). Migrating Next.js → Vite is a Phase 0/2 decision; if Next.js is retained, the same area/feature structure applies with Next's app-router replacing React Router.

## 5.1 The two portals

**Candidate Portal** (`/`) is the product: Dashboard, Resume Upload + Analysis, Job Description Upload + Analysis, Interview Practice, live Interview Session, AI Feedback, and History. It is optimized for a focused, low-friction flow and is the bundle most users download.

**Admin Portal** (`/admin`) is the operator console: Dashboard, User Management, Subscription Management, AI Model Management, Token Usage & Cost Monitoring, Prompt Management, Feature Flags, and Analytics. It is lazy-loaded, gated behind an `admin` role, and uses denser, table-and-chart-heavy layouts.

Both share the same design system (the warm-editorial tokens already in `docs/design/`), the same API client, and the same auth context — they differ in routes, navigation shell, and role gating.

## 5.2 Routing

A single router (React Router) with two top-level **area layouts**: a candidate shell and an admin shell, each with its own navigation chrome. Routes are organized by area then feature (`routes/candidate/*`, `routes/admin/*`). The admin area is wrapped in a route guard that checks the `admin` role from the auth context and redirects unauthorized users. Each portal's routes are lazy-loaded so the initial candidate bundle stays small. Route-level loaders/suspense boundaries handle data fetching and skeleton states.

## 5.3 State management

State is split by lifetime and ownership:

- **Server state** (anything fetched from the API) is owned by **TanStack Query** — caching, background refetch, optimistic updates, and request dedup. This is the bulk of app state and should not be copied into a global store.
- **Client/UI state** (auth/session, theme, transient interview-session UI, multi-step form drafts) lives in lightweight **Zustand** stores or local component state. Reach for a store only when state is genuinely shared across distant components.
- **Form state** uses React Hook Form + Zod, with the Zod schemas mirroring the backend's FluentValidation rules so the client gives fast feedback and the server stays authoritative.

The interview session is the one place with real-time state: it consumes a **SignalR** (WebSocket) stream for token-by-token AI responses, kept in component/session scope, not global.

## 5.4 API layer

A single typed client wraps all backend access. The backend publishes an **OpenAPI document**; a codegen step (`tools/`) generates TypeScript types and a fetch client into `src/types` / `src/lib`, so the contract is the source of truth and a breaking change surfaces as a TS compile error. The client centralizes base URL (from env / Aspire service discovery in dev), bearer-token attachment, **silent refresh-token rotation** on 401, and uniform error parsing of ProblemDetails into typed errors. Feature code calls thin per-feature hooks (e.g. `useResumeAnalysis`) built on TanStack Query over this client — components never call `fetch` directly.

## 5.5 Shared components & design system

The component layer is tiered: **`components/ui`** holds shadcn/ui primitives (button, dialog, table, toast) styled by the design tokens; **`components/shared`** holds cross-feature composites (page header, data table with server pagination, async/empty/error states, file dropzone); and **feature folders** hold components used by exactly one feature. The design system is driven by the existing warm-editorial tokens (`docs/design/`) expressed as Tailwind theme + CSS variables, giving both portals a consistent look while allowing the admin area its denser variants. Accessibility (focus management, keyboard nav, ARIA) rides on shadcn/Radix primitives. A shared error boundary and a global toast/notification surface handle failures consistently.
