export default function CaseStudies() {
  return (
    <section
      id="cases"
      className="sj-grain sj-reveal"
      style={{ background: "var(--color-alt)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Grid-break: case studies get a full-bleed editorial header with the sec-num inline. */}
        <div className="mb-16 md:mb-20">
          <span className="sj-sec-num inline-block mb-6">04 / VÝSLEDKY · CASE BOOK 2024–2026</span>
          <h2 className="sj-h-section max-w-[26ch]">
            Firmy, které nabírají rychleji a{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-purple-deep)",
                fontVariationSettings: "'opsz' 144,'SOFT' 80",
              }}
            >
              chytřeji
            </em>
            .
          </h2>
        </div>

        {/* HERO CASE */}
        <article
          className="grid lg:grid-cols-12 gap-0 mb-6 lg:mb-8"
          style={{
            background: "var(--color-paper)",
            border: "1px solid var(--color-rule)",
          }}
        >
          <div
            className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-between"
            style={{ borderRight: "1px solid var(--color-rule)" }}
          >
            <div className="flex items-center justify-between mb-12">
              <span className="sj-trust-mark" style={{ fontSize: 20 }}>
                Vodafone CZ
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  letterSpacing: "0.16em",
                }}
              >
                CASE 01 · HERO
              </span>
            </div>

            <div className="my-auto">
              <span className="sj-poster-stat block">
                +40
                <span
                  style={{
                    fontSize: "0.42em",
                    verticalAlign: "top",
                    marginLeft: "0.05em",
                  }}
                >
                  %
                </span>
              </span>
              <div
                className="mt-6 leading-[1.5] max-w-[34ch]"
                style={{ fontSize: 16, color: "rgba(28,18,55,0.75)" }}
              >
                retence v rizikových rolích po 12 měsících
              </div>
            </div>

            <div
              className="mt-12 grid grid-cols-3 gap-6 pt-8"
              style={{ borderTop: "1px solid var(--color-rule)" }}
            >
              {[
                { tag: "SAMPLE", val: "3 200 lidí" },
                { tag: "SECTOR", val: "Telco / B2C" },
                { tag: "PŘÍSTUP", val: "Risk-team focus" },
              ].map((m) => (
                <div key={m.tag}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--color-muted)",
                      letterSpacing: "0.16em",
                      marginBottom: 6,
                    }}
                  >
                    {m.tag}
                  </div>
                  <div style={{ fontSize: 15, color: "var(--color-ink)" }}>
                    {m.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between"
            style={{ background: "var(--color-alt)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-muted)",
                letterSpacing: "0.16em",
              }}
            >
              CITACE
            </span>
            <blockquote
              className="sj-display mt-6"
              style={{ fontSize: 28, lineHeight: 1.3 }}
            >
              „Behavera nám dala data, která tým řešil dřív intuicí. Rozhodování
              o seniorních hire je teď v hodinách, ne v týdnech."
            </blockquote>
            <div
              className="mt-10 pt-8 flex items-center gap-4"
              style={{ borderTop: "1px solid var(--color-rule)" }}
            >
              <div
                className="w-12 h-12 rounded-full text-white flex items-center justify-center font-medium"
                style={{ background: "var(--color-purple-deep)" }}
              >
                JN
              </div>
              <div className="flex-1">
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-ink)" }}>
                  Jana Nováková
                </div>
                <div style={{ fontSize: 13, color: "var(--color-muted)" }}>
                  Head of People Operations · Vodafone CZ
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/jana-novakova/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn profil Jany Novákové"
                className="inline-flex items-center gap-1.5 transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-purple-accent)",
                  letterSpacing: "0.16em",
                  borderBottom: "1px solid rgba(139,92,246,0.35)",
                  paddingBottom: 2,
                }}
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>
        </article>

        {/* SECONDARY CASES */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              brand: "365.bank",
              caseTag: "CASE 02",
              stat: "−14",
              statLabel: "fluktuace za 12 měsíců · sample 1 100 zaměstnanců",
              quote: `„Konečně máme data, ne dojmy. Reporting do boardu se zkrátil z dnů na hodiny."`,
              author: "Petr Hájek",
              role: "Chief People Officer · 365.bank",
              authorLinkedIn: "https://www.linkedin.com/in/petr-hajek/",
              shifted: false,
            },
            {
              brand: "Valxon",
              caseTag: "CASE 03",
              stat: "+25",
              statLabel: "rychlejší obsazení seniorních rolí (dny do offeru)",
              quote: `„Predikce úspěchu nám zkrátila rozhodování o měsíce."`,
              author: "Markéta Svobodová",
              role: "VP People · Valxon",
              authorLinkedIn: "https://www.linkedin.com/in/marketa-svobodova/",
              shifted: true,
            },
          ].map((c) => (
            <article
              key={c.brand}
              className={`p-8 md:p-10 flex flex-col ${c.shifted ? "sj-case-shift" : ""}`}
              style={{
                background: "var(--color-paper)",
                border: "1px solid var(--color-rule)",
              }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="sj-trust-mark" style={{ fontSize: 18 }}>
                  {c.brand}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-muted)",
                  }}
                >
                  {c.caseTag}
                </span>
              </div>
              <div>
                <span className="sj-big-stat" style={{ fontSize: 88 }}>
                  {c.stat}
                  <span
                    style={{
                      fontSize: 44,
                      verticalAlign: "top",
                      marginLeft: "0.25rem",
                    }}
                  >
                    %
                  </span>
                </span>
                <div
                  className="mt-3 leading-[1.5] max-w-[28ch]"
                  style={{ fontSize: 14, color: "var(--color-muted)" }}
                >
                  {c.statLabel}
                </div>
              </div>
              <hr
                className="my-8"
                style={{ borderColor: "var(--color-rule)" }}
              />
              <blockquote
                className="sj-display"
                style={{ fontSize: 19, lineHeight: 1.4, color: "rgba(28,18,55,0.85)" }}
              >
                {c.quote}
              </blockquote>
              <div
                className="mt-6 pt-6 flex items-end justify-between gap-4"
                style={{ borderTop: "1px solid var(--color-rule)" }}
              >
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink)" }}
                  >
                    {c.author}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--color-muted)" }}>
                    {c.role}
                  </div>
                </div>
                <a
                  href={c.authorLinkedIn}
                  target="_blank"
                  rel="noopener"
                  aria-label={`LinkedIn profil: ${c.author}`}
                  className="inline-flex items-center gap-1.5 transition-colors flex-none"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-purple-accent)",
                    letterSpacing: "0.16em",
                    borderBottom: "1px solid rgba(139,92,246,0.35)",
                    paddingBottom: 2,
                  }}
                >
                  LINKEDIN ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
