import {
  routingEvalSource,
  routingPerClass,
} from "@/content/routing/eval";
import { slmEvalSource, slmHeldoutSummary } from "@/content/slm/eval";
import { cn } from "@/lib/cn";

function pct(value: number) {
  return `${Math.round(value * 1000) / 10}%`;
}

function Bar({
  value,
  tone = "coral",
}: {
  value: number;
  tone?: "coral" | "teal" | "lavender";
}) {
  const width = Math.max(0, Math.min(1, value)) * 100;
  const fill =
    tone === "teal"
      ? "bg-teal"
      : tone === "lavender"
        ? "bg-lavender"
        : "bg-coral";
  return (
    <div className="h-2.5 min-w-0 overflow-hidden rounded-full bg-bg-soft" aria-hidden="true">
      <div className={cn("h-full rounded-full", fill)} style={{ width: `${width}%` }} />
    </div>
  );
}

export function WorldSenseDeviceVisual() {
  return (
    <figure className="mt-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-[1.4rem] border border-line bg-teal/25 p-5 text-ink">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink/70">
            CPU · default
          </p>
          <p className="display mt-3 text-4xl sm:text-5xl">~200 ms</p>
          <p className="mt-2 text-sm text-ink/80">
            per frame, warm Faster R-CNN, same boxes
          </p>
        </article>
        <article className="rounded-[1.4rem] border border-line bg-rose/35 p-5 text-ink">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink/70">
            MPS · experiment override
          </p>
          <p className="display mt-3 text-4xl sm:text-5xl">~50 s</p>
          <p className="mt-2 text-sm text-ink/80">
            per frame · available, not compatible for this detector
          </p>
        </article>
      </div>
      <figcaption className="mt-3 text-sm text-fg-muted">
        Device policy from the local Phase 1 lab on Apple M3 Pro. Not a public
        benchmark, not mAP, and not a hosted demo.
      </figcaption>
    </figure>
  );
}

export function SlmHeldoutVisual() {
  const metrics = [
    { key: "sdgHitRate" as const, label: "SDG hit" },
    { key: "structureScore" as const, label: "Structure" },
    { key: "safetyScore" as const, label: "Safety" },
    { key: "actionabilityScore" as const, label: "Actionability" },
  ];

  return (
    <figure className="mt-6 panel p-5">
      <figcaption className="text-sm text-fg-muted">
        Held-out N={slmEvalSource.heldoutN} ({slmEvalSource.heldoutRunId}). Bars
        are the same frozen scores as the table below — not the leaked N=4 CSV.
      </figcaption>
      <div className="mt-5 grid gap-5">
        {metrics.map((metric) => (
          <div key={metric.key}>
            <p className="text-sm text-fg">{metric.label}</p>
            <ul className="mt-2 space-y-2">
              {slmHeldoutSummary.map((row, index) => (
                <li key={row.model} className="grid grid-cols-[minmax(4.75rem,7.5rem)_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
                  <span className="font-mono text-[0.68rem] text-fg-faint">
                    {row.model.replace(" Phi-3", "")}
                  </span>
                  <Bar
                    value={row[metric.key]}
                    tone={index === 1 ? "teal" : "lavender"}
                  />
                  <span className="text-right font-mono text-xs tabular-nums">
                    {pct(row[metric.key])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function RoutingClassVisual() {
  return (
    <figure className="mt-6 panel p-5">
      <figcaption className="text-sm text-fg-muted">
        Per-class F1 on {routingEvalSource.dataset}, N={routingEvalSource.n}.
        Offline instruction-keyword baseline → router(). Not Gemini. Not
        production traffic.
      </figcaption>
      <ul className="mt-5 space-y-3">
        {routingPerClass.map((row) => (
          <li
            key={row.route}
            className="grid grid-cols-[minmax(4.5rem,6.5rem)_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3"
          >
            <span className="font-mono text-xs">{row.route}</span>
            <Bar value={row.f1} tone="coral" />
            <span className="text-right font-mono text-xs tabular-nums">
              {pct(row.f1)}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function MeasuredVisuals({ slug }: { slug: string }) {
  if (slug === "worldsense-ai") return <WorldSenseDeviceVisual />;
  if (slug === "slm-finetuning-evaluation") return <SlmHeldoutVisual />;
  if (slug === "ai-infrastructure-network-intelligence") {
    return <RoutingClassVisual />;
  }
  return null;
}
