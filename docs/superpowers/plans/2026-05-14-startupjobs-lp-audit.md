# StartupJobs LP Audit — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Opravit 9 konkrétních konverzních, důvěryhodnostních a výkonnostních problémů na `/cs/startupjobs` LP bez změny designu nebo přepisování komponent.

**Architecture:** Minimální zásahy — každý fix je izolovaný edit jednoho souboru. Výjimka: Fix-06 vytváří nový `startupjobs/layout.tsx` a odstraňuje `<link>` tagy z `page.tsx`. Pořadí sekcí v page.tsx se mění přesunem jednoho JSX řádku.

**Tech Stack:** Next.js App Router (React Server Components), TypeScript, Tailwind CSS. Typecheck: `npx tsc --noEmit`. Build: `pnpm build`. UI verify: browser-test skill (3 viewporty).

---

## Soubory dotčené plánem

| Soubor | Akce |
|--------|------|
| `src/app/[locale]/startupjobs/page.tsx` | Modify — odstranit font linky, přesunout CoBrandBlock |
| `src/app/[locale]/startupjobs/layout.tsx` | Create — nový nested layout s Fontshare v head |
| `src/components/startupjobs/sections/Hero.tsx` | Modify — Fix-01: anchor href |
| `src/components/startupjobs/sections/ReportPreview.tsx` | Modify — Fix-02: CTA text + href |
| `src/components/startupjobs/sections/rep-data.ts` | Modify — Fix-03: odkomentovat photo |
| `src/components/startupjobs/sections/OutcomeStrip.tsx` | Modify — Fix-05: OUTCOMES array |
| `src/components/startupjobs/sections/ManifestoBreak.tsx` | Modify — Fix-07: CTA text |
| `src/components/startupjobs/sections/ProductTriptych.tsx` | Modify — Fix-08: video preload |
| `src/components/startupjobs/layout/SectionNav.tsx` | Delete — Fix-09: dead code |

---

## Task 1: Fix-01 — Opravit broken `#expando-case` anchor v Hero

**Files:**
- Modify: `src/components/startupjobs/sections/Hero.tsx` (řádek 561)

- [ ] **Krok 1: Najdi řádek s broken href**

Otevři `src/components/startupjobs/sections/Hero.tsx` a najdi:
```tsx
href="#expando-case"
```
Je to v komponentě `ExpandoCaseCard`, uvnitř posledního `<a>` tagu (CTA bar dole na kartě).

- [ ] **Krok 2: Změň href na `#cases`**

```tsx
// PŘED
<a
  href="#expando-case"
  className="group flex items-center justify-between gap-3 px-7 md:px-9 py-4 transition-colors hover:bg-[#f6f3ff]"

// PO
<a
  href="#cases"
  className="group flex items-center justify-between gap-3 px-7 md:px-9 py-4 transition-colors hover:bg-[#f6f3ff]"
```

`#cases` je `id` na sekci `CaseStudies` (`src/components/startupjobs/sections/CaseStudies.tsx:589`).

- [ ] **Krok 3: Typecheck**

```bash
npx tsc --noEmit
```
Očekávaný výstup: žádné chyby.

- [ ] **Krok 4: Commit**

```bash
git add src/components/startupjobs/sections/Hero.tsx
git commit -m "fix: opravit broken #expando-case anchor v Hero → #cases"
```

---

## Task 2: Fix-02 — Stáhnout vzor (PDF) CTA

**Files:**
- Modify: `src/components/startupjobs/sections/ReportPreview.tsx` (řádek 52–55)

- [ ] **Krok 1: Najdi CTA tlačítko v ReportPreview**

Otevři `src/components/startupjobs/sections/ReportPreview.tsx`. Najdi blok:
```tsx
<a href="#consult" className="sj-btn-primary">
  Stáhnout vzor (PDF)
  <ArrowRightIcon size={14} />
</a>
<span className="sj-eyebrow">4 strany · 1.2 MB</span>
```

- [ ] **Krok 2: Změň na PDF download**

```tsx
<a
  href="/startupjobs/behavera-report-preview.pdf"
  className="sj-btn-primary"
  download
  target="_blank"
  rel="noopener noreferrer"
>
  Stáhnout vzor (PDF)
  <ArrowRightIcon size={14} />
</a>
<span className="sj-eyebrow">4 strany · 1.2 MB</span>
```

**Poznámka pro deployment:** Soubor `/public/startupjobs/behavera-report-preview.pdf` musí existovat před spuštěním. Placeholder cesta je správná, tlačítko bude funkční ihned po dodání PDF do `/public/startupjobs/`.

