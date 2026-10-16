import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ExperimentStatus } from "@/components/ExperimentStatus";
import { PageHeader } from "@/components/PageHeader";
import { Workbench } from "@/components/workbench/Workbench";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Evaluation Workbench: compare synthetic model and agent runs, inspect traces, and read how each metric is computed.",
};

export default function LabPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Lab"
        title="Evaluation Workbench"
        lede="Two source tabs, never mixed: SYNTHETIC fixture traces and MEASURED local artifacts (keyword routing_eval_v1 and heldout_v1). Gemini live routing remains BLOCKED. BOTS v3 remains NOT RUN. Import rejects malformed JSON. No sign-in. Do not pool incompatible experiments."
      />
      <Container className="space-y-12 pb-24">
        <ExperimentStatus />
        <Workbench />
      </Container>
    </main>
  );
}
