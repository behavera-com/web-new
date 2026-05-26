"use client";

import ArrowRightIcon from "../ui/ArrowRightIcon";
import BrandLockup from "../ui/BrandLockup";
import SoftScrollCta from "../ui/SoftScrollCta";

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

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* LEFT: editorial copy */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
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
              Echo Pulse · AI Transformation Suite
            </div>

            <h1
              className="sj-display sj-anim"
              style={{
                ["--sj-delay" as string]: "100ms",
                fontSize: "clamp(36px, 5.4vw, 72px)",
                fontWeight: 460,
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                textWrap: "balance",
              }}
            >
              <span className="block">AI transformace neselhává</span>
              <span className="block">
                kvůli technologii. Selhává <em>kvůli adopci</em>.
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
              Zjistěte, <span className="sj-hl">kdo AI používá, kdo tápá</span>{" "}
              a kde už dnes vytváří hodnotu. Echo Pulse měří lidskou část AI
              rolloutu — anonymně, agregovaně, s výstupem pro vedení i HR.
            </p>

            <div
              className="mt-7 flex flex-wrap items-center gap-5 sj-anim"
              style={{ ["--sj-delay" as string]: "360ms" }}
            >
              <a
                href="#consult"
                className="sj-btn-primary-xl"
                data-event-name="cta_click"
                data-event-cta-id="hero_consult"
                data-event-cta-label="Domluvit konzultaci"
                data-event-cta-location="hero"
                data-event-cta-target="consult"
              >
                Domluvit konzultaci
                <span
                  className="opacity-65 -ml-1"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 12.5 }}
                >
                  15 min
                </span>
                <ArrowRightIcon size={16} />
              </a>
              <a
                href="#pilot"
                className="sj-btn-outline-xl"
                data-event-name="cta_click"
                data-event-cta-id="hero_pilot"
                data-event-cta-label="Pilot 2026"
                data-event-cta-location="hero"
                data-event-cta-target="pilot_anchor"
              >
                Pilot program 2026
                <ArrowRightIcon size={16} />
              </a>
            </div>

            {/* Trust pills */}
            <ul
              className="mt-7 flex flex-wrap gap-x-3 gap-y-2.5 max-w-[560px] sj-anim"
              style={{ ["--sj-delay" as string]: "520ms" }}
            >
              <TrustPill label="Anonymně · týmy, ne jednotlivci">
                <AnonIcon />
              </TrustPill>
              <TrustPill label="Na trhu 10+ let">
                <HistoryIcon />
              </TrustPill>
              <TrustPill label="50 000+ účastníků">
                <UsersIcon />
              </TrustPill>
              <TrustPill label="GDPR compliant">
                <ShieldIcon />
              </TrustPill>
            </ul>
          </div>

          {/* RIGHT: Adoption snapshot mock card */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            <div
              className="sj-anim-card"
              style={{
                ["--sj-delay" as string]: "320ms",
                ["--sj-rot" as string]: "0deg",
              }}
            >
              <AdoptionSnapshotCard />
            </div>
          </div>
        </div>

        <SoftScrollCta
          target="#cobrand"
          label="Proč StartupJobs ve spolupráci s Behaverou"
        />
      </div>
    </section>
  );
}

/* ---- trust pills ---- */

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

function HistoryIcon() {
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
      <path d="M2.6 6.5A6.4 6.4 0 1 1 2.4 11" />
      <path d="M2.4 3.4v3.1h3.1" />
      <path d="M9 5.6v3.7l2.4 1.5" />
    </svg>
  );
}

function UsersIcon() {
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
      <circle cx="6.5" cy="7" r="2.6" />
      <path d="M1.6 15c.5-2.4 2.5-3.9 4.9-3.9s4.4 1.5 4.9 3.9" />
      <path d="M12.5 4.6a2.4 2.4 0 1 1 0 4.6" />
      <path d="M12.6 11.4c1.7.3 3 1.6 3.4 3.4" />
    </svg>
  );
}

