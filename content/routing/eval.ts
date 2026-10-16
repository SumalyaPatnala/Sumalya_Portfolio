/**
 * Copied from agentic-ai-infrastructure-network-intelligence
 * evals/routing/outputs/metrics.json after `python -m evals.routing`.
 * Offline instruction-keyword baseline → router(). Not Gemini. Not production traffic.
 */

export const routingEvalSource = {
  repo: "https://github.com/SumalyaPatnala/agentic-ai-infrastructure-network-intelligence",
  path: "evals/routing",
  dataset: "routing_eval_v1",
  n: 134,
  probes: 16,
  note: "Manually authored labels against the process_message instruction. Not production logs. Not Gemini. The live classifier was not called.",
} as const;

export const routingContract = {
  accuracy: 1.0,
  determinismRate: 1.0,
  queryPreservationRate: 1.0,
  repeats: 3,
} as const;

export const routingBaseline = {
  predictor: "instruction-keyword baseline → router()",
  strictAccuracy: 0.903,
  lenientAccuracy: 0.9328,
  macroF1: 0.9062,
  invalidRouteRate: 0.0,
  queryPreservationRate: 1.0,
  meanToolJaccard: 0.9611,
  toolScoredN: 30,
  strictMisses: 13,
} as const;

export const routingPerClass = [
  { route: "NETWORK", precision: 0.9118, recall: 0.9394, f1: 0.9254, support: 33 },
  { route: "INFERENCE", precision: 0.963, recall: 0.8667, f1: 0.9123, support: 30 },
  { route: "INCIDENT", precision: 0.8333, recall: 0.9375, f1: 0.8824, support: 48 },
  { route: "CAPACITY", precision: 1.0, recall: 0.8261, f1: 0.9048, support: 23 },
] as const;

export const routingConfusion = {
  routes: ["NETWORK", "INFERENCE", "INCIDENT", "CAPACITY"] as const,
  matrix: [
    [31, 0, 2, 0],
    [0, 26, 4, 0],
    [3, 0, 45, 0],
    [0, 1, 3, 19],
  ] as const,
};

export const routingSlices = [
  { slice: "clear", n: 64, strict: 0.9688 },
  { slice: "operational", n: 12, strict: 1.0 },
  { slice: "adversarial", n: 8, strict: 1.0 },
  { slice: "ambiguous", n: 12, strict: 0.8333 },
  { slice: "multi_intent", n: 10, strict: 0.8 },
  { slice: "unsupported", n: 10, strict: 0.9 },
  { slice: "missing_info", n: 10, strict: 0.7 },
  { slice: "tool_unavailable", n: 8, strict: 0.625 },
] as const;

export const routingLimitations = [
  "Gemini-2.5-flash routing accuracy was not measured. Default artifacts are offline.",
  "Labels and the keyword baseline share an author — policy separability, not model quality.",
  "No abstain token: unsupported queries are gold INCIDENT because router() falls back there.",
  "Routing accuracy is not end-to-end specialist success. Inference has no live vLLM/GPU tools.",
  "RIPE Atlas helpers exist as a module but are not attached to network_agent.tools.",
  "Class imbalance: INCIDENT support is 48/134 because OOD and multi-intent gold there.",
] as const;
