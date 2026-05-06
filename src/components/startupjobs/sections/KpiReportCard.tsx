import ArrowRightIcon from "../ui/ArrowRightIcon";

const kpiRows = [
  {
    label: "TIME-TO-HIRE",
    delta: "↓ 38 %",
    deltaColor: "var(--color-purple-deep)",
    tip: "Otevřená pozice = ztracená produktivita. Když zkrátíte time-to-hire o 25 dní, ušetříte tisíce hodin práce, kterou by tým musel pokrýt přesčasy nebo agenturou.",
    aria: "Time-to-hire: vysvětlení benefitu",
    path: "M0,8 L29,10 L58,9 L87,14 L116,16 L145,20 L174,22 L203,26 L232,28 L261,30 L290,31 L320,32",
    cy: 32,
    stroke: "#2D1B69",
  },
  {
    label: "COST PER HIRE",
    delta: "↓ 24 %",
    deltaColor: "var(--color-purple-deep)",
    tip: "Náklad na nábor jednoho člověka — agenturní fee, inzerce, čas náborářů, čas manažerů u pohovorů. Behavera ho snižuje tím, že do dalšího kola pošle jen kandidáty, kteří mají reálnou šanci.",
    aria: "Cost per hire: vysvětlení benefitu",
    path: "M0,10 L29,12 L58,11 L87,16 L116,15 L145,20 L174,22 L203,24 L232,25 L261,27 L290,28 L320,30",
    cy: 30,
    stroke: "#2D1B69",
  },
  {
    label: "QUALITY OF HIRE",
    delta: "↑ 31 %",
    deltaColor: "var(--color-purple-accent)",
    tip: "Měří, jestli nový člověk doručuje, co se od něj čekalo — performance rating + retence po 6 měsících. Klíčová metrika pro reporting do vedení: ukazuje, že HR rozhoduje datově, ne intuicí.",
    aria: "Quality of hire: vysvětlení benefitu",
    path: "M0,30 L29,28 L58,26 L87,22 L116,20 L145,18 L174,14 L203,12 L232,9 L261,8 L290,6 L320,4",
    cy: 4,
    stroke: "#8B5CF6",
  },
];

export default function KpiReportCard() {
  return (
    <aside
      className="lg:col-span-5 lg:pl-6 lg:translate-y-12"
      aria-label="Behavera KPI report"
    >
      <div className="relative">
        <span
          className="absolute -top-3 left-6 z-10 inline-flex items-center gap-2 px-3 py-1.5 border"
          style={{
            background: "var(--color-paper)",
            borderColor: "var(--color-rule)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.06em",
            color: "var(--color-muted)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full sj-pulse-dot"
            style={{ background: "var(--color-purple-accent)" }}
          />
          BEHAVERA · KPI REPORT
        </span>
        <article
          className="bg-white p-6 md:p-8"
          style={{
            border: "1px solid var(--color-rule)",
            boxShadow: "0 30px 60px -30px rgba(45,27,105,0.35)",
          }}
        >
          <div className="flex items-baseline justify-between mb-2">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-muted)",
                letterSpacing: "0.06em",
              }}
            >
              Q1 · 2026
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-muted)",
                letterSpacing: "0.06em",
              }}
            >
              vs. baseline
            </span>
          </div>
          <p
            className="sj-display mb-6"
            style={{ fontSize: 24, lineHeight: 1.2 }}
          >
            Metriky, které ukážete vedení.
          </p>

          {kpiRows.map((row, i) => (
            <div
              key={row.label}
              className={i === kpiRows.length - 1 ? "pt-5 pb-2" : "pt-5 pb-5"}
              style={{ borderTop: "1px solid var(--color-rule)" }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <span
                  className="sj-kpi-tip"
                  tabIndex={0}
                  data-tip={row.tip}
                  aria-label={row.aria}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--color-muted)",
                    letterSpacing: "0.06em",
                  }}
                >
                  <span>{row.label}</span>
                  <span className="sj-info-i" aria-hidden="true">
                    i
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: row.deltaColor,
                    fontWeight: 500,
                  }}
                >
                  {row.delta}
                </span>
              </div>
              <svg
                viewBox="0 0 320 36"
                className="w-full h-7"
                role="img"
                aria-hidden="true"
              >
                <path
                  d={row.path}
                  fill="none"
                  stroke={row.stroke}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="320"
                  cy={row.cy}
                  r="3.5"
                  fill="#FBFAFD"
                  stroke={row.stroke}
                  strokeWidth="2"
                />
                <circle cx="320" cy={row.cy} r="1.4" fill="#8B5CF6" />
              </svg>
            </div>
          ))}

          <p
            className="mt-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--color-muted)",
              letterSpacing: "0.06em",
            }}
          >
            vs. baseline · průměr klientů Behavera
          </p>
        </article>

        <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
          <a
            href="#consult"
            className="inline-flex items-center gap-2 group"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-purple-accent)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="flex-none"
            >
              <path
                d="M7 1.5v8m0 0L4 6.5m3 3l3-3M2 11.5h10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="pb-px"
              style={{ borderBottom: "1px solid currentColor", opacity: 0.7 }}
            >
              Domluvit konzultaci a získat vlastní report
            </span>
            <ArrowRightIcon size={12} />
          </a>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--color-muted)",
              letterSpacing: "0.06em",
            }}
          >
            FIG.01 · KPI REPORT
          </span>
        </div>
        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--color-muted)",
            letterSpacing: "0.06em",
            lineHeight: 1.5,
          }}
        >
          VÝŇATEK Z REÁLNÉHO REPORTINGU KLIENTA · ANONYMIZOVÁNO
        </p>
      </div>
    </aside>
  );
}
