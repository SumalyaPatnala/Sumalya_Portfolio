import { describe, expect, it } from "vitest";
import {
  featuredProjects,
  filterProjects,
  getProject,
  projectReadiness,
  projects,
  visionProjects,
} from "@/content/projects";

describe("project catalog", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("features the four public systems in story order", () => {
    expect(featuredProjects().map((project) => project.slug)).toEqual([
      "ai-infrastructure-network-intelligence",
      "slm-finetuning-evaluation",
      "llmops-hybrid-inference",
      "agentic-soc-platform",
    ]);
    expect(filterProjects().slice(0, 4).map((project) => project.slug)).toEqual([
      "ai-infrastructure-network-intelligence",
      "slm-finetuning-evaluation",
      "llmops-hybrid-inference",
      "agentic-soc-platform",
    ]);
  });

  it("keeps the four GitHub URLs that appear on the résumé", () => {
    expect(getProject("ai-infrastructure-network-intelligence")?.github).toBe(
      "https://github.com/SumalyaPatnala/agentic-ai-infrastructure-network-intelligence",
    );
    expect(getProject("slm-finetuning-evaluation")?.github).toBe(
      "https://github.com/SumalyaPatnala/sdg-community-assistant/tree/main/03_slm_finetuning_evaluation",
    );
    expect(getProject("llmops-hybrid-inference")?.github).toBe(
      "https://github.com/SumalyaPatnala/sdg-community-assistant/tree/main/02_llmops_local_hybrid_inference",
    );
    expect(getProject("agentic-soc-platform")?.github).toBe(
      "https://github.com/SumalyaPatnala/agentic-soc-platform",
    );
  });

  it("does not claim MCP or Vertex on the network-intelligence project", () => {
    const project = getProject("ai-infrastructure-network-intelligence");
    expect(project).toBeDefined();
    const blob = [
      project?.tech.join(" "),
      project?.title,
      project?.contribution,
    ].join(" ");
    expect(blob).not.toMatch(/\bMCP\b/);
    expect(blob).not.toMatch(/Vertex/i);
    expect(blob).not.toMatch(/\bA2A\b/);
  });

  it("labels Cloud Run as a demo workbench and discloses GitHub lag", () => {
    const project = getProject("ai-infrastructure-network-intelligence");
    expect(project?.tech).toContain("Cloud Run");
    expect(project?.demo?.href).toMatch(/run\.app/);
    expect(project?.evidence.map((item) => item.statement).join(" ")).toMatch(
      /has not been pushed/i,
    );
    expect(project?.caseStudy.limitations.join(" ")).toMatch(/does not yet contain/i);
  });

  it("labels the SOC platform as in progress", () => {
    const project = getProject("agentic-soc-platform");
    expect(project?.status).toBe("personal-in-progress");
  });

  it("keeps SLM metrics tied to N=4 language and discloses leakage", () => {
    const project = getProject("slm-finetuning-evaluation");
    expect(project?.statusLabel).toMatch(/N=4/);
    expect(project?.caseStudy.results.join(" ")).toMatch(/N=4/);
    expect(project?.caseStudy.evaluation).toMatch(/train\.jsonl/);
    expect(project?.caseStudy.limitations.join(" ")).toMatch(/leakage/i);
    expect(project?.caseStudy.results.join(" ")).toMatch(/N=13/);
    expect(project?.caseStudy.results.join(" ")).toMatch(/0\.6031/);
    expect(project?.caseStudy.results.join(" ")).not.toMatch(/PENDING|BLOCKED/);
  });

  it("does not attach the Hugging Face Space as this LoRA eval demo", () => {
    const project = getProject("slm-finetuning-evaluation");
    expect(project?.demo).toBeUndefined();
    expect(project?.evidence.map((item) => item.statement).join(" ")).toMatch(
      /sibling SDG case assistant/i,
    );
  });

  it("does not claim BOTS v3 validation on the SOC project", () => {
    const project = getProject("agentic-soc-platform");
    const blob = [
      project?.caseStudy.evaluation,
      project?.caseStudy.results.join(" "),
      project?.evidence.map((item) => item.statement).join(" "),
    ].join(" ");
    expect(blob).toMatch(/not been run|has not been/i);
    expect(blob).not.toMatch(/validated on BOTS v3 data/i);
  });

  it("does not title the SLM project as production", () => {
    const project = getProject("slm-finetuning-evaluation");
    expect(project?.title).toBe("SLM Fine-Tuning & Evaluation");
    expect(project?.title).not.toMatch(/production/i);
  });

  it("labels StyleWeave as unimplemented with no metrics", () => {
    const project = getProject("styleweave-vlm-lab");
    expect(project?.status).toBe("personal-in-progress");
    expect(project?.github).toBeUndefined();
    expect(project?.caseStudy.results.join(" ")).toMatch(/No benchmark results/i);
    expect(project?.inProgress?.join(" ")).toMatch(/not implemented/i);
  });

  it("distinguishes hosted demo, local prototype, and planned work", () => {
    expect(projectReadiness(getProject("styleweave-vlm-lab")!)).toBe("planned");
    expect(projectReadiness(getProject("worldsense-ai")!)).toBe("local-prototype");
    expect(projectReadiness(getProject("ai-infrastructure-network-intelligence")!)).toBe(
      "hosted-demo",
    );
    expect(projectReadiness(getProject("slm-finetuning-evaluation")!)).toBe(
      "public-artifacts",
    );
  });

  it("keeps WorldSense Phase 1 local and does not claim later modules", () => {
    const project = getProject("worldsense-ai");
    expect(project?.status).toBe("personal-in-progress");
    expect(project?.github).toBeUndefined();
    const blob = [
      project?.contribution,
      project?.caseStudy.limitations.join(" "),
      project?.inProgress?.join(" "),
    ].join(" ");
    expect(blob).toMatch(/not implemented/i);
    expect(blob).toMatch(/SAM 2/);
    expect(visionProjects().map((item) => item.slug)).toEqual([
      "styleweave-vlm-lab",
      "worldsense-ai",
    ]);
  });

  it("does not claim MLflow is wired in the LLMOps serving path", () => {
    const project = getProject("llmops-hybrid-inference");
    expect(project?.tech.join(" ")).not.toMatch(/MLflow/i);
    expect(project?.caseStudy.limitations.join(" ")).toMatch(/not a wired/i);
  });
});
