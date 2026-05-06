import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, TrendingUp, Users, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const BASE_URL = "https://www.behavera.com";

const cases = {
  expando: {
    company: "Expando",
    segment: "E-Commerce",
    size: "50+ zaměstnanců",
    industry: "E-Commerce",
    headline: "Jak Expando odhalilo skrytý talent a zvýšilo prodeje o 37 %",
    subheadline:
      "CEO hledal způsob, proč část obchodního týmu výrazně převyšuje ostatní — a co s tím dělat.",
    metrics: [
      { label: "Nárůst prodejů", value: "+37 %" },
      { label: "Úspora za kvartál", value: "€11K" },
      { label: "Návratnost odpovědí", value: "84 %" },
    ],
    situation:
      "Expando je rychle rostoucí e-commerce firma. CEO Dominik Hegedus si všiml výrazných rozdílů ve výkonu mezi obchodními týmy — ale nevěděl proč. Standardní review procesy neposkytovaly dostatek dat. Potřeboval odpověď rychle, bez měsíců analýzy.",
    solution:
      "Behavera spustila série pulse surveys zaměřených na motivaci, angažovanost a dynamiku týmů. AI chat oslovil každého zaměstnance přes email — bez nutnosti přihlašování nebo nových nástrojů. Výsledky přišly do 48 hodin.",
    results: [
      "Identifikovány klíčové rozdíly v motivaci a komunikaci mezi týmy",
      "Odhaleni vysoce výkonní jedinci v ne-obchodních rolích",
      "Přeskupení týmů na základě dat vedlo k +37 % nárůstu prodejů",
      "Úspora €11K za kvartál díky snížení fluktuace a lepšímu nasazení lidí",
    ],
    quote:
      "Ušetřili jsme 11 000 € za kvartál a prodeje vzrostly o 37 %. Behavera nám pomohla pochopit, kdo jsou naši nejlepší lidé — a jak je správně nasadit.",
    quoteAuthor: "Dominik Hegedus",
    quoteRole: "CEO, Expando",
    icon: TrendingUp,
    placeholder: false,
  },
  vodafone: {
    company: "Vodafone CZ",
    segment: "Telekomunikace",
    size: "1 500+ zaměstnanců",
    industry: "Telekomunikace",
    headline: "Jak Vodafone CZ snížil fluktuaci o 40 % a zvýšil tržby na hovor o 80 %",
    subheadline:
      "Z dat k akci: jak rychlý insight změnil způsob řízení call centra i výkon prodejních týmů.",
    metrics: [
      { label: "Retence zaměstnanců", value: "+40 %" },
      { label: "Tržby na hovor", value: "+80 %" },
      { label: "Zachycené odchody", value: "3" },
    ],
    situation:
      "Vodafone CZ čelil nadměrné fluktuaci v call centru a klesajícímu výkonu prodejních týmů. Vedení potřebovalo rychle identifikovat příčiny — ne po kvartálním průzkumu, ale v reálném čase. Standardní HR procesy byly příliš pomalé a data nepřesná.",
    solution:
      "Behavera zavedla měsíční pulse surveys pro týmy v call centru i v prodeji. AI chat oslovoval zaměstnance přes MS Teams a email. Dashboard managementu zobrazoval varování o riziku odchodu a poklesu výkonu — na úrovni týmů, ne jednotlivců.",
    results: [
      "Zachyceny 3 připravované odchody klíčových lidí — 2 se podařilo zvrátit",
      "Identifikovány manažerské styly negativně ovlivňující výkon",
      "Retence zaměstnanců vzrostla o 40 % meziročně",
      "Tržby na hovor vzrostly o 80 % po implementaci doporučení",
    ],
    quote:
      "Zachytili jsme 3 připravované odchody. Dva se nám podařilo zvrátit. Behavera nám dala data, která jsme dříve neměli k dispozici.",
    quoteAuthor: "HR Director",
    quoteRole: "Vodafone CZ",
    icon: Users,
    placeholder: false,
  },
  "prusa-research": {
    company: "Prusa Research",
    segment: "Technologie / Výroba",
    size: "1 000+ zaměstnanců",
    industry: "Výroba technologií (3D tisk)",
    headline: "Jak Prusa Research změřila engagement 1 000+ lidí za 3 minuty",
    subheadline:
      "Výroba, kanceláře, různé směny — a přesto 60% zapojení. Bez složitého setup.",
    metrics: [
      { label: "Zapojení ve výrobě", value: "60 %" },
      { label: "Čas na analýzu", value: "3 min" },
      { label: "Návratnost odpovědí", value: "78 %" },
    ],
    situation:
      "Prusa Research je světový lídr ve výrobě 3D tiskáren. S 1 000+ zaměstnanci ve výrobě, kancelářích a různých směnách bylo měření engagementu obrovskou výzvou. Standardní průzkumy zahrnovaly příliš málo lidí a trvaly příliš dlouho.",
    solution:
      "Behavera nasadila pulse survey distribuovanou přes email a přímý odkaz — bez nutnosti přihlašování nebo instalace aplikace. AI chat fungoval na jakémkoliv zařízení, včetně mobilů ve výrobě. Výsledky byly k dispozici do 48 hodin.",
    results: [
      "60% zapojení ve výrobní části firmy — výrazně nad průměrem odvětví",
      "Identifikovány specifické rozdíly v spokojenosti mezi směnami",
      "Management dostal přehled o celé firmě za 3 minuty místo týdnů",
      "Employer branding posílen reálnými daty z interního průzkumu",
    ],
    quote:
      "Za 3 minuty jsme měli jasný obraz zapojení 1 000+ lidí. Dřív nám to trvalo týdny a výsledky stejně nebyly úplné.",
    quoteAuthor: "People & Culture",
    quoteRole: "Prusa Research",
    icon: BarChart3,
    placeholder: false,
  },
  valxon: {
    company: "Valxon",
    segment: "Reklamní předměty",
    size: "30+ zaměstnanců",
    industry: "B2B (reklamní předměty)",
    headline: "Jak Valxon pod novým vedením stabilizoval tým a zachytil burnout",
    subheadline:
      "Nové vedení, stížnosti na odměňování, nejistota v týmu. Behavera poskytla jasno do 48 hodin.",
    metrics: [
      { label: "Nárůst spokojenosti", value: "+25 %" },
      { label: "Burnout zachycen", value: "1 případ" },
      { label: "Čas do prvních dat", value: "48h" },
    ],
    situation:
      "Po příchodu nového vedení čelil Valxon standardním výzvám: nejistota v týmu, stížnosti na odměňování, pokles motivace. CEO Karel potřeboval rychle pochopit skutečný stav bez toho, aby musel spoléhat na filtrované informace od manažerů.",
    solution:
      "Behavera nasadila první pulse survey do 24 hodin od onboardingu. AI chat oslovil celý tým anonymně — lidé mohli říct věci, které by přímému manažerovi neřekli. Dashboard zobrazil priority seřazené podle dopadu.",
    results: [
      "Identifikován případ počínajícího burnoutu — řešen dříve, než vedl k odchodu",
      "Stížnosti na odměňování konkretizovány datovými argumenty pro board",
      "Spokojenost týmu vzrostla o 25 % za jeden kvartál",
      "Nové vedení získalo důvěryhodnost díky datově řízeným rozhodnutím",
    ],
    quote:
      "Zachytili jsme burnout dřív, než způsobil odchod. +25 % spokojenost za kvartál. Behavera mi dala jasný přehled o tom, co se v týmu opravdu děje.",
    quoteAuthor: "Karel",
    quoteRole: "CEO, Valxon",
    icon: TrendingUp,
    placeholder: false,
  },
  "365bank": {
    company: "365.bank",
    segment: "Bankovnictví",
    size: "400+ zaměstnanců",
    industry: "Fintech / Bankovnictví",
    headline: "Jak 365.bank snížila fluktuaci o 14 % a zrychlila nábor o 36 %",
    subheadline:
      "Digitální transformace, tlak na retenci klíčových lidí, zrychlení náborového procesu.",
    metrics: [
      { label: "Pokles fluktuace", value: "−14 %" },
      { label: "Rychlejší nábor", value: "+36 %" },
      { label: "Měřená témata", value: "18" },
    ],
    situation:
      "365.bank prošla intenzivní digitální transformací. S tím přišly výzvy: klíčoví lidé přecházeli ke konkurenci, nábor byl pomalý a neshody s firemní kulturou se projevovaly až po nástupu. HR potřebovalo tvrdá data pro board.",
    solution:
      "Behavera zavedla pravidelné pulse surveys i Culture Fit assessmenty pro nové kandidáty. Data pomohla identifikovat kulturní bariéry, rizika odchodů a slabouce v náborovém procesu. Dashboard HR umožnil prezentovat výsledky boardu s čísly.",
    results: [
      "Fluktuace poklesla o 14 % meziročně",
      "Nábor zrychlil o 36 % díky lepšímu cultural screeningu",
      "Identifikovány klíčové faktory angažovanosti v různých odděleních",
      "HR získalo data-driven argumenty pro board a vedení",
    ],
    quote:
      "Konečně víme, co se v týmech doopravdy děje. Žádné hádání — jen data a jasné kroky.",
    quoteAuthor: "HR Director",
    quoteRole: "365.bank",
    icon: BarChart3,
    placeholder: false,
  },
};

