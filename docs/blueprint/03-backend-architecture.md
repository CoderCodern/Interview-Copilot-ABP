# 4. Backend Architecture

The backend is a Clean Architecture solution orchestrated by .NET Aspire. There are six conceptual projects. The **dependency rule** is the spine: source-code dependencies always point inward, toward the Domain. Outer layers know about inner layers; inner layers know nothing about outer ones.

```
        ┌───────────────────────────────────────────┐
        │                AppHost                      │  orchestration only
        │  (declares & wires resources for run/publish)│
        └───────────────────────────────────────────┘
                 references everything to compose

   Api ──────────► Application ──────────► Domain
    │                  │                     ▲
    │                  └──► Ai.Abstractions  │
    │                                        │
    └──► Infrastructure ──► Application ─────┘
              │
              └──► Ai (providers)   ServiceDefaults (used by Api & AppHost)

   Allowed direction:  Api, Infrastructure, Ai  →  Application  →  Domain
   Forbidden:          Domain → anything   ·   Application → Infrastructure/Api/SDKs
```

## 4.1 AppHost

**Responsibility:** describe the distributed application as a resource graph and run/publish it. It declares the API project, a PostgreSQL resource (with the application database and pgvector), a Redis resource, the frontend (as an npm/Vite resource or a container), and references between them so service discovery and connection strings are injected automatically. It also surfaces the Aspire dashboard in development.

**Rules:** AppHost contains *no business logic and no runtime request handling*. It is build-time/start-time wiring only. Everything Aspire-specific that the API needs at runtime is funneled through ServiceDefaults so the API itself stays portable. AppHost references the projects it composes but nothing references AppHost.

## 4.2 ServiceDefaults

**Responsibility:** a shared library of extension methods that every runnable service calls once at startup to get a consistent baseline: OpenTelemetry (traces, metrics, logs with OTLP export), default health-check endpoints (`/health`, `/alive`), HTTP resilience handlers (retry, circuit breaker, timeout), and service discovery. This is the single place Aspire/OTel wiring lives.

**Rules:** ServiceDefaults depends only on framework and telemetry packages — never on Application or Domain. Keeping it thin and generic means an Aspire upgrade touches one project. The API calls `AddServiceDefaults()` / `MapDefaultEndpoints()`; future extracted services would call the same.

## 4.3 Api

**Responsibility:** the HTTP host and composition root. It (1) registers all services via DI, (2) defines Minimal API endpoints grouped by slice, (3) configures cross-cutting middleware — authentication/authorization, ProblemDetails error mapping, request logging, rate limiting, CORS, OpenAPI/Swagger — and (4) translates between HTTP and the Application layer.

Each endpoint is a **thin adapter**: bind the request, dispatch a command or query to the Application layer (via the mediator/dispatcher), and map the result to a typed HTTP response. No business rules, no data access, no AI calls live here.

**Rules:** Api references Application, Infrastructure, Ai, and ServiceDefaults *only to compose them at startup* (the composition root is the one place allowed to know all concretions). Endpoints depend on Application abstractions, not Infrastructure. Validation failures, domain errors, and unhandled exceptions all funnel into RFC 7807 ProblemDetails responses.

## 4.4 Application

**Responsibility:** the use cases — the heart of the system. Organized as **vertical slices** under `Features/<Context>/<UseCase>`, where each slice owns its request (command or query), its handler, its FluentValidation validator, and its response DTO. CQRS is enforced as a convention: **commands** change state and return only identifiers/acknowledgements; **queries** read and never mutate, and may bypass the domain to project straight to read models for performance.

This layer also declares the **ports** (interfaces) it needs from the outside world — `IApplicationDbContext`, `IAiChatCompletion`, `IAiEmbeddingService`, `IFileStore`, `ICacheService`, `IBackgroundJobScheduler`, `ICurrentUser`, `IDateTime`. Infrastructure and Ai implement these.

**Rules:** Application depends on Domain and on `Ai.Abstractions`, and on nothing else outward — no EF Core, no ASP.NET, no provider SDKs, no Redis client. Cross-cutting concerns (validation, logging, transaction scope, performance timing, exception-to-result mapping) are implemented as **pipeline behaviors** that wrap every handler, so they're declared once rather than repeated per slice. Mediation between endpoints and handlers uses a dispatcher (MediatR if its pipeline pays for itself — see ADR-0006).

## 4.5 Domain

**Responsibility:** the enterprise rules that are true regardless of application or delivery mechanism — entities and aggregate roots, value objects, domain events, domain-specific enums, and invariant-guarding logic. Aggregates protect their own consistency; value objects make illegal states unrepresentable (e.g. a validated `Email`, a `TokenCount`, a `Money` cost).

**Rules:** Domain has **zero outward dependencies** — no NuGet packages beyond the base framework, no persistence concerns, no attributes from EF Core or ASP.NET. Persistence mapping is configured externally in Infrastructure so the model stays clean. Domain raises events; it does not dispatch them.

## 4.6 Infrastructure

**Responsibility:** concrete implementations of the ports the Application defined. EF Core `DbContext` + entity configurations + interceptors (audit, soft-delete, domain-event dispatch, `UpdatedAt`); the Redis cache adapter; the identity/token implementation; file/object storage; the background-job scheduler adapter; and outbound integrations. Database migrations live here.

**Rules:** Infrastructure depends on Application (to implement its interfaces) and Domain. It is referenced by the Api **only at the composition root**, so feature code can be tested against the interfaces with fakes. Swapping Redis, the storage provider, or even the database is an Infrastructure-only change. The `Ai` project is a sibling platform layer that likewise implements `Ai.Abstractions`; provider SDKs are quarantined inside `Ai/Providers/`.

## 4.7 Request lifecycle (end to end)

A typical write request: the client calls a Minimal API endpoint → the endpoint dispatches a **command** → the mediation **pipeline** runs (logging → validation → transaction) → the **handler** loads an aggregate via `IApplicationDbContext`, invokes domain behavior, and persists → an EF interceptor stamps audit fields and **dispatches domain events** after save → the handler returns an id → the endpoint maps it to `201/200`. Long-running work (resume parsing, AI generation) does not run inline: the handler enqueues a **background job**, sets a status field, and returns immediately; the client polls or receives a push (SignalR) when the job completes.
