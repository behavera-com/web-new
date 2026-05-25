# Startupjobs LP — Report Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hero CTA „Stáhnout vzor reportu" otevírá modal s 4-polovým formulářem (jméno, e-mail, telefon, firma) s always-visible helper texty pod každým inputem. Inline `ReportForm` v `ReportSection` dostane stejné upgrady.

**Architecture:** Jeden `<ReportForm>` se dvěma prezentačními variantami (`inline` / `modal`), sdílený mezi Hero modalem a ReportSection. Native `<dialog>` element jako Modal wrapper (žádné dependencies). Backend `/api/leads` už `name` field zná v typech — jen rozšířit Slack zprávu a HTML emaily.

**Tech Stack:** Next.js 16.2.2, React 19.2.4, Tailwind v4, native HTML `<dialog>`. Žádný test framework v projektu — verifikace přes `pnpm typecheck`, `pnpm build`, browser-test skill, curl smoke testy.

**Source spec:** [`docs/superpowers/specs/2026-05-25-startupjobs-report-gate-design.md`](../specs/2026-05-25-startupjobs-report-gate-design.md)

---

## Task 1: Vytvořit `<Modal>` komponentu (native `<dialog>` wrapper)

**Files:**
- Create: `src/components/startupjobs/ui/Modal.tsx`

- [ ] **Step 1.1: Vytvořit Modal.tsx**

Create `src/components/startupjobs/ui/Modal.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      triggerRef.current = (document.activeElement as HTMLElement) ?? null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      triggerRef.current?.focus?.();
      triggerRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      aria-modal="true"
      className="sj-modal"
      onClose={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Zavřít"
        className="sj-modal-close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      <div className="sj-modal-body">{children}</div>
    </dialog>
  );
}
```

- [ ] **Step 1.2: Přidat Modal CSS do global stylesheetu**

Najít, kam patří sj- styly. Hledat existující sj- CSS:

```bash
grep -rn "sj-btn-on-dark\|sj-report-tile" src/ --include="*.css" | head
```

Otevřít první nalezený CSS soubor (pravděpodobně `src/app/globals.css` nebo `src/styles/startupjobs.css`) a přidat na konec:

```css
.sj-modal {
  border: 0;
  padding: 0;
  margin: auto;
  max-width: 560px;
  width: calc(100% - 32px);
  background: linear-gradient(180deg, #0d0f23 0%, #14132e 100%);
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  overflow: visible;
  position: relative;
}

.sj-modal::backdrop {
  background: rgba(8, 10, 24, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.sj-modal-body {
  padding: 32px 28px 28px;
}

.sj-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}

.sj-modal-close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

@media (prefers-reduced-motion: no-preference) {
  .sj-modal[open] {
    animation: sj-modal-in 180ms ease-out;
  }
  .sj-modal[open]::backdrop {
    animation: sj-backdrop-in 180ms ease-out;
  }
  @keyframes sj-modal-in {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes sj-backdrop-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
```

- [ ] **Step 1.3: Typecheck**

Run: `pnpm typecheck` (nebo `pnpm tsc --noEmit` pokud `typecheck` script chybí)

Expected: PASS — žádná TS chyba. Pokud `typecheck` script v `package.json` chybí, použij přímo `pnpm exec tsc --noEmit`.

- [ ] **Step 1.4: Commit**

```bash
git add src/components/startupjobs/ui/Modal.tsx
# + příslušný CSS soubor
git commit -m "feat(startupjobs): add <Modal> ui primitive (native <dialog>)"
```

---

## Task 2: Upgrade `<ReportForm>` — přidat jméno + helper texty + variant prop

**Files:**
- Modify: `src/components/startupjobs/sections/ReportForm.tsx`

- [ ] **Step 2.1: Rewritnout ReportForm**

