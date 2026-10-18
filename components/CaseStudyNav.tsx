import Link from "next/link";
import type { Project } from "@/content/projects";

export function CaseStudyNav({
  previous,
  next,
}: {
  previous?: Project;
  next?: Project;
}) {
  return (
    <nav
      aria-label="Adjacent case studies"
      className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/work/${previous.slug}`}
          className="panel group p-5 no-underline transition-colors hover:border-[color:color-mix(in_srgb,var(--coral)_45%,var(--line))]"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-faint">
            Previous
          </p>
          <p className="display mt-2 text-xl text-fg group-hover:underline">
            {previous.title}
          </p>
        </Link>
      ) : (
        <Link
          href="/work"
          className="panel p-5 no-underline hover:border-[color:color-mix(in_srgb,var(--coral)_45%,var(--line))]"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-faint">
            Index
          </p>
          <p className="display mt-2 text-xl">All work</p>
        </Link>
      )}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="panel group p-5 no-underline transition-colors hover:border-[color:color-mix(in_srgb,var(--coral)_45%,var(--line))] sm:text-right"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-faint">
            Next
          </p>
          <p className="display mt-2 text-xl text-fg group-hover:underline">
            {next.title}
          </p>
        </Link>
      ) : (
        <Link
          href="/work"
          className="panel p-5 no-underline hover:border-[color:color-mix(in_srgb,var(--coral)_45%,var(--line))] sm:text-right"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-faint">
            Index
          </p>
          <p className="display mt-2 text-xl">All work</p>
        </Link>
      )}
    </nav>
  );
}
