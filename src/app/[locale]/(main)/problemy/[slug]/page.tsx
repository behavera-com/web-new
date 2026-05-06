import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Shield,
  Send,
  MessageSquare,
  BarChart3,
  Users,
  Quote,
  X,
  Play,
  AlertTriangle,
  Clock,
} from "lucide-react";

const validSlugs = [
  "fluktuace",
  "manazeri",
  "vykon-tymu",
  "chybne-nabory",
  "rust-firmy",
  "novy-ceo",
] as const;

type Slug = (typeof validSlugs)[number];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  if (!validSlugs.includes(slug as Slug)) return {};
  const t = await getTranslations({ locale, namespace: `problemPages.${slug}` });
  const path = `/problemy/${slug}`;
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = t("title");
  const description = t("subtitle");
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
      type: "article",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: { title, description, images: ["/og-default.jpg"] },
  };
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  if (!validSlugs.includes(slug as Slug)) {
    notFound();
  }

  const t = await getTranslations(`problemPages.${slug}`);
  const tc = await getTranslations("problemPages");

  const dataItems = t.raw("data.items") as Array<{
    stat: string;
    text: string;
  }>;
  const steps = t.raw("solution.steps") as Array<{
    title: string;
    text: string;
  }>;
  const alternatives = t.raw("alternatives.items") as Array<{
    method: string;
    problem: string;
  }>;
  const testimonials = t.raw("testimonials") as Array<{
    quote: string;
    author: string;
    company: string;
  }>;

  const dataColors = ["text-danger", "text-coral", "text-accent"];
  const stepIcons = [Send, MessageSquare, BarChart3];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {tc("back")}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {t("title")}
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href="https://app.behavera.com/echo-pulse/try"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
                >
                  {tc("ctaPrimary")}
                </a>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base"
                >
                  {tc("ctaSecondary")}
                </Link>
              </div>
              <p className="text-sm text-gray-400">{tc("ctaTrust")}</p>
            </div>

            {/* Hero stat card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 sm:p-10 text-center max-w-sm w-full">
                <p className="text-5xl sm:text-6xl font-bold text-accent mb-3">
                  {t("hero_stat")}
                </p>
                <p className="text-sm text-gray-300">{t("hero_stat_label")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DATA ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            {tc("dataLabel")}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            {t("data.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
            {dataItems.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
              >
                <p className={`text-4xl font-bold mb-3 ${dataColors[i]}`}>
                  {item.stat}
                </p>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY ALTERNATIVES FAIL ─── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            {tc("alternativesLabel")}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            {t("alternatives.title")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {alternatives.map((alt, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-200"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <X className="h-5 w-5 text-danger" />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm mb-1">
                    {alt.method}
                  </p>
                  <p className="text-sm text-gray-500">{alt.problem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            {tc("solutionLabel")}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            {t("solution.title")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i}>
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.text}</p>
                </div>
              );
            })}
          </div>

          {/* Mid-section CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href="https://app.behavera.com/echo-pulse/try"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
            >
              {tc("ctaPrimary")}
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-300 transition-colors text-base"
            >
              {tc("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            {tc("dashboardLabel")}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
            {tc("dashboardTitle")}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {tc("dashboardSubtitle")}
          </p>

          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 max-w-4xl">
            <Image
              src="https://www.behavera.com/assets/hero-dashboard-cz-Bkd5AaTw.webp"
              alt="Behavera Dashboard"
              width={1200}
              height={750}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ─── VIDEO ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            {tc("videoLabel")}
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
            {tc("videoTitle")}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            {tc("videoSubtitle")}
          </p>

          <div className="relative max-w-4xl rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-900 aspect-video">
            <video
              controls
              preload="none"
              poster="https://www.behavera.com/dashboard-demo-poster.webp"
              className="w-full h-full object-cover"
            >
              <source
                src="https://www.behavera.com/dashboard-demo.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* ─── URGENCY ─── */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-danger/20 text-danger text-xs font-bold mb-6">
              <AlertTriangle className="h-3.5 w-3.5" />
              {tc("urgencyLabel")}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t("urgency.title")}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("urgency.text")}
            </p>

            <div className="inline-flex items-baseline gap-3 bg-white/10 rounded-2xl px-8 py-5 mb-8">
              <span className="text-4xl font-bold text-accent">
                {t("urgency.stat")}
              </span>
              <span className="text-sm text-gray-300 max-w-xs text-left">
                {t("urgency.statLabel")}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
              >
                {tc("ctaPrimary")}
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base"
              >
                {tc("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
              >
                <Quote className="h-6 w-6 text-accent/30 mb-3" />
                <p className="text-gray-700 italic mb-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {item.author}
                  </p>
                  <p className="text-xs text-gray-500">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDY ─── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-6">
            {tc("caseStudyLabel")}
          </p>

          <div className="max-w-3xl bg-white rounded-2xl p-6 lg:p-10 border border-gray-200">
            <Quote className="h-8 w-8 text-accent/30 mb-4" />
            <p className="text-lg text-gray-700 italic mb-6">
              &ldquo;{t("caseStudy.quote")}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-bold text-primary">
                  {t("caseStudy.company")}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {t("caseStudy.size")}
                </p>
              </div>
              <div className="px-4 py-2 bg-accent/10 rounded-xl">
                <p className="text-lg font-bold text-accent">
                  {t("caseStudy.metric")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t("title")}
            </h2>
            <p className="text-gray-300 mb-8">{t("subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
              >
                {tc("ctaPrimary")}
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base"
              >
                {tc("ctaSecondary")}
              </Link>
            </div>
            <p className="text-sm text-gray-400">{tc("ctaTrust")}</p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["GDPR", "AES-256", "Data v EU", "ISO 27001"].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 text-xs text-gray-400"
                >
                  <Shield className="h-3.5 w-3.5 text-accent" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
