import ArrowRightIcon from "../ui/ArrowRightIcon";

const scope = [
  { label: "SCOPE", value: "1 role · ~20 kandidátů" },
  { label: "DÉLKA", value: "14 dní od kick-offu" },
  { label: "CENA", value: "Od 99 Kč / osoba / měsíc" },
  { label: "EXIT", value: "Bez lock-in, bez auto-renewal" },
  { label: "START", value: "Do 5 pracovních dní" },
];

const steps = [
  {
    num: "01",
    tag: "ONBOARDING",
    title: "15 minut konzultace",
    body: "Projdeme váš nábor a roli. Buď změříme aktuální tým, nebo nasadíme připravený benchmark.",
  },
  {
    num: "02",
    tag: "IMPLEMENTACE",
    title: "~2 h vašeho času",
    body: "Setup, hru, dashboard i napojení na ATS řešíme my. Vy schválíte profil role a kanál pozvánky.",
  },
  {
    num: "03",
    tag: "VÝSLEDKY",
    title: "Live od týdne 3",
    body: "Dashboard s fit % kandidátů, retention prediction a hiring angles — bez čekání na měsíční report.",
  },
];

const reassurance = [
  "Bezplatná konzultace",
  "15 minut",
  "Žádný obchodní tlak",
];

const compliance = [
  "GDPR-ready",
  "EU AI Act compliant",
  "EU hosting",
  "ISO 27001",
];

export default function PilotBlock() {
  return (
    <section
      id="pilot"
      className="sj-reveal"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-5 inline-flex">
              08 · Jak pilot funguje
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Od konzultace k pilotu{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                typicky 2 týdny
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 self-end">
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.7)",
              }}
            >
              Konkrétní scope, konkrétní cena, konkrétní výstup. Žádný
              ramp-up projekt s IT, žádné měsíční koordinační meetingy.
            </p>
          </div>
        </div>

        {/* Body: scope + steps */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-14 md:mb-16">
          {/* Scope list */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-7 md:p-8"
              style={{
                background: "#fff",
                border: "1px solid var(--color-rule)",
                boxShadow:
                  "0 20px 40px -22px rgba(45, 27, 105, 0.10)",
              }}
            >
              <div
                className="mb-5 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-purple-deep)",
                  fontWeight: 500,
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-purple-deep)" }}
                  aria-hidden="true"
                />
                Pilot — fixní rozsah
              </div>
              <dl className="flex flex-col">
                {scope.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                    style={
                      i < scope.length - 1
                        ? { borderBottom: "1px solid var(--color-rule)" }
                        : undefined
                    }
                  >
                    <dt
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-muted)",
                        fontWeight: 500,
                        flexShrink: 0,
                      }}
                    >
                      {row.label}
                    </dt>
                    <dd
                      className="text-right"
                      style={{
                        fontSize: 14.5,
                        lineHeight: 1.4,
                        color: "var(--color-ink)",
                        fontWeight: 500,
                      }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className="flex gap-5"
                  style={
                    i < steps.length - 1
                      ? { paddingBottom: 22, borderBottom: "1px solid var(--color-rule)" }
                      : undefined
                  }
                >
                  <div className="flex-none">
                    <span
                      className="w-9 h-9 rounded-full text-white inline-flex items-center justify-center"
                      style={{
                        background: "var(--color-purple-deep)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {s.num}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="sj-step-num">{s.tag}</span>
                    <h3
                      className="sj-display mt-1.5 mb-2"
                      style={{ fontSize: 22, lineHeight: 1.2 }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="leading-[1.6]"
                      style={{
                        color: "rgba(28,18,55,0.75)",
                        fontSize: 15,
                        maxWidth: "46ch",
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reassurance row */}
        <div
          className="rounded-xl px-6 py-5 mb-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
          style={{
            background: "var(--color-purple-deep)",
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
          }}
        >
          {reassurance.map((label, i) => (
            <span key={label} className="contents">
              <span className="inline-flex items-center gap-2">
                <CheckIcon />
                <span>{label}</span>
              </span>
              {i < reassurance.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Compliance row */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-10"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          {compliance.map((label, i) => (
            <span key={label} className="contents">
              <span>{label}</span>
              {i < compliance.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{ color: "var(--color-rule)" }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a href="#consult" className="sj-btn-primary-xl">
            Domluvit konzultaci
            <span
              className="opacity-65 -ml-1"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12.5 }}
            >
              15 min
            </span>
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="flex-none"
      style={{ color: "var(--color-purple-soft)" }}
      aria-hidden="true"
    >
      <path
        d="M2.5 6.5l2.5 2.5L9.5 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
