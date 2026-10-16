import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/Container";
import { getNoteSlugs, readNote } from "@/lib/notes";

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = readNote(slug);
  if (!note) return { title: "Note" };
  return {
    title: note.title,
    description: note.summary,
    robots: note.status === "draft" ? { index: false, follow: true } : undefined,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = readNote(slug);
  if (!note) notFound();

  return (
    <main id="main" tabIndex={-1}>
      <Container className="pt-10 pb-24 sm:pt-16">
        <p className="kicker">
          {note.date} · {note.status}
        </p>
        <h1 className="display mt-4 max-w-3xl text-balance text-3xl sm:text-5xl">
          {note.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-fg-muted">{note.summary}</p>
        <article className="mt-10 max-w-2xl space-y-4 text-fg-muted [&_a]:text-accent-soft [&_h2]:display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:text-fg [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_ol_li]:list-decimal [&_p]:leading-relaxed [&_strong]:text-fg [&_code]:font-mono [&_code]:text-[0.86em] [&_code]:text-accent-soft">
          <ReactMarkdown>{note.body}</ReactMarkdown>
        </article>
      </Container>
    </main>
  );
}
