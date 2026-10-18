"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function CopyLinkButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={cn(
        "no-print rounded-full border border-line px-3 py-1 text-sm text-fg-muted hover:text-fg",
        className,
      )}
      aria-label="Copy link to this case study"
      onClick={async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
    </button>
  );
}
