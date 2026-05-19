/**
 * Soft scroll CTA — diskrétní "↓ Label" odkaz na konci sekce bez hard CTA,
 * který navede uživatele na další část stránky. Není to primary conversion
 * akce — jen psychologický nudge, že obsah pokračuje.
 *
 * Použití:
 *   <SoftScrollCta target="#produkt" label="Jak to řešíme" />
 *
 * Styling se přizpůsobí přes `tone="light" | "dark"` — na světlé sekci
 * je text purple-deep, na tmavé sekci je white/mint. Default = light.
 */
export default function SoftScrollCta({
  target,
  label,
  tone = "light",
  className = "",
}: {
  target: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div className={`flex justify-center mt-12 md:mt-16 ${className}`}>
      <a
        href={target}
        className="sj-soft-cta group inline-flex flex-col items-center gap-2 transition-opacity"
        style={{
          color: isDark
            ? "rgba(255,255,255,0.72)"
            : "rgba(28,18,55,0.62)",
          textDecoration: "none",
        }}
      >
        <span
          className="font-medium tracking-wide"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <svg
          width="16"
          height="22"
          viewBox="0 0 16 22"
          fill="none"
          aria-hidden
          className="sj-soft-cta-chev transition-transform group-hover:translate-y-1"
        >
          <path
            d="M8 1v18m0 0l-6-6m6 6l6-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
