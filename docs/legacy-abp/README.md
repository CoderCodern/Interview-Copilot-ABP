# ⚠️ DEPRECATED — Legacy ABP design (superseded)

**Do not build from these documents.** They describe an earlier architecture based on the **ABP Framework** (modular monolith, OpenIddict, ABP background jobs/tenancy). That direction has been **superseded**.

The current, canonical architecture is the **Clean Architecture + .NET Aspire + Minimal APIs** blueprint:

➡️ **[../blueprint/README.md](../blueprint/README.md)**

## What's here and why it's kept

These files are retained for reference and history only (decisions, prior reasoning, domain notes that partially carried over):

- `architecture/` — original ABP design docs (00-overview … 09-roadmap)
- `ADR/` — original ABP-era ADRs (0001 modular monolith … 0006 tenancy)
- `API/api-v1.md` — ABP/OpenIddict-shaped endpoint catalog (auth model no longer applies; a new catalog will be produced from the Minimal API OpenAPI export)

## Key differences vs. the current blueprint

| Topic | Legacy (here) | Current ([blueprint](../blueprint/)) |
|-------|---------------|--------------------------------------|
| Framework | ABP Framework 10.x | Plain ASP.NET Core, Clean Architecture (Jason Taylor) |
| API style | ABP app services / conventional | Minimal APIs + endpoint filters |
| Orchestration | — | .NET Aspire (AppHost + ServiceDefaults) |
| Auth | OpenIddict | JWT + rotating refresh, policy-based RBAC |
| App layer | ABP CQRS, no MediatR | Vertical slices + CQRS, dispatcher TBD (ADR-0006) |
| Tenancy | `IMultiTenant` everywhere | B2C, per-user ownership; no tenant discriminator |

Stack-agnostic concepts (bounded contexts, the AI-provider abstraction, the no-inline-prompts rule, IDOR ownership checks, background-jobs-for-slow-work) carried forward into the blueprint, where they're restated for the new stack.