Replace celý obsah `src/components/startupjobs/sections/ReportForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";

type ReportFormProps = {
  variant?: "inline" | "modal";
};

const FIELD_HELP: Record<"name" | "email" | "phone" | "company", string> = {
  name: "Abychom vám psali jménem, ne jako „Vážený zákazníku".",
  email: "Sem dorazí link na report. Žádný newsletter, žádný spam.",
  phone:
    "Občas se ozveme s krátkým dotazem, jestli vše dorazilo a report dává smysl. Žádné cold cally.",
  company:
    "Behavera dává smysl od ~50 zaměstnanců nahoru. Pokud jste menší, řekneme to upřímně.",
};

export default function ReportForm({ variant = "inline" }: ReportFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !company || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          source: "startupjobs-report",
        }),
      });
      if (!res.ok) throw new Error("network");
      setSubmitted(true);
    } catch {
      setError("Nepodařilo se odeslat. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="inline-flex items-center gap-2"
        style={{ fontSize: 15, color: "rgba(255,255,255,0.95)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 7.5l3 3 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Hotovo. Link na report vám pošleme do 24 hodin.</span>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    fontSize: 14,
  };

  const helpStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 10.5,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.04em",
    marginTop: 6,
    lineHeight: 1.5,
  };

  const gridGap = variant === "modal" ? "gap-4" : "gap-3";
  const maxW = variant === "modal" ? "" : "max-w-[560px]";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`grid sm:grid-cols-2 ${gridGap} ${maxW}`}
      >
        <div className="sm:col-span-2">
          <input
            id="rf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jméno a příjmení"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="Jméno a příjmení"
            aria-describedby="rf-name-help"
          />
          <p id="rf-name-help" style={helpStyle}>
            {FIELD_HELP.name}
          </p>
        </div>

        <div className="sm:col-span-2">
          <input
            id="rf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vase@firma.cz"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="E-mail"
            aria-describedby="rf-email-help"
          />
          <p id="rf-email-help" style={helpStyle}>
            {FIELD_HELP.email}
          </p>
        </div>

        <div>
          <input
            id="rf-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="Telefon"
            aria-describedby="rf-phone-help"
          />
          <p id="rf-phone-help" style={helpStyle}>
            {FIELD_HELP.phone}
          </p>
        </div>

        <div>
          <input
            id="rf-company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Název firmy"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="Název firmy"
            aria-describedby="rf-company-help"
          />
          <p id="rf-company-help" style={helpStyle}>
            {FIELD_HELP.company}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="sj-btn-on-dark sm:col-span-2 justify-center disabled:opacity-60"
        >
          {loading ? "Odesílám…" : "Stáhnout report zdarma"}
          <ArrowRightIcon />
        </button>
      </form>
      {error && (
        <p className="mt-3 text-sm" style={{ color: "#fca5a5" }}>
          {error}
        </p>
      )}
      <p
        className="mt-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.16em",
        }}
      >
        ŽÁDNÝ SPAM · POUZE 1 E-MAIL S LINKEM NA REPORT
      </p>
    </>
  );
}
```

- [ ] **Step 2.2: Typecheck + lint**

Run: `pnpm typecheck && pnpm lint`

Expected: PASS. Žádný TS/ESLint error. Pokud `pnpm typecheck` script není v `package.json`, použij `pnpm exec tsc --noEmit`.

- [ ] **Step 2.3: Build smoke test**

Run: `pnpm build`

Expected: Build prochází. Stránka `/startupjobs` (nebo `/[locale]/startupjobs`) se zkompiluje. Pokud build padne, dříve než řešit, podívej se na error — `framer-motion` / `next-intl` errors nejsou způsobeny touto změnou.

- [ ] **Step 2.4: Commit**

```bash
git add src/components/startupjobs/sections/ReportForm.tsx
git commit -m "feat(startupjobs): ReportForm — přidat jméno + helper texty + variant prop"
```

---

## Task 3: Wire Hero CTA na modal

**Files:**
- Modify: `src/components/startupjobs/sections/Hero.tsx`

- [ ] **Step 3.1: Najít a přečíst Hero.tsx kolem řádku 104**

Run:

