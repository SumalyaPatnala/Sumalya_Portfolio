"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { CommandHint, CommandPalette } from "@/components/CommandPalette";
import { mobileExtras, nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color:color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md">
      <Container className="flex items-center justify-between gap-4 py-2.5">
        <Link href="/" className="display text-lg tracking-tight sm:text-xl">
          {site.name}
        </Link>
        <nav
          className="hidden items-center gap-3 lg:flex xl:gap-4"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm text-fg-muted transition-colors hover:text-fg",
                  active && "text-fg",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/resume"
            className="text-sm text-fg-muted hover:text-fg"
          >
            Résumé
          </Link>
          <CommandHint />
        </nav>
        <button
          type="button"
          className="rounded-md border border-line px-3 py-1.5 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Container>
      {open ? (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {mobileExtras.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.github}
              className="py-2 text-lg"
              rel="noreferrer"
              target="_blank"
              onClick={() => setOpen(false)}
            >
              GitHub
            </a>
          </Container>
        </div>
      ) : null}
      <CommandPalette />
    </header>
  );
}
