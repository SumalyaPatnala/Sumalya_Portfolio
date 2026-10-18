import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Project, ProjectArt, ProjectTheme } from "@/content/projects";

export type ProjectArtKind = ProjectArt | "nodes" | "bars" | "ledger" | "papers" | "docs" | "route";

const diagramArt: Record<Project["diagram"], ProjectArtKind> = {
  weave: "weave",
  worldsense: "frames",
  router: "nodes",
  slm: "bars",
  soc: "ledger",
  multimodal: "papers",
  retrieval: "docs",
  llmops: "route",
};

const fills: Record<ProjectTheme, string> = {
  rose: "#F5A0B8",
  coral: "#EF795F",
  lavender: "#9A8BEA",
  teal: "#4CB9B1",
  yellow: "#F6CA60",
};

export function artKindFor(project: Project): ProjectArtKind {
  if (project.art !== "none") return project.art;
  return diagramArt[project.diagram];
}

export function ProjectArt({
  kind,
  theme = "coral",
  className,
}: {
  kind: ProjectArtKind;
  theme?: ProjectTheme;
  className?: string;
}) {
  if (kind === "none") return null;
  const Art = artMap[kind];
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-hidden="true"
    >
      <Art fill={fills[theme]} />
    </div>
  );
}

function WeaveArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      <rect width="640" height="360" fill="#9A8BEA" opacity="0.22" />
      {Array.from({ length: 11 }, (_, i) => (
        <path
          key={`h-${i}`}
          d={`M-20 ${28 + i * 32} C 120 ${8 + i * 32}, 240 ${48 + i * 32}, 660 ${20 + i * 32}`}
          fill="none"
          stroke="#FFF7F0"
          strokeWidth="11"
          strokeOpacity={0.35 + (i % 3) * 0.12}
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={`v-${i}`}
          d={`M${48 + i * 68} -20 C ${20 + i * 68} 140, ${80 + i * 68} 220, ${40 + i * 68} 380`}
          fill="none"
          stroke="#292039"
          strokeWidth="3"
          strokeOpacity="0.18"
        />
      ))}
      <circle cx="470" cy="92" r="54" fill="#F6CA60" />
      <circle cx="132" cy="268" r="38" fill="#EF795F" opacity="0.9" />
    </svg>
  );
}

function FramesArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      <rect x="36" y="40" width="568" height="280" rx="18" fill="#292039" opacity="0.12" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${56 + i * 138} 72)`}>
          <rect width="118" height="88" rx="10" fill="#FFF7F0" opacity="0.92" />
          <rect x="10" y="12" width="64" height="44" rx="6" fill="#EF795F" opacity={0.55 + i * 0.08} />
          <rect x="78" y="18" width="28" height="20" rx="4" fill="#F6CA60" />
          <text x="12" y="76" fill="#292039" fontSize="11" fontFamily="ui-monospace, monospace">
            t={i * 240}ms
          </text>
        </g>
      ))}
      <polyline
        points="70,250 160,228 250,262 340,214 430,246 520,198 580,220"
        fill="none"
        stroke="#292039"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="430" cy="246" r="8" fill="#F6CA60" />
    </svg>
  );
}

function NodesArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      {["Query", "Route", "Net", "Infer"].map((label, i) => (
        <g key={label} transform={`translate(${48 + i * 148} 110)`}>
          <rect width="120" height="64" rx="18" fill="#FFF7F0" />
          <text x="60" y="38" textAnchor="middle" fill="#292039" fontSize="16" fontFamily="ui-sans-serif, system-ui">
            {label}
          </text>
        </g>
      ))}
      <path d="M168 142 H196 M316 142 H344 M464 142 H492" stroke="#292039" strokeWidth="3" />
      <circle cx="520" cy="260" r="36" fill="#F6CA60" />
    </svg>
  );
}

function BarsArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      {[0.45, 0.72, 0.38, 0.9, 0.58].map((h, i) => (
        <rect
          key={i}
          x={80 + i * 100}
          y={300 - h * 200}
          width="64"
          height={h * 200}
          rx="12"
          fill="#292039"
          opacity={0.18 + i * 0.1}
        />
      ))}
      <text x="80" y="48" fill="#292039" fontSize="18" fontFamily="ui-monospace, monospace">
        N=13 held-out · not pooled
      </text>
    </svg>
  );
}

function LedgerArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="56" y={48 + i * 90} width="528" height="72" rx="16" fill="#FFF7F0" opacity={0.92 - i * 0.08} />
      ))}
      <text x="80" y="92" fill="#292039" fontSize="16" fontFamily="ui-monospace, monospace">
        evidence_id · no verdict
      </text>
      <text x="80" y="182" fill="#292039" fontSize="16" fontFamily="ui-sans-serif, system-ui">
        correlate only literal identifiers
      </text>
    </svg>
  );
}

function PapersArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      <rect x="70" y="48" width="180" height="240" rx="12" fill="#FFF7F0" transform="rotate(-8 160 168)" />
      <rect x="250" y="64" width="180" height="240" rx="12" fill="#FFF7F0" />
      <rect x="390" y="80" width="180" height="220" rx="12" fill="#292039" opacity="0.14" />
      <circle cx="520" cy="84" r="28" fill="#F6CA60" />
    </svg>
  );
}

function DocsArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      <rect x="90" y="70" width="460" height="28" rx="8" fill="#FFF7F0" />
      <rect x="90" y="122" width="360" height="18" rx="6" fill="#292039" opacity="0.2" />
      <rect x="90" y="158" width="410" height="18" rx="6" fill="#292039" opacity="0.16" />
      <rect x="90" y="194" width="280" height="18" rx="6" fill="#292039" opacity="0.12" />
      <rect x="90" y="246" width="140" height="40" rx="20" fill="#FFF7F0" />
    </svg>
  );
}

function RouteArt({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill={fill} />
      <path
        d="M60 180 C 180 60, 260 300, 400 160 S 560 80, 600 200"
        fill="none"
        stroke="#292039"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="60" cy="180" r="16" fill="#FFF7F0" />
      <circle cx="400" cy="160" r="16" fill="#F6CA60" />
      <circle cx="600" cy="200" r="16" fill="#FFF7F0" />
      <text x="48" y="56" fill="#292039" fontSize="16" fontFamily="ui-monospace, monospace">
        adapter → ollama → remote
      </text>
    </svg>
  );
}

const artMap: Record<Exclude<ProjectArtKind, "none">, (props: { fill: string }) => ReactNode> = {
  weave: WeaveArt,
  frames: FramesArt,
  nodes: NodesArt,
  bars: BarsArt,
  ledger: LedgerArt,
  papers: PapersArt,
  docs: DocsArt,
  route: RouteArt,
};
