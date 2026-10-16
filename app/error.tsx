"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-xl px-5 py-24">
      <p className="kicker">Error</p>
      <h1 className="display mt-4 text-4xl">Something failed to render.</h1>
      <p className="mt-4 text-fg-muted">
        This is a static site with no live model backend. Retrying usually
        recovers a transient client error.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full border border-line px-4 py-2 text-sm"
      >
        Try again
      </button>
    </main>
  );
}
