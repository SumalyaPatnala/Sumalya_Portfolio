import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1}>
      <Container className="py-24">
        <p className="kicker">404</p>
        <h1 className="display mt-4 text-5xl">That page is not here.</h1>
        <p className="mt-4 max-w-md text-fg-muted">
          The URL does not match a project, note, or section. Try work, lab, or
          research.
        </p>
        <div className="mt-8 flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/work">Work</Link>
          <Link href="/lab">Lab</Link>
        </div>
      </Container>
    </main>
  );
}
