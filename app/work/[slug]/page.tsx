import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CaseStudyNav } from "@/components/CaseStudyNav";
import { CaseStudyToc } from "@/components/CaseStudyToc";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Container } from "@/components/Container";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { MeasuredVisuals } from "@/components/MeasuredVisuals";
import { ProjectCover } from "@/components/ProjectCover";
import { RoutingEvalTable } from "@/components/RoutingEvalTable";
import { SlmEvalTable } from "@/components/SlmEvalTable";
import { EvidenceBadge, StatusBadge } from "@/components/StatusBadge";
import { evidenceRecordExcerpt, routingDecisionExcerpt } from "@/content/artifacts";
import {
  getProject,
  neighboringProjects,
  projectReadiness,
  projects,
  readinessLabels,
  type Project,
} from "@/content/projects";
import { cn } from "@/lib/cn";

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
  const neighbors = neighboringProjects(project.slug);
  const readiness = projectReadiness(project);
  const vision = Boolean(project.vision);

  return (
    <main id="main" tabIndex={-1}>
      <Container className="pt-8 pb-6 sm:pt-12">
        <p className="text-sm">
          <Link href="/work" className="text-fg-muted hover:text-fg">
            Work
          </Link>
          <span aria-hidden="true" className="mx-2 text-fg-faint">
            /
          </span>
          <span className="text-fg">{project.title}</span>
        </p>

        <CinematicHero
          project={project}
          readiness={readinessLabels[readiness]}
          featuredFrame={vision || Boolean(project.spotlight)}
        />

        <CaseStudyToc
          extra={
            study.plannedRoadmap
              ? [{ href: "#planned", label: "Planned" }]
              : []
          }
        />
      </Container>

      <Container className="grid gap-10 pb-24 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
        <div className="min-w-0 space-y-14 sm:space-y-16">
          <StudySection id="problem" title="Problem and why it matters">
            <p>{project.problem}</p>
            <p className="mt-4">{study.whyItMatters}</p>
          </StudySection>

          <StudySection id="question" title="Research question">
            <blockquote className="display max-w-3xl text-2xl leading-snug text-fg sm:text-3xl">
              {study.question}
            </blockquote>
          </StudySection>

          <StudySection id="approach" title="Approach">
            <p>{project.contribution}</p>
            <h3 className="mt-8 text-lg">Constraints</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {study.constraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg">Decisions and tradeoffs</h3>
            <div className="mt-4 grid gap-4">
              {study.decisions.map((item) => (
                <article key={item.title} className="panel p-5">
                  <h4 className="text-base">{item.title}</h4>
                  <p className="mt-2 text-sm">{item.body}</p>
                </article>
              ))}
            </div>
          </StudySection>

          <StudySection id="architecture" title="Architecture">
            <p>{project.architectureSummary}</p>
            <div className="panel mt-6 p-4 sm:p-5">
              <ArchitectureDiagram variant={project.diagram} />
            </div>
            <ul className="mt-6 list-disc space-y-2 pl-5">
              {study.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </StudySection>

          <StudySection id="implementation" title="Implementation">
            <ul className="list-disc space-y-2 pl-5">
              {study.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-xs text-fg-faint">
              {project.tech.join(" · ")}
            </p>
            {project.slug === "ai-infrastructure-network-intelligence" ? (
              <div className="mt-6">
                <CodeSnippet {...routingDecisionExcerpt} />
              </div>
            ) : null}
            {project.slug === "agentic-soc-platform" ? (
              <div className="mt-6">
                <CodeSnippet {...evidenceRecordExcerpt} />
              </div>
            ) : null}
          </StudySection>

          <StudySection id="evaluation" title="Evaluation">
            <p>{study.evaluation}</p>
            <MeasuredVisuals slug={project.slug} />
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
          </StudySection>

          <StudySection id="results" title="Results">
            <ul className="list-disc space-y-2 pl-5">
              {study.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-6 space-y-4">
              {project.evidence.map((item) => (
                <p key={item.statement} className="text-sm">
                  <EvidenceBadge kind={item.kind} />
                  <span className="mt-1 block">{item.statement}</span>
                </p>
              ))}
            </div>
          </StudySection>

          {study.responsibility ? (
            <section aria-labelledby="responsibility-heading" className="scroll-mt-24">
              <h2 id="responsibility-heading" className="display text-3xl sm:text-4xl">
                Engineering responsibility
              </h2>
              <p className="study-copy mt-5">
                Optional analysis of this artifact. No estimated energy or carbon
                figures without a named method.
              </p>
              <dl className="mt-5 grid gap-4">
                <div className="panel p-5">
                  <dt className="text-sm text-accent-soft">Utility and correctness</dt>
                  <dd className="study-copy mt-2 text-sm">{study.responsibility.utility}</dd>
                </div>
                <div className="panel p-5">
                  <dt className="text-sm text-accent-soft">Reliability and evaluation</dt>
                  <dd className="study-copy mt-2 text-sm">{study.responsibility.reliability}</dd>
                </div>
                <div className="panel p-5">
                  <dt className="text-sm text-accent-soft">Computational efficiency</dt>
                  <dd className="study-copy mt-2 text-sm">{study.responsibility.efficiency}</dd>
                </div>
                {study.responsibility.environment ? (
                  <div className="panel p-5">
                    <dt className="text-sm text-accent-soft">Environmental impact</dt>
                    <dd className="study-copy mt-2 text-sm">
                      {study.responsibility.environment}
                    </dd>
                  </div>
                ) : null}
                <div className="panel p-5">
                  <dt className="text-sm text-accent-soft">Unresolved</dt>
                  <dd className="study-copy mt-2 text-sm">{study.responsibility.unresolved}</dd>
                </div>
              </dl>
            </section>
          ) : null}

          <StudySection id="limitations" title="Limitations">
            <ul className="list-disc space-y-2 pl-5">
              {study.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </StudySection>

          <StudySection id="next" title="Next steps">
            <ul className="list-disc space-y-2 pl-5">
              {study.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </StudySection>

          {study.plannedRoadmap ? (
            <StudySection id="planned" title={study.plannedRoadmap.title}>
              <p>
                These capabilities are labeled Planned. They are not implemented
                in the public RecommendationSystem repository and must wait until
                StyleWeave has completed its measured Phase 1 work.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {study.plannedRoadmap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </StudySection>
          ) : null}

          <StudySection id="reproduce" title="Reproducibility">
            <ol className="list-decimal space-y-2 pl-5">
              {study.reproduce.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </StudySection>

          <CaseStudyNav previous={neighbors.previous} next={neighbors.next} />
        </div>

        <aside className="no-print hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-faint">
              Evidence
            </p>
            <EvidenceRail project={project} />
          </div>
        </aside>
      </Container>
    </main>
  );
}

function StudySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2 id={`${id}-heading`} className="display text-3xl sm:text-4xl">
        {title}
      </h2>
      <div className="study-copy mt-5 max-w-3xl">{children}</div>
    </section>
  );
}

function CinematicHero({
  project,
  readiness,
  featuredFrame,
}: {
  project: Project;
  readiness: string;
  featuredFrame: boolean;
}) {
  return (
    <header className="mt-6">
      <figure className="group relative overflow-hidden rounded-[1.8rem] shadow-[var(--shadow)]">
        <ProjectCover
          project={project}
          ratio="cinematic"
          priority
          sizes="(max-width: 1100px) 100vw, 72rem"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
          aria-hidden="true"
        />
        <figcaption className="absolute bottom-3 left-4 right-4 text-xs text-cream/80">
          Original illustration — not a product screenshot or experimental result.
        </figcaption>
      </figure>
      <p className="kicker mt-6">{project.eyebrow}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-line px-2.5 py-1 text-xs text-fg-muted">
          {readiness}
        </span>
        <StatusBadge label={project.statusLabel} status={project.status} />
        <CopyLinkButton />
      </div>
      <h1 className="display mt-4 max-w-4xl text-balance text-3xl sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-fg-muted">{project.summary}</p>
      {featuredFrame && project.inProgress ? (
        <ul className="mt-5 grid gap-2 text-sm text-fg-muted sm:grid-cols-2">
          {project.inProgress.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      <HeroLinks project={project} />
    </header>
  );
}

function HeroLinks({
  project,
  ink = false,
}: {
  project: Project;
  ink?: boolean;
}) {
  const linkClass = ink
    ? "text-ink underline decoration-ink/35 underline-offset-4"
    : undefined;

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-4 text-sm">
        {project.github ? (
          <a href={project.github} rel="noreferrer" target="_blank" className={linkClass}>
            GitHub
          </a>
        ) : (
          <span className={ink ? "text-ink/70" : "text-fg-muted"}>No public repository</span>
        )}
        {project.demo ? (
          <a href={project.demo.href} rel="noreferrer" target="_blank" className={linkClass}>
            {project.demo.label}
          </a>
        ) : (
          <span className={ink ? "text-ink/70" : "text-fg-muted"}>No hosted demo</span>
        )}
      </div>
      {project.demo ? (
        <p className={cn("mt-3 max-w-2xl text-sm", ink ? "text-ink/75" : "text-fg-muted")}>
          {project.demo.note}
        </p>
      ) : null}
    </>
  );
}

function EvidenceRail({ project }: { project: Project }) {
  return (
    <ul className="space-y-3 text-sm text-fg-muted">
      <li>
        {project.github ? (
          <a href={project.github} rel="noreferrer" target="_blank">
            Public GitHub
          </a>
        ) : (
          "No public GitHub"
        )}
      </li>
      <li>
        {project.demo ? (
          <a href={project.demo.href} rel="noreferrer" target="_blank">
            {project.demo.label}
          </a>
        ) : (
          "No hosted demo"
        )}
      </li>
      <li>
        {project.evidence.some((item) => item.kind === "eval-artifact")
          ? "Eval artifact on this page"
          : "No public eval artifact"}
      </li>
    </ul>
  );
}
