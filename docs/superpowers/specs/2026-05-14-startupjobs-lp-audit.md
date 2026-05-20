# Audit spec: /startupjobs LP — cílené opravy (přístup B)

**Datum:** 2026-05-14  
**Stránka:** `/cs/startupjobs`  
**Cíl:** Vyplněný konzultační formulář (`#consult`)  
**Traffic:** Cold — StartupJobs banner/email kampaň  
**Cílovka:** HR manažer/ředitel + senior recruiter (B2B, firmy 50–5 000 lidí)

---

## Rozsah

Zachovat stávající strukturu a design systém. Opravit konkrétní konverzní a důvěryhodnostní mezery identifikované auditem. Žádné přepisování komponent od základu.

---

## Úpravy seřazené podle priority

### 🔴 Kritické — blokují konverzi nebo důvěru

---

#### Fix-01: Broken `#expando-case` anchor v Hero

**Soubor:** `src/components/startupjobs/sections/Hero.tsx:561`  
**Problém:** `<a href="#expando-case">` odkazuje na element, který na stránce neexistuje. Klik buď přeskočí na top, nebo se nic nestane.  
**Oprava:** Změnit href na `#cases` (CaseStudies sekce má `id="cases"`) nebo na `#consult`. Doporučuji `#cases` — „Celý příběh" logicky vede k dalším case studies.  
**Soubor ke změně:** `Hero.tsx` řádek 561 — `href="#expando-case"` → `href="#cases"`

---

#### Fix-02: Zavádějící „Stáhnout vzor (PDF)" CTA v ReportPreview

**Soubor:** `src/components/startupjobs/sections/ReportPreview.tsx:52`  
**Problém:** Tlačítko říká „Stáhnout vzor (PDF)" ale odkazuje na `#consult`. Uživatel očekává download, dostane formulář — friction a ztráta důvěry.  
**Oprava (varianta A — doporučeno):** Přejmenovat na „Domluvit konzultaci" + ponechat `href="#consult"`. Sjednotí se s ostatními primary CTA na stránce.  
**Oprava (varianta B):** Připravit skutečný PDF soubor (`/startupjobs/behavera-report-preview.pdf`) a změnit href na přímý download. Vyžaduje existující PDF asset.  
**Soubor ke změně:** `ReportPreview.tsx` řádek 52–55

---

#### Fix-03: Chybějící foto repa v `#consult` sekci

**Soubor:** `src/components/startupjobs/sections/rep-data.ts:8`  
**Problém:** `photo` pole je zakomentované — zobrazuje se prázdný avatar s iniciálami. Na LP, kde je „nula obchodního tlaku" hlavní argument, chybějící reálná fotka oslabuje osobnost a důvěryhodnost.  
**Oprava:** Dodat fotografii do `/public/startupjobs/team/david.jpg` a odkomentovat `photo` v rep-data.ts.  
**Soubor ke změně:** `rep-data.ts` řádek 8 (odkomentovat po dodání fotky)

---

### 🟠 Střední priorita — dopad na konverzi a relevanci

---

#### Fix-04: Přesunout CoBrandBlock hned za Hero

**Soubor:** `src/app/[locale]/startupjobs/page.tsx:90–100`  
**Problém:** Cold návštěvník z StartupJobs banneru přijde s otázkou „co to je a proč mi to StartupJobs posílá?". CoBrandBlock („Proč StartupJobs × Behavera") přichází až jako sekce 07 — za 8 sekcemi obsahu. Odpověď na základní kontext přichází příliš pozdě.  
**Oprava:** Přesunout `<CoBrandBlock />` v page.tsx bezprostředně za `<Hero />`, před `<PainSection />`.  
**Nové pořadí:**
```
Hero → CoBrandBlock → PainSection → ProductTriptych → ProductDemo
→ ReportPreview → SolutionSection → ManifestoBreak → CaseStudies
→ ProcessSection → FaqSection → OutcomeStrip → FinalCta
```
**Soubor ke změně:** `page.tsx` — přesunout jeden řádek importu a jeden JSX řádek

---

#### Fix-05: OutcomeStrip — swapnout na HR-relevantní metriky

