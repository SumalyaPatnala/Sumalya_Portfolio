# Editorial redesign — design proposal and component map

Visual identity only. Technical claims stay in `content/` and are not restated here as new results.

## Intent

Turn the current forest-dark lab site into a warm editorial research portfolio: creative technology + computer vision + production ML, without looking like a generic AI dashboard or a Pinterest clone.

Default surface is cream (`#FFF7F0`) with ink (`#292039`). Color is used in large editorial fields, not as neon glow. Dark mode is optional and operator-toggled; first paint stays light so the new identity is the default.

## Type

- **Display:** Fraunces — selected headings and the homepage hero.
- **UI / technical:** Geist Sans — body, nav, metrics, captions.
- **Mono:** Geist Mono — kickers, evidence labels, code.

Newsreader remains unused after this change; Fraunces is the editorial voice.

## Palette and contrast

| Token | Hex | Use |
| --- | --- | --- |
| Cream | `#FFF7F0` | Page background |
| Ink | `#292039` | Primary text, diagrams |
| Rose | `#F5A0B8` | StyleWeave field |
| Coral | `#EF795F` | Primary CTA, SOC accent |
| Lavender | `#9A8BEA` | LLMOps / research accent |
| Teal | `#4CB9B1` | WorldSense field |
| Yellow | `#F6CA60` | SLM / highlight chips |

On-accent text is ink, not white, so coral/yellow/rose buttons stay readable. Focus rings use coral on cream.

## Homepage structure (asymmetric)

1. **Hero** — name as kicker, statement as H1: “Building AI that can see, reason, and create.” Positioning line. Existing measurement tagline remains on the page (tests and honesty). CTAs: Work, Research, GitHub, Résumé, Contact. Lab workbench stays as a secondary control.
2. **Vision pair** — StyleWeave (rose, larger) and WorldSense (teal, offset). In-progress labels are mandatory. Original CSS illustrations, not stock photos.
3. **Four systems** — existing Adapt → Serve → Dispatch → Ground cards, restyled not rewritten.
4. **Live artifact** — Cloud Run 1.4.0 demo note, unchanged facts.
5. **Other featured work** — existing ProjectCards.
6. **Lab + notes** — existing workbench and published notes.

## Component map

| Component | Role | Notes |
| --- | --- | --- |
| `app/layout.tsx` | Fonts, theme script | `suppressHydrationWarning` on `<html>` |
| `app/globals.css` | Tokens, reveal, panels | Light default; `[data-theme="dark"]` |
| `app/page.tsx` | Homepage composition | Preserve tagline, CTAs, philosophy |
| `components/Nav.tsx` | Sticky editorial nav | Theme toggle; existing routes |
| `components/ThemeToggle.tsx` | Light/dark | localStorage `theme` |
| `components/VisionCard.tsx` | Flagship CV cards | Theme field + in-progress list |
| `components/ProjectArt.tsx` | Original CSS/SVG art | Weave / frames placeholders |
| `components/ProjectCard.tsx` | Index and remaining work | Color chip from `theme` |
| `components/Reveal.tsx` | Subtle rise-in | Disabled under reduced motion |
| `components/ArchitectureDiagram.tsx` | SVG diagrams | CSS variables for light/dark |
| `app/work/[slug]/page.tsx` | Case study | Add visual intro; keep “Problem and why it matters” |
| `content/site.ts` | `hero`, `positioning` | Do not replace `tagline` / `story` |
| `content/projects.ts` | Two new slugs | Honest in-progress copy only |

Routes, workbench, research, résumé, and evaluation tables are unchanged.

## Honesty constraints

- **StyleWeave VLM Lab:** no local or public repository was found. Card describes intended research (fashion visual search, open VLM adaptation, retrieval, tool use, evaluation) as **not implemented**. No metrics.
- **WorldSense AI:** local Phase 1 lab at `/Users/sumalyapatnala/WorldSense-AI`. Claims limited to the Phase 1 README: TorchVision Faster R-CNN, BYTE-style IDs, polygon ROI events, FastAPI + Next.js, MPS available but not compatible for this detector. SAM 2, VGGT, VQA, Kafka, LangGraph, ONNX, and cloud deploy are **not implemented**. No public GitHub URL.
- Existing four systems, SLM numbers, routing eval, SOC milestone, and Cloud Run GitHub lag stay verbatim.

## Out of this pass

Push, Vercel deploy, and rewriting case-study facts. Inner pages inherit tokens immediately; deeper editorial layouts for `/work` and `/research` can follow once the homepage is verified.
