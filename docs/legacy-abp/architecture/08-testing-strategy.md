# Testing Strategy

Stack: **xUnit** + **FluentAssertions** + **NSubstitute**. ABP test modules for module-level tests; **Testcontainers (PostgreSQL + pgvector)** where the real database matters; **FakeAIProvider** everywhere — no test ever calls a real LLM.

## 1. Test pyramid & project structure

```
test/
├── InterviewCopilot.TestBase/                  # shared kit
│     ABP test module bootstrap, FakeAIProvider (canned + scriptable),
│     test data builders (ResumeBuilder, JdBuilder, SessionBuilder),
│     FakeClock, snapshot helpers
├── InterviewCopilot.Architecture.Tests/        # ArchUnitNET rules (fast, no DB)
├── modules/
│   ├── Resume.Domain.Tests/                    # pure unit
│   ├── Resume.Application.Tests/               # module tests (ABP DI + SQLite or Testcontainers)
│   ├── JobDescriptions.Domain.Tests/ + .Application.Tests/
│   ├── CompanyResearch.Domain.Tests/ + .Application.Tests/
│   ├── InterviewPreparation.Domain.Tests/ + .Application.Tests/
│   ├── MockInterview.Domain.Tests/ + .Application.Tests/
│   ├── AI.Application.Tests/                   # router, renderer, pipeline, usage capture
│   └── Knowledge.Application.Tests/            # Testcontainers ONLY (pgvector is the point)
└── InterviewCopilot.HttpApi.Host.Tests/        # end-to-end API (Testcontainers PG, WebApplicationFactory)
```

| Layer | Scope | DB | Speed budget |
|---|---|---|---|
| Domain unit | aggregates, VOs, domain services, state machines | none | ms; hundreds of tests |
| Module (application) | app service command/query through real ABP pipeline (authz, validation, UoW) | SQLite in-memory by default; **Testcontainers PG for modules using jsonb/vector specifics** (Knowledge, AI usage queries, dashboard rollups) | < 5 s/module suite startup |
| Architecture | project-reference + namespace dependency rules | none | seconds |
| E2E API | auth flow, happy paths per module, SignalR session round-trip | Testcontainers PG + pgvector image | minutes; runs in CI gate |

## 2. What must be covered (priority order)

1. **State machines & invariants (domain unit):** session `Created→InProgress→Completed/Abandoned` (no turns after terminal; contiguous order); resume version limits + parse-apply atomicity; STAR answer versioning (AI never overwrites user edit); plan item status → progress computation; readiness calculation determinism.
2. **AI Core pipeline (module tests, FakeAIProvider):** template render (missing/undeclared variables fail), routing honors hints/priority/capability, fallback chain on provider failure, circuit breaker open/close, **usage log written on success, failure, and stream abort**, quota guard returns typed error.
3. **Ownership authorization (module + E2E):** every user-owned endpoint returns 403/404 for another user's resource — table-driven test per module (the IDOR suite).
4. **Event → job → apply flows (module tests):** publish `ResumeVersionCreatedEto` → job runs with fake AI → skills persisted → `ResumeParsedEto` published → profile merged; idempotency: run handler twice, state unchanged.
5. **RAG correctness (Testcontainers):** chunker determinism; ANN query respects user/source filters (no cross-user leakage — security-critical); re-index swaps chunk sets atomically.
6. **Contract compatibility:** module contracts consumed by other modules get interface-level tests with NSubstitute against the contract, ensuring DTO changes break loudly at compile/test time.
7. **SignalR protocol (E2E):** start → stream chunks → answer → complete → feedback generated (fake AI scripted multi-turn).

Skip: trivial DTO mapping, framework behavior, getters/setters.

## 3. Test kit details

- **FakeAIProvider**: registered as the only `IAIProvider` in tests; modes: canned JSON per prompt key, scripted sequences (multi-turn interviews), failure injection (429, timeout, invalid JSON), streaming with controllable chunking. Capability flags configurable to exercise router logic.
- **Builders** produce valid aggregates with sensible defaults (`new ResumeBuilder().WithParsedVersion().Build()`), keeping tests about the delta, not setup.
- **FakeClock** (`IClock` swap) for streaks, staleness (30-day research), session janitor.
- **Snapshot tests** for rendered prompts (golden files per template key/version) — prompt changes show up in diffs, reviewed like code.
- Determinism: no real network, no real time, no random without seed. AI Core's pipeline gets its own clock/jitter abstractions.

## 4. Architecture tests (the boundary police)

ArchUnitNET rules, CI-blocking:

1. `Modules.X.*` may not reference `Modules.Y.Domain|EntityFrameworkCore|Application` (contracts only).
2. Only `Modules.AI.*` may reference LLM SDK namespaces/packages.
3. Only `Modules.Knowledge.EntityFrameworkCore` may reference pgvector types.
4. Domain projects may not reference EF Core, ASP.NET, or ABP application packages.
5. ETOs live only in `*.Application.Contracts`; controllers only in `*.HttpApi`.

## 5. CI gates

| Stage | Runs | Gate |
|---|---|---|
| PR fast | domain unit + architecture + AI core module tests | required, < 3 min |
| PR full | all module tests (SQLite) + Knowledge (Testcontainers) | required |
| Main | E2E API suite + migration apply-from-scratch + seed | required before deploy artifact |
| Nightly | prompt snapshot review job, dependency vulnerability scan | report |

Coverage target: 80%+ on Domain and AI Core pipeline; module application layer measured but gated on critical-path tests existing (the IDOR suite, state machines, usage logging), not on a raw percentage.
