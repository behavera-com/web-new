const cards = [
  {
    tag: "ČAS V PROCESU",
    num: (
      <>
        <em>+</em>34 dní
      </>
    ),
    title: "Time-to-hire roste a s každou špatnou iterací roste dál.",
    body: "Když screeningem projde někdo, kdo nesedí firmě nebo roli, vrací se tým k inzerci. Týdny zpátky na startu — a otevřená pozice znova bolí všechny.",
  },
  {
    tag: "QUALITY OF HIRE",
    num: (
      <>
        <em>−</em>47<em>%</em>
      </>
    ),
    title: "Rozhodnutí podle dojmu, ne podle dat.",
    body: "Bez objektivního screeningu rozhodujete podle pohovoru. Část seniorních hires nedoručí to, co od nich firma čekala. Reporting do vedení se mění v obhajobu.",
  },
  {
    tag: "REPORTING DO VEDENÍ",
    num: (
      <>
        2<em>×</em> častěji
      </>
    ),
    title: "HR viděné jako reaktivní oddělení.",
    body: "„Proč to trvá tak dlouho?“ „Proč ten člověk od nás po půl roce odešel?“ Bez dat nemáte odpověď. S Behaverou máte čísla, která mluví za vás.",
  },
];

export default function PainSection() {
  return (
    <section
      className="sj-grain sj-reveal text-white relative overflow-hidden"
      style={{ background: "#1C1237" }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 100%, rgba(139, 92, 246, 0.18), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-3">
            <span className="sj-sec-num" style={{ color: "rgba(255,255,255,0.55)" }}>
              01 / PROBLÉM
            </span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section" style={{ color: "#fff" }}>
              Tři čísla, která vedení sleduje.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-soft)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 80",
                }}
              >
                A která se vám právě teď nevyvíjí dobře.
              </em>
            </h2>
            <p
              className="mt-7 leading-[1.55] max-w-[52ch]"
              style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}
            >
              Time-to-hire, quality of hire, retence. Bez nich je nábor pocit. S
              nimi je to{" "}
              <span style={{ color: "#fff" }}>
                strategie, kterou ukážete na boardu
              </span>
              .
            </p>
          </div>
        </div>

        <div
          className="grid md:grid-cols-3 gap-px"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {cards.map((c) => (
            <article
              key={c.tag}
              className="p-8 md:p-10 flex flex-col gap-7 min-h-[380px]"
              style={{ background: "#1C1237" }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.16em",
                  }}
                >
                  {c.tag}
                </span>
              </div>
              <div className="sj-pain-num">{c.num}</div>
              <div
                className="text-white font-medium mt-auto"
                style={{ fontSize: 16.5, lineHeight: 1.4 }}
              >
                {c.title}
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
