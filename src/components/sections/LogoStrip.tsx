import { useTranslations } from "next-intl";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const logos = [
  {
    name: "Vodafone",
    src: "https://www.behavera.com/assets/vodafone-SoHosLja.webp",
  },
  {
    name: "Notino",
    src: "https://www.behavera.com/assets/notino-4mO7lJ2n.webp",
  },
  {
    name: "Martinus",
    src: "https://www.behavera.com/assets/martinus-DpwxZjsN.webp",
  },
  {
    name: "StartupJobs",
    src: "https://www.behavera.com/assets/startupjobs-CxOlhp-v.webp",
  },
  {
    name: "Raynet",
    src: "https://www.behavera.com/assets/raynet-fZPJF9WA.webp",
  },
  {
    name: "Grow Rangers",
    src: "https://www.behavera.com/assets/grow-rangers-CwMFwm_h.webp",
  },
];

const metricsTop = [
  { value: "42 500+", key: "tested" },
  { value: "68%+", key: "returnRate" },
  { value: "2 min", key: "fillTime" },
];

const metricsBottom = [
  { value: "+37 %", key: "salesGrowth", highlight: "Expando" },
  { value: "+25 %", key: "satisfaction", highlight: "Valxon" },
  { value: "60 %", key: "engagement", highlight: "Prusa Research" },
];

export default function LogoStrip() {
  const t = useTranslations("metrics");
  const tl = useTranslations("logos");

  const renderLogos = logos.map((logo, i) => (
    <div
      key={`${logo.name}-${i}`}
      className="flex-shrink-0 mx-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={120}
        height={40}
        className="h-10 w-auto object-contain"
      />
    </div>
  ));

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold text-accent uppercase tracking-widest text-center mb-6">
          {tl("title")}
        </p>

        {/* Marquee */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-marquee">
            {renderLogos}
            <div aria-hidden="true" className="flex">
              {renderLogos}
            </div>
          </div>
        </div>

        {/* Metrics - card based */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {metricsTop.map((m) => (
            <div
              key={m.key}
              className="text-center bg-white rounded-xl border border-gray-200 py-6 px-5"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                <AnimatedCounter value={m.value} />
              </p>
              <p className="text-sm text-gray-500 mt-2">{t(m.key)}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {metricsBottom.map((m) => (
            <div
              key={m.key}
              className="text-center bg-white rounded-xl border border-gray-200 py-6 px-5"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">
                <AnimatedCounter value={m.value} />
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t(m.key)}
                {m.highlight && (
                  <span className="block text-xs text-gray-400 mt-1">
                    — {m.highlight}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
