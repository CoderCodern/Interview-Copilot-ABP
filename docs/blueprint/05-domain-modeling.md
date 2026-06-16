# 6. Domain Modeling

> Concepts only — no code, no schema. This identifies bounded contexts, aggregate roots, supporting entities, and value objects, and the rules that govern them.

## 6.1 Bounded contexts

The domain divides into contexts that map to Application feature groups and database schemas. Each owns its data and exposes behavior to others only through the Application layer (never by reaching into another context's internals).

| Context | Responsibility |
|---------|----------------|
| **Identity & Access** | Users, credentials, roles, sessions/refresh tokens, social-login links |
| **Resume** | Uploaded resumes, parsed structured profile, resume analysis results |
| **Job Description** | Uploaded/entered JDs, parsed requirements, JD analysis, resume↔JD skill-gap |
| **Interview Preparation** | Prep plans, generated question sets, model/STAR answers, readiness scoring |
| **Interview Session** | Live mock-interview sessions, turn-by-turn transcript, real-time streaming |
| **Feedback** | AI-generated feedback/scoring on practice answers and sessions |
| **Billing & Subscription** | Plans, subscriptions, entitlements, usage quotas, invoices |
| **AI Platform** | Providers, model registry, prompt templates, usage/cost records (see doc 7) |
| **Admin & Analytics** | Operator views over the above; feature flags; aggregate analytics |

## 6.2 Core aggregates

An **aggregate** is a consistency boundary loaded and saved as a unit; only its root is referenced from outside.

- **User** (Identity) — root holding profile, role assignments, and credential/social-link children; owns invariants like unique email and valid role set. Refresh tokens are a child collection (or a closely-related aggregate) with rotation/revocation rules.
- **Resume** (Resume) — root owning the uploaded file reference, parse status, and the structured **CareerProfile** (work history, education, skills). Invariant: a resume belongs to exactly one user; analysis can't run until parsing succeeds.
- **JobDescription** (Job Description) — root owning the raw text/file, parsed requirements, and analysis. May reference a Resume to produce a **SkillGap** projection.
- **PreparationPlan** (Interview Preparation) — root owning generated question sets, suggested STAR answers, and a readiness score; tied to a user and optionally a JD.
- **InterviewSession** (Interview Session) — root owning ordered **Turn** entities (question, candidate answer, AI follow-up), session status, and timing. Streams in real time; the transcript is the durable record.
- **Feedback** (Feedback) — root attaching scored, dimensioned feedback to a session or a practice answer.
- **Subscription** (Billing) — root owning the active plan, billing period, entitlements, and usage counters; enforces quota invariants.
- **AiUsageRecord** / **PromptTemplate** / **ModelRegistration** (AI Platform) — see doc 7.

## 6.3 Supporting entities

Entities that have identity and lifecycle but live **inside** an aggregate: `WorkExperience`, `EducationItem`, `SkillItem` (within CareerProfile); `Requirement` (within JobDescription); `Question`, `StarAnswer` (within PreparationPlan); `Turn` (within InterviewSession); `RoleAssignment`, `SocialLogin`, `RefreshToken` (within/around User); `UsageCounter`, `Entitlement` (within Subscription).

## 6.4 Value objects

Immutable, equality-by-value, making illegal states unrepresentable: **Email**, **PasswordHash**, **FullName**; **FileReference** (storage key + content type + size); **SkillTag**; **MatchScore** / **ReadinessScore** (bounded 0–100); **Money** (amount + currency) and **TokenCount** for AI cost/usage; **DateRange** (employment/billing periods); **ProviderModelRef** (provider + model id); **PromptKey** + **PromptVersion**; **SessionStatus** / **ParseStatus** / **AnalysisStatus** as explicit state types.

## 6.5 Domain events

Aggregates raise events (dispatched after persistence by an EF interceptor) to trigger cross-context, idempotent reactions without direct coupling: `ResumeUploaded` → enqueue parse job; `ResumeParsed` → enable analysis; `AnalysisRequested` → enqueue AI analysis; `InterviewSessionCompleted` → enqueue feedback generation; `SubscriptionUsageExceeded` → gate AI features; `AiCallCompleted` → record usage/cost. Events carry ids and minimal facts, not entity graphs; handlers must be idempotent.

## 6.6 Cross-context rules

Contexts reference each other only by **id** and only through Application-layer contracts — e.g. Interview Preparation references a JobDescription by id, never by loading its EF entity. Slow, externally-dependent work (parsing, analysis, generation) is always a **background job with a status field**, never inline in a request. Every user-owned aggregate carries an owner id and is subject to an ownership check in addition to role/permission checks.
