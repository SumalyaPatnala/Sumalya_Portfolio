export const limitsStatus =
  "Research direction in development. Mathematical novelty and empirical findings have not yet been established.";

export const limits = {
  title: "Intelligence Within Limits",
  kicker: "Research direction",
  question:
    "How can AI compute be planned and evaluated under real environmental constraints—energy, water, climate, and carbon—without hiding burden-shifting between regions?",
  motivation: [
    "Model quality work already shows that a cheaper-looking proxy (structure score, short outputs) can improve while the task metric falls. Resource proxies have the same failure mode.",
    "Siting, cooling, and water stress are infrastructure facts, not décor for a portfolio. The work starts by naming quantities and refusing invented savings.",
    "Personal practice comes first: small models, frozen evals, opt-in APIs, and documented blockers. The research program is larger than that practice and is not yet empirical.",
  ],
  framework: {
    title: "Candidate mathematical framing (unverified)",
    body: "A working sketch, not a theorem: treat a serving or training decision as a vector of task utility, error, latency, energy, water, and carbon, with regional capacity constraints. Optimization would be constrained, not unconstrained accuracy. No proof, uniqueness result, or closed-form solution is claimed. Novelty versus existing sustainable-computing and LCA literature has not been verified.",
    symbols: [
      "U — task utility on a frozen eval (not a proxy that can be gamed by format).",
      "R — resource vector (energy, water, carbon, peak power) with method and uncertainty.",
      "C(region, season) — local constraint set (grid mix, drought, cooling regime).",
      "Shift — residual burden moved to another region or time window; must be reported, not netted away.",
    ],
  },
  datasets: [
    {
      name: "IEA Electricity / energy statistics",
      use: "National and regional electricity generation mix as a public starting point for grid-intensity discussion.",
      caveat: "Not a data-center meter. Not a model-level joule count.",
    },
    {
      name: "EPA eGRID (US)",
      use: "Subregion CO₂e intensity for US electricity, if a US siting scenario is ever quantified.",
      caveat: "Annual averages hide hour-level variation. Not used in any scored experiment here.",
    },
    {
      name: "Aqueduct / public water-stress maps",
      use: "To name freshwater stress as a constraint rather than a footnote.",
      caveat: "Basin-scale, not cooling-tower telemetry.",
    },
    {
      name: "Existing SLM and routing artifacts on this site",
      use: "Latency, peak memory, generated-token caps, and blocked paid APIs as practice-level instrumentation.",
      caveat: "These are not life-cycle assessments.",
    },
  ],
  hypotheses: [
    "H1 — Format-adherence metrics can rise while task metrics fall under a tight token budget (supported for this LoRA adapter on heldout_v1 N=13; not a general LoRA law).",
    "H2 — Raising max_tokens will recover some base-model structure without reversing the LoRA SDG gap. Unverified. Would be an exploratory reuse of the frozen set, not a new independent validation.",
    "H3 — Keyword routing can match or beat a live LLM classifier on a frozen intent set at far lower serving cost. Unverified until Gemini is authorized.",
    "H4 — Reporting regional water and carbon constraints changes siting recommendations versus energy-only scoring. Unverified. No dataset has been ingested for this.",
  ],
  evaluation: [
    "Task metrics stay frozen and versioned (routing_eval_v1, heldout_v1). Do not retune labels to improve a sustainability story.",
    "Resource metrics require a named instrument: wall-clock, mlx_lm peak memory, token counts from logs. Joules and liters only if a meter or a cited intensity factor with uncertainty exists.",
    "Any regional comparison must show burden-shifting, not a single net-zero headline.",
    "Negative and blocked results remain in the register.",
  ],
  scope: [
    "In scope: framing, public data inventory, evaluation ethics, and tying personal ML practice to resource-aware decisions.",
    "Out of scope until evidence exists: original theorems, policy prescriptions, data-center design, employer energy data, carbon-offset claims.",
    "This page does not estimate kg CO₂e for the Phi-3 held-out run.",
  ],
  roadmap: [
    "Now: publish the direction, keep measured SLM/routing artifacts honest, parse truncation from the existing mlx_lm logs.",
    "Next: exploratory token-budget ablation (100 already run; 256 and 512 not run) on a copy of heldout_v1, labeled exploratory.",
    "Later: if a defensible energy method appears (hardware power meter or vendor joule API), attach it to the same run IDs. Do not backfill.",
    "Not scheduled: a paper until there is a result that survives a novelty check against existing literature.",
  ],
  contribute:
    "No public dataset, grant, or collaboration portal exists yet. The contribution path is the public GitHub artifacts and this site’s MEASURED JSON. Do not send private telemetry.",
} as const;