import { describe, expect, it } from "vitest";
import heldout from "@/content/measured/heldout_v1.json";
import bundled from "@/content/measured/routing_eval_v1.json";
import {
  artifactsComparable,
  parseMeasuredEval,
  validateMeasuredEval,
} from "@/lib/workbench/parseMeasuredEval";

const valid = JSON.stringify(bundled);

describe("parseMeasuredEval", () => {
  it("accepts the bundled routing_eval_v1 artifact as MEASURED", () => {
    const result = parseMeasuredEval(valid);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.artifact.provenance).toBe("MEASURED");
    expect(result.artifact.n).toBe(134);
    expect(result.artifact.metrics.macroF1).toBe(0.9062);
    expect(result.artifact.failures?.length).toBe(13);
  });

  it("rejects non-JSON", () => {
    const result = parseMeasuredEval("not-json");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/valid JSON/i);
  });

  it("rejects SYNTHETIC provenance instead of mixing it in", () => {
    const fake = {
      ...(bundled as object),
      provenance: "SYNTHETIC",
    };
    const result = parseMeasuredEval(JSON.stringify(fake));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/SYNTHETIC/);
  });

  it("rejects a missing schemaVersion", () => {
    const { schemaVersion: _drop, ...rest } = bundled as Record<string, unknown>;
    void _drop;
    const result = parseMeasuredEval(JSON.stringify(rest));
    expect(result.ok).toBe(false);
  });

  it("rejects a confusion matrix that does not sum to n", () => {
    const broken = structuredClone(bundled) as Record<string, unknown>;
    const confusion = broken.confusion as { matrix: number[][] };
    confusion.matrix[0][0] = 1;
    const result = parseMeasuredEval(JSON.stringify(broken));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toMatch(/sums to/);
  });

  it("rejects incomplete routing metrics", () => {
    const broken = structuredClone(bundled) as {
      metrics: Record<string, number>;
    };
    delete broken.metrics.macroF1;
    const result = parseMeasuredEval(JSON.stringify(broken));
    expect(result.ok).toBe(false);
  });

  it("does not treat two different kinds as comparable", () => {
    const routing = validateMeasuredEval(bundled);
    const slm = validateMeasuredEval({
      schemaVersion: "measured-eval-v1",
      provenance: "MEASURED",
      kind: "slm-csv",
      name: "leaked csv",
      datasetId: "strong_eval_results_csv",
      datasetVersion: "strong_eval_n4_leaked",
      n: 4,
      predictor: "csv",
      notMeasured: ["heldout"],
      limitations: ["leakage"],
      metrics: { sdgHitRate: 0.92 },
      trainTestLeakage: true,
    });
    const check = artifactsComparable(routing, slm);
    expect(check.comparable).toBe(false);
  });

  it("allows comparison only for the same kind and dataset version", () => {
    const left = validateMeasuredEval(bundled);
    const right = validateMeasuredEval(bundled);
    expect(artifactsComparable(left, right).comparable).toBe(true);
  });

  it("accepts the bundled heldout_v1 artifact with exact run metrics", () => {
    const artifact = validateMeasuredEval(heldout);
    expect(artifact.kind).toBe("slm-heldout");
    expect(artifact.n).toBe(13);
    expect(artifact.trainTestLeakage).toBe(false);
    expect(artifact.metrics.baseSdgHitRate).toBe(0.7823);
    expect(artifact.metrics.loraSdgHitRate).toBe(0.6031);
    expect(artifact.metrics.loraStructure).toBe(0.9846);
    expect(artifact.runId).toBe("slm-heldout-20261008T215806Z-67db7889");
  });

  it("rejects MEASURED held-out artifacts that omit model rates", () => {
    const broken = {
      ...(heldout as object),
      metrics: { n: 13 },
    };
    const result = parseMeasuredEval(JSON.stringify(broken));
    expect(result.ok).toBe(false);
  });

  it("does not treat routing and held-out SLM as comparable", () => {
    const routing = validateMeasuredEval(bundled);
    const slm = validateMeasuredEval(heldout);
    expect(artifactsComparable(routing, slm).comparable).toBe(false);
  });
});