- [ ] **Krok 3: Najdi také druhé CTA tlačítko níže ve stejném souboru**

Hned pod report framem je další CTA:
```tsx
<a href="#consult" className="sj-btn-primary-xl">
  Spustit 3min průzkum
  <ArrowRightIcon size={16} />
</a>
```
Toto tlačítko ponech beze změny — „Spustit 3min průzkum" → `#consult` je správné.

- [ ] **Krok 4: Typecheck**

```bash
npx tsc --noEmit
```
Očekávaný výstup: žádné chyby.

- [ ] **Krok 5: Commit**

```bash
git add src/components/startupjobs/sections/ReportPreview.tsx
git commit -m "fix: ReportPreview PDF CTA → přímý download místo #consult scroll"
```

---

## Task 3: Fix-03 — Připravit rep foto (odkomentovat photo pole)

**Files:**
- Modify: `src/components/startupjobs/sections/rep-data.ts`

- [ ] **Krok 1: Odkomentuj photo pole**

Otevři `src/components/startupjobs/sections/rep-data.ts`:

```ts
// PŘED
export const consultRep: Rep = {
  name: "David Skoupý",
  title: "Senior konzultant · Behavera",
  email: "hello@behavera.com",
  phone: "+420 605 839 456",
  // photo: "/startupjobs/team/david.jpg",
};

// PO
export const consultRep: Rep = {
  name: "David Skoupý",
  title: "Senior konzultant · Behavera",
  email: "hello@behavera.com",
  phone: "+420 605 839 456",
  photo: "/startupjobs/team/david.jpg",
};
```

**Poznámka pro deployment:** Foto musí být dodáno do `/public/startupjobs/team/david.jpg` před spuštěním. Zkontroluj `RepCard.tsx` jak přesně zobrazuje foto — pravděpodobně `<img src={rep.photo}>` s fallback na initials.

- [ ] **Krok 2: Ověř, jak RepCard zpracovává chybějící foto**

Otevři `src/components/startupjobs/sections/RepCard.tsx` a ujisti se, že komponenta zobrazuje initials fallback pokud `photo` neexistuje jako soubor. Pokud fallback chybí, přidej:

```tsx
// V RepCard — pokud photo je definováno, zobraz img, jinak initials
{rep.photo ? (
  <img src={rep.photo} alt={rep.name} className="w-full h-full object-cover" />
) : (
  <span>{rep.name.split(" ").map(n => n[0]).join("")}</span>
)}
```

- [ ] **Krok 3: Typecheck**

```bash
npx tsc --noEmit
```
Očekávaný výstup: žádné chyby.

- [ ] **Krok 4: Commit**

```bash
git add src/components/startupjobs/sections/rep-data.ts src/components/startupjobs/sections/RepCard.tsx
git commit -m "fix: odkomentovat photo pole v rep-data, připravit pro dodání fotky"
```

---

## Task 4: Fix-04 — Přesunout CoBrandBlock za Hero v page.tsx

**Files:**
- Modify: `src/app/[locale]/startupjobs/page.tsx` (řádky 87–101)

- [ ] **Krok 1: Najdi sekci main v page.tsx**

Otevři `src/app/[locale]/startupjobs/page.tsx`. Najdi `<main>` element a aktuální pořadí sekcí:

```tsx
<main id="top" className="...">
  <Hero />
  <PainSection />
  <ProductTriptych />
  <ProductDemo />
  <ReportPreview />
  <SolutionSection />
  <ManifestoBreak />
  <CaseStudies />
  <CoBrandBlock />        {/* ← toto přesunout za Hero */}
  <ProcessSection />
  <FaqSection />
  <OutcomeStrip />
  <FinalCta />
</main>
```

- [ ] **Krok 2: Přesuň CoBrandBlock hned za Hero**

```tsx
<main id="top" className="pt-[112px] md:pt-[148px] pb-[88px] md:pb-0 scroll-pt-[120px] md:scroll-pt-[156px]">
  <Hero />
  <CoBrandBlock />        {/* ← přesunuto sem */}
  <PainSection />
  <ProductTriptych />
  <ProductDemo />
  <ReportPreview />
  <SolutionSection />
  <ManifestoBreak />
  <CaseStudies />
  <ProcessSection />
  <FaqSection />
  <OutcomeStrip />
  <FinalCta />
</main>
```

Import `CoBrandBlock` je already v souboru — nic dalšího měnit nemusíš.

- [ ] **Krok 3: Typecheck + build**

