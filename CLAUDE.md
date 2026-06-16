# Copilot Interview — Project Memory

AI SaaS that helps candidates prepare for interviews (resume parsing, JD analysis, prep plans, STAR answers, AI mock interviews, feedback).

> **Canonical architecture:** `docs/blueprint/` (Clean Architecture + .NET Aspire + Minimal APIs). The earlier ABP-based design is **superseded** and archived in `docs/legacy-abp/` — do not build from it.
>
> Note: intended location is `.claude/CLAUDE.md`; placed at repo root because the session couldn't write into `.claude/`. Move it if you prefer.

## Stack (decided — see docs/blueprint/)

- Backend: **.NET 10 LTS / C# 14**, **Clean Architecture (Jason Taylor)** as a modular monolith — **no microservices**. ASP.NET Core **Minimal APIs**.
- App layer: **Vertical Slice Architecture + CQRS** (commands mutate / queries project). Cross-cutting via pipeline behaviors. MediatR vs. lightweight dispatcher decided at Phase 0 (ADR-0006).
- Orchestration: **.NET Aspire 13.x** — `AppHost` (resource graph) + `ServiceDefaults` (OTel, health, resilience, discovery).
- DB: **PostgreSQL 17**, one database, schema-per-bounded-context, EF Core (Npgsql), **pgvector** for embeddings. **Redis** for cache / rate-limit / coordination.
- Auth: **JWT access + rotating refresh** (reuse detection), Google OAuth (MS/LinkedIn later), **policy-based RBAC** (`candidate`/`admin`) + resource-ownership checks.
- AI: Claude + OpenAI + Gemini behind `IAi*` abstractions in the `Ai` platform project — business code NEVER references LLM SDKs.
- Frontend: **React + Vite + TypeScript + Tailwind + shadcn/ui**, one app, two route areas (candidate `/`, admin `/admin`). (Existing repo frontend is Next.js — migrate-vs-retain is a Phase 0 decision.)
- Observability: **OpenTelemetry** (OTLP) + **Serilog**, wired in ServiceDefaults.

## Bounded contexts (see docs/blueprint/05-domain-modeling.md)

`Identity & Access` · `Resume` (incl. CareerProfile) · `JobDescription` (incl. SkillGap) · `InterviewPreparation` (plans/questions/STAR/readiness) · `InterviewSession` (SignalR streaming) · `Feedback` · `Billing & Subscription` · `AI Platform` (providers/registry/prompts/usage) · `Admin & Analytics`

## Hard rules

1. Dependency rule is sacred: Domain depends on nothing; Application → Domain (+ `Ai.Abstractions`) only; Infrastructure/Ai/Api point inward. Enforced by NetArchTest architecture tests.
2. Cross-context references by **id + Application contracts/events** only — never another context's Domain/EFCore.
3. All LLM calls go through the `Ai` platform (`IAiChatCompletion` / `IAiStructuredExtraction` / `IAiEmbeddingService`) with a **prompt template key** — no inline prompts in business code. Every call writes an `AiUsageRecord` (tokens + cost).
4. Slow work (parsing, analysis, generation) = **background job + status field + event**. Never block a request > 5 s.
5. Domain events: ids + minimal facts; handlers idempotent; dispatched post-persist by an EF interceptor.
6. Every user-owned aggregate implements `IUserOwnedResource`; ownership check **in addition to** role/policy (IDOR test suite required).
7. Tenancy: B2C, **per-user isolation via ownership** — no `TenantId` discriminator (deliberate non-goal; see blueprint 07).
8. Migrations applied as an explicit deploy step — never auto-migrate on startup in staging/prod.
9. Tests: xUnit + FluentAssertions + NSubstitute; **FakeAIProvider always** (no real LLM calls in tests); Testcontainers Postgres/Redis for integration.

## Layout (target — see docs/blueprint/02-repository-structure.md)

- `backend/` Clean Architecture solution: `src/{AppHost, ServiceDefaults, Domain, Application, Infrastructure, Ai, Api}` + `test/`
- `frontend/` React + Vite (area→feature, mirrors backend slices)
- `docs/blueprint/` canonical architecture + ADRs + roadmap · `docs/prompts/` template catalog · `docs/design/` UI references · `docs/legacy-abp/` superseded ABP design (reference only)
- `infra/` Docker/IaC · `.github/workflows/` CI/CD

## Status

Architecture designed & documented (`docs/blueprint/`), **awaiting approval — do not generate implementation code until approved**. Next step after approval: **Phase 0** of `docs/blueprint/11-implementation-roadmap.md`.
