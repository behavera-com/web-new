"use client";

import { useRef } from "react";
import { CountUpNumber } from "../ui/useCountUp";

type Outcome = {
  slug: string;
  brand: string;
  logo: string;
  metric: string;
  label: string;
};

const OUTCOMES: Outcome[] = [
  {
    slug: "365bank",
    brand: "365.bank",
    logo: "/startupjobs/logos/365bank.svg",
    metric: "−36 %",
    label: "Rychlejší náborový proces",
  },
  {
    slug: "expando",
    brand: "Expando",
    logo: "/startupjobs/logos/expando.svg",
    metric: "+24 pp",
    label: "12mo retention nových lidí",
  },
  {
    slug: "vodafone",
    brand: "Vodafone CZ",
    logo: "/startupjobs/logos/vodafone.svg",
    metric: "−40 %",
    label: "Fluktuace zaměstnanců",
  },
];

export default function OutcomeStrip() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  return (
    <section
      className="sj-reveal"
      style={{
        background: "var(--color-alt)",
        borderTop: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 md:mb-12">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-4 inline-flex">
              09b · Reálné dopady
            </span>
            <h2
              className="sj-h-section max-w-[26ch]"
              style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}
            >
              Co Behavera doručila ve{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 80",
                }}
              >
                skutečných firmách
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.7)",
              }}
            >
              Tři čísla z reálných projektů — ne marketingové průměry. Vaše
              firma může být další.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5"
        >
          {OUTCOMES.map((o, idx) => (
            <div
              key={o.slug}
              style={{
                background: "var(--color-alt)",
                border: "1px solid var(--color-rule)",
                borderRadius: 4,
                padding: "28px 24px 22px",
              }}
            >
              <div
                className="flex items-center mb-8"
                style={{ minHeight: 36 }}
              >
                <img
                  src={o.logo}
                  alt={o.brand}
                  className="sj-logo-mark"
                  style={{ maxHeight: 28, width: "auto", objectFit: "contain" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <CountUpNumber
                  target={o.metric}
                  delayMs={idx * 200}
                  durationMs={1500}
                  triggerRef={gridRef}
                  pulseScale={1.22}
                  className="sj-display"
                  style={{
                    fontSize: "clamp(44px, 5.4vw, 64px)",
                    lineHeight: 1,
                    color: "var(--color-purple-deep)",
                    fontStyle: "italic",
                    fontVariationSettings: "'opsz' 144,'SOFT' 80",
                    letterSpacing: "-0.015em",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                }}
              >
                {o.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA — vy můžete být další */}
        <div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8"
          style={{
            paddingTop: 24,
            borderTop: "1px solid var(--color-rule)",
          }}
        >
          <p
            className="sj-display"
            style={{
              fontSize: "clamp(20px, 2.2vw, 28px)",
              lineHeight: 1.25,
              color: "var(--color-ink)",
              maxWidth: "38ch",
            }}
          >
            Další číslo už{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-purple-deep)",
                fontVariationSettings: "'opsz' 144,'SOFT' 80",
              }}
            >
              může být to vaše
            </em>
            .
          </p>
          <a
            href="#consult"
            className="sj-btn-primary inline-flex items-center gap-2 shrink-0"
            style={{
              padding: "14px 22px",
              fontSize: 14,
            }}
          >
            <span>Domluvit 15min hovor</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
