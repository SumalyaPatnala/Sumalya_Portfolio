"use client";

import { Suspense, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CsvImport } from "@/components/workbench/CsvImport";
import { MeasuredPanel } from "@/components/workbench/MeasuredPanel";
import { configurations, datasets, runsFor } from "@/lib/workbench/fixtures";
import {
  citationSupport,
  computeRunMetrics,
  metricGlossary,
  outputSupport,
} from "@/lib/workbench/metrics";
import {
  failureLabels,
  type CaseResult,
  type FailureCategory,
  type RunMetrics,
} from "@/lib/workbench/types";
import { cn } from "@/lib/cn";

function formatPct(value: number | null | undefined) {
  if (value === null || value === undefined) return "n/a";
  return `${Math.round(value * 1000) / 10}%`;
}

function formatMs(value: number) {
  return `${Math.round(value)} ms`;
}

function formatUsd(value: number) {
  return `$${value.toFixed(4)}`;
}

function formatLabels(result: CaseResult) {
  return result.failureCategories
    .filter((label) => label !== "none" || result.failureCategories.length === 1)
    .map((label) => failureLabels[label])
    .join(" · ");
}

function BarChart({
  rows,
  label,
}: {
  rows: { name: string; value: number; max: number }[];
  label: string;
}) {
  return (
    <figure className="space-y-3">
      <figcaption className="text-sm text-fg-muted">{label}</figcaption>
      {rows.map((row) => (
        <div key={row.name}>
          <div className="mb-1 flex justify-between text-xs text-fg-faint">
            <span>{row.name}</span>
            <span>{row.value}</span>
          </div>
          <div className="h-2 rounded-full bg-bg-soft">
            <div
              className="h-2 rounded-full bg-accent"
              style={{ width: `${row.max === 0 ? 0 : (row.value / row.max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </figure>
  );
}

function defaultConfigs(datasetId: string) {
  return datasetId === "synth-agent-ops"
    ? ["tool-agent"]
    : ["lexical-rag", "hybrid-gated"];
}

function SyntheticBanner() {
  return (
    <div
      role="status"
      className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm"
    >
      Interactive demonstration using synthetic example data. Not real
      model-training results.
    </div>
  );
}

export function Workbench() {
  return (
    <Suspense fallback={<SyntheticBanner />}>
      <WorkbenchBody />
    </Suspense>
  );
}

function WorkbenchBody() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const source =
    searchParams.get("source") === "measured" ? "measured" : "synthetic";

  const datasetParam = searchParams.get("dataset");
  const datasetId =
    datasetParam && datasets.some((item) => item.id === datasetParam)
      ? datasetParam
      : datasets[0].id;

  const configsParam = searchParams.get("configs");
  const selectedConfigs = configsParam
    ? configsParam.split(",").filter(Boolean)
    : defaultConfigs(datasetId);

  const caseParam = searchParams.get("case");
  const caseId = caseParam || "vqa-01";
  const artifactParam = searchParams.get("artifact");
  const artifactId =
    artifactParam === "heldout_v1" ? "heldout_v1" : "routing_eval_v1";

  function patch(next: {
    source?: "synthetic" | "measured";
    dataset?: string;
    configs?: string[];
    case?: string;
    artifact?: string;
  }) {
    const params = new URLSearchParams();
    const nextSource = next.source ?? source;
    const nextDataset = next.dataset ?? datasetId;
    const nextConfigs = next.configs ?? selectedConfigs;
    const nextCase = next.case ?? caseId;
    const nextArtifact = next.artifact ?? artifactId;
    params.set("source", nextSource);
    if (nextSource === "synthetic") {
      params.set("dataset", nextDataset);
      params.set("configs", nextConfigs.join(","));
      params.set("case", nextCase);
    } else {
      params.set("artifact", nextArtifact);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="kicker">Result source</legend>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line px-3 py-3">
            <input
              type="radio"
              name="workbench-source"
              checked={source === "synthetic"}
              onChange={() => patch({ source: "synthetic" })}
            />
            <span>
              <span className="block font-mono text-xs uppercase tracking-wider">
                SYNTHETIC
              </span>
              <span className="block text-sm text-fg-muted">
                Fixture traces. Not mixed with measured scores.
              </span>
            </span>
          </label>
          <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line px-3 py-3">
            <input
              type="radio"
              name="workbench-source"
              checked={source === "measured"}
              onChange={() => patch({ source: "measured" })}
            />
            <span>
              <span className="block font-mono text-xs uppercase tracking-wider">
                MEASURED
              </span>
              <span className="block text-sm text-fg-muted">
                Local artifacts: keyword routing_eval_v1 and heldout_v1. Not Gemini live.
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      {source === "measured" ? (
        <MeasuredPanel
          artifactId={artifactId}
          onArtifactChange={(id) => patch({ artifact: id })}
        />
      ) : (
        <SyntheticWorkbenchBody
        datasetId={datasetId}
        selectedConfigs={selectedConfigs}
        caseId={caseId}
        patch={patch}
      />
      )}
    </div>
  );
}

function SyntheticWorkbenchBody({
  datasetId,
  selectedConfigs,
  caseId,
  patch,
}: {
  datasetId: string;
  selectedConfigs: string[];
  caseId: string;
  patch: (next: {
    source?: "synthetic" | "measured";
    dataset?: string;
    configs?: string[];
    case?: string;
  }) => void;
}) {
  const relevantConfigs = configurations.filter((config) => {
    if (datasetId === "synth-agent-ops") return config.id === "tool-agent";
    return config.id !== "tool-agent";
  });

  const activeRuns = useMemo(
    () => runsFor(datasetId, selectedConfigs),
    [datasetId, selectedConfigs],
  );
  const metrics = activeRuns.map(computeRunMetrics);

  const availableCases = activeRuns[0]?.cases ?? [];
  const selectedCaseId = availableCases.some((item) => item.caseId === caseId)
    ? caseId
    : availableCases[0]?.caseId;

  return (
    <div className="space-y-8">
      <SyntheticBanner />

      <div className="grid gap-6 lg:grid-cols-3">
        <label className="block scroll-mt-28">
          <span className="kicker">Dataset</span>
          <select
            className="mt-2 w-full rounded-xl border border-line bg-bg-elev px-3 py-2"
            value={datasetId}
            onChange={(event) => {
              const next = event.target.value;
              patch({
                dataset: next,
                configs: defaultConfigs(next),
                case: next === "synth-agent-ops" ? "ops-01" : "vqa-01",
              });
            }}
          >
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-fg-muted">
            {datasets.find((item) => item.id === datasetId)?.description}
          </p>
        </label>

        <fieldset className="relative z-10 scroll-mt-28 lg:col-span-2">
          <legend className="kicker">Configurations</legend>
          <div className="mt-3 flex flex-col gap-2">
            {relevantConfigs.map((config) => (
              <label
                key={config.id}
                className="relative z-10 flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line px-3 py-3"
              >
                <input
                  type="checkbox"
                  className="relative z-10 mt-1 h-4 w-4 shrink-0"
                  checked={selectedConfigs.includes(config.id)}
                  onChange={() => {
                    const exists = selectedConfigs.includes(config.id);
                    const next = exists
                      ? selectedConfigs.filter((item) => item !== config.id)
                      : [...selectedConfigs, config.id];
                    patch({ configs: next });
                  }}
                />
                <span>
                  <span className="block">{config.name}</span>
                  <span className="block text-sm text-fg-muted">
                    {config.description} · {config.model} · {config.retrieval}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {metrics.length === 0 ? (
        <p className="text-fg-muted">Select at least one configuration.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="mb-3 text-left text-fg-muted">
                Comparison of fixture runs. Citation support skips unanswered
                citations; output support never skips a hallucination.
              </caption>
              <thead>
                <tr className="border-b border-line text-fg-muted">
                  <th className="py-2 pr-3 font-normal">Config</th>
                  <th className="py-2 pr-3 font-normal">N</th>
                  <th className="py-2 pr-3 font-normal">Success</th>
                  <th className="py-2 pr-3 font-normal">p50</th>
                  <th className="py-2 pr-3 font-normal">p95</th>
                  <th className="py-2 pr-3 font-normal">Citation support</th>
                  <th className="py-2 pr-3 font-normal">Output support</th>
                  <th className="py-2 font-normal">Notional cost</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((row) => (
                  <MetricRow key={row.runId} row={row} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <BarChart
              label="Success rate (percent)"
              rows={metrics.map((row) => ({
                name: labelFor(row.configId),
                value: Math.round(row.successRate * 100),
                max: 100,
              }))}
            />
            <BarChart
              label="Output support (percent)"
              rows={metrics.map((row) => ({
                name: labelFor(row.configId),
                value: Math.round(row.outputSupport * 100),
                max: 100,
              }))}
            />
          </div>

          <FailurePanel metrics={metrics} />
        </>
      )}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <h2 className="display text-2xl">Cases</h2>
          <ul className="mt-4 space-y-2">
            {availableCases.map((item) => (
              <li key={item.caseId}>
                <button
                  type="button"
                  onClick={() => patch({ case: item.caseId })}
                  className={cn(
                    "w-full rounded-xl border px-3 py-2 text-left text-sm",
                    selectedCaseId === item.caseId
                      ? "border-accent bg-accent/10"
                      : "border-line",
                  )}
                >
                  <span className="font-mono text-xs text-fg-faint">
                    {item.caseId}
                  </span>
                  <span className="mt-1 block">{item.prompt}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedCaseId ? (
          <TraceViews
            caseId={selectedCaseId}
            cases={activeRuns.map((run) => ({
              configId: run.configId,
              result: run.cases.find((item) => item.caseId === selectedCaseId),
            }))}
          />
        ) : null}
      </section>

      <section>
        <h2 className="display text-2xl">How metrics are computed</h2>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          {metricGlossary.map((item) => (
            <div key={item.name} className="panel p-4">
              <dt className="font-medium">{item.name}</dt>
              <dd className="mt-1 font-mono text-xs text-accent-soft">
                {item.formula}
              </dd>
              <dd className="mt-2 text-sm text-fg-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CsvImport />
    </div>
  );
}

function labelFor(configId: string) {
  return configurations.find((item) => item.id === configId)?.name ?? configId;
}

function MetricRow({ row }: { row: RunMetrics }) {
  return (
    <tr className="border-b border-line/70">
      <td className="py-2 pr-3">{labelFor(row.configId)}</td>
      <td className="py-2 pr-3">{row.n}</td>
      <td className="py-2 pr-3">{formatPct(row.successRate)}</td>
      <td className="py-2 pr-3">{formatMs(row.latencyP50Ms)}</td>
      <td className="py-2 pr-3">{formatMs(row.latencyP95Ms)}</td>
      <td className="py-2 pr-3">{formatPct(row.citationSupport)}</td>
      <td className="py-2 pr-3">{formatPct(row.outputSupport)}</td>
      <td className="py-2">{formatUsd(row.notionalCostUsd)}</td>
    </tr>
  );
}

function FailurePanel({ metrics }: { metrics: RunMetrics[] }) {
  const categories = Object.keys(failureLabels) as FailureCategory[];
  return (
    <section>
      <h2 className="display text-2xl">Failure analysis</h2>
      <p className="mt-2 text-sm text-fg-muted">
        Multi-label. A timeout that also hallucinates increments both columns.
        Labels are assigned in the fixture, not inferred live.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-fg-faint">
              <th className="py-2 pr-3 font-normal">Category</th>
              {metrics.map((row) => (
                <th key={row.runId} className="py-2 pr-3 font-normal">
                  {labelFor(row.configId)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category} className="border-b border-line/70">
                <td className="py-2 pr-3">{failureLabels[category]}</td>
                {metrics.map((row) => (
                  <td key={row.runId} className="py-2 pr-3">
                    {row.failureCounts[category]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TraceViews({
  caseId,
  cases,
}: {
  caseId: string;
  cases: { configId: string; result?: CaseResult }[];
}) {
  return (
    <div className="space-y-5">
      <h2 className="display text-2xl">Trace · {caseId}</h2>
      {cases.map(({ configId, result }) =>
        result ? (
          <article key={configId} className="panel p-4">
            <h3 className="text-sm text-accent-soft">{labelFor(configId)}</h3>
            <p className="mt-2 text-sm">
              <span className="text-fg-faint">Expected. </span>
              {result.expected}
            </p>
            <p className="mt-2 text-sm">
              <span className="text-fg-faint">Output. </span>
              {result.output}
            </p>
            <p className="mt-2 text-sm">
              {result.success ? "Success" : "Failure"} · {formatLabels(result)} ·{" "}
              {result.latencyMs} ms · citation {formatPct(citationSupport(result))}{" "}
              · output {formatPct(outputSupport(result))}
            </p>
            <h4 className="mt-4 text-sm">Provenance</h4>
            <ol className="mt-3 space-y-2 border-l border-line pl-4">
              {result.trace.map((step, index) => (
                <li key={step.id}>
                  <p className="font-mono text-xs uppercase tracking-wider text-fg-faint">
                    {index + 1}. {step.kind} · {step.durationMs} ms · {step.id}
                  </p>
                  <p>{step.label}</p>
                  <p className="text-sm text-fg-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
            <h4 className="mt-4 text-sm">Evidence inspection</h4>
            <ul className="mt-2 space-y-2">
              {result.evidence.map((span) => (
                <li
                  key={span.id}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm",
                    span.usedInAnswer
                      ? span.supported
                        ? "border-ok/40"
                        : "border-danger/50"
                      : "border-line",
                  )}
                >
                  <p className="font-mono text-[0.68rem] text-fg-faint">
                    {span.id} · {span.sourceId} ·{" "}
                    {span.usedInAnswer ? "used in output" : "retrieved only"} ·{" "}
                    {span.supported ? "supported" : "unsupported"}
                  </p>
                  <p className="mt-1">{span.quote}</p>
                </li>
              ))}
            </ul>
          </article>
        ) : null,
      )}
    </div>
  );
}
