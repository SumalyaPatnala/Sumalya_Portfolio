import type {
  CaseResult,
  EvaluationRun,
  FailureCategory,
  RunMetrics,
} from "@/lib/workbench/types";
import { failureCategories } from "@/lib/workbench/types";

/** Public list-price placeholder used only for notional cost in the demo. */
export const USD_PER_1K_INPUT_TOKENS = 0.00015;
export const USD_PER_1K_OUTPUT_TOKENS = 0.0006;

export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const rank = (p / 100) * (sorted.length - 1);
  const low = Math.floor(rank);
  const high = Math.ceil(rank);
  if (low === high) return sorted[low];
  const weight = rank - low;
  return sorted[low] * (1 - weight) + sorted[high] * weight;
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function notionalCostUsd(result: CaseResult): number {
  return (
    (result.inputTokens / 1000) * USD_PER_1K_INPUT_TOKENS +
    (result.outputTokens / 1000) * USD_PER_1K_OUTPUT_TOKENS
  );
}

export function labelsOf(result: CaseResult): FailureCategory[] {
  if (result.failureCategories.length === 0) return ["none"];
  return result.failureCategories;
}

/**
 * Citation support: among evidence spans flagged usedInAnswer, what
 * fraction is marked supported. Null when the answer cited nothing —
 * that is not the same as “fully grounded.”
 */
export function citationSupport(result: CaseResult): number | null {
  const used = result.evidence.filter((span) => span.usedInAnswer);
  if (used.length === 0) return null;
  return used.filter((span) => span.supported).length / used.length;
}

/** @deprecated Use citationSupport. Kept for existing tests during the split. */
export function groundedness(result: CaseResult): number | null {
  return citationSupport(result);
}

/**
 * Output support: did the generated text stay inside supported evidence?
 *
 * Unlike citation support, this never skips a case. An answer that cites
 * nothing while unused supported evidence exists (the ops-03 pattern:
 * invent an ASN instead of reporting a 503) scores 0.
 */
export function outputSupport(result: CaseResult): number {
  if (labelsOf(result).includes("ungrounded")) return 0;

  const used = result.evidence.filter((span) => span.usedInAnswer);
  if (used.length === 0) {
    const unusedSupported = result.evidence.some(
      (span) => !span.usedInAnswer && span.supported,
    );
    if (unusedSupported) return 0;
    return result.success ? 1 : 0;
  }

  return used.filter((span) => span.supported).length / used.length;
}

export function failureCounts(
  cases: CaseResult[],
): Record<FailureCategory, number> {
  const counts = Object.fromEntries(
    failureCategories.map((category) => [category, 0]),
  ) as Record<FailureCategory, number>;

  for (const item of cases) {
    const labels = labelsOf(item);
    const substantive = labels.filter((label) => label !== "none");
    if (substantive.length === 0) {
      counts.none += 1;
      continue;
    }
    for (const label of new Set(substantive)) {
      counts[label] += 1;
    }
  }
  return counts;
}

export function computeRunMetrics(run: EvaluationRun): RunMetrics {
  const latencies = run.cases.map((item) => item.latencyMs);
  const citationValues = run.cases
    .map(citationSupport)
    .filter((value): value is number => value !== null);
  const outputValues = run.cases.map(outputSupport);

  return {
    runId: run.id,
    configId: run.configId,
    datasetId: run.datasetId,
    n: run.cases.length,
    successes: run.cases.filter((item) => item.success).length,
    successRate:
      run.cases.length === 0
        ? 0
        : run.cases.filter((item) => item.success).length / run.cases.length,
    latencyP50Ms: percentile(latencies, 50),
    latencyP95Ms: percentile(latencies, 95),
    meanLatencyMs: mean(latencies),
    notionalCostUsd: run.cases.reduce(
      (sum, item) => sum + notionalCostUsd(item),
      0,
    ),
    citationSupport: citationValues.length === 0 ? null : mean(citationValues),
    outputSupport: mean(outputValues),
    failureCounts: failureCounts(run.cases),
  };
}

export const metricGlossary = [
  {
    name: "Success rate",
    formula: "count(success) / N",
    detail:
      "A case is successful only if the fixture marked it so. Success means the answer matched the expected contract and did not trip a failure label.",
  },
  {
    name: "Latency p50 / p95",
    formula: "percentile of case.latencyMs",
    detail:
      "End-to-end fixture latency, including retrieval and generation steps recorded on the trace. Not live inference.",
  },
  {
    name: "Notional cost",
    formula:
      "Σ (inputTokens/1000 × $0.00015 + outputTokens/1000 × $0.0006)",
    detail:
      "Synthetic token counts priced at placeholder public list rates. Not billed usage and not a vendor quote.",
  },
  {
    name: "Citation support",
    formula: "supported used-spans / used-spans",
    detail:
      "Only spans flagged usedInAnswer are counted. Cases that cited nothing are skipped (shown as n/a) — they do not inflate this score.",
  },
  {
    name: "Output support",
    formula:
      "0 if ungrounded or if the answer ignored supported evidence; else citation support",
    detail:
      "This is the metric that catches ops-03: a 503 tool result exists, the model invents an ASN, citation support would have been n/a, output support is 0%. Not a live factuality model — labels and spans are in the fixture.",
  },
  {
    name: "Failure labels",
    formula: "histogram of failureCategories (multi-label)",
    detail:
      "A case may carry more than one label (timeout and ungrounded together). Counts are of cases, not exclusive. Assigned in the fixture, not inferred live.",
  },
] as const;
