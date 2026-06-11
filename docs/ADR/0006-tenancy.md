# ADR-0006: Multi-tenancy infrastructure ON, product runs B2C

**Status:** Proposed
**Date:** 2026-06-11
**Deciders:** Product owner, principal architect

## Context

The product launches B2C (individual candidates). Plausible future: B2B tenants (bootcamps, universities, outplacement firms) buying seats for cohorts. ABP ships multi-tenancy (tenant resolution, `IMultiTenant`, data filters) at near-zero cost if adopted from the start; retrofitting tenancy onto a tenant-less schema is expensive.

## Decision

Keep ABP's multi-tenancy module **enabled**. All aggregates implement `IMultiTenant` (nullable `TenantId`); ABP's data filter applies automatically. At launch, all users live in the **host** (TenantId = null); no tenant resolution middleware is exposed in the user portal, and tenant management UI exists only in the admin portal (hidden/feature-flagged).

User-data isolation in B2C is enforced by **ownership filtering** (`UserId == CurrentUser.Id`) at the application layer — tenancy is not a substitute for per-user authorization.

## Options Considered

**A. Tenancy-ready B2C (chosen)** — pennies now, keeps the B2B door open. Cons: a vestigial column per table; developers must still write ownership checks.
**B. Full B2B multi-tenant at launch** — adds tenant onboarding, per-tenant admin, invitations — scope we don't need.
**C. No tenancy code** — simplest, but retrofit = touching every table, every query, every cache key later.

## Consequences

- Easier: future B2B pivot = enable resolution + build cohort features; data layer already correct. Company reference data is host-level (shared) by leaving `TenantId` null — the right default for global entities like `Company`.
- Harder: one nullable column everywhere; must document that `TenantId` ≠ user isolation.
- Revisit: first B2B contract → activate tenant resolution, add cohort/seat model.

## Action Items

1. [ ] Base entity classes implement `IMultiTenant`
2. [ ] Authorization handler template includes resource-ownership check (`IUserOwnedResource`)
