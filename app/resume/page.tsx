import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PrintButton } from "@/components/PrintButton";
import { roles } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Public résumé for ${site.name}. Phone number omitted.`,
};

export default function ResumePage() {
  return (
    <main id="main" tabIndex={-1} className="bg-bg">
      <Container className="py-12 print:max-w-3xl print:px-0">
        <div className="no-print mb-8 flex flex-wrap gap-3 text-sm">
          <PrintButton />
        </div>
        <p className="kicker">{site.location}</p>
        <h1 className="display mt-3 text-5xl">{site.name}</h1>
        <p className="mt-2 text-accent-soft">{site.headline}</p>
        <p className="mt-4 max-w-2xl">{site.tagline}</p>
        <p className="mt-4 text-sm text-fg-muted">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {" · "}
          <a href={site.github}>{site.githubHandle}</a>
          {" · "}
          <a href={site.linkedin}>LinkedIn</a>
        </p>
        <p className="mt-2 text-xs text-fg-faint">
          This page omits a phone number on purpose. Dates and consulting
          employers are listed; unverified percentage lifts are omitted.
        </p>

        <h2 className="display mt-10 text-2xl">Experience</h2>
        <div className="mt-4 space-y-6">
          {roles.map((role) => (
            <section key={role.id}>
              <h3 className="font-medium">
                {role.title}, {role.org}
                {role.orgNote ? ` (${role.orgNote})` : ""}
              </h3>
              <p className="text-sm text-fg-faint">
                {role.dates} · {role.location}
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm text-fg-muted">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <h2 className="display mt-10 text-2xl">Selected projects</h2>
        <p className="mt-3 max-w-2xl text-sm text-fg-muted">{site.story}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-fg-muted">
          {[
            ...featuredProjects(),
            ...projects.filter((project) => !project.featured),
          ].map((project) => (
            <li key={project.slug}>
              <span className="text-fg">{project.title}.</span> {project.summary}{" "}
              {project.github ? (
                <a href={project.github}>Code</a>
              ) : (
                <span>No public repository.</span>
              )}
              {project.demo ? (
                <>
                  {" "}
                  <a href={project.demo.href}>{project.demo.label}</a>
                </>
              ) : null}
            </li>
          ))}
        </ul>

        <h2 className="display mt-10 text-2xl">Education</h2>
        <p className="mt-3 text-sm">
          M.S. Business Analytics, San Francisco State University, May 2024
        </p>
        <p className="text-sm text-fg-muted">
          B.Tech. Electronics and Communications Engineering, Lendi Institute of
          Engineering &amp; Technology / JNTU Kakinada, 2014
        </p>
      </Container>
    </main>
  );
}
