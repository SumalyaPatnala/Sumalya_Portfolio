import { describe, expect, it } from "vitest";
import { runs } from "@/content/workbench/runs";
import {
  citationSupport,
  computeRunMetrics,
  groundedness,
  outputSupport,
  percentile,
} from "@/lib/workbench/metrics";

describe("percentile", () => {
  it("returns 0 for an empty list", () => {
    expect(percentile([], 50)).toBe(0);
  });

  it("interpolates between sorted values", () => {
    expect(percentile([1, 2, 3, 4], 50)).toBe(2.5);
  });
});

describe("computeRunMetrics", () => {
  const lexical = computeRunMetrics(runs[0]);
  const hybrid = computeRunMetrics(runs[1]);
  const agent = computeRunMetrics(runs[2]);

  it("uses fixture N, not a hidden default", () => {
    expect(lexical.n).toBe(6);
    expect(hybrid.n).toBe(6);
    expect(agent.n).toBe(4);
  });

  it("computes a higher success rate for the gated hybrid fixture than lexical RAG", () => {
    expect(lexical.successRate).toBeCloseTo(3 / 6);
    expect(hybrid.successRate).toBeCloseTo(6 / 6);
    expect(hybrid.successRate).toBeGreaterThan(lexical.successRate);
  });

  it("counts ungrounded failures only when the fixture says so", () => {
    expect(lexical.failureCounts.ungrounded).toBe(2);
    expect(hybrid.failureCounts.ungrounded).toBe(0);
  });

  it("allows timeout and ungrounded on the same lexical case", () => {
    const vqa06 = runs[0].cases.find((item) => item.caseId === "vqa-06");
    expect(vqa06?.failureCategories).toEqual(["timeout", "ungrounded"]);
    expect(lexical.failureCounts.timeout).toBe(1);
  });

  it("skips citation support when no evidence was used", () => {
    const noneUsed = citationSupport({
      caseId: "x",
      prompt: "",
      expected: "",
      output: "",
      success: false,
      latencyMs: 1,
      inputTokens: 1,
      outputTokens: 1,
      failureCategories: ["incomplete"],
      trace: [],
      evidence: [
        {
          id: "e",
          sourceId: "s",
          quote: "q",
          usedInAnswer: false,
          supported: true,
        },
      ],
    });
    expect(noneUsed).toBeNull();
    expect(groundedness({
      caseId: "x",
      prompt: "",
      expected: "",
      output: "",
      success: false,
      latencyMs: 1,
      inputTokens: 1,
      outputTokens: 1,
      failureCategories: ["incomplete"],
      trace: [],
      evidence: [
        {
          id: "e",
          sourceId: "s",
          quote: "q",
          usedInAnswer: false,
          supported: true,
        },
      ],
    })).toBeNull();
  });

  it("scores ops-03 output support at 0% for the invented ASN", () => {
    const ops03 = runs[2].cases.find((item) => item.caseId === "ops-03");
    expect(ops03).toBeDefined();
    expect(ops03?.failureCategories).toEqual(["tool_error", "ungrounded"]);
    expect(citationSupport(ops03!)).toBe(0);
    expect(outputSupport(ops03!)).toBe(0);
    expect(agent.failureCounts.tool_error).toBe(1);
    expect(agent.failureCounts.ungrounded).toBe(1);
    expect(agent.outputSupport).toBeLessThan(1);
  });
});
