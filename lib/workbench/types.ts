export const failureCategories = [
  "none",
  "ungrounded",
  "timeout",
  "schema",
  "tool_error",
  "incomplete",
] as const;

export type FailureCategory = (typeof failureCategories)[number];

export const failureLabels: Record<FailureCategory, string> = {
  none: "None",
  ungrounded: "Ungrounded claim",
  timeout: "Timeout",
  schema: "Schema / contract miss",
  tool_error: "Tool error",
  incomplete: "Incomplete answer",
};

export type Dataset = {
  id: string;
  name: string;
  description: string;
  nCases: number;
};

export type ModelConfig = {
  id: string;
  name: string;
  description: string;
  model: string;
  retrieval: string;
  temperature: number;
};

export type TraceStep = {
  id: string;
  kind: "retrieve" | "rerank" | "tool" | "generate" | "guard";
  label: string;
  durationMs: number;
  detail: string;
};

export type EvidenceSpan = {
  id: string;
  sourceId: string;
  quote: string;
  usedInAnswer: boolean;
  supported: boolean;
};

export type CaseResult = {
  caseId: string;
  prompt: string;
  expected: string;
  output: string;
  success: boolean;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  /** One or more labels. A timeout that also hallucinates is both timeout and ungrounded. */
  failureCategories: FailureCategory[];
  trace: TraceStep[];
  evidence: EvidenceSpan[];
};

export type EvaluationRun = {
  id: string;
  datasetId: string;
  configId: string;
  createdAt: string;
  notes: string;
  cases: CaseResult[];
};

export type RunMetrics = {
  runId: string;
  configId: string;
  datasetId: string;
  n: number;
  successes: number;
  successRate: number;
  latencyP50Ms: number;
  latencyP95Ms: number;
  meanLatencyMs: number;
  notionalCostUsd: number;
  /** Mean citation support; null when no case cited any span. */
  citationSupport: number | null;
  /** Mean output support across all cases (never skips a hallucination). */
  outputSupport: number;
  failureCounts: Record<FailureCategory, number>;
};
