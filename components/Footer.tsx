import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="display text-2xl">{site.name}</p>
          <p className="mt-2 max-w-md text-sm text-fg-muted">{site.story}</p>
          <p className="mt-2 max-w-md text-sm italic text-fg-faint">{site.philosophy}</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
          <a href={site.github} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href={site.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <Link href="/practice">How I Build</Link>
          <Link href="/resume">Résumé</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </Container>
    </footer>
  );
}
