# Phase 4 changelog

Source of truth: Phase 3 review (81/100). Scope was improvement of the existing site plus evaluation harnesses in related source repositories. Not a rebuild.

Related repositories identified and used (not unrelated trees):

- `/Users/sumalyapatnala/GCP/agentic-ai-infrastructure-network-intelligence`
- `/Users/sumalyapatnala/sdg-community-assistant/03_slm_finetuning_evaluation`
- `/Users/sumalyapatnala/SOC/agentic-soc-platform`

## 4A — Evidence matrix

`docs/evidence-register.md` is now an 8-column matrix (claim, project, source, verification method, strength, publication safety, missing validation, next action) with categories VERIFIED / EXPERIMENTAL / SYNTHETIC DEMONSTRATION / UNVERIFIED / CONFIDENTIAL.

Résumé and README lines were not treated as VERIFIED on their own. BOTS v3 validation and Gemini routing remain UNVERIFIED. Workbench fixtures remain SYNTHETIC DEMONSTRATION. The leaked SLM CSV is EXPERIMENTAL (measured generations, train overlap).

## 4B — Routing evaluation

In the network-intelligence clone:

- Added unweighted **macro-F1** to `evals/routing/metrics.py`.
- Re-ran `./venv/bin/python -m evals.routing`.
- Exported `evals/routing/outputs/measured_eval_v1.json` (MEASURED import contract).
- Copied that artifact to `content/measured/routing_eval_v1.json`.

Executed result (keyword baseline → `router()`, **not Gemini**, not production traffic):

| Measure | Value |
| --- | --- |
| N | 134 |
| Strict accuracy | 0.903 |
| Lenient accuracy | 0.9328 |
| Macro-F1 | 0.9062 |
| Strict misses | 13 |
| Tool-selection Jaccard | 0.9611 on 30 NETWORK cases |
| Router contract | 16/16 × 3 repeats, determinism 1.0, query preservation 1.0 |

These four are not conflated: router correctness, query-route correctness, tool-selection Jaccard, tool-execution / end-to-end success (the last is **not measured**).

`./venv/bin/pytest tests/test_router.py tests/test_routing_eval.py`: **14 passed**.

## 4C — SLM evaluation

Did **not** invent held-out generations. Documented train/test leakage: `strong_eval.py` prompts paraphrase `data/train.jsonl`.

- Frozen `eval/heldout_v1.jsonl` (N=13), no train/valid containment overlap (`python3 -m eval.check_leakage`: overlap_n=0).
- `python3 -m eval.run_eval --from-csv` recomputed bootstrap CIs on the leaked N=4 CSV (2000 resamples, seed 0). Adapter SDG-hit mean 0.9175, 95% interval 0.7525–1.0. **Not a significance test.**
- `python3 -m eval.run_eval --heldout`: **PENDING** (`mlx_lm` import failed on this machine).
- `python3 -m eval.test_eval`: **4 passed**.

Portfolio title remains **SLM Fine-Tuning & Evaluation**. No production-deployment claim.

## 4D — Agentic SOC

`docs/VALIDATION_STATUS.md` records **BOTS v3 validation NOT RUN**.

- `data/botsv3/raw/` only `.gitkeep`
- `splunk` CLI not on PATH
- No fabricated events

`./.venv/bin/pytest` on schema/normalizer/timeline/correlation/validation/health: **146 passed**. Fixtures stay labelled fixtures.

## 4E — Evaluation Workbench

Existing Workbench kept. Added a **Result source** control:

- **SYNTHETIC** — previous fixtures, citation vs output support, URL state. Banner unchanged.
- **MEASURED** — bundled `routing_eval_v1`, run metadata, confusion, per-class F1, 13 strict-miss examples, known limitations, JSON file + paste import.

Import contract: `schemaVersion: measured-eval-v1`, provenance MEASURED. SYNTHETIC provenance, bad JSON, incomplete routing matrices, and n/confusion mismatches are rejected. Synthetic and measured numbers are never averaged. Comparison is allowed only for the same kind and dataset version.

## 4F — Case studies

Deepened the three evidence-bearing projects (routing, SLM, SOC): constraints, actual wired tools vs Atlas-not-attached, four routing measures, leakage, pending held-out, BOTS blocker. No generic “scalable platform” language added.

## 4G — Homepage

Positioning line is exactly:

> I build AI systems that are measurable, reliable, and useful.

First viewport: name, Cisco via TCS, engineering strengths, inspectable `RoutingDecision` + `routing_eval_v1` (N=134, not Gemini), Workbench MEASURED link. Homepage notes list **published** essays only.

