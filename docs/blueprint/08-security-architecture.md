# 9. Security Architecture

Security is treated as foundational (wired in Phases 0–1), not a hardening afterthought. The model layers authentication, authorization, secret management, transport/API protections, and audit logging.

## 9.1 Authentication

Users authenticate via **email/password** or **social login (Google first; Microsoft/LinkedIn later)** over OAuth/OIDC. The API issues a **short-lived JWT access token** and a **longer-lived, server-stored, hashed, rotating refresh token**. Access tokens are validated statelessly on every request; refresh happens at a dedicated endpoint with **rotation and reuse detection** (a replayed refresh token revokes the whole token family). Passwords are stored with a strong adaptive hash (never reversible), and login is protected by rate limiting and lockout/backoff. (See ADR-0009.)

## 9.2 Authorization

Two layers run on every protected endpoint. First, **role-based policies** (`candidate`, `admin`) implemented as ASP.NET Core authorization policies — so the model can evolve to claim/permission-based checks without rewriting endpoints. Second, **resource-based ownership checks**: any user-owned aggregate verifies that the authenticated user owns the resource (`IUserOwnedResource` pattern), closing **IDOR** vulnerabilities where a valid token for one user reaches another user's data. Admin endpoints require the `admin` role server-side — the frontend route guard is convenience only and is never the security boundary. An automated **IDOR test suite** asserts cross-user access is denied.

## 9.3 Secret management

No secrets in source or in the repo. In development, use **.NET user secrets** / environment variables injected by Aspire; in staging/production, use a **managed secret store** (cloud key vault / secrets manager) injected as environment/config at runtime. Provider API keys (OpenAI/Claude/Gemini), database and Redis connection strings, JWT signing keys, and OAuth client secrets all live there. Signing keys and provider keys support **rotation**; `.env.example` documents required variables without values. CI uses scoped, least-privilege deploy credentials stored as protected secrets.

## 9.4 API security

All traffic is **HTTPS/TLS**; HSTS in production. Inputs are validated at the edge with **FluentValidation** (commands/queries) and errors returned as RFC 7807 **ProblemDetails** without leaking internals. **CORS** is restricted to known frontend origins. **Rate limiting** protects auth, AI, and write endpoints (per-user and per-IP), backed by Redis. Standard protections apply: anti-CSRF where cookies are involved, security headers (CSP, X-Content-Type-Options, etc.), request size limits and content-type allow-lists on uploads, malware/type scanning on uploaded resumes/JDs, and parameterized data access via EF Core (no string-built SQL). AI inputs are guarded against prompt-injection where untrusted content is fed to models, and AI outputs are treated as untrusted (never executed, escaped on render).

## 9.5 Audit logging

Security- and money-sensitive actions write to the **append-only audit log** (doc 7.3): authentication events (login, failure, refresh, logout), role/permission changes, subscription/billing changes, admin actions, and data-erasure requests. Entries record actor, action, target, timestamp, source, and before/after where relevant, and are immutable. Audit logs are retained per policy, surfaced in the admin portal, and correlated with traces via ids. PII and secrets are never written to application logs or telemetry spans; redaction policies enforce this.

## 9.6 Data protection & compliance posture

User PII (resumes contain a lot of it) is encrypted in transit and at rest (database/storage encryption), access-controlled by ownership, and subject to retention and deletion policies. Soft-delete is the default; a logged hard-purge path supports erasure obligations. These choices set up GDPR-style compliance without committing to a specific certification now; the audit log and deletion path are the load-bearing pieces.
