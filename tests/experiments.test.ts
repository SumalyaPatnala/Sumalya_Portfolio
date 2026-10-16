import { describe, expect, it } from "vitest";
import { experiments, incompleteExperiments } from "@/content/experiments";

describe("experiment register copy", () => {
  it("does not attach numeric accuracy to blocked or not-run rows", () => {
    for (const item of experiments) {
      if (item.status === "MEASURED") {
        expect(item.metrics).not.toMatch(/^not scored$/i);
        continue;
      }
      expect(item.metrics).toMatch(/not scored|in-distribution CSV only/i);
      expect(item.metrics).not.toMatch(/\d+(\.\d+)?%/);
    }
  });

  it("keeps Gemini and keyword baseline as separate experiments", () => {
    const offline = experiments.find((item) => item.id === "P5-R1");
    const live = experiments.find((item) => item.id === "P5-R2");
    expect(offline?.status).toBe("MEASURED");
    expect(live?.status).toBe("BLOCKED");
    expect(live?.predictor).toMatch(/gemini/i);
    expect(offline?.predictor).not.toMatch(/gemini/i);
  });

  it("does not treat BOTS as run", () => {
    const bots = experiments.find((item) => item.id === "P5-C1");
    expect(bots?.status).toBe("NOT_RUN");
  });

  it("lists Gemini and BOTS as incomplete, not the held-out SLM run", () => {
    const ids = incompleteExperiments().map((item) => item.id);
    expect(ids).toContain("P5-R2");
    expect(ids).toContain("P5-C1");
    expect(ids).not.toContain("P5-S2");
    expect(ids).not.toContain("P5-R1");
    expect(ids).toContain("P6-S4");
  });

  it("reports held-out SLM as MEASURED without pooling N=4", () => {
    const heldout = experiments.find((item) => item.id === "P5-S2");
    const leaked = experiments.find((item) => item.id === "P5-S1");
    expect(heldout?.status).toBe("MEASURED");
    expect(heldout?.n).toBe(13);
    expect(heldout?.metrics).toMatch(/60\.3%/);
    expect(heldout?.metrics).toMatch(/78\.2%/);
    expect(leaked?.n).toBe(4);
    expect(leaked?.blockers).toMatch(/held-out/i);
  });
});
