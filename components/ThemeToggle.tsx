"use client";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore private-mode quota */
  }
}

export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
  }

  return (
    <button
      type="button"
      className="rounded-full border border-line px-3 py-1.5 text-sm text-fg-muted hover:text-fg"
      onClick={toggle}
      aria-label="Toggle color theme"
    >
      <span className="theme-light-label">Dark</span>
      <span className="theme-dark-label">Light</span>
    </button>
  );
}
