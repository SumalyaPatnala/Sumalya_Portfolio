---
title: "When fine-tuning looks better but performs worse"
status: published
date: "2026-10-08"
summary: "On 13 frozen held-out cases, LoRA raised structure compliance and lowered SDG hit rate. A 100-token cap makes the split even sharper. This is not a general law about LoRA."
---

**Research note — proposed investigation.** Not a paper. Not a claim that LoRA generally harms task performance.

On 13 frozen, previously unseen evaluation cases (`heldout_v1`, overlap_n=0, run `slm-heldout-20261008T215806Z-67db7889`), a LoRA-adapted Phi-3 Mini improved structure compliance from **56.9% to 98.5%**, while SDG hit score declined from **78.2% to 60.3%**. The result is a central evaluation problem: improving a measurable proxy does not necessarily improve the underlying task.

The decoding budget was `max_tokens=100` (mlx_lm default), temperature 0.0. A post-hoc parse of the generation logs already stored in that run:

- Base Phi-3 hit the cap on **13/13** parsed cases.
- LoRA hit the cap on **9/11** parsed cases and finished early on ho-012 (77 tokens) and ho-013 (78). Two LoRA previews omitted the stats suffix.

Shorter, template-shaped adapter outputs are rewarded by the structure metric. Longer base outputs are truncated before they can emit Safety Note and Limitations. That is a confounder, not an excuse to hide the SDG drop.

What I investigate next, without treating another pass over these 13 items as independent validation:

1. Token-budget ablation at 100 (already run), 256, and 512, with truncation and output length recorded. **256 and 512 are NOT RUN.**
2. Semantic correctness versus exact lexical SDG string match.
3. Quality versus latency and peak memory on the same machine. Energy only if a defensible meter exists. Faster is not automatically greener.

The philosophy this forces: *Advance intelligence. Respect its footprint. Improve what comes next.* Here that means not shipping an adapter because it looks structured, not scaling compute to wash out a bad metric, and not inventing carbon numbers for a 13-case probe set.
