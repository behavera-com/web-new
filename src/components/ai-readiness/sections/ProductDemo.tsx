import SoftScrollCta from "../ui/SoftScrollCta";

type Dimension = {
  label: string;
  score: number; // 0-100
  tone: "green" | "amber" | "red";
};

const DIMENSIONS: Dimension[] = [
  { label: "Adopce", score: 54, tone: "amber" },
  { label: "Chování", score: 67, tone: "green" },
  { label: "Confidence", score: 41, tone: "amber" },
  { label: "Alignment", score: 72, tone: "green" },
  { label: "Kvalita rolloutu", score: 36, tone: "red" },
];

const TIMELINE_STEPS = [
  { label: "Readiness", state: "done" as const },
  { label: "Before", state: "done" as const },
  { label: "During", state: "current" as const },
  { label: "After", state: "next" as const },
  { label: "Adoption", state: "next" as const },
];

export default function ProductDemo() {
  return (
    <section
      id="demo"
      className="sj-grain sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        background: "var(--color-alt)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <span className="sj-section-anchor">
              <span style={{ color: "var(--color-purple-deep)" }}>03</span>
              <span>Co dostanete na obrazovku</span>
            </span>
            <h2
              className="sj-h-section mt-5"
              style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
            >
              Ne dotazník, ne report —{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                rozhodovací nástroj
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 17, color: "rgba(28,18,55,0.7)" }}
            >
              Echo Pulse měří 5 dimenzí —{" "}
              <span style={{ color: "var(--color-ink)" }}>
                adopci, chování, confidence, alignment a kvalitu rolloutu
              </span>{" "}
              — a každý týden říká, co máte zítra udělat jinak.
            </p>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            background: "var(--color-paper)",
            border: "1px solid var(--color-rule)",
            borderRadius: 16,
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.7) inset, 0 30px 60px -28px rgba(45,27,105,0.18), 0 10px 30px -20px rgba(45,27,105,0.12)",
          }}
        >
          {/* App chrome */}
          <div
            className="flex items-center gap-3 px-5 md:px-7 py-3"
            style={{
              borderBottom: "1px solid var(--color-rule)",
              background: "linear-gradient(180deg, #fbfafd 0%, #f4f0fb 100%)",
            }}
          >
            <span
              className="shrink-0"
              style={{
                color: "var(--color-purple-deep)",
                fontFamily: "var(--font-inter-tight)",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "-0.015em",
                lineHeight: 1,
              }}
              aria-hidden
            >
              behavera
            </span>
            <div
              className="flex items-center gap-1.5 min-w-0 flex-1"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              <span>Echo Pulse</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>Rollout Dashboard</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span
                className="truncate"
                style={{ color: "var(--color-ink)", fontWeight: 500 }}
              >
                Týden 8
              </span>
            </div>
            <span
              className="hidden sm:inline-flex items-center gap-1.5 shrink-0"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: "var(--sj-signal-green-ink)",
                textTransform: "uppercase",
                fontWeight: 500,
                background: "var(--sj-signal-green-soft)",
                padding: "4px 8px",
                borderRadius: 999,
              }}
            >
              <span
                className="sj-pulse-dot inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--sj-signal-green)" }}
              />
              Live
            </span>
          </div>

          {/* Timeline */}
          <div
            className="px-7 md:px-10 pt-7 pb-5"
            style={{ borderBottom: "1px solid var(--color-rule)" }}
          >
            <div
              className="mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              Fáze rolloutu
            </div>
            <ol className="flex items-center gap-1 sm:gap-3">
              {TIMELINE_STEPS.map((step, i) => (
                <li key={step.label} className="flex items-center gap-1 sm:gap-3 flex-1 last:flex-none">
                  <div
                    className="inline-flex items-center gap-2"
                    style={{
                      padding: "6px 10px",
                      borderRadius: 999,
                      background:
                        step.state === "current"
                          ? "var(--color-purple-deep)"
                          : step.state === "done"
                            ? "var(--sj-signal-green-soft)"
                            : "var(--color-alt)",
                      color:
                        step.state === "current"
                          ? "#fff"
                          : step.state === "done"
                            ? "var(--sj-signal-green-ink)"
                            : "var(--color-muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span aria-hidden style={{ fontSize: 9 }}>
                      {step.state === "done" ? "✓" : step.state === "current" ? "●" : "·"}
                    </span>
                    {step.label}
                  </div>
                  {i < TIMELINE_STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden sm:block flex-1"
                      style={{
                        height: 1,
                        background:
                          step.state === "done"
                            ? "var(--sj-signal-green)"
                            : "var(--color-rule)",
                      }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Score grid */}
          <div className="px-7 md:px-10 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
            {DIMENSIONS.map((d) => (
              <DimensionMeter key={d.label} d={d} />
            ))}
          </div>

          {/* Recommendation panel */}
          <div
            className="px-7 md:px-10 py-6 flex flex-col sm:flex-row items-start gap-5"
            style={{
              borderTop: "1px solid var(--color-rule)",
              background: "linear-gradient(180deg, #fbfafd 0%, #f6f3ff 100%)",
            }}
          >
            <div
              className="inline-flex items-center justify-center shrink-0"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--color-purple-deep)",
                color: "#fff",
              }}
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 3v2M10 15v2M3 10h2M15 10h2M5.6 5.6l1.4 1.4M13 13l1.4 1.4M5.6 14.4l1.4-1.4M13 7l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="10" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  marginBottom: 4,
                }}
              >
                Doporučení tento týden
              </div>
              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: '"opsz" 144, "SOFT" 40',
                  fontWeight: 380,
                  fontSize: 19,
                  lineHeight: 1.4,
                  letterSpacing: "-0.012em",
                  color: "var(--color-ink)",
                  textWrap: "balance",
                }}
              >
                Stres v Customer Care &amp; Sales je v červeném pásmu —{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: "var(--color-purple-deep)",
                  }}
                >
                  spusťte 1:1 ověření s lead-y dřív, než se workload promítne do
                  retencí.
                </em>
              </p>
            </div>
          </div>
        </div>

        <p
          className="mt-6 text-center"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-muted)",
            letterSpacing: "0.08em",
          }}
        >
          Ilustrační dashboard · konkrétní vizuál pilotu se přizpůsobuje vašemu kontextu
        </p>

        <SoftScrollCta target="#metodika" label="Jak se to liší od pulse dotazníku" />
      </div>
    </section>
  );
}

