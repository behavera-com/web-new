type ComplianceItem = {
  tag: string;
  title: string;
  body: string;
  icon: React.ReactNode;
};

const ITEMS: ComplianceItem[] = [
  {
    tag: "Anonymita",
    title: "Vidíte týmy, ne jednotlivce",
    body: "Data se vyhodnocují agregovaně na úrovni týmu (min. 5 respondentů). Manager nikdy nečte odpovědi konkrétního člověka. Žádný individuální dohled.",
    icon: <AnonIcon />,
  },
  {
    tag: "Odbory & compliance",
    title: "Připravené pro odborovou komunikaci",
    body: "Dodáváme šablonu informace pro odborovou organizaci, transparentní popis metodiky pro radu zaměstnanců a souhlas účastníka v souladu s § 316 zákoníku práce.",
    icon: <UnionIcon />,
  },
  {
    tag: "GDPR & AI Act",
    title: "EU hosting, full DPA, AI Act Article 26",
    body: "Žádný transfer dat mimo EU/EEA. Kompletní DPA dokumentace pro váš legal review. Informace o automatizovaném zpracování dle AI Act pro vaše zaměstnance.",
    icon: <ShieldIcon />,
  },
];

export default function ComplianceBlock() {
  return (
    <section
      id="compliance"
      className="sj-grain sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-14">
          <div className="lg:col-span-5">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full"
              style={{
                background: "var(--color-alt)",
                border: "1px solid var(--color-rule)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-purple-deep)",
                fontWeight: 500,
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-purple-deep)" }}
                aria-hidden
              />
              Pro HR, legal & odbory
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
            >
              Změřit lidi{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                bez dohledu nad jednotlivcem
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 16.5, color: "rgba(28,18,55,0.7)" }}
            >
              Vědomě jsme stavěli nástroj, který obstojí před vaším právním
              oddělením, radou zaměstnanců i odborovou organizací. Bez
              kompromisů na vypovídací hodnotě, bez šedých zón.{" "}
              <span style={{ color: "var(--color-ink)" }}>
                Krytá záda pro HR
              </span>{" "}
              jsou součást deliveru.
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{
            background: "var(--color-rule)",
            border: "1px solid var(--color-rule)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {ITEMS.map((item) => (
            <article
              key={item.tag}
              className="p-7 md:p-8 flex flex-col gap-4"
              style={{ background: "var(--color-paper)" }}
            >
              <div
                className="inline-flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "var(--color-alt)",
                  color: "var(--color-purple-deep)",
                  border: "1px solid var(--color-rule)",
                }}
                aria-hidden
              >
                {item.icon}
              </div>

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
                {item.tag}
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
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(28,18,55,0.7)",
                }}
              >
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <p
          className="mt-8 text-center"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--color-muted)",
          }}
        >
          DPA, šablona pro odborovou komunikaci a transparenční materiály &nbsp;·&nbsp; na vyžádání před pilotem
        </p>
      </div>
    </section>
  );
}

function AnonIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="7" cy="8" r="2.6" />
      <circle cx="15" cy="8" r="2.6" />
      <path d="M2.5 18c.5-2.6 2.4-4.2 4.5-4.2s4 1.6 4.5 4.2" />
      <path d="M10.5 18c.5-2.6 2.4-4.2 4.5-4.2s4 1.6 4.5 4.2" />
    </svg>
  );
}

function UnionIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="6" r="2.4" />
      <circle cx="5" cy="14" r="2.2" />
      <circle cx="17" cy="14" r="2.2" />
      <path d="M11 8.4v3.4" />
      <path d="M9 12.6L6.8 13.3" />
      <path d="M13 12.6l2.2.7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 2l7 2.5V10c0 4.2-3 7.6-7 9-4-1.4-7-4.8-7-9V4.5L11 2z" />
      <path d="M7.6 10.5l2.4 2.4 4.4-4.4" />
    </svg>
  );
}
