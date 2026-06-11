# Interview Copilot AI — Project Memory

AI SaaS that helps candidates prepare for interviews (resume parsing, JD analysis, company research, prep plans, STAR answers, AI mock interviews).

> Note: intended location is `.claude/CLAUDE.md`; placed at repo root because the session couldn't write into `.claude/`. Move it if you prefer.

## Stack (decided — see docs/ADR/)

- Backend: .NET 10 LTS, ABP Framework 10.x (open source), modular monolith — **no microservices**
- DB: PostgreSQL 17, one database, schema-per-module, EF Core (Npgsql), pgvector for embeddings
- Auth: OpenIddict (auth code + PKCE), JWT + rotating refresh, Google OAuth (MS/LinkedIn later)
- Frontend: Next.js/React/TS (separate); Admin: ABP dashboard
- AI: Claude + OpenAI + Gemini behind `IAIProvider` strategy in AI Core module — business modules NEVER reference LLM SDKs

## Modules (bounded contexts)

`Identity` · `Resume` (incl. CareerProfile) · `JobDescriptions` (incl. SkillGap) · `CompanyResearch` · `InterviewPreparation` (plans/questions/STAR/readiness) · `MockInterview` (SignalR streaming) · `AI` (providers/prompts/usage) · `Knowledge` (RAG/pgvector)

## Hard rules

1. Cross-module references: `*.Application.Contracts` only — never another module's Domain/EFCore. Enforced by ArchUnitNET tests.
2. All LLM calls go through AI Core (`IAIChatCompletion` / `IAIStructuredExtraction` / `IAIEmbeddingService`) with a **prompt template key** — no inline prompts in business code. Every call logs `AIUsageLog`.
3. Slow work (parsing, research, generation) = ABP background job + status field + event. Never block a request > 5 s.
4. Events (ETOs): ids + minimal facts; handlers idempotent; defined in publisher's Contracts project.
5. Every user-owned aggregate implements `IUserOwnedResource`; ownership check in addition to permissions (tests required — IDOR suite).
6. Tenancy: `IMultiTenant` on everything, but product is B2C host-only; `TenantId` ≠ user isolation.
7. Application layer: feature folders, command/query app services split, no MediatR (ADR-0005). Queries never mutate; commands never return entity graphs.
8. Tests: xUnit + FluentAssertions + NSubstitute; FakeAIProvider always (no real LLM calls in tests); Testcontainers PG for Knowledge/pgvector.

## Layout

- `backend/` ABP solution (src/ + src/modules/<module>/ 6-project shape + test/)
- `frontend/` Next.js
- `docs/architecture/` design docs (00-overview is the map) · `docs/ADR/` decisions · `docs/API/api-v1.md` endpoints · `docs/prompts/` template catalog
- UI reference: `docs/design/interview-prep-dashboard.html` (Folio dashboard — drives `/api/v1/dashboard/*` contracts)

## Status

Architecture designed & documented, **awaiting approval — do not generate implementation code until approved**. Next step after approval: Phase 0 of docs/architecture/09-roadmap.md.
