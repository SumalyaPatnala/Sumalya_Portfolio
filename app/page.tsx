import Link from "next/link";
import { Container } from "@/components/Container";
import { ContourMark } from "@/components/ContourMark";
import { ProjectCard } from "@/components/ProjectCard";
import { VisionCard } from "@/components/VisionCard";
import { featuredProjects, spotlightProjects } from "@/content/projects";
import { site, storyBeats } from "@/content/site";
import { getNotes } from "@/lib/notes";

export default function HomePage() {
  const featured = featuredProjects();
  const spotlight = spotlightProjects();
  const notes = getNotes()
    .filter((note) => note.status === "published")
    .slice(0, 3);
  const flagship = featured[0];

  return (
    <main id="main" tabIndex={-1}>
      <Container className="pt-10 pb-8 sm:pt-16 sm:pb-12">
        <p className="kicker hidden sm:block">
          {site.location} · {site.role}
        </p>
        <p className="kicker sm:hidden">AI Engineer · Bay Area</p>
        <h1 className="display mt-5 max-w-5xl text-[2.2rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[4.15rem]">
          <span className="block font-sans text-base font-medium tracking-tight text-fg-muted sm:text-lg">
            {site.name}
          </span>
          <span className="mt-3 block">{site.hero}</span>
        </h1>
        <p className="mt-5 max-w-3xl font-mono text-[0.72rem] uppercase tracking-[0.14em] text-fg-muted sm:text-xs">
          {site.positioning}
        </p>
        <p className="mt-4 max-w-3xl text-base text-fg-muted sm:text-lg">
          {site.role} at {site.employer}{" "}
          <span className="text-fg-faint">({site.employerVia})</span>
        </p>
        <p className="mt-1 text-sm text-fg-muted">{site.headline}</p>
        <p className="display mt-6 max-w-3xl text-2xl leading-snug text-fg sm:text-3xl">
          {site.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-[0.98rem] text-fg-muted">{site.supporting}</p>

        <div className="reveal mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn-primary rounded-full px-5 py-2.5 text-sm">
            Projects
          </Link>
          <Link href="/research" className="btn-ghost rounded-full px-5 py-2.5 text-sm">
            Research
          </Link>
          <a
            href={site.github}
            className="btn-ghost rounded-full px-5 py-2.5 text-sm"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Link href="/resume" className="btn-ghost rounded-full px-5 py-2.5 text-sm">
            Resume
          </Link>
          <Link href="/contact" className="btn-ghost rounded-full px-5 py-2.5 text-sm">
            Contact
          </Link>
          <Link href="/work" className="sr-only">
            Explore my work
          </Link>
          <Link href="/lab" className="btn-ghost rounded-full px-5 py-2.5 text-sm">
            Open Evaluation Workbench
          </Link>
          <Link href="/resume" className="sr-only">
            Download résumé
          </Link>
          <a href={site.github} className="sr-only" rel="noreferrer" target="_blank">
            View GitHub
          </a>
        </div>

        <aside className="relative mt-10 overflow-hidden rounded-[1.6rem] border border-line bg-bg-elev px-5 py-6">
          <ContourMark className="absolute inset-x-0 top-0 h-16 w-full opacity-70" />
          <p className="kicker relative">The argument</p>
          <p className="display relative mt-2 max-w-3xl text-xl italic text-fg sm:text-2xl">
            {site.story}
          </p>
          <p className="relative mt-3 max-w-2xl text-sm text-fg-muted">
            Four public repositories. One loop: measure, route, serve, then
            refuse invented evidence. The philosophy underneath is{" "}
            {site.philosophy}
          </p>
          <div className="relative mt-4 flex flex-wrap gap-4 text-sm">
            <Link href="/practice" className="text-accent-soft">
              How I Build
            </Link>
            <Link href="/research/intelligence-within-limits" className="text-accent-soft">
              Intelligence Within Limits
            </Link>
            <Link href="/notes/evaluation-before-orchestration">
              Evaluation before orchestration
            </Link>
          </div>
        </aside>
      </Container>

      <Container as="section" className="py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="kicker">See, track, and recommend</h2>
            <p className="display mt-2 max-w-3xl text-3xl sm:text-4xl">
              Fashion language, video evidence, and movie neighbors.
            </p>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-fg-muted">
          StyleWeave is Phase 0 research with a public repository and no
          metrics. WorldSense Phase 1 is local source, not a hosted demo. The
          movie recommender is a content-based Flask baseline, not a live
          streaming product.
        </p>
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-3">
          {spotlight.map((project, index) => (
            <VisionCard
              key={project.slug}
              project={project}
              offset={index === 1}
            />
          ))}
        </div>
      </Container>

      <Container as="section" className="py-6">
        <h2 className="kicker">Four systems, one story</h2>
        <p className="display mt-2 max-w-3xl text-3xl">
          Agents are only as honest as the objects they inherit.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {storyBeats.map((beat) => (
            <Link
              key={beat.id}
              href={beat.href}
              className="panel block p-5 transition-colors hover:border-coral/50 hover:bg-rose/10"
            >
              <p className="font-mono text-xs text-fg-faint">{beat.step}</p>
              <h3 className="display mt-2 text-xl">{beat.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{beat.body}</p>
            </Link>
          ))}
        </div>
      </Container>

      {flagship ? (
        <Container as="section" className="py-6">
          <aside className="panel grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="kicker">Live inspectable artifact</p>
              <h2 className="display mt-2 text-2xl">{flagship.title}</h2>
              <p className="mt-2 text-sm text-fg-muted">
                Hosted Cloud Run workbench reports API{" "}
                <code className="text-accent-soft">1.4.0</code> in demo mode,
                live classifier off. Typed{" "}
                <code className="text-accent-soft">RoutingDecision</code> plus
                offline <code className="text-accent-soft">routing_eval_v1</code>{" "}
                (N=134, keyword baseline → <code>router()</code>, not Gemini).
                Public GitHub <code>main</code> last pushed 17 Aug 2026 and does
                not yet contain the hosted revision.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link href={`/work/${flagship.slug}`} className="text-accent-soft">
                  Case study
                </Link>
                {flagship.demo ? (
                  <a href={flagship.demo.href} rel="noreferrer" target="_blank">
                    {flagship.demo.label}
                  </a>
                ) : null}
                {flagship.github ? (
                  <a href={flagship.github} rel="noreferrer" target="_blank">
                    Repository
                  </a>
                ) : null}
                <Link href="/lab?source=measured">Workbench (MEASURED routing eval)</Link>
              </div>
            </div>
          </aside>
        </Container>
      ) : null}

      <Container as="section" className="py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="kicker">Reliable systems</h2>
            <p className="display mt-2 text-3xl">The four public systems, with evidence attached.</p>
          </div>
          <Link href="/work" className="text-sm text-accent-soft">
            All projects
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
        </div>
      </Container>

      <Container as="section" className="pb-16">
        <div className="panel grid gap-6 p-6 md:grid-cols-2">
          <div>
            <h2 className="display text-2xl">Evaluation Workbench</h2>
            <p className="mt-3 text-sm text-fg-muted">
              SYNTHETIC fixture traces stay in one tab. MEASURED routing_eval_v1
              and heldout_v1 stay in another. The two sources are never averaged.
              No sign-in. No live model calls.
            </p>
            <Link href="/lab" className="mt-4 inline-block text-sm text-accent-soft">
              Open the lab
            </Link>
          </div>
          <div>
            <h2 className="display text-2xl">Notes</h2>
            <ul className="mt-3 space-y-2">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link href={`/notes/${note.slug}`} className="hover:text-accent-soft">
                    {note.title}
                  </Link>
                  <span className="ml-2 font-mono text-[0.65rem] uppercase text-fg-faint">
                    {note.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </main>
  );
}
