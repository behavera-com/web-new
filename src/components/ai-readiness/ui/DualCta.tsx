"use client";

import ArrowRightIcon from "./ArrowRightIcon";

export default function DualCta({
  align = "start",
  className = "",
  location = "dual_cta",
}: {
  align?: "start" | "center";
  className?: string;
  location?: string;
}) {
  const justify = align === "center" ? "justify-center" : "justify-start";
  return (
    <div
      className={`flex flex-wrap items-center gap-4 ${justify} ${className}`}
    >
      <a
        href="#consult"
        className="sj-btn-primary-xl"
        data-event-name="cta_click"
        data-event-cta-id={`${location}_consult`}
        data-event-cta-label="Domluvit konzultaci"
        data-event-cta-location={location}
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
        data-event-cta-id={`${location}_pilot`}
        data-event-cta-label="Pilot 2026"
        data-event-cta-location={location}
        data-event-cta-target="pilot_anchor"
      >
        Pilot program 2026
        <ArrowRightIcon size={16} />
      </a>
    </div>
  );
}
