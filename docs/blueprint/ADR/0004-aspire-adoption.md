# ADR-0004 — .NET Aspire adoption

**Status:** Proposed · **Date:** 2026-06-15

## Context

The system has several runtime dependencies (Postgres, Redis, the API, the frontend, observability). A solo developer needs them to come up reliably with one command, with telemetry and health wired by default, and a clear path to production deployment. Options: hand-maintained docker-compose + README, or **.NET Aspire**.

## Decision

Adopt **.NET Aspire 13.x** (aligned with .NET 10 LTS) for local orchestration and as the composition source of truth. An `AppHost` project declares the resource graph (Api, Postgres+pgvector, Redis, frontend, OTLP) and injects connection strings/service discovery automatically. A `ServiceDefaults` project standardizes OpenTelemetry, health checks, and HTTP resilience across all services. The Aspire dashboard is the local observability surface. For production, use `aspire publish` to generate deployment manifests, with a documented fallback to plain container manifests.

## Consequences

**Positive:** one-command local startup (`aspire run`) with wiring, dashboards, and health out of the box; consistent telemetry from the first commit; far lower "works on my machine" risk; reproducible by a future hire; an opinionated, supported path from dev to deploy.

**Negative / mitigations:** Aspire is young and evolves quickly across minor versions — mitigated by pinning Aspire/workload versions, keeping AppHost thin and declarative, and confining Aspire-specific wiring to ServiceDefaults so upgrades are contained. Production orchestration via Aspire is less battle-tested than bare Kubernetes — mitigated by treating Aspire's output as standard containers, so we can deploy them anywhere if needed.

**Rejected:** *docker-compose + scripts* — works but pushes telemetry/health/discovery wiring onto the developer and drifts from documentation over time; Aspire's dev-experience and observability defaults are a decisive win for a small team.
