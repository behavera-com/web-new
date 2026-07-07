/**
 * /api/stats — dashboard + JSON API pro vlastní cookieless analytiku
 * (vzor katalogodpadu stats.php, přepsaný pro Next.js route handler).
 *
 * Přístup chrání heslo — default "behast2026", přepíše env ANALYTICS_STATS_KEY.
 * Bez platného hesla se zobrazí login formulář (heslo se pak nese v query
 * ?key=..., takže odkazy na období fungují). Porovnání konstantním časem.
 *
 * Parametry: ?key=...             heslo
 *            &range=today|yesterday|month|7|30   období (default 30 dní)
 *            &live=1              posledních 30 minut (auto-refresh 60 s)
 *            &format=json         surový report místo HTML
 *
 * Všechny odpovědi mají X-Robots-Tag: noindex (+ meta robots v HTML).
 */

import { createHash, timingSafeEqual } from "node:crypto";
import { readEvents, readRecent, activeStorage } from "@/lib/tracking/store";
import { buildReport, type AnalyticsReport, type CountRow } from "@/lib/tracking/report";

const LIVE_MINUTES = 30;
const DEFAULT_KEY = "behast2026";

const BASE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "X-Robots-Tag": "noindex, nofollow",
};

function keyOk(given: string | null): boolean {
  const expected = process.env.ANALYTICS_STATS_KEY || DEFAULT_KEY;
  if (!given) return false;
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function esc(v: unknown): string {
  return String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Vysvětlivky metrik — zobrazují se jako CSS tooltip u nadpisů karet. */
const TIPS: Record<string, string> = {
  pageviews: "Počet zobrazení stránky — každé načtení LP se počítá jednou.",
  visitors:
    "Odhad počtu lidí. Návštěvník = anonymní hash z IP + prohlížeče, který se každý týden mění. Žádné cookies, nejde zpětně dohledat.",
  conversions:
    "Odeslané formuláře (report zdarma, konzultace…). Počítá se na serveru v /api/leads, takže je nezablokuje adblock.",
  conv_rate: "Konverze děleno unikátní návštěvníci — kolik procent návštěvníků odeslalo formulář.",
  engagement:
    "Průměrný aktivní čas na stránce na návštěvníka. Počítá se jen doba, kdy je záložka skutečně vidět (přepnutí tabu se nepočítá); odesílá se při opuštění stránky.",
  consent_banner:
    "Kliky na cookie lištu. Přijmout vše = spustí se GA/Ads/LinkedIn skripty, Odmítnout vše = jen nezbytné. Tahle first-party analytika běží v obou případech — nepoužívá cookies.",
  bounce:
    "Podíl návštěvníků, kteří na stránce strávili méně než 10 sekund aktivního času — přišli a hned odešli. Čím nižší, tím lépe.",
  scroll:
    "Kolikrát návštěvníci dosáhli 25 / 50 / 75 / 100 % délky stránky (každý milník max jednou za zobrazení). Ukazuje, kde čtenáři odpadávají — procento je podíl vůči všem pageviews.",
  form_starts:
    "Kolikrát někdo začal vyplňovat formulář (první kliknutí do pole). Porovnej s kartou Konverze — rozdíl jsou lidé, kteří formulář rozpracovali a nedokončili. consult = konzultace, report = report zdarma.",
  chart: "Zobrazení stránky po jednotlivých dnech (UTC). Najetím na sloupec uvidíš přesné číslo.",
  conversions_form:
    "Rozpad konverzí podle formuláře: startupjobs-report = report zdarma, startupjobs-consult = konzultace, ai-readiness-consult = konzultace z AI Readiness LP.",
  cta: "Kliky na tlačítka a odkazy označené pro tracking (např. header_consult = tlačítko Domluvit konzultaci v hlavičce).",
  utm_sources:
    "utm_source z URL — odkud kampaň vede návštěvníky (např. startupjobs = kampaň na StartupJobs). Přímé návštěvy UTM nemají.",
  utm_campaigns: "utm_campaign z URL — název konkrétní kampaně nastavený v odkazu.",
  pages: "Které cesty na webu lidé zobrazili. Na subdoméně startupjobs.behavera.com je LP jako „/“.",
  referrers:
    "Doména, ze které návštěvník přišel (referrer prohlížeče). Prázdné = přímá návštěva nebo skrytý referrer.",
  devices: "Typ zařízení odvozený z prohlížeče: mobil / tablet / desktop.",
};

function tip(key: string): string {
  const text = TIPS[key];
  if (!text) return "";
  return `<span class="info" tabindex="0" data-tip="${esc(text)}">?</span>`;
}

/** Řádky tabulky label→počet; prázdný stav = pomlčka. */
function tableRows(rows: CountRow[]): string {
  if (rows.length === 0) {
    return '<tr class="empty"><td colspan="2">— zatím žádná data —</td></tr>';
  }
  return rows
    .map(
      ([label, n]) =>
        `<tr><td class="t-label" title="${esc(label)}">${esc(label)}</td><td class="t-num">${n}</td></tr>`
    )
    .join("");
}

function card(title: string, tipKey: string, rows: CountRow[]): string {
  return `<section class="card"><h2>${esc(title)}${tip(tipKey)}</h2><table>${tableRows(rows)}</table></section>`;
}

/** Inline SVG sloupcový graf pageviews po dnech přes celé okno (i nulové dny). */
function chartSvg(byDay: Record<string, number>, days: number): string {
  const series: { day: string; n: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10);
    series.push({ day, n: byDay[day] ?? 0 });
  }
  const w = 940;
  const h = 180;
  const pad = 4;
  const max = Math.max(1, ...series.map((s) => s.n));
  const bw = (w - pad * 2) / series.length;
  const bars = series
    .map((s, i) => {
      const bh = Math.max(s.n > 0 ? 3 : 1, Math.round((s.n / max) * (h - 30)));
      const x = pad + i * bw;
      const label = `${s.day.slice(8)}.${s.day.slice(5, 7)}.: ${s.n}`;
      return `<g><title>${esc(label)}</title><rect x="${(x + bw * 0.12).toFixed(1)}" y="${h - 20 - bh}" width="${(bw * 0.76).toFixed(1)}" height="${bh}" rx="2" fill="${s.n > 0 ? "var(--mint)" : "var(--line)"}"/></g>`;
    })
    .join("");
  const firstLabel = series[0]?.day ?? "";
  const lastLabel = series[series.length - 1]?.day ?? "";
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Pageviews po dnech" style="width:100%;height:auto;display:block">
    ${bars}
    <text x="${pad}" y="${h - 4}" class="axis">${esc(firstLabel)}</text>
    <text x="${w - pad}" y="${h - 4}" class="axis" text-anchor="end">${esc(lastLabel)}</text>
    <text x="${w / 2}" y="12" class="axis" text-anchor="middle">max ${max}/den</text>
  </svg>`;
}

const SHARED_CSS = `
  :root {
    --ink: #f2eefc; --ink-dim: #a99fc7; --ink-faint: #6f6591;
    --bg: #140d2b; --surface: #1d1440; --line: #2e2358;
    --mint: #5eead4; --amber: #fbbf24;
    --mono: ui-monospace, "SF Mono", Menlo, monospace;
  }
  * { box-sizing: border-box; }
  html { color-scheme: dark; }
  body {
    margin: 0; padding: 2.5rem 1.5rem 5rem; background: var(--bg); color: var(--ink);
    font-family: system-ui, -apple-system, sans-serif;
    background-image: radial-gradient(ellipse 900px 480px at 15% -10%, rgba(94,234,212,.10), transparent 60%);
    background-repeat: no-repeat; min-height: 100vh;
  }`;

/** Login stránka — bez platného hesla se nic z reportu nerenderuje. */
function loginHtml(wrongKey: boolean): string {
  return `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Analytika — přihlášení</title>
<style>
  ${SHARED_CSS}
  body { display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
  form {
    background: var(--surface); border: 1px solid var(--line); border-radius: 14px;
    padding: 2rem; width: 100%; max-width: 340px; display: grid; gap: .9rem;
  }
  h1 { font-size: 1.05rem; margin: 0; }
  p.err { color: #fca5a5; font-size: .82rem; margin: 0; }
  input {
    background: var(--bg); color: var(--ink); border: 1px solid var(--line);
    border-radius: 8px; padding: .6rem .75rem; font-size: .95rem; width: 100%;
  }
  input:focus { outline: 2px solid var(--mint); outline-offset: 1px; border-color: transparent; }
  button {
    background: var(--mint); color: #0d2b23; border: none; border-radius: 8px;
    padding: .6rem; font-size: .9rem; font-weight: 700; cursor: pointer;
  }
</style>
</head>
<body>
<form method="get" action="">
  <h1>Analytika — startupjobs LP</h1>
  ${wrongKey ? '<p class="err">Špatné heslo, zkus to znovu.</p>' : ""}
  <input type="password" name="key" placeholder="Heslo" autofocus autocomplete="current-password">
  <button type="submit">Přihlásit</button>
</form>
</body>
</html>`;
}

type Range = {
  id: string;
  label: string;
  days: number;
  offset: number;
  showChart: boolean;
};

const RANGES: Range[] = [
  { id: "today", label: "Dnes", days: 1, offset: 0, showChart: false },
  { id: "yesterday", label: "Včera", days: 1, offset: 1, showChart: false },
  { id: "7", label: "7 dní", days: 7, offset: 0, showChart: true },
  { id: "30", label: "30 dní", days: 30, offset: 0, showChart: true },
  // days se u „tento měsíc" dopočítá za běhu (kolikátého je), viz resolveRange()
  { id: "month", label: "Tento měsíc", days: 0, offset: 0, showChart: true },
];

function resolveRange(id: string | null): Range {
  const found = RANGES.find((r) => r.id === id) ?? RANGES.find((r) => r.id === "30")!;
  if (found.id === "month") {
    return { ...found, days: new Date().getUTCDate() };
  }
  return found;
}

const STORAGE_LABEL: Record<string, string> = {
  upstash: "Upstash Redis",
  bridge: "most (katalogodpadu)",
  local: "lokální soubory",
};

function html(
  report: AnalyticsReport,
  opts: { range: Range; live: boolean; key: string; storage: string }
): string {
  const { range, live, key, storage } = opts;
  const base = `?key=${encodeURIComponent(key)}`;
  const nav = [
    `<a href="${base}&live=1" class="nav-link${live ? " active" : ""}">Live</a>`,
    ...RANGES.map(
      (r) =>
        `<a href="${base}&range=${r.id}" class="nav-link${!live && r.id === range.id ? " active" : ""}">${esc(r.label)}</a>`
    ),
  ].join("\n      ");
  const convRate =
    report.conversion_rate !== null ? `${(report.conversion_rate * 100).toFixed(1)} %` : "—";
  const deviceRows: CountRow[] = Object.entries(report.devices).filter(([, n]) => n > 0);

  const avgTime =
    report.avg_engagement_seconds !== null
      ? `${Math.floor(report.avg_engagement_seconds / 60)}:${String(report.avg_engagement_seconds % 60).padStart(2, "0")}`
      : "—";

  const bounceRate =
    report.bounce_rate !== null ? `${(report.bounce_rate * 100).toFixed(0)} %` : "—";

  const scrollRows: CountRow[] = Object.entries(report.scroll_depth)
    .filter(([, n]) => n > 0)
    .map(([depth, n]) => {
      const share =
        report.pageviews_total > 0
          ? ` (${Math.round((n / report.pageviews_total) * 100)} % zobrazení)`
          : "";
      return [`${depth} % stránky${share}`, n] as CountRow;
    });

  const consentTotal = report.consent.granted + report.consent.denied;
  const consentPct = (n: number) =>
    consentTotal > 0 ? ` (${Math.round((n / consentTotal) * 100)} %)` : "";
  const consentRows: CountRow[] =
    consentTotal > 0
      ? [
          [`Přijmout vše${consentPct(report.consent.granted)}`, report.consent.granted],
          [`Odmítnout vše${consentPct(report.consent.denied)}`, report.consent.denied],
        ]
      : [];
  const meta = live ? `live · posledních ${LIVE_MINUTES} min` : range.label.toLowerCase();

  return `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
${live ? '<meta http-equiv="refresh" content="60">' : ""}
<title>Analytika — startupjobs LP</title>
<style>
  ${SHARED_CSS}
  .wrap { max-width: 1020px; margin: 0 auto; }
  header { display: flex; flex-wrap: wrap; align-items: baseline; gap: .75rem 1.25rem; margin-bottom: 1.75rem; }
  h1 { font-size: 1.35rem; margin: 0; letter-spacing: -0.01em; }
  .meta { color: var(--ink-faint); font-size: .8rem; font-family: var(--mono); }
  nav { margin-left: auto; display: flex; flex-wrap: wrap; gap: .4rem; }
  .nav-link {
    color: var(--ink-dim); text-decoration: none; font-size: .8rem; padding: .3rem .7rem;
    border: 1px solid var(--line); border-radius: 999px;
  }
  .nav-link.active { color: #0d2b23; background: var(--mint); border-color: var(--mint); font-weight: 600; }
  .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: .75rem; margin-bottom: .75rem; }
  .kpi { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 1rem 1.1rem; }
  .kpi .label { color: var(--ink-dim); font-size: .72rem; text-transform: uppercase; letter-spacing: .12em; display: flex; align-items: center; gap: .4rem; }
  .kpi .value { font-size: 1.8rem; font-weight: 700; font-family: var(--mono); margin-top: .35rem; }
  .kpi.accent .value { color: var(--mint); }
  .chart { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 1rem 1.1rem; margin-bottom: .75rem; }
  .chart h2 { font-size: .78rem; text-transform: uppercase; letter-spacing: .12em; color: var(--ink-dim); margin: 0 0 .6rem; display: flex; align-items: center; gap: .4rem; }
  .axis { fill: var(--ink-faint); font-size: 11px; font-family: var(--mono); }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: .75rem; }
  .card { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 1rem 1.1rem; }
  .card h2 { font-size: .78rem; text-transform: uppercase; letter-spacing: .12em; color: var(--ink-dim); margin: 0 0 .6rem; display: flex; align-items: center; gap: .4rem; }
  table { width: 100%; border-collapse: collapse; font-size: .85rem; }
  td { padding: .32rem 0; border-bottom: 1px solid var(--line); }
  tr:last-child td { border-bottom: none; }
  .t-label { max-width: 0; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 1rem; }
  .t-num { font-family: var(--mono); text-align: right; color: var(--mint); }
  .empty td { color: var(--ink-faint); }
  footer { margin-top: 2rem; color: var(--ink-faint); font-size: .75rem; line-height: 1.6; }
  .badge {
    font-size: .7rem; font-family: var(--mono); padding: .18rem .5rem; border-radius: 999px;
    border: 1px solid var(--line); color: var(--ink-dim); white-space: nowrap;
  }
  .badge--upstash { color: #0d2b23; background: var(--mint); border-color: var(--mint); }
  .badge--bridge { color: var(--amber); border-color: var(--amber); }
  /* tooltip „?" — čisté CSS, funguje na hover i focus (tap na mobilu) */
  .info {
    display: inline-flex; align-items: center; justify-content: center;
    width: 15px; height: 15px; border-radius: 50%; flex: none;
    border: 1px solid var(--ink-faint); color: var(--ink-faint);
    font-size: 10px; font-weight: 600; text-transform: none; letter-spacing: 0;
    cursor: help; position: relative;
  }
  .info::after {
    content: attr(data-tip);
    /* display:none (ne opacity) — skrytý tooltip nesmí rozšiřovat scrollWidth */
    display: none;
    position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
    background: #0b0720; color: var(--ink); border: 1px solid var(--line);
    border-radius: 8px; padding: .55rem .7rem; width: 240px; max-width: 78vw;
    font-size: .74rem; font-weight: 400; line-height: 1.45; text-transform: none;
    letter-spacing: 0; white-space: normal; text-align: left;
    pointer-events: none; z-index: 10;
    box-shadow: 0 8px 24px rgba(0,0,0,.45);
  }
  .info:hover::after, .info:focus::after { display: block; }
  @media (max-width: 640px) {
    /* na mobilu fixní panel dole — centrovaný tooltip by přetékal okraj */
    .info::after {
      position: fixed; left: 1rem; right: 1rem; bottom: 1rem; top: auto;
      transform: none; width: auto; max-width: none;
    }
  }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>Analytika — startupjobs LP</h1>
    <span class="meta">${esc(meta)}</span>
    <span class="badge badge--${esc(storage)}" title="Aktivní úložiště eventů">${esc(STORAGE_LABEL[storage] ?? storage)}</span>
    <nav>
      ${nav}
    </nav>
  </header>

  <div class="kpis">
    <div class="kpi"><div class="label">Pageviews ${tip("pageviews")}</div><div class="value">${report.pageviews_total}</div></div>
    <div class="kpi"><div class="label">Unikátní návštěvníci ${tip("visitors")}</div><div class="value">${report.unique_visitors}</div></div>
    <div class="kpi"><div class="label">Ø čas na stránce ${tip("engagement")}</div><div class="value">${avgTime}</div></div>
    <div class="kpi"><div class="label">Bounce rate ${tip("bounce")}</div><div class="value">${bounceRate}</div></div>
    <div class="kpi accent"><div class="label">Konverze ${tip("conversions")}</div><div class="value">${report.conversions_total}</div></div>
    <div class="kpi accent"><div class="label">Konverzní poměr ${tip("conv_rate")}</div><div class="value">${convRate}</div></div>
  </div>

  ${
    !live && range.showChart
      ? `<div class="chart"><h2>Pageviews po dnech ${tip("chart")}</h2>${chartSvg(report.pageviews_by_day, range.days)}</div>`
      : ""
  }

  <div class="grid">
    ${card("Konverze podle formuláře", "conversions_form", report.conversions)}
    ${card("Scroll hloubka", "scroll", scrollRows)}
    ${card("Formuláře — začali vyplňovat", "form_starts", report.form_starts)}
    ${card("CTA kliky", "cta", report.cta_clicks)}
    ${card("Cookie lišta", "consent_banner", consentRows)}
    ${card("UTM zdroje", "utm_sources", report.utm_sources)}
    ${card("UTM kampaně", "utm_campaigns", report.utm_campaigns)}
    ${card("Stránky", "pages", report.top_pages)}
    ${card("Referrery", "referrers", report.top_referrers)}
    ${card("Zařízení", "devices", deviceRows)}
  </div>

  <footer>
    Cookieless first-party analytika — žádné cookies, žádný identifikátor na klientovi,
    návštěvník = týdně rotující hash. Dny jsou UTC, retence dat 90 dní.
    Konverze se počítají server-side v /api/leads.<br>
    Úložiště eventů: <strong>${esc(STORAGE_LABEL[storage] ?? storage)}</strong>.
  </footer>
</div>
</body>
</html>`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!keyOk(key)) {
    if (url.searchParams.get("format") === "json") {
      return Response.json(
        { error: "forbidden" },
        { status: 403, headers: { "X-Robots-Tag": "noindex, nofollow" } }
      );
    }
    return new Response(loginHtml(key !== null && key !== ""), {
      status: 401,
      headers: BASE_HEADERS,
    });
  }

  const live = url.searchParams.get("live") === "1";
  // zpětná kompatibilita: ?days=7 funguje jako ?range=7
  const rangeId = url.searchParams.get("range") ?? url.searchParams.get("days");
  const range = resolveRange(rangeId);

  const events = live ? await readRecent(LIVE_MINUTES) : await readEvents(range.days, range.offset);
  const report = buildReport(events);
  const storage = activeStorage();

  if (url.searchParams.get("format") === "json") {
    return Response.json(
      { ...report, storage },
      { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
    );
  }

  return new Response(html(report, { range, live, key: key!, storage }), { headers: BASE_HEADERS });
}
