# Startupjobs LP — Report Download Gate

**Date:** 2026-05-25
**Scope:** Pouze LP startupjobs (`/startupjobs` cobrand). Nedotýká se behavera.com ani diagnostiky.
**Author:** brainstormed with Claude

## Problém

Aktuální stav LP startupjobs:

- Hero CTA „Stáhnout vzor reportu" jen scrolluje na `#report` (ReportSection).
- `ReportSection` obsahuje inline `<ReportForm>` se **3 poli** (email, telefon, firma) bez vysvětlení proč jednotlivá pole chceme. Chybí jméno.
- Není žádný modal, žádné helper texty.

To je špatně ze dvou důvodů:

1. **Friction přes ztrátu kontextu** — scroll z Hero do ReportSection ztrácí scroll pozici a tříští pozornost. Část lidí klikne a opustí formulář dřív, než vůbec dolu doscrolluje.
2. **Slabá kvalifikace + slabá důvěra** — bez jména je auto-reply email neosobní, a bez helper textů uživatel neví proč chceme telefon, což je typický friction killer field.

## Cíl

Report nelze stáhnout bez kontaktu. Lead capture form má 4 pole (jméno, e-mail, telefon, firma), každé pole má always-visible helper text, který vysvětluje **proč** to chceme a **co (ne)uděláme**.

Hero CTA otevírá **modal** s tím samým formulářem (rychlá konverze in-context). ReportSection si nechává inline form pro lidi, kteří k němu dojdou organicky.

## Architektura

Jeden form, dvě prezentační varianty, sdílená komponenta.

```
┌─────────────────────────────────────────────────────────────┐
│ Hero (Hero.tsx)                                             │
│   CTA "Stáhnout vzor reportu" → <button onClick={openModal}>│
│                                            │                │
│                                            ▼                │
│                                  <Modal>                    │
│                                    <ReportForm              │
│                                      variant="modal"        │
│                                    />                       │
│                                  </Modal>                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ReportSection (#report)                                     │
│   <ReportForm variant="inline" />                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FinalCta (#consult)                                         │
│   <ConsultForm />   ← beze změny, čistě konzultační         │
└─────────────────────────────────────────────────────────────┘

POST /api/leads { source: "startupjobs-report", name, email, phone, company }
  → existující route, jen rozšířit Slack message + email templates o `name`
```

## Komponenty

### 1. `src/components/startupjobs/ui/Modal.tsx` (nová)

Lightweight wrapper kolem nativního `<dialog>` elementu. Žádné externí dependencies.

**Props:**
- `open: boolean`
- `onClose: () => void`
- `labelledBy?: string` — id elementu uvnitř, který slouží jako accessible name
- `children: React.ReactNode`

**Chování:**
- Otevírá se přes `dialogRef.current.showModal()` (native focus trap zdarma)
- ESC zavírá (native dialog behavior)
- Klik na backdrop zavírá (vlastní handler — kontrola `e.target === dialogRef.current`)
- Viditelný `×` close button vpravo nahoře, 16×16, `aria-label="Zavřít"`
- Po zavření vrací focus na element, který modal otevřel (uloženo přes `document.activeElement` před `showModal`)
- Respektuje `prefers-reduced-motion`: animace fade+scale 180ms vs. okamžité zobrazení
- Backdrop: `rgba(8, 10, 24, 0.72)` + `backdrop-filter: blur(8px)` (přes `::backdrop`)
- Body scroll lock: native `<dialog>` to dělá samo

**Stylování:** inline styles + jeden malý styled blok pro `::backdrop` a `dialog[open]` (nativní pseudo-element). Match dark theme LP startupjobs.

### 2. `src/components/startupjobs/sections/ReportForm.tsx` (edit)

**Nové props:**
- `variant?: "inline" | "modal"` — default `"inline"`

**Nové stavy:**
- `name: string` — povinné pole

**Změny v UI:**
- Pořadí polí: **Jméno · E-mail · Telefon · Firma** (sm:grid-cols-2)
- Jméno: `sm:col-span-2`, ostatní podle gridu
- Pod každým inputem **always-visible helper text** (10–11px, mono font, `rgba(255,255,255,0.5)`, letter-spacing 0.14em)
- Při `variant="modal"`: větší vertikální spacing mezi poli (`gap-4` místo `gap-3`), submit button 100% width
- Při `variant="inline"`: zachovat současný tight layout

**Helper texty (final, validované):**

