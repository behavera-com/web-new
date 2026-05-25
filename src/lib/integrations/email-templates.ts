import type { LeadBody } from "./lead-types";

const SITE = "https://behavera.com";
const BRAND_PURPLE = "#2d1b69";
const INK = "#1c1237";
const MUTED = "#6b6483";
const RULE = "#e6e2ee";
const ALT = "#f6f3ff";

function wrapHtml(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${ALT};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ALT};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${RULE};border-radius:8px;overflow:hidden;">
        <tr><td style="padding:24px 32px;border-bottom:1px solid ${RULE};">
          <div style="font-weight:800;letter-spacing:-0.015em;color:${BRAND_PURPLE};font-size:18px;">behavera</div>
        </td></tr>
        <tr><td style="padding:32px;">${body}</td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid ${RULE};background:#fbfafd;color:${MUTED};font-size:12px;line-height:1.5;">
          Behavera s.r.o. · <a href="${SITE}" style="color:${MUTED};">behavera.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value?: string | number) {
  if (value === undefined || value === null || value === "") return "";
  return `<tr><td style="padding:8px 0;color:${MUTED};font-size:13px;width:160px;vertical-align:top;">${label}</td><td style="padding:8px 0;color:${INK};font-size:14px;font-weight:500;">${value}</td></tr>`;
}

function escape(s?: string) {
  if (!s) return "";
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
}

/* ============== SHARED BLOCKS ============== */

const OUTCOME_CARDS = [
  { logo: "365bank.png", brand: "365.bank", metric: "+36 %", label: "Rychlejší náborový proces" },
  { logo: "expando.png", brand: "Expando", metric: "+24 pp", label: "12mo retention nových lidí" },
  { logo: "vodafone.png", brand: "Vodafone CZ", metric: "−40 %", label: "Fluktuace zaměstnanců" },
];

function outcomesBlock(): string {
  const eyebrow = `
    <p style="margin:0 0 14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};">
      Čeho Behavera dosáhla ve skutečných firmách
    </p>`;
  const cards = OUTCOME_CARDS.map((o) => `
    <td width="33%" valign="top" style="padding:0 4px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ALT};border:1px solid ${RULE};border-radius:6px;">
        <tr><td style="padding:16px 14px 6px;height:30px;">
          <img src="${SITE}/startupjobs/logos/${o.logo}" alt="${o.brand}" height="22" style="height:22px;width:auto;display:block;opacity:0.85;">
        </td></tr>
        <tr><td style="padding:0 14px;color:${BRAND_PURPLE};font-size:28px;font-weight:600;letter-spacing:-0.02em;line-height:1;">
          ${o.metric}
        </td></tr>
        <tr><td style="padding:6px 14px 16px;color:${MUTED};font-size:11px;letter-spacing:0.04em;line-height:1.35;">
          ${o.label}
        </td></tr>
      </table>
    </td>`).join("");
  return `
    <div style="margin:28px 0 8px;">
      ${eyebrow}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;">
        <tr>${cards}</tr>
      </table>
    </div>`;
}

const TRUST_LOGOS = [
  { file: "vodafone.png", alt: "Vodafone" },
  { file: "o2.png", alt: "O2" },
  { file: "pwc.png", alt: "PwC" },
  { file: "oktagon.png", alt: "OKTAGON MMA" },
  { file: "raynet.png", alt: "Raynet" },
  { file: "365bank.png", alt: "365.bank" },
  { file: "prusa.png", alt: "Průša Research" },
  { file: "expando.png", alt: "Expando" },
];

function trustStripBlock(): string {
  const cells = TRUST_LOGOS.map((l) => `
    <td align="center" valign="middle" style="padding:8px 6px;">
      <img src="${SITE}/startupjobs/logos/${l.file}" alt="${l.alt}" height="20" style="height:20px;width:auto;display:block;opacity:0.7;">
    </td>`).join("");
  return `
    <div style="margin:24px 0 8px;padding:18px 16px;background:${ALT};border-radius:6px;text-align:center;">
      <p style="margin:0 0 12px;font-size:13px;color:${INK};font-weight:500;">
        Přidejte se k úspěšným.
      </p>
      <p style="margin:0 0 14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
        Důvěřují nám HR týmy ve firmách 50–5 000 zaměstnanců
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>${cells.slice(0, cells.length / 2 + cells.length % 2)}</tr>
        <tr>${cells.slice(cells.length / 2 + cells.length % 2)}</tr>
      </table>
    </div>`;
}

