export const MEASURED_SCHEMA_VERSION = "measured-eval-v1";

export type Provenance = "SYNTHETIC" | "MEASURED";

export type MeasuredKind = "routing-offline" | "slm-csv" | "slm-heldout";

export type MeasuredFailure = {
  id: string;
  slice?: string;
  query: string;
  gold: string;
  predicted: string;
  taxonomy?: string;
};

export type MeasuredPerClass = {
  route: string;
  precision: number;
  recall: number;
  f1: number;
  support: number;
};

export type MeasuredEvalArtifact = {
  schemaVersion: typeof MEASURED_SCHEMA_VERSION;
  provenance: "MEASURED";
  kind: MeasuredKind;
  name: string;
  datasetId: string;
  datasetVersion: string;
  n: number;
  predictor: string;
  configuration?: Record<string, string | number | boolean | null>;
  notMeasured: string[];
  limitations: string[];
  metrics: Record<string, number | null | undefined>;
  perClass?: MeasuredPerClass[];
  confusion?: { routes: string[]; matrix: number[][] };
  failureCategories?: Record<string, number>;
  failures?: MeasuredFailure[];
  knownLimitations?: string[];
  trainTestLeakage?: boolean;
  status?: string;
  metricsByModel?: unknown;
  routerContract?: Record<string, number>;
  runId?: string;
  datasetSha256?: string;
  sourceCommit?: string;
  cases?: {
    id: string;
    slice?: string;
    query: string;
    gold: string;
    baseSdgHitRate?: number;
    loraSdgHitRate?: number;
    baseStructure?: number;
    loraStructure?: number;
  }[];
};

export type MeasuredParseResult =
  | { ok: true; artifact: MeasuredEvalArtifact }
  | { ok: false; error: string };

const KINDS: MeasuredKind[] = ["routing-offline", "slm-csv", "slm-heldout"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing or empty ${field}.`);
  }
  return value;
}

function requiredStringList(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${field} must be an array of strings.`);
  }
  return value;
}

function parseMetrics(value: unknown): Record<string, number | null | undefined> {
  if (!isRecord(value)) {
    throw new Error("metrics must be an object.");
  }
  const metrics: Record<string, number | null | undefined> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry === null || entry === undefined) {
      metrics[key] = entry;
      continue;
    }
    if (!isNumber(entry)) {
      throw new Error(`metrics.${key} must be a finite number or null.`);
    }
    metrics[key] = entry;
  }
  return metrics;
}

export function artifactsComparable(
  left: MeasuredEvalArtifact,
  right: MeasuredEvalArtifact,
): { comparable: boolean; reason: string } {
  if (left.kind !== right.kind) {
    return {
      comparable: false,
      reason: `Kinds differ (${left.kind} vs ${right.kind}). Metrics are not pooled.`,
    };
  }
  if (left.datasetVersion !== right.datasetVersion) {
    return {
      comparable: false,
      reason: `Dataset versions differ (${left.datasetVersion} vs ${right.datasetVersion}).`,
    };
  }
  if (left.provenance !== "MEASURED" || right.provenance !== "MEASURED") {
    return { comparable: false, reason: "Only MEASURED artifacts can be compared." };
  }
  return { comparable: true, reason: "Same kind and dataset version." };
}

export function parseMeasuredEval(input: string): MeasuredParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    return { ok: false, error: "Not valid JSON." };
  }

  try {
    return { ok: true, artifact: validateMeasuredEval(parsed) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Invalid measured artifact.",
    };
  }
}

