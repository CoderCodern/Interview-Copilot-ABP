# ADR-0008 — AI integration strategy

**Status:** Proposed · **Date:** 2026-06-15

## Context

The product depends on LLMs across several tasks (resume/JD analysis, prep generation, mock-interview dialogue, feedback). Multiple providers (OpenAI, Claude, Gemini, future models) must be supported, with the ability to assign models to tasks, track token usage and cost, and compare performance. We must avoid coupling business logic to any vendor SDK and avoid uncontrolled cost/latency.

## Decision

Introduce a dedicated **AI platform layer** (`Ai/`) exposing capability-shaped abstractions — `IAiChatCompletion`, `IAiStructuredExtraction`, `IAiEmbeddingService` — that the Application layer depends on. Concrete provider adapters (OpenAI, Claude, Gemini) live in `Ai/Providers/` and are the **only** code that references a provider SDK. A **model registry** maps logical AI **tasks** to concrete provider+model choices (configurable, hot-swappable). A **prompt store** holds versioned templates referenced by **key** — no inline prompts in business code. A **metering** component records tokens, cost, latency, provider, model, and task for every call, enforces budgets/timeouts, and feeds admin monitoring.

## Consequences

**Positive:** swapping or adding a provider is a registry + adapter change, never a feature change; task→model routing lets you send each task to the cheapest adequate model and A/B compare; centralized metering makes cost and usage observable and capped; versioned prompts make AI behavior reviewable and reversible; structured-extraction abstraction keeps parsing deterministic.

**Negative / mitigations:** the capability abstraction is a lowest-common-denominator over differing provider features — mitigated by per-provider option objects and provider-specific adapters for advanced features, while keeping the common interface stable; an extra layer adds indirection — justified by the multi-provider requirement and cost governance. Provider response shapes drift — isolated to adapters.

**Adding a future provider:** implement the capability interfaces in a new `Ai/Providers/<Vendor>/` adapter, register its models in the registry, add credentials to secret storage, and route selected tasks to it — no changes in Application, Domain, or Api.

**Rejected:** *Calling provider SDKs directly from features* — vendor lock-in, scattered prompts, no central cost control. *A single hardcoded provider* — fails the multi-model requirement.
