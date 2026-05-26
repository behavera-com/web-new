export default function ManifestoBreak() {
  return (
    <section
      className="sj-grain sj-grain-dark sj-reveal relative overflow-hidden"
      style={{ background: "#1C1237" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse at 20% 30%, rgba(45,27,105,0.5), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-purple-soft)",
            fontWeight: 500,
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-purple-soft)" }}
            aria-hidden
          />
          Manifesto
        </span>

        <h2
          style={{
            fontFamily: "var(--font-fraunces)",
            fontVariationSettings: '"opsz" 144, "SOFT" 30',
            fontWeight: 380,
            fontSize: "clamp(34px, 5vw, 64px)",
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            color: "#fff",
            textWrap: "balance",
            maxWidth: "22ch",
            margin: "0 auto",
          }}
        >
          Většina AI transformací neselhává{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-purple-soft)",
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
            }}
          >
            kvůli technologii.
          </em>{" "}
          Selhává proto, že firmy{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-purple-soft)",
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
            }}
          >
            nevidí, co se opravdu děje.
          </em>
        </h2>

        <p
          className="mt-8 mx-auto"
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.72)",
            maxWidth: "62ch",
          }}
        >
          Nástroje fungují. Modely fungují. Co chybí, je visibility do toho, jak
          AI reálně funguje na úrovni lidí a každodenního používání. Echo Pulse
          měří{" "}
          <span style={{ color: "#fff" }}>
            tu „lidskou část" AI transformace
          </span>{" "}
          — a říká, co máte zítra udělat jinak.
        </p>
      </div>
    </section>
  );
}
