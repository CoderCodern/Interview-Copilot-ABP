# ADR-0004: AI provider abstraction — strategy pattern in an AI Core module

**Status:** Proposed
**Date:** 2026-06-11
**Deciders:** Principal architect

## Context

Six business modules need LLM capabilities (extraction, generation, conversation, embeddings). Providers: Claude, OpenAI, Gemini. Requirements: no business module may depend on a provider SDK; central usage/cost tracking; routing and fallback; streaming for mock interviews; deterministic fakes for tests.

## Decision

A dedicated **AI Core module** owns all LLM access behind small internal interfaces:

- `IAIChatCompletion` — `CompleteAsync(AIRequest): AIResult` and `StreamAsync(AIRequest): IAsyncEnumerable<AIChunk>`
- `IAIStructuredExtraction` — JSON-schema-constrained extraction (resume/JD parsing)
- `IAIEmbeddingService` — `EmbedAsync(texts, model): float[][]`
- `IAIProvider` — the **strategy** each vendor implements (`ClaudeProvider`, `OpenAIProvider`, `GeminiProvider`); capability flags (streaming, json-mode, embeddings, max context)
- `IAIRouter` — picks a provider per request from `AIProvider` config + routing policy (feature → preferred model, fallback chain, health/circuit state)

Business modules call the high-level services with a **prompt template key + variables**, never raw prompts in code. Every call writes an `AIUsageLog` row.

## Options Considered

### Option A: Own thin abstraction (chosen)
**Pros:** surface exactly fits our use cases; no framework lock-in; trivial to fake in tests; usage metering and routing are first-class.
**Cons:** we maintain provider adapters ourselves (3 × ~small files; SDKs do the heavy lifting internally).

### Option B: Microsoft.Extensions.AI / Semantic Kernel as the public abstraction
**Pros:** maintained adapters, growing ecosystem.
**Cons:** still moving fast; leaks vendor concepts into business modules; our routing/metering/template needs wrap it anyway. **Compromise:** adapters MAY use `Microsoft.Extensions.AI` internally inside AI Core — it never crosses the module boundary.

### Option C: Direct SDK use per module
**Cons:** violates the stated constraint; scatters retry/cost/routing logic. Rejected.

## Consequences

- Easier: provider swaps, A/B model tests, per-feature cost reporting, offline tests.
- Harder: new provider features (e.g., native tools) must be surfaced through our abstraction deliberately.
- Revisit: if Microsoft.Extensions.AI stabilizes as the de facto standard, collapse our adapters onto it internally (no business-module change by design).

## Action Items

1. [ ] Define contracts in `Modules.AI.Application.Contracts` (internal visibility to modules)
2. [ ] Implement ClaudeProvider first (primary), then OpenAI, then Gemini
3. [ ] Fake provider (`FakeAIProvider`) ships in the test kit from day one
