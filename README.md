# Sumalya Patnala — personal site

Personal website for Sumalya Patnala: AI/ML engineering, research engineering, and AI systems. Built as a static-first Next.js app. No paid APIs, database, authentication, or model keys.

The central claim of the site is also the constraint on the copy:

> I build reliable AI systems and the tooling that makes complex AI workflows usable, measurable, and reproducible.

Unverified numbers, unpublished papers, and employer internals are not used. See `docs/content-audit.md`.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS
- Markdown notes (`gray-matter` + `react-markdown`)
- Vitest for metric and content unit tests
- Playwright for optional browser smoke tests

## Setup

```bash
npm install
cp .env.example .env.local   # optional; defaults to http://localhost:3000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest |
| `npm run test:e2e` | Playwright smoke tests (starts `npm run dev` if needed) |

## Site map

- `/` Home
- `/work` Project index with filters
- `/work/[slug]` Case studies
- `/lab` Evaluation Workbench (synthetic fixtures)
- `/research` SFSU multimodal assistant
- `/experience` Timeline
- `/notes` Draft technical notes
- `/about` Biography
- `/contact` Email, GitHub, LinkedIn
- `/resume` Printable résumé **without a phone number**

## Evaluation Workbench

`/lab` compares deterministic JSON/TypeScript fixtures. Metrics are computed in `lib/workbench/metrics.ts` and covered by unit tests. The banner on the page is not optional copy: those numbers are **not** training results.

To add a future real eval export, match `lib/workbench/types.ts` and register a run in `content/workbench/runs.ts`. Do not wire live inference into this site without an explicit decision.

## Content policy

- Consulting roles are written as `Client (via Employer)`.
- Academic work is labeled unpublished unless a venue is verified.
- The leftover `Sumalya-Patnala-Portfolio.py` and `requirements.txt` files are empty PyCharm stubs and are not used by the site.

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md).
