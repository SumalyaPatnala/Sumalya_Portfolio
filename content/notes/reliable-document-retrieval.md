---
title: "Building reliable document retrieval"
status: draft
date: "2026-05-11"
summary: "Most retrieval failures are ranking and freshness failures, not embedding-model failures. Measure those first."
---

Document Q&A goes wrong in a short list of ways:

- The right passage was never retrieved.
- An outdated passage outranked the current one.
- The model answered from a passage that was retrieved but not about the question.
- The model answered from parameters and ignored retrieval entirely.

Those are different bugs. A single “accuracy” number hides which one you have.

A practical order of work:

1. Exact-match and lexical retrieval as a baseline. If BM25 already finds the clause, dense search is not the emergency.
2. Hybrid candidate generation, then a reranker, then a gate that refuses unsupported sentences.
3. Evaluation on questions that include stale documents on purpose.

Professional retrieval work I have done lives behind an employer wall. The public version of the argument is the synthetic vendor-Q&A dataset in the Lab: lexical RAG invents a backup policy; a gated hybrid run refuses to.

Draft.
