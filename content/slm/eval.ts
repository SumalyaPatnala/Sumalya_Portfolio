/**
 * Repository-reported SLM evaluation, copied from the public CSV:
 * sdg-community-assistant/03_slm_finetuning_evaluation/outputs/strong_eval_summary.csv
 * and strong_eval_results.csv. N=4 prompt scenarios. Not a public leaderboard.
 */

export const slmEvalSource = {
  repo: "https://github.com/SumalyaPatnala/sdg-community-assistant/tree/main/03_slm_finetuning_evaluation",
  summaryFile: "outputs/strong_eval_summary.csv",
  resultsFile: "outputs/strong_eval_results.csv",
  n: 4,
  note: "MEASURED generations on 4 prompts that paraphrase data/train.jsonl. Directional in-distribution scores, not held-out quality, not statistical significance.",
  leakage: true,
  heldoutFile: "eval/heldout_v1.jsonl",
  heldoutN: 13,
  heldoutStatus:
    "MEASURED run slm-heldout-20261008T215806Z-67db7889. dataset_sha256 24d257d91846fa8e951a6d13b8d7d48a959ccf9f3e5260f64d029449acb2862b. overlap_n=0.",
  heldoutRunId: "slm-heldout-20261008T215806Z-67db7889",
} as const;

/** Frozen held-out N=13. Copied from the versioned MLX run. Not the leaked N=4 CSV. */
export const slmHeldoutSummary = [
  {
    model: "Base Phi-3",
    sdgHitRate: 0.7823,
    structureScore: 0.5692,
    safetyScore: 0.1538,
    actionabilityScore: 0.2562,
    latencySec: 13.6908,
  },
  {
    model: "Fine-tuned Phi-3 LoRA",
    sdgHitRate: 0.6031,
    structureScore: 0.9846,
    safetyScore: 0.3846,
    actionabilityScore: 0.6154,
    latencySec: 13.7085,
  },
] as const;

export const slmSummary = [
  {
    model: "Base Phi-3",
    sdgHitRate: 0.75,
    structureScore: 0.6,
    safetyScore: 0.0,
    actionabilityScore: 0.5,
    latencySec: 15.02,
  },
  {
    model: "Fine-tuned Phi-3 LoRA",
    sdgHitRate: 0.92,
    structureScore: 1.0,
    safetyScore: 0.5,
    actionabilityScore: 0.84,
    latencySec: 14.58,
  },
] as const;

/** Percentile bootstrap of the mean on the leaked N=4 CSV. Not a significance test. */
export const slmBootstrap = {
  nBoot: 2000,
  seed: 0,
  adapterSdgHit: { mean: 0.9175, low: 0.7525, high: 1.0 },
  baseSdgHit: { mean: 0.7525, low: 0.67, high: 0.9175 },
  note: "Resampling intervals on four leaked rows. Do not read these as p-values or held-out CIs.",
} as const;

export const slmScenarios = [
  {
    problem: "A village has stagnant water, mosquitoes, and children getting fever.",
    expectedSdgs: "SDG 3, SDG 6, SDG 11",
    base: { sdgHitRate: 0.67, structureScore: 0.6, safetyScore: 0, actionabilityScore: 0.67, latencySec: 20.76 },
    adapter: { sdgHitRate: 0.67, structureScore: 1.0, safetyScore: 1, actionabilityScore: 1.0, latencySec: 13.93 },
  },
  {
    problem: "People are drinking untreated water and many households report diarrhea.",
    expectedSdgs: "SDG 3, SDG 6",
    base: { sdgHitRate: 1.0, structureScore: 0.6, safetyScore: 0, actionabilityScore: 0.67, latencySec: 12.65 },
    adapter: { sdgHitRate: 1.0, structureScore: 1.0, safetyScore: 1, actionabilityScore: 1.0, latencySec: 13.93 },
  },
  {
    problem: "Girls are missing school because there are no usable toilets.",
    expectedSdgs: "SDG 4, SDG 5, SDG 6",
    base: { sdgHitRate: 0.67, structureScore: 0.6, safetyScore: 0, actionabilityScore: 0.33, latencySec: 13.68 },
    adapter: { sdgHitRate: 1.0, structureScore: 1.0, safetyScore: 0, actionabilityScore: 0.67, latencySec: 14.26 },
  },
  {
    problem: "Plastic waste is burned near homes because there is no waste collection.",
    expectedSdgs: "SDG 3, SDG 11, SDG 12",
    base: { sdgHitRate: 0.67, structureScore: 0.6, safetyScore: 0, actionabilityScore: 0.33, latencySec: 13.01 },
    adapter: { sdgHitRate: 1.0, structureScore: 1.0, safetyScore: 0, actionabilityScore: 0.67, latencySec: 16.2 },
  },
] as const;

export const slmMethod = {
  baseModel: "microsoft/Phi-3-mini-4k-instruct",
  adapter: "LoRA rank 8, learning rate 1e-5, 100 iterations, max sequence 2048 (adapter_config.json)",
  hardware: "Consumer hardware via MLX; peak memory on the logged runs ~7.8 GB",
  metrics: [
    "SDG hit rate — expected SDGs identified",
    "Structure — required category / SDG / actions contract",
    "Safety — warnings when the prompt implied harm",
    "Actionability — practical next steps",
    "Latency — end-to-end seconds on the logged machine, not a serving SLA",
  ],
} as const;
