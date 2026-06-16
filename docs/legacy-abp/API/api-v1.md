# REST API v1

Base: `/api/v1` (ASP.NET API versioning, URL segment). Auth: Bearer JWT (OpenIddict). All list endpoints: `?skip=0&take=20&sorting=` (ABP paging), filtered to current user unless permission `*.ViewAll` (admin). Async operations return `202` with a status field; clients poll the resource. Errors: RFC 7807 problem details with ABP error codes.

## Conventions

| Verb | Use |
|---|---|
| POST `/...:action` style avoided — actions are sub-resources (`/analyze`, `/research`) returning 202 | long-running AI work |
| GET status fields | `parseStatus`, `analysisStatus`, `researchStatus`, `generationStatus`: `Pending / Processing / Completed / Failed` |
| Idempotency | `Idempotency-Key` header honored on POST uploads & session start |

## Auth (OpenIddict, host-level — not under /api/v1)

| Endpoint | Purpose |
|---|---|
| `POST /connect/token` | auth code + PKCE exchange; refresh token grant (rotation) |
| `GET /connect/authorize` | interactive login (user portal redirect) |
| `POST /connect/revocation` | logout / token revoke |
| `GET /api/account/external-login/google` | Google OAuth challenge (Microsoft, LinkedIn later) |
| `GET /api/v1/profile` / `PUT` | current user profile (display name, timezone, target role) |

## Resume

| Endpoint | Description |
|---|---|
| `POST /api/v1/resumes` (multipart) | upload new resume → 202, creates version 1, parsing queued |
| `GET /api/v1/resumes` | list mine (title, status, currentVersion, parseStatus) |
| `GET /api/v1/resumes/{id}` | details incl. latest version parse result |
| `DELETE /api/v1/resumes/{id}` | soft delete (+ knowledge de-index) |
| `POST /api/v1/resumes/{id}/versions` (multipart) | upload new version → 202 |
| `GET /api/v1/resumes/{id}/versions` | version history |
| `GET /api/v1/resumes/{id}/versions/{versionNo}` | version detail (skills, experiences, educations) |
| `POST /api/v1/resumes/{id}/versions/{versionNo}/reparse` | re-run parsing → 202 |
| `GET /api/v1/resumes/{id}/file?versionNo=` | presigned download |
| `GET /api/v1/career-profile` | consolidated profile |
| `PUT /api/v1/career-profile` | user edits (pins, headline, summary) |

## Job descriptions

| Endpoint | Description |
|---|---|
| `POST /api/v1/job-descriptions` | create from `{ text \| fileUpload \| sourceUrl }` → 202, analysis queued |
| `GET /api/v1/job-descriptions` · `GET /{id}` · `DELETE /{id}` | CRUD |
| `POST /api/v1/job-descriptions/{id}/analyze` | (re)analyze → 202 |
| `GET /api/v1/job-descriptions/{id}/requirements` | structured requirements |
| `POST /api/v1/job-descriptions/{id}/skill-gap` | `{ resumeId? }` (default: career profile) → 202 → analysis id |
| `GET /api/v1/skill-gap-analyses/{id}` | match score + gaps + recommendations |
| `GET /api/v1/skill-gap-analyses?jobDescriptionId=` | history for a JD |

## Company research

| Endpoint | Description |
|---|---|
| `GET /api/v1/companies?filter=` | search canonical registry |
| `GET /api/v1/companies/{id}` | company card |
| `POST /api/v1/company-research` | `{ companyId \| companyName }` → 202 (dedups to fresh research) |
| `GET /api/v1/company-research` · `GET /{id}` | my research runs, status + summary |
| `GET /api/v1/company-research/{id}/insights?type=` | insights (culture, hiring process, interview style, news…) |
| `POST /api/v1/company-research/{id}/refresh` | force re-research → 202 |

## Interview preparation

