const sections = [
  { href: "#problem", label: "Problem" },
  { href: "#question", label: "Research question" },
  { href: "#approach", label: "Approach" },
  { href: "#architecture", label: "Architecture" },
  { href: "#implementation", label: "Implementation" },
  { href: "#evaluation", label: "Evaluation" },
  { href: "#results", label: "Results" },
  { href: "#limitations", label: "Limitations" },
  { href: "#next", label: "Next steps" },
] as const;

export function CaseStudyToc() {
  return (
    <nav
      aria-label="On this page"
      className="no-print mt-8 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
    >
      <ol className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        {sections.map((item, index) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev px-3 py-1.5 text-sm text-fg-muted no-underline hover:border-coral hover:text-fg"
            >
              <span className="font-mono text-[0.65rem] text-fg-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
