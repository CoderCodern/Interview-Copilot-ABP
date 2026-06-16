# 11. DevOps & Deployment

The deployment story is intentionally simple early (one developer, fast iteration) with clear upgrade paths as load and team grow. Aspire is the through-line from local dev to production manifests.

## 11.1 Environments

| Environment | Purpose | Infra shape |
|-------------|---------|-------------|
| **Local** | Day-to-day development | `aspire run` brings up API, Postgres+pgvector, Redis, frontend, and the Aspire dashboard; secrets via user-secrets/env |
| **Development (shared)** | Integration / preview | Containers on a single small host or a managed container service; managed Postgres + Redis (small tier); seeded data |
| **Staging** | Pre-prod verification, mirrors prod config | Same topology and IaC as prod at smaller scale; real secret store; prod-like data volume for smoke/perf checks |
| **Production** | Live traffic | Managed Postgres (backups + PITR + read-replica option), managed Redis, API container(s) behind TLS/load balancer, OTLP backend, secret store |

Configuration is **environment-driven** (env vars + secret store), never branched in code. The same container images promote from dev → staging → prod; only configuration differs.

## 11.2 Local development

`aspire run` is the single entry point: it starts every dependency with wiring, connection strings, and service discovery injected, and opens the dashboard for traces/logs/metrics. Database schema is applied via the migration runner; seed/reset scripts live in `tools/`. The frontend runs under Vite (HMR), pointed at the API through Aspire-provided discovery. A developer needs only the .NET 10 SDK, Node, and a container runtime.

## 11.3 Containerization

The API and frontend each have a **Dockerfile** (multi-stage: build → slim runtime). Postgres and Redis use official images locally and managed equivalents in shared environments. `aspire publish` generates deployment manifests (container/compose or k8s) from the AppHost graph, keeping the deployed topology consistent with the declared one. A plain `docker-compose` in `infra/compose/` provides a non-Aspire prod-like run as a fallback and for environments where Aspire orchestration isn't used.

## 11.4 CI/CD strategy

CI lives in `.github/workflows/`, **path-filtered** so backend and frontend build independently:

- **backend-ci**: restore → build → unit tests → integration tests (Testcontainers Postgres/Redis) → **architecture tests** (dependency-rule enforcement) → analyzer/format gate.
- **frontend-ci**: install → lint → typecheck → unit/component tests → build; the OpenAPI→TS codegen runs so a contract drift fails the build.
- **security**: dependency review, secret scanning, CodeQL/SAST.
- **deploy** (env-gated, manual approval for prod): build and tag images → push to registry → run the **migration job** → deploy → verify health endpoints → (optional) smoke tests; documented **rollback** by redeploying the previous image tag and, if needed, a down-migration plan.

Migrations are applied as an **explicit pipeline step**, never on app startup, to avoid multi-instance races.

## 11.5 Environment & secret management

Each environment has its own secret-store entries (provider API keys, DB/Redis connection strings, JWT signing key, OAuth secrets). `.env.example` documents required variables without values. Promotion is image + config, so "it worked in staging" is meaningful. Infrastructure is captured as IaC (`infra/bicep|terraform/`) once beyond a single host, so environments are reproducible and reviewable.

## 11.6 Scaling path (when metrics demand it)

The API is **stateless** (JWT, no server session affinity), so the first scale step is running more API container replicas behind the load balancer. Next: Postgres **read replicas** with read routing, **PgBouncer** for connection pooling, and Redis as the shared cache/rate-limit/coordination layer (already in place). Background jobs move from in-process to a dedicated worker process consuming the same queue. Only if a single module becomes a measured, isolated bottleneck is **service extraction** considered — and the module boundaries make that a contained change rather than a rewrite.
