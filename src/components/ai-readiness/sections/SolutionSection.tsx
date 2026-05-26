import SoftScrollCta from "../ui/SoftScrollCta";

type Pillar = { category: string; translation: string };

const IS_ROWS: Pillar[] = [
  {
    category: "Operational Intelligence",
    translation: "Data, podle kterých vedení rozhoduje o investicích do AI.",
  },
  {
    category: "Rollout Intelligence",
    translation:
      "Nástroj pro úspěšné zavedení — vidíte, kde rollout vázne a proč.",
  },
  {
    category: "Adopční diagnostika",
    translation:
      "Zjištění reálného stavu používání — kdo, jak, jak často a s jakou důvěrou.",
  },
  {
    category: "Anonymně & compliance-ready",
    translation:
      "Vidíte týmy, ne jednotlivce. GDPR, AI Act i § 316 zákoníku práce.",
  },
];

const IS_NOT_ROWS: Pillar[] = [
  {
    category: "Ne nástroj měření spokojenosti",
    translation:
      'Neměříme sentiment ani „jak se kdo cítí". Měříme chování v kontextu.',
  },
  {
    category: "Ne individuální monitoring",
    translation:
      "Manager nečte odpovědi konkrétních lidí. Žádné individuální profily.",
  },
  {
    category: "Ne AI tool management",
    translation: "Echo Pulse nespravuje licence, prompty ani modely.",
  },
  {
    category: "Ne black box",
    translation:
      "Vidíte přesně, co se měří, jak a kam data jdou. Plná metodická transparentnost.",
  },
];

export default function SolutionSection() {
  return (
    <section
      id="metodika"
      className="sj-grain sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 md:mb-16">
          <div className="lg:col-span-5">
            <span className="sj-section-anchor">
              <span style={{ color: "var(--color-purple-deep)" }}>04</span>
              <span>Metodika</span>
            </span>
            <h2
              className="sj-h-section mt-5"
              style={{ fontSize: "clamp(32px, 4.2vw, 52px)" }}
            >
              Datový brief pro vedení.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                Ne dotazník spokojenosti.
              </em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 17, color: "rgba(28,18,55,0.7)" }}
            >
              Echo Pulse je{" "}
              <span style={{ color: "var(--color-ink)" }}>intelligence layer</span>{" "}
              — měří adopci, chování, confidence, alignment a kvalitu rolloutu —
              a říká, co máte zítra udělat jinak, aby se investice do AI vyplatila.
            </p>
          </div>
        </div>

        <div
          className="grid md:grid-cols-2 gap-px"
          style={{
            background: "var(--color-rule)",
            border: "1px solid var(--color-rule)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Panel
            title="Co Behavera JE"
            accent="positive"
            rows={IS_ROWS}
          />
          <Panel
            title="Co Behavera NENÍ"
            accent="negative"
            rows={IS_NOT_ROWS}
          />
        </div>

        <SoftScrollCta target="#pilot" label="Otevřený pilot program 2026" />
      </div>
    </section>
  );
}

function Panel({
  title,
  accent,
  rows,
}: {
  title: string;
  accent: "positive" | "negative";
  rows: Pillar[];
}) {
  const isPositive = accent === "positive";
  return (
    <div
      className="p-8 md:p-10 flex flex-col gap-6"
      style={{
        background: isPositive
          ? "linear-gradient(180deg, #f6f3ff 0%, #ffffff 70%)"
          : "var(--color-paper)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: isPositive ? "var(--color-purple-deep)" : "var(--color-alt)",
            color: isPositive ? "#fff" : "var(--color-muted)",
          }}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            {isPositive ? (
              <path
                d="M3 7.5l3 3 5-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 4l6 6M10 4l-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </span>
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: isPositive ? "var(--color-purple-deep)" : "var(--color-muted)",
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      </div>

      <ul className="flex flex-col gap-5">
        {rows.map((r) => (
          <li
            key={r.category}
            className="flex flex-col gap-1"
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: isPositive
                  ? "var(--color-purple-deep)"
                  : "var(--color-muted)",
              }}
            >
              {r.category}
            </span>
            <span
              style={{
                fontSize: 14.5,
                lineHeight: 1.55,
                color: isPositive ? "var(--color-ink)" : "rgba(28,18,55,0.6)",
              }}
            >
              {r.translation}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
