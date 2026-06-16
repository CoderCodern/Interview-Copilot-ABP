# ADR-0007 — Database strategy (PostgreSQL)

**Status:** Proposed · **Date:** 2026-06-15

## Context

The product needs relational data (users, resumes, sessions, billing), semi-structured documents (parsed resume/JD JSON, AI outputs), full-text search, and **vector embeddings** for retrieval-augmented features. We also need auditing, soft delete, and a tenancy model. We want the smallest infrastructure footprint that scales a long way, accessed via EF Core.

## Decision

Use **PostgreSQL 17** as the single primary datastore via **EF Core (Npgsql)**, with **pgvector** for embeddings, `jsonb` for document-shaped data, and native full-text where needed. Organize logically by **schema-per-bounded-context** within one database. Reads use CQRS query projections (read models) against the same database; introduce read replicas only when measured read load requires it. **Redis** is the cache, rate-limit, and coordination store — not a system of record. Migrations are owned by the EF Core DbContext in Infrastructure and applied as an explicit deploy step.

## Consequences

**Positive:** one engine covers relational, document, search, and vector needs — far less to operate than Postgres + a separate vector DB + a document store; pgvector scales to millions of vectors, well beyond near-term need; schema-per-context keeps module data boundaries visible and makes future extraction cleaner; EF Core gives migrations, change tracking, and interceptors for audit/soft-delete.

**Negative / mitigations:** pgvector is not a specialized vector engine — adequate now; if recall/latency at scale demands it, the `IAiEmbeddingService`/knowledge port allows swapping the vector store without touching features. A single database is a scaling ceiling — mitigated by read replicas, connection pooling (PgBouncer), and the option to split a schema into its own database later.

**Rejected:** *Dedicated vector DB (Pinecone/Qdrant) from day one* — extra service to run and pay for before scale justifies it. *Separate databases per module now* — premature; schema-per-context gives the boundary without the operational cost. *SQL Server* — Postgres + pgvector is cheaper and covers vectors natively.