type Rep = { name: string; title: string; photo: string; email: string; phone?: string };
const REPS: Rep[] = [
  { name: "Jana", title: "Konzultantka", photo: "Jana.png", email: "hello@behavera.com", phone: "+420 605 839 456" },
  { name: "Veronika", title: "HR konzultantka", photo: "Veronika.jpg", email: "hello@behavera.com" },
  { name: "Giuseppe", title: "Konzultant", photo: "Giuseppe.jpeg", email: "hello@behavera.com" },
];

function teamBlock(intro: string): string {
  const cells = REPS.map((r) => `
    <td width="33%" valign="top" align="center" style="padding:0 6px;">
      <img src="${SITE}/startupjobs/team/${r.photo}" alt="${r.name}" width="56" height="56" style="width:56px;height:56px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 8px;">
      <div style="font-size:13px;font-weight:600;color:${INK};line-height:1.2;">${r.name}</div>
      <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};margin-top:3px;line-height:1.3;">${r.title}</div>
      ${r.phone ? `<div style="font-size:11.5px;color:${MUTED};margin-top:4px;"><a href="tel:${r.phone.replace(/\s/g, "")}" style="color:${MUTED};text-decoration:none;">${r.phone}</a></div>` : ""}
    </td>`).join("");
  return `
    <div style="margin:24px 0 8px;padding-top:20px;border-top:1px solid ${RULE};">
      <p style="margin:0 0 14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};">
        ${intro}
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>${cells}</tr>
      </table>
      <p style="margin:16px 0 0;font-size:12px;color:${MUTED};text-align:center;">
        Společný kontakt: <a href="mailto:hello@behavera.com" style="color:${BRAND_PURPLE};">hello@behavera.com</a>
      </p>
    </div>`;
}

/* ============== INTERNAL NOTIFICATIONS (to david.skoupy@behavera.com) ============== */

export function internalEmail(body: LeadBody): { subject: string; html: string; text: string } {
  const src = body.source ?? "unknown";

  if (src === "startupjobs-consult") {
    const c = body.consult ?? {};
    const subject = `🔥 Nová žádost o konzultaci — ${body.company ?? body.name ?? "?"}`;
    const inner = `
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:${INK};">Nová žádost o konzultaci</h1>
      <p style="margin:0 0 24px;color:${MUTED};font-size:14px;">LP Behavera + StartupJobs</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Jméno", escape(body.name))}
        ${row("E-mail", escape(body.email))}
        ${row("Telefon", escape(body.phone))}
        ${row("Firma", escape(body.company))}
        ${row("Zaměstnanců", c.employees)}
        ${row("Náborů ročně", c.hiresPerYear)}
        ${c.message ? row("Zpráva", escape(c.message)) : ""}
      </table>`;
    return { subject, html: wrapHtml(subject, inner), text: internalText(body) };
  }

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

  const subject = `Nový lead — ${body.email ?? "?"}`;
  return { subject, html: wrapHtml(subject, `<pre>${escape(JSON.stringify(body, null, 2))}</pre>`), text: internalText(body) };
}

function internalText(body: LeadBody): string {
  return JSON.stringify(body, null, 2);
}

/* ============== AUTO-REPLY TO LEAD ============== */

export function autoReplyEmail(body: LeadBody): { subject: string; html: string; text: string } | null {
  if (!body.email) return null;
  const src = body.source ?? "";
  const firstName = body.name ? escape(body.name.split(" ")[0]) : "";
  const salute = firstName ? `, ${firstName}` : "";

  if (src === "startupjobs-consult") {
    const subject = "Děkujeme — ozveme se do 24 hodin";
    const inner = `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:${INK};letter-spacing:-0.02em;">Děkujeme za zájem o konzultaci${salute}.</h1>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:${INK};">
        Máme vaši žádost. Někdo z našeho týmu vám pošle 2–3 termíny pro 15minutový hovor během následujících 24 hodin.
      </p>
      ${outcomesBlock()}
      ${trustStripBlock()}
      ${teamBlock("Kdo se vám ozve")}`;
    return { subject, html: wrapHtml(subject, inner), text: autoReplyTextConsult(firstName) };
  }

  if (src === "startupjobs-report") {
    const subject = "Váš ukázkový report Behavera (v příloze)";
    const inner = `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:${INK};letter-spacing:-0.02em;">Ukázkový report najdete v příloze${salute}.</h1>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:${INK};">
        Připojený PDF obsahuje kompletní vzor reportu, který doručujeme klientům — kompetence, kulturní fit, retention signály a doporučení k náboru.
      </p>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:${INK};">
        Pokud byste chtěli vidět report přímo na vašich datech, můžete si <a href="${SITE}/startupjobs#consult" style="color:${BRAND_PURPLE};font-weight:500;">domluvit 15min konzultaci</a>.
      </p>
      ${outcomesBlock()}
      ${trustStripBlock()}
      ${teamBlock("Kdo vám rád zodpoví dotazy")}`;
    return { subject, html: wrapHtml(subject, inner), text: autoReplyTextReport(firstName) };
  }

  return null;
}

