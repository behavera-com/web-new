import SoftScrollCta from "../ui/SoftScrollCta";

type Phase = {
  num: string;
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  primary?: boolean;
};

const PHASES: Phase[] = [
  {
    num: "01",
    tag: "AI Readiness",
    title: "Připravenost — než utratíte první korunu",
    body: "Zmapujeme obavy, otevřenost a úroveň dovedností napříč týmy. Vy vidíte, kde investice do AI dnes dopadne dobře a kde nejdřív potřebujete enablement.",
    bullets: [
      "Postoje k AI a obavy z nahrazení",
      "Confidence v práci s AI nástroji",
      "Skill gaps podle role",
    ],
    primary: true,
  },
  {
    num: "02",
    tag: "Before Rollout",
    title: "Před spuštěním — kontrola srozumitelnosti",
    body: "Před launchem ověříme, jestli lidé rozumí změně, co se po nich chce a proč. Zachytíme komunikační mezery dřív, než se promění v odpor.",
    bullets: [
      "Porozumění cíli rolloutu",
      "Jasnost rolí a očekávání",
      "Otevřené otázky před launchem",
    ],
  },
  {
    num: "03",
    tag: "During Rollout",
    title: "Během zavádění — okamžitá zpětná vazba",
    body: "Identifikujeme stres, komunikační mezery a technické bottlenecks dřív, než se vám sesypou metriky. Týdenní signál místo postmortemu.",
    bullets: [
      "Reálné používání podle týmu",
      "Stres a workload signály",
      "Technické bariéry",
    ],
  },
  {
    num: "04",
    tag: "After Rollout",
    title: "Po zavedení — reálný dopad a ROI",
    body: "Vyhodnotíme, jak se změnila kapacita, kvalita a workload. Data, kterými vedení ospravedlní další investici — nebo přesměruje rozpočet jinam.",
    bullets: [
      "Změna kapacity a workloadu",
      "Kvalita výstupů",
      "ROI signály na úrovni týmu",
    ],
  },
  {
    num: "05",
    tag: "Current AI Adoption",
    title: "Současný stav — mapování shadow AI",
    body: "Tam, kde AI nástroje už neoficiálně běží, najdeme skryté šampiony, neoficiální nástroje a use-casy, které dnes nikdo neviduje. Visibility místo dohadů.",
    bullets: [
      "Mapa neoficiálních nástrojů",
      "Skrytí šampioni v týmech",
      "Use-casy, které fungují",
    ],
  },
];

export default function FivePhaseTriptych() {
  return (
    <section
      id="produkt"
      className="sj-grain sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <span className="sj-section-anchor">
              <span style={{ color: "var(--color-purple-deep)" }}>02</span>
              <span>5 fází produktu</span>
            </span>
            <h2
              className="sj-h-section mt-5"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Behavera vidí, co se{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                děje s lidmi
              </em>{" "}
              v každé fázi rolloutu.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 17, color: "rgba(28,18,55,0.7)" }}
            >
              AI Readiness Suite pokrývá celý cyklus — od „zvažujeme AI“ až po
              „licence běží šest měsíců“. Můžete nastoupit{" "}
              <span style={{ color: "var(--color-ink)" }}>v jakékoli fázi</span>{" "}
              a získat data, podle kterých se rozhoduje.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PHASES.map((p) => (
            <PhaseCard key={p.num} phase={p} />
          ))}
        </div>

        <SoftScrollCta target="#demo" label="Jak to vypadá v reportu" />
      </div>
    </section>
  );
}

function PhaseCard({ phase }: { phase: Phase }) {
  const primary = !!phase.primary;
  return (
    <article
      className="relative flex flex-col gap-5 p-7 md:p-8"
      style={{
        background: primary
          ? "linear-gradient(180deg, #f6f3ff 0%, #ffffff 60%)"
          : "var(--color-paper)",
        border: primary
          ? "1px solid var(--color-purple-deep)"
          : "1px solid var(--color-rule)",
        borderRadius: 12,
        boxShadow: primary
          ? "0 24px 48px -24px rgba(45,27,105,0.25), 0 4px 12px -6px rgba(45,27,105,0.1)"
          : "0 1px 2px rgba(28,18,55,0.03)",
      }}
    >
      {primary && (
        <span
          className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{
            background: "var(--color-purple-deep)",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--sj-signal-green)" }}
            aria-hidden
          />
          Primární use-case
        </span>
      )}

      <div className="flex items-baseline gap-3">
        <span
          style={{
            fontFamily: "var(--font-fraunces)",
            fontVariationSettings: '"opsz" 144, "SOFT" 30',
            fontWeight: 380,
            fontSize: 34,
            lineHeight: 1,
            color: primary ? "var(--color-purple-deep)" : "var(--color-muted)",
          }}
        >
          {phase.num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: primary ? "var(--color-purple-deep)" : "var(--color-muted)",
            fontWeight: 500,
          }}
        >
          {phase.tag}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-fraunces)",
          fontVariationSettings: '"opsz" 144, "SOFT" 30',
          fontWeight: 380,
          fontSize: 22,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          textWrap: "balance",
        }}
      >
        {phase.title}
      </h3>

      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "rgba(28,18,55,0.72)",
        }}
      >
        {phase.body}
      </p>

      <ul className="flex flex-col gap-2 mt-auto pt-4" style={{ borderTop: "1px solid var(--color-rule)" }}>
        {phase.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5"
            style={{ fontSize: 13.5, color: "var(--color-ink)", lineHeight: 1.4 }}
          >
            <span
              aria-hidden
              className="inline-flex items-center justify-center shrink-0 mt-0.5"
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: primary ? "var(--color-purple-deep)" : "var(--color-alt)",
                color: primary ? "#fff" : "var(--color-purple-deep)",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5.5L4 7.5L8 3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}
