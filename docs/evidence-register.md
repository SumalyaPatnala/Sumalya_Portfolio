# Evidence register

Maps public claims to sources. A résumé or README line is **not** enough for VERIFIED.

Categories: **VERIFIED** · **EXPERIMENTAL** · **SYNTHETIC DEMONSTRATION** · **UNVERIFIED** · **CONFIDENTIAL**

| Claim | Project | Source location | Verification method | Evidence strength | Publication safety | Missing validation | Next action | Category |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Name Sumalya Patnala | Site | Résumé, LinkedIn, GitHub | Cross-check public profiles | High | Safe | — | Keep | VERIFIED |
| San Francisco Bay Area | Site | Requested copy; LinkedIn lists Milpitas, CA | Profile vs requested framing | Medium | Safe | City-level LinkedIn string | Keep Bay Area framing | VERIFIED |
| AI Engineer, AI Incubation at Cisco via TCS (Dec 2025–present) | Experience | Résumé + LinkedIn | Consulting placement language | High | Safe if via TCS is shown | Employer-internal work | Keep consulting framing | VERIFIED |
| Bank of America AI/ML Engineer via Infosys (Mar–Nov 2025) | Experience | Résumé + LinkedIn | Consulting placement language | High | Safe if via Infosys is shown | Employer metrics | Keep consulting framing | VERIFIED |
| M.S. Business Analytics, SFSU, May 2024 | About | Résumé | Degree line | High | Safe | — | Keep | VERIFIED |
| GitHub SumalyaPatnala | Site | https://github.com/SumalyaPatnala | Public URL | High | Safe | — | Keep | VERIFIED |
| `RoutingDecision` + invalid → INCIDENT | Network intelligence | Local clone `ai_network_ops/agent.py` | Read source | High | Safe | Push if GitHub lags local clone | Keep | VERIFIED |
| Four routes; network tools DNS/HTTP/RIPEstat | Network intelligence | Same repo `network_agent.tools` | Read source | High | Safe | Atlas module not wired | Do not list Atlas as attached | VERIFIED |
| Offline routing_eval_v1 N=134, strict 90.3%, macro-F1 90.6% | Network intelligence | `evals/routing/outputs/metrics.json` after `python -m evals.routing` | Re-run harness | High for **keyword baseline**; none for Gemini | Safe; disclose predictor | Live Gemini, E2E success | Keep MEASURED label | VERIFIED |
| Gemini-2.5-flash routing accuracy | Network intelligence | `evals/routing/live.py` dry-run; env credentials ABSENT | Dry-run of schema/prompts executed; inference NOT RUN | None for model quality | Safe to describe as BLOCKED | `--authorize-live` with owned keys | Do not claim a Gemini score | UNVERIFIED |
| Live routing runner safety | Network intelligence | `tests/test_live_eval.py` | pytest: default dry-run, redaction, refuse without authorize | High | Safe | — | Keep | VERIFIED |
| MCP / A2A / Vertex for that graph | Network intelligence | Older résumé; absent from clone | Source grep | None | Unsafe to claim | Implementation | Omitted | UNVERIFIED |
| Personal Cloud Run workbench API 1.4.0 demo | Network intelligence | Live `GET /v1/health` 16 Oct 2026 | HTTP probe of hosted URL | High for version/mode; GitHub main lags | Safe if GitHub lag is disclosed | Push `feature/observability-tracing` | Claimed as personal demo | VERIFIED |
| Phi-3 Mini LoRA rank 8, 100 iters, MLX | SLM | `outputs/sdg_slm_lora/adapter_config.json` | Read config | High | Safe | — | Keep | VERIFIED |
| Base vs adapter CSV (0.75→0.92 SDG hit, N=4) | SLM | `outputs/strong_eval_*.csv` | Read CSV; compare to `data/train.jsonl` | MEASURED generations, **leaked prompts** | Safe if leakage disclosed | Held-out generations | Do not upgrade to held-out | EXPERIMENTAL |
| heldout_v1 model scores | SLM | `eval/outputs/runs/slm-heldout-20261008T215806Z-67db7889/` + bundled `content/measured/heldout_v1.json` | mlx_lm generate on frozen N=13; overlap_n=0; dataset SHA-256 `24d257d9…` | High for this run; not a leaderboard | Safe | Larger N; longer max_tokens | Keep N=13 and N=4 separate | VERIFIED |
| Token-cap hits on that run | SLM | Post-hoc regex on stored generation logs | 13/13 base, 9/11 parsed LoRA hit 100 tokens | Medium (preview clipping) | Safe | Full stdout archive | Do not call 256/512 scored | EXPERIMENTAL |
| Intelligence Within Limits | Research | `/research/intelligence-within-limits` | Page states findings not established | None | Safe as direction | Novelty check, data ingest | Keep in-development label | UNVERIFIED |
| Philosophy / How I Build | Site | `/practice` | Principles cite public artifacts | Practice, not certification | Safe | — | Keep evidence links | VERIFIED |
| Production deployment of the adapter | SLM | No host/SLA in artifacts | Negative search | None | Unsafe | Serving evidence | Not claimed | UNVERIFIED |
| `EvidenceRecord` with no verdict fields | SOC | `app/models/evidence.py` | Read source | High | Safe | — | Keep | VERIFIED |
| Milestone 5, no LLM/LangGraph | SOC | README + package layout | Read source | High | Safe | — | Keep | VERIFIED |
| BOTS v3 real-export validation | SOC | `data/botsv3/raw/.gitkeep`; `docs/VALIDATION_STATUS.md` | Directory listing; no export | None | Do not invent events | Real export + `validate_botsv3.sh` | Keep NOT RUN | UNVERIFIED |
| Fixture pytest as BOTS evidence | SOC | `tests/splunk_fixtures.py` docstrings | Read tests | Fixtures only | Unsafe if relabeled | — | Keep fixture labels | SYNTHETIC DEMONSTRATION |
| SFSU multimodal assistant | Research | Local prototypes + LinkedIn GRA | Partial | Prototype | Safe as unpublished | Frozen retrieval eval | Keep unpublished | EXPERIMENTAL |
| RLHF on academic prototype | Research | LinkedIn only | Not in inspected code | None | Unsafe | Code | Not claimed | UNVERIFIED |
| Résumé +12% source-grounded accuracy (BofA) | Retrieval | Latest résumé only | No logs in this repo | Confidential / unverified | Unsafe | Public eval | Omitted (`content-audit.md`) | CONFIDENTIAL |
| Evaluation Workbench fixture numbers | Lab | `content/workbench/runs.ts` | Code | Synthetic by construction | Safe with banner | — | Keep SYNTHETIC tab | SYNTHETIC DEMONSTRATION |
| Workbench citation vs output support formulas | Lab | `lib/workbench/metrics.ts` | Unit tests | Implemented | Safe | Not a live factuality model | Keep glossary | VERIFIED |
| Measured JSON import contract | Lab | `lib/workbench/parseMeasuredEval.ts` + bundled `routing_eval_v1.json` | Unit tests | High | Safe | — | Keep | VERIFIED |
| Published note “Evaluation before orchestration” | Notes | `content/notes/evaluation-before-orchestration.md` | File status=published | Essay | Safe as essay | — | Keep | VERIFIED |
| Other notes | Notes | `status: draft` | Frontmatter | Incomplete | Do not present as papers | Finish or keep draft | Homepage hides drafts | EXPERIMENTAL |
| Frontier RL, vendor labeling, reward-model production, training clusters | — | None | Negative search | None | Unsafe | — | Not claimed | UNVERIFIED |
