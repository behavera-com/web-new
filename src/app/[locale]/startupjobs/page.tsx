import { notFound } from "next/navigation";
import BrandHeader from "@/components/startupjobs/layout/BrandHeader";
import BrandFooter from "@/components/startupjobs/layout/BrandFooter";
import MobileStickyCta from "@/components/startupjobs/layout/MobileStickyCta";
import DesktopStickyCta from "@/components/startupjobs/layout/DesktopStickyCta";
import ScrollEffects from "@/components/startupjobs/layout/ScrollEffects";
import Hero from "@/components/startupjobs/sections/Hero";
import TrustStrip from "@/components/startupjobs/sections/TrustStrip";
import PainSection from "@/components/startupjobs/sections/PainSection";
import ManifestoBreak from "@/components/startupjobs/sections/ManifestoBreak";
import SolutionSection from "@/components/startupjobs/sections/SolutionSection";
import ProcessSection from "@/components/startupjobs/sections/ProcessSection";
import CaseStudies from "@/components/startupjobs/sections/CaseStudies";
import CoBrandBlock from "@/components/startupjobs/sections/CoBrandBlock";
import TrustVelocityLine from "@/components/startupjobs/sections/TrustVelocityLine";
import ReportSection from "@/components/startupjobs/sections/ReportSection";
import FaqSection from "@/components/startupjobs/sections/FaqSection";
import FinalCta from "@/components/startupjobs/sections/FinalCta";

const BASE_URL = "https://www.behavera.com";
// Set when real number is available; empty string hides all phone CTAs.
const PHONE = "";
const EMAIL = "kontakt@behavera.com";
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
      <BrandHeader phone={PHONE} email={EMAIL} />
      <main id="top" className="pt-[68px]">
        <Hero />
        <TrustStrip />
        <PainSection />
        <ManifestoBreak />
        <SolutionSection />
        <ProcessSection />
        <CaseStudies />
        <CoBrandBlock />
        <TrustVelocityLine />
        <ReportSection />
        <FaqSection />
        <FinalCta />
      </main>
      <BrandFooter phone={PHONE} email={EMAIL} />
      <MobileStickyCta phone={PHONE} email={EMAIL} />
      <DesktopStickyCta />
      <ScrollEffects />
    </div>
  );
}
