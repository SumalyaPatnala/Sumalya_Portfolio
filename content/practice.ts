export const practiceDisclaimer =
  "These are working principles demonstrated in public artifacts. They are not certifications, carbon offsets, or a claim that every project is already resource-optimal.";

export const principles = [
  {
    title: "Choose the simplest capable approach",
    body: "The scored network-intelligence predictor is an instruction-keyword baseline composed with router(), not a live Gemini call. The graph still has a typed RoutingDecision. Complexity is added only when a measured gap requires it.",
    evidenceHref: "/work/ai-infrastructure-network-intelligence",
    evidenceLabel: "Routing case study",
  },
  {
    title: "Measure quality before adding complexity",
    body: "heldout_v1 (N=13) showed LoRA raising structure from 56.9% to 98.5% while SDG hit fell from 78.2% to 60.3%. That is a reason not to treat format compliance as task success, and not to scale the adapter before the metric is trusted.",
    evidenceHref: "/work/slm-finetuning-evaluation",
    evidenceLabel: "SLM evaluation",
  },
  {
    title: "Prefer reproducible experiments",
    body: "Frozen datasets, SHA-256 hashes, run IDs, and refuse-overwrite manifests. Remote Gemini is not claimed bitwise-reproducible. A keyword baseline through router() is.",
    evidenceHref: "/lab",
    evidenceLabel: "Evaluation Workbench",
  },
  {
    title: "Track latency, memory, and resource costs when relevant",
    body: "The held-out run logged wall-clock latency (~13.7 s) and peak memory (~7.8–8.0 GB) from mlx_lm. Post-hoc log parse: base hit the 100-token cap on 13/13 cases; LoRA finished under the cap on at least two. That is instrumentation, not an energy model.",
    evidenceHref: "/notes/when-finetuning-looks-better",
    evidenceLabel: "Research note",
  },
  {
    title: "Understand model limitations",
    body: "Safety and actionability scores are keyword lexicons. A refusal can score 0. N=13 is a probe set. LoRA did not generally fail; it failed on this adapter, these cases, this decoding budget.",
    evidenceHref: "/work/slm-finetuning-evaluation",
    evidenceLabel: "Limitations",
  },
  {
    title: "Protect privacy and sensitive data",
    body: "No Cisco, Bank of America, Infosys, or TCS internals. SOC work uses schema fixtures, not fabricated BOTS events. Live APIs require explicit authorization and never print credentials.",
    evidenceHref: "/work/agentic-soc-platform",
    evidenceLabel: "SOC platform",
  },
  {
    title: "Document failures and tradeoffs",
    body: "Routing misses, LoRA SDG complete misses (ho-009, ho-010), BOTS NOT RUN, Gemini BLOCKED. Negative results stay in the register instead of disappearing from the case study.",
    evidenceHref: "/lab",
    evidenceLabel: "Experiment register",
  },
  {
    title: "Reevaluate decisions as AI technology advances",
    body: "A keyword router can be replaced by a live classifier when credentials and a frozen eval exist. A LoRA adapter can be kept or dropped when a token-budget ablation (not yet run) separates truncation from quality. The philosophy is a loop, not a slogan.",
    evidenceHref: "/research/intelligence-within-limits",
    evidenceLabel: "Intelligence Within Limits",
  },
] as const;