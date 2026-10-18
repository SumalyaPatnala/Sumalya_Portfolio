import Link from "next/link";
import { ProjectCover } from "@/components/ProjectCover";
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
  cinematic = false,
}: {
  project: Project;
  featured?: boolean;
  cinematic?: boolean;
}) {
  const readiness = projectReadiness(project);
  const href = `/work/${project.slug}`;
  const links = [
    { href, label: "Case study", external: false },
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
        "group mb-5 inline-flex w-full flex-col scroll-mt-36 break-inside-avoid overflow-hidden rounded-[1.6rem] border border-line text-ink shadow-[var(--shadow)]",
        field[project.theme],
      )}
    >
      <Link
        href={href}
        className="relative block no-underline"
        aria-label={`${project.title} case study`}
      >
        <ProjectCover
          project={project}
          ratio={cinematic ? "cinematic" : featured ? "4:5" : project.aspect}
          priority={featured || cinematic}
          sizes={
            featured || cinematic
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
          }
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:opacity-0"
          aria-hidden="true"
        />
        <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs text-ink">
          Open case study
        </p>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/70">
          {readinessLabels[readiness]}
        </p>
        <h3 className="display mt-2 text-2xl leading-tight text-ink sm:text-3xl">
          <Link href={href} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/80">
          {project.lede}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technical tags">
          {project.tech.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-ink/15 bg-cream/50 px-2 py-0.5 font-mono text-[0.65rem] text-ink/75"
            >
              {tag}
            </li>
          ))}
        </ul>
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
