// Signature visual: a report-card grade struck through and corrected — the
// core motif of the site (instrukcije turn a weak grade into a strong one).
export function GradeMark({
  from = "2",
  to = "5",
  size = 1,
}: {
  from?: string;
  to?: string;
  size?: number;
}) {
  const w = 220 * size;
  const h = 140 * size;
  return (
    <svg
      viewBox="0 0 220 140"
      width={w}
      height={h}
      role="img"
      aria-label={`Ocjena ${from} ispravljena u ocjenu ${to}`}
    >
      <rect
        x="4"
        y="4"
        width="212"
        height="132"
        rx="10"
        fill="var(--paper-alt)"
        stroke="var(--line)"
      />
      <text
        x="50"
        y="88"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="64"
        fill="var(--ink-soft)"
        opacity="0.55"
      >
        {from}
      </text>
      <line
        x1="24"
        y1="98"
        x2="78"
        y2="48"
        stroke="var(--gold)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <text
        x="150"
        y="94"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fontSize="76"
        fill="var(--forest)"
      >
        {to}
      </text>
      <path
        d="M108 30 C 122 22, 132 22, 138 32"
        stroke="var(--gold)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M132 24 L 140 32 L 130 36"
        stroke="var(--gold)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