```bash
grep -n "Stáhnout vzor reportu\|#report\|sj-btn-outline-xl" src/components/startupjobs/sections/Hero.tsx
```

Confirm: řádek ~104 obsahuje `<a href="#report" className="sj-btn-outline-xl">Stáhnout vzor reportu</a>`. Pokud řádek se posunul, použij Edit s exact string match.

- [ ] **Step 3.2: Přidat importy na top Hero.tsx**

V `src/components/startupjobs/sections/Hero.tsx` na top of file (k existujícím importům):

```tsx
import { useState } from "react";
import Modal from "../ui/Modal";
import ReportForm from "./ReportForm";
```

Pokud `useState` už importovaný, neduplikuj.

Pokud Hero.tsx není označen `"use client"` direktivou, přidej na první řádek souboru:

```tsx
"use client";
```

(Zkontrolovat: `head -1 src/components/startupjobs/sections/Hero.tsx` — Hero používá `onMouseMove` a interaktivní stavy, takže client component už pravděpodobně je.)

- [ ] **Step 3.3: Přidat state hook do Hero komponenty**

Najít `export default function Hero()` (nebo podobnou signaturu). Hned po `function Hero() {` přidat:

```tsx
const [reportModalOpen, setReportModalOpen] = useState(false);
```

- [ ] **Step 3.4: Změnit Hero CTA `<a>` → `<button>`**

V `src/components/startupjobs/sections/Hero.tsx` najít a nahradit:

**Old:**
```tsx
<a href="#report" className="sj-btn-outline-xl">
  Stáhnout vzor reportu
</a>
```

**New:**
```tsx
<button
  type="button"
  onClick={() => setReportModalOpen(true)}
  className="sj-btn-outline-xl"
>
  Stáhnout vzor reportu
</button>
```

(Případný `aria-` atribut a `style={...}` z původního `<a>` zachovat — exact replace.)

- [ ] **Step 3.5: Renderovat Modal na konci Hero JSX**

Najít closing tag root JSX elementu Hero komponenty (poslední `</section>` nebo `</div>` před `</>` fragment closing). **Přímo před tento closing tag** přidat:

```tsx
<Modal
  open={reportModalOpen}
  onClose={() => setReportModalOpen(false)}
  labelledBy="report-modal-title"
>
  <h2
    id="report-modal-title"
    style={{
      margin: 0,
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "#fff",
    }}
  >
    Stáhnout vzor reportu
  </h2>
  <p
    style={{
      margin: "8px 0 24px",
      fontSize: 14,
      color: "rgba(255,255,255,0.65)",
      lineHeight: 1.5,
    }}
  >
    PDF s reálným anonymizovaným reportem. Dorazí na váš e-mail do 24 hodin.
  </p>
  <ReportForm variant="modal" />
</Modal>
```

- [ ] **Step 3.6: Typecheck + lint**

Run: `pnpm typecheck && pnpm lint`

Expected: PASS.

- [ ] **Step 3.7: Build smoke test**

Run: `pnpm build`

Expected: PASS.

- [ ] **Step 3.8: Commit**

```bash
git add src/components/startupjobs/sections/Hero.tsx
git commit -m "feat(startupjobs): Hero CTA „Stáhnout report\" otevírá modal místo scrollu"
```

---

## Task 4: Backend — `name` ve Slack zprávě + osobní oslovení v emailech

**Files:**
- Modify: `src/app/api/leads/route.ts`
- Modify: `src/lib/integrations/email-templates.ts`

- [ ] **Step 4.1: Slack zpráva pro `startupjobs-report` — přidat řádek Jméno**

V `src/app/api/leads/route.ts` najít blok `if (source === "startupjobs-report")` uvnitř `buildSlackMessage`. Aktuálně vrací:

```ts
return (
  `📄 Žádost o report zdarma (LP Behavera + StartupJobs)!\n` +
  `Email: ${body.email ?? "neuvedeno"}\n` +
  `Telefon: ${body.phone ?? "neuvedeno"}\n` +
  `Firma: ${body.company ?? "neuvedeno"}`
);
```

