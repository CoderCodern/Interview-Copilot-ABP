# Copilot Interview — Architecture Blueprint

> Status: **Proposed / awaiting approval.** No implementation code is to be written until this blueprint is approved and Phase 0 begins.
>
> Stack basis: Jason Taylor Clean Architecture + .NET Aspire + ASP.NET Core Minimal APIs + CQRS/Vertical Slice + PostgreSQL + Redis. This supersedes the earlier ABP-based design, now archived in `docs/legacy-abp/` (kept for reference).
>
> Verified versions (June 2026): **.NET 10 LTS** (supported to Nov 2028), **C# 14**, **.NET Aspire 13.4**.

This blueprint is a principal-architect handoff: a development team should be able to implement from it without further design work. It deliberately contains **no implementation code** — no controllers, entities, migrations, or React components — only architecture, structure, decisions, and roadmap.

## Reading order

| # | Document | Covers |
|---|----------|--------|
| 1 | [01-architecture-vision.md](01-architecture-vision.md) | Why this architecture, benefits, tradeoffs, risks |
| 2 | [ADR/](ADR/) | 10 Architecture Decision Records |
| 3 | [02-repository-structure.md](02-repository-structure.md) | Complete monorepo folder tree |
| 4 | [03-backend-architecture.md](03-backend-architecture.md) | AppHost, ServiceDefaults, Api, Application, Domain, Infrastructure |
| 5 | [04-frontend-architecture.md](04-frontend-architecture.md) | Candidate + Admin portals, routing, state, API layer, design system |
| 6 | [05-domain-modeling.md](05-domain-modeling.md) | Bounded contexts, aggregates, entities, value objects |
| 7 | [06-database-strategy.md](06-database-strategy.md) | Main DB, read models, audit, soft delete, tenancy |
| 8 | [07-ai-platform-architecture.md](07-ai-platform-architecture.md) | Provider abstraction, model registry, prompts, token/cost tracking |
| 9 | [08-security-architecture.md](08-security-architecture.md) | AuthN, AuthZ, secrets, API security, audit logging |
| 10 | [09-observability.md](09-observability.md) | OpenTelemetry, logging, metrics, tracing, health checks |
| 11 | [10-devops-deployment.md](10-devops-deployment.md) | Local/dev/staging/prod, Docker, Aspire, CI/CD |
| 12 | [11-implementation-roadmap.md](11-implementation-roadmap.md) | Phases 0–8 with objectives, deliverables, dependencies, risks |
| 13 | [12-tech-debt-prevention.md](12-tech-debt-prevention.md) | Anti-patterns and pitfalls to avoid |

## ADR index

| ADR | Title |
|-----|-------|
| [0001](ADR/0001-monorepo-strategy.md) | Monorepo strategy |
| [0002](ADR/0002-backend-structure.md) | Backend structure (Clean Architecture) |
| [0003](ADR/0003-frontend-structure.md) | Frontend structure (two portals, one app) |
| [0004](ADR/0004-aspire-adoption.md) | .NET Aspire adoption |
| [0005](ADR/0005-minimal-apis.md) | Minimal APIs over controllers |
| [0006](ADR/0006-vertical-slice-architecture.md) | Vertical Slice Architecture + CQRS |
| [0007](ADR/0007-database-strategy.md) | Database strategy (PostgreSQL) |
| [0008](ADR/0008-ai-integration-strategy.md) | AI integration strategy |
| [0009](ADR/0009-authentication-strategy.md) | Authentication & authorization |
| [0010](ADR/0010-observability-strategy.md) | Observability strategy |

## Guiding principles

1. **Build fast, stay maintainable.** Optimize for a solo developer's velocity today while keeping the seams that let a team and scale arrive later without a rewrite.
2. **Modular monolith, not microservices.** One deployable backend with strict internal boundaries. Extract services only when a measured bottleneck justifies it.
3. **The dependency rule is sacred.** Domain depends on nothing; everything points inward.
4. **Vertical slices for features, layers for boundaries.** Features are organized by use case; the Clean Architecture layers govern allowed dependencies.
5. **AI is a platform concern.** Business code never references an LLM SDK directly — only the AI abstraction.
6. **Observability and security are foundational**, not Phase 8 bolt-ons. ServiceDefaults wires telemetry from day one.