function autoReplyTextConsult(firstName: string): string {
  return [
    `Děkujeme za zájem o konzultaci${firstName ? `, ${firstName}` : ""}.`,
    ``,
    `Máme vaši žádost. Někdo z našeho týmu vám pošle 2–3 termíny pro 15minutový hovor během následujících 24 hodin.`,
    ``,
    `Čeho jsme dosáhli ve skutečných firmách:`,
    `  • 365.bank — +36 % rychlejší náborový proces`,
    `  • Expando — +24 pp lepší 12mo retention`,
    `  • Vodafone CZ — −40 % fluktuace zaměstnanců`,
    ``,
    `Kdo se vám ozve: Jana, Veronika nebo Giuseppe (hello@behavera.com)`,
    ``,
    `Naléhavé? Napište přímo: david.skoupy@behavera.com`,
  ].join("\n");
}

function autoReplyTextReport(firstName: string): string {
  return [
    `Ukázkový report najdete v příloze tohoto emailu${firstName ? `, ${firstName}` : ""}.`,
    ``,
    `Připojený PDF obsahuje kompletní vzor reportu — kompetence, kulturní fit, retention signály a doporučení k náboru.`,
    ``,
    `Chcete report na vašich datech? Domluvit konzultaci: ${SITE}/startupjobs#consult`,
    ``,
    `Čeho jsme dosáhli ve skutečných firmách:`,
    `  • 365.bank — +36 % rychlejší náborový proces`,
    `  • Expando — +24 pp lepší 12mo retention`,
    `  • Vodafone CZ — −40 % fluktuace zaměstnanců`,
    ``,
    `Naléhavé dotazy: david.skoupy@behavera.com`,
  ].join("\n");
}

/* ============== PIPEDRIVE LEAD COMPOSITION ============== */

const BIG_COMPANY_THRESHOLD = 200;

type PipedriveLabel = { name: string; color: "green" | "blue" | "red" | "yellow" | "purple" | "gray" | "brown" };

const LABEL_SOURCE: PipedriveLabel = { name: "LP Startupjobs", color: "purple" };
const LABEL_CONSULT: PipedriveLabel = { name: "Konzultace", color: "red" };
const LABEL_REPORT: PipedriveLabel = { name: "Report", color: "yellow" };
const LABEL_BIG: PipedriveLabel = { name: "Velká firma (200+)", color: "green" };

export function pipedriveLeadInput(body: LeadBody): {
  title: string;
  personName: string;
  email?: string;
  phone?: string;
  companyName?: string;
  note?: string;
  labels: PipedriveLabel[];
} | null {
  if (!body.email && !body.phone) return null;
  const src = body.source ?? "";
  const personName = body.name || body.email || "Lead bez jména";
  const company = body.company ?? personName;

  if (src === "startupjobs-consult") {
    const c = body.consult ?? {};
    const sizeBits: string[] = [];
    if (c.employees) sizeBits.push(`${c.employees} zam`);
    if (c.hiresPerYear) sizeBits.push(`${c.hiresPerYear} náborů/rok`);
    const suffix = sizeBits.length ? ` · ${sizeBits.join(" · ")}` : "";

    const labels: PipedriveLabel[] = [LABEL_SOURCE, LABEL_CONSULT];
    if (c.employees && c.employees >= BIG_COMPANY_THRESHOLD) labels.push(LABEL_BIG);

    const notes = [
      `Zdroj: LP Behavera + StartupJobs (consult form)`,
      c.employees ? `Zaměstnanců: ${c.employees}` : null,
      c.hiresPerYear ? `Náborů ročně: ${c.hiresPerYear}` : null,
      c.message ? `Zpráva:\n${c.message}` : null,
    ].filter(Boolean).join("\n");

    return {
      title: `🔥 ${company}${suffix} · konzultace`,
      personName,
      email: body.email,
      phone: body.phone,
      companyName: body.company,
      note: notes,
      labels,
    };
  }

  if (src === "startupjobs-report") {
    return {
      title: `📄 ${company} · report`,
      personName,
      email: body.email,
      phone: body.phone,
      companyName: body.company,
      note: `Zdroj: LP Behavera + StartupJobs (report form)`,
      labels: [LABEL_SOURCE, LABEL_REPORT],
    };
  }

  return null;
}
