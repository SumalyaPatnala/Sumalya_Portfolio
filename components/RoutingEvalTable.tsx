import {
  routingBaseline,
  routingConfusion,
  routingContract,
  routingEvalSource,
  routingLimitations,
  routingPerClass,
  routingSlices,
} from "@/content/routing/eval";

function pct(value: number) {
  return `${Math.round(value * 1000) / 10}%`;
}

export function RoutingEvalTable() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-fg-muted">
        Offline routing eval copied from{" "}
        <code>{routingEvalSource.path}</code> in{" "}
        <a href={routingEvalSource.repo} rel="noreferrer" target="_blank">
          {routingEvalSource.dataset}
        </a>
        . N={routingEvalSource.n} labeled queries + {routingEvalSource.probes}{" "}
        router probes. {routingEvalSource.note}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Deterministic <code>router()</code> contract. Not the Gemini classifier.
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Check</th>
              <th className="py-2 font-normal">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Valid / invalid route mapping (N={routingEvalSource.probes}, {routingContract.repeats} repeats)</td>
              <td className="py-2">{pct(routingContract.accuracy)}</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Repeated-run determinism</td>
              <td className="py-2">{pct(routingContract.determinismRate)}</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Query preservation</td>
              <td className="py-2">{pct(routingContract.queryPreservationRate)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            {routingBaseline.predictor}. Strict = gold only; lenient = acceptable set.
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Metric</th>
              <th className="py-2 font-normal">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Strict accuracy</td>
              <td className="py-2">{pct(routingBaseline.strictAccuracy)}</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Lenient accuracy</td>
              <td className="py-2">{pct(routingBaseline.lenientAccuracy)}</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Macro-F1 (unweighted over 4 routes)</td>
              <td className="py-2">{pct(routingBaseline.macroF1)}</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Invalid route rate (pre-router)</td>
              <td className="py-2">{pct(routingBaseline.invalidRouteRate)}</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">
                Network tool-policy Jaccard (N={routingBaseline.toolScoredN})
              </td>
              <td className="py-2">{pct(routingBaseline.meanToolJaccard)}</td>
            </tr>
            <tr className="border-b border-line/70">
              <td className="py-2 pr-3">Strict misses</td>
              <td className="py-2">{routingBaseline.strictMisses}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Per-class precision / recall / F1 on strict gold.
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
            {routingPerClass.map((row) => (
              <tr key={row.route} className="border-b border-line/70">
                <td className="py-2 pr-3">{row.route}</td>
                <td className="py-2 pr-3">{pct(row.precision)}</td>
                <td className="py-2 pr-3">{pct(row.recall)}</td>
                <td className="py-2 pr-3">{pct(row.f1)}</td>
                <td className="py-2">{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">
            Confusion matrix (rows gold, columns predicted).
          </caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Gold \ Pred</th>
              {routingConfusion.routes.map((route) => (
                <th key={route} className="py-2 pr-3 font-normal">
                  {route}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {routingConfusion.routes.map((gold, i) => (
              <tr key={gold} className="border-b border-line/70">
                <td className="py-2 pr-3">{gold}</td>
                {routingConfusion.matrix[i].map((value, j) => (
                  <td
                    key={routingConfusion.routes[j]}
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

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <caption className="mb-2 text-left text-fg-muted">Strict accuracy by slice.</caption>
          <thead>
            <tr className="border-b border-line text-fg-muted">
              <th className="py-2 pr-3 font-normal">Slice</th>
              <th className="py-2 pr-3 font-normal">N</th>
              <th className="py-2 font-normal">Strict</th>
            </tr>
          </thead>
          <tbody>
            {routingSlices.map((row) => (
              <tr key={row.slice} className="border-b border-line/70">
                <td className="py-2 pr-3">{row.slice}</td>
                <td className="py-2 pr-3">{row.n}</td>
                <td className="py-2">{pct(row.strict)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="list-disc space-y-1 pl-5 text-sm text-fg-muted">
        {routingLimitations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
