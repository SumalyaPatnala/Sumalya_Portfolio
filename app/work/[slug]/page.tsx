import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Container } from "@/components/Container";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { ProjectArt } from "@/components/ProjectArt";
import { RoutingEvalTable } from "@/components/RoutingEvalTable";
import { SlmEvalTable } from "@/components/SlmEvalTable";
import { EvidenceBadge, StatusBadge } from "@/components/StatusBadge";
import { evidenceRecordExcerpt, routingDecisionExcerpt } from "@/content/artifacts";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const study = project.caseStudy;

  return (
    <main id="main" tabIndex={-1}>
      <Container className="pt-10 pb-8 sm:pt-16">
        <p className="kicker">{project.eyebrow}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <StatusBadge label={project.statusLabel} status={project.status} />
          <CopyLinkButton />
        </div>
        <h1 className="display mt-4 max-w-4xl text-balance text-3xl sm:text-5xl">
          {project.title}
        </h1>
        {project.art !== "none" ? (
          <div className="mt-6 max-w-4xl">
            <ProjectArt kind={project.art} className="aspect-[16/7]" />
            <p className="mt-2 text-xs text-fg-faint">
              Original placeholder illustration — not a product screenshot.
            </p>
          </div>
        ) : null}
        <p className="mt-5 max-w-2xl text-lg text-fg-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          {project.github ? (
            <a href={project.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
          ) : null}
          {project.demo ? (
            <a href={project.demo.href} rel="noreferrer" target="_blank">
              {project.demo.label}
            </a>
          ) : null}
        </div>
        {project.demo ? (
          <p className="mt-3 max-w-2xl text-sm text-fg-muted">{project.demo.note}</p>
        ) : null}
      </Container>

      <Container className="space-y-12 pb-24">
        <section>
          <h2 className="display text-3xl">Problem and why it matters</h2>
          <p className="mt-4 max-w-3xl text-fg-muted">{project.problem}</p>
          <p className="mt-3 max-w-3xl text-fg-muted">{study.whyItMatters}</p>
        </section>

        <section>
          <h2 className="display text-3xl">My technical contributions</h2>
          <p className="mt-4 max-w-3xl text-fg-muted">{project.contribution}</p>
        </section>

        <section>
          <h2 className="display text-3xl">Constraints</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {study.constraints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">System architecture</h2>
          <p className="mt-4 text-fg-muted">{project.architectureSummary}</p>
          <div className="panel mt-6 p-4">
            <ArchitectureDiagram variant={project.diagram} />
          </div>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-fg-muted">
            {study.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {project.slug === "ai-infrastructure-network-intelligence" ? (
          <CodeSnippet {...routingDecisionExcerpt} />
        ) : null}
        {project.slug === "agentic-soc-platform" ? (
          <CodeSnippet {...evidenceRecordExcerpt} />
        ) : null}

        <section>
          <h2 className="display text-3xl">Research hypotheses and tradeoffs</h2>
          <div className="mt-6 grid gap-4">
            {study.decisions.map((item) => (
              <article key={item.title} className="panel p-5">
                <h3 className="text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="display text-3xl">Models, algorithms, and implementation</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {study.implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-fg-muted">
            {project.tech.join(" · ")}
          </p>
        </section>

        <section>
          <h2 className="display text-3xl">Verification and evaluation</h2>
          <p className="mt-4 max-w-3xl text-fg-muted">{study.evaluation}</p>
          {project.slug === "slm-finetuning-evaluation" ? (
            <div className="mt-6">
              <SlmEvalTable />
            </div>
          ) : null}
          {project.slug === "ai-infrastructure-network-intelligence" ? (
            <div className="mt-6">
              <RoutingEvalTable />
            </div>
          ) : null}
        </section>

        <section>
          <h2 className="display text-3xl">Results</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {study.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-6 space-y-3">
            {project.evidence.map((item) => (
              <p key={item.statement} className="text-sm text-fg-muted">
                <EvidenceBadge kind={item.kind} />
                <span className="mt-1 block">{item.statement}</span>
              </p>
            ))}
          </div>
        </section>

        {study.responsibility ? (
          <section>
            <h2 className="display text-3xl">Engineering responsibility</h2>
            <p className="mt-3 max-w-3xl text-sm text-fg-muted">
              Optional analysis of this artifact. No estimated energy or carbon
              figures without a named method.
            </p>
            <dl className="mt-5 grid gap-4">
              <div className="panel p-5">
                <dt className="text-sm text-accent-soft">Utility and correctness</dt>
                <dd className="mt-2 text-sm text-fg-muted">{study.responsibility.utility}</dd>
              </div>
              <div className="panel p-5">
                <dt className="text-sm text-accent-soft">Reliability and evaluation</dt>
                <dd className="mt-2 text-sm text-fg-muted">{study.responsibility.reliability}</dd>
              </div>
              <div className="panel p-5">
                <dt className="text-sm text-accent-soft">Computational efficiency</dt>
                <dd className="mt-2 text-sm text-fg-muted">{study.responsibility.efficiency}</dd>
              </div>
              {study.responsibility.environment ? (
                <div className="panel p-5">
                  <dt className="text-sm text-accent-soft">Environmental impact</dt>
                  <dd className="mt-2 text-sm text-fg-muted">
                    {study.responsibility.environment}
                  </dd>
                </div>
              ) : null}
              <div className="panel p-5">
                <dt className="text-sm text-accent-soft">Unresolved</dt>
                <dd className="mt-2 text-sm text-fg-muted">{study.responsibility.unresolved}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        <section>
          <h2 className="display text-3xl">Failure analysis</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {study.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Future work</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-fg-muted">
            {study.next.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="display text-3xl">Reproducibility</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-fg-muted">
            {study.reproduce.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </Container>
    </main>
  );
}
