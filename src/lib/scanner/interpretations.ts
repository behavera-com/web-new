import type { Dimension } from "./questions";

interface Interpretation {
  headline: string;
  text: string;
  recommendation: string;
}

export const interpretations: Record<
  Dimension,
  Record<string, Interpretation>
> = {
  fluktuace: {
    low: {
      headline: "Fluktuace pod kontrolou",
      text: "Vaše firma drží lidi. Udržujte pravidelný kontakt s klíčovými zaměstnanci a sledujte, jestli se něco nemění.",
      recommendation:
        "Preventivně měřte spokojenost — i dobré firmy mohou rychle ztratit klíčového člověka.",
    },
    medium: {
      headline: "Fluktuace na hraně",
      text: "Zatím to nevypadá kriticky, ale signály tu jsou. Delší doba náboru a občasné odchody naznačují, že pod povrchem může bublat nespokojenost.",
      recommendation:
        "Začněte sbírat zpětnou vazbu pravidelně. Roční průzkum nestačí — problém zachytíte měsíce po tom, co vznikl.",
    },
    elevated: {
      headline: "Zvýšené riziko ztrát",
      text: "Firma ztrácí lidi rychleji, než je zdravé, a nové pozice se obsazují pomalu. Každý odchod stojí 6–9 měsíčních platů.",
      recommendation:
        "Identifikujte 3 nejčastější důvody odchodů. Zaměřte se na manažery — 70 % engagementu závisí na přímém nadřízeném.",
    },
    high: {
      headline: "Kritická fluktuace",
      text: 'Firma je v "děravém vědru" — nabíráte a ztrácíte zároveň. Náklady pravděpodobně tvoří stovky tisíc až miliony ročně.',
      recommendation:
        "Okamžitě zjistěte, proč lidé odcházejí. Ne z exit interview — tam pravdu neřeknou. Z anonymního měření.",
    },
  },
  leadership: {
    low: {
      headline: "Silný leadership",
      text: "Máte přehled o kvalitě svých manažerů. To vás odlišuje od 90 % firem.",
      recommendation:
        "Pokračujte v rozvoji — i dobří manažeři potřebují zpětnou vazbu.",
    },
    medium: {
      headline: "Leadership bez dat",
      text: "Tušíte, jak na tom manažeři jsou, ale nemáte tvrdá data. Špatný manažer dokáže potichu rozložit celý tým.",
      recommendation:
        "Změřte, jak vaši manažeři vedou. Data vám ukáží, kdo je silný a kde investovat do rozvoje.",
    },
    elevated: {
      headline: "Slepá místa v managementu",
      text: "Bez dat o kvalitě vedení střílíte naslepo. 70 % variability v engagementu závisí na přímém nadřízeném.",
      recommendation:
        "Potřebujete zpětnou vazbu od lidí v týmech — ne jen od samotných manažerů.",
    },
    high: {
      headline: "Manažeři jako hlavní riziko",
      text: "Nemáte přehled o kvalitě vedení a lidé odcházejí. 50 % lidí odchází kvůli šéfovi, ne kvůli firmě.",
      recommendation:
        "Změřte leadership kvalitu a identifikujte manažery, kteří stojí za odchody. Investice do jednoho špatného manažera vás stojí celé týmy.",
    },
  },
  engagement: {
    low: {
      headline: "Angažovaní lidé",
      text: "Vaši zaměstnanci vědí, co je motivuje, a vy to víte taky. Skvělý základ.",
      recommendation:
        "Udržujte pravidelné měření — engagement se mění rychleji, než si myslíte.",
    },
    medium: {
      headline: "Engagement bez měření",
      text: "Máte představu, ale neměříte systematicky. To znamená, že reagujete na problémy s měsíčním zpožděním.",
      recommendation:
        "Zaveďte měsíční pulse — krátký, anonymní check-in vám ukáže trendy dřív, než se projeví v odchodech.",
    },
    elevated: {
      headline: "Klesající motivace",
      text: "Zaměstnanci nedostávají prostor říct, co je trápí. Výkon pravděpodobně stagnuje nebo klesá.",
      recommendation:
        "Začněte s jednoduchým měsíčním pulse měřením. 2 minuty na vyplnění, okamžité výsledky.",
    },
    high: {
      headline: "Tichá demotivace",
      text: "Nesbíráte zpětnou vazbu a nevíte, co lidi motivuje. To je recept na quiet quitting a postupný rozklad výkonu.",
      recommendation:
        "Okamžitě začněte měřit. Každý měsíc bez dat je měsíc, kdy ztrácíte lidi, které jste nemuseli ztratit.",
    },
  },
  pretizeni: {
    low: {
      headline: "Zátěž pod kontrolou",
      text: "Monitorujete přetížení a reagujete. Vaši lidé to ocení.",
      recommendation:
        "Pokračujte — a sledujte sezónní výkyvy, které mohou situaci rychle změnit.",
    },
    medium: {
      headline: "Reaktivní přístup k přetížení",
      text: "Řešíte až když eskaluje. To znamená, že někteří lidé trpí potichu.",
      recommendation:
        "Přidejte pravidelný check na zátěž a kapacitu do svého měření.",
    },
    elevated: {
      headline: "Skryté přetížení",
      text: "Spoléháte, že si lidé řeknou. Většina ale mlčí — dokud nedostanou burnout nebo neodejdou.",
      recommendation:
        "Ptejte se pravidelně a anonymně. Přetížení lidé potřebují bezpečný prostor, kde to říct.",
    },
    high: {
      headline: "Riziko vyhoření",
      text: "Už jste měli burnouty nebo dlouhodobé nemocenské. To je signál, že systém nefunguje.",
      recommendation:
        "Burnout stojí 2–3 roční platy na každém člověku. Měřte zátěž měsíčně a reagujte proaktivně.",
    },
  },
  kultura: {
    low: {
      headline: "Zdravá kultura",
      text: "Vaše hodnoty žijí v praxi a noví lidé zapadají. To je konkurenční výhoda.",
      recommendation:
        "Pravidelně ověřujte — kultura se mění s každým novým člověkem a každou změnou.",
    },
    medium: {
      headline: "Kultura s trhlinami",
      text: "Hodnoty fungují, ale ne všude. To může vytvářet subkultury a tření mezi týmy.",
      recommendation:
        "Změřte, jak jednotlivé týmy vnímají firemní kulturu — rozdíly vás možná překvapí.",
    },
    elevated: {
      headline: "Kultura na papíře",
      text: "Deklarované hodnoty se liší od reality. Noví lidé to rychle poznají — proto odcházejí v zkušebce.",
      recommendation:
        "Zjistěte, jaká je vaše kultura doopravdy. Ne jakou chcete mít, ale jakou lidé žijí.",
    },
    high: {
      headline: "Kulturní vakuum",
      text: "Nemáte definované hodnoty nebo je nikdo nezná. Bez společného základu každý tým funguje jinak.",
      recommendation:
        "Začněte měřením reality — ne definováním hodnot shora. Zjistěte, co vaši lidé skutečně potřebují.",
    },
  },
  komunikace: {
    low: {
      headline: "Transparentní komunikace",
      text: "Lidé vědí, co se děje a proč. To buduje důvěru a snižuje nejistotu.",
      recommendation: "Udržujte otevřenost — zejména v době změn.",
    },
    medium: {
      headline: "Občasné informační díry",
      text: "Většinou to funguje, ale občas se informace ztratí cestou. To vytváří nejistotu.",
      recommendation:
        "Zaveďte pravidelný kanál pro zpětnou vazbu — ne jen shora dolů, ale i zdola nahoru.",
    },
    elevated: {
      headline: "Slabá komunikace",
      text: "Lidé se dozvídají věci pozdě nebo vůbec. 80 % problémů ve firmách začíná špatnou komunikací.",
      recommendation:
        "Pravidelný pulse vám ukáže, kde komunikace selhává — a kde to má dopad na výkon.",
    },
    high: {
      headline: "Komunikační kolaps",
      text: "Hra na tichou poštu. Vedení neví, co se děje v týmech. Týmy neví, kam firma směřuje.",
      recommendation:
        "Potřebujete anonymní kanál, kde lidé řeknou pravdu. A dashboard, kde ji vedení uvidí.",
    },
  },
};

