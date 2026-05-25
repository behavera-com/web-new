"use client";

import { useReportModal } from "./ReportModalProvider";

type ReportSoftCtaProps = {
  label: string;
  tone?: "light" | "dark";
  className?: string;
};

export default function ReportSoftCta({
  label,
  tone = "light",
  className = "",
}: ReportSoftCtaProps) {
  const { open } = useReportModal();
  const isDark = tone === "dark";
  return (
    <div className={`flex justify-center mt-12 md:mt-16 ${className}`}>
      <button
        type="button"
        onClick={open}
        className="sj-soft-cta group inline-flex flex-col items-center gap-2 transition-opacity"
        style={{
          color: isDark
            ? "rgba(255,255,255,0.72)"
            : "rgba(28,18,55,0.62)",
          background: "transparent",
          border: 0,
          padding: 0,
          cursor: "pointer",
        }}
      >
        <span
          className="font-medium tracking-wide"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <svg
          width="16"
          height="22"
          viewBox="0 0 16 22"
          fill="none"
          aria-hidden
          className="sj-soft-cta-chev transition-transform group-hover:translate-y-1"
        >
          <path
            d="M8 1v18m0 0l-6-6m6 6l6-6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
