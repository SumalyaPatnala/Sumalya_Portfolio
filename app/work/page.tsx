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
        title="Four public systems, then the rest of the work."
        lede="The featured four tell one argument: adapt, serve, dispatch, then ground. Filters change the index, not the facts. Incomplete work is labeled. Professional work is generalized. Metrics appear only when an artifact exists."
      />
      <WorkIndex />
    </main>
  );
}
