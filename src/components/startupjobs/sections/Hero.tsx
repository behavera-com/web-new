import ArrowRightIcon from "../ui/ArrowRightIcon";
import BrandLockup from "../ui/BrandLockup";
import SoftScrollCta from "../ui/SoftScrollCta";
import { CountUpNumber } from "../ui/useCountUp";
import MarqueeTrack from "./MarqueeTrack";

export default function Hero() {
  return (
    <section className="sj-grain sj-hero-stage relative overflow-hidden">
      {/* atmospheric background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(900px 520px at 78% 18%, rgba(139,92,246,0.10), transparent 60%), radial-gradient(700px 420px at 8% 95%, rgba(45,27,105,0.06), transparent 60%)",
        }}
      />

      {/* Brand-only vertical "#peoplefirst" side rail — styling via
          .bh-hero-side-rail v globals.css, hidden mimo bh-scope a pod 1180px */}
      <aside aria-hidden className="bh-hero-side-rail">
        <span>#</span>
        <span>p</span>
        <span>e</span>
        <span>o</span>
        <span>p</span>
        <span>l</span>
        <span>e</span>
        <span>f</span>
        <span>i</span>
        <span>r</span>
        <span>s</span>
        <span>t</span>
      </aside>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-12">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* LEFT: editorial copy */}
        <div className="lg:col-span-6 xl:col-span-6 relative">
          {/* Mobile-only: surface partnership lockup that's hidden in the
              compact mobile header. Desktop header already shows full lockup. */}
          <div
            className="sj-anim mb-6 lg:hidden"
            style={{ ["--sj-delay" as string]: "0ms" }}
          >
            <BrandLockup size="sm" showLabel />
          </div>

          <div
            className="sj-anim mb-5 hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              ["--sj-delay" as string]: "40ms",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid var(--color-rule)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-purple-deep)",
              fontWeight: 500,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-purple-deep)" }}
              aria-hidden
            />
            Behavera × StartupJobs
          </div>

          <h1
            className="sj-display sj-anim"
            style={{
              ["--sj-delay" as string]: "100ms",
              /* Sníženo z (44px, 7.2vw, 84px) — na <=900px viewportech
                 se "Nabírejte" + sentence wrapuje slovo na řádek. Užší
                 lower bound + plynulejší vw škálování drží 2 řádky. */
              fontSize: "clamp(38px, 5.8vw, 78px)",
              fontWeight: 460,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              textWrap: "balance",
            }}
          >
            <span className="block">Nabírejte rychleji.</span>
            <span className="block">
              Nabírejte <em>správně</em>.
            </span>
          </h1>

          <p
            className="mt-6 max-w-[600px] sj-anim"
            style={{
              ["--sj-delay" as string]: "240ms",
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(28,18,55,0.78)",
            }}
          >
            Behavera odhalí, co{" "}
            <span className="sj-hl">opravdu předpovídá úspěch</span> ve vašem
            týmu — a postaví z toho filtr, který pustí dál jen kandidáty,
            kteří u vás vydrží i mimo zkušebku.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center gap-5 sj-anim"
            style={{ ["--sj-delay" as string]: "360ms" }}
          >
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
            <a href="#report" className="sj-btn-outline-xl">
              Stáhnout vzor reportu
              <ArrowRightIcon size={16} />
            </a>
          </div>

          {/* Objection removers — trust pills */}
          <ul
            className="mt-7 flex flex-wrap gap-x-3 gap-y-2.5 max-w-[560px] sj-anim"
            style={{ ["--sj-delay" as string]: "520ms" }}
          >
            <TrustPill label="Onboarding v řádu minut">
              <FastIcon />
            </TrustPill>
            <TrustPill label="GDPR-ready">
              <ShieldIcon />
            </TrustPill>
          </ul>
        </div>

        {/* RIGHT: Expando case story card */}
        <div className="lg:col-span-6 xl:col-span-6 relative">
          <div
            className="sj-anim-card"
            style={{
              ["--sj-delay" as string]: "320ms",
              ["--sj-rot" as string]: "0deg",
            }}
          >
            <ExpandoCaseCard />
          </div>

          <div
            className="mt-5 text-right sj-anim"
            style={{
              ["--sj-delay" as string]: "820ms",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
            }}
          >
            Fig.01 — Reálný klient · Customer Success · 2024–2026
          </div>
        </div>
      </div>

      {/* Above-the-fold trust row: static logos + eyebrow */}
      <HeroTrustRow />

      <SoftScrollCta target="#cobrand" label="Proč StartupJobs × Behavera" />
      </div>
    </section>
  );
}

