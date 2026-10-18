import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WorkIndex } from "@/app/work/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects in research, evaluation, AI infrastructure, agents, and full-stack tooling.",
};

export default function WorkPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Selected work"
        title="Labs you can inspect, and work that is still a direction."
        lede="A visual catalog of computer vision, VLMs, recommendation, agentic systems, evaluation, and production ML. StyleWeave, WorldSense, and movie discovery lead. Cover images are original illustrations, not experimental evidence. Metrics appear only when an artifact exists."
      />
      <WorkIndex />
    </main>
  );
}
