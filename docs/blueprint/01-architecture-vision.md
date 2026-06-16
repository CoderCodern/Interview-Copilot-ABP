# 1. Architecture Vision

## 1.1 The shape of the system

Copilot Interview is an AI-powered interview-preparation and live-assistance platform with two faces: a **Candidate Portal** (the product) and an **Admin Portal** (operations, billing, AI governance). Behind both sits a single .NET backend organized as a **modular monolith** following **Clean Architecture**, with an **AI platform layer** that brokers every call to OpenAI, Claude, Gemini, and future providers.

The whole system is composed and run locally and in CI through **.NET Aspire**, which describes the application as a graph of resources (the API, PostgreSQL, Redis, the frontend, and observability backends) and wires them together with service discovery, health checks, and OpenTelemetry out of the box.

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend (React + Vite + TS + Tailwind + shadcn/ui)          │
│  Candidate Portal   ·   Admin Portal   (one app, two areas)   │
└───────────────┬───────────────────────────────────────────────┘
                │  HTTPS / JSON  (JWT bearer)
┌───────────────▼───────────────────────────────────────────────┐
│  ASP.NET Core Minimal API  (Clean Architecture, VSA + CQRS)    │
│                                                                │
│   Api ── Application (slices: commands/queries + handlers) ──  │
│        └ Domain (entities, value objects, domain events)       │
│        └ Infrastructure (EF Core, Redis, AI platform, auth)    │
│                                                                │
│   AI Platform: IAIProvider strategy · model registry ·         │
│                prompt store · token & cost metering            │
└───────┬───────────────┬───────────────┬───────────────────────┘
        │               │               │
   ┌────▼────┐     ┌────▼────┐     ┌────▼─────────┐
   │ Postgres│     │  Redis  │     │ LLM providers│
   │ + audit │     │ cache/  │     │ OpenAI/Claude│
   │         │     │ rate-lim│     │ /Gemini …    │
   └─────────┘     └─────────┘     └──────────────┘
        ▲
        └── OpenTelemetry (traces/metrics/logs) → Aspire dashboard (dev) / OTLP collector (prod)
```

## 1.2 Why this architecture

**Clean Architecture (Jason Taylor flavor)** gives a solo developer a well-trodden, opinionated layout where the dependency direction is enforced by project references. The domain and application logic never depend on EF Core, ASP.NET, or any vendor SDK, so the parts most expensive to rewrite are the parts most insulated from churn. It is also the most widely documented .NET reference architecture, which lowers onboarding cost when the team grows.

**Vertical Slice Architecture + CQRS inside the Application layer** keeps day-to-day work fast. A feature (e.g. "analyze resume") lives in one folder containing its command/query, handler, validator, and response — so adding or changing a feature touches one place rather than four horizontal layers. CQRS here is a *coding convention* (commands mutate, queries read, they don't share models), not separate databases.

**Modular monolith, not microservices.** A single deployable unit removes the distributed-systems tax (network failure modes, eventual consistency, deployment orchestration, distributed tracing complexity) that a solo founder cannot afford and a pre-PMF product does not need. Strict module boundaries inside the monolith preserve the *option* to extract a service later, but only when load data justifies it.

**.NET Aspire** collapses the local-dev and orchestration story. Instead of a hand-maintained docker-compose plus README of "run these five things," the AppHost declares the topology once; `aspire run` brings up the API, Postgres, Redis, and the dashboard with wiring already done. ServiceDefaults standardizes telemetry, health, and resilience across every service from the first commit.

**Minimal APIs** match the slice model: each endpoint is a thin adapter that binds a request, dispatches to a handler, and maps the result. They are faster to start, lighter to read, and avoid the controller-as-god-object drift.

**PostgreSQL + Redis** is the smallest infrastructure footprint that scales a long way. Postgres covers relational data, JSON documents, full-text, and (via `pgvector`) embeddings for retrieval — one engine instead of three. Redis handles caching, rate limiting, and background-job/session coordination.

## 1.3 Benefits

The architecture is **velocity-friendly now and scalable later**: vertical slices and Aspire make the first ninety days productive, while the layer boundaries and module seams mean scaling out (read replicas, a queue, extracting a hot module) is an incremental change, not a rewrite. The **AI abstraction** turns provider choice into configuration, so you can route a task to the cheapest adequate model and swap vendors without touching feature code. **Observability and security are built in** through ServiceDefaults and a shared auth layer, so the product is operable and auditable from the first deploy. And the **monorepo** keeps frontend and backend versioned together, so a contract change and its consumer ship in one commit.

## 1.4 Tradeoffs

| We chose | We gave up | Why it's acceptable |
|----------|-----------|---------------------|
| Modular monolith | Independent per-module scaling/deploy | Premature for current load; boundaries keep extraction cheap when needed |
| Clean Architecture layering | Some boilerplate (mapping across layers) | Predictability and testability outweigh the typing for a system meant to live for years |
| Aspire (relatively young, fast-moving) | Maturity of plain docker-compose | LTS-aligned (13.x on .NET 10), and the dev-experience win is large; production can fall back to plain containers |
| Minimal APIs | Some controller-ecosystem conveniences (model binding attributes, filters-by-convention) | Endpoint filters + typed results cover the gaps; slices stay thin |
| One Postgres for relational + vector | Best-of-breed specialized vector DB | `pgvector` is sufficient to ~millions of vectors; one engine to operate beats two |
| Monorepo | Independent repo permissions/release cadence | Solo/small team benefits from atomic cross-stack commits |

## 1.5 Risks and mitigations

The **modular-monolith boundary can erode** — modules start reaching into each other's internals until the "monolith" is a big ball of mud. *Mitigation:* boundaries expressed as project/namespace structure plus an architecture-test suite (NetArchTest/ArchUnitNET) that fails the build when a forbidden reference appears.

**Aspire is young and evolves quickly**, so APIs and tooling may shift between minor versions. *Mitigation:* pin Aspire and workload versions, keep AppHost logic thin and declarative, and treat ServiceDefaults as the only place Aspire-specific wiring lives so an upgrade is contained.

**AI cost and latency are unbounded by default** — an LLM feature can quietly run up a large bill or block a request for 30 seconds. *Mitigation:* every AI call goes through the platform layer with per-call token/cost metering, budget limits, timeouts, and a "slow work = background job + status" rule so requests never block on generation.

**Solo-developer bus factor and scope creep.** *Mitigation:* the roadmap front-loads foundation and auth, defers billing and the admin portal, and the tech-debt-prevention doc names the anti-patterns to refuse. Aspire + CI keep the project reproducible by a future hire.

**Vendor and prompt lock-in.** *Mitigation:* prompts are stored as versioned templates by key (not inlined in code), and the provider abstraction normalizes requests/responses so swapping a model is a registry change.