const heroTrustLogos = [
  { src: "/startupjobs/logos/vodafone.svg", alt: "Vodafone CZ" },
  { src: "/startupjobs/logos/o2.svg", alt: "O2" },
  { src: "/startupjobs/logos/pwc.svg", alt: "PwC" },
  { src: "/startupjobs/logos/oktagon.svg", alt: "OKTAGON MMA" },
  { src: "/startupjobs/logos/raynet.svg", alt: "Raynet CRM" },
  { src: "/startupjobs/logos/365bank.svg", alt: "365.bank" },
  { src: "/startupjobs/logos/prusa.svg", alt: "Průša Research" },
  { src: "/startupjobs/logos/expando.svg", alt: "Expando" },
  { src: "/startupjobs/logos/valxon.svg", alt: "Valxon" },
  { src: "/startupjobs/logos/alma-transparent.png", alt: "Alma Career" },
  { src: "/startupjobs/logos/krokitchen.png", alt: "KRO Kitchen" },
  { src: "/startupjobs/logos/prazske-sluzby.svg", alt: "Pražské služby" },
];

function HeroTrustRow() {
  return (
    <div
      className="mt-10 md:mt-12 pt-7 sj-anim"
      style={{
        ["--sj-delay" as string]: "640ms",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--sj-signal-green)" }}
          aria-hidden
        />
        <span className="sj-eyebrow">
          Důvěřují nám HR týmy ve firmách 50–5 000 zaměstnanců
        </span>
        <span
          className="hidden md:inline-block ml-auto"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          + desítky dalších
        </span>
      </div>
      <MarqueeTrack logos={heroTrustLogos} />
    </div>
  );
}

/* ---- objection-remover trust pills ---- */

function TrustPill({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li
      className="inline-flex items-center gap-2 px-3 py-2 rounded-full"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: "1px solid var(--color-rule)",
        fontSize: 13,
        color: "var(--color-ink)",
        fontWeight: 500,
        lineHeight: 1,
      }}
    >
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{ width: 18, height: 18, color: "var(--color-purple-deep)" }}
        aria-hidden
      >
        {children}
      </span>
      {label}
    </li>
  );
}

function NoIntegrationIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Plug body */}
      <path d="M5 9.5L9.5 5l3.5 3.5-4.5 4.5z" />
      <path d="M3.5 12.5l2 2" />
      <path d="M11 4.5l2-2" />
      <path d="M14 5.5l-2 2" />
      {/* Diagonal strike */}
      <path d="M2 16L16 2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function FastIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="10" r="6" />
      <path d="M9 7v3l2 1.5" />
      <path d="M7 2h4" />
      <path d="M9 2v2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 1.8l6 2.2v4.5c0 3.6-2.5 6.5-6 7.7-3.5-1.2-6-4.1-6-7.7V4l6-2.2z" />
      <path d="M6.2 9l2 2 3.6-3.8" />
    </svg>
  );
}

/* ---- inline product surfaces ---- */

