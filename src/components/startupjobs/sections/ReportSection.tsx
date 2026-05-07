import ReportForm from "./ReportForm";

const insideReport: { tag: string; body: string }[] = [
  {
    tag: "BENCHMARK",
    body: "Time-to-hire, quality of hire a cost per hire podle oboru a velikosti firmy — k čemu poměřovat vaše čísla.",
  },
  {
    tag: "RED FLAGS",
    body: "3 datové signály v náborovém procesu, které poznají špatného kandidáta dřív než finální kolo.",
  },
  {
    tag: "REPORTING",
    body: "Šablona měsíčního KPI reportu pro vedení — co a jak ukázat, aby HR bylo vidět jako strategický tým.",
  },
];

export default function ReportSection() {
  return (
    <section
      id="report"
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
            id="sj-dots-report"
            x="0"
            y="0"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#fff" />
          </pattern>
        </defs>
        <rect width="320" height="320" fill="url(#sj-dots-report)" />
      </svg>

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-28 md:py-36 relative">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <span className="sj-sec-num" style={{ color: "rgba(255,255,255,0.6)" }}>
              07 / REPORT
            </span>
          </div>
          <div className="lg:col-span-9">
            <h2
              className="sj-h-section max-w-[20ch]"
              style={{ color: "#fff" }}
            >
              Report zdarma:{" "}
              <em style={{ color: "rgba(255,255,255,0.95)", fontStyle: "italic" }}>
                KPI náboru, které ukážete vedení.
              </em>
            </h2>
            <p
              className="mt-8 max-w-[58ch] leading-[1.6]"
              style={{ fontSize: 18, color: "rgba(255,255,255,0.75)" }}
            >
              Benchmark dat z 80+ klientů Behavera ve 12 oborech.{" "}
              <span className="sj-hl-on-dark">Zdarma, do e-mailu</span>, žádný
              obchodní follow-up.
            </p>

            <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 mt-12 items-start">
              <div>
                <ReportForm />
              </div>

              {/* Inside-the-report aside */}
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
                    CO V REPORTU NAJDETE
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.55)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    PDF · 12 STRAN
                  </span>
                </div>
                <div className="p-5 space-y-5">
                  {insideReport.map((item) => (
                    <div key={item.tag}>
                      <div
                        className="mb-2"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          color: "rgba(255,255,255,0.55)",
                          letterSpacing: "0.16em",
                        }}
                      >
                        {item.tag}
                      </div>
                      <p
                        className="leading-[1.55]"
                        style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)" }}
                      >
                        {item.body}
                      </p>
                    </div>
                  ))}

                  <div
                    className="pt-4 space-y-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {[
                      ["FORMÁT", "PDF"],
                      ["ROZSAH", "12 STRAN"],
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
                            width: 56,
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
