# 10. Observability

Observability is wired once, centrally, in **ServiceDefaults**, and inherited by every service. The instrumentation API is **OpenTelemetry**, exported over **OTLP**; the backend is the Aspire dashboard in dev and a swappable OTLP-compatible backend in prod. (See ADR-0010.)

## 10.1 OpenTelemetry

OpenTelemetry is the unified API for **traces, metrics, and logs**, configured in one place so no feature wires telemetry by hand. Auto-instrumentation covers ASP.NET Core, HttpClient, EF Core/Npgsql, and Redis; the AI platform adds manual spans/metrics for provider calls. Because everything emits OTLP, the visualization backend is a deployment choice (managed APM, or self-hosted Grafana + Tempo + Loki + Prometheus) and can change without touching code.

## 10.2 Logging

Structured logging via **Serilog**, bridged into the OpenTelemetry pipeline so every log line carries `trace_id`/`span_id` and correlates with the trace it came from. Logs are structured (key-value, not string-interpolated), level-disciplined (no info-level PII, prompts, or secrets), and enriched with request, user (id only), and environment context. ProblemDetails responses and log entries share correlation ids so a user-reported error maps to its trace.

## 10.3 Metrics

Beyond framework metrics (request rate, latency histograms, error rate, DB/Redis timings), the system emits **product- and AI-specific metrics**: AI calls per task/model, token consumption, cost per call/task/window, AI latency and timeout/error rates, background-job queue depth and processing time, and business counters (analyses run, sessions completed). Metric label cardinality is kept bounded (no raw user ids as labels) to control cost. These metrics drive both alerting and the admin portal's usage/cost dashboards.

## 10.4 Tracing

Distributed traces follow a request **frontend → API → Application handler → database/Redis → AI provider**, so latency is attributable leg-by-leg — essential when an AI provider is the slow component. Trace context propagates across the SignalR interview stream and into background jobs (linking the enqueue span to the processing span). Sampling balances cost against fidelity (e.g. tail-based or ratio sampling with always-on for errors).

## 10.5 Health checks

Each service exposes the ServiceDefaults endpoints: **`/alive`** (liveness — the process is up) and **`/health`** (readiness — dependencies like Postgres and Redis are reachable). Orchestrators/containers use these for startup, restart, and traffic-gating decisions. Dependency health checks are lightweight and time-bounded so a slow dependency doesn't make the health endpoint itself hang.

## 10.6 How ServiceDefaults is used

ServiceDefaults is the **single integration point**: a service calls `AddServiceDefaults()` at startup to register OpenTelemetry (traces/metrics/logs + OTLP exporter), health checks, HTTP resilience (retry/circuit-breaker/timeout), and service discovery, then `MapDefaultEndpoints()` to expose health routes. This guarantees every current and future service is observable, resilient, and probeable identically, and concentrates all Aspire/OTel-specific wiring in one upgrade-friendly place. Feature and Application code never reference OpenTelemetry directly except to emit a domain-specific span/metric through a thin abstraction.
