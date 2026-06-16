# Copilot Interview — Backend

Clean Architecture solution (per [`docs/blueprint/`](../docs/blueprint/README.md)). This is the **Phase 0 skeleton**: all projects exist and are wired with the correct references, but the modules are intentionally **empty** — fill them in module by module.

## Solution layout

```
backend/
├── CopilotInterview.slnx        # XML solution (open in VS 2026 / Rider / `dotnet`)
├── global.json                  # pins .NET 10 SDK + Aspire.AppHost.Sdk
├── Directory.Build.props        # shared TFM (net10.0), nullable, implicit usings, analyzers
├── Directory.Packages.props     # Central Package Management (pin versions here)
├── src/
│   ├── Domain/                  # entities, value objects, domain events — depends on NOTHING
│   ├── Ai.Abstractions/         # IAi* capability interfaces — depends on Domain
│   ├── Application/             # vertical slices + ports + behaviors — depends on Domain, Ai.Abstractions
│   ├── Ai/                      # provider adapters, registry, prompts, metering — implements Ai.Abstractions
│   ├── Infrastructure/          # EF Core, Redis, identity, files, jobs — implements Application ports
│   ├── ServiceDefaults/         # OTel/health/resilience/discovery (empty for now)
│   ├── Api/                     # Minimal API host + composition root (Program.cs)
│   └── AppHost/                 # .NET Aspire orchestration (AppHost.cs)
└── test/
    ├── Domain.UnitTests/
    ├── Application.UnitTests/
    ├── Application.IntegrationTests/   # Testcontainers Postgres + Redis
    ├── Api.FunctionalTests/            # WebApplicationFactory
    └── Architecture.Tests/             # NetArchTest — enforces the dependency rule
```

## Dependency rule (enforced later by Architecture.Tests)

```
Domain            → (nothing)
Ai.Abstractions   → Domain
Application       → Domain, Ai.Abstractions
Ai                → Ai.Abstractions, Domain
Infrastructure    → Application, Domain
Api               → Application, Infrastructure, Ai, ServiceDefaults   (composition root)
AppHost           → Api
ServiceDefaults   → (framework only)
```

> Refinement vs. the blueprint tree: the AI platform is split into **`Ai.Abstractions`** (interfaces) and **`Ai`** (implementation) so `Application` can depend on the abstraction only — the precise realization of the dependency rule in `03-backend-architecture.md`. Say the word and I'll fold this back into the blueprint's repo-structure doc.

## Build & run

```bash
cd backend
dotnet restore        # first restore pulls Aspire + test packages
dotnet build
dotnet test
aspire run            # once AppHost declares resources (Phase 0)
```

Requires the **.NET 10 SDK** (`global.json` pins `10.0.100`, rolls forward to latest patch) and a container runtime for Aspire/Testcontainers.

> Scaffolded offline, so package versions in `Directory.Packages.props` couldn't be restore-verified. If a version fails to resolve on first `dotnet restore`, bump it there (one line, central). The Aspire package/SDK version (`13.4.2`) in `global.json` + CPM is the most likely to need a nudge to whatever's current.

## Phase 0 TODO (see `docs/blueprint/11-implementation-roadmap.md`)

- Decide MediatR vs. lightweight dispatcher (ADR-0006) and add it to CPM.
- Implement `ServiceDefaults` (OTel + health + resilience + discovery) and call `AddServiceDefaults()` in `Api`.
- Declare the Aspire resource graph in `AppHost.cs` (Postgres+pgvector, Redis, Api, frontend).
- Add `IApplicationDbContext` + `DbContext` + the audit/soft-delete/domain-event interceptors in `Infrastructure/Persistence`.
- Wire the composition-root extension methods referenced in `Api/Program.cs`.
- Write the first architecture tests asserting the dependency rule above.
