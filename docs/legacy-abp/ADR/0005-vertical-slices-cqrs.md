# ADR-0005: Vertical slice feature folders + CQRS-lite (no MediatR)

**Status:** Proposed
**Date:** 2026-06-11
**Deciders:** Principal architect

## Context

The brief asks for DDD + vertical slice features + "CQRS where appropriate" on top of ABP's layered module template. ABP's idiom is application services + DTOs; adding MediatR-style in-process messaging would duplicate what ABP app services already provide (DI, authorization, validation, UoW, audit).

## Decision

Inside each module's Application layer, organize by **feature folder** (one folder per use case cluster), and split **command** app services from **query** app services:

```
Modules.Resume.Application/
  Features/
    UploadResume/        UploadResumeAppService.cs, UploadResumeDto.cs
    ParseResume/         ParseResumeAppService.cs (+ job handler)
    GetResumeDetails/    ResumeQueryAppService.cs, ResumeDetailsDto.cs
    CareerProfile/       CareerProfileAppService.cs (command + query split when it grows)
```

- **Commands** go through aggregates + domain services; one unit of work per command; raise local events.
- **Queries** bypass the domain: EF Core `IQueryable` projections straight to DTOs (read models), no aggregate hydration. Heavier dashboards may use hand-written SQL via Dapper later — same contract, no consumer change.
- No MediatR, no command/handler indirection: the app service method *is* the handler. Contracts (interfaces + DTOs) stay in `*.Application.Contracts` so other modules and the HttpApi layer bind to abstractions.

## Options Considered

**A. ABP app services with feature folders + command/query split (chosen)** — least ceremony, full ABP pipeline (authz, validation, UoW, audit) for free.
**B. MediatR everywhere** — popular, uniform; but duplicates ABP cross-cutting behaviors, two pipelines to reason about, license now commercial.
**C. Full CQRS with separate read store** — unjustified complexity at this scale.

## Consequences

- Easier: navigation by feature, focused tests per slice, queries stay fast and simple.
- Harder: team must resist putting business logic in query services (rule: queries never mutate, commands never return entity graphs).
- Revisit: if cross-cutting command behaviors proliferate, introduce a small decorator pipeline — not MediatR by default.

## Action Items

1. [ ] Solution template includes Features/ folder convention
2. [ ] Code review checklist: command/query separation rules