| Endpoint | Description |
|---|---|
| `POST /api/v1/interview-plans/generate` | `{ jobDescriptionId?, companyId?, targetDate, dailyMinutes }` → 202 |
| `GET /api/v1/interview-plans` · `GET /{id}` · `DELETE /{id}` | plans (items grouped by date, progress) |
| `PATCH /api/v1/interview-plans/{id}/items/{itemId}` | `{ status }` (Todo/InProgress/Done/Skipped) |
| `GET /api/v1/interview-plans/{id}/progress` | progress + per-track breakdown |
| `POST /api/v1/interview-questions/generate` | `{ jobDescriptionId?, planId?, categories[], difficulty, count }` → 202 → question ids |
| `GET /api/v1/interview-questions?category=&planId=&jobDescriptionId=` | question bank (mine) |
| `GET /api/v1/interview-questions/{id}` | question + current STAR answer |
| `POST /api/v1/interview-questions` | add own question |
| `POST /api/v1/interview-questions/{id}/star-answer/generate` | new AI draft version → 202 |
| `PUT /api/v1/interview-questions/{id}/star-answer` | save user edit (new version, `isUserEdited`) |
| `GET /api/v1/interview-questions/{id}/star-answer/versions` | version history |
| `GET /api/v1/interview-tips?planId=&category=` | tips |

## Mock interview (REST + SignalR)

REST manages history/feedback; the live conversation runs on `/hubs/mock-interview` (see 06-integration-and-jobs.md §4).

| Endpoint | Description |
|---|---|
| `POST /api/v1/mock-interviews` | create session shell `{ planId?, jobDescriptionId?, persona, questionCount }` → `sessionId` (hub connects with it) |
| `GET /api/v1/mock-interviews` | my session history (status, score, date) |
| `GET /api/v1/mock-interviews/{id}` | session detail + turns transcript |
| `GET /api/v1/mock-interviews/{id}/feedback` | rubric scores, strengths, improvements (404 until generated) |
| `POST /api/v1/mock-interviews/{id}/abandon` | terminal abandon |

## Dashboard (drives the Folio UI)

| Endpoint | Description |
|---|---|
| `GET /api/v1/dashboard/summary` | one call for the home screen: readiness `{ overall, delta7d, byTrack }`, streak `{ days, minutesToday }`, stats `{ questionsCompleted/total, studyTimeWeek, mockCount, avgMockScore }`, activePlan `{ title, dayN, totalDays, percent }`, todayFocus `{ title, lede, planItemId }` |
| `GET /api/v1/dashboard/upcoming-sessions?days=7` | scheduled plan items + planned mock sessions |
| `GET /api/v1/dashboard/recent-notes` | latest STAR drafts/tips touched |

## Knowledge

| Endpoint | Description |
|---|---|
| `POST /api/v1/knowledge/documents` | upload personal note/document → 202 (chunk+embed) |
| `GET /api/v1/knowledge/documents` · `DELETE /{id}` | my documents |
| `POST /api/v1/knowledge/search` | `{ query, sourceTypes[], topK }` → ranked chunks with sources |

## AI administration (permission-gated: admin)

| Endpoint | Description |
|---|---|
| `GET/POST /api/v1/ai/prompt-templates` · `GET /{key}` | list/create versions |
| `POST /api/v1/ai/prompt-templates/{key}/versions/{v}/activate` | atomic swap |
| `GET/PUT /api/v1/ai/providers` | provider configs (priority, models, limits; secrets as refs) |
| `GET /api/v1/ai/usage?from=&to=&groupBy=feature\|provider\|user` | usage/cost reporting (daily rollups) |
| `GET /api/v1/ai/health` | provider circuit states |

## Permissions (ABP) — naming

`InterviewCopilot.<Module>.<Entity>.<Action>`; defaults: `user` role gets own-resource CRUD on all business modules; `admin` gets `*.ViewAll` + AI administration. Resource-ownership enforced by `IUserOwnedResource` authorization handler in addition to permissions.
