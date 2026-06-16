# Copilot Interview — Documentation

**Canonical architecture:** the Clean Architecture + .NET Aspire + Minimal APIs blueprint.

| Area | Start here |
|---|---|
| **Architecture blueprint** | [blueprint/README.md](blueprint/README.md) — vision, 10 ADRs, repo structure, backend/frontend, domain, DB, AI platform, security, observability, devops, roadmap, tech-debt |
| Prompts | [prompts/prompt-catalog.md](prompts/prompt-catalog.md) — template keys & intent (runtime truth = DB) |
| Design references | [design/](design/) — UI templates (warm-editorial design system, Folio dashboard) |
| ⚠️ Legacy (ABP) | [legacy-abp/README.md](legacy-abp/README.md) — **superseded** earlier ABP-based design, kept for reference only |

Status: architecture proposed, **awaiting approval — no implementation code yet by design**. After approval, start at Phase 0 of [blueprint/11-implementation-roadmap.md](blueprint/11-implementation-roadmap.md).

New-engineer reading order: blueprint `README` → `01-architecture-vision` → `05-domain-modeling` → `07-ai-platform-architecture` → `03-backend-architecture`, then the ADRs and the area you're working on.
