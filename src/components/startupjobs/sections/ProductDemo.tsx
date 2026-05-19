type Reveal = {
  tag: string;
  title: string;
  body: string;
};

const reveals: Reveal[] = [
  {
    tag: "FIT NA ROLI",
    title: "Sedí roli, kterou nabíráte — ne obecné personě.",
    body:
      "Fit % se počítá proti blueprintu role z vašich dat, ne proti generickému profilu z učebnice.",
  },
  {
    tag: "PODKLAD K POHOVORU",
    title: "Silné stránky a rizika, na která se v interview ptát.",
    body:
      "Recruiter dostane strukturované otázky šité na míru kandidátovi — žádné „povězte mi o sobě“.",
  },
  {
    tag: "FIT NA TÝM",
    title: "Kompatibilita s lidmi, ke kterým nastupuje.",
    body:
      "Predikce, jak kandidát zapadne do dynamiky vašeho konkrétního týmu — z echo pulsu, ne z dojmu.",
  },
];

export default function ProductDemo() {
  return (
    <section
      id="demo"
      className="sj-reveal sj-grain"
      style={{
        background: "linear-gradient(180deg, var(--color-paper) 0%, #f7f3ff 100%)",
        borderTop: "1px solid var(--color-rule)",
        paddingTop: "clamp(72px, 9vw, 112px)",
        paddingBottom: "clamp(72px, 9vw, 112px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-10 md:mb-12">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-5 inline-flex">
              03 · Hra v praxi
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Hra, která{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                baví kandidáty
              </em>{" "}
              a zároveň ukáže, kdo sedí na roli.
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
              Žádný psychotest, žádné self-assessment. 30–60 minut behaviorální hry
              v prohlížeči — kandidát si projde simulovaný pracovní den, vy
              dostanete fit % a strukturovaný podklad k pohovoru.
            </p>
          </div>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            borderRadius: 16,
            border: "1px solid var(--color-rule)",
            background: "#1c1237",
            boxShadow:
              "0 40px 80px -32px rgba(45, 27, 105, 0.35), 0 12px 24px -16px rgba(45, 27, 105, 0.2)",
          }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/yM7JCF3WMfU?rel=0&modestbranding=1"
            title="Behavera — ukázka behaviorální hry pro nábor"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </div>

        <figure
          className="mt-10 md:mt-12 mx-auto max-w-[68ch] text-center"
          style={{ borderTop: "1px solid var(--color-rule)", paddingTop: 28 }}
        >
          <blockquote
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 380,
              fontSize: "clamp(20px, 2.4vw, 26px)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              textWrap: "balance",
            }}
          >
            „Tak to bylo zábavné! Rozhodně{" "}
            <em
              style={{
                fontStyle: "italic",
                fontVariationSettings: '"opsz" 144, "SOFT" 80',
                color: "var(--color-purple-deep)",
              }}
            >
              nejkreativnější první kolo
            </em>
            , co jsem zatím zažila."
          </blockquote>
          <figcaption
            className="mt-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
            }}
          >
            Evi S. · kandidátka · 03 / 2025 ·{" "}
            <a
              href="#kandidati-pisi"
              style={{ color: "var(--color-purple-accent)" }}
            >
              další e-maily ↓
            </a>
          </figcaption>
        </figure>

        <div className="mt-14 md:mt-16">
          <div className="flex items-baseline justify-between mb-6 md:mb-8 gap-6 flex-wrap">
            <h3
              className="sj-display"
              style={{
                fontSize: "clamp(22px, 2.4vw, 30px)",
                letterSpacing: "-0.015em",
              }}
            >
              Co recruiter dostane{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                na druhé straně
              </em>
              .
            </h3>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              Výstupy hry · 3 vrstvy
            </span>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-px"
            style={{
              border: "1px solid var(--color-rule)",
              background: "var(--color-rule)",
            }}
          >
            {reveals.map((r) => (
              <article
                key={r.tag}
                className="p-7 md:p-8 flex flex-col gap-3"
                style={{ background: "#fff" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-purple-accent)",
                  }}
                >
                  {r.tag}
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontWeight: 380,
                    fontSize: 20,
                    lineHeight: 1.22,
                    letterSpacing: "-0.015em",
                    color: "var(--color-ink)",
                    textWrap: "balance",
                  }}
                >
                  {r.title}
                </h4>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "rgba(28,18,55,0.7)",
                  }}
                >
                  {r.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
