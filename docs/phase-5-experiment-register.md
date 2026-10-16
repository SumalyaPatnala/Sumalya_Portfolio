# Phase 5 experiment register

Statuses: **MEASURED** · **DRY_RUN** · **BLOCKED** · **NOT RUN**. A missing score is not a hidden 0.

Inspected and executed 2026-10-08. Hardware for local work: Apple M3 Pro, 18 GiB RAM, arm64.

| ID | Repository | Goal | Configuration | Dataset | Baseline | Metrics | Expected artifacts | Status | Blockers | Source commit |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P5-R1 | `agentic-ai-infrastructure-network-intelligence` | Offline query-route eval | `classify_query` → `router()`, no API | `routing_eval_v1` N=134, SHA-256 `2615a361…` | Instruction-keyword baseline is the predictor | strict 90.3%, lenient 93.3%, macro-F1 90.6%, 13 strict misses | `evals/routing/outputs/metrics.json`, `measured_eval_v1.json` | **MEASURED** | None for this predictor. Not Gemini. | `80edad9` |
| P5-R2 | same | Live Gemini classifier on the frozen set | `gemini-2.5-flash` `process_message` + `RoutingDecision`, then `router()` | same frozen N=134 | P5-R1, same cases | same as P5-R1 plus invalid/malformed/refusal/timeout/API error, latency, tokens | `evals/routing/outputs/live_dry_run/manifest.json` | **BLOCKED** (dry-run **executed**) | Google credentials absent. `--authorize-live` not passed. Dry-run id `routing-live-dry-20261008T213821Z-d13e29f4`. | same |
| P5-S1 | `sdg-community-assistant/03_slm_finetuning_evaluation` | Re-score leaked CSV | historical `mlx_lm generate` rows | `strong_eval_results.csv` N=4 | Base Phi-3 vs LoRA | SDG/structure/safety/actionability + bootstrap on those 4 rows | `eval/outputs/strong_eval_n4_measured.json` | **MEASURED** (leaked) | Train overlap. Not held-out. | `6df0cd39` |
| P5-S2 | same | Held-out generations | Phi-3 Mini ± LoRA, MLX, `max_tokens=100`, `temp=0.0` | `eval/heldout_v1.jsonl` N=13, SHA-256 `24d257d9…`, overlap_n=0 | Base vs adapter on new prompts | SDG hit base 0.7823 vs LoRA 0.6031; structure 0.5692 vs 0.9846 | `eval/outputs/runs/slm-heldout-20261008T215806Z-67db7889/` | **MEASURED** | None for this run. N=13 is a probe set. | same (eval uncommitted on clone) |
| P5-C1 | `agentic-soc-platform` | Real BOTS v3 export through normalize → evidence → timeline | documented CLI | `data/botsv3/raw/real_export_001.json` | Repeatability of IDs/order | provenance, failed-normalize count — **not** detection accuracy | validation report | **NOT RUN** | No export file. `/Applications/Splunk/bin/splunk` exists; not queried. | `1210df3` |

Public vs private: all of the above are personal-project artifacts. No Cisco / BofA / TCS / Infosys logs.

## What was not treated as runnable

- Paid Gemini quota without `--authorize-live`.
- Splunk login or `index=botsv3` search.
- Relabeling pytest fixtures as BOTS v3.
- Pooling leaked N=4 with held-out N=13.
- Calling P5-R1 and P5-R2 a controlled model comparison (live Gemini was not scored).
