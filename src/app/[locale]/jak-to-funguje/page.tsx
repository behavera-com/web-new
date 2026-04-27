import { getTranslations } from "next-intl/server";
import { Send, MessageSquare, BarChart3, Shield, Zap, Users } from "lucide-react";
import HowItWorks from "@/components/sections/HowItWorks";
import Topics from "@/components/sections/Topics";
import Integrations from "@/components/sections/Integrations";
import FadeIn from "@/components/ui/FadeIn";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const path = "/jak-to-funguje";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = "Od otázky po akční plán za 48 hodin";
  const description =
    "Zjistěte, jak Behavera funguje — od nahrání týmu po první data za 48 hodin. AI chat, 2 minuty, 80 %+ návratnost. Bez složitého setupu.";
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

const guarantees = [
  {
    icon: Zap,
    title: "15 minut setup",
    text: "Nahrajte seznam lidí, zvolte kanál distribuce. Hotovo. Žádná IT oddělení, žádné integrace.",
  },
  {
    icon: Users,
    title: "80 %+ návratnost",
    text: "AI chat místo nudného formuláře. Lidi to baví. Proto odpovídají — opakovaně, každý měsíc.",
  },
  {
    icon: BarChart3,
    title: "Data do 48 hodin",
    text: "Dashboard se výsledky a doporučeními. AI řekne co řešit a proč. Žádný Excel, žádné tabulky.",
  },
  {
    icon: Shield,
    title: "100% anonymita",
    text: "Nikdo nepřiřadí odpověď k člověku. Proto lidé odpovídají upřímně — i o věcech, o kterých by jinak mlčeli.",
  },
  {
    icon: Send,
    title: "Funguje přes kanály, které znáte",
    text: "Email, Slack, WhatsApp, MS Teams nebo přímý odkaz. Žádná nová aplikace pro zaměstnance.",
  },
  {
    icon: MessageSquare,
    title: "Opakujte každý měsíc",
    text: "Pulse survey je nejsilnější jako trend. Behavera automaticky rozesílá a sbírá — vy jen čtete výsledky.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
            Jak to funguje
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Od otázky po akční plán za 48 hodin.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Žádné IT projekty. Žádné školení. 15 minut setup, první data do 2
            dnů.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="https://app.behavera.com/echo-pulse/try"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              Spustit zdarma
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors"
            >
              Chci demo
            </a>
          </div>
        </div>
      </div>

      {/* 3 Steps */}
      <HowItWorks />

      {/* 6 guarantees grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">
                Proč to funguje tam, kde jiné nástroje selhávají
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guarantees.map((item, i) => {
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

      {/* What we measure */}
      <Topics />

      {/* Integrations */}
      <Integrations />

      {/* Bottom CTA */}
      <div className="bg-primary py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Připraveni začít?
          </h2>
          <p className="text-gray-300 mb-8">
            Spusťte první pulse za 15 minut. Nebo se nám ozvěte — ukážeme vám
            vše živě.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://app.behavera.com/echo-pulse/try"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              Spustit zdarma
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors"
            >
              Rezervovat demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
