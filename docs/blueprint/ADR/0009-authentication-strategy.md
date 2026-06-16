# ADR-0009 — Authentication & authorization strategy

**Status:** Proposed · **Date:** 2026-06-15

## Context

A B2C SaaS needs user signup/login (email + social), stateless API auth that works for a SPA and a future mobile client, role separation between candidates and admins, and the ability to grow into finer-grained permissions. The brief specifies **JWT authentication** and **role-based authorization**.

## Decision

Use **JWT bearer access tokens** (short-lived) plus **rotating refresh tokens** (longer-lived, stored server-side/hashed, revocable). The API validates JWTs statelessly; refresh rotation is handled by a dedicated identity endpoint with reuse detection. **Role-based authorization** is the baseline (`candidate`, `admin`), implemented as ASP.NET Core authorization **policies** so we can evolve to permission/claim-based checks without rewriting call sites. Support **social login (Google first)** via OAuth/OIDC, with email/password as the fallback. Every user-owned resource additionally enforces an **ownership check** (resource-based authorization) so a valid token for user A cannot access user B's data (IDOR defense).

## Consequences

**Positive:** stateless validation scales horizontally and serves SPA + mobile uniformly; rotating refresh tokens limit blast radius of a leaked token; policy-based auth lets RBAC grow into fine-grained permissions without endpoint rewrites; resource ownership checks close the most common SaaS data-leak class; social login lowers signup friction.

**Negative / mitigations:** JWTs can't be instantly revoked — mitigated by short access-token lifetimes plus refresh-token revocation/reuse detection, and a deny-list for emergency revocation; rolling your own identity is risky — mitigated by using a vetted token library/IdP rather than hand-crafting crypto, and storing only hashed refresh tokens. Social-login complexity — start with one provider.

**Rejected:** *Server-side cookie sessions only* — weaker fit for mobile/multi-client and cross-origin SPA. *Opaque tokens with introspection on every call* — adds a hot dependency; revisit only if instant revocation becomes a hard requirement. *Permission-based authZ from day one* — over-engineered before roles prove insufficient.
