import Link from "next/link";
import { ProjectArt, artKindFor } from "@/components/ProjectArt";
import {
  projectReadiness,
  readinessLabels,
  type Project,
} from "@/content/projects";
import { cn } from "@/lib/cn";

const field: Record<Project["theme"], string> = {
  rose: "bg-rose",
  coral: "bg-coral",
  lavender: "bg-lavender",
  teal: "bg-teal",
  yellow: "bg-yellow",
};

export function GalleryCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const readiness = projectReadiness(project);
  const links = [
    { href: `/work/${project.slug}`, label: "Case study", external: false },
    project.github
      ? { href: project.github, label: "GitHub", external: true }
      : null,
    project.demo
      ? { href: project.demo.href, label: project.demo.label, external: true }
      : null,
  ].filter((item): item is { href: string; label: string; external: boolean } =>
    Boolean(item),
  );

  return (
    <article
      className={cn(
        "flex h-full scroll-mt-36 flex-col overflow-hidden rounded-[1.6rem] border border-line text-ink shadow-[var(--shadow)]",
        field[project.theme],
        featured && "lg:min-h-[28rem]",
      )}
    >
      <ProjectArt
        kind={artKindFor(project)}
        theme={project.theme}
        className={featured ? "aspect-[16/8] sm:aspect-[16/7]" : "aspect-[16/9]"}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/70">
          {readinessLabels[readiness]}
        </p>
        <h3 className="display mt-2 text-2xl leading-tight text-ink sm:text-3xl">
          <Link href={`/work/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">{project.summary}</p>
        <p className="mt-4 font-mono text-[0.68rem] text-ink/65">
          {project.tech.slice(0, 4).join(" · ")}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
          {links.map((item) =>
            item.external ? (
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
  );
}