Nahradit za:

```ts
return (
  `📄 Žádost o report zdarma (LP Behavera + StartupJobs)!\n` +
  `Jméno: ${body.name ?? "neuvedeno"}\n` +
  `Email: ${body.email ?? "neuvedeno"}\n` +
  `Telefon: ${body.phone ?? "neuvedeno"}\n` +
  `Firma: ${body.company ?? "neuvedeno"}`
);
```

- [ ] **Step 4.2: Ověřit, že route.ts sanitizuje `name` field**

Run:

```bash
grep -n "sanitize\|body.name" src/app/api/leads/route.ts
```

Hledat, zda `body.name` projde stejnou sanitizací jako ostatní pole (řez na 200 znaků, strip newlines). Pokud route má pattern typu:

```ts
const name = sanitize(rawBody.name);
const email = sanitize(rawBody.email);
// ...
```

Ověřit, že `name` je v seznamu. Pokud chybí, přidat. Pokud route používá `body.name` přímo bez sanitize (a sanitize se aplikuje uvnitř buildSlackMessage / email templates), nech to být — sanitizace je `escape()` v email-templates.

(Pokud route sanitizuje pole jen pro některé sources, neměnit logiku — `name` je nový jen v reportu, ale type `LeadBody.name?` existoval pro `consult`. Konzistence: sanitizace má být aplikována stejně oběma source-typum.)

- [ ] **Step 4.3: `internalEmail` pro report — přidat řádek Jméno**

V `src/lib/integrations/email-templates.ts` najít blok `if (src === "startupjobs-report")` uvnitř `internalEmail`. Aktuálně řádky 72–83:

