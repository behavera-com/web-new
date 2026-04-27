import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, TrendingUp, Users, BarChart3 } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const path = "/pripadovky";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = "Případové studie — reálné výsledky, ne sliby";
  const description =
    "+37 % prodeje, −14 % fluktuace, +80 % tržby na hovor. Přečtěte si, jak Behavera pomohla Vodafone, Prusa Research, Expando a dalším.";
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
    openGraph: { title, description, url: canonicalUrl, type: "website" },
  };
}

const cases = [
  {
    slug: "expando",
    company: "Expando",
    segment: "E-Commerce",
    size: "50+ lidí",
    headline: "+37 % prodeje. €11K ušetřeno za kvartál.",
    text: "CEO Dominik Hegedus hledal způsob, jak pochopit, proč část jeho obchodního týmu výrazně převyšuje ostatní. Behavera odhalila skrytý talent a umožnila přeskupení týmů.",
    metrics: [
      { label: "Prodeje", value: "+37 %" },
      { label: "Úspora/kvartál", value: "€11K" },
    ],
    quote: "Ušetřili jsme 11 000 € za kvartál a prodeje vzrostly o 37 %.",
    quoteAuthor: "Dominik Hegedus, CEO",
    icon: TrendingUp,
    color: "bg-green-50 border-green-200",
    accentColor: "text-green-600",
  },
  {
    slug: "vodafone",
    company: "Vodafone CZ",
    segment: "Telekomunikace",
    size: "1 500+ lidí",
    headline: "+40 % retence. +80 % tržby na hovor.",
    text: "Vodafone CZ potřeboval rychle zjistit příčiny odchodů v call centru a zároveň zlepšit výkon prodejních týmů. Behavera poskytla data, která změnila způsob řízení.",
    metrics: [
      { label: "Retence", value: "+40 %" },
      { label: "Tržby/hovor", value: "+80 %" },
    ],
    quote: "Zachytili jsme 3 připravované odchody. Dva se nám podařilo zvrátit.",
    quoteAuthor: "HR Director, Vodafone CZ",
    icon: Users,
    color: "bg-red-50 border-red-200",
    accentColor: "text-red-600",
  },
  {
    slug: "prusa-research",
    company: "Prusa Research",
    segment: "Technologie / Výroba",
    size: "1 000+ lidí",
    headline: "60 % zapojení ve výrobě. Za 3 minuty.",
    text: "Prusa Research potřebovala změřit engagement napříč výrobou a kancelářemi — 1 000+ lidí v různých směnách. Standardní průzkumy nefungovaly. Behavera to zvládla za 3 minuty.",
    metrics: [
      { label: "Zapojení ve výrobě", value: "60 %" },
      { label: "Čas na analýzu", value: "3 min" },
    ],
    quote: "Za 3 minuty jsme měli jasný obraz zapojení 1 000+ lidí.",
    quoteAuthor: "People & Culture, Prusa Research",
    icon: BarChart3,
    color: "bg-orange-50 border-orange-200",
    accentColor: "text-orange-600",
  },
  {
    slug: "valxon",
    company: "Valxon",
    segment: "Reklamní předměty",
    size: "30+ lidí",
    headline: "+25 % spokojenost. Burnout zachycen včas.",
    text: "Nové vedení Valxonu přišlo s výzvou: jak rychle pochopit skutečný stav týmu a stížnosti na odměňování. Behavera odhalila problémy dřív, než se rozrostly.",
    metrics: [
      { label: "Spokojenost", value: "+25 %" },
      { label: "Burnout zachycen", value: "1 případ" },
    ],
    quote: "Zachytili jsme burnout dřív, než způsobil odchod. +25 % spokojenost za kvartál.",
    quoteAuthor: "Karel, CEO, Valxon",
    icon: TrendingUp,
    color: "bg-blue-50 border-blue-200",
    accentColor: "text-blue-600",
  },
  {
    slug: "365bank",
    company: "365.bank",
    segment: "Bankovnictví",
    size: "400+ lidí",
    headline: "−14 % fluktuace. +36 % rychlejší nábor.",
    text: "365.bank procházela digitální transformací a potřebovala udržet klíčové lidi, zároveň zrychlit nábor. Behavera data pomohla identifikovat kulturní bariéry a rizika odchodů.",
    metrics: [
      { label: "Fluktuace", value: "−14 %" },
      { label: "Nábor rychlejší", value: "+36 %" },
    ],
    quote: "Konečně víme, co se v týmech doopravdy děje. Žádné hádání — jen data a jasné kroky.",
    quoteAuthor: "HR Director, 365.bank",
    icon: BarChart3,
    color: "bg-purple-50 border-purple-200",
    accentColor: "text-purple-600",
  },
];

export default async function CaseStudiesPage() {
  const t = await getTranslations("caseStudies");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
            Ověřené výsledky
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Cases grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((cs, i) => {
            const Icon = cs.icon;
            return (
              <FadeIn key={cs.slug} delay={i * 0.07}>
                <div
                  className={`rounded-2xl p-8 border h-full flex flex-col ${cs.color}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {cs.segment} · {cs.size}
                      </p>
                      <h2 className="text-xl font-bold text-primary">
                        {cs.company}
                      </h2>
                    </div>
                    <div className={`w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${cs.accentColor}`} />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-primary mb-3">
                    {cs.headline}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed mb-5 flex-1">
                    {cs.text}
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-4 mb-5">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="bg-white/70 rounded-xl px-4 py-3 text-center">
                        <p className={`text-2xl font-extrabold ${cs.accentColor}`}>
                          {m.value}
                        </p>
                        <p className="text-xs text-gray-500">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-current pl-4 mb-5">
                    <p className={`text-sm italic ${cs.accentColor}`}>
                      &ldquo;{cs.quote}&rdquo;
                    </p>
                    <footer className="text-xs text-gray-500 mt-1">
                      {cs.quoteAuthor}
                    </footer>
                  </blockquote>

                  <Link
                    href={`/pripadovky/${cs.slug}` as `/${string}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors group"
                  >
                    Číst celou případovku
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* CTA */}
        <FadeIn delay={0.4}>
          <div className="mt-16 bg-primary rounded-2xl p-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">
              Chcete být dalším příběhem úspěchu?
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Spusťte první pulse za 15 minut. Nebo si zarezervujte 30min demo
              — ukážeme vám, co Behavera může odhalit ve vašem týmu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
              >
                Spustit zdarma
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors"
              >
                Demo zdarma
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
