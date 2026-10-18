export function ContourMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 720 160"
      preserveAspectRatio="none"
    >
      <path
        d="M0 110 C 80 90, 140 40, 220 70 S 360 150, 460 100 S 620 20, 720 55"
        fill="none"
        stroke="color-mix(in srgb, var(--teal) 55%, transparent)"
        strokeWidth="1.2"
      />
      <path
        d="M0 128 C 90 108, 170 70, 250 92 S 390 160, 500 118 S 640 48, 720 78"
        fill="none"
        stroke="color-mix(in srgb, var(--coral) 40%, transparent)"
        strokeWidth="1"
      />
    </svg>
  );
}