**Soubor:** `src/components/startupjobs/sections/OutcomeStrip.tsx:14–36`  
**Problém:** Aktuální 3 čísla jsou Valxon (+25 % spokojenost zaměstnanců), 365.bank (−14 % fluktuace), Expando (+37 % prodejů klienta). Valxon a Expando jsou engagement/sales příběhy — HR manažer cílící na nábor si tu nespojí relevanci.  
**Oprava:** Swapnout na 3 čísla přímo relevantní náborovému HR:
- 365.bank: `−36 %` · Rychlejší náborový proces (je v CaseStudies datech)
- Expando: `67 → 91 %` · 12mo retention (je ve validovaných Hero datech)
- Vodafone: `−40 %` · Fluktuace zaměstnanců (je v CaseStudies datech)

**Soubor ke změně:** `OutcomeStrip.tsx` — OUTCOMES array, řádky 14–36

---

#### Fix-06: Fontshare CSS přesunout do root layoutu

**Soubor:** `src/app/[locale]/startupjobs/page.tsx:77–82`  
**Problém:** `<link rel="preconnect">` a `<link rel="stylesheet">` jsou uvnitř JSX komponentu, renderují se do `<body>` místo `<head>`. Browser loaduje font blokujícím způsobem po parsování body. Reálný dopad: FOUC na pomalých připojeních, suboptimální LCP.  
**Oprava:** Přesunout preconnect + stylesheet tagy do `src/app/[locale]/layout.tsx` — ale pouze podmíněně pro `/startupjobs` route (font General Sans je specifický pro tuto LP, nechceme ho loadovat globálně).  
**Implementace:** V `layout.tsx` přidat podmínku na základě pathname, nebo vytvořit samostatný `src/app/[locale]/startupjobs/layout.tsx` s fontem v `<head>`.  
**Doporučeno:** Nový `startupjobs/layout.tsx` — izolovaný, čistý, Next.js pattern.

---

### 🟡 Nízká priorita — UX a copy zlepšení

---

#### Fix-07: ManifestoBreak — posílit CTA

**Soubor:** `src/components/startupjobs/sections/ManifestoBreak.tsx:70–91`  
**Problém:** „Ukažte mi, jak →" je příliš pasivní CTA pod nejsilnější emocionální větou na stránce. Emocionální vrchol by měl mít akční výzvu.  
**Oprava:** Změnit text na „Chci taková čísla →" nebo „Ukažte mi, jak na to →". Href ponechat `#consult`.  
**Soubor ke změně:** `ManifestoBreak.tsx` řádek 82

---

#### Fix-08: Video lazy load v ProductTriptych

**Soubor:** `src/components/startupjobs/sections/ProductTriptych.tsx:219–233`  
**Problém:** `<video autoPlay>` s `preload="metadata"` spouští síťový požadavek na video soubor hned při načtení stránky. Na mobilní síti = zbytečný bandwidth pro uživatele, kteří se k sekci nikdy nedostanou.  
**Oprava:** Změnit `preload="metadata"` na `preload="none"` + přidat IntersectionObserver logiku — video se začne načítat až když je v viewportu. Nebo jako jednoduchá varianta: `preload="none"` a přijmout, že první frame bude prázdný dokud se video nenačte (poster image to zakryje).  
**Soubor ke změně:** `ProductTriptych.tsx` řádek 224 — `preload="metadata"` → `preload="none"`

---

### 🟢 Cleanup

---

#### Fix-09: Smazat nepoužívanou SectionNav komponentu

**Soubor:** `src/components/startupjobs/layout/SectionNav.tsx`  
**Problém:** Komponenta existuje ale není importována ani použita nikde v page.tsx ani jinde. Dead code.  
**Oprava:** Smazat soubor.

---

## Co se nemění

- Veškerý design systém (CSS proměnné, animace, grainy efekty)
- Všechna validovaná čísla v PainSection a Hero ExpandoCaseCard
- Pořadí sekcí kromě přesunu CoBrandBlock
- Struktura formuláře v FinalCta
- FAQ obsah

---

## Úspěch vypadá takto

- Klik na „Otevřít" v Hero kartě skočí na smysluplný cíl
- „Stáhnout vzor" CTA neklame o tom, co se stane
- Návštěvník z StartupJobs vidí „Proč StartupJobs × Behavera" do 10 sekund scrollování
- Rep foto je reálná osoba, ne initials placeholder
- Fonty se loadují bez FOUC
- OutcomeStrip ukazuje náborová čísla, ne engagement/sales
