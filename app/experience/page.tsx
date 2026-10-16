import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { roles } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Engineering timeline: consulting placements, academic research, and earlier data and software roles.",
};

const kindLabel = {
  "consulting-client": "Consulting placement",
  employer: "Employer",
  academic: "Academic",
} as const;

export default function ExperiencePage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Experience"
        title="A path from software and data systems into applied ML and research tooling."
        lede="Client placements name the consulting employer. Confidential product internals are omitted. Coursework is not listed as production work."
      />
      <Container className="pb-24">
        <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-10">
          {roles.map((role) => (
            <li key={role.id} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full bg-accent sm:-left-[2.65rem]"
              />
              <p className="kicker">
                {role.dates} · {kindLabel[role.kind]}
              </p>
              <h2 className="display mt-2 text-3xl">{role.title}</h2>
              <p className="mt-1 text-accent-soft">
                {role.org}
                {role.orgNote ? ` (${role.orgNote})` : ""}
              </p>
              <p className="text-sm text-fg-faint">{role.location}</p>
              <p className="mt-4 max-w-3xl text-fg-muted">{role.summary}</p>
              <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm text-fg-muted">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
