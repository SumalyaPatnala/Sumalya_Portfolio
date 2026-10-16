export type SlmSummaryRow = {
  model: string;
  sdgHitRate: number;
  structureScore: number;
  safetyScore: number;
  actionabilityScore: number;
  latencySec: number;
};

export type SlmResultRow = SlmSummaryRow & {
  problem: string;
  expectedSdgs: string;
};

export type SlmParseOk =
  | { ok: true; kind: "summary"; rows: SlmSummaryRow[] }
  | { ok: true; kind: "results"; rows: SlmResultRow[] };

export type SlmParseResult = SlmParseOk | { ok: false; error: string };

const SUMMARY_HEADERS = [
  "model",
  "sdg_hit_rate",
  "structure_score",
  "safety_score",
  "actionability_score",
  "latency_sec",
] as const;

const RESULTS_HEADERS = [
  "model",
  "problem",
  "expected_sdgs",
  "sdg_hit_rate",
  "structure_score",
  "safety_score",
  "actionability_score",
  "latency_sec",
] as const;

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function parseNumber(value: string, field: string, row: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`Row ${row}: ${field} is not a number (${value || "empty"}).`);
  }
  return n;
}

function headerEquals(actual: string[], expected: readonly string[]) {
  if (actual.length < expected.length) return false;
  return expected.every((name, index) => actual[index] === name);
}

/**
 * Parse the public SLM eval CSV shapes from
 * sdg-community-assistant/03_slm_finetuning_evaluation/outputs.
 * Rejects anything else without guessing columns.
 */
export function parseSlmEvalCsv(text: string): SlmParseResult {
  const raw = text.replace(/^\uFEFF/, "").trim();
  if (!raw) return { ok: false, error: "The file is empty." };

  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) {
    return { ok: false, error: "Need a header row and at least one data row." };
  }

  let header: string[];
  try {
    header = splitCsvLine(lines[0]).map((cell) => cell.toLowerCase());
  } catch {
    return { ok: false, error: "Could not read the header row." };
  }

  const isSummary = headerEquals(header, SUMMARY_HEADERS);
  const isResults = headerEquals(header, RESULTS_HEADERS);
  if (!isSummary && !isResults) {
    return {
      ok: false,
      error:
        "Headers must match strong_eval_summary.csv or strong_eval_results.csv from the public SLM repo. This importer does not guess columns.",
    };
  }

  try {
    if (isResults) {
      const rows = lines.slice(1).map((line, index) => {
        const cells = splitCsvLine(line);
        const row = index + 2;
        return {
          model: cells[0] || "",
          problem: cells[1] || "",
          expectedSdgs: cells[2] || "",
          sdgHitRate: parseNumber(cells[3], "sdg_hit_rate", row),
          structureScore: parseNumber(cells[4], "structure_score", row),
          safetyScore: parseNumber(cells[5], "safety_score", row),
          actionabilityScore: parseNumber(cells[6], "actionability_score", row),
          latencySec: parseNumber(cells[7], "latency_sec", row),
        } satisfies SlmResultRow;
      });
      if (rows.some((row) => !row.model)) {
        return { ok: false, error: "Every row needs a model name." };
      }
      return { ok: true, kind: "results", rows };
    }

    const rows = lines.slice(1).map((line, index) => {
      const cells = splitCsvLine(line);
      const row = index + 2;
      return {
        model: cells[0] || "",
        sdgHitRate: parseNumber(cells[1], "sdg_hit_rate", row),
        structureScore: parseNumber(cells[2], "structure_score", row),
        safetyScore: parseNumber(cells[3], "safety_score", row),
        actionabilityScore: parseNumber(cells[4], "actionability_score", row),
        latencySec: parseNumber(cells[5], "latency_sec", row),
      } satisfies SlmSummaryRow;
    });
    if (rows.some((row) => !row.model)) {
      return { ok: false, error: "Every row needs a model name." };
    }
    return { ok: true, kind: "summary", rows };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not parse the CSV.",
    };
  }
}
