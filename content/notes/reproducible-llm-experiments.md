---
title: "Reproducible LLM experiments"
status: published
date: "2026-10-08"
summary: "If you cannot name the dataset version, the predictor, and the metric code, you do not have an experiment. You have a session. A blocked run is still an experiment if the blocker is named."
---

Reproducibility for LLM work is less about random seeds than about **what was actually run**.

The minimum bundle next to a result:

1. Dataset identity, N, and a content hash.
2. Predictor identity (model, prompt version, decoding, or “keyword baseline”).
3. Metric functions in source, not in a slide.
4. Per-example outputs, not only means.
5. Runtime (hardware, SDK versions) when latency is reported.
6. Status: MEASURED, DRY_RUN, BLOCKED, or NOT RUN — never a blank that looks like success.

Remote Gemini is not bitwise reproducible. A keyword baseline composed with `router()` is. Those facts belong in the same manifest, not in different blog posts.

On this site the offline routing eval ships `dataset_sha256`, `source_commit`, and a MEASURED JSON contract. The live Gemini runner defaults to dry-run and refuses `--mode full` without `--authorize-live` and without printing credentials. The SLM held-out file is frozen at N=13; run `slm-heldout-20261008T215806Z-67db7889` is MEASURED and shows the adapter losing SDG hit rate while gaining structure. None of that is a leaderboard. It is the difference between a session and an experiment.

The Evaluation Workbench still keeps SYNTHETIC fixtures in a separate tab. Importing a MEASURED JSON artifact does not require a new UI — only a file that matches `measured-eval-v1`.
