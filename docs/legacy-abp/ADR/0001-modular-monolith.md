# ADR-0001: Modular monolith on ABP, single PostgreSQL database

**Status:** Proposed
**Date:** 2026-06-11
**Deciders:** Product owner, principal architect

## Context

Interview Copilot AI is a new B2C product built by a small team. Requirements span eight functional areas (resume, JD, company research, preparation, mock interview, AI core, knowledge/RAG, identity). We need fast iteration, strong consistency for user-facing CRUD, and a path to scale without committing to distributed-systems operations on day one.

## Decision

Build a single deployable ABP layered monolith composed of isolated DDD modules. One PostgreSQL database, one schema per module, one `DbContext` per module. Modules communicate only via application contracts (sync) and ABP's local distributed event bus (async). Long-running work runs in ABP background jobs inside the same process.

## Options Considered

### Option A: Modular monolith (chosen)

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low–Med |
| Cost | Low (one runtime, one DB) |
| Scalability | Vertical + stateless horizontal scale-out; fine to ~10× current targets |
| Team familiarity | High (standard ABP solution shape) |

**Pros:** single transaction boundary inside a module; trivial local dev; refactoring across modules is a compile-time operation; ABP gives auditing, permissions, jobs, event bus out of the box.
**Cons:** one bad module can degrade the process; deploys are all-or-nothing; discipline required to keep module boundaries honest.

### Option B: Microservices per context

| Dimension | Assessment |
|-----------|------------|
| Complexity | High (broker, gateway, service discovery, distributed tracing) |
| Cost | High |
| Scalability | Excellent but unneeded at current scale |
| Team familiarity | Medium |

**Pros:** independent deploy/scale.
**Cons:** explicitly excluded by requirements; eventual consistency everywhere; 3–5× operational surface for a pre-product-market-fit app.

### Option C: Plain layered monolith (no module isolation)

**Pros:** simplest possible start.
**Cons:** boundaries erode fast; AI/RAG concerns leak into business code; extraction later becomes a rewrite.

## Trade-off Analysis

The decisive forces are team size, time to market, and the requirement to avoid overengineering. The modular monolith keeps microservice *option value* (per-module schemas, contract-only coupling, event bus abstraction that can swap to a real broker) at near-monolith cost. Enforcement is the known risk; we mitigate with ArchUnitNET dependency tests in CI rather than convention alone.

## Consequences

- Easier: local development, transactions, refactoring, testing, onboarding.
- Harder: must police module boundaries; noisy-neighbor risk inside one process (mitigate: job throttling, AI call timeouts).
- Revisit: extraction triggers listed in [00-overview.md §7](../architecture/00-overview.md).

## Action Items

1. [ ] Scaffold solution per docs/architecture/01-solution-structure.md
2. [ ] Add ArchUnitNET boundary tests to CI before the second module lands
