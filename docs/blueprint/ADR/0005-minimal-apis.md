# ADR-0005 — Minimal APIs over controllers

**Status:** Proposed · **Date:** 2026-06-15

## Context

ASP.NET Core offers MVC controllers and Minimal APIs. With Vertical Slice Architecture, each endpoint is a thin adapter that dispatches to an Application handler; we want endpoints that are lightweight, easy to group per slice, and free of the "fat controller" drift. We must still get validation, auth, OpenAPI, and consistent error handling.

## Decision

Use **ASP.NET Core Minimal APIs**. Endpoints are defined per slice group and registered via extension methods on route groups (`MapGroup`), with shared concerns applied as **endpoint filters** (auth policies, validation, model binding). Use **typed results** for predictable responses and first-class OpenAPI generation. Each endpoint binds the request, dispatches a command/query, and maps the result — no logic beyond that.

## Consequences

**Positive:** minimal ceremony per endpoint, a natural fit with one-folder-per-slice; route groups give shared prefixes, auth, and filters without inheritance; typed results produce accurate OpenAPI for frontend codegen; lower startup overhead.

**Negative / mitigations:** some controller conveniences (attribute-based binding/validation, action filters by convention) aren't built in — covered by endpoint filters and a small set of shared extensions; very large endpoint files can sprawl — mitigated by grouping endpoints per bounded context and keeping handlers in Application. Discoverability differs from controllers — mitigated by a consistent `Endpoints/` layout and the `tools/` OpenAPI catalog.

**Rejected:** *MVC controllers* — more boilerplate, encourages logic accreting in controllers, and fits the slice model less cleanly. *FastEndpoints / third-party* — adds a dependency for what Minimal APIs + filters now cover natively.
