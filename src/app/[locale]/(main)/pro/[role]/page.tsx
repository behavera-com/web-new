import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import {
  ArrowLeft,
  Shield,
  Quote,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";

const validRoles = ["ceo", "hr", "manazer", "team-lead"] as const;
type Role = (typeof validRoles)[number];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Shield,
  MessageSquare,
  Target,
  Users,
};

export function generateStaticParams() {
  return validRoles.map((role) => ({ role }));
}

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string; locale: string }>;
}) {
  const { role, locale } = await params;
  if (!validRoles.includes(role as Role)) return {};
  const t = await getTranslations({ locale, namespace: `personas.${role}` });
  const path = `/pro/${role}`;
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
      type: "website",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: { title, description, images: ["/og-default.jpg"] },
  };
}

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ role: string; locale: string }>;
}) {
  const { role } = await params;

  if (!validRoles.includes(role as Role)) {
    notFound();
  }

  const t = await getTranslations(`personas.${role}`);
  const ts = await getTranslations("personas.shared");

  const problems = t.raw("problems") as Array<{
    stat: string;
    text: string;
  }>;
  const features = t.raw("features") as Array<{
    icon: string;
    title: string;
    text: string;
  }>;
  const testimonial = t.raw("testimonial") as {
    quote: string;
    author: string;
    role: string;
  };

  const statColors = ["text-danger", "text-coral", "text-accent"];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {ts("back")}
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
                    {ts("ctaPrimary")}
                  </a>
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base"
                  >
                    {ts("ctaSecondary")}
                  </Link>
                </div>
                <p className="text-sm text-gray-400">{ts("ctaTrust")}</p>
              </div>

              {/* Hero stat card — first problem stat as highlight */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 sm:p-10 text-center max-w-sm w-full">
                  <p className="text-5xl sm:text-6xl font-bold text-accent mb-3">
                    {problems[0].stat}
                  </p>
                  <p className="text-sm text-gray-300">{problems[0].text}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── PROBLEMS ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {ts("problemsLabel")}
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
              {t("title")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {problems.slice(1).map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                  <p
                    className={`text-4xl font-bold mb-3 ${statColors[i + 1]}`}
                  >
                    {item.stat}
                  </p>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SOLUTION / FEATURES ─── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {ts("solutionLabel")}
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
              {t("subtitle")}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
              {features.map((feature, i) => {
                const Icon = iconMap[feature.icon] || BarChart3;
                return (
                  <div key={i}>
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.text}</p>
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
                {ts("ctaPrimary")}
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-300 transition-colors text-base"
              >
                {ts("ctaSecondary")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {ts("dashboardLabel")}
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
              {t("dashboardTitle")}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              {t("dashboardText")}
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
          </FadeIn>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-6">
              {ts("testimonialLabel")}
            </p>

            <div className="max-w-3xl bg-white rounded-2xl p-6 lg:p-10 border border-gray-200">
              <Quote className="h-8 w-8 text-accent/30 mb-4" />
              <p className="text-lg text-gray-700 italic mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="font-bold text-primary">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-gray-300 mb-8">{t("ctaText")}</p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <a
                  href="https://app.behavera.com/echo-pulse/try"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
                >
                  {ts("ctaPrimary")}
                </a>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base"
                >
                  {ts("ctaSecondary")}
                </Link>
              </div>
              <p className="text-sm text-gray-400">{ts("ctaTrust")}</p>

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
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
