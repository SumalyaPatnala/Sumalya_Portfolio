# Phase 3 changelog

Source of truth: Phase 2 review (67/100). Scope was improvement of the existing Next.js site, not a rebuild.

## Phase A — critical

- Homepage first viewport now states name, current role (AI Engineer, AI Incubation at Cisco via Tata Consultancy Services), applied-ML / evaluation / infrastructure specialization, an inspectable `RoutingDecision` artifact, and GitHub + Workbench actions.
- Supporting copy names public artifacts (N=4 LoRA CSV, EvidenceRecord) and explicitly declines frontier-scale training, vendor labeling platforms, and unpublished papers as shipped products.
- Case-study and note pages no longer wrap in `Suspense` with a “Loading case study…” / “Loading note…” fallback.
- Skip-to-content was visible in every screenshot because a plain `.skip-link` rule was dropped from the Tailwind v4 bundle (`position: static`). It is now a `fixed left-[-10000px]` Tailwind utility, shown only on `:focus` / `:focus-visible`. Confirmed in a real browser session (computed `left: -10000px`, unfocused) and in Playwright (off-screen until Tab, then focus moves to `#main`).
- Architecture illustrations are distinct per project (router graph, SLM fork, SOC evidence chain, multimodal merge, retrieval dual-index, LLMOps fallback). `min-w-[520px]` was removed. Captions are grounded in the corresponding repositories.

## Phase B — design

- Desktop headline uses `lg:whitespace-nowrap` and a smaller display size so the name stays one line at 1440×900.
- Primary navigation is visible from `lg` (not only `xl`). Résumé is in desktop nav and in the mobile menu with Workbench and GitHub.
- Featured cards dropped duplicate kicker + status badge and the full problem/contribution/architecture dump. Homepage padding is tighter.
- Palette unchanged: charcoal, warm neutrals, amber. No glassmorphism, neon, or template animation.

## Phase C — Evaluation Workbench

- Split **citation support** (used spans only; `n/a` if nothing was cited) from **output support** (never skips a hallucination).
- `ops-03` now includes a used, unsupported invented ASN span plus labels `tool_error` and `ungrounded`. Run-level output support is 75% (was a misleading 100% groundedness).
- Failure labels are multi-label. `vqa-06` (lexical) is timeout **and** ungrounded.
- Dataset / configs / case persist in the URL via `useSearchParams` (no setState-in-effect).
- Checkbox hit targets are larger, `z-10`, with `scroll-mt-28`.
- Optional CSV import accepts only `strong_eval_summary.csv` / `strong_eval_results.csv` headers. Malformed files are rejected. Uploads are labeled as a local parse, not a validated benchmark.
- Synthetic banner remains on the lab page.

## Phase D — engineering evidence

- SLM project retitled **SLM Fine-Tuning & Evaluation** (production deployment is not substantiated).
- Inline N=4 results table copied from the public CSV, with method and limitations.
- Public excerpts: `RoutingDecision` (`ai_network_ops/agent.py`) and `EvidenceRecord` (`app/models/evidence.py`).
- Flagship case study adds typed-routing vs flexibility, serial tools vs latency, and public telemetry vs private recall.
- Employer/client internals remain off the site.

## Phase E — research & positioning

- Homepage positions applied ML, evaluation, AI infrastructure, full-stack tooling, and reproducible experiments — without claiming RLHF production, reward-model pipelines, or distributed training clusters.
- Academic work stays unpublished.
- One finished essay: [Evaluation before orchestration](/notes/evaluation-before-orchestration) (`published`). Other notes remain drafts.

## Phase F — product

- Playwright: 14 passed (was 4). Coverage includes desktop/mobile nav, skip-to-content, hydration console check on case-study load, workbench URL + dual labels, keyboard, 390px diagram overflow, checkbox clicks.
- Vitest: 18 passed (was 10).
- `npm run lint`, `npm run typecheck`, `npm run build`: passed after the changes in this phase.

## Screenshots

Before/after at 1440×900 and 390×844 live in `docs/screenshots/phase-3/`.
