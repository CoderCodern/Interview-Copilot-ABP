# Domain Model

Conventions: every aggregate root extends `FullAuditedAggregateRoot<Guid>` and implements `IMultiTenant`; user-owned roots also implement `IUserOwnedResource { Guid UserId }` (authorization filter). Children are `FullAuditedEntity<Guid>`. Ids are GUID v7 (time-ordered, index-friendly). Enums live in each module's `Domain.Shared`.

## 1. Aggregate overview

```mermaid
classDiagram
    direction LR

    class Resume {
        <<aggregate root>>
        UserId
        Title
        Status: ResumeStatus
        AddVersion()
        ApplyParseResult()
    }
    class ResumeVersion {
        VersionNumber
        BlobName
        MimeType
        RawText
        ParseStatus
    }
    class ResumeSkill { Name; Category; Proficiency; Years }
    class ResumeExperience { Company; Title; Period: DateRange; Highlights }
    class ResumeEducation { Institution; Degree; Period: DateRange }
    Resume "1" *-- "1..10" ResumeVersion
    ResumeVersion "1" *-- "*" ResumeSkill
    ResumeVersion "1" *-- "*" ResumeExperience
    ResumeVersion "1" *-- "*" ResumeEducation

    class CareerProfile {
        <<aggregate root>>
        UserId (unique)
        Headline
        Summary
        TotalYears
        Skills: ProfileSkill[]
        MergeFromResume()
    }

    class JobDescription {
        <<aggregate root>>
        UserId
        CompanyId?
        Title
        RawText
        Seniority
        AnalysisStatus
    }
    class JobRequirement { Type; SkillName; Description; Importance }
    JobDescription "1" *-- "*" JobRequirement

    class SkillGapAnalysis {
        <<aggregate root>>
        UserId
        JobDescriptionId
        ProfileSnapshot (VO)
        MatchScore: Score
    }
    class SkillGap { SkillName; RequiredLevel; CurrentLevel; Severity; Recommendation }
    SkillGapAnalysis "1" *-- "*" SkillGap

    class Company {
        <<aggregate root>>
        Name; Website; Industry; Size
        (host-level, shared)
    }
    class CompanyResearch {
        <<aggregate root>>
        UserId
        CompanyId
        Status; Summary
    }
    class CompanyInsight { Type; Title; Content; Sources; Confidence }
    CompanyResearch "1" *-- "*" CompanyInsight
    CompanyResearch --> Company : references

    class InterviewPlan {
        <<aggregate root>>
        UserId
        JobDescriptionId?
        CompanyId?
        TargetDate
        Status
        Progress() computed
    }
    class InterviewPlanItem { Order; ScheduledDate; Track; Title; DurationMin; Status }
    InterviewPlan "1" *-- "*" InterviewPlanItem

    class InterviewQuestion {
        <<aggregate root>>
        UserId
        Category; Difficulty
        Text; Source
    }
    class StarAnswer { Version; Situation; Task; Action; Result; IsUserEdited }
    InterviewQuestion "1" *-- "0..*" StarAnswer

    class InterviewSession {
        <<aggregate root>>
        UserId
        Mode; Persona (VO)
        Status: SessionStatus
        Start() AppendTurn() Complete()
    }
    class InterviewTurn { Order; QuestionText; AnswerText; TurnScore?; TurnFeedback? }
    class InterviewFeedback { Rubric (VO); OverallScore; Strengths; Improvements }
    InterviewSession "1" *-- "*" InterviewTurn
    InterviewSession "1" *-- "0..1" InterviewFeedback

    class KnowledgeDocument {
        <<aggregate root>>
        UserId?
        SourceType; SourceId
        Status: IndexStatus
    }
    class DocumentChunk { ChunkIndex; Text; TokenCount; Embedding: vector }
    KnowledgeDocument "1" *-- "*" DocumentChunk

    class PromptTemplate {
        <<aggregate root>>
        Key (unique) ; Version; IsActive
        Body; Variables; ModelHints
    }
    class AIProviderConfig {
        <<aggregate root>>
        Name; Enabled; Priority
        Models; SecretRef
    }
    class AIUsageLog {
        <<append-only root>>
        UserId?; Feature; Provider; Model
        Tokens: TokenUsage (VO); LatencyMs; Status
    }
```

## 2. Aggregates, invariants, transaction boundaries

