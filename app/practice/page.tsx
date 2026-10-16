import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { practiceDisclaimer, principles } from "@/content/practice";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "How I Build",
  description: `${site.philosophy} Working principles tied to public evaluation artifacts.`,
};

export default function PracticePage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Practice"
        title="How I Build"
        lede={site.philosophy}
      />
      <Container className="space-y-10 pb-24">
        <p className="max-w-3xl text-fg-muted">{practiceDisclaimer}</p>
        <ol className="grid gap-4">
          {principles.map((item, index) => (
            <li key={item.title} className="panel p-5">
              <p className="font-mono text-xs text-fg-faint">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="display mt-2 text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm text-fg-muted">{item.body}</p>
              <Link href={item.evidenceHref} className="mt-4 inline-block text-sm text-accent-soft">
                {item.evidenceLabel}
              </Link>
            </li>
          ))}
        </ol>
        <p className="text-sm text-fg-muted">
          Related:{" "}
          <Link href="/research/intelligence-within-limits" className="text-accent-soft">
            Intelligence Within Limits
          </Link>{" "}
          is a research direction in development, not a completed study.
        </p>
      </Container>
    </main>
  );
}