export function validateMeasuredEval(parsed: unknown): MeasuredEvalArtifact {
  if (!isRecord(parsed)) {
    throw new Error("Root value must be a JSON object.");
  }

  if (parsed.provenance === "SYNTHETIC") {
    throw new Error(
      "Refused: provenance is SYNTHETIC. Import measured artifacts only; synthetic fixtures stay in the demonstration tab.",
    );
  }

  if (parsed.schemaVersion !== MEASURED_SCHEMA_VERSION) {
    throw new Error(
      `Unsupported schemaVersion ${String(parsed.schemaVersion)}. Expected ${MEASURED_SCHEMA_VERSION}.`,
    );
  }

  if (parsed.provenance !== "MEASURED") {
    throw new Error('provenance must be "MEASURED".');
  }

  const kind = parsed.kind;
  if (typeof kind !== "string" || !KINDS.includes(kind as MeasuredKind)) {
    throw new Error(`kind must be one of ${KINDS.join(", ")}.`);
  }

  const n = parsed.n;
  if (!Number.isInteger(n) || (n as number) < 1) {
    throw new Error("n must be an integer >= 1.");
  }

  const limitations = requiredStringList(parsed.limitations, "limitations");
  const notMeasured = requiredStringList(parsed.notMeasured, "notMeasured");
  const metrics = parseMetrics(parsed.metrics ?? {});

  if (kind === "routing-offline") {
    if (!isNumber(metrics.strictAccuracy) || !isNumber(metrics.macroF1)) {
      throw new Error("routing-offline metrics must include strictAccuracy and macroF1.");
    }
    if (!Array.isArray(parsed.perClass) || parsed.perClass.length === 0) {
      throw new Error("routing-offline requires perClass scores.");
    }
    if (!isRecord(parsed.confusion)) {
      throw new Error("routing-offline requires a confusion matrix.");
    }
    const routes = parsed.confusion.routes;
    const matrix = parsed.confusion.matrix;
    if (!Array.isArray(routes) || !Array.isArray(matrix)) {
      throw new Error("confusion.routes and confusion.matrix are required.");
    }
    if (matrix.length !== routes.length) {
      throw new Error("confusion matrix row count must match routes.");
    }
    for (const row of matrix) {
      if (!Array.isArray(row) || row.length !== routes.length) {
        throw new Error("confusion matrix must be square.");
      }
      const sum = (row as unknown[]).reduce((total: number, cell) => {
        if (!Number.isInteger(cell) || (cell as number) < 0) {
          throw new Error("confusion cells must be non-negative integers.");
        }
        return total + (cell as number);
      }, 0);
      void sum;
    }
    const total = (matrix as number[][]).reduce(
      (acc, row) => acc + row.reduce((a, b) => a + b, 0),
      0,
    );
    if (total !== n) {
      throw new Error(`confusion matrix sums to ${total}, expected n=${n}.`);
    }
  }

  if (kind === "slm-heldout" && parsed.status === "PENDING") {
    if (parsed.metrics !== null && parsed.metrics !== undefined && Object.keys(metrics).length > 0) {
      throw new Error("PENDING held-out artifacts must not include scores.");
    }
  }

  if (kind === "slm-heldout" && parsed.status === "MEASURED") {
    if (!isNumber(metrics.baseSdgHitRate) || !isNumber(metrics.loraSdgHitRate)) {
      throw new Error("MEASURED slm-heldout metrics must include baseSdgHitRate and loraSdgHitRate.");
    }
    if (parsed.trainTestLeakage !== false) {
      throw new Error("MEASURED slm-heldout must set trainTestLeakage false.");
    }
  }

  const artifact: MeasuredEvalArtifact = {
    schemaVersion: MEASURED_SCHEMA_VERSION,
    provenance: "MEASURED",
    kind: kind as MeasuredKind,
    name: requiredString(parsed.name, "name"),
    datasetId: requiredString(parsed.datasetId, "datasetId"),
    datasetVersion: requiredString(parsed.datasetVersion, "datasetVersion"),
    n: n as number,
    predictor: requiredString(parsed.predictor, "predictor"),
    notMeasured,
    limitations,
    metrics,
  };

  if (isRecord(parsed.configuration)) {
    artifact.configuration = parsed.configuration as Record<
      string,
      string | number | boolean | null
    >;
  }
  if (Array.isArray(parsed.perClass)) {
    artifact.perClass = parsed.perClass as MeasuredPerClass[];
  }
  if (isRecord(parsed.confusion)) {
    artifact.confusion = parsed.confusion as MeasuredEvalArtifact["confusion"];
  }
  if (isRecord(parsed.failureCategories)) {
    artifact.failureCategories = parsed.failureCategories as Record<string, number>;
  }
  if (Array.isArray(parsed.failures)) {
    artifact.failures = parsed.failures as MeasuredFailure[];
  }
  if (Array.isArray(parsed.knownLimitations)) {
    artifact.knownLimitations = parsed.knownLimitations as string[];
  }
  if (typeof parsed.trainTestLeakage === "boolean") {
    artifact.trainTestLeakage = parsed.trainTestLeakage;
  }
  if (typeof parsed.status === "string") {
    artifact.status = parsed.status;
  }
  if (parsed.metricsByModel !== undefined) {
    artifact.metricsByModel = parsed.metricsByModel;
  }
  if (isRecord(parsed.routerContract)) {
    artifact.routerContract = parsed.routerContract as Record<string, number>;
  }
  if (typeof parsed.runId === "string") {
    artifact.runId = parsed.runId;
  }
  if (typeof parsed.datasetSha256 === "string") {
    artifact.datasetSha256 = parsed.datasetSha256;
  }
  if (typeof parsed.sourceCommit === "string") {
    artifact.sourceCommit = parsed.sourceCommit;
  }
  if (Array.isArray(parsed.cases)) {
    artifact.cases = parsed.cases as MeasuredEvalArtifact["cases"];
  }

  return artifact;
}

export const measuredMetricGlossary = [
  {
    name: "Strict accuracy",
    formula: "count(predicted == gold_route) / N",
    detail:
      "Gold is a single route. Used for the keyword baseline composed with router(). Not Gemini.",
  },
  {
    name: "Lenient accuracy",
    formula: "count(predicted ∈ acceptable_routes) / N",
    detail:
      "Ambiguous and multi-intent items allow more than one acceptable route. The graph still emits one.",
  },
  {
    name: "Macro-F1",
    formula: "mean of per-class F1 over NETWORK, INFERENCE, INCIDENT, CAPACITY",
    detail:
      "Unweighted mean. INCIDENT has higher support (OOD + multi-intent gold). Macro-F1 does not hide that.",
  },
  {
    name: "Invalid-route rate",
    formula: "count(classifier token ∉ valid routes) / N",
    detail:
      "Measured before router(). The router then maps invalid tokens to INCIDENT.",
  },
  {
    name: "Tool-selection Jaccard",
    formula: "|expected ∩ predicted| / |expected ∪ predicted| on scorable NETWORK cases",
    detail:
      "Not tool-execution success. Inference/incident/capacity specialists have no tools in source.",
  },
  {
    name: "SDG hit rate",
    formula: "count(expected SDG string in output) / |expected|",
    detail:
      "Substring match on labels such as “SDG 6”. Used for both leaked N=4 CSV and heldout_v1. Not a rater study.",
  },
  {
    name: "Structure score",
    formula: "count(required section headers present) / 5",
    detail:
      "Headers: Problem Category, Relevant SDGs, Suggested Actions, Safety Note, Limitations. Sensitive to max_tokens truncation.",
  },
] as const;
