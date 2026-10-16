import Link from "next/link";
import { experiments, type ExperimentStatus } from "@/content/experiments";

const labels: Record<ExperimentStatus, string> = {
  MEASURED: "MEASURED",
  DRY_RUN: "DRY RUN",
  BLOCKED: "BLOCKED",
  NOT_RUN: "NOT RUN",
  SYNTHETIC: "SYNTHETIC",
};

export function ExperimentStatus() {
  return (
    <section className="space-y-4">
      <h2 className="display text-2xl">Experiment status</h2>
      <p className="max-w-3xl text-sm text-fg-muted">
        Source-linked run cards. BLOCKED and NOT RUN rows have no charts and no
        invented scores. SYNTHETIC Workbench fixtures stay in the other tab.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Phase 5 register. Metrics column is empty unless a versioned artifact exists.
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">ID</th>
              <th className="py-2 pr-3 font-normal">Experiment</th>
              <th className="py-2 pr-3 font-normal">N</th>
              <th className="py-2 pr-3 font-normal">Status</th>
              <th className="py-2 pr-3 font-normal">Metrics</th>
              <th className="py-2 font-normal">Blocker</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((item) => (
              <tr key={item.id} className="border-b border-line/70 align-top">
                <td className="py-2 pr-3 font-mono text-xs">{item.id}</td>
                <td className="py-2 pr-3">
                  <Link href={item.href} className="text-accent-soft">
                    {item.title}
                  </Link>
                  <span className="mt-1 block text-xs text-fg-muted">
                    {item.predictor}
                  </span>
                </td>
                <td className="py-2 pr-3">{item.n ?? "—"}</td>
                <td className="py-2 pr-3 font-mono text-xs">
                  {labels[item.status]}
                </td>
                <td className="py-2 pr-3">
                  {item.status === "MEASURED" ? item.metrics : "—"}
                </td>
                <td className="py-2 text-fg-muted">{item.blockers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
