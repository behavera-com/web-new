const items = [
  "Bezplatná konzultace",
  "15 minut",
  "Žádný obchodní tlak",
  "Od konzultace k pilotu typicky 2 týdny",
];

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="flex-none"
      style={{ color: "var(--color-purple-soft)" }}
      aria-hidden="true"
    >
      <path
        d="M2.5 6.5l2.5 2.5L9.5 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TrustVelocityLine() {
  return (
    <section
      className="sj-reveal"
      style={{ background: "var(--color-purple-deep)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-8 md:py-10">
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.78)" }}
        >
          {items.map((label, i) => (
            <span key={label} className="contents">
              <span className="inline-flex items-center gap-2">
                <CheckIcon />
                <span>{label}</span>
              </span>
              {i < items.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.2)" }} aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
        <div
          className="mt-5 flex items-center justify-center gap-2.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.16em",
          }}
        >
          <span
            className="inline-flex w-1.5 h-1.5 rounded-full sj-pulse-dot"
            style={{ background: "var(--color-purple-accent)" }}
            aria-hidden="true"
          />
          <span>AKTUÁLNÍ MĚSÍC: 12 KONZULTACÍ PROBĚHLO · 8 PILOTŮ DOMLUVENO</span>
        </div>
      </div>
    </section>
  );
}
