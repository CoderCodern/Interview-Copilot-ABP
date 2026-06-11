# Development Roadmap

Phases ship vertical slices end-to-end (API + jobs + tests); each phase ends with a usable increment. Estimates assume 2–3 backend engineers. Frontend proceeds in parallel against the API doc + generated OpenAPI.

## Phase 0 — Foundation (week 1–2)

- Solution scaffold per [01-solution-structure.md](01-solution-structure.md); ABP host, PostgreSQL, migrations, CI (build + test + architecture rules).
- Base entity classes (`IMultiTenant`, `IUserOwnedResource`), permission scaffolding, error model, API versioning, Swagger.
- Identity: email/password + Google OAuth, OpenIddict auth-code+PKCE for the Next.js client, refresh rotation. Admin portal up with ABP identity management.
- **AI Core walking skeleton:** contracts, ClaudeProvider, PromptTemplate registry (seeded), usage logging, FakeAIProvider + test kit.
- Exit: login from Next.js works; one demo prompt round-trip through AI Core with a usage log row; CI green.

## Phase 1 — Resume & profile (week 3–5)

- Resume module: upload (blob storing), versions, `ResumeParsingJob` with structured extraction, skills/experiences/educations, career profile merge.
- Events wired (`ResumeVersionCreatedEto`, `ResumeParsedEto`); status polling UX contract.
- OpenAIProvider added; extraction fallback chain live.
- Exit: upload → parsed profile visible; re-upload versions safe; IDOR suite for resume endpoints.

## Phase 2 — Job descriptions & skill gap (week 5–7)

- JD module: create (text/file/URL), `JdAnalysisJob`, requirements; skill-gap analysis vs career profile (snapshot semantics); `SkillMatcher` deterministic pass.
- Company module (minimal): canonical registry + manual company cards (research deferred to phase 5 — plans/questions only need the name + JD).
- Exit: JD in → requirements + match score + gaps out.

## Phase 3 — Interview preparation (week 7–10)

- Prep module: question generation (categories/difficulty), STAR answers (versioned, user edits protected), tips; `PlanGenerationJob` + `PlanScheduler` (calendar-aware items); progress tracking, `StudyActivity`, `ReadinessCalculator` + snapshots.
- **Dashboard endpoints** (`/dashboard/summary`, upcoming, recent notes) — unblocks the Folio home screen.
- GeminiProvider added (cheap-class routing for tips/quick tasks).
- Exit: JD → full prep plan with scheduled items; dashboard summary returns real data.

## Phase 4 — Mock interviews (week 10–13)

- Mock module: session aggregate + state machine, SignalR hub with token streaming, `SessionConductor` (plan-driven question selection, persona), per-turn capture, `FeedbackGenerationJob` with rubric scoring; session history APIs.
- `MockSessionCompletedEto` → study activity + readiness updates; usage-log partitioning + daily rollups.
- Exit: complete a streamed mock interview and receive structured feedback; readiness ring moves.

## Phase 5 — Knowledge/RAG & company intelligence (week 13–16)

- Knowledge module: pgvector enablement, chunker, `EmbeddingGenerationJob`, ingestion subscriptions (resume/JD), `IRagContextProvider`, semantic search API, re-index machinery.
- RAG wired into STAR generation and mock interviewer context; quality eval harness (golden questions per fixture corpus).
- Company Intelligence: `CompanyResearchJob` + insights + staleness/dedup; ingestion into knowledge; research surfaces in plans.
- Exit: STAR answers cite the user's actual experience; company insights appear in prep plans.

## Phase 6 — Hardening & launch readiness (week 16–18)

- Quotas/plans via ABP Features (free vs pro limits), rate limiting tune, daily budget breaker.
- Notifications hub (replace polling where it hurts), email digests, AV scanning, GDPR export/erase end-to-end drill.
- Load test (50 concurrent mock sessions), Redis backplane if >1 node, observability dashboards, runbooks.
- Decision gates: ABP 11/.NET 11 evaluation; billing build vs ABP PRO; voice-mode spike for v2.

## Dependency-driven ordering rationale

AI Core precedes everything (all modules consume it). Resume precedes JD (gap needs profile). JD precedes Prep (plans need requirements). Prep precedes Mock (sessions draw on question sets) — though Mock can run ad-hoc sessions if Prep slips. Knowledge lands after the content producers exist, deliberately late: RAG without corpus is scaffolding. Company research is split (registry early, AI research late) to keep phase 2 thin.

## Cross-phase invariants

Every phase: migrations additive; architecture tests green; IDOR suite extended to new endpoints; prompt templates seeded + snapshot-tested; usage logging verified for each new AI feature.