export const levelLabels: Record<string, string> = {
  low: "V pořádku",
  medium: "Střední riziko",
  elevated: "Zvýšené riziko",
  high: "Vysoké riziko",
};

import type { FinancialImpact } from "./financial";
import { formatCZK } from "./financial";

interface CompanyContext {
  employees: number;
  financialImpact: FinancialImpact | null;
}

/** Generate personalized CEO-focused one-liners based on company data */
export function getCeoImpact(
  dimension: Dimension,
  level: string,
  ctx: CompanyContext
): string {
  const emp = ctx.employees;
  const fi = ctx.financialImpact;
  const departures = fi?.estimatedDepartures ?? Math.round(emp * 0.15);
  const costPerDep = fi?.costPerDeparture ?? 375000;
  const annualCost = fi?.annualCost ?? departures * costPerDep;

  const map: Record<Dimension, Record<string, string>> = {
    fluktuace: {
      low: `Stabilní tým — minimální náklady na nábor`,
      medium: `Ročně vám může odejít ~${departures} lidí — to jsou náklady ${formatCZK(annualCost)}`,
      elevated: `Každý odchod vás stojí ~${formatCZK(costPerDep)}. Při ${departures} odchodech to je ${formatCZK(annualCost)} ročně`,
      high: `Při ${emp} zaměstnancích ztrácíte ~${departures} lidí ročně — to je ${formatCZK(annualCost)} v koši`,
    },
    leadership: {
      low: "Manažeři vedou efektivně — to vás odlišuje od většiny firem",
      medium: `Bez dat o kvalitě vedení riskujete tiché problémy v ${emp > 80 ? "desítkách" : "více"} týmech`,
      elevated: `Špatní manažeři dokáží rozložit celé týmy — při ${emp} lidech to může znamenat vlnu odchodů`,
      high: `50 % lidí odchází kvůli šéfovi. Při ${emp} zaměstnancích vás jeden špatný manažer stojí celý tým`,
    },
    engagement: {
      low: "Angažovaný tým = vyšší produktivita a nižší fluktuace",
      medium: `U ${emp} zaměstnanců nevíte, co koho motivuje — výkon stagnuje`,
      elevated: `Tichý odchod pravděpodobně probíhá u části vašich ${emp} lidí právě teď`,
      high: `Quiet quitting u ${emp} zaměstnanců rozžírá výkon zevnitř — a vy to nevíte`,
    },
    pretizeni: {
      low: "Zátěž je pod kontrolou — vaši lidé to ocení",
      medium: `Někteří z vašich ${emp} lidí trpí potichu — řešíte až když eskaluje`,
      elevated: `Burnout hrozí — při ${emp} lidech se to dozvíte pozdě`,
      high: `Vyhoření stojí 2–3 roční platy. Při ${emp} zaměstnancích hrozí řetězová reakce`,
    },
    kultura: {
      low: "Silná kultura = konkurenční výhoda při náboru",
      medium: `Tření mezi týmy zpomaluje růst firmy s ${emp} lidmi`,
      elevated: `Nováčci odcházejí v zkušebce — kultura je nedrží. Každý odchod stojí ~${formatCZK(costPerDep)}`,
      high: `Bez společných hodnot se ${emp > 80 ? "větší" : "vaše"} firma rozpadá zevnitř`,
    },
    komunikace: {
      low: "Transparentní komunikace buduje důvěru a snižuje nejistotu",
      medium: `Informační díry v ${emp > 80 ? "desítkách" : "několika"} týmech vytváří nejistotu`,
      elevated: `Při ${emp} lidech se klíčové informace ztrácejí — 80 % problémů začíná špatnou komunikací`,
      high: `Vedení neví, co se děje v týmech. ${emp} lidí neví, kam firma směřuje`,
    },
  };

  return map[dimension]?.[level] ?? "";
}
