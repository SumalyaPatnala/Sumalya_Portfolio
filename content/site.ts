export const site = {
  name: "Sumalya Patnala",
  role: "AI Engineer, AI Incubation",
  employer: "Cisco",
  employerVia: "via Tata Consultancy Services",
  headline: "Applied ML · evaluation · AI infrastructure",
  location: "San Francisco Bay Area",
  email: "sumalyapatnala.28@gmail.com",
  github: "https://github.com/SumalyaPatnala",
  githubHandle: "SumalyaPatnala",
  linkedin: "https://www.linkedin.com/in/sumalya-patnala",
  tagline: "I build the measurement and routing layers that keep agentic systems honest.",
  philosophy: "Advance intelligence. Respect its footprint. Improve what comes next.",
  supporting:
    "AI Engineer at Cisco (via TCS). The public work is one argument in four systems: adapt a compact model and score the contract it was asked to keep; serve it through a router that logs which runtime actually ran; dispatch specialist diagnostics only after a typed route; refuse to let a later agent invent evidence. I do not claim frontier-scale training, vendor labeling platforms, or unpublished papers.",
  story:
    "Adapt a small model. Serve it through an inspectable router. Dispatch specialist tools only after a typed route. Do not let a later agent invent the evidence.",
} as const;

export const storyBeats = [
  {
    step: "01",
    id: "adapt",
    title: "Adapt, then score the contract",
    href: "/work/slm-finetuning-evaluation",
    body: "Phi-3 Mini + LoRA on structured SDG advice. Held-out N=13 raised format compliance and lowered gold-SDG hit. That is a reason not to ship the adapter as a win.",
  },
  {
    step: "02",
    id: "serve",
    title: "Serve what you can pin",
    href: "/work/llmops-hybrid-inference",
    body: "A FastAPI router with an explicit preference: adapter, local Ollama, or remote Hugging Face. Auto mode is for demos; pinned mode is for measurement.",
  },
  {
    step: "03",
    id: "dispatch",
    title: "Route before you call tools",
    href: "/work/ai-infrastructure-network-intelligence",
    body: "One typed RoutingDecision, original query intact, invalid routes become INCIDENT. A Cloud Run workbench is live in demo mode; public GitHub main is still the earlier graph.",
  },
  {
    step: "04",
    id: "ground",
    title: "Evidence before interpretation",
    href: "/work/agentic-soc-platform",
    body: "Normalize SIEM exports, keep provenance, correlate only literal identifiers. LangGraph and Kubernetes are reserved packages, not this milestone.",
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/lab", label: "Lab" },
  { href: "/research", label: "Research" },
  { href: "/experience", label: "Experience" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const mobileExtras = [
  { href: "/resume", label: "Résumé" },
  { href: "/lab", label: "Evaluation Workbench" },
  { href: "/practice", label: "How I Build" },
] as const;

export const focusAreas = storyBeats;

export const practiceNav = {
  href: "/practice",
  label: "How I Build",
} as const;

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
