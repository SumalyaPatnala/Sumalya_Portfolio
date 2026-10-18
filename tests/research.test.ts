import { describe, expect, it } from "vitest";
import { research, researchThreads } from "@/content/research";

describe("research index", () => {
  it("keeps the SFSU prototype unpublished", () => {
    expect(research.status).toMatch(/not verified as published/i);
    expect(researchThreads.some((thread) => thread.status.match(/not verified as published/i))).toBe(
      true,
    );
    expect(
      researchThreads.some((thread) =>
        thread.links.some((link) => link.label === "Open the research brief"),
      ),
    ).toBe(true);
  });

  it("labels StyleWeave unimplemented and WorldSense local Phase 1", () => {
    const weave = researchThreads.find((thread) => thread.id === "vlm-fashion");
    const vision = researchThreads.find((thread) => thread.id === "vision-events");
    expect(weave?.status).toMatch(/Not implemented/i);
    expect(weave?.evidence).toMatch(/No metrics/i);
    expect(vision?.status).toMatch(/Local prototype/i);
    expect(vision?.status).toMatch(/SAM 2/);
    expect(vision?.evidence).not.toMatch(/mAP \d/);
  });

  it("does not invent publications or hosted StyleWeave/WorldSense demos", () => {
    const blob = JSON.stringify(researchThreads);
    expect(blob).not.toMatch(/peer-reviewed publication/i);
    expect(blob).not.toMatch(/huggingface\.co\/spaces/i);
    expect(researchThreads.find((thread) => thread.id === "vlm-fashion")?.links).toHaveLength(1);
    expect(researchThreads.find((thread) => thread.id === "vision-events")?.links).toEqual([
      { href: "/work/worldsense-ai", label: "WorldSense case study" },
    ]);
  });
});
