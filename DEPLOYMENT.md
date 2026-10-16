# Deployment

The site is a standard Next.js App Router app. Vercel is the intended host. There is no database, auth provider, or paid API.

## Vercel

1. Push this repository to GitHub (or GitLab / Bitbucket).
2. In Vercel, **Add New Project** and import the repo.
3. Framework preset: Next.js. Build command: `npm run build`. Output: default.
4. Set one environment variable:

   | Name | Example |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |

   Use the final production origin, including `https://`, with no trailing slash. Canonical URLs, Open Graph, sitemap, and robots.txt all read this value.

5. Deploy. After the first production domain is attached, update `NEXT_PUBLIC_SITE_URL` if it changed and redeploy.

## Local production check

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

## Notes

- `.env.example` documents the single public variable. Do not put API keys in Vercel for this site.
- Draft notes set `robots: noindex` individually. The rest of the site is indexable.
- Playwright is optional in CI. If you add it, install browsers with `npx playwright install chromium`.
- `cacheComponents` is enabled (Next.js 16 default from `create-next-app`). This is a content site; pages should prerender. If a future dynamic feature needs cookies or headers, wrap that island in `Suspense` rather than turning the whole app dynamic.
