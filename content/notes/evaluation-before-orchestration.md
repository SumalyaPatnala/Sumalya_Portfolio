---
title: "Evaluation before orchestration"
status: published
date: "2026-10-08"
summary: "Agents become unmeasurable the moment tool calls, retrieval, and generation share one opaque step. Split the pipeline so evaluation has an object to hold — then score citation support separately from output support."
---

A language model that calls tools is not automatically a system. It is a generator sitting on top of side effects. If those side effects are not recorded as typed objects, you cannot say whether a later prompt change helped.

The working stance is boring: **normalize, cite, then generate**. Orchestration frameworks are useful once that contract exists. They are a liability before it.

## What “an object to hold” means

Three things have to survive a run if you want to evaluate it later:

1. **Retrieval should produce passages with IDs**, not a concatenated context string that disappears into the prompt.
2. **Tool calls should produce structured results, including errors**, not a paragraph that claims the tool worked.
3. **Generation should be scored against those objects**: did the answer use a passage, and was that passage actually supporting?

On this site the SOC work encodes (1) as `EvidenceRecord`: an `evidence_id`, a normalized `SecurityEvent`, and an order. The type carries no severity and no verdict, so a later agent cannot inherit a conclusion that was never derived from the telemetry. The network-intelligence graph encodes (2) as `RoutingDecision` plus tool dicts (`status`, `ttfb_ms`, `error`). The Evaluation Workbench encodes (3) as fixture spans with `usedInAnswer` and `supported`.

None of this is frontier-scale training. It is the unglamorous layer that makes a small eval set mean something.

## Citation support is not output support

A single “groundedness” percentage will lie to you.

**Citation support** asks: among evidence spans flagged as used in the answer, what fraction is marked supported? If the model cited nothing, the metric is `n/a` — not 100%. Skipping empty citations is correct for this number. It is a coverage statistic over *used* spans.

**Output support** asks a different question: did the generated text stay inside supported evidence? It never skips a case. An answer that ignores a 503 tool result and invents an ASN scores 0, even if no used span was recorded.

The workbench fixture `ops-03` is the teaching case. The expected behavior is to surface `upstream_unavailable`. The model instead writes “Originated by AS64500 (guessed from training data).” The 503 payload sits unused and supported; the invented ASN sits used and unsupported. Citation support is 0%. Output support is 0%. A previous single metric treated “no used span” as fully grounded. That is the bug this split exists to prevent.

These percentages are still lexical labels on a fixture. They are not a live factuality model, not a public leaderboard, and not training-run telemetry.

## Failures are multi-label

Timeouts and hallucinations are not mutually exclusive. `vqa-06` in the lexical fixture both stalls past four seconds and answers from a stale 2023 region list. Counting that row as only “timeout” hides the ungrounded claim. The failure table increments both columns. Counts are of cases, not a partition of N.

If your dashboard forces a single taxonomy bucket, you will optimize the bucket you named, not the failure that shipped.

## Deterministic layers before generative ones

The SOC milestone on this site stops before LangGraph on purpose. Correlation groups by user, host, and IP only when values are present. Empty is not a join key. Timeline ordering fails if naive and timezone-aware timestamps are mixed unless the caller passes `--assume-timezone`. Kafka is local KRaft, at-least-once, with no claim of cloud delivery.

That is slower product theater than “an investigation agent.” It is the only way a later agent can be wrong about meaning without being wrong about evidence. If you attach an LLM first, every eval confound is downstream of invented timestamps.

## What this stance is not

- It is not a claim that I run frontier RL, vendor labeling platforms, reward-model production, or distributed training clusters.
- It is not a published academic result. The SFSU multimodal assistant remains an unpublished prototype.
- It is not an employer production network. A personal Cloud Run workbench is live in demo mode (API 1.4.0, classifier off). Public GitHub `main` is still the earlier ADK graph. MCP, A2A, and Vertex AI are not in source.
- It is not a statistically strong SLM paper. The Phi-3 LoRA CSV is N=4, repository-reported, with safety still at 0.50 after adaptation.

The useful claim is narrower: **evaluation needs types, traces, and failure labels that can be wrong in more than one way at once.** Orchestrate after that is true.

## How to inspect the demonstration

1. Open the Evaluation Workbench (`/lab`). The banner states the data is synthetic.
2. Compare lexical RAG with the gated hybrid fixture. Success rate, citation support, and output support are computed in `lib/workbench/metrics.ts`.
3. Open `ops-03` on the agent-ops dataset. Confirm both `tool_error` and `ungrounded`, and that output support is 0%.
4. Open `vqa-06` on vendor Q&A. Confirm timeout and ungrounded together on the lexical run.
5. Optionally parse `strong_eval_summary.csv` from the public SLM repo. The importer rejects any other header. An upload is a local parse, not a validated benchmark.

If a later version of this site imports real traces, they should arrive as the same `CaseResult` shape, with the same synthetic-versus-real label at the top of the page.
