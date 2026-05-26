type Outcome = {
  num: string;
  title: string;
  body: string;
};

const OUTCOMES: Outcome[] = [
  {
    num: "01",
    title: "Pojmenované riziko",
    body: "Vyjdete s 2–3 konkrétními místy, kde dnes vaše AI iniciativa nejvíc riskuje — ne abstraktní 'change management', ale jeden tým, jeden gap, jedna akce.",
  },
  {
    num: "02",
    title: "Doporučení k pilotu",
    body: "Společně řekneme, jestli AI Readiness Suite u vás dnes dává smysl. Pokud ne, vysvětlíme proč — a kam jít místo toho.",
  },
  {
    num: "03",
    title: "Žádné slidy, žádný tlak",
    body: "15 minut, dvě otázky, jasná odpověď. Žádná follow-up sekvence sedmi mailů s 'reminder ohledně našeho hovoru'.",
  },
];

export default function OutcomeStrip() {
  return (
    <section
      className="sj-reveal"
      style={{
        background: "var(--color-alt)",
        borderTop: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 md:mb-12">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-4 inline-flex">
              07 · Co z konzultace odnesete
            </span>
            <h2
              className="sj-h-section max-w-[28ch]"
              style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}
            >
              Tři věci, které máte v ruce po{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 80",
                }}
              >
                15 minutách
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.7)",
              }}
            >
              Ne pitch, ne discovery call podle scénáře. Konkrétní výstup, který
              si můžete vzít a použít — i kdybyste s námi dál nešli.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {OUTCOMES.map((o) => (
            <article
              key={o.num}
              style={{
                background: "var(--color-paper)",
                border: "1px solid var(--color-rule)",
                borderRadius: 8,
                padding: "28px 26px 26px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 30",
                  fontWeight: 380,
                  fontSize: 32,
                  lineHeight: 1,
                  color: "var(--color-purple-deep)",
                  letterSpacing: "-0.03em",
                  display: "block",
                  marginBottom: 16,
                }}
              >
                {o.num}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 30",
                  fontWeight: 380,
                  fontSize: 20,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  marginBottom: 10,
                  textWrap: "balance",
                }}
              >
                {o.title}
              </h3>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "rgba(28,18,55,0.7)",
                }}
              >
                {o.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
