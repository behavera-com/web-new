const principles = [
  {
    tag: "VÍCE INSTRUMENTŮ",
    title: "Fit % nestojí na jednom čísle.",
    body: "AI prescreening chat (~2 min), behaviorální hra v prohlížeči (30–60 min) a kontextové signály z procesu — všechno se kombinuje proti vašemu týmovému blueprintu.",
  },
  {
    tag: "MODELY NA CZ/SK TRHU",
    title: "Trénované na lokálním kontextu.",
    body: "Desítky tisíc kandidátů z CZ/SK firem. Žádný importovaný anglosaský benchmark, který neumí číst český sales talent nebo slovenského seniora.",
  },
  {
    tag: "HUMAN-IN-THE-LOOP",
    title: "Recruiter rozhoduje. Vždy.",
    body: "Score slouží jako strukturovaný podklad. Finální rozhodnutí dělá člověk — v souladu s EU AI Act pro high-risk recruitment systémy.",
  },
];

export default function MethodologyBlock() {
  return (
    <section
      className="sj-reveal"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-14">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-5 inline-flex">
              02·b · Metodologie
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Jak Behavera{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                měří fit
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 self-end">
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.7)",
              }}
            >
              Žádný self-report dotazník, žádné „ohodnoťte se 1–7". Měříme,
              jak se kandidát rozhoduje v realistických situacích — a
              kombinujeme více instrumentů do jednoho podkladu.
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {principles.map((p) => (
            <article
              key={p.tag}
              className="rounded-2xl p-6 md:p-7 flex flex-col gap-3"
              style={{
                background: "#fff",
                border: "1px solid var(--color-rule)",
                boxShadow:
                  "0 20px 40px -28px rgba(45, 27, 105, 0.10)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-purple-deep)",
                  fontWeight: 500,
                }}
              >
                {p.tag}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 30',
                  fontWeight: 380,
                  fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: "-0.022em",
                  color: "var(--color-ink)",
                  textWrap: "balance",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "rgba(28,18,55,0.72)",
                }}
              >
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* Footer disclosure */}
        <p
          className="mt-10 md:mt-12 max-w-[64ch]"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            letterSpacing: "0.04em",
            color: "var(--color-muted)",
            lineHeight: 1.55,
          }}
        >
          Kompletní metodika, validační report a adverse impact audit —
          dostupné pod NDA pro legal/compliance review v rámci pilotu.
        </p>
      </div>
    </section>
  );
}
