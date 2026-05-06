import { Link } from "@/i18n/navigation";
import { ArrowLeft, Shield } from "lucide-react";

const BASE_URL = "https://www.behavera.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const path = "/ochrana-udaju";
  const canonicalUrl =
    locale === "cs" ? `${BASE_URL}${path}` : `${BASE_URL}/en${path}`;
  return {
    title: "Ochrana osobních údajů",
    description: "Zásady ochrany osobních údajů platformy Behavera. GDPR compliance, data v EU.",
    alternates: { canonical: canonicalUrl },
    robots: { index: false },
  };
}

const sections = [
  {
    title: "1. Správce osobních údajů",
    content: `Správcem osobních údajů je:
Behavera s.r.o.
Křižíkova 148/34, Praha 8, 186 00
IČO: [DOPLNIT]
Email: privacy@behavera.com
Tel.: +420 724 256 447

Pověřenec pro ochranu osobních údajů (DPO): [DOPLNIT — nebo uvést, že DPO není povinně jmenován]`,
  },
  {
    title: "2. Jaké údaje zpracováváme",
    content: `Zpracováváme následující kategorie osobních údajů:

Zákaznická data (správce = klient Behavera):
- Jméno, příjmení, pracovní email zaměstnanců
- Organizační zařazení (oddělení, tým, lokace)
- Odpovědi na pulse survey (anonymizované a agregované)

Uživatelská data platformy:
- Přihlašovací údaje (email, hashované heslo)
- Log aktivit v dashboardu

Marketingová data:
- Email pro newsletter (pouze se souhlasem)
- IP adresa, cookies (viz Cookie policy)`,
  },
  {
    title: "3. Účel zpracování a právní základ",
    content: `Osobní údaje zpracováváme na základě:

a) Plnění smlouvy (čl. 6/1/b GDPR):
   - Provoz platformy a doručování výsledků pulse surveys

b) Oprávněného zájmu (čl. 6/1/f GDPR):
   - Prevence zneužití, bezpečnost platformy
   - Zlepšování produktu na základě agregovaných dat

c) Souhlasu (čl. 6/1/a GDPR):
   - Marketing, newsletter

[DOPLNIT — detailní tabulka účelů a právních základů]`,
  },
  {
    title: "4. Anonymita průzkumů",
    content: `Odpovědi zaměstnanců na pulse surveys jsou zpracovávány tak, aby byla zachována anonymita:

- Data jsou zobrazována výhradně v agregované podobě (za tým, oddělení)
- Výsledky jsou zobrazeny pouze při dostatečném počtu respondentů (minimální threshold)
- Individuální odpovědi nejsou zpřístupněny zaměstnavateli
- Behavera má přístup k datům pouze v rozsahu nutném pro provoz Služby

[DOPLNIT — přesný threshold pro zobrazení dat, technická opatření]`,
  },
  {
    title: "5. Kde jsou data uložena",
    content: `Veškerá data jsou uložena výhradně v datových centrech v EU (Evropská unie).

Používáme následující infrastrukturu:
[DOPLNIT — název cloudu, region, certifikace datacenter]

Data nejsou předávána do třetích zemí mimo EHP bez odpovídajících záruk.`,
  },
  {
    title: "6. Příjemci osobních údajů",
    content: `Osobní údaje sdílíme pouze s:
- Smluvními zpracovateli (hosting, emailing, analytika) — seznam je k dispozici na vyžádání
- Orgány veřejné moci v případě zákonné povinnosti

Nikdy neprodáváme osobní údaje třetím stranám.

[DOPLNIT — seznam sub-procesorů a jejich DPA]`,
  },
  {
    title: "7. Doba uchování",
    content: `Osobní údaje uchováváme po dobu:
- Aktivní smlouvy: po celou dobu trvání smlouvy
- Po ukončení smlouvy: [DOPLNIT] dní (bezpečnostní backup), poté smazáno
- Newsletter: do odvolání souhlasu

[DOPLNIT — retention policy pro všechny kategorie dat]`,
  },
  {
    title: "8. Vaše práva",
    content: `Máte právo:
- Na přístup k údajům (čl. 15 GDPR)
- Na opravu (čl. 16 GDPR)
- Na výmaz (čl. 17 GDPR — „právo být zapomenut")
- Na omezení zpracování (čl. 18 GDPR)
- Na přenositelnost (čl. 20 GDPR)
- Vznést námitku (čl. 21 GDPR)
- Odvolat souhlas kdykoli bez udání důvodu

Žádost uplatníte na: privacy@behavera.com
Odpovíme do 30 dnů.

Máte také právo podat stížnost u dozorového úřadu:
Úřad pro ochranu osobních údajů (ÚOOÚ)
www.uoou.cz`,
  },
  {
    title: "9. Zabezpečení",
    content: `Implementujeme technická a organizační opatření dle GDPR:
- Šifrování dat v klidu (AES-256) a při přenosu (TLS 1.3)
- Přístupová práva na principu need-to-know
- Pravidelné bezpečnostní audity
- ISO 27001 [DOPLNIT — status certifikace]
- Proces řešení bezpečnostních incidentů (hlášení do 72h)`,
  },
  {
    title: "10. Cookies",
    content: `Webová stránka behavera.com používá cookies. Podrobnosti najdete v Cookie policy.

[DOPLNIT — odkaz na Cookie policy nebo integrovat do tohoto dokumentu]`,
  },
  {
    title: "11. Změny zásad",
    content: `Tyto zásady mohou být aktualizovány. O podstatných změnách informujeme emailem nebo oznámením v platformě.

Aktuální verze je vždy dostupná na behavera.com/ochrana-udaju.

Platnost od: [DOPLNIT datum]
Verze: 1.0`,
  },
];

export default function PrivacyPage() {
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
            dokončit s právníkem před zveřejněním.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-accent" />
          <h1 className="text-3xl font-bold text-primary">
            Ochrana osobních údajů
          </h1>
        </div>
        <p className="text-sm text-gray-400 mb-2">
          Poslední aktualizace: [DOPLNIT datum]
        </p>
        <div className="flex flex-wrap gap-2 mb-10">
          {["GDPR compliant", "Data v EU", "ISO 27001", "AES-256"].map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
            >
              <Shield className="h-3 w-3" />
              {b}
            </span>
          ))}
        </div>

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

        <div className="mt-12 pt-8 border-t border-gray-200 space-y-2">
          <p className="text-sm text-gray-500">
            Dotazy k ochraně osobních údajů:{" "}
            <a
              href="mailto:privacy@behavera.com"
              className="text-accent hover:underline"
            >
              privacy@behavera.com
            </a>
          </p>
          <p className="text-sm text-gray-500">
            DPA (smlouva o zpracování os. údajů) ke stažení:{" "}
            <a href="/bezpecnost" className="text-accent hover:underline">
              Bezpečnost & GDPR
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
