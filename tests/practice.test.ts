import { describe, expect, it } from "vitest";
import { limits, limitsStatus } from "@/content/limits";
import { practiceDisclaimer, principles } from "@/content/practice";
import { truncationAnalysis } from "@/content/slm/truncation";
import { experiments } from "@/content/experiments";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

describe("phase 6 philosophy and research direction", () => {
  it("keeps the engineering tagline primary and adds a philosophy line", () => {
    expect(site.tagline).toBe(
      "I build the measurement and routing layers that keep agentic systems honest.",
    );
    expect(site.philosophy).toBe(
      "Advance intelligence. Respect its footprint. Improve what comes next.",
    );
  });

  it("does not claim a theorem or carbon result on the research brief", () => {
    const blob = JSON.stringify(limits);
    expect(limitsStatus).toMatch(/have not yet been established/i);
    expect(blob).not.toMatch(/kWh saved|carbon offset/i);
    expect(blob).toMatch(/not a theorem/i);
    expect(blob).toMatch(/does not estimate kg CO/);
  });

  it("ties practice principles to public artifacts", () => {
    expect(principles).toHaveLength(8);
    expect(practiceDisclaimer).toMatch(/not certifications/i);
    expect(principles.every((item) => item.evidenceHref.startsWith("/"))).toBe(true);
  });

  it("records truncation parse without claiming 256/512 ran", () => {
    expect(truncationAnalysis.models[0].hitCap).toBe(13);
    expect(truncationAnalysis.models[1].finishedEarly).toBe(2);
    const ablation = experiments.find((item) => item.id === "P6-S4");
    expect(ablation?.status).toBe("NOT_RUN");
    expect(ablation?.metrics).toMatch(/not scored/i);
  });

  it("adds responsibility only where it is evidenced", () => {
    expect(getProject("slm-finetuning-evaluation")?.caseStudy.responsibility).toBeDefined();
    expect(getProject("ai-infrastructure-network-intelligence")?.caseStudy.responsibility).toBeDefined();
    expect(getProject("agentic-soc-platform")?.caseStudy.responsibility).toBeUndefined();
    expect(getProject("slm-finetuning-evaluation")?.caseStudy.responsibility?.environment).toMatch(
      /No joule/,
    );
  });
});
