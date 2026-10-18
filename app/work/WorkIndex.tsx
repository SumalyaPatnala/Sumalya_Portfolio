"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Container } from "@/components/Container";
import { GalleryCard } from "@/components/GalleryCard";
import {
  areaLabels,
  featuredProjects,
  filterProjects,
  projectAreas,
  visionProjects,
  type ProjectArea,
} from "@/content/projects";
import { cn } from "@/lib/cn";

export function WorkIndex() {
  const [area, setArea] = useState<ProjectArea | "all">("all");
  const visible = useMemo(
    () => filterProjects(area === "all" ? undefined : area),
    [area],
  );

  const grouped = useMemo(() => {
    if (area !== "all") return null;
    const vision = visionProjects();
    const featured = featuredProjects();
    const used = new Set([...vision, ...featured].map((project) => project.slug));
    const rest = visible.filter((project) => !used.has(project.slug));
    return { vision, featured, rest };
  }, [area, visible]);

  return (
    <Container className="pb-24">
      <div className="sticky top-[3.35rem] z-30 -mx-5 border-b border-line bg-[color:color-mix(in_srgb,var(--bg)_88%,transparent)] px-5 py-2.5 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by area"
      >
        <FilterChip active={area === "all"} onClick={() => setArea("all")}>
          All
        </FilterChip>
        {projectAreas.map((item) => (
          <FilterChip
            key={item}
            active={area === item}
            onClick={() => setArea(item)}
          >
            {areaLabels[item]}
          </FilterChip>
        ))}
      </div>
      </div>
      <ul
        className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-muted"
        aria-label="Readiness key"
      >
        <li>Hosted demo</li>
        <li>Local prototype</li>
        <li>Public artifacts</li>
        <li>Research prototype</li>
        <li>Planned</li>
        <li>Professional · generalized</li>
      </ul>

      {visible.length === 0 ? (
        <p className="mt-10 text-fg-muted">No projects in this filter.</p>
      ) : grouped ? (
        <div className="mt-10 space-y-14">
          <GallerySection
            kicker="Computer vision"
            title="See, track, and say what is not built yet."
          >
            <div className="grid items-start gap-5 lg:grid-cols-[1.12fr_0.88fr]">
              {grouped.vision.map((project, index) => (
                <GalleryCard
                  key={project.slug}
                  project={project}
                  featured={index === 0}
                />
              ))}
            </div>
          </GallerySection>
          <GallerySection
            kicker="Four systems"
            title="Adapt, serve, dispatch, then ground."
          >
            <div className="grid gap-5 md:grid-cols-2">
              {grouped.featured.map((project) => (
                <GalleryCard key={project.slug} project={project} />
              ))}
            </div>
          </GallerySection>
          {grouped.rest.length > 0 ? (
            <GallerySection
              kicker="Also in the catalog"
              title="Academic and professional work, labeled as such."
            >
              <div className="grid gap-5 md:grid-cols-2">
                {grouped.rest.map((project) => (
                  <GalleryCard key={project.slug} project={project} />
                ))}
              </div>
            </GallerySection>
          ) : null}
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visible.map((project) => (
            <GalleryCard key={project.slug} project={project} />
          ))}
        </div>
      )}

      <p className="mt-10 max-w-3xl text-sm text-fg-faint">
        Looking for a specific case? Open it from a card, or use{" "}
        <Link href="/work/ai-infrastructure-network-intelligence" className="text-fg-muted">
          the flagship infrastructure study
        </Link>
        . A live URL is a hosted demo, not production. StyleWeave is planned.
        WorldSense is a local Phase 1 lab. Links appear only when a real
        destination exists.
      </p>
    </Container>
  );
}

function GallerySection({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <p className="kicker">{kicker}</p>
      <h2 className="display mt-2 max-w-3xl text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-coral bg-coral text-on-accent"
          : "border-line text-fg-muted hover:border-coral/50 hover:bg-rose/20 hover:text-fg",
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
