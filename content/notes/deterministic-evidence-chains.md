---
title: "Why deterministic evidence chains matter"
status: draft
date: "2026-08-29"
summary: "If two events share an IP, that is a fact. If that sharing is suspicious, that is an interpretation. Keep those layers apart."
---

Security and research both suffer when a model is asked to remember what the evidence was.

A deterministic evidence chain is a pipeline that, given the same bytes, emits the same IDs, the same grouping, and the same order. No inferred severity. No timezone invented to make sorting easier. No `null` keys treated as a join.

That sounds like pedantry until you try to evaluate an investigation agent. If correlation is stochastic, you cannot tell whether the agent improved or whether the evidence shuffle changed.

The SOC platform on this site encodes that split: `EvidenceRecord` wraps a normalized event and adds only provenance. Correlation uses literal field values. Timeline ordering refuses to compare naive and aware timestamps without an explicit assumption.

Language models can come later. They should cite `evidence_id` values. If they cannot, the failure is groundedness, not style.

Draft.
