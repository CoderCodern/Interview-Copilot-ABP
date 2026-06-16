# 12. Implementation Roadmap

Nine phases, sequenced so that foundation, security, and observability come early and the riskiest/most-deferrable work (billing, admin breadth, hardening) comes later. Each phase is shippable and leaves the system in a working state. Phases are deliberately vertical where possible — a thin end-to-end slice beats a fully-built layer with nothing on top.

> Reminder: no implementation code is written until this blueprint is approved.

## Phase 0 — Foundation

**Objectives:** stand up the skeleton everything else hangs on. Decide MediatR vs. lightweight dispatcher (per ADR-0006) and Next.js-retain vs. Vite-migrate (per doc 5).

**Deliverables:** monorepo skeleton (the doc-3 tree); `backend/` solution with empty Domain/Application/Infrastructure/Api/Ai/ServiceDefaults/AppHost projects and enforced project references; Aspire AppHost running API + Postgres+pgvector + Redis + frontend locally; ServiceDefaults wired (OTel, health, resilience); Central Package Management + `.editorconfig` + analyzers; CI for build + test + **architecture tests**; EF Core DbContext + migration runner; frontend shell (router, layouts, design tokens, API-client scaffolding, OpenAPI codegen).

**Dependencies:** none. **Risks:** Aspire version churn (pin versions); over-scaffolding empty layers (build only what the next phase needs).

## Phase 1 — Authentication & Authorization

**Objectives:** real users, roles, and the security spine.

**Deliverables:** User aggregate + Identity context; email/password signup/login; JWT access + rotating refresh with reuse detection; Google social login; role policies (`candidate`/`admin`) + resource-ownership checks (`IUserOwnedResource`) + **IDOR test suite**; secret store integration; auth UI (login/register/refresh) and route guards; audit logging for auth events.

**Dependencies:** Phase 0. **Risks:** rolling crypto by hand (use vetted libraries); refresh-rotation edge cases (test reuse detection thoroughly).

## Phase 2 — Candidate Portal Core

**Objectives:** the core product loop without AI yet — upload, store, view, history.

**Deliverables:** Resume and JobDescription contexts (upload → file storage → parse-status state machine, parsing stubbed/queued); Dashboard, Resume Upload, JD Upload, History screens; background-job infrastructure (enqueue + status field + polling/SignalR); soft-delete + audit interceptors live.

**Dependencies:** Phase 1. **Risks:** treating slow work as synchronous (enforce the background-job rule now); file-upload security (type/size/scan).

## Phase 3 — AI Integration

**Objectives:** the AI platform layer, proven on real tasks (resume + JD analysis).

**Deliverables:** `Ai` project with capability interfaces; first two provider adapters (e.g. OpenAI + Claude); model registry with task→model routing; prompt store with versioned templates (`docs/prompts/`); **token + cost metering** and AiUsageRecord; budget guards + timeouts + resilience; Resume Analysis and JD Analysis (incl. skill-gap) wired through the platform as background jobs; FakeAIProvider for tests (no real LLM calls in CI).

**Dependencies:** Phase 2. **Risks:** prompts inlined in code (forbid via review); uncontrolled cost (metering + budgets ship in this phase, not later); provider response drift (isolate in adapters).

## Phase 4 — Interview Engine

**Objectives:** preparation and live mock-interview sessions — the differentiating feature.

**Deliverables:** Interview Preparation context (prep plans, question sets, STAR answers, readiness score); Interview Session context with **SignalR streaming** for turn-by-turn dialogue; Feedback context (AI scoring/feedback on answers and sessions); Interview Practice + Session + Feedback UI; trace propagation through the streaming path.

**Dependencies:** Phase 3. **Risks:** real-time streaming complexity (keep session state scoped, idempotent turns); latency/UX under slow models (streaming + graceful degradation).

## Phase 5 — Admin Portal

**Objectives:** operability — give the operator eyes and controls.

**Deliverables:** `/admin` area (lazy-loaded, role-gated); User Management; AI Model Management (edit registry/routing); Token Usage & Cost Monitoring dashboards (from metering data); Prompt Management (view/version/rollback); Feature Flags; baseline Analytics; admin-action audit logging.

**Dependencies:** Phases 1, 3 (data to administer). **Risks:** admin endpoints under-secured (server-side role + ownership, not just UI guard); dashboards over-querying prod DB (use read projections/aggregates).

## Phase 6 — Billing & Subscriptions

**Objectives:** monetization and quota enforcement.

**Deliverables:** Billing context (plans, subscriptions, entitlements, usage quotas); payment-provider integration; quota enforcement tied to AI usage/budget guards; Subscription Management (admin) + plan/upgrade UI (candidate); billing audit logging.

**Dependencies:** Phases 1, 3, 5. **Risks:** payment-webhook idempotency/reconciliation; coupling quota logic into features (keep it at the platform/entitlement boundary).

## Phase 7 — Observability hardening

**Objectives:** production-grade telemetry and alerting (foundations already in ServiceDefaults from Phase 0; this phase operationalizes them).

**Deliverables:** production OTLP backend wired; dashboards (latency, errors, AI cost/usage, job queues); alerting + SLOs; trace sampling tuned; log redaction verified; runbooks for common incidents.

**Dependencies:** all prior (more to observe). **Risks:** telemetry cost blowup (sampling, cardinality limits); alert fatigue (alert on symptoms/SLOs, not every metric).

## Phase 8 — Production Hardening

**Objectives:** make it safe to run at scale and under attack.

**Deliverables:** load/perf testing and tuning (DB indexes, query projections, connection pooling/PgBouncer, API replica scaling); security review + pen-test pass; rate-limit tuning; backup/restore + PITR drills and DR runbook; data-erasure (GDPR) path verified; read-replica routing if metrics require; cost-optimization pass on AI routing.

**Dependencies:** all prior. **Risks:** premature optimization before real load data (measure first); scope creep into microservices (resist unless a measured bottleneck justifies extraction).

## Sequencing at a glance

```
P0 Foundation → P1 Auth → P2 Candidate Core → P3 AI → P4 Interview Engine
                                                   ↘
                                                    P5 Admin → P6 Billing
P0/ServiceDefaults ───────────────────────────────► P7 Observability → P8 Hardening
```

Observability and security are **not** end-phases — they start in Phase 0/1 and are merely *operationalized* in P7/P8.
