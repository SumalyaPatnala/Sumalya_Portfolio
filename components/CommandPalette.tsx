"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { nav, site } from "@/content/site";
import { projects } from "@/content/projects";

type Item = { href: string; label: string; group: string };

const extra: Item[] = [
  { href: "/lab", label: "Evaluation Workbench", group: "Lab" },
  { href: "/practice", label: "How I Build", group: "Site" },
  {
    href: "/research/intelligence-within-limits",
    label: "Intelligence Within Limits",
    group: "Research",
  },
  { href: "/resume", label: "Résumé", group: "Site" },
  { href: site.github, label: "GitHub profile", group: "External" },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo<Item[]>(() => {
    const base: Item[] = [
      ...nav.map((item) => ({ href: item.href, label: item.label, group: "Site" })),
      ...projects.map((project) => ({
        href: `/work/${project.slug}`,
        label: project.title,
        group: "Work",
      })),
      ...extra,
    ];
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="panel mx-auto mt-[12vh] max-w-lg overflow-hidden shadow-[var(--shadow)]"
        onClick={(event) => event.stopPropagation()}
      >
        <label className="sr-only" htmlFor="command-input">
          Jump to a page
        </label>
        <input
          id="command-input"
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Jump to a page or project"
          className="w-full border-b border-line bg-transparent px-4 py-3 text-fg outline-none"
        />
        <ul className="max-h-80 overflow-auto p-2">
          {items.length === 0 ? (
            <li className="px-3 py-4 text-sm text-fg-muted">No matches.</li>
          ) : (
            items.map((item) => (
              <li key={`${item.group}-${item.href}-${item.label}`}>
                <button
                  type="button"
                  className="flex w-full items-baseline justify-between rounded-lg px-3 py-2 text-left hover:bg-bg-soft"
                  onClick={() => {
                    setOpen(false);
                    if (item.href.startsWith("http")) {
                      window.open(item.href, "_blank", "noreferrer");
                    } else {
                      router.push(item.href);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-fg-faint">
                    {item.group}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-line px-4 py-2 text-xs text-fg-faint">
          Esc to close. This is site navigation, not a model.
        </p>
      </div>
    </div>
  );
}

export function CommandHint() {
  return (
    <span className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-fg-faint sm:inline">
      ⌘K
    </span>
  );
}