```ts
if (src === "startupjobs-report") {
  const subject = `📄 Žádost o report — ${body.company ?? body.email ?? "?"}`;
  const inner = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:${INK};">Žádost o report zdarma</h1>
    <p style="margin:0 0 24px;color:${MUTED};font-size:14px;">LP Behavera + StartupJobs</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("E-mail", escape(body.email))}
      ${row("Telefon", escape(body.phone))}
      ${row("Firma", escape(body.company))}
    </table>`;
  return { subject, html: wrapHtml(subject, inner), text: internalText(body) };
}
```

Nahradit za:

```ts
if (src === "startupjobs-report") {
  const subject = `📄 Žádost o report — ${body.company ?? body.name ?? body.email ?? "?"}`;
  const inner = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:${INK};">Žádost o report zdarma</h1>
    <p style="margin:0 0 24px;color:${MUTED};font-size:14px;">LP Behavera + StartupJobs</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Jméno", escape(body.name))}
      ${row("E-mail", escape(body.email))}
      ${row("Telefon", escape(body.phone))}
      ${row("Firma", escape(body.company))}
    </table>`;
  return { subject, html: wrapHtml(subject, inner), text: internalText(body) };
}
```

- [ ] **Step 4.4: `autoReplyEmail` pro report — osobní oslovení**

V `src/lib/integrations/email-templates.ts` najít blok `if (src === "startupjobs-report")` uvnitř `autoReplyEmail`. Aktuálně H1 zní:

```ts
<h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:${INK};letter-spacing:-0.02em;">Děkujeme za zájem o ukázkový report.</h1>
```

Nahradit za:

```ts
<h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:${INK};letter-spacing:-0.02em;">Děkujeme za zájem o ukázkový report${body.name ? `, ${escape(body.name.split(" ")[0])}` : ""}.</h1>
```

(Stejný pattern jako už existuje u `startupjobs-consult` na řádku 118.)

- [ ] **Step 4.5: `autoReplyText` pro report — osobní oslovení v text variantě**

V `src/lib/integrations/email-templates.ts` najít funkci `autoReplyText` a blok pro `kind === "report"`. Aktuálně:

```ts
if (kind === "report") {
  return `Děkujeme za zájem o ukázkový report.\n\nPřipravujeme pro vás link a pošleme ho na ${body.email} během 24 hodin.\n\nKontakt: david.skoupy@behavera.com`;
}
```

Nahradit za:

```ts
if (kind === "report") {
  return `Děkujeme za zájem o ukázkový report${body.name ? `, ${body.name.split(" ")[0]}` : ""}.\n\nPřipravujeme pro vás link a pošleme ho na ${body.email} během 24 hodin.\n\nKontakt: david.skoupy@behavera.com`;
}
```

- [ ] **Step 4.6: `pipedriveLeadInput` — žádná změna**

Aktuální kód na řádku 185 už používá `personName = body.name || body.email || "Lead bez jména"`, takže Pipedrive automaticky dostane jméno když je vyplněno. **Žádná změna není potřeba.**

- [ ] **Step 4.7: Typecheck + lint**

Run: `pnpm typecheck && pnpm lint`

Expected: PASS.

- [ ] **Step 4.8: Commit**

```bash
git add src/app/api/leads/route.ts src/lib/integrations/email-templates.ts
git commit -m "feat(startupjobs): report lead — jméno do Slacku + osobní oslovení v auto-reply"
```

---

## Task 5: End-to-end verifikace

**Žádné nové soubory, jen ověření že vše funguje pohromadě.**

- [ ] **Step 5.1: Plný typecheck + lint + build**

Run:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

Expected: Vše prochází. `next build` ukáže routes — `/startupjobs` (nebo `/[locale]/startupjobs`) musí být v seznamu. Build velikost nemá výrazně narůst (Modal je < 1 KB).

- [ ] **Step 5.2: Spustit dev server**

Run:

```bash
pnpm dev
```

Otevřít LP startupjobs v prohlížeči. Zjistit přesnou URL z dev server logu (Next.js vypíše routes při kompilaci) — typicky `http://localhost:3000/cs/startupjobs` nebo `http://localhost:3000/startupjobs`.

- [ ] **Step 5.3: Browser test — všechny 3 viewporty**

Invokovat `browser-test` skill na URL z předchozího kroku. Testovací scénář:

1. Hero CTA „Stáhnout vzor reportu" je viditelné → klik → modal se otevře
2. Modal layout: nadpis, podtitul, 4 pole + helper texty pod každým, submit button
3. **Mobile 375px**: modal vyplňuje viewport s 16px gutterem, helper texty čitelné, scroll uvnitř modalu funguje, žádný horizontal overflow
4. **Tablet 768px**: pole `Telefon` a `Firma` vedle sebe v gridu
5. **Desktop 1440px**: modal vycentrovaný, max-width 560px, backdrop blur viditelný
6. Klik na × → modal zavře
7. Klik na backdrop (mimo modal box) → modal zavře
8. Otevřít znovu → stisknout ESC → modal zavře

Všechny 3 viewporty musí být ✅ než pokračovat.

- [ ] **Step 5.4: Curl smoke test backend route**

Run:

```bash
curl -i -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Tester","email":"test@example.com","phone":"+420 777 000 000","company":"Test s.r.o.","source":"startupjobs-report"}'
```

Expected: HTTP/1.1 200 OK. Response body může být prázdný nebo JSON success.

Ověřit ve výstupu serveru (terminál kde běží `pnpm dev`):
- Pokud SLACK webhook ENV je nastavený: očekávej Slack POST (200) v logu
- Pokud SendGrid ENV je nastavené: očekávej email send log
- Pokud envs chybí: error log "missing X env" — to je OK pro lokální dev

Pokud route vrací 4xx/5xx, zjistit příčinu z error logu (typicky chybějící sanitize na `name` field, nebo Zod schema nezahrnuje `name`).

- [ ] **Step 5.5: Manuální submit přes UI (full flow)**

V prohlížeči otevřít modal z Hero CTA, vyplnit 4 pole:
- Jméno: `Test Tester`
- E-mail: vlastní reálný email (pokud chceš ověřit auto-reply)
- Telefon: `+420 777 000 000`
- Firma: `Test s.r.o.`

Klik „Stáhnout report zdarma".

Ověřit:
- Tlačítko přejde do „Odesílám…" state s `opacity:0.6`
- Po response form přepne na success state „Hotovo. Link na report vám pošleme do 24 hodin."
- × close button stále viditelný
- ESC modal zavře

V DevTools Network tab: payload obsahuje všech 5 fields (`name`, `email`, `phone`, `company`, `source`).

- [ ] **Step 5.6: Reduced motion test**

macOS: System Settings → Accessibility → Display → Reduce motion → ON.

Reload stránku. Otevřít modal — modal a backdrop se objeví **instantně, bez fade/scale animace**. Vrátit setting zpět na OFF.

- [ ] **Step 5.7: Inline ReportSection still works**

Doscrollovat na `#report` sekci. ReportSection musí stále renderovat inline `<ReportForm>` se 4 poli a helper texty (variant="inline" je default). Submit musí fungovat stejně jako modal varianta.

- [ ] **Step 5.8: Hlášení výsledku**

Pokud všech 8 verification kroků prošlo zeleně:

```
✅ Verified:
- pnpm typecheck — passed
- pnpm lint — passed
- pnpm build — passed (X routes, žádná regresion)
- browser-test 375/768/1440 — passed
- curl /api/leads — 200
- Manual modal flow (Hero CTA → 4 pole + helper → submit → success → close) — passed
- prefers-reduced-motion — instant show/hide
- Inline ReportSection — passed

⚠️ Co otestovat ručně na staging/prod (vyžaduje real Slack + SendGrid + Pipedrive envs):
1. Push branch → Vercel preview
2. Ověřit, že Slack notifikace dorazila do správného kanálu s řádkem Jméno
3. Ověřit, že auto-reply email dorazí s osobním oslovením („Děkujeme za zájem o ukázkový report, Test.")
4. Ověřit, že Pipedrive lead má vyplněn `personName = "Test Tester"` (ne email)
```

Pokud cokoliv padne: zastavit, opravit, znovu spustit verifikaci.

---

## Self-Review (provedeno před handoffem)

**Spec coverage check:**

| Spec sekce | Task pokrytí |
|---|---|
| Nový `Modal.tsx` (native `<dialog>`, ESC, backdrop, ×, focus return, reduced motion) | Task 1 |
| `ReportForm` + name + helper texty + variant prop | Task 2 |
| Hero CTA → button + modal | Task 3 |
| `/api/leads` Slack message s jménem | Task 4.1 |
| `internalEmail` s řádkem Jméno | Task 4.3 |
| `autoReplyEmail` osobní oslovení | Task 4.4–4.5 |
| `pipedriveLeadInput` — already works | Task 4.6 (no-op) |
| FinalCta beze změny | (nedotčen, žádný task) |
| ReportSection beze změny strukturálně, jen ReportForm v2 | Task 2 (variant=inline default) |
| Accessibility (focus trap, aria-labelledby, aria-describedby) | Task 1 + Task 2 |
| Konzistence s sj- design tokens | Task 1 CSS, Task 2 inputStyle |
| Manuální testovací checklist | Task 5 |

**Placeholder scan:** Žádné TBD, žádné „add appropriate error handling", všechny code blocky obsahují plný kód.

**Type consistency:** `ReportFormProps.variant`, `ModalProps.{open,onClose,labelledBy,children}` — konzistentní napříč všemi tasky.

---

## Execution Handoff

Plán je dokončen a uložen do [`docs/superpowers/plans/2026-05-25-startupjobs-report-gate.md`](2026-05-25-startupjobs-report-gate.md).

**Dvě možnosti spuštění:**

1. **Subagent-Driven (doporučeno)** — dispatchuju fresh subagenta per task, review mezi tasky, rychlá iterace.
2. **Inline Execution** — projedu tasky v této session přes executing-plans, batch execution s checkpointy pro tvůj review.

Které chceš?