function ExpandoCaseCard() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        border: "1px solid var(--color-rule)",
        borderRadius: 14,
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.7) inset, 0 1px 2px rgba(28,18,55,0.04), 0 30px 60px -28px rgba(45,27,105,0.24), 0 10px 30px -20px rgba(45,27,105,0.14)",
      }}
    >
      {/* Behavera app chrome — replaces macOS dots, signals "real product screen" */}
      <div
        className="flex items-center gap-3 px-5 md:px-6 py-3"
        style={{
          borderBottom: "1px solid var(--color-rule)",
          background: "linear-gradient(180deg, #fbfafd 0%, #f4f0fb 100%)",
        }}
      >
        {/* Brand wordmark — manuál str. 5: subbrand label v Object Sans lowercase.
            Žádné samostatné "B" v boxu (manuál str. 3: "Nikdy nelze písmeno b
            použít jako samotné logo") a žádný Fraunces. */}
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

        {/* Breadcrumb */}
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
          <span>Reports</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>Customer&nbsp;Success</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span
            className="truncate"
            style={{ color: "var(--color-ink)", fontWeight: 500 }}
          >
            EXP-2025
          </span>
        </div>

        {/* Live monitoring status */}
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
          Active
        </span>
      </div>

      {/* Header row — logo + finding chip */}
      <div className="px-7 md:px-9 pt-7 pb-5 flex items-start justify-between gap-4 flex-wrap">
        <img
          src="/startupjobs/logos/expando.svg"
          alt="Expando"
          height={26}
          style={{ height: 26, width: "auto", opacity: 0.92 }}
        />
        <span
          className="inline-flex items-center gap-1.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-purple-deep)",
            background: "rgba(45,27,105,0.06)",
            border: "1px solid rgba(45,27,105,0.14)",
            padding: "5px 9px",
            borderRadius: 4,
            fontWeight: 500,
          }}
        >
          <span aria-hidden style={{ fontSize: 8, lineHeight: 1 }}>
            ◆
          </span>
          Pattern · Customer Empathy
        </span>
      </div>

      {/* Punchline */}
      <div className="px-7 md:px-9 pb-7">
        <h3
          style={{
            fontFamily: "var(--font-fraunces)",
            fontVariationSettings: '"opsz" 144, "SOFT" 30',
            fontWeight: 380,
            fontSize: "clamp(24px, 2.4vw, 32px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.12,
            color: "var(--color-ink)",
            textWrap: "balance",
          }}
        >
          „Jeden ze 3 nevydržel.{" "}
          <em
            style={{
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
              color: "var(--color-purple-deep)",
            }}
          >
            Teď zůstane každý.
          </em>
          ”
        </h3>
      </div>

      {/* Metric panel — dashboard widget vibe with bar charts */}
      <div
        className="px-7 md:px-9 pt-6 pb-7 grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-7"
        style={{
          borderTop: "1px solid var(--color-rule)",
          borderBottom: "1px solid var(--color-rule)",
          background: "linear-gradient(180deg, #fbfafd 0%, #f6f3ff 100%)",
        }}
      >
        <ExpandoMetric
          label="Time to hire"
          unit="dní"
          before={27}
          after={12}
          delta="−56 %"
          improvement="down"
          delayMs={900}
        />
        <ExpandoMetric
          label="12mo retention"
          unit="%"
          before={65}
          after={87}
          delta="+22 pp"
          improvement="up"
          delayMs={1050}
        />
      </div>

      {/* Stakeholder note — panel mimics a report excerpt */}
      <div className="px-7 md:px-9 pt-6 pb-6">
        <div
          className="flex items-center gap-2 mb-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: 14,
              height: 1,
              background: "var(--color-muted)",
              opacity: 0.4,
            }}
          />
          Stakeholder note
        </div>

        <blockquote
          style={{
            fontFamily: "var(--font-fraunces)",
            fontVariationSettings: '"opsz" 144, "SOFT" 40',
            fontWeight: 380,
            fontStyle: "italic",
            fontSize: 17,
            lineHeight: 1.5,
            letterSpacing: "-0.012em",
            color: "rgba(28,18,55,0.86)",
            textWrap: "balance",
            paddingLeft: 14,
            borderLeft: "2px solid var(--color-purple-deep)",
          }}
        >
          „Mysleli jsme, že hledáme customer centricity. Realita: každý třetí
          odešel do dvou měsíců. Behavera nám ukázala, který kompetenční
          pattern držet — teď přesně vím, kdo v týmu bude fungovat.”
        </blockquote>

        <div className="mt-5 flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0"
            style={{
              background: "var(--color-purple-deep)",
              fontFamily: "var(--font-inter-tight)",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
            aria-hidden
          >
            <img src="/startupjobs/team/Basia.png" alt="Barbora Třeslínová" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "50%" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div
              style={{
                fontSize: 13.5,
                fontWeight: 500,
                color: "var(--color-ink)",
                lineHeight: 1.2,
              }}
            >
              Barbora Třeslínová
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                color: "var(--color-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Head of Customer Success · Expando
            </div>
          </div>
        </div>
      </div>

      {/* CTA bar — file-row vibe */}
      <a
        href="#cases"
        className="group flex items-center justify-between gap-3 px-7 md:px-9 py-4 transition-colors hover:bg-[#f6f3ff]"
        style={{
          background: "var(--color-paper)",
          borderTop: "1px solid var(--color-rule)",
          color: "var(--color-ink)",
        }}
      >
        <span
          className="inline-flex items-center gap-2.5 min-w-0"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--color-muted)",
            textTransform: "uppercase",
          }}
        >
          <FileIcon />
          <span className="truncate" style={{ color: "var(--color-ink)" }}>
            EXP-2025
          </span>
          <span aria-hidden style={{ opacity: 0.4 }}>·</span>
          <span className="hidden sm:inline">Celý příběh</span>
        </span>
        <span
          className="inline-flex items-center gap-2 shrink-0 transition-transform group-hover:translate-x-0.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "var(--color-purple-deep)",
          }}
        >
          Stáhnout
          <span aria-hidden>→</span>
        </span>
      </a>
    </div>
  );
}

function FileIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 1.5h5l3 3v8a.5.5 0 0 1-.5.5h-7.5a.5.5 0 0 1-.5-.5v-10.5a.5.5 0 0 1 .5-.5z" />
      <path d="M8 1.5v3h3" />
    </svg>
  );
}

function ExpandoMetric({
  label,
  unit,
  before,
  after,
  delta,
  improvement,
  delayMs,
}: {
  label: string;
  unit: string;
  before: number;
  after: number;
  delta: string;
  improvement: "up" | "down";
  delayMs: number;
}) {
  // Axis spans 0 → max of the two values, with 15 % headroom so the longer bar
  // doesn't kiss the right edge (gives the widget room to breathe).
  const axisMax = Math.ceil((Math.max(before, after) * 1.15) / 5) * 5;
  const beforePct = (before / axisMax) * 100;
  const afterPct = (after / axisMax) * 100;
  const deltaColor =
    improvement === "up"
      ? "var(--sj-signal-green-ink)"
      : "var(--sj-signal-green-ink)";

  return (
    <div className="flex flex-col gap-3">
      {/* Header row: label + delta chip */}
      <div className="flex items-baseline justify-between gap-3">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span
          className="inline-flex items-center gap-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.04em",
            color: deltaColor,
            background: "var(--sj-signal-green-soft)",
            padding: "2px 7px",
            borderRadius: 4,
            fontWeight: 500,
          }}
        >
          <span aria-hidden style={{ fontSize: 9 }}>
            {improvement === "up" ? "▲" : "▼"}
          </span>
          {delta}
        </span>
      </div>

      {/* Big after number with before strikethrough */}
      <div className="flex items-baseline gap-2.5">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "rgba(28,18,55,0.4)",
            letterSpacing: "0.01em",
            textDecoration: "line-through",
            textDecorationThickness: "1px",
          }}
        >
          {before}&nbsp;{unit}
        </span>
        <CountUpNumber
          target={`${after} ${unit}`}
          delayMs={delayMs}
          durationMs={1400}
          style={{
            fontFamily: "var(--font-fraunces)",
            fontVariationSettings: '"opsz" 144, "SOFT" 30',
            fontWeight: 380,
            fontSize: 30,
            letterSpacing: "-0.035em",
            color: "var(--color-ink)",
            lineHeight: 1,
          }}
        />
      </div>

      {/* Mini bar chart: baseline ghost + animated foreground + before tick */}
      <div className="relative mt-1">
        <div
          className="relative h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(28,18,55,0.06)" }}
        >
          {/* Ghost of "before" position */}
          <span
            className="absolute inset-y-0 left-0"
            style={{
              background: "rgba(28,18,55,0.18)",
              width: `${beforePct}%`,
              borderRadius: 999,
            }}
          />
          {/* Animated "after" bar */}
          <span
            className="absolute inset-y-0 left-0 rounded-full"
            style={
              {
                background:
                  "linear-gradient(90deg, var(--color-purple-deep), var(--sj-signal-green))",
                width: 0,
                animation:
                  "sj-bar-grow 1.4s cubic-bezier(0.2,0.8,0.2,1) forwards",
                animationDelay: `${delayMs}ms`,
                ["--sj-w" as string]: `${afterPct}%`,
              } as React.CSSProperties
            }
          />
          {/* "Before" tick marker — small vertical line at before position */}
          <span
            aria-hidden
            className="absolute"
            style={{
              left: `calc(${beforePct}% - 1px)`,
              top: -2,
              bottom: -2,
              width: 2,
              background: "rgba(28,18,55,0.4)",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Axis labels */}
        <div
          className="flex items-center justify-between mt-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9.5,
            letterSpacing: "0.06em",
            color: "rgba(28,18,55,0.45)",
          }}
        >
          <span>0</span>
          <span>
            {axisMax}&nbsp;{unit}
          </span>
        </div>
      </div>
    </div>
  );
}

