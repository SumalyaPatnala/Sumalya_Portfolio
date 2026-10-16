import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for AI systems, evaluation, and research engineering roles.`,
};

export default function ContactPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Contact"
        title="Email is the right first channel."
        lede="I read notes about evaluation, retrieval, serving, and research tooling more carefully than generic recruiting templates."
      />
      <Container className="pb-24">
        <div className="panel max-w-xl p-8">
          <p className="text-fg-muted">
            {site.name} · {site.headline} · {site.location}
          </p>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="kicker">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className="kicker">GitHub</dt>
              <dd className="mt-1">
                <a href={site.github} rel="noreferrer" target="_blank">
                  {site.githubHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="kicker">LinkedIn</dt>
              <dd className="mt-1">
                <a href={site.linkedin} rel="noreferrer" target="_blank">
                  linkedin.com/in/sumalya-patnala
                </a>
              </dd>
            </div>
            <div>
              <dt className="kicker">Résumé</dt>
              <dd className="mt-1">
                <Link href="/resume">Public résumé page (no phone number)</Link>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </main>
  );
}
