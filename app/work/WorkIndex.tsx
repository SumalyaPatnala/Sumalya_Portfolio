"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import {
  areaLabels,
  filterProjects,
  projectAreas,
  type ProjectArea,
} from "@/content/projects";
import { cn } from "@/lib/cn";

export function WorkIndex() {
  const [area, setArea] = useState<ProjectArea | "all">("all");
  const visible = useMemo(
    () => filterProjects(area === "all" ? undefined : area),
    [area],
  );

  return (
    <Container>
      <div className="flex scroll-mt-24 flex-wrap gap-2" role="group" aria-label="Filter by area">
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
      {visible.length === 0 ? (
        <p className="mt-10 text-fg-muted">No projects in this filter.</p>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
      <p className="mt-8 text-sm text-fg-faint">
        Looking for a specific case? Open it from a card, or use{" "}
        <Link href="/work/ai-infrastructure-network-intelligence" className="text-fg-muted">
          the flagship infrastructure study
        </Link>
        .
      </p>
    </Container>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm",
        active
          ? "border-accent bg-accent/15 text-fg"
          : "border-line text-fg-muted hover:text-fg",
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
