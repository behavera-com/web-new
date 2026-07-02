/**
 * report.ts — agregace surových eventů do reportu pro dashboard / JSON API.
 *
 * Kampaňová LP optika: návštěvy, UTM zdroje, konverze podle formuláře,
 * konverzní poměr, CTA kliky. Dny jsou UTC (stejně jako bucketing ve store).
 */

import type { AnalyticsEvent } from "./events";

export type CountRow = [label: string, count: number];

export interface AnalyticsReport {
  pageviews_total: number;
  unique_visitors: number;
  pageviews_by_day: Record<string, number>;
  visitors_by_day: Record<string, number>;
  top_pages: CountRow[];
  top_referrers: CountRow[];
  utm_sources: CountRow[];
  utm_campaigns: CountRow[];
  devices: Record<string, number>;
  conversions: CountRow[];
  conversions_total: number;
  conversion_rate: number | null;
  cta_clicks: CountRow[];
  /** Průměrný aktivní čas na stránce na návštěvníka (sekundy); null bez dat. */
  avg_engagement_seconds: number | null;
  consent: { granted: number; denied: number };
  /** Počet dosažení scroll milníků (klíče "25"|"50"|"75"|"100"). */
  scroll_depth: Record<string, number>;
  form_starts: CountRow[];
  /** Podíl návštěvníků s < 10 s aktivního času; null bez pageviews. */
  bounce_rate: number | null;
}

/** Práh aktivního času, pod kterým se návštěva počítá jako bounce. */
const BOUNCE_THRESHOLD_SECONDS = 10;

function inc(map: Map<string, number>, key: unknown): void {
  if (typeof key !== "string" || key === "") return;
  map.set(key, (map.get(key) ?? 0) + 1);
}

function sorted(map: Map<string, number>, limit = 20): CountRow[] {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

export function buildReport(events: AnalyticsEvent[]): AnalyticsReport {
  const byDay = new Map<string, number>();
  const visitorsByDay = new Map<string, Set<string>>();
  const pages = new Map<string, number>();
  const refs = new Map<string, number>();
  const utmSources = new Map<string, number>();
  const utmCampaigns = new Map<string, number>();
  const devices: Record<string, number> = { mobile: 0, tablet: 0, desktop: 0, unknown: 0 };
  const conversions = new Map<string, number>();
  const ctaClicks = new Map<string, number>();
  const allVisitors = new Set<string>();
  // engagement deltas se sčítají per návštěvník (klient jich pošle víc,
  // když tab schová a zase vrátí) — průměr je pak "čas na návštěvníka"
  const engagementByVisitor = new Map<string, number>();
  const consent = { granted: 0, denied: 0 };
  const scrollDepth: Record<string, number> = { "25": 0, "50": 0, "75": 0, "100": 0 };
  const formStarts = new Map<string, number>();
  const pageviewVisitors = new Set<string>();
  let pageviews = 0;
  let conversionsTotal = 0;

  for (const e of events) {
    const day = (e.ts ?? "").slice(0, 10);
    if (day === "") continue;
    if (typeof e.visitor === "string" && e.visitor !== "") allVisitors.add(e.visitor);

    switch (e.type) {
      case "pageview": {
        pageviews++;
        byDay.set(day, (byDay.get(day) ?? 0) + 1);
        if (typeof e.visitor === "string" && e.visitor !== "") {
          pageviewVisitors.add(e.visitor);
          if (!visitorsByDay.has(day)) visitorsByDay.set(day, new Set());
          visitorsByDay.get(day)!.add(e.visitor);
        }
        inc(pages, e.path);
        inc(refs, e.ref_host);
        inc(utmSources, e.utm_source);
        inc(utmCampaigns, e.utm_campaign);
        const device = typeof e.device === "string" ? e.device : "unknown";
        devices[device] = (devices[device] ?? 0) + 1;
        break;
      }
      case "conversion":
        conversionsTotal++;
        inc(conversions, e.form);
        break;
      case "cta_click":
        inc(ctaClicks, e.id);
        break;
      case "engagement": {
        const seconds = typeof e.seconds === "number" ? e.seconds : 0;
        const visitor = typeof e.visitor === "string" ? e.visitor : "";
        if (seconds > 0 && visitor !== "") {
          engagementByVisitor.set(visitor, (engagementByVisitor.get(visitor) ?? 0) + seconds);
        }
        break;
      }
      case "consent":
        if (e.choice === "granted") consent.granted++;
        else if (e.choice === "denied") consent.denied++;
        break;
      case "scroll_depth": {
        const key = String(e.depth);
        if (key in scrollDepth) scrollDepth[key]++;
        break;
      }
      case "form_start":
        inc(formStarts, e.form);
        break;
    }
  }

  // bounce = návštěvník s pageview, jehož součet aktivního času nedosáhl
  // prahu (včetně těch úplně bez engagement eventu — odešli hned)
  let bounced = 0;
  for (const visitor of pageviewVisitors) {
    if ((engagementByVisitor.get(visitor) ?? 0) < BOUNCE_THRESHOLD_SECONDS) bounced++;
  }

  const engagementTotals = [...engagementByVisitor.values()];
  const avgEngagement =
    engagementTotals.length > 0
      ? Math.round(engagementTotals.reduce((a, b) => a + b, 0) / engagementTotals.length)
      : null;

  return {
    pageviews_total: pageviews,
    unique_visitors: allVisitors.size,
    pageviews_by_day: Object.fromEntries([...byDay.entries()].sort()),
    visitors_by_day: Object.fromEntries(
      [...visitorsByDay.entries()].sort().map(([day, set]) => [day, set.size])
    ),
    top_pages: sorted(pages),
    top_referrers: sorted(refs),
    utm_sources: sorted(utmSources),
    utm_campaigns: sorted(utmCampaigns),
    devices,
    conversions: sorted(conversions),
    conversions_total: conversionsTotal,
    conversion_rate:
      allVisitors.size > 0 ? Math.round((conversionsTotal / allVisitors.size) * 1000) / 1000 : null,
    cta_clicks: sorted(ctaClicks),
    avg_engagement_seconds: avgEngagement,
    consent,
    scroll_depth: scrollDepth,
    form_starts: sorted(formStarts),
    bounce_rate:
      pageviewVisitors.size > 0 ? Math.round((bounced / pageviewVisitors.size) * 1000) / 1000 : null,
  };
}
