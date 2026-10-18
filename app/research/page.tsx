import type { Metadata } from "next";
import Link from "next/link";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { research, researchThreads } from "@/content/research";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Research",
  description: research.question,
};

const themeClass = {
  rose: "bg-rose text-ink",
  coral: "bg-coral text-ink",
  lavender: "bg-lavender text-ink",
  teal: "bg-teal text-ink",
  yellow: "bg-yellow text-ink",
} as const;

export default function ResearchPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Research"
        title="Questions first. Results only when an artifact exists."
        lede="Computer vision, open VLMs, recommendation, model evaluation, and reliable reasoning are the current threads. Academic prototype work stays labeled unpublished. StyleWeave is Phase 0 documentation. Neither unpublished research nor Planned recommenders are papers."
      />
      <Container className="space-y-16 pb-24">
        <section>
          <p className="kicker">Index</p>
          <h2 className="display mt-2 max-w-3xl text-3xl sm:text-4xl">
            Threads, with status attached.
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {researchThreads.map((thread, index) => (
              <article
                key={thread.id}
                className={cn(
                  "flex flex-col rounded-[1.6rem] border border-line p-5 shadow-[var(--shadow)] sm:p-6",
                  themeClass[thread.theme],
                  index === 0 && "lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-8",
                )}
              >
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/70">
                    {thread.kicker}
                  </p>
                  <h3 className="display mt-2 text-2xl text-ink sm:text-3xl">{thread.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">
                    <span className="font-medium text-ink">Question. </span>
                    {thread.question}
                  </p>
                </div>
                <div className={cn(index === 0 && "lg:pt-7")}>
                  <p className="mt-4 text-sm text-ink/80 lg:mt-0">
                    <span className="font-medium text-ink">Method. </span>
                    {thread.method}
                  </p>
                  <p className="mt-3 text-sm text-ink/80">
                    <span className="font-medium text-ink">Status. </span>
                    {thread.status}
                  </p>
                  <p className="mt-3 text-sm text-ink/80">
                    <span className="font-medium text-ink">Evidence. </span>
                    {thread.evidence}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                    {thread.links.map((item) =>
                      "external" in item && item.external ? (
                        <a
                          key={item.href}
                          href={item.href}
                          rel="noreferrer"
                          target="_blank"
                          className="text-ink underline decoration-ink/30 underline-offset-4"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-ink underline decoration-ink/30 underline-offset-4"
                        >
                          {item.label}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <p className="text-fg-muted">{research.supervisor}</p>
          <h2 className="display text-3xl sm:text-4xl">{research.title}</h2>
          <p className="text-sm text-fg-muted">{research.status}</p>

          <div>
            <h3 className="display text-2xl">Research question</h3>
            <p className="mt-4 max-w-3xl text-lg text-fg-muted">{research.question}</p>
          </div>

          <div>
            <h3 className="display text-2xl">Methodology</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
              {research.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="panel mt-6 p-4">
              <ArchitectureDiagram variant="multimodal" />
            </div>
          </div>

          <div>
            <h3 className="display text-2xl">Experimentation status</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
              {research.experiments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="display text-2xl">Evaluation evidence</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
              {research.evaluation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="display text-2xl">Observations and limitations</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="panel p-5">
                <h4 className="text-sm text-accent-soft">Observations</h4>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-fg-muted">
                  {research.observations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="panel p-5">
                <h4 className="text-sm text-accent-soft">Limitations</h4>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-fg-muted">
                  {research.limitations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="display text-2xl">Future research directions</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
              {research.future.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="display text-2xl">Research interests</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {research.interests.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-bg-elev px-3 py-1 text-sm text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-fg-muted">
              Case study:{" "}
              <Link href="/work/multimodal-llm-assistant" className="text-accent-soft">
                Smart Multimodal LLM Assistant
              </Link>
              . Related public code lives on GitHub under Social Innovation research repositories.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
