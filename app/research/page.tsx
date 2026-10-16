import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { limits, limitsStatus } from "@/content/limits";
import { research } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description: research.question,
};

export default function ResearchPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Research"
        title="What is measured, and what is still a direction."
        lede="Academic prototype work stays labeled unpublished. A newer infrastructure question is labeled in development. Neither is a paper."
      />
      <Container className="space-y-12 pb-24">
        <section className="panel p-6">
          <p className="kicker">{limits.kicker}</p>
          <h2 className="display mt-2 text-3xl">{limits.title}</h2>
          <p className="mt-3 max-w-3xl text-fg-muted">{limits.question}</p>
          <p className="mt-3 text-sm text-ok">{limitsStatus}</p>
          <Link
            href="/research/intelligence-within-limits"
            className="mt-4 inline-block text-sm text-accent-soft"
          >
            Open the research brief
          </Link>
        </section>

        <p className="text-fg-muted">{research.supervisor}</p>
        <h2 className="display text-3xl">{research.title}</h2>
        <p className="text-sm text-fg-muted">{research.status}</p>

        <section>
          <h2 className="display text-3xl">Research question</h2>
          <p className="mt-4 max-w-3xl text-lg text-fg-muted">{research.question}</p>
        </section>

        <section>
          <h2 className="display text-3xl">Approach</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {research.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="panel mt-6 p-4">
            <ArchitectureDiagram variant="multimodal" />
          </div>
        </section>

        <section>
          <h2 className="display text-3xl">Experiments</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {research.experiments.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Evaluation</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {research.evaluation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Observations and limitations</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm text-accent-soft">Observations</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-fg-muted">
                {research.observations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm text-accent-soft">Limitations</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-fg-muted">
                {research.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="display text-3xl">Future research directions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {research.future.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Research interests</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {research.interests.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3 py-1 text-sm text-fg-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm">
            Case study:{" "}
            <Link href="/work/multimodal-llm-assistant" className="text-accent-soft">
              Smart Multimodal LLM Assistant
            </Link>
            . Related public code lives on GitHub under Social Innovation research repositories.
          </p>
        </section>
      </Container>
    </main>
  );
}
