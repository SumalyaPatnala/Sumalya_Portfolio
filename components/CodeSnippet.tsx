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
    <figure className="panel overflow-hidden">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-3">
        <span className="text-sm text-fg">{title}</span>
        {href ? (
          <a
            href={href}
            rel="noreferrer"
            target="_blank"
            className="font-mono text-[0.68rem] text-fg-faint"
          >
            {path}
          </a>
        ) : (
          <span className="font-mono text-[0.68rem] text-fg-faint">{path}</span>
        )}
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.78rem] leading-relaxed text-fg-muted">
        <code>{code}</code>
      </pre>
      <p className="border-t border-line px-4 py-3 text-sm text-fg-muted">{note}</p>
    </figure>
  );
}
