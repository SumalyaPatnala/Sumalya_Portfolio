import { cn } from "@/lib/cn";

export type ProjectArtKind = "weave" | "frames" | "none";

export function ProjectArt({
  kind,
  className,
}: {
  kind: ProjectArtKind;
  className?: string;
}) {
  if (kind === "none") return null;
  return (
    <div
      className={cn("relative overflow-hidden rounded-[1.15rem]", className)}
      aria-hidden="true"
    >
      {kind === "weave" ? <WeaveArt /> : <FramesArt />}
    </div>
  );
}

function WeaveArt() {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="#F5A0B8" />
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

function FramesArt() {
  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="360" fill="#4CB9B1" />
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
