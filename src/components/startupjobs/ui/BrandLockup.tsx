import Image from "next/image";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { behavera: number; startupjobs: number }> = {
  sm: { behavera: 22, startupjobs: 20 },
  md: { behavera: 26, startupjobs: 24 },
  lg: { behavera: 32, startupjobs: 28 },
};

export default function BrandLockup({ size = "sm" }: { size?: Size }) {
  const s = sizeMap[size];
  return (
    <span className="inline-flex items-center gap-3 md:gap-4">
      <Image
        src="/startupjobs/logo-behavera.png"
        alt="Behavera"
        width={s.behavera * 4}
        height={s.behavera}
        style={{ height: s.behavera, width: "auto" }}
        priority
      />
      <span className="sj-lockup-x" aria-hidden="true">
        ×
      </span>
      <Image
        src="/startupjobs/logo-startupjobs.svg"
        alt="StartupJobs"
        width={s.startupjobs * 5}
        height={s.startupjobs}
        style={{ height: s.startupjobs, width: "auto" }}
      />
    </span>
  );
}
