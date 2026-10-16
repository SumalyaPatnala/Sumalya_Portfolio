import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Technical notes on evaluation, retrieval, and research tooling. Drafts are labeled; published pieces are finished essays, not papers.",
};

export default function NotesPage() {
  const notes = getNotes();

  return (
    <main id="main" tabIndex={-1}>
      <PageHeader
        kicker="Writing"
        title="Working notes, labeled by status."
        lede="These are local Markdown files, not a publication list. One finished essay is marked published; the rest stay drafts until they earn the same depth."
      />
      <Container className="pb-24">
        {notes.length === 0 ? (
          <p className="text-fg-muted">No notes yet.</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {notes.map((note) => (
              <li key={note.slug} className="py-6">
                <p className="font-mono text-xs uppercase tracking-wider text-fg-faint">
                  {note.date} · {note.status}
                </p>
                <h2 className="display mt-2 text-3xl">
                  <Link href={`/notes/${note.slug}`}>{note.title}</Link>
                </h2>
                <p className="mt-2 max-w-2xl text-fg-muted">{note.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
