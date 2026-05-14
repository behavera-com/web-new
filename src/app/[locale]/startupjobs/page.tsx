import { notFound } from "next/navigation";
import BrandHeader from "@/components/startupjobs/layout/BrandHeader";
import TopUtilityBar from "@/components/startupjobs/layout/TopUtilityBar";
import BrandFooter from "@/components/startupjobs/layout/BrandFooter";
import MobileStickyCta from "@/components/startupjobs/layout/MobileStickyCta";
import FloatingRepCta from "@/components/startupjobs/layout/FloatingRepCta";
import { consultRep } from "@/components/startupjobs/sections/rep-data";
import ScrollEffects from "@/components/startupjobs/layout/ScrollEffects";
import AmbientLayer from "@/components/startupjobs/layout/AmbientLayer";
import Hero from "@/components/startupjobs/sections/Hero";
import PainSection from "@/components/startupjobs/sections/PainSection";
import ManifestoBreak from "@/components/startupjobs/sections/ManifestoBreak";
import SolutionSection from "@/components/startupjobs/sections/SolutionSection";
import CaseStudies from "@/components/startupjobs/sections/CaseStudies";
import CoBrandBlock from "@/components/startupjobs/sections/CoBrandBlock";
import ProcessSection from "@/components/startupjobs/sections/ProcessSection";
import ReportPreview from "@/components/startupjobs/sections/ReportPreview";
import ProductTriptych from "@/components/startupjobs/sections/ProductTriptych";
import ProductDemo from "@/components/startupjobs/sections/ProductDemo";
import FaqSection from "@/components/startupjobs/sections/FaqSection";
import OutcomeStrip from "@/components/startupjobs/sections/OutcomeStrip";
import FinalCta from "@/components/startupjobs/sections/FinalCta";

const BASE_URL = "https://www.behavera.com";
const PHONE = "+420 605 839 456";
const EMAIL = "hello@behavera.com";
const PATH = "/startupjobs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "cs") {
    return { robots: { index: false, follow: false } };
  }
  const title = "Behavera × StartupJobs — Nabírejte rychleji, nabírejte správně";
  const description =
    "Datová vrstva nad vaším náborem. Méně dní v procesu, méně chyb v rozhodnutí, lepší KPI v reportingu vedení.";
  const url = `${BASE_URL}${PATH}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { cs: url, "x-default": url },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "Behavera × StartupJobs",
        },
      ],
    },
    twitter: { title, description, images: ["/og-default.jpg"] },
  };
}

export default async function StartupJobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "cs") notFound();

  return (
    <div className="sj-body sj-scope" style={{ background: "var(--color-paper)" }}>
      <div className="sj-progress-bar" aria-hidden />
      <AmbientLayer />
      <TopUtilityBar phone={PHONE} email={EMAIL} />
      <BrandHeader phone={PHONE} email={EMAIL} rep={consultRep} />
      <main id="top" className="pt-[112px] md:pt-[148px] pb-[88px] md:pb-0 scroll-pt-[120px] md:scroll-pt-[156px]">
        <Hero />
        <CoBrandBlock />
        <PainSection />
        <ProductTriptych />
        <ProductDemo />
        <ReportPreview />
        <SolutionSection />
        <ManifestoBreak />
        <CaseStudies />
        <ProcessSection />
        <FaqSection />
        <OutcomeStrip />
        <FinalCta />
      </main>
      <BrandFooter phone={PHONE} email={EMAIL} />
      <MobileStickyCta />
      <FloatingRepCta />
      <ScrollEffects />
    </div>
  );
}
