import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Shield, Lock, Server, Eye, Key, Trash2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "security" });
  return { title: t("seoTitle") };
}

const sectionIcons = [Lock, Shield, Eye, Server, Key, Trash2];

export default function SecurityPage() {
  const t = useTranslations("security");
  const badges = t.raw("badges") as string[];
  const sections = t.raw("sections") as Array<{
    title: string;
    text: string;
  }>;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-4">{t("title")}</h1>
        <p className="text-lg text-gray-600 mb-8">{t("subtitle")}</p>

        <div className="flex flex-wrap gap-2 mb-12">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
            >
              <Shield className="h-3.5 w-3.5" />
              {badge}
            </span>
          ))}
        </div>

        <div className="grid gap-6">
          {sections.map((section, i) => {
            const Icon = sectionIcons[i] || Shield;
            return (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-primary mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/demo"
            className="inline-flex items-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </div>
  );
}
