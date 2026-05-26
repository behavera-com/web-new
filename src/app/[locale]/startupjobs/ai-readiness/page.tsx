import { notFound } from "next/navigation";
import BrandHeader from "@/components/ai-readiness/layout/BrandHeader";
import TopUtilityBar from "@/components/ai-readiness/layout/TopUtilityBar";
import BrandFooter from "@/components/ai-readiness/layout/BrandFooter";
import MobileStickyCta from "@/components/ai-readiness/layout/MobileStickyCta";
import FloatingRepCta from "@/components/ai-readiness/layout/FloatingRepCta";
import { consultRep } from "@/components/ai-readiness/sections/rep-data";
import ScrollEffects from "@/components/ai-readiness/layout/ScrollEffects";
import AnalyticsBridge from "@/components/ai-readiness/layout/AnalyticsBridge";
import AmbientLayer from "@/components/ai-readiness/layout/AmbientLayer";
import Hero from "@/components/ai-readiness/sections/Hero";
import CoBrandBlock from "@/components/ai-readiness/sections/CoBrandBlock";
import PainSection from "@/components/ai-readiness/sections/PainSection";
import FivePhaseTriptych from "@/components/ai-readiness/sections/FivePhaseTriptych";
import ProductDemo from "@/components/ai-readiness/sections/ProductDemo";
import SolutionSection from "@/components/ai-readiness/sections/SolutionSection";
import ManifestoBreak from "@/components/ai-readiness/sections/ManifestoBreak";
import PilotBlock from "@/components/ai-readiness/sections/PilotBlock";
import ProcessSection from "@/components/ai-readiness/sections/ProcessSection";
import FaqSection from "@/components/ai-readiness/sections/FaqSection";
import OutcomeStrip from "@/components/ai-readiness/sections/OutcomeStrip";
import FinalCta from "@/components/ai-readiness/sections/FinalCta";

const BASE_URL = "https://www.behavera.com";
const PHONE = "+420 605 839 456";
const EMAIL = "hello@behavera.com";
const PATH = "/startupjobs/ai-readiness";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "cs") {
    return { robots: { index: false, follow: false } };
  }
  const title =
    "Behavera + StartupJobs — AI transformace neselhává kvůli technologii. Selhává kvůli adopci.";
  const description =
    "Změřte AI připravenost, adopci a confidence napříč týmy — dřív, než utratíte další korunu za licence. Operational intelligence pro lidskou stranu AI rolloutu.";
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
    },
    twitter: { title, description, card: "summary_large_image" },
  };
}

export default async function AiReadinessPage({
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
      <main
        id="top"
        className="pt-[112px] md:pt-[148px] pb-[88px] md:pb-0 scroll-pt-[120px] md:scroll-pt-[156px]"
      >
        <Hero />
        <CoBrandBlock />
        <PainSection />
        <FivePhaseTriptych />
        <ProductDemo />
        <SolutionSection />
        <ManifestoBreak />
        <PilotBlock />
        <ProcessSection />
        <FaqSection />
        <OutcomeStrip />
        <FinalCta />
      </main>
      <BrandFooter phone={PHONE} email={EMAIL} />
      <MobileStickyCta />
      <FloatingRepCta />
      <ScrollEffects />
      <AnalyticsBridge />
    </div>
  );
}
