# ADR-0006 — Vertical Slice Architecture + CQRS (and the MediatR question)

**Status:** Proposed · **Date:** 2026-06-15

## Context

Within Clean Architecture's Application layer, code can be organized horizontally (Services/, DTOs/, Validators/ folders) or vertically (one folder per use case). Horizontal layering scatters a single feature across many folders, slowing change. We also need a decision on **CQRS** and whether to use **MediatR** as the in-process dispatcher.

## Decision

Organize the Application layer as **Vertical Slices**: `Features/<Context>/<UseCase>/` each containing its command/query, handler, validator, and response. Apply **CQRS as a convention** — commands mutate and return ids/acks; queries read and may project directly to read models, never mutating. Cross-cutting concerns (validation, logging, transactions, performance, exception→result mapping) are **pipeline behaviors** wrapping every handler.

Use **MediatR** as the dispatcher **if and only if** the pipeline-behavior model is actively used; the behaviors are the justification, not the in-memory message passing itself. If a thin hand-rolled dispatcher suffices, prefer it. (Given recent licensing changes in the MediatR ecosystem, evaluate the current license at Phase 0 and choose MediatR vs. a lightweight dispatcher abstraction then — the slice/behavior design does not depend on which is chosen.)

## Consequences

**Positive:** a feature lives in one folder, so adding/changing it touches one place; CQRS keeps reads fast and writes safe; behaviors declare cross-cutting logic once; the dispatcher abstraction decouples endpoints from handlers and is trivially testable.

**Negative / mitigations:** slices can duplicate small bits of logic — accepted (a little duplication beats the wrong abstraction); shared domain logic still belongs in Domain, not copied across slices. MediatR adds indirection some find unnecessary — mitigated by the explicit "only if behaviors earn it" rule and a swappable dispatcher interface.

**Rejected:** *Horizontal service layers* — scatters features and grows god-services. *Hard CQRS with separate write/read databases* — premature; convention-level CQRS gives most of the benefit with none of the sync complexity (revisit per ADR-0007 if read load demands it).
