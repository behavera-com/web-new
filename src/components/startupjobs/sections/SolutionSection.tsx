import ArrowRightIcon from "../ui/ArrowRightIcon";
import CheckMark from "../ui/CheckMark";

type Candidate = {
  label: string;
  scores: [number, number, number];
  proceed?: boolean;
};

const candidates: Candidate[] = [
  { label: "KAND. 01", scores: [78, 64, 52] },
  { label: "KAND. 02", scores: [62, 88, 71] },
  { label: "KAND. 03", scores: [92, 89, 84], proceed: true },
  { label: "KAND. 04", scores: [71, 55, 68] },
  { label: "KAND. 05", scores: [48, 72, 41] },
];

const bullets = [
  {
    title: "Predikce úspěchu kandidáta",
    body: (
      <>
        Než pošlete nabídku, víte, jestli kandidát sedí roli i kultuře.{" "}
        <span className="sj-hl">Žádné drahé chyby</span> v seniorních pozicích.
      </>
    ),
  },
  {
    title: "Rychlejší rozhodování v procesu",
    body: (
      <>
        Strukturovaná data o silných stránkách, vedoucímu potenciálu a
        kompatibilitě týmu. <span className="sj-hl">Méně iterací, méně debat.</span>
      </>
    ),
  },
  {
    title: "Reporting, který má váhu",
    body: (
      <>
        KPI metriky, které ukážete CFO i CEO.{" "}
        <span className="sj-hl">Time-to-hire, quality of hire, retence 6m/12m</span> — vše měřitelně.
      </>
    ),
  },
];

function ScoreBar({
  score,
  highlight,
}: {
  score: number;
  highlight?: boolean;
}) {
  const fill = (score / 100) * 88;
  const color = highlight ? "#8B5CF6" : "#2D1B69";
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-7 text-right"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--color-ink)",
          fontWeight: 500,
        }}
      >
        {score}
      </span>
      <svg width="88" height="6" viewBox="0 0 88 6" className="flex-none">
        <rect x="0" y="0" width="88" height="6" fill="#E5E1F2" />
        <rect x="0" y="0" width={fill} height="6" fill={color} />
      </svg>
    </div>
  );
}

export default function SolutionSection() {
  return (
    <section
      className="sj-grain sj-reveal"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-3">
            <span className="sj-sec-num">02 / ŘEŠENÍ</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[18ch]">
              Behavera: nábor, který sedí <em>napoprvé</em>.
            </h2>
            <p
              className="mt-7 leading-[1.6] max-w-[58ch]"
              style={{
                fontSize: 20,
                color: "rgba(28,18,55,0.8)",
              }}
            >
              Datová vrstva nad vaším náborem. Méně chyb, lepší KPI, klid v
              reportingu.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <figure
            className="bg-white p-6 md:p-8 relative"
            style={{ border: "1px solid var(--color-rule)" }}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="sj-eyebrow">Fig.03 — Candidate fit matrix</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-purple-accent)",
                  letterSpacing: "0.16em",
                }}
              >
                Q1 · 2026
              </span>
            </div>
            <p className="sj-display mb-5" style={{ fontSize: 26, lineHeight: 1.2 }}>
              Kdo sedí roli, kultuře, vedení týmu.
            </p>

            <div
              className="flex items-center justify-between mb-6 pb-5"
              style={{ borderBottom: "1px solid var(--color-rule)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  letterSpacing: "0.16em",
                }}
              >
                FILTROVAT PODLE ROLE
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2"
                style={{
                  border: "1px solid var(--color-rule)",
                  background: "var(--color-paper)",
                  fontSize: 13,
                  color: "var(--color-ink)",
                  fontWeight: 500,
                }}
                aria-haspopup="listbox"
              >
                <span>Senior Engineering</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  style={{ color: "var(--color-muted)" }}
                >
                  <path
                    d="M2 4l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className="grid gap-4 px-4 pb-3"
              style={{
                gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                borderBottom: "1px solid var(--color-rule)",
              }}
            >
              {["KANDIDÁT", "ROLE FIT", "CULTURE FIT", "VEDOUCÍ POTENCIÁL"].map(
                (h) => (
                  <span
                    key={h}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--color-muted)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    {h}
                  </span>
                )
              )}
            </div>

            {candidates.map((c) => (
              <div
                key={c.label}
                className="grid gap-4 items-center py-4 px-4"
                style={{
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                  ...(c.proceed
                    ? {
                        border: "1px solid var(--color-purple-accent)",
                        background: "rgba(139,92,246,0.06)",
                      }
                    : {
                        borderTop: "1px solid var(--color-rule)",
                      }),
                }}
              >
                {c.proceed ? (
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--color-ink)",
                        fontWeight: 500,
                      }}
                    >
                      {c.label}
                    </span>
                    <span
                      className="px-1.5 py-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: "var(--color-purple-accent)",
                        letterSpacing: "0.16em",
                        border: "1px solid var(--color-purple-accent)",
                      }}
                    >
                      → PROCEED
                    </span>
                  </div>
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--color-muted)",
                    }}
                  >
                    {c.label}
                  </span>
                )}
                {c.scores.map((s, i) => (
                  <ScoreBar key={i} score={s} highlight={c.proceed} />
                ))}
              </div>
            ))}

            <p
              className="mt-7 text-right"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-muted)",
                letterSpacing: "0.16em",
              }}
            >
              FIG.03 · BEHAVERA · candidate scoring · VÝŇATEK Z REÁLNÉHO REPORTINGU · ANONYMIZOVÁNO
            </p>

            <a
              href="#consult"
              className="mt-6 inline-flex items-baseline gap-2 pb-px transition-colors"
              style={{
                fontSize: 13.5,
                color: "var(--color-purple-accent)",
                fontWeight: 500,
                borderBottom: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              Stejnou matrici nasadíme na vaše reálné kandidáty — během 2 týdnů
              <ArrowRightIcon size={13} />
            </a>
          </figure>

          <div className="lg:pl-6 lg:pt-4">
            <h3
              className="sj-display mb-8 max-w-[22ch]"
              style={{ fontSize: 34 }}
            >
              Datová vrstva, která <em>rozhoduje za vás</em>.
            </h3>

            <ul className="space-y-7">
              {bullets.map((b) => (
                <li key={b.title} className="flex gap-5">
                  <CheckMark />
                  <div>
                    <h4
                      className="mb-1.5 tracking-tight"
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: "var(--color-ink)",
                      }}
                    >
                      {b.title}
                    </h4>
                    <p
                      className="leading-[1.65] max-w-[44ch]"
                      style={{ color: "rgba(28,18,55,0.75)" }}
                    >
                      {b.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a href="#consult" className="sj-btn-textlink mt-12">
              Domluvit konzultaci · 15 min
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
