import ArrowRightIcon from "../ui/ArrowRightIcon";
import KpiReportCard from "./KpiReportCard";

const trustPills = [
  "Žádná IT integrace",
  "Onboarding v řádu hodin",
  "GDPR-ready",
];

const stats = [
  { value: "−38 %", label: "time-to-hire" },
  { value: "+31 %", label: "quality of hire" },
  { value: "−24 %", label: "cost per hire" },
];

export default function Hero() {
  return (
    <section className="sj-grain sj-reveal relative overflow-hidden">
      <div
        className="absolute top-0 bottom-0 left-[44%] w-px hidden lg:block"
        style={{ background: "var(--color-rule)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 pt-16 md:pt-24 lg:pt-28 pb-20 md:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-7 lg:pr-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="sj-eyebrow">StartupJobs × Behavera</span>
          </div>

          <h1
            className="sj-display"
            style={{
              fontSize: "clamp(64px, 11vw, 152px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            Nabírejte rychleji.
            <br />
            Nabírejte <em>správně</em>.
          </h1>

          <p
            className="mt-10 max-w-[600px] leading-[1.6]"
            style={{
              fontSize: 20,
              color: "rgba(28,18,55,0.8)",
            }}
          >
            Behavera vám doručí{" "}
            <span className="sj-hl">relevantní kandidáty včas</span> — a data,
            která vám dají jistotu, že nový člověk u vás vydrží. Méně dní v
            procesu, méně chyb v rozhodnutí, lepší čísla v reportingu vedení.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a href="#consult" className="sj-btn-primary-xl">
              Domluvit konzultaci
              <span
                className="opacity-60 -ml-1"
                style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}
              >
                15 min
              </span>
              <ArrowRightIcon size={16} />
            </a>
            <a href="#report" className="sj-btn-textlink">
              Stáhnout report zdarma
              <ArrowRightIcon />
            </a>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ fontSize: 13, color: "var(--color-muted)" }}
          >
            {trustPills.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-purple-accent)" }}
                />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <div
            className="mt-10 pt-8"
            style={{ borderTop: "1px solid var(--color-rule)" }}
          >
            <p
              className="mb-5"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-muted)",
                letterSpacing: "0.16em",
              }}
            >
              PRŮMĚRNÉ VÝSLEDKY KLIENTŮ · BENCHMARK 2024–2026
            </p>
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-5">
              {stats.map((s, i) => (
                <div key={s.label} className="contents">
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    <span
                      className="sj-display"
                      style={{
                        fontSize: 36,
                        lineHeight: 1.05,
                        color: "var(--color-purple-deep)",
                        fontWeight: 500,
                      }}
                    >
                      {s.value}
                    </span>
                    <span style={{ fontSize: 13, color: "rgba(28,18,55,0.7)" }}>
                      {s.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <div
                      className="hidden sm:block w-px h-6"
                      style={{ background: "var(--color-rule)" }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <KpiReportCard />
      </div>
    </section>
  );
}
