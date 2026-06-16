# 8. AI Platform Architecture

The AI platform (`Ai/` project) is the single boundary between the product and any LLM provider. Business code in the Application layer depends only on `Ai.Abstractions`; it never knows which provider or model served a request. (See ADR-0008.)

```
Application feature  ──►  IAiChatCompletion / IAiStructuredExtraction / IAiEmbeddingService
                              │
                  ┌───────────┼───────────────────────────────┐
                  ▼           ▼               ▼                 ▼
            Prompt Store   Model Registry   Metering        Resilience
            (templates     (task → model    (tokens, cost,  (timeout, retry,
             by key+ver)    routing)         latency, log)   budget guard)
                  │           │               │                 │
                  └───────────┴──────► Provider adapter ◄────────┘
                                        (OpenAI | Claude | Gemini | …)
                                        only place SDKs are referenced
```

## 8.1 Provider abstraction layer

Three capability-shaped interfaces express what the product needs, not what any vendor offers: **`IAiChatCompletion`** (conversational/generation, with streaming for the interview session), **`IAiStructuredExtraction`** (schema-constrained extraction for resume/JD parsing returning typed objects), and **`IAiEmbeddingService`** (vectors for retrieval). Each provider implements these in its own adapter under `Ai/Providers/<Vendor>/`. Adapters normalize requests and responses to common shapes, translate provider errors into a common error model, and are the *only* code referencing a vendor SDK. Advanced provider-specific features are exposed through per-provider option objects without polluting the common interface.

## 8.2 Model registry

A configurable registry maps each logical **AI task** (`ResumeParse`, `JdAnalyze`, `PrepGenerate`, `InterviewDialogue`, `FeedbackScore`, `Embed`, …) to a concrete **provider + model** plus parameters (temperature, max tokens, timeout, budget). Routing is data-driven (configuration/database, editable from the admin portal), so changing which model serves a task — or running an A/B comparison between two — requires no redeploy. The registry also records model metadata (context window, pricing per input/output token, capabilities) used by metering and cost estimation.

## 8.3 Prompt management

Prompts are **versioned templates stored by key** (`PromptKey` + `PromptVersion`), never inlined in business code (a hard rule). A template has named input variables; the prompt store renders a template with bound variables at call time. Versioning makes prompt changes reviewable, diffable, and reversible, and lets the admin portal compare versions and roll back. The catalog is documented in `docs/prompts/`. Every AI call references a prompt key, so usage records tie cost and quality back to a specific prompt version.

## 8.4 Token tracking

Every call through the platform produces an **AiUsageRecord**: timestamp, user id, task, prompt key+version, provider, model, input/output token counts, latency, and outcome (success/error/timeout). Token counts come from provider responses where available and from local estimation otherwise. Records are written asynchronously so metering never slows the user path, and they are the raw material for both per-user quota enforcement and admin analytics.

## 8.5 Cost tracking

Cost is derived from token counts × the model's registered per-token pricing, captured as a **Money** value on each usage record. This rolls up to per-user, per-task, per-model, and per-time-window cost views in the admin portal, and feeds **budget guards**: configurable limits (per user, per task, global daily) that the platform checks before/after calls and that can throttle, downgrade to a cheaper model, or block when exceeded. Cost visibility is first-class because for an AI product it is a primary operating expense and a primary product-economics signal.

## 8.6 AI task assignment & comparison

Because tasks are decoupled from models via the registry, operators can **assign** the best model per task (quality vs. cost vs. latency), **shift traffic** between models, and **compare performance** using the usage records (latency, cost, and — where a quality signal exists, e.g. user ratings or eval scores — quality per model/prompt version). This makes provider/model selection an operational dial, not a code change.

## 8.7 Reliability & adding a provider

Every call is wrapped with **timeout, retry-with-backoff, and circuit-breaking** (via the resilience defaults), and long-running generation runs as a **background job with status**, never blocking a request. Failures degrade gracefully (fallback model or queued retry) rather than erroring the whole feature where possible.

**To add a future provider:** create `Ai/Providers/<Vendor>/`, implement the capability interfaces against its SDK, register its models + pricing in the registry, add credentials to secret storage, and route chosen tasks to it. No change touches Domain, Application, or Api — the multi-provider requirement is satisfied by extension, not modification.
