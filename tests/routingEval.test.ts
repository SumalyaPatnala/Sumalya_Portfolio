import { describe, expect, it } from "vitest";
import { routingBaseline, routingEvalSource } from "@/content/routing/eval";

describe("routing eval copy", () => {
  it("keeps N and disclaims Gemini", () => {
    expect(routingEvalSource.n).toBe(134);
    expect(routingEvalSource.note).toMatch(/Not Gemini/i);
    expect(routingBaseline.predictor).toMatch(/baseline/);
    expect(routingBaseline.predictor).not.toMatch(/gemini/i);
    expect(routingBaseline.macroF1).toBe(0.9062);
  });
});
