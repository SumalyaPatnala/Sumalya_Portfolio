/**
 * Phase 5 experiment status. Scores appear only when a MEASURED artifact exists.
 * Pending/blocked rows must not invent metrics.
 */
export type ExperimentStatus =
  | "MEASURED"
  | "DRY_RUN"
  | "BLOCKED"
  | "NOT_RUN"
  | "SYNTHETIC";

export type Experiment = {
  id: string;
  title: string;
  repository: string;
  dataset: string;
  n: number | null;
  predictor: string;
  status: ExperimentStatus;
  metrics: string;
  blockers: string;
  href: string;
};

export const experiments: Experiment[] = [
  {
    id: "P5-R1",
    title: "Offline keyword baseline → router()",
    repository: "agentic-ai-infrastructure-network-intelligence",
    dataset: "routing_eval_v1",
    n: 134,
    predictor: "classify_query → router()",
    status: "MEASURED",
    metrics: "strict 90.3% · lenient 93.3% · macro-F1 90.6% · 13 strict misses",
    blockers: "None for this predictor. Not Gemini.",
    href: "/work/ai-infrastructure-network-intelligence",
  },
  {
    id: "P5-R2",
    title: "Gemini-2.5-flash process_message routing",
    repository: "agentic-ai-infrastructure-network-intelligence",
    dataset: "routing_eval_v1 (frozen)",
    n: 134,
    predictor: "gemini-2.5-flash → router()",
    status: "BLOCKED",
    metrics: "not scored",
    blockers:
      "No Google credential in the environment. Dry-run of prompts/schema executed. Live calls require --authorize-live.",
    href: "/work/ai-infrastructure-network-intelligence",
  },
  {
    id: "P5-S1",
    title: "Phi-3 LoRA vs base (leaked N=4 CSV)",
    repository: "sdg-community-assistant/03_slm_finetuning_evaluation",
    dataset: "strong_eval_results.csv",
    n: 4,
    predictor: "mlx_lm generate (historical CSV)",
    status: "MEASURED",
    metrics: "in-distribution CSV only; train overlap disclosed",
    blockers: "Do not read as held-out quality.",
    href: "/work/slm-finetuning-evaluation",
  },
  {
    id: "P5-S2",
    title: "heldout_v1 generations",
    repository: "sdg-community-assistant/03_slm_finetuning_evaluation",
    dataset: "eval/heldout_v1.jsonl",
    n: 13,
    predictor: "Phi-3 Mini ± LoRA via mlx_lm",
    status: "MEASURED",
    metrics:
      "LoRA SDG hit 60.3% vs base 78.2%; structure 98.5% vs 56.9% (N=13, run slm-heldout-20261008T215806Z-67db7889)",
    blockers:
      "None for this run. N=13 is a probe set, not a comprehensive benchmark. Separate from leaked N=4.",
    href: "/work/slm-finetuning-evaluation",
  },
  {
    id: "P5-C1",
    title: "BOTS v3 real-export validation",
    repository: "agentic-soc-platform",
    dataset: "data/botsv3/raw (empty)",
    n: null,
    predictor: "deterministic normalizer / timeline",
    status: "NOT_RUN",
    metrics: "not scored (not a detector)",
    blockers:
      "No real_export_*.json. Splunk binary exists locally but was not queried. Pytest fixtures are not BOTS evidence.",
    href: "/work/agentic-soc-platform",
  },
  {
    id: "P6-S3",
    title: "Token-cap parse of held-out logs",
    repository: "sdg-community-assistant/03_slm_finetuning_evaluation",
    dataset: "heldout_v1 (frozen run logs)",
    n: 13,
    predictor: "post-hoc mlx_lm Generation token counts",
    status: "MEASURED",
    metrics:
      "base 13/13 hit max_tokens=100; LoRA 9/11 parsed hit cap, 2 finished early",
    blockers:
      "Parse of existing logs, not a new generation. Two LoRA previews omitted stats. 256/512 NOT RUN.",
    href: "/notes/when-finetuning-looks-better",
  },
  {
    id: "P6-S4",
    title: "Token-budget ablation 256 and 512",
    repository: "sdg-community-assistant/03_slm_finetuning_evaluation",
    dataset: "heldout_v1 (would be exploratory reuse)",
    n: 13,
    predictor: "mlx_lm generate --max-tokens {256,512}",
    status: "NOT_RUN",
    metrics: "not scored",
    blockers:
      "Not executed in Phase 6. Any future run on these 13 cases is exploratory, not a new independent validation.",
    href: "/work/slm-finetuning-evaluation",
  },
];

export function measuredExperiments() {
  return experiments.filter((item) => item.status === "MEASURED");
}

export function incompleteExperiments() {
  return experiments.filter((item) => item.status !== "MEASURED" && item.status !== "SYNTHETIC");
}
