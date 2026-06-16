# 13. Technical Debt Prevention

The cheapest debt is the debt never taken on. This is the list of mistakes this architecture is specifically designed to avoid, and the guardrails that keep them out. Treat it as a review checklist.

## 13.1 Common mistakes to avoid

**Letting slow work block requests.** Resume parsing and AI generation are seconds-long and externally dependent. Running them inline ties up threads and times out users. *Guardrail:* the "slow work = background job + status field + event" rule; nothing over ~5s runs in a request.

**Inlining prompts and provider calls in features.** Scatters AI logic, locks in a vendor, and makes cost invisible. *Guardrail:* all LLM access through `Ai.Abstractions` with a prompt **key**; provider SDKs only in `Ai/Providers/`; a usage record per call.

**Skipping ownership checks.** Role checks alone leave IDOR holes (user A reads user B's resume with a valid token). *Guardrail:* `IUserOwnedResource` + resource authorization on every user-owned aggregate, with a dedicated IDOR test suite.

**Auto-migrating on startup in production.** Causes races across instances and silent schema drift. *Guardrail:* migrations as an explicit, gated deploy step.

**Logging PII/prompts/secrets.** Resumes are PII-dense; prompts and keys are sensitive. *Guardrail:* redaction policy, ids-not-objects in logs, no secrets in telemetry.

**Deferring observability and security to "later."** They become impossible to retrofit cleanly. *Guardrail:* ServiceDefaults + auth land in Phase 0/1.

## 13.2 Anti-patterns to refuse

**Anemic-then-fat services.** Business rules drifting out of the Domain into ever-growing "manager/service" classes. *Refuse by:* keeping invariants in aggregates and use-case logic in slices; if a service exceeds a few responsibilities, it's a smell.

**God endpoints / fat controllers.** Logic accreting in the HTTP layer. *Refuse by:* endpoints are thin adapters — bind, dispatch, map; zero business logic.

**Shared mutable DTOs across read and write.** Couples queries to write models and invites accidental mutation. *Refuse by:* CQRS convention — separate command and query models; queries project, never mutate.

**Repository-over-DbContext-over-ORM.** Wrapping EF Core in a generic repository that re-implements what EF already does. *Refuse by:* depend on `IApplicationDbContext`; add a repository only where a real aggregate-loading abstraction earns it.

**Cross-module reach-through.** One context loading another's EF entities directly. *Refuse by:* reference by id, communicate through Application contracts/events; architecture tests fail forbidden references.

**Abstraction for its own sake.** Interfaces with one implementation and no test/seam justification, premature generics, speculative extensibility. *Refuse by:* introduce an abstraction when a second implementation or a test seam actually exists.

## 13.3 Premature microservices risks

Splitting into services before there is a measured, isolated bottleneck buys distributed-systems cost (network failure modes, eventual consistency, distributed transactions/sagas, deployment orchestration, cross-service tracing, data duplication) with no benefit at current scale — and it's the single most expensive wrong turn available here. *Stance:* stay a modular monolith; keep module boundaries clean so extraction is *possible*; extract a service only when profiling shows one module needs independent scaling or isolation, and treat that as a deliberate, justified event — not a default.

## 13.4 Clean Architecture pitfalls

**Layer leakage** — EF Core attributes on domain entities, `HttpContext` in handlers, provider SDK types crossing into Application. *Guardrail:* dependency-rule architecture tests in CI.

**Ceremony overload** — mapping the same shape across four layers for trivial CRUD. *Guardrail:* vertical slices keep simple features in one folder; don't manufacture layers a feature doesn't need.

**Mediator everywhere** — using the dispatcher as a fashion rather than for its pipeline value, or hiding direct calls behind needless messages. *Guardrail:* dispatcher is justified by behaviors (validation/logging/transaction); revisit if behaviors aren't used.

**Domain events as hidden control flow** — long synchronous chains of handlers that are hard to follow. *Guardrail:* events carry ids + minimal facts, handlers are idempotent and dispatched post-persist.

## 13.5 Aspire pitfalls

**Business logic in AppHost.** AppHost is orchestration only; logic there is untestable and misplaced. *Guardrail:* AppHost stays declarative; runtime needs go through ServiceDefaults.

**Aspire wiring scattered across services.** Makes version upgrades a hunt-and-replace. *Guardrail:* confine Aspire/OTel specifics to ServiceDefaults.

**Version drift / unpinned workloads.** Aspire moves fast; un-pinned versions break reproducibility. *Guardrail:* pin Aspire + workload + SDK (`global.json`, CPM).

**Treating Aspire as a production runtime it isn't designed to be.** *Guardrail:* use `aspire publish` to emit standard container manifests; the deployed unit is plain containers, portable off Aspire if needed.

## 13.6 Standing guardrails (CI-enforced)

Architecture tests for the dependency rule and cross-module boundaries; the IDOR/ownership test suite; FakeAIProvider so tests never hit real LLMs; analyzer + format gates; central package management; OpenAPI→TS codegen so contract drift fails the frontend build. If a rule in this document isn't enforced by a test or a review checklist item, it will eventually be violated — so encode it.
