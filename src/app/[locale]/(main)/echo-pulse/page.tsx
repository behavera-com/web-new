import { Shield, MessageSquare, BarChart3, Zap, TrendingDown, Users, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const path = "/echo-pulse";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = "Echo Pulse — zjistěte co se reálně děje ve vašem týmu";
  const description =
    "AI pulse survey, který odhalí skryté problémy ve firmě dřív, než přijde výpověď. 2 minuty pro zaměstnance, 80 %+ návratnost, výsledky do 48 hodin.";
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
    openGraph: { title, description, url: canonicalUrl, type: "website" },
  };
}

const steps = [
  {
    number: "01",
    title: "Pozvěte svůj tým",
    text: "Nahrajte seznam lidí (Excel, copy-paste) nebo napojte Slack / MS Teams. 15 minut, žádné IT.",
  },
  {
    number: "02",
    title: "Lidé vyplní 2min AI chat",
    text: "Místo nudného formuláře — konverzace s AI chatbotem. Otázky od psychologů. 80 %+ lidí dokončí. Opakovaně.",
  },
  {
    number: "03",
    title: "Vy dostanete dashboard s doporučeními",
    text: "Do 48 hodin. AI seřadí priority podle dopadu na byznys. Žádný Excel. Víte co řešit a proč.",
  },
];

const features = [
  {
    icon: MessageSquare,
    title: "AI chat místo formuláře",
    text: "Zaměstnanci odpovídají přes přirozený chat — ne přes dlouhý dotazník. Proto odpovídají upřímně a dokončují.",
  },
  {
    icon: BarChart3,
    title: "Dashboard pro vedení",
    text: "Nálada podle týmů, oddělení, lokality. Varování dřív než přijde výpověď. Doporučení co řešit první.",
  },
  {
    icon: Shield,
    title: "100% anonymita",
    text: "Minimum respondentů pro zobrazení dat. Nikdo nepřiřadí odpověď k člověku. Proto dostanete pravdu.",
  },
  {
    icon: Zap,
    title: "Opakovaně, automaticky",
    text: "Nastavíte frekvenci (týdně, měsíčně) a Behavera rozešle, sbírá a vyhodnotí — bez vaší práce.",
  },
  {
    icon: TrendingDown,
    title: "Detekce rizik",
    text: "Přetížení, napětí, pokles energie — Behavera upozorní dřív, než se symptomy změní v odchody.",
  },
  {
    icon: Users,
    title: "Pro každou roli",
    text: "CEO vidí celkový přehled. HR leader trendy. Manažer svůj tým. Každý dostane relevantní data.",
  },
];

const faqs = [
  {
    q: "Je to anonymní?",
    a: "Ano. Data jsou agregovaná na úrovni týmu. Nikdo nepřiřadí odpověď ke konkrétnímu člověku. Minimum respondentů pro zobrazení výsledků je nastaveno tak, aby anonymita byla vždy zachována.",
  },
  {
    q: "Kolik to stojí zaměstnancovo čas?",
    a: "2 minuty měsíčně. AI chat je rychlý a lidé ho baví — proto dosahujeme 80 %+ návratnosti, zatímco průzkumy v průměru 30 %.",
  },
  {
    q: "Jak rychle dostanu první data?",
    a: "Setup trvá 15 minut. První výsledky máte do 48 hodin od spuštění — jakmile lidé vyplní chat.",
  },
  {
    q: "Funguje to i bez Slacku?",
    a: "Ano. Behavera rozesílá přes email, WhatsApp, MS Teams nebo přímý odkaz. Žádná povinná aplikace.",
  },
  {
    q: "Je to GDPR compliant?",
    a: "Ano. Data jsou uložena v EU, šifrovaná (AES-256), přístup má jen oprávněný tým. Máme DPA ke stažení.",
  },
];

export default function EchoPulsePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
                Vlajkový produkt Behavera
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
                Zjistěte, co se reálně děje ve vašem týmu.
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                AI pulse survey, který odhalí skryté problémy ve firmě dřív, než
                přijde výpověď. 2 minuty pro zaměstnance, 80 %+ návratnost,
                výsledky do 48 hodin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href="https://app.behavera.com/echo-pulse/try"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
                >
                  Spustit pilot zdarma
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors"
                >
                  Demo zdarma
                </a>
              </div>
              <p className="text-xs text-gray-400">
                Bez karty · 15 minut setup · První data do 48 hodin
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-accent" />
                  GDPR compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-accent" />
                  Data v EU
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-accent" />
                  ISO 27001
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <Image
                    src="https://www.behavera.com/assets/hero-dashboard-cz-Bkd5AaTw.webp"
                    alt="Echo Pulse Dashboard"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                {/* Floating stat */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                  <p className="text-2xl font-extrabold text-accent">80 %+</p>
                  <p className="text-xs text-gray-500">návratnost odpovědí</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                  <p className="text-2xl font-extrabold text-primary">48h</p>
                  <p className="text-xs text-gray-500">první výsledky</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <div className="bg-gray-50 border-y border-gray-200 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Používají:{" "}
            <span className="font-semibold text-primary">
              Vodafone CZ · Prusa Research · Expando · 365.bank · Valxon · DHL
              · 40+ dalších firem
            </span>
          </p>
        </div>
      </div>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                Jak to funguje
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                3 kroky. 15 minut. A víte.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="text-5xl font-extrabold text-accent/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                Co dostanete
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                Vše, co potřebujete vědět.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-primary rounded-2xl p-8 lg:p-12 text-white text-center">
              <p className="text-xl lg:text-2xl font-medium italic leading-relaxed mb-6">
                &ldquo;Ušetřili jsme 11 000 € za kvartál a prodeje vzrostly o
                37 %. Za 3 minuty jsme měli jasný obraz zapojení celého týmu.&rdquo;
              </p>
              <p className="text-sm text-gray-300">
                Dominik Hegedus · CEO, Expando
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-primary text-center mb-10">
              Časté otázky
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-primary mb-2 flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    {item.q}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-6">
                    {item.a}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="bg-primary py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Připraveni zjistit, co se děje?
          </h2>
          <p className="text-gray-300 mb-8">
            Spusťte první pulse survey za 15 minut. Bez karty, bez závazků.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://app.behavera.com/echo-pulse/try"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              Spustit pilot zdarma
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors"
            >
              Demo zdarma
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
