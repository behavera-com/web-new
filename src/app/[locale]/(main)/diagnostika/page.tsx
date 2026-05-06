import { getTranslations } from "next-intl/server";
import ScannerApp from "./ScannerApp";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.diagnostika" });
  const path = "/diagnostika";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        cs: `${BASE_URL}${path}`,
        en: `${BASE_URL}/en${path}`,
        "x-default": `${BASE_URL}${path}`,
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      type: "website",
      images: [{ url: "/og-diagnostika.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/og-diagnostika.jpg"],
    },
  };
}

export default function DiagnostikaPage() {
  return <ScannerApp />;
}
