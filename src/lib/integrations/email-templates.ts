import type { LeadBody } from "./lead-types";

const BRAND_PURPLE = "#2d1b69";
const INK = "#1c1237";
const MUTED = "#6b6483";
const RULE = "#e6e2ee";

function fmtCzk(n?: number) {
  if (typeof n !== "number") return "—";
  return Math.round(n).toLocaleString("cs-CZ") + " Kč";
}

function wrapHtml(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f6f3ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3ff;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${RULE};border-radius:8px;overflow:hidden;">
        <tr><td style="padding:24px 32px;border-bottom:1px solid ${RULE};">
          <div style="font-weight:800;letter-spacing:-0.015em;color:${BRAND_PURPLE};font-size:18px;">behavera</div>
        </td></tr>
        <tr><td style="padding:32px;">${body}</td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid ${RULE};background:#fbfafd;color:${MUTED};font-size:12px;line-height:1.5;">
          Behavera s.r.o. · <a href="https://behavera.com" style="color:${MUTED};">behavera.com</a>
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

  if (src === "startupjobs") {
    const c = body.calculator ?? {};
    const subject = `📥 ROI kalkulačka — ${body.email ?? "?"}`;
    const inner = `
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:${INK};">Nový lead z ROI kalkulačky</h1>
      <p style="margin:0 0 24px;color:${MUTED};font-size:14px;">LP Behavera + StartupJobs</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("E-mail", escape(body.email))}
        ${row("Otevřených pozic", c.positions)}
        ${row("Time-to-hire", c.timeToHireDays ? `${c.timeToHireDays} dní` : undefined)}
        ${row("Roční náklad", fmtCzk(c.estimatedAnnualCostCzk))}
        ${row("Potenciální úspora", fmtCzk(c.estimatedAnnualSavingCzk))}
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

  if (src === "startupjobs-consult") {
    const subject = "Děkujeme — ozveme se do 24 hodin";
    const inner = `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:${INK};letter-spacing:-0.02em;">Děkujeme za zájem o konzultaci${body.name ? `, ${escape(body.name.split(" ")[0])}` : ""}.</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">
        Máme vaši žádost. Náš konzultant vám pošle 2–3 termíny pro 15minutový hovor během následujících 24 hodin.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${INK};">
        Mezitím se můžete podívat na <a href="https://behavera.com/startupjobs#cases" style="color:${BRAND_PURPLE};">případové studie</a> firem, kterým jsme s náborem pomohli.
      </p>
      <p style="margin:0;font-size:13px;color:${MUTED};">
        Pokud se nám náhodou nepodaří ozvat, napište mi přímo: <a href="mailto:david.skoupy@behavera.com" style="color:${BRAND_PURPLE};">david.skoupy@behavera.com</a>
      </p>`;
    return { subject, html: wrapHtml(subject, inner), text: autoReplyText("consult", body) };
  }

  if (src === "startupjobs-report") {
    const subject = "Váš report od Behavera + StartupJobs";
    const inner = `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:${INK};letter-spacing:-0.02em;">Děkujeme za zájem o ukázkový report${body.name ? `, ${escape(body.name.split(" ")[0])}` : ""}.</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">
        Připravujeme pro vás link na kompletní ukázkový report. Pošleme ho na <strong>${escape(body.email)}</strong> během následujících 24 hodin.
      </p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${INK};">
        Pokud byste mezitím chtěli ukázat report přímo na vašich datech, můžete si <a href="https://behavera.com/startupjobs#consult" style="color:${BRAND_PURPLE};">domluvit 15min konzultaci</a>.
      </p>
      <p style="margin:0;font-size:13px;color:${MUTED};">
        Dotazy: <a href="mailto:david.skoupy@behavera.com" style="color:${BRAND_PURPLE};">david.skoupy@behavera.com</a>
      </p>`;
    return { subject, html: wrapHtml(subject, inner), text: autoReplyText("report", body) };
  }

  if (src === "startupjobs") {
    const subject = "Děkujeme — vaše ROI kalkulace od Behavera";
    const inner = `
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:${INK};letter-spacing:-0.02em;">Děkujeme za zájem.</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${INK};">
        Máme vaši ROI kalkulaci. Ozveme se vám během 24 hodin s konkrétními kroky, jak úsporu reálně dosáhnout ve vašem náboru.
      </p>
      <p style="margin:0;font-size:13px;color:${MUTED};">
        Dotazy: <a href="mailto:david.skoupy@behavera.com" style="color:${BRAND_PURPLE};">david.skoupy@behavera.com</a>
      </p>`;
    return { subject, html: wrapHtml(subject, inner), text: autoReplyText("roi", body) };
  }

  return null;
}

function autoReplyText(kind: "consult" | "report" | "roi", body: LeadBody): string {
  if (kind === "consult") {
    return `Děkujeme za zájem o konzultaci${body.name ? `, ${body.name.split(" ")[0]}` : ""}.\n\nMáme vaši žádost. Náš konzultant vám pošle 2–3 termíny pro 15minutový hovor během následujících 24 hodin.\n\nKontakt: david.skoupy@behavera.com`;
  }
  if (kind === "report") {
    return `Děkujeme za zájem o ukázkový report${body.name ? `, ${body.name.split(" ")[0]}` : ""}.\n\nPřipravujeme pro vás link a pošleme ho na ${body.email} během 24 hodin.\n\nKontakt: david.skoupy@behavera.com`;
  }
  return `Děkujeme za zájem o Behaveru. Ozveme se vám během 24 hodin.\n\nKontakt: david.skoupy@behavera.com`;
}

/* ============== PIPEDRIVE LEAD COMPOSITION ============== */

export function pipedriveLeadInput(body: LeadBody): {
  title: string;
  personName: string;
  email?: string;
  phone?: string;
  companyName?: string;
  note?: string;
} | null {
  if (!body.email && !body.phone) return null;
  const src = body.source ?? "";
  const personName = body.name || body.email || "Lead bez jména";

  if (src === "startupjobs-consult") {
    const c = body.consult ?? {};
    const notes = [
      `Zdroj: LP Behavera + StartupJobs (consult form)`,
      c.employees ? `Zaměstnanců: ${c.employees}` : null,
      c.hiresPerYear ? `Náborů ročně: ${c.hiresPerYear}` : null,
      c.message ? `Zpráva:\n${c.message}` : null,
    ].filter(Boolean).join("\n");
    return {
      title: `${body.company ?? personName} — konzultace ze startupjobs LP`,
      personName,
      email: body.email,
      phone: body.phone,
      companyName: body.company,
      note: notes,
    };
  }

  if (src === "startupjobs-report") {
    return {
      title: `${body.company ?? body.email} — žádost o report`,
      personName,
      email: body.email,
      phone: body.phone,
      companyName: body.company,
      note: `Zdroj: LP Behavera + StartupJobs (report form)`,
    };
  }

  if (src === "startupjobs") {
    const c = body.calculator ?? {};
    const notes = [
      `Zdroj: LP Behavera + StartupJobs (ROI kalkulačka)`,
      c.positions ? `Otevřených pozic: ${c.positions}` : null,
      c.timeToHireDays ? `Time-to-hire: ${c.timeToHireDays} dní` : null,
      c.estimatedAnnualCostCzk ? `Roční náklad: ${fmtCzk(c.estimatedAnnualCostCzk)}` : null,
      c.estimatedAnnualSavingCzk ? `Potenciální úspora: ${fmtCzk(c.estimatedAnnualSavingCzk)}` : null,
    ].filter(Boolean).join("\n");
    return {
      title: `${body.email} — ROI kalkulačka`,
      personName,
      email: body.email,
      phone: body.phone,
      note: notes,
    };
  }

  return null;
}
