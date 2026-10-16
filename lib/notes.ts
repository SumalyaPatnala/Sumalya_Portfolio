import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type NoteStatus = "draft" | "published";

export type Note = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  status: NoteStatus;
  body: string;
};

const NOTES_DIR = path.join(process.cwd(), "content/notes");

export function getNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readNote(file.replace(/\.md$/, "")))
    .filter((note): note is Note => note !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNoteSlugs() {
  return getNotes().map((note) => note.slug);
}

export function readNote(slug: string): Note | null {
  const file = path.join(NOTES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  return {
    slug,
    title: String(parsed.data.title ?? slug),
    summary: String(parsed.data.summary ?? ""),
    date: String(parsed.data.date ?? ""),
    status: parsed.data.status === "published" ? "published" : "draft",
    body: parsed.content.trim(),
  };
}
