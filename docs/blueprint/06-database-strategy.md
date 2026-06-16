# 7. Database Design Strategy

> Strategy and conventions only — no SQL, no migrations.

## 7.1 Main database

A single **PostgreSQL 17** database accessed through **EF Core (Npgsql)** is the system of record. Logical separation is by **schema-per-bounded-context** (`identity`, `resume`, `jobdesc`, `prep`, `session`, `feedback`, `billing`, `ai`) so module boundaries are visible at the data layer and a context could later be lifted into its own database with minimal churn. Document-shaped data (parsed resume/JD structures, raw AI outputs) is stored as `jsonb` rather than over-normalized into dozens of tables. Embeddings for retrieval features use the **pgvector** extension, co-located with the relational data they describe. Native full-text search covers keyword lookups before any external search engine is considered.

## 7.2 Read models

Following convention-level CQRS, **queries project directly to read DTOs** rather than loading full aggregates — flattened, join-minimized shapes tuned for each screen (dashboard summaries, history lists, admin tables). These projections read from the same database and tables as writes; there is **no separate read database** initially. If read load outgrows a single instance, the first step is **PostgreSQL read replicas** with queries routed to them, then materialized views or a dedicated read store for the hottest projections — introduced only when metrics justify it, never preemptively.

## 7.3 Audit strategy

Auditing is implemented as a cross-cutting **EF Core SaveChanges interceptor**, not per-entity code. Every persisted aggregate carries standard fields — `CreatedAt`, `CreatedBy`, `UpdatedAt`, `UpdatedBy` — stamped automatically from `ICurrentUser` and `IDateTime`. For security- and billing-sensitive actions (auth events, role changes, subscription changes, admin actions), a separate **append-only audit log** captures who/what/when/before-after, written through the same interceptor or via domain events. The append-only log is never updated or deleted and feeds the admin audit views.

## 7.4 Soft delete strategy

User-owned and business-critical aggregates use **soft delete**: an `IsDeleted` flag (and `DeletedAt`/`DeletedBy`) set instead of physical removal, with a global EF Core **query filter** excluding deleted rows by default so feature code never sees them accidentally. This preserves referential history, supports undo/recovery, and keeps audit trails intact. Hard deletion is reserved for genuine data-erasure obligations (e.g. GDPR "right to be forgotten"), handled by an explicit, logged purge path rather than the normal delete. Truly transient data (expired refresh tokens, stale cache-like rows) may be hard-deleted on a schedule.

## 7.5 Multi-tenancy considerations

The product is **B2C, single-tenant by design** — there is no organization/tenant hierarchy, and isolation is **per-user**, enforced by the ownership check on every user-owned aggregate (the `IUserOwnedResource` + resource-authorization pattern), *not* by a tenant discriminator. We deliberately do **not** add a `TenantId` to everything now, because user isolation and tenant isolation are different concerns and a fake tenant column would be dead weight. The schema-per-context layout and the consistent owner-id pattern mean that if a future B2B offering requires real multi-tenancy, it can be introduced as a discriminator + row-level-security strategy on the affected contexts without reworking the whole model. This decision is recorded as a deliberate non-goal so it isn't reintroduced by habit.

## 7.6 Migrations & data lifecycle

Migrations are EF Core code-first, owned by the Infrastructure DbContext, reviewed like any code, and applied as an **explicit, gated deploy step** (a migration runner/job) — never auto-migrated on application startup in staging/production, to avoid races across instances and accidental schema drift. Connection pooling (and PgBouncer at scale) protects the database from connection exhaustion. Backups, point-in-time recovery, and retention are defined in the DevOps doc.
