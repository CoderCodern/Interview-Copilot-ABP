# 3. Repository Structure

A single monorepo with `backend/` and `frontend/` kept separate (never merged), plus top-level homes for infrastructure, CI/CD, and documentation. The tree below is the **target** layout; Phase 0 creates the skeleton and later phases fill it in.

```text
copilot-interview/
├── README.md                       # repo overview, quickstart, links into docs/
├── CLAUDE.md                       # project memory (this stack)
├── .editorconfig                   # formatting + analyzer rules (enforced in CI)
├── Directory.Build.props           # shared MSBuild props: TFM, nullable, langversion, analyzers
├── Directory.Packages.props        # central package version management (CPM)
├── .gitignore  /  .gitattributes
│
├── backend/
│   ├── CopilotInterview.sln
│   ├── global.json                 # pins .NET 10 SDK
│   ├── src/
│   │   ├── AppHost/                 # Aspire orchestration (CopilotInterview.AppHost)
│   │   │   └── AppHost.cs           # declares Api, Postgres, Redis, frontend, otel
│   │   ├── ServiceDefaults/         # shared telemetry/health/resilience extensions
│   │   ├── Domain/                  # entities, value objects, domain events, enums — no deps
│   │   ├── Application/             # CQRS slices, abstractions (ports), validators
│   │   │   └── Features/            # vertical slices grouped by bounded context
│   │   │       ├── Resumes/
│   │   │       ├── JobDescriptions/
│   │   │       ├── InterviewPrep/
│   │   │       ├── InterviewSessions/
│   │   │       ├── Feedback/
│   │   │       ├── Identity/
│   │   │       ├── Billing/
│   │   │       └── Admin/
│   │   ├── Infrastructure/          # EF Core, Redis, identity, file storage, jobs
│   │   │   ├── Persistence/         # DbContext, configurations, interceptors, migrations
│   │   │   ├── Identity/            # token service, password hashing, OAuth
│   │   │   ├── Caching/             # Redis abstractions
│   │   │   ├── Files/               # blob/object storage adapter
│   │   │   └── BackgroundJobs/      # job runner adapter
│   │   ├── Ai/                      # AI platform: providers, registry, prompts, metering
│   │   │   ├── Abstractions/        # IAIProvider, IChatCompletion, IEmbedding, IStructured
│   │   │   ├── Providers/           # OpenAI/, Claude/, Gemini/  adapters
│   │   │   ├── Registry/            # model registry + task→model routing
│   │   │   ├── Prompts/             # prompt template store + rendering
│   │   │   └── Metering/            # token + cost capture, budget guards
│   │   └── Api/                     # Minimal API host: endpoints, DI composition root
│   │       ├── Endpoints/           # one file per slice group; maps routes → handlers
│   │       ├── Extensions/          # auth, swagger/openapi, problem-details, cors
│   │       └── Program.cs
│   └── test/
│       ├── Domain.UnitTests/
│       ├── Application.UnitTests/
│       ├── Application.IntegrationTests/   # Testcontainers Postgres + Redis
│       ├── Api.FunctionalTests/            # WebApplicationFactory end-to-end
│       └── Architecture.Tests/             # NetArchTest dependency-rule enforcement
│
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts  /  components.json   # shadcn/ui config
│   ├── tsconfig.json
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── main.tsx  /  App.tsx  /  router.tsx
│       ├── app/                     # providers, layouts, error boundaries
│       ├── routes/
│       │   ├── candidate/           # dashboard, resume, jd, practice, session, history
│       │   └── admin/               # dashboard, users, subscriptions, ai-models, usage…
│       ├── features/                # feature-scoped components/hooks/api (mirrors slices)
│       ├── components/ui/           # shadcn/ui primitives
│       ├── components/shared/       # cross-feature composites
│       ├── lib/                     # api client (generated types), auth, query setup
│       ├── stores/                  # client state (Zustand)
│       ├── styles/                  # tailwind layer, design tokens
│       └── types/                   # shared TS types, OpenAPI-generated client
│
├── infra/
│   ├── docker/                      # Dockerfiles: api, frontend, (dev) postgres/redis init
│   ├── compose/                     # docker-compose for non-Aspire prod-like runs
│   ├── bicep/  or  terraform/       # IaC for the chosen cloud (networking, db, cache, secrets)
│   ├── k8s/  or  aspire-manifest/   # generated deployment manifests (aspire publish)
│   └── env/                         # per-environment config templates (.env.example, no secrets)
│
├── .github/
│   └── workflows/
│       ├── backend-ci.yml           # restore, build, test (unit+integration), arch tests
│       ├── frontend-ci.yml          # lint, typecheck, build, test
│       ├── codeql.yml  /  dependency-review.yml
│       └── deploy.yml               # build images → push → deploy (env-gated)
│
├── docs/
│   ├── blueprint/                   # ← this blueprint (architecture, ADRs, roadmap)
│   ├── architecture/                # (legacy ABP design — superseded, kept for reference)
│   ├── ADR/                         # (legacy ABP ADRs — superseded)
│   ├── API/                         # api-v1.md endpoint catalog
│   ├── prompts/                     # AI prompt template catalog
│   └── design/                      # UI reference + design-system assets
│
└── tools/                           # repo scripts: db reset, openapi→ts codegen, seed
```

## Notes on placement

The **AI platform lives in its own top-level project (`Ai/`)** rather than inside Infrastructure. It is large enough and central enough to warrant its own boundary, and the Application layer depends only on its `Abstractions/`. Provider SDKs are referenced *only* inside `Ai/Providers/`.

**Migrations live in `Infrastructure/Persistence/Migrations`**, owned by the EF Core DbContext, and are applied via a dedicated migration step (not auto-migrate on app start in production — see DevOps doc).

**`Directory.Packages.props` (Central Package Management)** pins every NuGet version in one file so the solution can't drift across projects — important when the team grows.

The **frontend `features/` folder mirrors backend slices** so a developer working on "resume analysis" finds matching folders on both sides.

`infra/` shows both Bicep/Terraform and k8s/aspire-manifest as alternatives; the DevOps doc recommends starting with Aspire-published container manifests and a single container host, adding IaC and orchestration only when scale requires.
