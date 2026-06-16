# ADR-0002 — Backend structure (Clean Architecture)

**Status:** Proposed · **Date:** 2026-06-15

## Context

The backend must be maintainable for years, testable without infrastructure, and resistant to vendor churn (LLM SDKs, ORM, cache). It must also be productive for a solo developer. We need a project layout with enforceable boundaries on **.NET 10 LTS**.

## Decision

Adopt **Clean Architecture (Jason Taylor reference layout)** as a **modular monolith**: `Domain`, `Application`, `Infrastructure`, `Api`, plus `Ai` (AI platform), `ServiceDefaults`, and `AppHost`. The **dependency rule** is enforced by project references and an automated architecture-test suite (NetArchTest): Domain depends on nothing; Application depends only on Domain (+ `Ai.Abstractions`); Infrastructure and Ai implement Application's ports; Api is the composition root. No microservices.

## Consequences

**Positive:** the expensive-to-change core (domain + use cases) is insulated from frameworks and SDKs; high-value logic is unit-testable with no database or network; the layout is widely documented, lowering future-hire ramp; module boundaries preserve the option to extract a service later.

**Negative / mitigations:** mapping across layers adds boilerplate (DTO ↔ domain) — accepted as the cost of testability and predictability; layering can feel heavy for trivial CRUD — mitigated by Vertical Slice organization inside Application (ADR-0006) so simple features stay in one folder. The boundary can erode over time — mitigated by the architecture-test suite failing the build on forbidden references.

**Rejected:** *ABP Framework modular monolith* (the prior design) — powerful but heavyweight and opinionated for a solo developer wanting to build fast; this blueprint supersedes it. *Traditional N-tier* — weaker dependency discipline. *Microservices* — distributed-systems tax with no current scaling need.
