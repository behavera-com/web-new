import DualCta from "../ui/DualCta";

const steps = [
  {
    num: "01",
    tag: "BENCHMARK",
    title: (
      <>
        Váš <em>tým</em>
      </>
    ),
    body: (
      <>
        <span className="sj-hl">Onboarding trvá 15 minut.</span> Společně si
        řekneme, jestli změříme váš aktuální tým, nebo využijeme předpřipravených
        benchmarků z podobné role. Zjistíme, co odlišuje vaše top performery,{" "}
        a co je vlastně past.
      </>
    ),
    image: {
      src: "/startupjobs/hiring/step-01-team-culture-fit.png",
      alt: "Behavera — Culture Fit profile týmu: distribuce preferencí napříč osmi dimenzemi (Výkon/Vztahy, Otevřenost/Tradicionalismus aj.).",
      caption: "Kulturní fit týmu",
    },
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
    image: {
      src: "/startupjobs/hiring/implementace-nova-pozice.png",
      alt: "Behavera — formulář Nová pozice s předvybranými charakteristikami pracovní agendy, hierarchie a procesů.",
      caption: "Nastavení pozice za pár kliků",
    },
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
        Strukturovaný report přímo k recruiterovi i manažerovi — hned po
        dokončení assessmentu.{" "}
        <span className="sj-hl">Žádné čekání</span> na měsíční report.
      </>
    ),
    image: {
      src: "/startupjobs/hiring/step-03-live-readout.png",
      alt: "Behavera — výstupní kompetenční report kandidáta s konkrétními skóre, doporučeními a flag markery.",
      caption: "Kandidátský report",
    },
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
            <span className="sj-section-anchor">07 · Proces</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[18ch]">
              Jak to běží <em>(3 kroky)</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-7">
          {steps.map((s) => (
            <article
              key={s.num}
              className="sj-process-card group relative flex flex-col bg-white"
              style={{
                border: "1px solid var(--color-rule)",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow:
                  "0 26px 50px -28px rgba(45,27,105,0.16), 0 1px 0 rgba(255,255,255,0.6) inset",
              }}
            >
              <figure
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4 / 3",
                  background:
                    "linear-gradient(180deg, #f4f1fc 0%, #ebe5fa 100%)",
                  borderBottom: "1px solid var(--color-rule)",
                  padding: "18px 18px 28px",
                }}
              >
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  className="block w-full h-full object-contain transition-transform duration-[700ms] ease-out group-hover:scale-[1.02]"
                  style={{ objectPosition: "center top" }}
                  loading="lazy"
                  decoding="async"
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 12,
                    background: "rgba(20,12,42,0.82)",
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "5px 9px",
                    borderRadius: 4,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  {s.image.caption}
                </span>
              </figure>

              <div className="p-7 md:p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center"
                    style={{
                      background: "var(--color-purple-deep)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="sj-step-num">{s.tag}</span>
                </div>
                <h3
                  className="sj-display mb-3"
                  style={{ fontSize: 30, lineHeight: 1.08 }}
                >
                  {s.title}
                </h3>
                <p
                  className="leading-[1.6] max-w-[36ch]"
                  style={{ color: "rgba(28,18,55,0.75)" }}
                >
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <DualCta align="center" className="mt-16 md:mt-20" />
      </div>
    </section>
  );
}
