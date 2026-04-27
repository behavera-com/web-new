export type Dimension =
  | "fluktuace"
  | "leadership"
  | "engagement"
  | "pretizeni"
  | "kultura"
  | "komunikace";

export interface Answer {
  text: string;
  scores: Partial<Record<Dimension, number>>;
}

export interface Question {
  id: number;
  text: string;
  subtitle?: string;
  answers: Answer[];
  metadata?: boolean;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Kolik máte zaměstnanců?",
    metadata: true,
    answers: [
      { text: "Do 30", scores: {} },
      { text: "30–80", scores: {} },
      { text: "80–200", scores: {} },
      { text: "200+", scores: {} },
    ],
  },
  {
    id: 2,
    text: "Kolik lidí vám za poslední rok dobrovolně odešlo?",
    answers: [
      { text: "Skoro nikdo (pod 5 %)", scores: { fluktuace: 1 } },
      { text: "Pár lidí (5–10 %)", scores: { fluktuace: 2 } },
      { text: "Citelně (10–20 %)", scores: { fluktuace: 3 } },
      { text: "Hodně, je to problém (20 %+)", scores: { fluktuace: 4 } },
    ],
  },
  {
    id: 3,
    text: "Jak dlouho trvá obsadit klíčovou pozici?",
    answers: [
      { text: "Do měsíce", scores: { fluktuace: 1 } },
      { text: "1–3 měsíce", scores: { fluktuace: 2 } },
      { text: "3–6 měsíců", scores: { fluktuace: 3 } },
      { text: "Déle, nebo se nedaří vůbec", scores: { fluktuace: 4 } },
    ],
  },
  {
    id: 4,
    text: "Víte, kteří vaši manažeři vedou dobře a kteří ne?",
    answers: [
      { text: "Ano, mám jasný přehled", scores: { leadership: 1 } },
      { text: "Tuším, ale nemám data", scores: { leadership: 2 } },
      { text: "Spíš ne — spoléhám na pocit", scores: { leadership: 3 } },
      { text: "Vůbec ne — a lidi odcházejí", scores: { leadership: 4 } },
    ],
  },
  {
    id: 5,
    text: "Jak často sbíráte zpětnou vazbu od zaměstnanců?",
    answers: [
      { text: "Pravidelně měsíčně", scores: { engagement: 1, komunikace: 1 } },
      { text: "1–2× ročně", scores: { engagement: 2, komunikace: 2 } },
      {
        text: "Občas, nesystematicky",
        scores: { engagement: 3, komunikace: 3 },
      },
      {
        text: "Nesbíráme / jen exit interview",
        scores: { engagement: 4, komunikace: 4 },
      },
    ],
  },
  {
    id: 6,
    text: "Víte, co vaše lidi motivuje k lepšímu výkonu?",
    answers: [
      { text: "Ano, máme to změřené", scores: { engagement: 1 } },
      { text: "Máme představu, ale neměříme", scores: { engagement: 2 } },
      {
        text: "Spíš ne — zkoušíme různé věci",
        scores: { engagement: 3 },
      },
      { text: "Ne — a výkon stagnuje", scores: { engagement: 4 } },
    ],
  },
  {
    id: 7,
    text: "Máte přehled, kdo je ve firmě přetížený?",
    answers: [
      { text: "Ano, monitorujeme a reagujeme", scores: { pretizeni: 1 } },
      {
        text: "Částečně — řešíme až když eskaluje",
        scores: { pretizeni: 2 },
      },
      {
        text: "Spíš ne — spoléháme, že si řeknou",
        scores: { pretizeni: 3 },
      },
      { text: "Ne — a měli jsme burnouty", scores: { pretizeni: 4 } },
    ],
  },
  {
    id: 8,
    text: "Žijí vaše firemní hodnoty v praxi?",
    answers: [
      {
        text: "Ano — lidé se s nimi identifikují",
        scores: { kultura: 1 },
      },
      { text: "Většinou ano, ale ne všude", scores: { kultura: 2 } },
      {
        text: "Jsou deklarované, ale praxe je jiná",
        scores: { kultura: 3 },
      },
      { text: "Nemáme je / nikdo je nezná", scores: { kultura: 4 } },
    ],
  },
  {
    id: 9,
    text: "Jak funguje komunikace mezi vedením a týmy?",
    answers: [
      {
        text: "Výborně — lidé vědí, co se děje",
        scores: { komunikace: 1 },
      },
      {
        text: "Dobře, ale občas se info ztratí",
        scores: { komunikace: 2 },
      },
      {
        text: "Slabě — lidi se dozvídají pozdě",
        scores: { komunikace: 3 },
      },
      {
        text: "Špatně — hra na tichou poštu",
        scores: { komunikace: 4 },
      },
    ],
  },
  {
    id: 10,
    text: "Kolik nováčků odejde během zkušebky nebo do 6 měsíců?",
    answers: [
      {
        text: "Skoro nikdo (pod 5 %)",
        scores: { fluktuace: 1, kultura: 1 },
      },
      { text: "Občas (5–15 %)", scores: { fluktuace: 2, kultura: 2 } },
      { text: "Často (15–30 %)", scores: { fluktuace: 3, kultura: 3 } },
      { text: "Hodně (30 %+)", scores: { fluktuace: 4, kultura: 4 } },
    ],
  },
];

export const employeeCountMap: Record<number, number> = {
  0: 25,
  1: 55,
  2: 130,
  3: 250,
};
