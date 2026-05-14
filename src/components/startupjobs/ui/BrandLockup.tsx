import Image from "next/image";

type Size = "sm" | "md" | "lg" | "xl";
type Stack = "inline" | "stacked";

const sizeMap: Record<Size, { behavera: number; startupjobs: number; gap: number; label: number }> = {
  sm: { behavera: 26, startupjobs: 17, gap: 14, label: 9 },
  md: { behavera: 34, startupjobs: 22, gap: 18, label: 10 },
  lg: { behavera: 44, startupjobs: 28, gap: 22, label: 11 },
  xl: { behavera: 64, startupjobs: 38, gap: 28, label: 12 },
};

export default function BrandLockup({
  size = "sm",
  showLabel = false,
  hidePartnerOnMobile = false,
  stack = "inline",
  priority = false,
}: {
  size?: Size;
  showLabel?: boolean;
  /** Hide the rule/label + StartupJobs logo below md breakpoint (Behavera-only) */
  hidePartnerOnMobile?: boolean;
  /** "stacked" places the partner row below Behavera (saves horizontal space) */
  stack?: Stack;
  priority?: boolean;
}) {
  const s = sizeMap[size];
  const partnerSjHeight = stack === "stacked" ? Math.round(s.startupjobs * 0.9) : s.startupjobs;

  const partner = (
    <span
      className={`items-center ${hidePartnerOnMobile ? "hidden md:inline-flex" : "inline-flex"}`}
      style={{ gap: s.gap }}
    >
      {showLabel ? (
        <span
          className="sj-lockup-label"
          style={{ fontSize: s.label }}
          aria-hidden="true"
        >
          ve&nbsp;spolupráci&nbsp;s
        </span>
      ) : (
        <span
          className="sj-lockup-rule"
          style={{ height: Math.round(s.behavera * 0.6) }}
          aria-hidden="true"
        />
      )}
      <Image
        src="/startupjobs/logo-startupjobs.svg"
        alt="StartupJobs"
        width={partnerSjHeight * 5}
        height={partnerSjHeight}
        style={{ height: partnerSjHeight, width: "auto", opacity: 0.85 }}
      />
    </span>
  );

  if (stack === "stacked") {
    return (
      <span className="inline-flex flex-col" style={{ gap: Math.round(s.gap * 0.7) }}>
        <Image
          src="/startupjobs/logo-behavera.png"
          alt="Behavera"
          width={s.behavera * 4}
          height={s.behavera}
          style={{ height: s.behavera, width: "auto" }}
          priority={priority}
        />
        {partner}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center" style={{ gap: s.gap }}>
      <Image
        src="/startupjobs/logo-behavera.png"
        alt="Behavera"
        width={s.behavera * 4}
        height={s.behavera}
        style={{ height: s.behavera, width: "auto" }}
        priority={priority}
      />
      {partner}
    </span>
  );
}
