# Launch checklist

Checked 8 Oct 2026 against this repository.

## Ran successfully

| Check | Result |
| --- | --- |
| `npm install` | Pass |
| `npm run lint` | Pass (eslint, 0 errors) |
| `npm run typecheck` | Pass |
| `npm test` (Vitest) | Pass — 10 tests in `tests/metrics.test.ts` and `tests/projects.test.ts` |
| `npm run build` | Pass — Next.js 16.4.0, pages prerender |
| `npm run dev` | Pass — served at http://localhost:3000 |
| `npm run test:e2e` (Playwright Chromium) | Pass — 4 smoke tests |

## Browser verification (Cursor browser, localhost)

Exercised as a recruiter would, not screenshot-only.

| Surface | Result |
| --- | --- |
| Home `/` | Hero, four-beat story, four featured projects with evidence labels |
| Work `/work` | Filter chips; six project cards; Cloud Run claimed only as a demo workbench with GitHub lag disclosed; no MCP/Vertex |
| Flagship case study `/work/ai-infrastructure-network-intelligence` | All ten case-study sections present |
| Lab `/lab` | Synthetic fixture comparison; case `vqa-06` opens traces and evidence for both configs |
| Research `/research` | Explicitly “not verified as published” |
| Experience `/experience` | Consulting vs employer vs academic labeled; Cisco via TCS; BofA via Infosys |
| Notes `/notes/...` | Draft status visible; Markdown renders |
| About `/about` | Date-based career path, no slogan years |
| Contact `/contact` | Email, GitHub, LinkedIn; **no phone** |
| Résumé `/resume` | Print button; phone omitted |
| 404 | Renders with links back to home/work/lab |
| Mobile menu | Opens, `aria-expanded`, Home–Contact links, Close |

Desktop nav is visible from the `xl` breakpoint. Below that, the hamburger is used so eight items do not overflow.

## Playwright

`npm run test:e2e` passed (4 Chromium smokes) after `npx playwright install chromium`. CI machines need that install step.

## Content honesty (see `docs/content-audit.md`)

- No Anthropic / OpenAI / DeepMind employment implied.
- SLM numbers shown only with **N=4** and repository CSV provenance.
- SOC labeled **in progress**; LangGraph/LLM layer not claimed.
- SFSU assistant **unpublished**.
- Professional retrieval described as architecture only.
- MCP / A2A / Vertex **not claimed**. Cloud Run claimed only as the personal demo workbench, with public GitHub `main` lag disclosed.
- Phone number from résumé PDFs is not on the site.

## Unfinished / follow-ups

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin before a public Vercel deploy (canonical URLs, OG, sitemap).
2. Playwright smoke tests once Chromium is installed.
3. Optional: import a real eval JSON into the Workbench using `lib/workbench/types.ts` — not wired yet, by design.
4. Claims listed in the content audit as “needs approval” stay off the site until you confirm them.
5. Empty PyCharm stubs `Sumalya-Patnala-Portfolio.py` and `requirements.txt` remain in the folder and are unused.
6. A local SFSU Streamlit prototype (outside this repo) contains a hardcoded third-party API key; rotate it. It was not copied here.
7. `sitemap.xml` is dynamic because it stamps `lastModified: new Date()`. Harmless; can be made static later.
8. Command palette (`⌘K`) is implemented; it was not clicked in the browser pass.

## Deploy

Follow `DEPLOYMENT.md`. No paid APIs, database, or secrets are required.
