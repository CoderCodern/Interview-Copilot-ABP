# Security Design

## 1. Authentication (OpenIddict, bundled with ABP)

| Concern | Design |
|---|---|
| User portal (Next.js) | OAuth 2.1 **authorization code + PKCE** against the host's OpenIddict server. SPA holds short-lived access token in memory; refresh token in httpOnly secure cookie via BFF-lite token endpoint proxy on the Next.js server (no tokens in localStorage) |
| Access token | JWT, 15 min lifetime; claims: sub, name, role, permissions-hash, tenant (null) |
| Refresh token | Rotating one-time-use, 14-day sliding window, reuse detection → family revocation (OpenIddict native) |
| Admin portal | Same OpenIddict server, separate client id, ABP cookie auth acceptable (server-rendered) |
| Google OAuth | ASP.NET external authentication → account linking by verified email; auto-provision user on first login. Microsoft / LinkedIn later = additional provider registrations, same linking flow |
| Email/password | ABP Identity: email verification required, lockout on brute force, password policy; reset via signed token email |
| Machine surface | None public in v1 (no API keys); future public API → OpenIddict client credentials |

## 2. Authorization

Two layers, both mandatory:

1. **ABP permissions** (role → permission grants): gate endpoints/features. Roles: `admin`, `user`. Permission names per module (`InterviewCopilot.Resume.Resumes.Upload`, …) defined in each module's `Application.Contracts`.
2. **Resource ownership**: every user-owned aggregate implements `IUserOwnedResource`; a shared authorization handler asserts `resource.UserId == CurrentUser.Id` (or `ViewAll` permission). Queries are ownership-filtered at the repository/query level — defense in depth, and a global EF query filter on `UserId` is deliberately avoided (explicit filters keep admin paths obvious).

Multi-tenancy note (ADR-0006): `TenantId` filtering is ABP-automatic but is *not* user isolation; ownership checks are the real boundary in B2C.

## 3. Data protection

| Asset | Protection |
|---|---|
| Resumes/JD files (PII-dense) | Private blob containers; presigned, short-lived download URLs issued only after ownership check; AV scan hook on upload (ClamAV container) |
| PII columns | TLS in transit; at-rest encryption at the storage layer; no PII in logs (structured-logging redaction); AI prompt redaction hook for features that don't need contact data |
| Secrets (LLM keys, OAuth client secrets) | Environment / key vault references; `ai_provider_configs.secret_ref` stores the reference name only |
| AI inputs/outputs | Usage logs store **token counts and metadata, not content** by default; content capture (debugging) is an explicit, time-boxed admin toggle with banner |
| GDPR | Export: per-module `IUserDataExporter` → zip; Erasure: `UserDataEraser` orchestration (04-database-design.md §3); DPA review before enabling any web-crawling source |

## 4. Application security

- Input validation: DTO validation (data annotations + FluentValidation where complex); file uploads: extension + magic-byte + size checks.
- Prompt injection: user content is **data**, never concatenated into system prompts; templates place user text in delimited user-role messages; extraction outputs schema-validated; generated content rendered as text (never executed/HTML-injected).
- Rate limiting: ASP.NET rate limiter — per-user buckets on AI-triggering endpoints (tighter) and global IP buckets on auth endpoints (credential stuffing).
- Standard headers: HSTS, CSP for admin portal, CORS allowlist = user-portal origin only.
- Audit: ABP audit logs on all app-service calls (actor, action, entity changes) — admin-queryable.
- Dependency hygiene: Dependabot/Renovate + `dotnet list package --vulnerable` in CI; container image scan.

## 5. Threats considered (summary)

| Threat | Mitigation |
|---|---|
| IDOR on user resources | ownership handler + ownership-filtered queries + tests per module |
| Token theft (XSS) | no tokens in storage accessible to JS; short access-token TTL; rotation + reuse detection |
| Prompt injection via resume/JD content | delimited data channeling, schema-validated outputs, no tool execution from model output in v1 |
| Cost abuse (AI amplification) | per-user quotas (features), rate limits, daily budget breaker |
| Malicious uploads | type/magic-byte/size validation, AV scan, blobs never executed/served inline |
| Scraping legal exposure | no crawling in v1; sources are AI knowledge + user-supplied links with attribution |
