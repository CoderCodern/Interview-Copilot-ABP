# ADR-0001 — Monorepo strategy

**Status:** Proposed · **Date:** 2026-06-15

## Context

The product has a React frontend and a .NET backend that share an API contract and ship together. The team is one developer today, possibly more later. The contract between front and back changes frequently during early development, and a change plus its consumer should be reviewable and revertable as a unit. Options were: two separate repos, a monorepo, or merging the frontend into the backend solution.

## Decision

Use a **single monorepo** with `backend/` and `frontend/` as **separate, non-merged** top-level directories, plus `infra/`, `.github/`, `docs/`, and `tools/`. Frontend and backend keep independent toolchains, builds, and CI workflows; they are never compiled into one project. The API's OpenAPI document is the contract, and the frontend's typed client is generated from it within the same repo.

## Consequences

**Positive:** atomic cross-stack commits (contract + consumer in one PR); one place to clone, version, and document; shared CI conventions and tooling scripts; no cross-repo version-skew dance. Onboarding is one `git clone`.

**Negative / mitigations:** CI must be path-filtered so a frontend-only change doesn't rebuild the backend (handled by per-area workflows triggered on path globs). A monorepo can grow noisy — mitigated by clear top-level boundaries. If the team later needs independent release cadence or per-repo permissions, the clean `backend/`/`frontend/` split makes extraction to separate repos straightforward.

**Rejected:** *Merging frontend into the backend solution* — couples two unrelated build systems, bloats the .NET solution, and was explicitly ruled out. *Separate repos* — premature for a solo developer and adds contract-sync overhead with no current benefit.
