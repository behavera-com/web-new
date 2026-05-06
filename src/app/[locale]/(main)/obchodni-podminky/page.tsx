import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const path = "/obchodni-podminky";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  return {
    title: "Obchodní podmínky",
    description: "Obchodní podmínky služby Behavera.",
    alternates: { canonical: canonicalUrl },
    robots: { index: false },
  };
}

const sections = [
  {
    title: "1. Obecná ustanovení",
    content: `Tyto obchodní podmínky (dále jen „OP") upravují vztah mezi společností Behavera s.r.o. (dále jen „Poskytovatel") a zákazníkem (dále jen „Zákazník") při využívání platformy Behavera (dále jen „Služba").

Poskytovatelem je společnost:
Behavera s.r.o.
Křižíkova 148/34, Praha 8, 186 00
IČO: [DOPLNIT]
DIČ: [DOPLNIT]
Zapsaná v obchodním rejstříku vedeném [DOPLNIT]`,
  },
  {
    title: "2. Předmět smlouvy",
    content: `Předmětem smlouvy je poskytnutí přístupu k SaaS platformě Behavera umožňující:
- Pravidelné měření angažovanosti a spokojenosti zaměstnanců formou AI pulse surveys
- Analytický dashboard s doporučeními
- Distribuci průzkumů přes email, Slack, WhatsApp, MS Teams a webový odkaz

[DOPLNIT — plný popis produktů a jejich funkcionalit]`,
  },
  {
    title: "3. Uzavření smlouvy",
    content: `Smlouva je uzavřena okamžikem, kdy Zákazník:
a) dokončí registraci a aktivaci účtu na platformě, nebo
b) podepíše samostatnou smlouvu s Poskytovatelem

[DOPLNIT — detaily procesu uzavření smlouvy]`,
  },
  {
    title: "4. Cena a platební podmínky",
    content: `Cena Služby je uvedena na stránce ceníku (behavera.com/cenik) nebo v individuální nabídce.

Fakturace probíhá:
- Měsíčně nebo ročně dle zvoleného tarifu
- Na základě počtu aktivních uživatelů

[DOPLNIT — detailní platební podmínky, splatnost, způsob platby]`,
  },
  {
    title: "5. Délka trvání a ukončení",
    content: `Smlouva se uzavírá na dobu neurčitou s možností vypovědění:
- Měsíční tarif: výpovědní lhůta 30 dní
- Roční tarif: dle podmínek konkrétní smlouvy

[DOPLNIT — podmínky předčasného ukončení, náhrady]`,
  },
  {
    title: "6. Ochrana osobních údajů",
    content: `Zpracování osobních údajů se řídí Zásadami ochrany osobních údajů (behavera.com/ochrana-udaju) a Smlouvou o zpracování osobních údajů (DPA), která je dostupná na vyžádání.

Behavera je GDPR compliant. Data jsou uložena výhradně v EU.`,
  },
  {
    title: "7. Odpovědnost za vady a dostupnost",
    content: `Poskytovatel se zavazuje zajistit dostupnost platformy na úrovni:
- SLA: [DOPLNIT] % měsíčně

[DOPLNIT — podmínky servisní odezvy, způsob hlášení výpadků, kompenzace]`,
  },
  {
    title: "8. Závěrečná ustanovení",
    content: `Tyto OP se řídí právem České republiky. Veškeré spory budou řešeny u příslušného soudu v České republice.

Poskytovatel je oprávněn tyto OP jednostranně změnit. O změně informuje Zákazníka nejméně 30 dní předem.

Platnost od: [DOPLNIT datum]
Verze: 1.0`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět na homepage
        </Link>

        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800 font-medium">
            Tento dokument je pracovní verze — označená místa [DOPLNIT] je třeba
            dokončit před zveřejněním.
          </p>
        </div>

        <h1 className="text-3xl font-bold text-primary mb-2">
          Obchodní podmínky
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Poslední aktualizace: [DOPLNIT datum]
        </p>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-primary mb-3">
                {section.title}
              </h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Dotazy k obchodním podmínkám:{" "}
            <a
              href="mailto:legal@behavera.com"
              className="text-accent hover:underline"
            >
              legal@behavera.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
