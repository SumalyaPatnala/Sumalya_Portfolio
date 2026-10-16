/**
 * Short excerpts copied from public repositories inspected locally.
 * Paths are relative to those repos. Do not treat these as employer code.
 */

export const routingDecisionExcerpt = {
  repo: "agentic-ai-infrastructure-network-intelligence",
  path: "ai_network_ops/agent.py",
  href: "https://github.com/SumalyaPatnala/agentic-ai-infrastructure-network-intelligence/blob/main/ai_network_ops/agent.py",
  title: "RoutingDecision and invalid-route fallback",
  note: "The classifier is forbidden from answering. Invalid routes become INCIDENT rather than a guessed specialist.",
  language: "python",
  code: `class RoutingDecision(BaseModel):
    query: str
    route: str

def router(node_input: RoutingDecision):
    route = node_input.route.strip().upper()
    valid_routes = {"NETWORK", "INFERENCE", "INCIDENT", "CAPACITY"}
    if route not in valid_routes:
        route = "INCIDENT"
    return Event(
        route=route,
        output={"query": node_input.query, "route": route},
    )`,
} as const;

export const evidenceRecordExcerpt = {
  repo: "agentic-soc-platform",
  path: "app/models/evidence.py",
  href: "https://github.com/SumalyaPatnala/agentic-soc-platform/blob/main/app/models/evidence.py",
  title: "EvidenceRecord — citation without judgement",
  note: "The type carries no severity or verdict so later agents cannot inherit conclusions that were never derived from the telemetry.",
  language: "python",
  code: `class EvidenceRecord(BaseModel):
    """A normalized event plus the metadata needed to cite it."""

    evidence_id: str
    normalized_event: SecurityEvent
    order: int | None = None

def format_evidence_id(order: int) -> str:
    return f"ev-{order:06d}"`,
} as const;
