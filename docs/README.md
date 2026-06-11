# Interview Copilot AI — Documentation

| Area | Start here |
|---|---|
| Architecture | [architecture/00-overview.md](architecture/00-overview.md) — decisions, diagram, doc map |
| Decisions | [ADR/](ADR/) — 0001 modular monolith · 0002 .NET 10/ABP 10 · 0003 pgvector · 0004 AI provider strategy · 0005 vertical slices/CQRS · 0006 tenancy |
| API | [API/api-v1.md](API/api-v1.md) — REST endpoint catalog (OpenAPI export lands here once the host builds) |
| Prompts | [prompts/prompt-catalog.md](prompts/prompt-catalog.md) — template keys & intent (runtime truth = DB) |
| Design references | [design/](design/) — UI templates (place `interview-prep-dashboard.html` here) |

Status: architecture proposed, awaiting approval. No implementation code yet by design.

Reading order for a new engineer: 00-overview → 02-bounded-contexts → 03-domain-model → 05-ai-architecture → 01-solution-structure, then the module you're working on.
