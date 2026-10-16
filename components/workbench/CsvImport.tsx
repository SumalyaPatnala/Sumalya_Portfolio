"use client";

import { useState } from "react";
import { parseSlmEvalCsv, type SlmParseResult } from "@/lib/slm/parseEvalCsv";

export function CsvImport() {
  const [result, setResult] = useState<SlmParseResult | null>(null);
  const [fileName, setFileName] = useState<string>("");

  function onFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setResult(parseSlmEvalCsv(text));
    };
    reader.readAsText(file);
  }

  return (
    <section className="panel p-5">
      <h2 className="display text-2xl">Optional SLM CSV inspect</h2>
      <p className="mt-2 text-sm text-fg-muted">
        Accepts only the public headers from{" "}
        <code>strong_eval_summary.csv</code> or{" "}
        <code>strong_eval_results.csv</code>. Parsing is local. An uploaded file
        is not a validated benchmark and is not mixed into the synthetic
        workbench fixtures.
      </p>
      <label className="mt-4 block text-sm">
        <span className="kicker">Choose a CSV</span>
        <input
          type="file"
          accept=".csv,text/csv"
          className="mt-2 block w-full text-sm"
          onChange={(event) => onFile(event.target.files?.[0])}
        />
      </label>
      {result ? (
        <div className="mt-4 text-sm" role={result.ok ? "status" : "alert"}>
          {result.ok ? (
            <>
              <p>
                Parsed {fileName || "file"} as {result.kind} · {result.rows.length}{" "}
                row{result.rows.length === 1 ? "" : "s"}. Local parse only.
              </p>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-line text-fg-faint">
                      <th className="py-1 pr-2 font-normal">Model</th>
                      <th className="py-1 pr-2 font-normal">SDG</th>
                      <th className="py-1 pr-2 font-normal">Structure</th>
                      <th className="py-1 pr-2 font-normal">Safety</th>
                      <th className="py-1 font-normal">Latency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.slice(0, 12).map((row, index) => (
                      <tr key={`${row.model}-${index}`} className="border-b border-line/60">
                        <td className="py-1 pr-2">{row.model}</td>
                        <td className="py-1 pr-2">{row.sdgHitRate}</td>
                        <td className="py-1 pr-2">{row.structureScore}</td>
                        <td className="py-1 pr-2">{row.safetyScore}</td>
                        <td className="py-1">{row.latencySec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p>Rejected: {result.error}</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
