type Step = {
  num: string;
  time: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    time: "Týden 1",
    title: "Kickoff & co-design",
    body: "60-minutový workshop. Vyberete fázi rolloutu, dohodneme rozsah, lidi a citlivá místa. Stanovíme, co je success.",
  },
  {
    num: "02",
    time: "Týden 2–3",
    title: "Měření napříč týmy",
    body: "Lidé v týmech projdou krátkou interakci s naším nástrojem. Žádné dlouhé dotazníky — krátké simulace, kontextuální otázky, reálné situace.",
  },
  {
    num: "03",
    time: "Týden 4",
    title: "Insight workshop",
    body: "Sedíme s vedením a HR. Vidíte heat-mapu adopce, confidence gapy, stres signály, skill coverage. Společně tvarujeme action plan.",
  },
  {
    num: "04",
    time: "Průběžně",
    title: "Re-measure & adjust",
    body: "Pulse měření po 4–6 týdnech ověří, jestli akce zabraly. Pokud ano, škálujeme. Pokud ne, ladíme zásah — ne metodu měření.",
  },
];

export default function ProcessSection() {
  return (
    <section
      id="how"
      className="sj-grain sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-5">
            <span className="sj-section-anchor">
              <span style={{ color: "var(--color-purple-deep)" }}>05</span>
              <span>Postup pilotu</span>
            </span>
            <h2
              className="sj-h-section mt-5"
              style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
            >
              4 týdny od kickoffu po{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                první rozhodnutí
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 17, color: "rgba(28,18,55,0.7)" }}
            >
              Žádný projekt na šest měsíců. Postup je krátký, výstup je akční —{" "}
              <span style={{ color: "var(--color-ink)" }}>
                jeden cyklus, jasná rozhodnutí
              </span>
              , poté re-measure.
            </p>
          </div>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{
            background: "var(--color-rule)",
            border: "1px solid var(--color-rule)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              className="p-7 md:p-8 flex flex-col gap-4"
              style={{ background: "var(--color-paper)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontVariationSettings: '"opsz" 144, "SOFT" 30',
                    fontWeight: 380,
                    fontSize: 40,
                    lineHeight: 1,
                    color: "var(--color-purple-deep)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {step.num}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  {step.time}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 30',
                  fontWeight: 380,
                  fontSize: 19,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  textWrap: "balance",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(28,18,55,0.7)",
                }}
              >
                {step.body}
              </p>

              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="hidden lg:block mt-auto pt-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--color-purple-soft)",
                  }}
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
