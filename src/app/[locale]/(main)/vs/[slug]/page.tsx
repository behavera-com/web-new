import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { CheckCircle, XCircle, ArrowRight, Shield } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const BASE_URL = "https://www.behavera.com";

type Feature = {
  name: string;
  behavera: string | boolean;
  competitor: string | boolean;
  highlight?: boolean;
};

type Competitor = {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  features: Feature[];
  whenBehavera: string[];
  whenCompetitor: string[];
  summary: string;
};

const competitors: Record<string, Competitor> = {
  "google-forms": {
    name: "Google Forms",
    tagline: "vs. Google Forms",
    headline: "Behavera vs. Google Forms",
    subheadline:
      "Google Forms je zdarma — ale co vás stojí čas analýzy, nízká návratnost a chybějící doporučení?",
    features: [
      { name: "Cena", behavera: "Od 99 Kč/osoba/měsíc", competitor: "Zdarma", highlight: false },
      { name: "Návratnost odpovědí", behavera: "80 %+", competitor: "20–35 %", highlight: true },
      { name: "AI analýza dat", behavera: true, competitor: false, highlight: true },
      { name: "Doporučení k akci", behavera: true, competitor: false, highlight: true },
      { name: "Anonymita (ověřená)", behavera: true, competitor: false, highlight: true },
      { name: "Opakované surveye (automaticky)", behavera: true, competitor: false },
      { name: "Dashboard pro manažery", behavera: true, competitor: false },
      { name: "Distribuce přes Slack / Teams", behavera: true, competitor: false },
      { name: "Otázky validované psychology", behavera: true, competitor: false },
      { name: "Benchmarky pro CZ/SK trh", behavera: true, competitor: false },
      { name: "GDPR / data v EU", behavera: true, competitor: "Částečně (záleží na nastavení)" },
      { name: "Čas na setup", behavera: "15 minut", competitor: "1–3 hodiny (design + analýza)" },
      { name: "Čas na analýzu výsledků", behavera: "0 (AI to udělá za vás)", competitor: "4–8 hodin (Excel)" },
    ],
    whenBehavera: [
      "Chcete výsledky, ne data — AI řekne co řešit a proč",
      "Potřebujete 80 %+ návratnost — ne 25 % z formuláře",
      "Chcete opakovat každý měsíc bez ručního zpracování",
      "Anonymita je pro vás klíčová (zaměstnanci musí věřit)",
      "Máte tým 20+ lidí a potřebujete srovnání po odděleních",
    ],
    whenCompetitor: [
      "Máte do 10 lidí a nepotřebujete trendy ani benchmark",
      "Jde vám o jednorázový sběr dat (výjezdní akce, event)",
      "Nemáte budget ani na nejlevnější tier",
    ],
    summary:
      "Google Forms je skvělý nástroj pro jednoduché sběry dat. Pro pravidelné měření engagementu s akcemi, automatizací a skutečnou anonymitou je Behavera jiná liga.",
  },
  "microsoft-viva": {
    name: "Microsoft Viva Pulse / Glint",
    tagline: "vs. Microsoft Viva Pulse",
    headline: "Behavera vs. Microsoft Viva Pulse",
    subheadline:
      "Viva Pulse je součástí M365 — ale jde o skutečně použitelný insight, nebo jen další Microsoft nástroj ve vašem stacku?",
    features: [
      { name: "Cena", behavera: "Od 99 Kč/osoba/měsíc", competitor: "Součást M365 E3/E5 nebo extra licence" },
      { name: "Návratnost odpovědí", behavera: "80 %+", competitor: "40–60 %", highlight: true },
      { name: "AI analýza dat", behavera: true, competitor: "Omezená (Copilot nutný)", highlight: true },
      { name: "Doporučení k akci", behavera: true, competitor: "Částečně (obecná)", highlight: true },
      { name: "Distribuce bez MS ekosystému", behavera: true, competitor: false, highlight: true },
      { name: "Funguje bez Teams", behavera: true, competitor: false },
      { name: "Setup bez IT oddělení", behavera: true, competitor: false },
      { name: "Benchmarky pro CZ/SK trh", behavera: true, competitor: false, highlight: true },
      { name: "Onboarding za 15 minut", behavera: true, competitor: false },
      { name: "Data v EU (garantovaně)", behavera: true, competitor: "Záleží na smlouvě s MS" },
      { name: "Integrace s M365", behavera: "Částečně", competitor: true },
      { name: "Organizační hierarchie z AD", behavera: false, competitor: true },
    ],
    whenBehavera: [
      "Nechcete čekat na IT projekt a potřebujete výsledky do 48 hodin",
      "Vaši zaměstnanci nepoužívají Teams denně (výroba, terén)",
      "Potřebujete CZ/SK benchmarky a lokální kontext",
      "Chcete konkrétní doporučení co dělat — ne jen data",
      "Nemáte M365 E3/E5 nebo nechcete platit za Copilot",
    ],
    whenCompetitor: [
      "Máte M365 a Copilot a chcete vše v jednom ekosystému",
      "Potřebujete napojení na Azure AD pro org. strukturu",
      "IT oddělení preferuje jednoho vendora",
    ],
    summary:
      "Microsoft Viva Pulse dává smysl jako součást plného M365 ekosystému. Pokud hledáte rychlý insight s vysokou návratností a konkrétními doporučeními bez závislosti na Microsoft stacku, je Behavera lepší volba.",
  },
  workleap: {
    name: "Workleap / Officevibe",
    tagline: "vs. Workleap (Officevibe)",
    headline: "Behavera vs. Workleap (Officevibe)",
    subheadline:
      "Workleap je established HR tech produkt. Kde se liší od Behavera — a kdy je která volba správná?",
    features: [
      { name: "Cena", behavera: "Od 99 Kč/osoba/měsíc (~€4)", competitor: "€5+ /osoba/měsíc", highlight: false },
      { name: "Návratnost odpovědí", behavera: "80 %+", competitor: "60–75 %", highlight: true },
      { name: "AI chat (konverzace)", behavera: true, competitor: false, highlight: true },
      { name: "Doporučení k akci (AI)", behavera: true, competitor: "Omezená", highlight: true },
      { name: "CZ/SK benchmark data", behavera: true, competitor: false, highlight: true },
      { name: "Setup za 15 minut", behavera: true, competitor: "30–60 minut" },
      { name: "WhatsApp distribuce", behavera: true, competitor: false },
      { name: "Dashboard pro tým CEO/HR/Manažer", behavera: true, competitor: true },
      { name: "1:1 meeting notes integrace", behavera: false, competitor: true },
      { name: "Goal tracking", behavera: false, competitor: true },
      { name: "Recognition (ocenění)", behavera: false, competitor: true },
      { name: "Podpora v češtině", behavera: true, competitor: false },
      { name: "Lokální onboarding tým", behavera: true, competitor: false },
    ],
    whenBehavera: [
      "Potřebujete CZ/SK benchmarky — ne globální průměry",
      "Chcete AI chat místo tradičního formuláře (vyšší návratnost)",
      "Potřebujete oslovit výrobu nebo terénní pracovníky přes WhatsApp",
      "Chcete lokálního partnera s podporou v češtině",
      "Hledáte nižší cenu za zachování kvality insights",
    ],
    whenCompetitor: [
      "Potřebujete komplexní HR platform (1:1 notes, goals, recognition)",
      "Máte tým v EN prostředí a globální benchmarky jsou pro vás klíčové",
      "Chcete integraci s Rippling, BambooHR nebo ADP",
    ],
    summary:
      "Workleap je solidní volba pro anglicky hovořící trhy s potřebou kompletní HR platformy. Behavera vyhrává u CZ/SK firem, kde záleží na lokalitě, vyšší návratnosti a konkrétních doporučeních bez komplexnosti.",
  },
  peakon: {
    name: "Peakon (Workday)",
    tagline: "vs. Peakon (Workday)",
    headline: "Behavera vs. Peakon",
    subheadline:
      "Peakon je enterprise řešení od Workday. Má smysl pro střední a malé CZ firmy — nebo je to přestřelené?",
    features: [
      { name: "Cena", behavera: "Od 99 Kč/osoba/měsíc", competitor: "Enterprise pricing (od ~€8+)", highlight: false },
      { name: "Implementace", behavera: "15 minut, self-serve", competitor: "Týdny, s konzultantem", highlight: true },
      { name: "Minimální počet zaměstnanců", behavera: "5+", competitor: "Obvykle 200+", highlight: true },
      { name: "Návratnost odpovědí", behavera: "80 %+", competitor: "60–70 %" },
      { name: "CZ/SK benchmark data", behavera: true, competitor: false, highlight: true },
      { name: "Podpora v češtině", behavera: true, competitor: false },
      { name: "Integrace s Workday HRIS", behavera: false, competitor: true },
      { name: "Advanced predictive analytics", behavera: "Základní", competitor: true },
      { name: "Org. hierarchie z HRIS", behavera: false, competitor: true },
      { name: "Enterprise SSO / SCIM", behavera: false, competitor: true },
      { name: "AI doporučení", behavera: true, competitor: true },
      { name: "Lokální onboarding", behavera: true, competitor: false },
    ],
    whenBehavera: [
      "Máte do 500 lidí a nechcete měsíce implementace",
      "Hledáte rychlé výsledky bez enterprise smlouvy",
      "CZ/SK benchmarky jsou pro vás důležité",
      "Nemáte Workday HRIS a nepotřebujete napojení",
      "Chcete lokálního partnera s podporou v češtině",
    ],
    whenCompetitor: [
      "Máte 1 000+ zaměstnanců a potřebujete enterprise compliance",
      "Používáte Workday a chcete nativní integraci",
      "Potřebujete advanced prediktivní modely a org. design analytics",
    ],
    summary:
      "Peakon je skvělý pro globální enterprise firmy se Workday ekosystémem. Pro CZ/SK firmy do 500 lidí, které chtějí výsledky rychle a bez enterprise projektu, je Behavera správná volba.",
  },
};

