const steps = [
  {
    num: "01",
    tag: "ONBOARDING",
    title: (
      <>
        15 <em>minut</em>
      </>
    ),
    body: (
      <>
        Společně si řekneme, jestli si změříme, jak je na tom aktuální tým,
        nebo využijeme{" "}
        <span className="sj-hl">našich předpřipravených benchmarků</span>.
      </>
    ),
  },
  {
    num: "02",
    tag: "IMPLEMENTACE",
    title: (
      <>
        Vše <em>na nás</em>
      </>
    ),
    body: (
      <>
        Vše za vás nastavíme,{" "}
        <span className="sj-hl">vy se jen vezete</span> :)
      </>
    ),
  },
  {
    num: "03",
    tag: "VÝSLEDKY",
    title: (
      <>
        Ihned <em>a online</em>
      </>
    ),
    body: (
      <>
        Live KPI dashboard pro vedení.{" "}
        <span className="sj-hl">Bez čekání</span> na měsíční report.
      </>
    ),
  },
];

export default function ProcessSection() {
  return (
    <section
      id="how"
      className="sj-reveal"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-3">
            <span className="sj-sec-num">03 / PROCES</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[18ch]">
              Jak to běží <em>(3 kroky)</em>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-0 relative">
          <div
            className="absolute top-[14px] left-0 right-0 h-px hidden md:block"
            style={{ background: "var(--color-rule)" }}
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`relative ${i === 0 ? "md:pr-10" : i === 1 ? "md:px-10" : "md:pl-10"}`}
              style={
                i > 0 ? { borderLeft: "1px solid var(--color-rule)" } : undefined
              }
            >
              <div className="flex items-center gap-3 mb-6 relative">
                <span
                  className="w-7 h-7 rounded-full text-white flex items-center justify-center relative z-10"
                  style={{
                    background: "var(--color-purple-deep)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                  }}
                >
                  {s.num}
                </span>
                <span className="sj-step-num">{s.tag}</span>
              </div>
              <h3
                className="sj-display mb-3"
                style={{ fontSize: 30, lineHeight: 1.1 }}
              >
                {s.title}
              </h3>
              <p
                className="leading-[1.65] max-w-[36ch]"
                style={{ color: "rgba(28,18,55,0.75)" }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
