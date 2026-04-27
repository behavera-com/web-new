import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import NewsletterForm from "./NewsletterForm";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const path = "/blog";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  const title = "Blog — people analytics, engagement a leadership";
  const description =
    "Praktické články o snižování fluktuace, měření engagementu a datovém řízení týmů. Pro CEO, HR a manažery v CZ/SK firmách.";
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: "website" },
  };
}

const comingSoonArticles = [
  {
    category: "Fluktuace",
    title: "Jak snížit fluktuaci o 30 % — průvodce s daty od 42 500 zaměstnanců",
    description:
      "5 nejčastějších příčin odchodů, jak je odhalit dřív než výpověď a co funguje v CZ/SK firmách.",
    readTime: "8 min čtení",
    status: "coming-soon",
  },
  {
    category: "Manažeři",
    title: "Jak poznat špatného manažera dřív, než poškodí tým",
    description:
      "70 % engagementu závisí na přímém šéfovi. Co měřit, co hledat a co s tím dělat.",
    readTime: "6 min čtení",
    status: "coming-soon",
  },
  {
    category: "Pulse survey",
    title: "Pulse survey vs. roční průzkum — co si vybrat?",
    description:
      "Kdy má smysl roční průzkum a kdy pulse? Čísla, data, a návody pro různé velikosti firem.",
    readTime: "7 min čtení",
    status: "coming-soon",
  },
  {
    category: "ROI",
    title: "Cost of attrition — kolik vás reálně stojí jeden odchod?",
    description:
      "Kalkulace nákladů na fluktuaci pro CZ/SK trh. S čísly, metodikou a kalkulačkou ke stažení.",
    readTime: "5 min čtení",
    status: "coming-soon",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
            Blog
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Lidé, data, leadership.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Praktické články pro CEO, HR a manažery. Bez buzzwordů — jen data a
            věci, které fungují.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Coming soon banner */}
        <FadeIn>
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 mb-12 flex items-start gap-4">
            <BookOpen className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-primary mb-1">
                Blog brzy spouštíme
              </p>
              <p className="text-sm text-gray-600">
                Připravujeme sérii praktických článků s daty z CZ/SK trhu.
                Přihlaste se k newsletteru a budete první, kdo se dozví.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Upcoming articles */}
        <FadeIn delay={0.05}>
          <h2 className="text-xl font-bold text-primary mb-6">
            Připravované články
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {comingSoonArticles.map((article, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-accent uppercase tracking-widest">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-primary mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {article.description}
                </p>
                <span className="inline-block text-xs text-gray-400 bg-gray-200 rounded-full px-3 py-1">
                  Připravujeme
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Newsletter CTA */}
        <FadeIn delay={0.3}>
          <div className="bg-primary rounded-2xl p-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">
              Chcete vědět jako první?
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Přihlaste se k newsletteru a dostanete nové články přímo do
              emailu. Maximálně 2× měsíčně.
            </p>
            <NewsletterForm />
            <p className="text-xs text-gray-400 mt-3">
              Žádný spam. Odhlásíte se jedním klikem.
            </p>
          </div>
        </FadeIn>

        {/* Back links */}
        <FadeIn delay={0.4}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors group"
            >
              ← Zpět na homepage
            </Link>
            <Link
              href="/diagnostika"
              className="inline-flex items-center gap-1 text-sm text-accent font-semibold hover:text-accent-dark transition-colors group"
            >
              Vyzkoušet diagnostiku zdarma
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
