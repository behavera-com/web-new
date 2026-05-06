import ArrowRightIcon from "../ui/ArrowRightIcon";

const bullets = [
  "Jak zkrátit time-to-hire o 30 %+ bez navýšení kapacity HR týmu",
  "3 datové signály, které poznají špatného kandidáta dřív než finální kolo",
  "Jak prezentovat náborové KPI vedení tak, aby vidělo HR jako strategický tým",
];

export default function WebinarSection() {
  return (
    <section
      id="webinar"
      className="sj-grain sj-grain-dark sj-reveal text-white relative overflow-hidden"
      style={{ background: "var(--color-purple-deep)" }}
    >
      <svg
        className="absolute -top-20 -right-20 opacity-[0.18]"
        width="320"
        height="320"
        viewBox="0 0 320 320"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="sj-dots"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#fff" />
          </pattern>
        </defs>
        <rect width="320" height="320" fill="url(#sj-dots)" />
      </svg>

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-28 md:py-36 relative">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <span className="sj-sec-num" style={{ color: "rgba(255,255,255,0.6)" }}>
              07 / WEBINÁŘ
            </span>
          </div>
          <div className="lg:col-span-9">
            <h2
              className="sj-h-section max-w-[20ch]"
              style={{ color: "#fff" }}
            >
              Webinář: Jak nabírat{" "}
              <em style={{ color: "rgba(255,255,255,0.95)", fontStyle: "italic" }}>
                rychleji a líp.
              </em>
            </h2>
            <p
              className="mt-8 max-w-[58ch] leading-[1.6]"
              style={{ fontSize: 18, color: "rgba(255,255,255,0.75)" }}
            >
              45minutový společný webinář StartupJobs × Behavera.{" "}
              <span className="sj-hl-on-dark">Zdarma, online</span>, s otázkami.
            </p>

            <div
              className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 mt-12 items-start"
            >
              <div>
                <ul className="space-y-5 max-w-[60ch]">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-5 items-start">
                      <span
                        className="mt-1.5 flex-none w-8"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        →
                      </span>
                      <span
                        className="text-white leading-[1.55]"
                        style={{ fontSize: 17 }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <a href="#consult" className="sj-btn-on-dark">
                    Zaregistrovat se zdarma
                    <ArrowRightIcon />
                  </a>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    úterý 19. 5. 2026 · 10:00 · GOOGLE MEET
                  </span>
                </div>
              </div>

              {/* Host placeholder card */}
              <aside
                className="w-full lg:w-[280px] backdrop-blur-sm"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="px-5 pt-5 pb-3 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    WEBINÁŘ POVEDE
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    <span
                      className="inline-flex w-1.5 h-1.5 rounded-full sj-pulse-dot"
                      style={{ background: "var(--color-purple-accent)" }}
                      aria-hidden="true"
                    />
                    LIVE
                  </span>
                </div>
                <div className="p-5">
                  <div className="relative w-[88px] h-[88px] mb-5">
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        border: "1px solid rgba(255,255,255,0.2)",
                        background:
                          "linear-gradient(to bottom right, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                      }}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        aria-hidden="true"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        <circle
                          cx="20"
                          cy="14"
                          r="6.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M6 34c0-7.5 6.3-13 14-13s14 5.5 14 13"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span
                      className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-white"
                      style={{
                        background: "var(--color-purple-accent)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.16em",
                      }}
                    >
                      TBD
                    </span>
                  </div>

                  <div
                    className="sj-display mb-1"
                    style={{ fontSize: 20, lineHeight: 1.2, color: "#fff" }}
                  >
                    <em>Jméno řečníka</em>
                  </div>
                  <div
                    className="mb-4"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    ROLE · BEHAVERA
                  </div>

                  <p
                    className="mb-5 leading-[1.55]"
                    style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)" }}
                  >
                    Krátké bio řečníka — zkušenost s HR analytikou, kolik
                    náborů řešil, co bude na webináři ukazovat.
                  </p>

                  <div
                    className="pt-4 space-y-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {[
                      ["DÉLKA", "45 MIN"],
                      ["FORMÁT", "+ Q&A"],
                      ["JAZYK", "CZ"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline gap-3">
                        <span
                          className="flex-none"
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            color: "rgba(255,255,255,0.45)",
                            letterSpacing: "0.16em",
                            width: 52,
                          }}
                        >
                          {k}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "rgba(255,255,255,0.85)",
                          }}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
