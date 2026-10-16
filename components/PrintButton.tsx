"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      className="no-print rounded-full border border-line px-4 py-2 text-sm"
      onClick={() => window.print()}
    >
      Print or save PDF
    </button>
  );
}
