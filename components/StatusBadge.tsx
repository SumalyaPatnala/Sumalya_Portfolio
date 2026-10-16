import type { EvidenceKind, ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/cn";

const statusClass: Record<ProjectStatus, string> = {
  "personal-complete-artifacts": "text-ok border-ok/30",
  "personal-in-progress": "text-accent-soft border-accent/30",
  "academic-research": "text-fg-muted border-line",
  "professional-generalized": "text-fg-muted border-line",
};

export function StatusBadge({
  label,
  status,
}: {
  label: string;
  status: ProjectStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs leading-none",
        statusClass[status],
      )}
    >
      {label}
    </span>
  );
}

export function EvidenceBadge({ kind }: { kind: EvidenceKind }) {
  const label =
    kind === "repository"
      ? "Repository"
      : kind === "eval-artifact"
        ? "Eval artifact"
        : kind === "resume"
          ? "Résumé"
          : kind === "linkedin"
            ? "LinkedIn"
            : "Not claimed";
  return (
    <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-faint">
      {label}
    </span>
  );
}
