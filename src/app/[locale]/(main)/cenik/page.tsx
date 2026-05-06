import { getTranslations } from "next-intl/server";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  const path = "/cenik";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = t("seoTitle");
  const description =
    "Ceník Behavera — platíte jen za lidi ve firmě. Kalkulačka ceny, ROI a srovnání nákladů. Bez karty, bez závazků.";
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        cs: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
            Investice
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Levnější než jeden odchod.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Jeden odchod = 360–540 tis. Kč. Behavera pro celou firmu stojí
            zlomek. Spočítejte si to sami.
          </p>
        </div>
      </div>

      {/* Pricing component (slider + ROI) */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* Bottom CTA */}
      <div className="bg-primary py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Otázky na cenu? Rádi vysvětlíme.
          </h2>
          <p className="text-gray-300 mb-8">
            Zavoláme vám do 24 hodin a připravíme nabídku přesně pro váš tým.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://app.behavera.com/echo-pulse/try"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              Spustit zdarma
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors"
            >
              Rezervovat demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
