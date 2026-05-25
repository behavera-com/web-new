import Image from "next/image";

type Size = "sm" | "md" | "lg" | "xl";
type Stack = "inline" | "stacked";

const sizeMap: Record<Size, { behavera: number; startupjobs: number; gap: number; label: number }> = {
  sm: { behavera: 36, startupjobs: 34, gap: 16, label: 8 },
  md: { behavera: 44, startupjobs: 42, gap: 20, label: 9 },
  lg: { behavera: 54, startupjobs: 50, gap: 24, label: 10 },
  xl: { behavera: 76, startupjobs: 70, gap: 30, label: 11 },
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
        width={Math.round(partnerSjHeight * 3.04)}
        height={partnerSjHeight}
        style={{ height: partnerSjHeight, width: "auto" }}
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
