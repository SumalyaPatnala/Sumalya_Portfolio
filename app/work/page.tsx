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
        lede="Four public systems still tell one argument: adapt, serve, dispatch, then ground. Computer vision sits beside them, labeled as a local prototype or as planned. Filters change the index, not the facts. Metrics appear only when an artifact exists."
      />
      <WorkIndex />
    </main>
  );
}
