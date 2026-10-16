"use client";

import { useMemo, useState } from "react";
import bundledHeldout from "@/content/measured/heldout_v1.json";
import bundledRouting from "@/content/measured/routing_eval_v1.json";
import {
  artifactsComparable,
  measuredMetricGlossary,
  parseMeasuredEval,
  validateMeasuredEval,
  type MeasuredEvalArtifact,
} from "@/lib/workbench/parseMeasuredEval";
import { cn } from "@/lib/cn";

function formatPct(value: number | null | undefined) {
  if (value === null || value === undefined) return "n/a";
  return `${Math.round(value * 1000) / 10}%`;
}

function formatMetric(key: string, value: number | null | undefined) {
  if (value === null || value === undefined) return "n/a";
  const name = key.toLowerCase();
  if (name.includes("latency") && name.includes("sec")) return `${value} s`;
  if (name.includes("latency")) return `${value} ms`;
  if (name === "n" || name.includes("miss") || name.includes("scored")) {
    return String(value);
  }
  if (value <= 1 && value >= 0) return formatPct(value);
  return String(value);
}

const bundledArtifacts: { id: string; label: string; data: unknown }[] = [
  {
    id: "routing_eval_v1",
    label: "routing_eval_v1 · keyword baseline (not Gemini)",
    data: bundledRouting,
  },
  {
    id: "heldout_v1",
    label: "heldout_v1 · Phi-3 Mini vs LoRA",
    data: bundledHeldout,
  },
];

function MeasuredBanner({ artifact }: { artifact: MeasuredEvalArtifact }) {
  return (
    <div
      role="status"
      className="rounded-2xl border border-ok/40 bg-ok/10 px-4 py-3 text-sm"
    >
      <span className="font-mono text-xs uppercase tracking-wider">MEASURED</span>
      <span className="mt-1 block">
        {artifact.name}. Predictor: {artifact.predictor}. This is not
        synthetic fixture data and is not mixed with the demonstration tab.
      </span>
    </div>
  );
}

