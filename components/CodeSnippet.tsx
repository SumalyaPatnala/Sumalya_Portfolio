export function CodeSnippet({
  title,
  path,
  href,
  note,
  code,
}: {
  title: string;
  path: string;
  href?: string;
  note: string;
  code: string;
}) {
  return (
    <figure className="overflow-hidden rounded-[1.4rem] border border-line bg-ink text-cream">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-cream/15 px-4 py-3">
        <span className="text-sm text-cream">{title}</span>
        {href ? (
          <a
            href={href}
            rel="noreferrer"
            target="_blank"
            className="font-mono text-[0.68rem] text-cream/70 hover:text-cream"
          >
            {path}
          </a>
        ) : (
          <span className="font-mono text-[0.68rem] text-cream/70">{path}</span>
        )}
      </figcaption>
      <pre
        tabIndex={0}
        className="max-h-[28rem] overflow-auto px-4 py-4 font-mono text-[0.78rem] leading-relaxed text-cream/90"
      >
        <code>{code}</code>
      </pre>
      <p className="border-t border-cream/15 px-4 py-3 text-sm text-cream/80">{note}</p>
    </figure>
  );
}