```bash
npx tsc --noEmit && pnpm build
```
Očekávaný výstup: typecheck OK, build úspěšný.

- [ ] **Krok 4: Browser test**

Spusť dev server (`pnpm dev`) a ověř `/cs/startupjobs` na 3 viewportech.
CoBrandBlock by měl být viditelný hned po Hero bez scrollování na mobile.

- [ ] **Krok 5: Commit**

```bash
git add src/app/[locale]/startupjobs/page.tsx
git commit -m "fix: přesunout CoBrandBlock za Hero — kontext pro cold StartupJobs traffic"
```

---

## Task 5: Fix-05 — OutcomeStrip: swap na HR-relevantní náborová čísla

**Files:**
- Modify: `src/components/startupjobs/sections/OutcomeStrip.tsx` (řádky 14–36)

- [ ] **Krok 1: Nahraď OUTCOMES array**

Otevři `src/components/startupjobs/sections/OutcomeStrip.tsx`. Najdi a nahraď celý `OUTCOMES` array:

```ts
// PŘED
const OUTCOMES: Outcome[] = [
  {
    slug: "valxon",
    brand: "Valxon",
    logo: "/startupjobs/logos/valxon.svg",
    metric: "+25 %",
    label: "Spokojenost zaměstnanců",
  },
  {
    slug: "365bank",
    brand: "365.bank",
    logo: "/startupjobs/logos/365bank.svg",
    metric: "−14 %",
    label: "Fluktuace zaměstnanců",
  },
  {
    slug: "expando",
    brand: "Expando",
    logo: "/startupjobs/logos/expando.svg",
    metric: "+37 %",
    label: "Prodeje klienta",
  },
];

// PO
const OUTCOMES: Outcome[] = [
  {
    slug: "365bank",
    brand: "365.bank",
    logo: "/startupjobs/logos/365bank.svg",
    metric: "−36 %",
    label: "Rychlejší náborový proces",
  },
  {
    slug: "expando",
    brand: "Expando",
    logo: "/startupjobs/logos/expando.svg",
    metric: "+24 pp",
    label: "12mo retention nových lidí",
  },
  {
    slug: "vodafone",
    brand: "Vodafone CZ",
    logo: "/startupjobs/logos/vodafone.svg",
    metric: "−40 %",
    label: "Fluktuace zaměstnanců",
  },
];
```

Čísla jsou validovaná: 365.bank −36 % je z CaseStudies.tsx, Expando +24 pp je z Hero ExpandoCaseCard (12mo retention 67→91 %), Vodafone −40 % je z CaseStudies.tsx.

- [ ] **Krok 2: Typecheck**

```bash
npx tsc --noEmit
```
Očekávaný výstup: žádné chyby (typ `Outcome` se nemění).

- [ ] **Krok 3: Commit**

```bash
git add src/components/startupjobs/sections/OutcomeStrip.tsx
git commit -m "fix: OutcomeStrip → HR náborové metriky místo engagement/sales čísel"
```

---

## Task 6: Fix-06 — Fontshare přesunout do nested layout.tsx

**Files:**
- Create: `src/app/[locale]/startupjobs/layout.tsx`
- Modify: `src/app/[locale]/startupjobs/page.tsx` (odstranit font link tagy)

- [ ] **Krok 1: Vytvoř nested layout pro startupjobs route**

Vytvoř nový soubor `src/app/[locale]/startupjobs/layout.tsx`:

```tsx
import type { ReactNode } from "react";

export default function StartupJobsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
      />
      {children}
    </>
  );
}
```

V Next.js App Router, `<link rel="stylesheet">` uvnitř Server Component je automaticky hoistován do `<head>` React 18 runtime (resource hoisting). Nested layout se renderuje pro všechny routes uvnitř `/startupjobs/` — v tomto případě pouze `page.tsx`.

- [ ] **Krok 2: Odstraň font link tagy z page.tsx**

Otevři `src/app/[locale]/startupjobs/page.tsx`. Odstraň tyto tři řádky z JSX (jsou na začátku `<div className="sj-body sj-scope">`):

```tsx
// ODSTRANIT tyto řádky:
<link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
<link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
<link
  rel="stylesheet"
  href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
/>
```

Po odstranění začátek `<div className="sj-body sj-scope">` vypadá takto:

```tsx
<div className="sj-body sj-scope" style={{ background: "var(--color-paper)" }}>
  <div className="sj-progress-bar" aria-hidden />
  <AmbientLayer />
  ...
```

- [ ] **Krok 3: Typecheck + build**

```bash
npx tsc --noEmit && pnpm build
```
Očekávaný výstup: typecheck OK, build úspěšný.

