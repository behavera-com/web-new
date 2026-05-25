"use client";

import ArrowRightIcon from "./ArrowRightIcon";
import { useReportModal } from "./ReportModalProvider";

export default function DualCta({
  align = "start",
  className = "",
  location = "dual_cta",
}: {
  align?: "start" | "center";
  className?: string;
  location?: string;
}) {
  const { open: openReportModal } = useReportModal();
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
      <button
        type="button"
        onClick={() => openReportModal(location)}
        className="sj-btn-outline-xl"
      >
        Stáhnout vzor reportu
        <ArrowRightIcon size={16} />
      </button>
    </div>
  );
}
