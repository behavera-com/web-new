import Image from "next/image";

type Card = {
  tag: string;
  tagTone: "blue" | "green" | "amber" | "purple";
  title: string;
  desc: string;
  shot: string;
  shotAlt: string;
  shotW: number;
  shotH: number;
  shotVideo?: string;
  variant?: "default" | "alt" | "dark";
  features: string[];
  cta?: { label: string; href: string };
};

const cards: Card[] = [
  {
    tag: "01 · Diagnóza",
    tagTone: "blue",
    title: "Nejdřív pochopíme, jak váš tým reálně funguje.",
    desc:
      "3min anonymní puls přes SMS, e-mail nebo Slack zmapuje kulturu, engagement a dynamiku týmu, do kterého nabíráte. Žádné domněnky o tom, „koho hledáme“ — data o tom, co u vás funguje a co ne.",
    shot: "/startupjobs/product/echo-pulse-gauge.png",
    shotAlt: "Echo Pulse — mapování kultury a engagementu týmu",
    shotVideo: "/startupjobs/product/engagement-loop.mp4",
    shotW: 694,
    shotH: 900,
    variant: "default",
    features: [
      "Mapování kultury a týmové dynamiky",
      "Co funguje vs. co skřípe",
      "Real-time engagement gauge",
    ],
  },
  {
    tag: "02 · Blueprint",
    tagTone: "purple",
    title: "Z dat o týmu vznikne profil člověka, který tam zapadne.",
    desc:
      "Co konkrétně chybí, co by tým posílilo, jaké chování ve vaší kultuře přežije. Manažer dostane strukturovaný blueprint role — ne generický JD, ale behaviorální profil postavený na realitě vašeho týmu.",
    shot: "/startupjobs/product/manager-playbook.png",
    shotAlt: "Manager Playbook — behaviorální blueprint role z týmových dat",
    shotW: 768,
    shotH: 512,
    variant: "alt",
    features: [
      "Behaviorální profil role z dat",
      "Gap analýza vs. stávající tým",
      "Otázky k pohovoru šité na míru",
    ],
  },
  {
    tag: "03 · Match",
    tagTone: "green",
    title: "Teprve teď měříme fit konkrétních kandidátů — proti vašemu blueprintu.",
    desc:
      "Hra v prohlížeči (30–60 min) místo psych. testu. Výstup: fit % na vaši roli a váš tým, ne na obecnou personu. Recruiter dostává hotový podklad k pohovoru včetně otázek na rizikové oblasti.",
    shot: "/startupjobs/product/candidate-fit.png",
    shotAlt: "Candidate Fit — behaviorální fit kandidáta na konkrétní roli",
    shotW: 651,
    shotH: 902,
    variant: "default",
    features: [
      "Game-based assessment",
      "Fit % na konkrétní tým",
      "Strukturované insighty k pohovoru",
    ],
    cta: { label: "Podívat se na ukázku hry", href: "#demo" },
  },
];

export default function ProductTriptych() {
  return (
    <section
      id="produkt"
      className="sj-reveal sj-grain scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        paddingTop: "clamp(72px, 9vw, 112px)",
        paddingBottom: "clamp(72px, 9vw, 112px)",
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-5 inline-flex">
              02 · Platforma
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Většina firem hledá kandidáty dřív, než ví, koho potřebuje.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                My
              </em>{" "}
              to děláme obráceně.
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
              Behavera nejdřív zmapuje vaši kulturu a tým — z toho vznikne
              behaviorální profil role. Teprve pak měříme, kteří kandidáti
              reálně zapadnou. Tři vrstvy, jeden datový základ.
            </p>
          </div>
        </div>

        <div className="sj-triptych-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10">
          {cards.map((c, i) => (
            <div key={c.tag} className="sj-triptych-cell relative">
            <article
              className={`sj-product-card ${
                c.variant === "alt"
                  ? "sj-product-card--alt"
                  : c.variant === "dark"
                  ? "sj-product-card--dark"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`sj-tag sj-tag-${c.tagTone}`}>{c.tag}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  v1.0
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 380,
                  fontSize: 24,
                  lineHeight: 1.18,
                  letterSpacing: "-0.02em",
                  color:
                    c.variant === "dark" ? "#f3eeff" : "var(--color-ink)",
                  textWrap: "balance",
                }}
              >
                {c.title}
              </h3>

              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color:
                    c.variant === "dark"
                      ? "rgba(243,238,255,0.7)"
                      : "rgba(28,18,55,0.7)",
                }}
              >
                {c.desc}
              </p>

              <ul className="flex flex-col gap-1.5 mt-1">
                {c.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5"
                    style={{
                      fontSize: 13,
                      color:
                        c.variant === "dark"
                          ? "rgba(243,238,255,0.85)"
                          : "var(--color-ink)",
                    }}
                  >
                    <span
                      className="inline-block"
                      style={{
                        width: 14,
                        height: 1,
                        background:
                          c.variant === "dark"
                            ? "rgba(243,238,255,0.5)"
                            : "var(--color-purple-deep)",
                        opacity: 0.7,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {c.cta && (
                <a
                  href={c.cta.href}
                  className="sj-triptych-cta"
                >
                  {c.cta.label}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}

              <div className="sj-product-shot mt-auto">
                <div
                  className="relative w-full overflow-hidden rounded-t-lg"
                  style={{
                    aspectRatio: `${c.shotW} / ${Math.min(c.shotH, c.shotW * 1.1)}`,
                    border: "1px solid var(--color-rule)",
                    borderBottom: 0,
                    background: "#fff",
                    boxShadow:
                      "0 20px 40px -22px rgba(45, 27, 105, 0.18)",
                  }}
                >
                  {c.shotVideo ? (
                    <video
                      src={c.shotVideo}
                      poster={c.shot}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={c.shotAlt}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  ) : (
                    <Image
                      src={c.shot}
                      alt={c.shotAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  )}
                </div>
              </div>
            </article>
            {i < cards.length - 1 && (
              <span className="sj-triptych-arrow" aria-hidden="true">
                →
              </span>
            )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
