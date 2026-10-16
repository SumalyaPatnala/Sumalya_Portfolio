import type { Metadata } from "next";
import Link from "next/link";
import { ContourMark } from "@/components/ContourMark";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { limits, limitsStatus } from "@/content/limits";

export const metadata: Metadata = {
  title: limits.title,
  description: limitsStatus,
};

export default function IntelligenceWithinLimitsPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader kicker={limits.kicker} title={limits.title} lede={limitsStatus} />
      <Container className="space-y-12 pb-24">
        <div
          role="status"
          className="relative overflow-hidden rounded-2xl border border-ok/35 bg-ok/10 px-4 py-3 text-sm"
        >
          <ContourMark className="absolute inset-x-0 top-0 h-12 w-full opacity-50" />
          <p className="relative font-medium">{limitsStatus}</p>
        </div>

        <section>
          <h2 className="display text-3xl">Motivation</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {limits.motivation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Central research question</h2>
          <p className="mt-4 max-w-3xl text-lg text-fg-muted">{limits.question}</p>
        </section>

        <section>
          <h2 className="display text-3xl">{limits.framework.title}</h2>
          <p className="mt-4 max-w-3xl text-fg-muted">{limits.framework.body}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 font-mono text-sm text-fg-muted">
            {limits.framework.symbols.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Public datasets (candidates)</h2>
          <p className="mt-3 max-w-3xl text-sm text-fg-muted">
            Listed as starting points. None of these have been ingested or scored
            for this program.
          </p>
          <div className="mt-5 grid gap-4">
            {limits.datasets.map((item) => (
              <article key={item.name} className="panel p-5">
                <h3 className="text-lg">{item.name}</h3>
                <p className="mt-2 text-sm text-fg-muted">{item.use}</p>
                <p className="mt-2 text-sm text-fg-faint">{item.caveat}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="display text-3xl">Hypotheses requiring novelty verification</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {limits.hypotheses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Proposed evaluation methodology</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {limits.evaluation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Scope and limitations</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {limits.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Research roadmap</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-fg-muted">
            {limits.roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="display text-3xl">Public contribution</h2>
          <p className="mt-4 max-w-3xl text-fg-muted">{limits.contribute}</p>
          <p className="mt-6 text-sm">
            Practice layer:{" "}
            <Link href="/practice" className="text-accent-soft">
              How I Build
            </Link>
            . Measured SLM finding:{" "}
            <Link href="/notes/when-finetuning-looks-better" className="text-accent-soft">
              When fine-tuning looks better
            </Link>
            .
          </p>
        </section>
      </Container>
    </main>
  );
}