export async function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cs = cases[slug as keyof typeof cases];
  if (!cs) return {};
  const path = `/pripadovky/${slug}`;
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = `${cs.company} — ${cs.headline}`;
  return {
    title,
    description: cs.subheadline,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description: cs.subheadline, url: canonicalUrl, type: "article" },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const cs = cases[slug as keyof typeof cases];
  if (!cs) notFound();

  const Icon = cs.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/pripadovky"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Všechny případovky
          </Link>
          <div className="flex items-center gap-2 text-xs text-accent font-bold uppercase tracking-widest mb-4">
            <span>{cs.industry}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-400">{cs.size}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            {cs.headline}
          </h1>
          <p className="text-lg text-gray-300">{cs.subheadline}</p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-4 mt-8">
            {cs.metrics.map((m) => (
              <div key={m.label} className="bg-white/10 rounded-xl px-5 py-3 text-center">
                <p className="text-2xl font-extrabold text-accent">{m.value}</p>
                <p className="text-xs text-gray-300">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-bold">1</span>
              Situace
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">{cs.situation}</p>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-bold">2</span>
              Řešení
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">{cs.solution}</p>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mb-12">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-bold">3</span>
              Výsledky
            </h2>
            <ul className="space-y-3">
              {cs.results.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        {/* Quote */}
        <FadeIn delay={0.3}>
          <div className="bg-primary rounded-2xl p-8 text-white mb-12">
            <p className="text-lg font-medium italic leading-relaxed mb-4">
              &ldquo;{cs.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                {cs.quoteAuthor[0]}
              </div>
              <div>
                <p className="font-semibold text-sm">{cs.quoteAuthor}</p>
                <p className="text-xs text-gray-400">{cs.quoteRole}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.4}>
          <div className="border border-gray-200 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-primary mb-2">
              Chcete podobné výsledky?
            </h3>
            <p className="text-gray-600 mb-6">
              Spusťte první pulse survey za 15 minut. Nebo si zarezervujte 30min demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors"
              >
                Spustit zdarma
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary/20 text-primary font-semibold rounded-lg hover:border-primary/40 transition-colors"
              >
                Demo zdarma
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Other cases */}
        <FadeIn delay={0.5}>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Další případovky
            </p>
            <Link
              href="/pripadovky"
              className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors group"
            >
              Zobrazit všechny případové studie
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