function MetricTable({ artifact }: { artifact: MeasuredEvalArtifact }) {
  const entries = Object.entries(artifact.metrics).filter(
    ([, value]) => value !== undefined,
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <caption className="mb-2 text-left text-fg-muted">
          Run metrics for {artifact.datasetVersion}. N={artifact.n}.
        </caption>
        <thead>
          <tr className="border-b border-line text-fg-muted">
            <th className="py-2 pr-3 font-normal">Metric</th>
            <th className="py-2 font-normal">Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-line/70">
              <td className="py-2 pr-3 font-mono text-xs">{key}</td>
              <td className="py-2">
                {typeof value === "number" ? formatMetric(key, value) : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FailureList({
  artifact,
  selectedId,
  onSelect,
}: {
  artifact: MeasuredEvalArtifact;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const failures = artifact.failures ?? [];
  if (failures.length === 0) {
    return <p className="text-sm text-fg-muted">No per-case failures in this artifact.</p>;
  }
  const selected = failures.find((item) => item.id === selectedId) ?? failures[0];
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <h3 className="display text-xl">Failure examples</h3>
        <ul className="mt-3 space-y-2">
          {failures.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-2 text-left text-sm",
                  selected.id === item.id ? "border-accent bg-accent/10" : "border-line",
                )}
              >
                <span className="font-mono text-xs text-fg-muted">{item.id}</span>
                <span className="mt-1 block">{item.query}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <article className="panel p-4">
        <h3 className="text-sm text-accent-soft">{selected.id}</h3>
        <p className="mt-2 text-sm">{selected.query}</p>
        <p className="mt-3 font-mono text-xs text-fg-muted">
          gold {selected.gold} → predicted {selected.predicted}
          {selected.slice ? ` · ${selected.slice}` : ""}
          {selected.taxonomy ? ` · ${selected.taxonomy}` : ""}
        </p>
      </article>
    </section>
  );
}

function ComparisonTable({
  primary,
  imported,
}: {
  primary: MeasuredEvalArtifact;
  imported: MeasuredEvalArtifact;
}) {
  const check = artifactsComparable(primary, imported);
  const keys = Array.from(
    new Set([...Object.keys(primary.metrics), ...Object.keys(imported.metrics)]),
  );
  return (
    <section>
      <h3 className="display text-xl">Run comparison</h3>
      <p className="mt-2 text-sm text-fg-muted" role={check.comparable ? "status" : "alert"}>
        {check.comparable
          ? check.reason
          : `${check.reason} Numbers are shown side by side and are not aggregated.`}
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Metric</th>
              <th className="py-2 pr-3 font-normal">{primary.datasetVersion}</th>
              <th className="py-2 font-normal">{imported.datasetVersion}</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key} className="border-b border-line/70">
                <td className="py-2 pr-3 font-mono text-xs">{key}</td>
                <td className="py-2 pr-3">{String(primary.metrics[key] ?? "—")}</td>
                <td className="py-2">{String(imported.metrics[key] ?? "—")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function MeasuredPanel({
  artifactId = "routing_eval_v1",
  onArtifactChange,
}: {
  artifactId?: string;
  onArtifactChange?: (id: string) => void;
}) {
  const selectedBundle = bundledArtifacts.find((item) => item.id === artifactId) ?? bundledArtifacts[0];
  const bundled = useMemo(
    () => validateMeasuredEval(selectedBundle.data),
    [selectedBundle],
  );
  const [imported, setImported] = useState<MeasuredEvalArtifact | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [paste, setPaste] = useState("");
  const [selectedFailure, setSelectedFailure] = useState<string | null>(
    bundled.failures?.[0]?.id ?? null,
  );

  const active = imported ?? bundled;

  function ingest(text: string, sourceName: string) {
    setFileName(sourceName);
    const result = parseMeasuredEval(text);
    if (!result.ok) {
      setImported(null);
      setImportError(result.error);
      return;
    }
    setImportError(null);
    setImported(result.artifact);
    setSelectedFailure(result.artifact.failures?.[0]?.id ?? null);
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    ingest(await file.text(), file.name);
  }

  return (
    <div className="space-y-8">
      <MeasuredBanner artifact={active} />

      <label className="block text-sm">
        <span className="kicker">Bundled MEASURED artifact</span>
        <select
          aria-label="Bundled MEASURED artifact"
          className="mt-2 w-full rounded-xl border border-line bg-bg-elev px-3 py-2"
          value={selectedBundle.id}
          onChange={(event) => {
            setImported(null);
            setImportError(null);
            onArtifactChange?.(event.target.value);
          }}
        >
          {bundledArtifacts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <dl className="grid gap-3 text-sm md:grid-cols-2">
        <div className="panel p-4">
          <dt className="text-fg-muted">Dataset</dt>
          <dd>
            {active.datasetId} · {active.datasetVersion} · N={active.n}
          </dd>
        </div>
        <div className="panel p-4">
          <dt className="text-fg-muted">Configuration</dt>
          <dd>{active.configuration?.mode ?? active.kind}</dd>
        </div>
        {active.runId ? (
          <div className="panel p-4">
            <dt className="text-fg-muted">Run ID</dt>
            <dd className="font-mono text-xs">{active.runId}</dd>
          </div>
        ) : null}
        {active.datasetSha256 ? (
          <div className="panel p-4">
            <dt className="text-fg-muted">Dataset SHA-256</dt>
            <dd className="break-all font-mono text-xs">{active.datasetSha256}</dd>
          </div>
        ) : null}
      </dl>

      <MetricTable artifact={active} />

      {active.perClass ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <caption className="mb-2 text-left text-fg-muted">
              Per-class precision / recall / F1.
            </caption>
            <thead>
              <tr className="border-b border-line text-fg-muted">
                <th className="py-2 pr-3 font-normal">Route</th>
                <th className="py-2 pr-3 font-normal">P</th>
                <th className="py-2 pr-3 font-normal">R</th>
                <th className="py-2 pr-3 font-normal">F1</th>
                <th className="py-2 font-normal">Support</th>
              </tr>
            </thead>
            <tbody>
              {active.perClass.map((row) => (
                <tr key={row.route} className="border-b border-line/70">
                  <td className="py-2 pr-3">{row.route}</td>
                  <td className="py-2 pr-3">{formatPct(row.precision)}</td>
                  <td className="py-2 pr-3">{formatPct(row.recall)}</td>
                  <td className="py-2 pr-3">{formatPct(row.f1)}</td>
                  <td className="py-2">{row.support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {active.confusion ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <caption className="mb-2 text-left text-fg-muted">
              Confusion matrix (rows gold, columns predicted).
            </caption>
            <thead>
              <tr className="border-b border-line text-fg-muted">
                <th className="py-2 pr-3 font-normal">Gold \ Pred</th>
                {active.confusion.routes.map((route) => (
                  <th key={route} className="py-2 pr-3 font-normal">
                    {route}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {active.confusion.routes.map((gold, i) => (
                <tr key={gold} className="border-b border-line/70">
                  <td className="py-2 pr-3">{gold}</td>
                  {active.confusion!.matrix[i].map((value, j) => (
                    <td
                      key={active.confusion!.routes[j]}
                      className={i === j ? "py-2 pr-3 text-ok" : "py-2 pr-3"}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {active.failureCategories ? (
        <ul className="grid gap-2 text-sm md:grid-cols-2">
          {Object.entries(active.failureCategories).map(([label, count]) => (
            <li key={label} className="rounded-xl border border-line px-3 py-2">
              <span className="font-mono text-xs">{label}</span>
              <span className="ml-2">{count}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <FailureList
        artifact={active}
        selectedId={selectedFailure}
        onSelect={setSelectedFailure}
      />

      {imported ? <ComparisonTable primary={bundled} imported={imported} /> : null}

      <section>
        <h3 className="display text-xl">Known limitations</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-fg-muted">
          {active.limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {active.notMeasured.map((item) => (
            <li key={item}>Not measured: {item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="display text-xl">Measured metric formulas</h3>
        <dl className="mt-5 grid gap-4 md:grid-cols-2">
          {measuredMetricGlossary.map((item) => (
            <div key={item.name} className="panel p-4">
              <dt className="font-medium">{item.name}</dt>
              <dd className="mt-1 font-mono text-xs text-accent-soft">{item.formula}</dd>
              <dd className="mt-2 text-sm text-fg-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel p-5">
        <h3 className="display text-2xl">Import a measured JSON artifact</h3>
        <p className="mt-2 text-sm text-fg-muted">
          Accepts only <code>schemaVersion: measured-eval-v1</code> with
          provenance MEASURED. Malformed, synthetic, or incomplete files are
          rejected. Imports are never averaged with the synthetic demonstration.
        </p>
        <label className="mt-4 block text-sm">
          <span className="kicker">Choose JSON</span>
          <input
            type="file"
            accept="application/json,.json"
            aria-label="Choose JSON"
            className="mt-2 block w-full text-sm"
            onChange={(event) => void onFile(event.target.files?.[0])}
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="kicker">Or paste JSON</span>
          <textarea
            aria-label="Paste measured JSON"
            className="mt-2 h-28 w-full rounded-xl border border-line bg-bg-elev px-3 py-2 font-mono text-xs"
            value={paste}
            onChange={(event) => setPaste(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="mt-3 rounded-full border border-line px-4 py-2 text-sm"
          onClick={() => ingest(paste, "pasted.json")}
        >
          Validate import
        </button>
        {fileName && importError ? (
          <p className="mt-3 text-sm text-danger" role="alert" data-testid="measured-import-error">
            Rejected {fileName}: {importError}
          </p>
        ) : null}
        {fileName && imported && !importError ? (
          <p className="mt-3 text-sm" role="status">
            Loaded {fileName} as MEASURED · {imported.kind} · N={imported.n}.
          </p>
        ) : null}
      </section>
    </div>
  );
}
