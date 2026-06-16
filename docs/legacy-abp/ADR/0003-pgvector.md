# ADR-0003: pgvector in PostgreSQL as the vector store

**Status:** Proposed
**Date:** 2026-06-11
**Deciders:** Principal architect

## Context

The Knowledge module needs embeddings storage and semantic search for RAG (resume chunks, JD chunks, company research, user notes). Expected scale: thousands of users × tens of documents × ~10–100 chunks each → low millions of vectors at most for the foreseeable future.

## Decision

Use the **pgvector** extension in the existing PostgreSQL instance. Vectors live in `knowledge.document_chunks.embedding vector(1536)` with an HNSW index, cosine distance. Access is hidden behind `IVectorStore` in the Knowledge module so the engine can be replaced.

## Options Considered

### Option A: pgvector (chosen)

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low (one extension, EF Core support via Npgsql + pgvector-dotnet) |
| Cost | Zero marginal infra |
| Scalability | HNSW handles millions of vectors with good recall; fine for our horizon |
| Team familiarity | High (it's still Postgres) |

**Pros:** transactional ingestion (chunk rows + vectors commit atomically with document state); one backup/monitoring story; metadata filtering via plain SQL `WHERE` (user_id, source_type) composes with ANN search.
**Cons:** very large scale (>10M vectors, high QPS) favors dedicated engines; index build memory must be watched.

### Option B: Dedicated vector DB (Qdrant)
**Pros:** purpose-built, better at extreme scale, richer payload filtering.
**Cons:** second stateful system to run, eventual consistency between Postgres and Qdrant, more ops for capability we don't need yet.

## Trade-off Analysis

RAG quality at our scale is dominated by chunking and prompt construction, not ANN engine choice. Operational simplicity wins; the `IVectorStore` seam caps the switching cost.

## Consequences

- Easier: ops, transactions, per-user data isolation and deletion (GDPR delete = SQL delete).
- Harder: a future migration would need a re-embedding/backfill job (acceptable; embeddings are reproducible).
- Revisit: >10M vectors, recall/latency SLO misses, or multi-region needs.

## Action Items

1. [ ] Enable `vector` extension in the EF Core migration that creates the knowledge schema
2. [ ] Define `IVectorStore` (upsert, delete-by-document, similarity query with metadata filter)
3. [ ] Benchmark HNSW params (m, ef_construction) with realistic chunk counts before phase 5 exit