function DimensionMeter({ d }: { d: Dimension }) {
  const color =
    d.tone === "green"
      ? "var(--sj-signal-green)"
      : d.tone === "amber"
        ? "#c89b3b"
        : "#c84b3b";
  const toneLabel =
    d.tone === "green" ? "OK" : d.tone === "amber" ? "Sleduj" : "Akce";
  const toneBg =
    d.tone === "green"
      ? "var(--sj-signal-green-soft)"
      : d.tone === "amber"
        ? "rgba(200,155,59,0.12)"
        : "rgba(200,75,59,0.12)";
  const toneInk =
    d.tone === "green"
      ? "var(--sj-signal-green-ink)"
      : d.tone === "amber"
        ? "#8a6712"
        : "#7a2e22";

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <span
          style={{
            fontSize: 13,
            color: "var(--color-ink)",
            fontWeight: 500,
          }}
        >
          {d.label}
        </span>
        <span
          className="inline-flex items-center gap-1.5 shrink-0"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: toneInk,
            background: toneBg,
            padding: "2px 7px",
            borderRadius: 4,
            fontWeight: 500,
          }}
        >
          {toneLabel}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(28,18,55,0.06)" }}
        >
          <span
            className="block h-full rounded-full"
            style={{
              width: `${d.score}%`,
              background: `linear-gradient(90deg, ${color}, var(--color-purple-deep))`,
            }}
          />
        </span>
        <span
          className="shrink-0 tabular-nums"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--color-ink)",
            fontWeight: 500,
            width: 32,
            textAlign: "right",
          }}
        >
          {d.score}
        </span>
      </div>
    </div>
  );
}
