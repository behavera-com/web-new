import Image from "next/image";
import SoftScrollCta from "../ui/SoftScrollCta";

type Stat = {
  num: string;
  label: string;
};

const sjStats: Stat[] = [
  { num: "350 000+", label: "Měsíční návštěvnost" },
  { num: "3 800+", label: "Firem na platformě" },
  { num: "165 000+", label: "Registrovaných kandidátů" },
];

type LifecycleStep = {
  num: string;
  tag: string;
  title: React.ReactNode;
  brand: "startupjobs" | "behavera" | "outcome";
};

const lifecycle: LifecycleStep[] = [
  {
    num: "01",
    tag: "Reach",
    title: (
      <>
        Inzerát na <em>StartupJobs</em>
      </>
    ),
    brand: "startupjobs",
  },
  {
    num: "02",
    tag: "Fit",
    title: (
      <>
        Screening <em>Behavera</em>
      </>
    ),
    brand: "behavera",
  },
  {
    num: "03",
    tag: "Retention",
    title: (
      <>
        Nástup, <em>který vydrží</em>
      </>
    ),
    brand: "outcome",
  },
];

export default function CoBrandBlock() {
  return (
    <section
      id="cobrand"
      className="sj-grain sj-reveal"
      style={{
        background: "var(--color-alt)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-14">
          <div className="lg:col-span-3">
            <span className="sj-section-anchor">StartupJobs + Behavera</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[18ch]">
              Proč StartupJobs <em>ve&nbsp;spolupráci s&nbsp;Behaverou</em>
            </h2>
          </div>
        </div>

        {/* Retention bridge — hlavní claim sekce */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-9 lg:col-start-4">
            <p
              className="max-w-[42ch]"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontVariationSettings: "'opsz' 144,'SOFT' 80",
                fontWeight: 360,
                fontSize: "clamp(26px, 3.2vw, 38px)",
                lineHeight: 1.22,
                letterSpacing: "-0.012em",
                color: "rgba(28,18,55,0.86)",
              }}
            >
              Kandidáti ze StartupJobs ve firmách zůstávají průměrně{" "}
              <em style={{ color: "var(--color-purple-deep)" }}>2,5 roku</em>.
              S Behaverou ten průměr{" "}
              <em style={{ color: "var(--color-purple-deep)" }}>
                ještě posunete
              </em>
              .
            </p>
          </div>
        </div>

        {/* 2-col logo block */}
        <div
          className="relative grid md:grid-cols-2 gap-px"
          style={{
            background: "var(--color-rule)",
            border: "1px solid var(--color-rule)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* StartupJobs column — logo + stats */}
          <div
            className="p-10 md:p-14 sj-on-light flex flex-col"
            style={{ background: "var(--color-paper)" }}
          >
            <Image
              src="/startupjobs/logo-startupjobs.svg"
              alt="StartupJobs"
              width={170}
              height={56}
              style={{
                height: 56,
                width: "auto",
                marginBottom: 36,
                alignSelf: "flex-start",
              }}
            />

            <ul className="flex flex-col gap-4 md:gap-5">
              {sjStats.map((s) => (
                <li
                  key={s.label}
                  className="flex items-baseline gap-4 md:gap-6"
                  style={{
                    borderBottom: "1px solid var(--color-rule)",
                    paddingBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontVariationSettings: "'opsz' 144,'SOFT' 60",
                      fontWeight: 380,
                      fontSize: "clamp(24px, 2.8vw, 32px)",
                      lineHeight: 1,
                      color: "var(--color-purple-deep)",
                      letterSpacing: "-0.015em",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.35,
                      color: "rgba(28,18,55,0.72)",
                    }}
                  >
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Benchmark callout */}
            <div
              className="mt-6 md:mt-7 p-5 md:p-6"
              style={{
                background: "var(--color-purple-bg, #f4f1fc)",
                border: "1px solid var(--color-rule)",
                borderRadius: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-purple-deep)",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Ø na inzerát
              </span>
              <p
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 70",
                  fontWeight: 380,
                  fontSize: 19,
                  lineHeight: 1.3,
                  letterSpacing: "-0.005em",
                  color: "rgba(28,18,55,0.88)",
                }}
              >
                <em style={{ color: "var(--color-purple-deep)" }}>28 zájemců</em>{" "}
                a{" "}
                <em style={{ color: "var(--color-purple-deep)" }}>
                  8 relevantních kandidátů
                </em>{" "}
                do 7 dní.
              </p>
            </div>
          </div>

          {/* Behavera column */}
          <div
            className="p-10 md:p-14 sj-on-light flex flex-col"
            style={{ background: "var(--color-paper)" }}
          >
            <Image
              src="/startupjobs/logo-behavera-email.png"
              alt="Behavera"
              width={497}
              height={80}
              style={{
                height: 32,
                width: "auto",
                marginBottom: 36,
                alignSelf: "flex-start",
              }}
            />
            <p
              className="sj-display max-w-[20ch]"
              style={{ fontSize: 30, lineHeight: 1.2 }}
            >
              Pomůžeme vám vybrat <em>ty správné</em> — a měřitelně to dokážeme.
            </p>
            <p
              className="mt-6 max-w-[34ch]"
              style={{
                fontSize: 15,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.7)",
              }}
            >
              Behaviorální assessment, kulturní fit a strukturovaný report —
              hned po prescreeningu, bez čekání na měsíční reporting.
            </p>
          </div>

          {/* Centered + badge bridging the two columns */}
          <span
            aria-hidden="true"
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-[88px] h-[88px] rounded-full sj-on-light"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontVariationSettings: "'opsz' 144,'SOFT' 60",
              fontWeight: 300,
              fontSize: 52,
              lineHeight: 1,
              color: "var(--color-purple-accent)",
              background: "var(--color-paper)",
              border: "1px solid var(--color-rule)",
              boxShadow: "0 12px 32px -16px rgba(45,27,105,0.35)",
            }}
          >
            +
          </span>
        </div>

        {/* Lifecycle — 3 steps */}
        <div className="mt-16 md:mt-20">
          <span
            className="sj-section-anchor"
            style={{ display: "block", marginBottom: 18 }}
          >
            Lifecycle
          </span>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 relative">
            {lifecycle.map((step, idx) => (
              <li key={step.num} className="relative flex">
                <article
                  className="flex-1 flex flex-col p-6 md:p-7"
                  style={{
                    background: "var(--color-paper)",
                    border: "1px solid var(--color-rule)",
                    borderRadius: 6,
                    boxShadow:
                      "0 18px 40px -28px rgba(45,27,105,0.18), 0 1px 0 rgba(255,255,255,0.6) inset",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="w-8 h-8 rounded-full text-white flex items-center justify-center"
                      style={{
                        background:
                          step.brand === "outcome"
                            ? "var(--color-purple-accent)"
                            : "var(--color-purple-deep)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(28,18,55,0.55)",
                      }}
                    >
                      {step.tag}
                    </span>
                  </div>
                  <h3
                    className="sj-display"
                    style={{
                      fontSize: "clamp(22px, 2.4vw, 28px)",
                      lineHeight: 1.15,
                    }}
                  >
                    {step.title}
                  </h3>
                </article>

                {/* Connector arrow between cards (desktop only) */}
                {idx < lifecycle.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 items-center justify-center"
                    style={{
                      right: -14,
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: "var(--color-paper)",
                      border: "1px solid var(--color-rule)",
                      color: "var(--color-purple-deep)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 14,
                      lineHeight: 1,
                      zIndex: 2,
                      boxShadow: "0 6px 16px -10px rgba(45,27,105,0.3)",
                    }}
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <SoftScrollCta target="#proc" label="Proč to dnes nestačí" />
      </div>
    </section>
  );
}