| Pole       | Helper text                                                                                       |
|------------|---------------------------------------------------------------------------------------------------|
| Jméno      | „Abychom vám psali jménem, ne jako 'Vážený zákazníku'."                                           |
| E-mail     | „Sem dorazí link na report. Žádný newsletter, žádný spam."                                        |
| Telefon    | „Občas se ozveme s krátkým dotazem, jestli vše dorazilo a report dává smysl. Žádné cold cally."   |
| Firma      | „Behavera dává smysl od ~50 zaměstnanců nahoru. Pokud jste menší, řekneme to upřímně."            |

**Validace:**
- Klient: HTML5 `required` na všech 4 polích, `type="email"`, `type="tel"`
- Žádný regex nad rámec native HTML5 — tel akceptuje jakýkoliv formát
- Submit disabled dokud nejsou všechna 4 pole vyplněná

**Submit payload (rozšířený):**
```json
{
  "name": "Jan Novák",
  "email": "jan@firma.cz",
  "phone": "+420 777 123 456",
  "company": "Firma s.r.o.",
  "source": "startupjobs-report"
}
```

**Success state:** zůstává jako dnes („Hotovo. Link na report vám pošleme do 24 hodin."), jen v modal variantě s větším paddingem a vycentrovaným textem.

**Trust strip:** zachovat existující mono caption pod formem („ŽÁDNÝ SPAM · POUZE 1 E-MAIL S LINKEM NA REPORT").

### 3. `src/components/startupjobs/sections/Hero.tsx` (edit)

- Aktuální `<a href="#report" className="sj-btn-outline-xl">Stáhnout vzor reportu</a>` na řádku 104 → `<button>` s `onClick` otevírající modal
- Lokální `useState<boolean>` pro `reportModalOpen` (Hero už je client component, žádná konverze není potřeba)
- Renderovat `<Modal open={reportModalOpen} onClose={() => setReportModalOpen(false)} labelledBy="report-modal-title"><ReportForm variant="modal" /></Modal>` na konci JSX stromu Hero
- Modal header: `<h2 id="report-modal-title">Stáhnout vzor reportu</h2>` + krátký podtitul „PDF s reálným anonymizovaným reportem. Dorazí do 24 hodin."

### 4. `src/app/api/leads/route.ts` (edit)

- Validate a sanitize `body.name` pro source `startupjobs-report` (dnes `sanitize` exists, jen přidat field)
- Update `buildSlackMessage` pro `startupjobs-report`: přidat řádek `Jméno: ${body.name ?? "neuvedeno"}` (nad email)
- `LeadBody` type v `lib/integrations/lead-types.ts`: ujistit se, že `name?: string` existuje (pravděpodobně už existuje pro consult, ověřit)

### 5. `src/lib/integrations/email-templates.ts` (edit)

- `autoReplyEmail` pro `startupjobs-report`: oslovení `Ahoj {name}` místo generického
- `internalEmail` pro `startupjobs-report`: přidat `name` mezi metadata
- `pipedriveLeadInput` pro `startupjobs-report`: `name` jako primary contact name (dnes pravděpodobně používá `email.split("@")[0]` nebo podobně — vylepšení)

### 6. ReportSection — beze změny strukturálně

ReportSection (`#report`) nadále renderuje `<ReportForm />` (default `variant="inline"`). Form si vezme nové jméno pole a helper texty automaticky.

### 7. FinalCta — beze změny

Zůstává čistě konzultační. Žádný cross-link na report download.

## Data flow

1. User klikne Hero „Stáhnout vzor reportu" → `setReportModalOpen(true)`
2. Modal se otevře, `<ReportForm variant="modal" />` se mountuje, focus jde na první input (jméno)
3. User vyplní 4 pole, klikne „Stáhnout report zdarma"
4. `fetch("/api/leads", { POST, body: {name, email, phone, company, source: "startupjobs-report"} })`
5. Server:
   - Sanitize všech polí
   - Slack webhook → internal notification (jméno + email + tel + firma)
   - SendGrid → auto-reply user (oslovení jménem)
   - SendGrid → internal email (david.skoupy@behavera.com)
   - Pipedrive → create lead s jménem jako contact name
6. Server response 200 → ReportForm přepne na `submitted: true` → success message v modalu
7. User klikne × nebo ESC → modal se zavře, focus zpět na Hero CTA

## Error handling

- Network error: existující error state v ReportForm ("Nepodařilo se odeslat. Zkuste to prosím znovu.") + červený text pod tlačítkem
- Server 4xx/5xx: stejný error state
- Třetí strany (Slack/SendGrid/Pipedrive) failují tiše na serveru — user vidí success pokud route vrátí 200; logging jde do server logs (existující chování v route.ts, neměníme)
- Modal: pokud user zavře během loading state, `setLoading(false)` při unmount NENÍ potřeba — submit běží nezávisle, user prostě jen nevidí výsledek. Akceptovatelný edge case.

## Accessibility

- Native `<dialog>` poskytuje focus trap, ARIA role="dialog", aria-modal=true
- `aria-labelledby="report-modal-title"` na `<dialog>`
- Close button: `aria-label="Zavřít"`
- Všechna pole mají `aria-label` (dnes mají placeholder + aria-label — zachovat) + propojený helper text přes `aria-describedby="{field}-help"`
- ESC zavírá (native), backdrop klik zavírá, viditelný × zavírá — 3 cesty úniku
- Tab pořadí: jméno → email → tel → firma → submit → × (přirozené)
- `prefers-reduced-motion`: vypnout fade+scale animaci, instantní show/hide

## Performance

- Žádné nové dependencies (native `<dialog>`)
- Modal komponenta < 100 řádků kódu
- ReportForm se renderuje jen když je modal otevřený (conditional render na `open && <ReportForm />`) — žádný layout cost při zavřeném modalu
- Backdrop blur je GPU-accelerated, žádný impact na scroll perf při zavřeném modalu

## Konzistence s LP startupjobs design

- **Buttons:** `sj-btn-on-dark` pro submit (existující), `sj-btn-outline-xl` zůstává pro Hero CTA visual (jen `<a>` → `<button>`)
- **Glass cards:** `rgba(255,255,255,0.04)` bg + `rgba(255,255,255,0.18)` border — match `inputStyle` v ReportForm
- **Mono captions:** font-family `var(--font-mono)`, 10–11px, uppercase je nepoužitelné na celé věty helper textů — necháme **sentence case** mono, jen menší font (10–11px) a letter-spacing 0.14em (mírnější než stávající 0.16em pro caps)
- **Colors:** používat `var(--color-purple-deep)`, `var(--sj-signal-green)` jen pokud potřeba pro accenty. Modal sám zůstává neutrální dark glass.
- **Animation:** delay tokens `--sj-delay` ne potřeba — modal je instant (180ms fade), ne staggered reveal

## Testování

**Manual checklist před hlášením "hotovo":**

1. `pnpm typecheck` — passes
2. `pnpm build` — passes
3. `browser-test` skill na `/startupjobs` — všechny 3 viewporty (375, 768, 1440) — modal otevírání, layout formuláře v modalu, helper texty čitelné
4. Manuální flow:
   - Klik Hero „Stáhnout vzor reportu" → modal se otevře
   - Vyplnit 4 pole → submit → success state v modalu
   - Ověřit v dev consoli, že payload obsahuje `name`
   - Klik × → modal se zavře, focus zpět na Hero button
   - ESC test, backdrop klik test
   - Mobile: modal vyplní viewport, scroll uvnitř modalu funguje
5. `curl -X POST localhost:3000/api/leads -H "Content-Type: application/json" -d '{"name":"Test","email":"t@t.cz","phone":"123","company":"Test","source":"startupjobs-report"}'` → 200, Slack message obsahuje jméno
6. Reduced motion: macOS Settings → Accessibility → Reduce motion ON → modal se objevuje instantně

## Out of scope

- ConsultForm změny — FinalCta zůstává jak je
- Validace telefonu nad rámec HTML5 (no regex, no maska, no ARES autocomplete)
- A/B testing framework pro porovnání modal vs. inline-only — pokud chceme měřit, řeší se přes GA event tracking (klik na CTA, klik na submit) — to už dnes pravděpodobně existuje (ověřit v plan fázi)
- Cross-link z FinalCta na report modal
- Multi-step form (chceme single-step, 4 pole najednou)
- GDPR checkbox (helper text + mono trust strip nahrazují explicit consent — pokud legal vyžaduje, řeší se separátně)

## Souhrn diff

| Soubor | Typ | Důvod |
|---|---|---|
| `src/components/startupjobs/ui/Modal.tsx` | nový | reusable native `<dialog>` wrapper |
| `src/components/startupjobs/sections/ReportForm.tsx` | edit | + name field, helper texty, variant prop |
| `src/components/startupjobs/sections/Hero.tsx` | edit | CTA → button, modal state, render `<Modal>` |
| `src/app/api/leads/route.ts` | edit | Slack message + sanitize name pro report source |
| `src/lib/integrations/email-templates.ts` | edit | osobní oslovení v auto-reply + Pipedrive contact name |