- [ ] **Krok 4: Browser test — ověř font**

Spusť `pnpm dev` a otevři `/cs/startupjobs`. Ověř že:
- General Sans font se načítá správně (nadpisy v Hero mají správný rez)
- Žádný FOUC (flash of unstyled text) při načtení

- [ ] **Krok 5: Commit**

```bash
git add src/app/[locale]/startupjobs/layout.tsx src/app/[locale]/startupjobs/page.tsx
git commit -m "perf: přesunout Fontshare do nested layout — hoisting do <head>"
```

---

## Task 7: Fix-07 — ManifestoBreak CTA text

**Files:**
- Modify: `src/components/startupjobs/sections/ManifestoBreak.tsx` (řádek 82)

- [ ] **Krok 1: Najdi a změň CTA text**

Otevři `src/components/startupjobs/sections/ManifestoBreak.tsx`. Najdi:

```tsx
<span className="sj-manifesto-link__text">Ukažte mi, jak</span>
```

Změň na:

```tsx
<span className="sj-manifesto-link__text">Chci taková čísla</span>
```

`href="#consult"` ponech beze změny.

- [ ] **Krok 2: Typecheck**

```bash
npx tsc --noEmit
```
Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add src/components/startupjobs/sections/ManifestoBreak.tsx
git commit -m "copy: ManifestoBreak CTA → akčnější text"
```

---

## Task 8: Fix-08 — Video lazy load v ProductTriptych

**Files:**
- Modify: `src/components/startupjobs/sections/ProductTriptych.tsx` (řádek 224)

- [ ] **Krok 1: Změň preload atribut**

Otevři `src/components/startupjobs/sections/ProductTriptych.tsx`. Najdi `<video>` element:

```tsx
// PŘED
<video
  src={c.shotVideo}
  poster={c.shot}
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  aria-label={c.shotAlt}
  style={{ ... }}
/>

// PO
<video
  src={c.shotVideo}
  poster={c.shot}
  autoPlay
  muted
  loop
  playsInline
  preload="none"
  aria-label={c.shotAlt}
  style={{ ... }}
/>
```

`preload="none"` zabrání stahování videa dokud browser nezačne přehrávat. `poster={c.shot}` zobrazí statický screenshot jako placeholder — takže uživatel vidí obsah okamžitě.

- [ ] **Krok 2: Typecheck**

```bash
npx tsc --noEmit
```
Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add src/components/startupjobs/sections/ProductTriptych.tsx
git commit -m "perf: video preload=none v ProductTriptych — lazy load bandwidth"
```

---

## Task 9: Fix-09 — Smazat nepoužívanou SectionNav komponentu

**Files:**
- Delete: `src/components/startupjobs/layout/SectionNav.tsx`

- [ ] **Krok 1: Ověř že SectionNav není nikde importována**

```bash
grep -r "SectionNav" src/
```

Očekávaný výstup: pouze definice v samotném souboru, žádný import jinde.

- [ ] **Krok 2: Smaž soubor**

```bash
rm src/components/startupjobs/layout/SectionNav.tsx
```

- [ ] **Krok 3: Typecheck**

```bash
npx tsc --noEmit
```
Očekávaný výstup: žádné chyby (soubor nebyl importován, TypeScript o něm neví).

- [ ] **Krok 4: Commit**

```bash
git add -A
git commit -m "chore: smazat nepoužívanou SectionNav komponentu"
```

---

## Závěrečný browser test

Po dokončení všech 9 tasků:

- [ ] Spusť `pnpm dev` a otevři `/cs/startupjobs`
- [ ] Spusť `browser-test` skill — ověř 3 viewporty (375px, 768px, 1440px)
- [ ] Ruční checklist:
  - [ ] Klik na „Otevřít" v Hero kartě → scrolluje na CaseStudies sekci
  - [ ] Klik na „Stáhnout vzor (PDF)" → zahájí download (nebo vrátí 404 dokud není PDF dodáno — to je ok)
  - [ ] CoBrandBlock je viditelný hned po Hero bez scrollování
  - [ ] OutcomeStrip ukazuje 365.bank / Expando / Vodafone náborová čísla
  - [ ] ManifestoBreak CTA říká „Chci taková čísla"
  - [ ] General Sans font se načte bez FOUC

---

## Pre-launch checklist (před spuštěním, mimo kód)

- [ ] Dodat `/public/startupjobs/behavera-report-preview.pdf`
- [ ] Dodat `/public/startupjobs/team/david.jpg` + odkomentovat photo v rep-data.ts