## 4H — Visual

- Mobile hero kicker is a single line: `AI Engineer · Bay Area` (`sm+` keeps the long kicker).
- Router diagram stacks at `< md` (320 viewBox) so 390px labels are readable; Playwright overflow check still passes.
- Captions and table captions moved from `text-fg-faint` to `text-fg-muted` on diagrams, routing tables, and SLM tables.
- Draft notes remain drafts, labelled on `/notes`, omitted from the homepage.

## 4I — Tests (executed)

| Check | Result |
| --- | --- |
| ESLint | passed |
| TypeScript | passed |
| Vitest | **29 passed** (was 18) |
| Playwright Chromium | **20 passed** (was 14) |
| `next build` | passed (29 routes) |
| Routing pytest (clone venv) | 14 passed |
| SLM `eval.test_eval` | 4 passed |
| SOC unit pytest (clone venv) | 146 passed |

New coverage: measured JSON validation, SYNTHETIC rejection, comparable-run rules, mobile kicker, MEASURED tab, draft-note hiding, homepage positioning line.

Screenshots: `docs/screenshots/phase-4/` (1440 and 390: home, measured lab, routing case study).

## 4J — Reproducibility

Portfolio:

```bash
cd "Sumalya Patnala Portfolio"
npm run lint && npm run typecheck && npm test && npx playwright test --project=chromium && npm run build
```

Routing (offline, no API key):

```bash
cd agentic-ai-infrastructure-network-intelligence
./venv/bin/python -m evals.routing
./venv/bin/pytest tests/test_router.py tests/test_routing_eval.py
```

SLM (no GPU required for leakage/CSV):

```bash
cd sdg-community-assistant/03_slm_finetuning_evaluation
python3 -m eval.check_leakage
python3 -m eval.run_eval --from-csv
python3 -m eval.run_eval --heldout   # prints PENDING without mlx_lm
python3 -m eval.test_eval
```

SOC:

```bash
cd agentic-soc-platform
./.venv/bin/pytest tests/test_evidence.py tests/test_splunk_normalizer.py tests/test_timeline.py tests/test_correlation.py tests/test_validation.py
# BOTS: follow docs/botsv3-validation.md only after a real export exists
```

## Remaining blockers

1. **Gemini-2.5-flash routing accuracy** — default runner still refuses `--live-classifier`. Do not report 90.3% as model quality.
2. **End-to-end specialist success and live tool success** — not in the MEASURED artifact. Inference has no GPU tools; Atlas is not on `network_agent.tools`.
3. **SLM heldout_v1 generations** — adapter config exists; `mlx_lm` was not available here. Scores stay PENDING.
4. **BOTS v3 real export** — not in `data/botsv3/raw`. Validation has not happened.
5. **SFSU retrieval eval** — still no frozen public harness. Résumé lifts stay omitted.
6. **Frontier RL / reward models / vendor labeling / training clusters** — still absent. Not claimed.

## Seven-criteria assessment

Same categories as Phase 3.

| Criterion | Phase 3 | Now | Note |
| --- | --- | --- | --- |
| Visual design | 12/15 | **13/15** | Mobile kicker no longer wraps; stacked router diagram; caption contrast. Residual draft notes and faint mono labels remain. |
| Homepage 30s review | 12/15 | **13/15** | Exact positioning line, Cisco-via-TCS, inspectable routing eval, MEASURED Workbench link in the first screen. |
| Featured-project evidence | 18/20 | **19/20** | N=134 MEASURED routing eval with macro-F1 and failure examples; SLM leakage disclosed; SOC blocker documented. Gemini and BOTS still missing. |
| Evaluation Workbench | 14/15 | **15/15** | SYNTHETIC vs MEASURED, import contract, no pooled scores, inspectable misses, formulas for both tabs. |
| Claims honesty | 9/10 | **10/10** | Leakage, PENDING held-out, BOTS NOT RUN, keyword baseline ≠ Gemini. No fabricated generations. |
| Lab JD fit | 8/15 | **10/15** | Real eval harness, error analysis, typed contracts. Still not frontier RL, reward models, or cluster training — correctly omitted. |
| Product quality | 8/10 | **9/10** | 29 Vitest, 20 Playwright, lint/tsc/build green. Not 10: unpublished notes still exist, live Gemini/BOTS still blocked. |
| **Total** | **81** | **89** | |

This is a stronger research-engineering packet because a hiring manager can open a MEASURED artifact, see the 13 misses, and read what was *not* scored. The remaining gap to an exceptional lab packet is held-out SLM numbers, a live classifier score with owned credentials, and a real BOTS export — not more chrome.
