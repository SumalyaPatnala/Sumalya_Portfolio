/**
 * Post-hoc parse of mlx_lm "Generation: N tokens" lines already stored in
 * run slm-heldout-20261008T215806Z-67db7889. Not a new generation experiment.
 * Two LoRA previews omitted the stats suffix after the 500-character clip.
 */
export const truncationAnalysis = {
  runId: "slm-heldout-20261008T215806Z-67db7889",
  provenance: "MEASURED",
  kind: "post-hoc-log-parse",
  maxTokens: 100,
  n: 13,
  note: "Derived from the frozen held-out run. Not an independent validation. 256 and 512 token budgets have not been generated.",
  models: [
    {
      model: "Base Phi-3",
      parsed: 13,
      omitted: 0,
      hitCap: 13,
      finishedEarly: 0,
      meanParsedTokens: 100,
    },
    {
      model: "Fine-tuned Phi-3 LoRA",
      parsed: 11,
      omitted: 2,
      hitCap: 9,
      finishedEarly: 2,
      meanParsedTokens: 95.91,
    },
  ],
  finishedEarlyIds: ["ho-012", "ho-013"],
  omittedStatIds: ["ho-006", "ho-009"],
} as const;