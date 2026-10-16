import Link from "next/link";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { EvidenceBadge, StatusBadge } from "@/components/StatusBadge";
import type { Project } from "@/content/projects";
import { areaLabels } from "@/content/projects";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const evidence = project.evidence[0];

  return (
    <article className="panel flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge label={project.statusLabel} status={project.status} />
      </div>
      <h3 className="display mt-3 text-xl leading-tight sm:text-2xl">
        <Link href={`/work/${project.slug}`} className="hover:text-accent-soft">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-fg-muted">{project.summary}</p>
      {featured ? (
        <div className="mt-4">
          <ArchitectureDiagram variant={project.diagram} compact />
        </div>
      ) : (
        <p className="mt-3 text-sm text-fg-muted">
          <span className="text-fg-faint">Contribution. </span>
          {project.contribution}
        </p>
      )}
      {evidence ? (
        <p className="mt-3 text-sm text-fg-muted">
          <EvidenceBadge kind={evidence.kind} />
          <span className="mt-1 block">{evidence.statement}</span>
        </p>
      ) : null}
      <p className="mt-3 font-mono text-[0.68rem] text-fg-faint">
        {project.tech.slice(0, 6).join(" · ")}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.areas.map((area) => (
          <span
            key={area}
            className="rounded-full border border-line px-2 py-0.5 text-xs text-fg-muted"
          >
            {areaLabels[area]}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link href={`/work/${project.slug}`} className="text-accent-soft">
          Case study
        </Link>
        {project.github ? (
          <a href={project.github} rel="noreferrer" target="_blank">
            GitHub
          </a>
        ) : (
          <span className="text-fg-faint">No public repo</span>
        )}
        {project.demo ? (
          <a href={project.demo.href} rel="noreferrer" target="_blank">
            {project.demo.label}
          </a>
        ) : null}
      </div>
    </article>
  );
}
