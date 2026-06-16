# ADR-0003 — Frontend structure (two portals, one app)

**Status:** Proposed · **Date:** 2026-06-15

## Context

There are two distinct audiences — candidates and admins/operators — with different layouts and permissions but a shared design system, auth flow, and API client. We must decide whether to build one app with two areas or two separate apps, and how to organize code within it. Brief stack: React + Vite + TypeScript + Tailwind + shadcn/ui.

## Decision

Build **one Vite/React app** with two **route areas** (`/` candidate, `/admin`) behind shared infrastructure (design system, API client, auth context). The admin area is **lazy-loaded** and **role-gated**. Organize source by **area → feature**, mirroring backend bounded contexts, with a tiered component model (`ui` primitives → `shared` composites → feature components). Server state via TanStack Query; client state via Zustand; forms via React Hook Form + Zod.

## Consequences

**Positive:** no duplication of build, auth, API client, or component library; consistent UX across portals; code-splitting keeps the candidate bundle lean; the area/feature layout matches the backend so developers navigate both sides the same way.

**Negative / mitigations:** a compromised candidate session must never reach admin functionality — mitigated by server-side authorization on every admin endpoint (the client guard is convenience only, never the security boundary); a single app means a frontend deploy ships both portals — acceptable at this scale, and the areas could be split into separate apps later with no change to the backend.

**Rejected:** *Two separate frontend apps* — duplicates tooling and shared code with no current benefit; revisit only if the admin console grows into a distinct product. *Server-rendered admin via a different framework* — unnecessary divergence in skills and tooling.
