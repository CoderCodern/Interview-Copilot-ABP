# ADR-0002: .NET 10 LTS + ABP Framework 10.x (open source)

**Status:** Proposed
**Date:** 2026-06-11
**Deciders:** Principal architect

## Context

The product brief allows ".NET 10 or .NET 11". As of June 2026, .NET 11 has not shipped (expected November 2026, STS). ABP's current major line is 10.x, which targets .NET 10; ABP majors align with .NET releases and receive 2 years of support. Budget decision: open-source ABP, no PRO license.

## Decision

Target **.NET 10 (LTS)** with **ABP Framework 10.x open source**. Admin portal uses the open-source ABP dashboard/theme (LeptonX Lite + built-in Identity/Tenant/Settings management UI). Upgrade evaluation when ABP 11/.NET 11 stabilizes (~Q1 2027), not before.

## Options Considered

### Option A: .NET 10 LTS + ABP 10.x (chosen)
**Pros:** released and stable; LTS until Nov 2028; full ABP support today.
**Cons:** none material.

### Option B: Wait for .NET 11 / ABP 11
**Pros:** newest features.
**Cons:** doesn't exist yet; STS (18-month support); blocks the project for ~5 months.

### Option C: ABP Commercial (PRO)
**Pros:** SaaS module (subscriptions), full LeptonX, CMS, more admin UI.
**Cons:** license cost; not needed for v1 scope; open-source modules cover identity, openiddict, permissions, audit, jobs, blob storing. Billing can be added later via a thin custom module + Stripe.

## Consequences

- Easier: stable toolchain, long support window, zero license cost.
- Harder: admin portal is functional rather than fancy; subscription/billing UI is ours to build when monetization lands.
- Revisit: ABP 11 migration window Q1 2027; PRO license if admin/billing build-cost exceeds license cost.

## Action Items

1. [ ] Pin SDK via global.json (10.0.x) and ABP packages to 10.x minor
2. [ ] Add docs note: .NET 11 evaluation gate at roadmap phase 6
