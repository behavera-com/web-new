import ArrowRightIcon from "../ui/ArrowRightIcon";

const BENEFITS = [
  {
    tag: "Onboarding v minutách",
    title: "Žádné IT projekty, žádné integrace na měsíce",
    body: "Setup je v řádu hodin. První signál máte do týdne, kompletní snapshot do 3 týdnů.",
  },
  {
    tag: "Co-design s vámi",
    title: "Pilot tvarujeme podle vašich priorit",
    body: "Vyberete fázi (readiness / before / during / after / adoption), my pomůžeme s metodikou. Žádná šablona naroubovaná na vás.",
  },
];

export default function PilotBlock() {
  return (
    <section
      id="pilot"
      className="sj-grain sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        background: "var(--color-alt)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-7">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full"
              style={{
                background: "var(--color-paper)",
                border: "1px solid var(--color-purple-deep)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-purple-deep)",
                fontWeight: 600,
              }}
            >
              <span
                className="sj-pulse-dot inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--sj-signal-green)" }}
                aria-hidden
              />
              Pilot 2026 · otevřeno prvním firmám
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
            >
              Změřte AI připravenost dřív, než{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                utratíte první korunu
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-5 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 17, color: "rgba(28,18,55,0.7)" }}
            >
              Spouštíme pilotní program pro firmy, které se rozhodují, jak na
              AI jít. Krátký cyklus,{" "}
              <span style={{ color: "var(--color-ink)" }}>
                jen data a doporučení
              </span>{" "}
              k tomu, co máte udělat zítra jinak.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {BENEFITS.map((b) => (
            <BenefitCard key={b.tag} {...b} />
          ))}
        </div>

        <div
          className="mt-14 md:mt-16 p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
          style={{
            background: "var(--color-paper)",
            border: "1px solid var(--color-rule)",
            borderRadius: 12,
            boxShadow: "0 12px 32px -20px rgba(45,27,105,0.18)",
          }}
        >
          <div className="flex-1">
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontVariationSettings: '"opsz" 144, "SOFT" 30',
                fontWeight: 380,
                fontSize: 22,
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                textWrap: "balance",
              }}
            >
              Chcete vidět, jak na tom vaše firma{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                }}
              >
                opravdu je
              </em>
              ?
            </p>
            <p
              className="mt-3"
              style={{
                fontSize: 14.5,
                color: "rgba(28,18,55,0.65)",
                lineHeight: 1.55,
              }}
            >
              15 minut. Žádný obchodní tlak. Odpovíme do 24 hodin.
            </p>
          </div>
          <a
            href="#consult"
            className="sj-btn-primary-xl shrink-0"
            data-event-name="cta_click"
            data-event-cta-id="pilot_consult"
            data-event-cta-label="Domluvit konzultaci"
            data-event-cta-location="pilot"
            data-event-cta-target="consult"
          >
            Domluvit konzultaci
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  tag,
  title,
  body,
}: {
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <article
      className="p-7 md:p-8 flex flex-col gap-4"
      style={{
        background: "var(--color-paper)",
        border: "1px solid var(--color-rule)",
        borderRadius: 12,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-purple-deep)",
          fontWeight: 600,
        }}
      >
        {tag}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-fraunces)",
          fontVariationSettings: '"opsz" 144, "SOFT" 30',
          fontWeight: 380,
          fontSize: 20,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          textWrap: "balance",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "rgba(28,18,55,0.72)",
        }}
      >
        {body}
      </p>
    </article>
  );
}
