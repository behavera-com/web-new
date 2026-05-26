import DualCta from "../ui/DualCta";
import FaqItem from "./FaqItem";

const faqs = [
  {
    q: "Co je to vlastně AI Readiness — a co to NENÍ?",
    a: "AI Readiness je diagnostika lidské strany AI rolloutu: postoje, dovednosti, confidence, obavy, reálné používání. Není to dotazník spokojenosti ani engagement pulse — měříme chování a kontext rozhodování, ne sentiment.",
    open: true,
  },
  {
    q: "Jak dlouho pilot trvá a co po něm máme?",
    a: "Výstupem je heat-mapa adopce napříč týmy, confidence/skill gap analýza, stres signály a doporučení k akci na nejbližší týdny. Konkrétní harmonogram doladíme podle vašeho kontextu na kickoffu.",
  },
  {
    q: "Co když AI ještě skoro nepoužíváme?",
    a: "To je nejlepší moment. AI Readiness fáze je navržená přesně pro tenhle stav — zmapujeme připravenost, obavy a skill gapy dřív, než utratíte první korunu za licence. Vedení dostane data, podle kterých rozhodne, kam jít a v jakém pořadí.",
  },
  {
    q: "Co když už AI máme nasazené?",
    a: "Pak vás zajímá fáze Current AI Adoption nebo After Rollout. Zmapujeme, kdo nástroje opravdu používá, kde vzniká shadow AI a kde se hodnota tvoří. Najdeme skryté šampiony i místa, kde rollout uvízl.",
  },
  {
    q: "Je to GDPR-compliant?",
    a: "Ano. Reporty se vedení vrací agregovaně na úrovni týmů, aby individuální data nešla zneužít proti konkrétním lidem. Účastníci jsou informováni o tom, co se měří a proč.",
  },
  {
    q: "Kolik to stojí?",
    a: "Cena pilotu záleží na rozsahu (počet týmů, fází, hloubka re-measure). Konkrétní kalkulaci dostanete po 15min konzultaci, kde si ujasníme rozsah.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="sj-reveal scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16">
          <div className="lg:col-span-3">
            <span className="sj-section-anchor">06 · FAQ</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section">Časté otázky</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3" />
          <div className="lg:col-span-9 max-w-[800px]">
            {faqs.map((f, i) => (
              <FaqItem
                key={i}
                index={i}
                question={f.q}
                defaultOpen={!!f.open}
              >
                {f.a}
              </FaqItem>
            ))}

            <DualCta className="mt-12 md:mt-14" location="faq" />
          </div>
        </div>
      </div>
    </section>
  );
}
