---
title: "Design principles for researcher-facing tools"
status: draft
date: "2026-04-20"
summary: "Researchers do not need another chat box. They need comparison, traces, and a place to disagree with the metric."
---

Interfaces for research work keep collapsing into chat. Chat is a reasonable input method and a poor analysis method.

What I try to put on the first screen instead:

- Which dataset and which configuration, as named objects.
- A comparison, not a single score.
- A way to open one failure and see the trace.
- The formula for every metric, in the same view as the number.
- An explicit banner when the data is synthetic, incomplete, or unpublished.

The Evaluation Workbench is a public sketch of that UI. It is not connected to live models. That is the point: a recruiter can operate it offline, and a later import path can reuse the same types.

A researcher-facing tool should make it easy to say “this number is wrong.” If the UI cannot survive that sentence, it is a demo.

Draft.
