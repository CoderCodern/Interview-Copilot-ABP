# ADR-0010 — Observability strategy

**Status:** Proposed · **Date:** 2026-06-15

## Context

An AI product has variable, externally-dependent latency and real per-request cost. We need to see traces (including the AI call leg), metrics (latency, error rate, tokens, cost), and structured logs from day one — for a solo developer first, and for production operability later. We must avoid vendor lock-in on the telemetry pipeline.

## Decision

Standardize on **OpenTelemetry** as the instrumentation API for traces, metrics, and logs, exported via **OTLP**. All wiring lives in **ServiceDefaults** (per ADR-0004) so every service is instrumented identically by calling one extension method. Use **Serilog** for structured logging bridged into the OpenTelemetry pipeline (so logs carry trace/span ids and correlate with traces). In development, the **Aspire dashboard** is the telemetry surface; in production, export OTLP to a backend chosen later (e.g. a managed APM or Grafana/Tempo/Loki/Prometheus stack) — swappable because everything speaks OTLP. Expose **health-check endpoints** (`/health` readiness, `/alive` liveness). Add **AI-specific spans and metrics** (provider, model, task, tokens, cost, latency) emitted by the AI metering component.

## Consequences

**Positive:** consistent, correlated telemetry across services with near-zero per-feature effort; OTLP keeps the backend swappable (no lock-in); AI cost/usage is observable as first-class metrics feeding the admin portal; health endpoints enable container/orchestrator probes. Trace context flows from frontend → API → AI provider for end-to-end latency attribution.

**Negative / mitigations:** telemetry volume and cost can balloon — mitigated by sampling traces, choosing metric cardinality carefully (avoid high-cardinality labels like raw user ids), and log-level discipline; running an OTLP backend is operational overhead — mitigated by starting with the Aspire dashboard in dev and a managed backend in prod. Sensitive data could leak into logs/spans — mitigated by redaction policies and never logging prompts/PII at info level.

**Rejected:** *Vendor-specific SDK instrumentation* — locks the pipeline to one APM. *Logs-only observability* — blind to latency attribution and cost, which are central for an AI product.
