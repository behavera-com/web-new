import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import Testimonials from "@/components/sections/Testimonials";
import Problems from "@/components/sections/Problems";
import Costs from "@/components/sections/Costs";
import HowItWorks from "@/components/sections/HowItWorks";
import Topics from "@/components/sections/Topics";
import Roles from "@/components/sections/Roles";
import DashboardPreview from "@/components/sections/DashboardPreview";
import Integrations from "@/components/sections/Integrations";
import Comparison from "@/components/sections/Comparison";
import CaseStudies from "@/components/sections/CaseStudies";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import LeadCapture from "@/components/sections/LeadCapture";
import FinalCTA from "@/components/sections/FinalCTA";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const canonicalUrl = locale === "cs" ? BASE_URL : `${BASE_URL}/en`;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        cs: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
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
      title: t("title"),
      description: t("description"),
      images: ["/og-default.jpg"],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Problems />
      <Costs />
      <HowItWorks />
      <Topics />
      <Testimonials />
      <Roles />
      <DashboardPreview />
      <Integrations />
      <Comparison />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <LeadCapture />
      <FinalCTA />
    </>
  );
}