function AnonIcon() {
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
      <circle cx="6" cy="6.5" r="2.2" />
      <circle cx="12" cy="6.5" r="2.2" />
      <path d="M2.2 14c.5-2 2-3.2 3.8-3.2s3.3 1.2 3.8 3.2" />
      <path d="M8.2 14c.5-2 2-3.2 3.8-3.2s3.3 1.2 3.8 3.2" />
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

/* ---- Adoption snapshot card — CSS-only mock dashboard ---- */

type TeamRow = {
  team: string;
  adoption: number; // 0-1
  confidence: "low" | "mid" | "high";
  trend: "up" | "flat" | "down";
};

const TEAM_ROWS: TeamRow[] = [
  { team: "Engineering", adoption: 0.86, confidence: "high", trend: "up" },
  { team: "Marketing", adoption: 0.72, confidence: "high", trend: "up" },
  { team: "Sales", adoption: 0.41, confidence: "low", trend: "flat" },
  { team: "Customer Care", adoption: 0.28, confidence: "low", trend: "down" },
  { team: "Finance & Ops", adoption: 0.18, confidence: "low", trend: "flat" },
];

function AdoptionSnapshotCard() {
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
      {/* App chrome */}
      <div
        className="flex items-center gap-3 px-5 md:px-6 py-3"
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
          <span>Adopce</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span
            className="truncate"
            style={{ color: "var(--color-ink)", fontWeight: 500 }}
          >
            Q1·2026
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

      {/* Header + KPI row */}
      <div className="px-7 md:px-9 pt-7 pb-5">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: 8,
          }}
        >
          Adoption snapshot · ukázka
        </div>
        <h3
          style={{
            fontFamily: "var(--font-fraunces)",
            fontVariationSettings: '"opsz" 144, "SOFT" 30',
            fontWeight: 380,
            fontSize: "clamp(22px, 2.2vw, 30px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            color: "var(--color-ink)",
            textWrap: "balance",
          }}
        >
          „Marketing už <em
            style={{
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
              color: "var(--color-purple-deep)",
            }}
          >jede</em>. Customer Care{" "}
          <em
            style={{
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
              color: "var(--color-purple-deep)",
            }}
          >
            potřebuje pomoc.
          </em>
          ”
        </h3>
      </div>

      {/* Heatmap */}
      <div
        className="px-7 md:px-9 py-6"
        style={{
          borderTop: "1px solid var(--color-rule)",
          borderBottom: "1px solid var(--color-rule)",
          background: "linear-gradient(180deg, #fbfafd 0%, #f6f3ff 100%)",
        }}
      >
        <div
          className="flex items-center justify-between mb-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          <span>Adopce · podle týmu</span>
          <span style={{ opacity: 0.7 }}>0 % → 100 %</span>
        </div>
        <ul className="flex flex-col gap-2.5">
          {TEAM_ROWS.map((row) => (
            <HeatmapRow key={row.team} row={row} />
          ))}
        </ul>
      </div>

      {/* Insight line */}
      <div className="px-7 md:px-9 py-5 flex items-start gap-3">
        <span
          className="inline-block shrink-0 mt-1"
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "var(--color-purple-deep)",
          }}
          aria-hidden
        />
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.55,
            color: "rgba(28,18,55,0.78)",
          }}
        >
          <strong style={{ color: "var(--color-ink)", fontWeight: 600 }}>
            Doporučení tento týden:
          </strong>{" "}
          spustit cílený enablement pro Customer Care &amp; Finance — confidence
          gap je největší riziko ROI.
        </p>
      </div>
    </div>
  );
}

function HeatmapRow({ row }: { row: TeamRow }) {
  const pct = Math.round(row.adoption * 100);
  const tone =
    row.adoption >= 0.65
      ? "var(--sj-signal-green)"
      : row.adoption >= 0.45
        ? "var(--color-purple-soft)"
        : "#c89b3b";
  const trendArrow = row.trend === "up" ? "▲" : row.trend === "down" ? "▼" : "·";
  const trendColor =
    row.trend === "up"
      ? "var(--sj-signal-green-ink)"
      : row.trend === "down"
        ? "#9b1c2c"
        : "var(--color-muted)";

  return (
    <li className="flex items-center gap-3">
      <span
        className="w-[34%] sm:w-[28%] shrink-0"
        style={{
          fontSize: 12.5,
          fontWeight: 500,
          color: "var(--color-ink)",
        }}
      >
        {row.team}
      </span>
      <span
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(28,18,55,0.06)" }}
      >
        <span
          className="block h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${tone}, var(--color-purple-deep))`,
          }}
        />
      </span>
      <span
        className="shrink-0 tabular-nums"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          color: "var(--color-ink)",
          fontWeight: 500,
          width: 38,
          textAlign: "right",
        }}
      >
        {pct} %
      </span>
      <span
        aria-hidden
        className="shrink-0 inline-flex items-center justify-center"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: trendColor,
          width: 14,
        }}
      >
        {trendArrow}
      </span>
    </li>
  );
}
