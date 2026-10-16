import heldoutArtifact from "@/content/measured/heldout_v1.json";
import {
  slmBootstrap,
  slmEvalSource,
  slmHeldoutSummary,
  slmMethod,
  slmScenarios,
  slmSummary,
} from "@/content/slm/eval";
import { truncationAnalysis } from "@/content/slm/truncation";

function pct(value: number) {
  return `${Math.round(value * 1000) / 10}%`;
}

export function SlmEvalTable() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-fg-muted">
        Repository-reported evaluation copied from{" "}
        <a href={slmEvalSource.repo} rel="noreferrer" target="_blank">
          {slmEvalSource.summaryFile}
        </a>{" "}
        and {slmEvalSource.resultsFile}. N={slmEvalSource.n}.{" "}
        {slmEvalSource.note}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Summary rows as stored in the public CSV. Train/test overlap: see limitations.
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Model</th>
              <th className="py-2 pr-3 font-normal">SDG hit</th>
              <th className="py-2 pr-3 font-normal">Structure</th>
              <th className="py-2 pr-3 font-normal">Safety</th>
              <th className="py-2 pr-3 font-normal">Actionability</th>
              <th className="py-2 font-normal">Latency</th>
            </tr>
          </thead>
          <tbody>
            {slmSummary.map((row) => (
              <tr key={row.model} className="border-b border-line/70">
                <td className="py-2 pr-3">{row.model}</td>
                <td className="py-2 pr-3">{pct(row.sdgHitRate)}</td>
                <td className="py-2 pr-3">{pct(row.structureScore)}</td>
                <td className="py-2 pr-3">{pct(row.safetyScore)}</td>
                <td className="py-2 pr-3">{pct(row.actionabilityScore)}</td>
                <td className="py-2">{row.latencySec.toFixed(2)}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Per-prompt scores. Safety remains 0 on two adapter rows. These four
            prompts paraphrase training rows.
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Prompt</th>
              <th className="py-2 pr-3 font-normal">Expected SDGs</th>
              <th className="py-2 pr-3 font-normal">Base SDG / struct / safe / act</th>
              <th className="py-2 font-normal">Adapter SDG / struct / safe / act</th>
            </tr>
          </thead>
          <tbody>
            {slmScenarios.map((row) => (
              <tr key={row.problem} className="border-b border-line/70 align-top">
                <td className="py-2 pr-3">{row.problem}</td>
                <td className="py-2 pr-3 font-mono text-xs">{row.expectedSdgs}</td>
                <td className="py-2 pr-3 font-mono text-xs">
                  {pct(row.base.sdgHitRate)} / {pct(row.base.structureScore)} /{" "}
                  {pct(row.base.safetyScore)} / {pct(row.base.actionabilityScore)}
                </td>
                <td className="py-2 font-mono text-xs">
                  {pct(row.adapter.sdgHitRate)} / {pct(row.adapter.structureScore)} /{" "}
                  {pct(row.adapter.safetyScore)} / {pct(row.adapter.actionabilityScore)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm text-fg-muted">
        <li>Base model: {slmMethod.baseModel}.</li>
        <li>{slmMethod.adapter}</li>
        <li>{slmMethod.hardware}</li>
        {slmMethod.metrics.map((item) => (
          <li key={item}>{item}</li>
        ))}
        <li>
          Bootstrap 95% interval on leaked adapter SDG hit (N=4, {slmBootstrap.nBoot}{" "}
          resamples, seed {slmBootstrap.seed}): {slmBootstrap.adapterSdgHit.low}–
          {slmBootstrap.adapterSdgHit.high}. {slmBootstrap.note}
        </li>
      </ul>

      <h3 className="display text-xl">Held-out N=13 (separate experiment)</h3>
      <p className="text-sm text-fg-muted">
        Run {slmEvalSource.heldoutRunId}. {slmEvalSource.heldoutStatus} LoRA
        improved structure and lexicon scores and <strong>lost</strong> SDG hit
        rate versus base. This is not a leaderboard and is not pooled with N=4.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Bootstrap means from the versioned MLX run. Intervals are resampling
            of 13 rows, not significance tests.
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Model</th>
              <th className="py-2 pr-3 font-normal">SDG hit</th>
              <th className="py-2 pr-3 font-normal">Structure</th>
              <th className="py-2 pr-3 font-normal">Safety</th>
              <th className="py-2 pr-3 font-normal">Actionability</th>
              <th className="py-2 font-normal">Latency</th>
            </tr>
          </thead>
          <tbody>
            {slmHeldoutSummary.map((row) => (
              <tr key={row.model} className="border-b border-line/70">
                <td className="py-2 pr-3">{row.model}</td>
                <td className="py-2 pr-3">{pct(row.sdgHitRate)}</td>
                <td className="py-2 pr-3">{pct(row.structureScore)}</td>
                <td className="py-2 pr-3">{pct(row.safetyScore)}</td>
                <td className="py-2 pr-3">{pct(row.actionabilityScore)}</td>
                <td className="py-2">{row.latencySec.toFixed(2)}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Post-hoc parse of mlx_lm generation-token lines in the same run.
            max_tokens=100. Not a new experiment. 256/512 NOT RUN.
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Model</th>
              <th className="py-2 pr-3 font-normal">Parsed</th>
              <th className="py-2 pr-3 font-normal">Hit cap</th>
              <th className="py-2 font-normal">Finished early</th>
            </tr>
          </thead>
          <tbody>
            {truncationAnalysis.models.map((row) => (
              <tr key={row.model} className="border-b border-line/70">
                <td className="py-2 pr-3">{row.model}</td>
                <td className="py-2 pr-3">
                  {row.parsed}/{truncationAnalysis.n}
                </td>
                <td className="py-2 pr-3">{row.hitCap}</td>
                <td className="py-2">{row.finishedEarly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Per-case SDG hit. LoRA complete misses: ho-009 (lighting/theft),
            ho-010 (forest/charcoal, malformed “SDG 1.5”).
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">ID</th>
              <th className="py-2 pr-3 font-normal">Gold</th>
              <th className="py-2 pr-3 font-normal">Base SDG</th>
              <th className="py-2 font-normal">LoRA SDG</th>
            </tr>
          </thead>
          <tbody>
            {(heldoutArtifact.cases as { id: string; gold: string; baseSdgHitRate: number; loraSdgHitRate: number }[]).map(
              (row) => (
                <tr key={row.id} className="border-b border-line/70">
                  <td className="py-2 pr-3 font-mono text-xs">{row.id}</td>
                  <td className="py-2 pr-3 font-mono text-xs">{row.gold}</td>
                  <td className="py-2 pr-3">{pct(row.baseSdgHitRate)}</td>
                  <td className="py-2">{pct(row.loraSdgHitRate)}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