| Aggregate (module) | Key invariants | Transaction boundary notes |
|---|---|---|
| `Resume` (Resume) | ≤ 10 versions; only latest version parseable; version numbers contiguous; parse children belong to exactly one version; parse result replaces children of that version atomically | Upload = 1 tx (root + version). Parse apply = 1 tx (children + status + event). Skills/experiences are *parse output* → attached to version, not root, so re-parses never corrupt history |
| `CareerProfile` (Resume) | One per user (unique UserId); merge never deletes user-pinned skills; `TotalYears` derived from experiences | Merge from parse = 1 tx; conflict policy: user edits win over AI merges |
| `JobDescription` (JD) | RawText required; requirements only when `AnalysisStatus = Completed`; re-analysis replaces requirements atomically | Create = 1 tx; analysis apply = 1 tx |
| `SkillGapAnalysis` (JD) | Immutable after creation (snapshot semantics — re-run produces a new analysis); references JD by id, embeds profile snapshot as VO | 1 tx; never updated, only superseded |
| `Company` (Company) | Unique normalized name; host-level (TenantId null, no UserId) | Reference data; upsert by normalized name |
| `CompanyResearch` (Company) | One active (non-stale) research per (user, company); insights immutable once research `Completed`; staleness = 30 days | Request = 1 tx; completion (insights + status + event) = 1 tx |
| `InterviewPlan` (Prep) | Items ordered, scheduled within plan window; `Progress = completed/total`; ≤ 1 `Active` plan per (user, JD) | Generation writes root + items in 1 tx; item status change = 1 tx + `PlanItemCompletedEto` |
| `InterviewQuestion` (Prep) | StarAnswer versions monotonic; ≤ 20 answer versions; user edit sets `IsUserEdited`, AI regeneration creates new version (never overwrites user text) | Batch generation = N roots in one UoW (acceptable: creation-only, no cross-root invariant) |
| `StudyActivity` (Prep) | Append-only; (UserId, Date, Source) granularity | Single-row inserts |
| `ReadinessSnapshot` (Prep) | Recomputed, idempotent per (UserId, Date); score 0–100 with per-track breakdown | Upsert per day |
| `InterviewSession` (Mock) | State machine `Created→InProgress→Completed\|Abandoned`; turns append-only with contiguous Order; no turns after terminal state; feedback only in terminal state | Each turn append = 1 small tx (resilient to disconnects); completion = 1 tx + event |
| `KnowledgeDocument` (Knowledge) | Chunks immutable per index generation; re-index swaps chunk set atomically; (SourceType, SourceId, IndexVersion) unique | Chunk batch upsert per document = 1 tx |
| `PromptTemplate` (AI) | (Key, Version) unique; exactly one active version per key; published versions immutable | Activate new version = 1 tx (deactivate old + activate new) |
| `AIProviderConfig` (AI) | Secrets stored as references (env/key-vault), never plaintext | Admin-only writes |
| `AIUsageLog` (AI) | Append-only; always written even when the AI call fails | Written in the caller's UoW where possible; fire-and-forget fallback on stream abort |

## 3. Value objects

| Value object | Shape | Used by |
|---|---|---|
| `Score` | int 0–100, validated | SkillGapAnalysis.MatchScore, feedback scores, readiness |
| `DateRange` | start, end?, `Overlaps()`, `TotalMonths()` | ResumeExperience, ResumeEducation |
| `SkillName` | normalized string (casing/trim, canonical alias map) | ResumeSkill, JobRequirement, SkillGap — makes gap matching deterministic |
| `SkillLevel` | enum-backed (None/Basic/Working/Strong/Expert) + years | ProfileSkill, SkillGap |
| `ProfileSnapshot` | frozen JSON of career profile at analysis time | SkillGapAnalysis |
| `InterviewerPersona` | style (Friendly/Neutral/Bar-raiser), seniority, focus areas | InterviewSession |
| `FeedbackRubric` | per-dimension `Score`s: Communication, Structure(STAR), TechnicalDepth, Relevance, Confidence | InterviewFeedback, per-turn feedback |
| `TokenUsage` | inputTokens, outputTokens, cachedTokens, cost(decimal) | AIUsageLog |
| `PromptVariables` | dictionary + declared-variable validation against template | AI Core rendering |
| `ChunkRef` | documentId + chunkIndex + similarity | RAG context results |
| `SourceAttribution` | url/title/retrievedAt list | CompanyInsight.Sources |

## 4. Domain services

| Service | Module | Responsibility |
|---|---|---|
| `CareerProfileMerger` | Resume | Merge parse results into profile (user-edit precedence rules) |
| `SkillMatcher` | JD | Deterministic skill normalization + matching before AI scoring (cheap pass first) |
| `PlanScheduler` | Prep | Distribute generated plan items across calendar window honoring target date and daily-load cap |
| `ReadinessCalculator` | Prep | Weighted score from track progress, mock scores trend, streak, coverage |
| `SessionConductor` | Mock | Orchestrates turn lifecycle: next-question selection (plan-driven or adaptive), persona application; calls AI Core; pure domain logic separated from hub transport |
| `Chunker` | Knowledge | Deterministic text → chunks (by structure, token budget, overlap) |

## 5. Domain events (internal ETOs)

`ResumeVersionCreatedEto`, `ResumeParsedEto`, `ResumeParsingFailedEto`, `CareerProfileUpdatedEto`, `JobDescriptionAnalyzedEto`, `SkillGapAnalyzedEto`, `CompanyResearchCompletedEto`, `CompanyResearchFailedEto`, `PlanGeneratedEto`, `PlanItemCompletedEto`, `StarAnswerDraftedEto`, `MockSessionCompletedEto`, `DocumentIndexedEto`.

Payload rule: ids + minimal facts (status, scores) only. Consumers fetch details via contracts. Handlers idempotent (keyed on source id + event type).

## 6. Deviations from the brief (deliberate)

| Brief said | Design does | Why |
|---|---|---|
| Entities `ResumeSkill/Experience` under Resume | Attached to `ResumeVersion` | Parse results are per-version facts; protects history across re-uploads |
| No STAR answer entity listed | `StarAnswer` child of `InterviewQuestion`, versioned | STAR generation is a first-class feature; versioning protects user edits |
| `InterviewAnswer` entity | Named `InterviewTurn` | A turn holds question + answer + per-turn feedback; clearer for a conversational model |
| `EmbeddingRecord` entity | `DocumentChunk` with embedding column | Chunk text and its vector are one fact; separate tables buy nothing in pgvector |
| `SearchIndex` entity | `SearchIndexConfig` | Real ANN index is a Postgres HNSW index; the entity tracks model/dimensions/generation for re-index migrations |
| `AIProvider` entity | `AIProviderConfig` | The provider is code (strategy); the entity is its configuration |
| — | Added `StudyActivity`, `ReadinessSnapshot`, `ResumeEducation` | Required by the dashboard (streak, study time, readiness ring) and complete profiles |
