# Phase 5 changelog

Closing real evaluation gaps. No portfolio rebuild. No fabricated scores.

## Executed

- **P5-R1** already MEASURED (keyword baseline → `router()`, N=134). Left intact.
- **P5-R2** live runner implemented; dry-run executed on frozen N=134. Credentials absent. Full inference **not authorized**.
- **P5-S2** held-out generations **executed** on Apple M3 Pro with project `.venv` (`mlx` 0.32.3, `mlx_lm` 0.32.0, cached `microsoft/Phi-3-mini-4k-instruct`, LoRA `outputs/sdg_slm_lora`, adapters SHA-256 `9b4df626…`). Run `slm-heldout-20261008T215806Z-67db7889`. Wall time ~358 s for 13×2 generations.
- **P5-C1** rechecked: BOTS v3 still **NOT RUN**.

## Held-out results (do not pool with N=4)

| Model | SDG hit | Structure | Safety lexicon | Actionability lexicon | Latency |
| --- | ---: | ---: | ---: | ---: | ---: |
| Base Phi-3 | 0.7823 | 0.5692 | 0.1538 | 0.2562 | 13.6908 s |
| Fine-tuned Phi-3 LoRA | 0.6031 | 0.9846 | 0.3846 | 0.6154 | 13.7085 s |

LoRA lost gold SDG recall and gained format/lexicon scores. Complete misses: ho-009, ho-010 (malformed `SDG 1.5`). Confounder: `max_tokens=100`.

## Implementation

- Routing: `evals/routing/live.py` default dry-run; `--authorize-live` required; secrets redacted.
- SLM: `eval/preflight.py`, `eval/manifest.py`, immutable `eval/outputs/runs/<runId>/`, refuse overwrite of MEASURED artifacts.
- Portfolio Workbench: bundled routing **and** heldout_v1 MEASURED artifacts; kinds are not pooled.
- Case study and experiment register updated only where artifacts exist.

## Not done

- Gemini live scores.
- BOTS v3 ingestion.
- Human ratings.
- Higher `max_tokens` ablation.
