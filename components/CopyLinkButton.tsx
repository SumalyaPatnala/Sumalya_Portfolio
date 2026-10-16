"use client";

import { useState } from "react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="no-print rounded-full border border-line px-3 py-1 text-sm text-fg-muted hover:text-fg"
      onClick={async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
