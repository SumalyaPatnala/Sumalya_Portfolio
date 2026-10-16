import { describe, expect, it } from "vitest";
import { parseSlmEvalCsv } from "@/lib/slm/parseEvalCsv";

const summary = `model,sdg_hit_rate,structure_score,safety_score,actionability_score,latency_sec
Base Phi-3,0.75,0.6,0.0,0.5,15.02
Fine-tuned Phi-3 LoRA,0.92,1.0,0.5,0.84,14.58
`;

const results = `model,problem,expected_sdgs,sdg_hit_rate,structure_score,safety_score,actionability_score,latency_sec
Base Phi-3,"A village has stagnant water","SDG 3, SDG 6",0.67,0.6,0,0.67,20.76
`;

describe("parseSlmEvalCsv", () => {
  it("parses the public summary header", () => {
    const parsed = parseSlmEvalCsv(summary);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.kind).toBe("summary");
      expect(parsed.rows).toHaveLength(2);
      expect(parsed.rows[1].sdgHitRate).toBeCloseTo(0.92);
    }
  });

  it("parses quoted result rows", () => {
    const parsed = parseSlmEvalCsv(results);
    expect(parsed.ok).toBe(true);
    if (parsed.ok && parsed.kind === "results") {
      expect(parsed.rows[0].problem).toContain("village");
    }
  });

  it("rejects unknown headers without guessing", () => {
    const parsed = parseSlmEvalCsv("foo,bar\n1,2\n");
    expect(parsed.ok).toBe(false);
    if (!parsed.ok) {
      expect(parsed.error).toMatch(/Headers must match/);
    }
  });

  it("rejects non-numeric metric cells", () => {
    const parsed = parseSlmEvalCsv(
      "model,sdg_hit_rate,structure_score,safety_score,actionability_score,latency_sec\nX,nope,1,1,1,1\n",
    );
    expect(parsed.ok).toBe(false);
  });

  it("rejects an empty file", () => {
    expect(parseSlmEvalCsv("").ok).toBe(false);
  });
});
