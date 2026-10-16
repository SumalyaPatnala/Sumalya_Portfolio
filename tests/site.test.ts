import { describe, expect, it } from "vitest";
import { site, storyBeats } from "@/content/site";

describe("site copy", () => {
  it("uses the four-system positioning line", () => {
    expect(site.tagline).toBe(
      "I build the measurement and routing layers that keep agentic systems honest.",
    );
    expect(site.story).toMatch(/Adapt a small model/);
    expect(site.supporting).toMatch(/via TCS/);
    expect(site.supporting).toMatch(/I do not claim frontier-scale/);
    expect(site.philosophy).toMatch(/Respect its footprint/);
  });

  it("tells the four-beat public-systems story", () => {
    expect(storyBeats.map((beat) => beat.id)).toEqual([
      "adapt",
      "serve",
      "dispatch",
      "ground",
    ]);
    expect(storyBeats[0].href).toBe("/work/slm-finetuning-evaluation");
    expect(storyBeats[1].href).toBe("/work/llmops-hybrid-inference");
    expect(storyBeats[2].href).toBe("/work/ai-infrastructure-network-intelligence");
    expect(storyBeats[3].href).toBe("/work/agentic-soc-platform");
  });
});