export async function generateStaticParams() {
  return Object.keys(competitors).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const comp = competitors[slug];
  if (!comp) return {};
  const path = `/vs/${slug}`;
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = `${comp.headline} — srovnání 2025`;
  return {
    title,
    description: comp.subheadline,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description: comp.subheadline, url: canonicalUrl, type: "website" },
  };
}

export default async function VsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const comp = competitors[slug];
  if (!comp) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
            Srovnání
          </p>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            {comp.headline}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {comp.subheadline}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Objektivní srovnání · Aktualizováno 2025
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Comparison table */}
        <FadeIn>
          <h2 className="text-2xl font-bold text-primary mb-8">
            Přehled funkcí
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 border border-gray-200 font-semibold text-gray-600 text-sm w-1/2">
                    Funkce
                  </th>
                  <th className="p-4 bg-accent/10 border border-gray-200 font-bold text-primary text-sm text-center">
                    Behavera
                  </th>
                  <th className="p-4 bg-gray-50 border border-gray-200 font-semibold text-gray-500 text-sm text-center">
                    {comp.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comp.features.map((feature, i) => (
                  <tr
                    key={i}
                    className={feature.highlight ? "bg-accent/5" : ""}
                  >
                    <td className="p-4 border border-gray-200 text-sm text-gray-700">
                      {feature.name}
                      {feature.highlight && (
                        <span className="ml-2 text-xs text-accent font-semibold">
                          ← klíčový rozdíl
                        </span>
                      )}
                    </td>
                    <td className="p-4 border border-gray-200 text-center">
                      {typeof feature.behavera === "boolean" ? (
                        feature.behavera ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-primary">
                          {feature.behavera}
                        </span>
                      )}
                    </td>
                    <td className="p-4 border border-gray-200 text-center">
                      {typeof feature.competitor === "boolean" ? (
                        feature.competitor ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">
                          {feature.competitor}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* When to choose */}
        <FadeIn delay={0.15}>
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            <div className="bg-accent/5 rounded-2xl p-6 border border-accent/20">
              <h3 className="font-bold text-primary mb-4">
                Vyberte Behavera, pokud…
              </h3>
              <ul className="space-y-2">
                {comp.whenBehavera.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-primary mb-4">
                Vyberte {comp.name}, pokud…
              </h3>
              <ul className="space-y-2">
                {comp.whenCompetitor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* Summary */}
        <FadeIn delay={0.2}>
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="font-bold text-primary mb-2">Závěr</h3>
            <p className="text-gray-600 leading-relaxed">{comp.summary}</p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-12 bg-primary rounded-2xl p-10 text-center text-white">
            <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs text-gray-300">
              {["GDPR compliant", "Data v EU", "ISO 27001"].map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-accent" />
                  {b}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Vyzkoušejte Behavera sami
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              15 minut setup. První data do 48 hodin. Bez karty, bez závazků.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
              >
                Spustit zdarma
                <ArrowRight className="h-4 w-4 ml-2" />
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

        {/* Other comparisons */}
        <FadeIn delay={0.4}>
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400 mb-4">Další srovnání</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(competitors)
                .filter(([s]) => s !== slug)
                .map(([s, c]) => (
                  <Link
                    key={s}
                    href={`/vs/${s}` as `/${string}`}
                    className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:text-primary hover:border-primary transition-colors"
                  >
                    Behavera vs. {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
