import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import type { Viewport } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";

import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: "%s | Behavera",
      default: t("title"),
    },
    description: t("description"),
    openGraph: {
      siteName: "Behavera",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "Behavera — AI platforma pro employee engagement",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@behavera",
    },
    alternates: {
      canonical: locale === "cs" ? BASE_URL : `${BASE_URL}/en`,
      languages: {
        cs: BASE_URL,
        en: `${BASE_URL}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "cs" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Behavera",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 400,
      height: 80,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+420-724-256-447",
      contactType: "sales",
      email: "hello@behavera.com",
      availableLanguage: ["Czech", "Slovak", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Křižíkova 148/34",
      addressLocality: "Praha 8",
      postalCode: "186 00",
      addressCountry: "CZ",
    },
    sameAs: [
      "https://www.linkedin.com/company/behavera",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Behavera",
    url: BASE_URL,
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Behavera",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: BASE_URL,
    offers: {
      "@type": "Offer",
      priceCurrency: "CZK",
      price: "99",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "99",
        priceCurrency: "CZK",
        unitText: "per employee per month",
      },
    },
    description:
      "AI platforma pro employee engagement a people analytics. Měří spokojenost zaměstnanců, odhalí rizika odchodů a výkon týmů.",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
