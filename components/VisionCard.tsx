import Link from "next/link";
import { ProjectCover } from "@/components/ProjectCover";
import { StatusBadge } from "@/components/StatusBadge";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

const field: Record<Project["theme"], string> = {
  rose: "bg-rose",
  coral: "bg-coral",
  lavender: "bg-lavender",
  teal: "bg-teal",
  yellow: "bg-yellow",
};

export function VisionCard({
  project,
  offset = false,
}: {
  project: Project;
  offset?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-line text-ink shadow-[var(--shadow)]",
        field[project.theme],
        offset && "lg:mt-12",
      )}
    >
      <ProjectCover
        project={project}
        ratio={project.aspect === "16:9" ? "cinematic" : "4:5"}
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge label={project.statusLabel} status={project.status} />
        </div>
        <h3 className="display mt-3 text-3xl leading-tight text-ink">{project.title}</h3>
        <p className="mt-3 text-sm text-ink/80">{project.lede}</p>
        {project.inProgress?.length ? (
          <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
            {project.inProgress.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
          <Link href={`/work/${project.slug}`} className="text-ink underline decoration-ink/30">
            Case study
          </Link>
          {project.github ? (
            <a href={project.github} rel="noreferrer" target="_blank" className="text-ink">
              GitHub
            </a>
          ) : (
            <span className="text-ink/60">No public repo yet</span>
          )}
        </div>
      </div>
    </article>
  );
}
