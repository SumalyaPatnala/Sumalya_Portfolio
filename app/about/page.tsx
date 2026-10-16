import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: software and data engineering into applied ML and research-focused AI systems.`,
};

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="About"
        title="I learned production systems first, then used that habit on models."
        lede={`${site.location}. M.S. Business Analytics, San Francisco State University, 2024. B.Tech. Electronics and Communications Engineering, 2014.`}
      />
      <Container className="max-w-3xl space-y-6 pb-24 text-fg-muted">
        <p>
          I started in software and data engineering at Infosys in 2014: order
          management, incident work, then analytics pipelines and NLP systems.
          Accenture was a cloud data-engineering tour—Azure, Spark, Databricks—
          moving a large retail CRM workload into a warehouse people could
          actually trust. That is still how I look at model systems: if the
          inputs are dirty or the serving path is implicit, the demo is lying.
        </p>
        <p>
          Graduate school at SFSU, and research with Dr. Lihua Wang, shifted the
          center of gravity. The question was no longer “can we ship a pipeline”
          but “can a researcher inspect social-innovation evidence across papers
          and public video without losing the sources.” The assistant I built
          there is a prototype, not a paper. I keep it on the{" "}
          <Link href="/research" className="text-accent-soft">
            research page
          </Link>{" "}
          with that status visible.
        </p>
        <p>
          Since then the paid work has been applied AI in regulated and
          operational settings: document retrieval and evaluation at Bank of
          America via Infosys; feasibility, prototype evaluation, and
          supply-chain intelligence at Cisco via TCS. Consulting placements are
          named as consulting. I do not treat academic prototypes as production
          deployments, and I do not put employer internals on this site.
        </p>
        <p>
          The personal projects are where that habit becomes a public argument.
          I adapt a compact model and score the contract it was asked to keep (
          <Link href="/work/slm-finetuning-evaluation" className="text-accent-soft">
            SLM evaluation
          </Link>
          ), serve it through a router that logs which runtime actually ran (
          <Link href="/work/llmops-hybrid-inference" className="text-accent-soft">
            local/hybrid inference
          </Link>
          ), dispatch specialist diagnostics only after a typed route (
          <Link href="/work/ai-infrastructure-network-intelligence" className="text-accent-soft">
            network intelligence
          </Link>
          ), and refuse to let a later agent invent evidence (
          <Link href="/work/agentic-soc-platform" className="text-accent-soft">
            SOC investigation core
          </Link>
          ). The{" "}
          <Link href="/lab" className="text-accent-soft">
            Evaluation Workbench
          </Link>{" "}
          is the public sketch of the measurement layer. It runs on synthetic
          fixtures because honesty about data is part of the craft.
        </p>
        <p>
          I want to work on systems where measurement is not a slide at the end:
          environment authoring, eval harnesses, serving reliability, and the
          unglamorous interfaces researchers actually use. The loop I hold myself
          to is {site.philosophy} See{" "}
          <Link href="/practice" className="text-accent-soft">
            How I Build
          </Link>{" "}
          and the research direction{" "}
          <Link href="/research/intelligence-within-limits" className="text-accent-soft">
            Intelligence Within Limits
          </Link>
          —labeled in development, not as a completed study.
        </p>
      </Container>
    </main>
  );
}
