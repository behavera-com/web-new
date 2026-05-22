import DualCta from "../ui/DualCta";

const faqs = [
  {
    q: "Jak rychle uvidím dopad na náborové KPI?",
    a: "Time-to-hire metrika klesá od prvního měsíce, kdy jsou v procesu noví kandidáti scoringovaní Behaverou. Plný dopad (quality of hire, 6m retention) je měřitelný po 4–6 měsících.",
    open: true,
  },
  {
    q: "Jak Behavera poznává „dobrého kandidáta“?",
    a: "Strukturovaný behaviorální assessment z více instrumentů — AI prescreening chat, behaviorální hra v prohlížeči a kontextové signály — vyhodnocený proti vašemu týmovému blueprintu. Modely jsou natrénované na desítkách tisíc kandidátů z CZ/SK firem, sedí kontextu místního trhu, ne zahraničním benchmarkům. Score slouží jako podklad pro recruitera, finální rozhodnutí dělá vždy člověk.",
  },
  {
    q: "Je Behavera v souladu s EU AI Act?",
    aHtml: (
      <>
        Ano. Recruitment AI je dle EU AI Act (2024/1689) klasifikována jako
        high-risk systém. Behavera plní povinnosti pro tuto kategorii:
        <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18, listStyle: "disc" }}>
          <li>
            <strong style={{ color: "var(--color-ink)" }}>Human-in-the-loop:</strong>{" "}
            AI scoring nikdy nerozhoduje sám — slouží jako podklad pro
            lidského recruitera.
          </li>
          <li>
            <strong style={{ color: "var(--color-ink)" }}>Transparentnost:</strong>{" "}
            kandidát je informován, že prochází behaviorální assessment, a
            má právo na lidský review.
          </li>
          <li>
            <strong style={{ color: "var(--color-ink)" }}>Bias monitoring:</strong>{" "}
            adverse impact audit napříč pohlavím, věkem a vzděláním.
          </li>
          <li>
            <strong style={{ color: "var(--color-ink)" }}>Data residency:</strong>{" "}
            EU hosting, žádný transfer mimo EU/EEA.
          </li>
          <li>
            <strong style={{ color: "var(--color-ink)" }}>DPA:</strong>{" "}
            kompletní compliance dokumentace na vyžádání pro váš legal review.
          </li>
        </ul>
      </>
    ),
  },
  {
    q: "Funguje to pro všechny role?",
    a: "Optimalizováno pro white-collar a knowledge work pozice (sales, marketing, engineering, operations, vedoucí role). Pro blue-collar a vysoce specializované technické role doporučujeme jiné nástroje.",
  },
  {
    q: "Můžu si výstupy integrovat s naším ATS?",
    a: "Ano, máme API a integrace s nejběžnějšími ATS systémy. Custom integrace na request.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="sj-reveal"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16">
          <div className="lg:col-span-3">
            <span className="sj-section-anchor">08 · FAQ</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section">Časté otázky</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3" />
          <div className="lg:col-span-9 max-w-[800px]">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="sj-faq-item"
                {...(f.open ? { open: true } : {})}
              >
                <summary>
                  {f.q}
                  <span className="sj-faq-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1.5v9M1.5 6h9"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="sj-faq-answer">{f.aHtml ?? f.a}</div>
              </details>
            ))}

            <DualCta className="mt-12 md:mt-14" />
          </div>
        </div>
      </div>
    </section>
  );
}
