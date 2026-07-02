/**
 * events.ts — jádro vlastní cookieless first-party analytiky (vzor katalogodpadu).
 *
 * Bez cookies, bez trvalého identifikátoru, bez ukládání surové IP — návštěvník
 * je jen nevratný hash(IP + UA + ISO týden + SALT), rotuje týdně. Klient
 * neposílá žádný identifikátor, hash si počítá server sám.
 *
 * Validace payloadu z beaconu: neznámý typ / chybějící povinná pole → null,
 * endpoint event tiše zahodí (fire-and-forget, beacon nikdy nedostane chybu).
 */

import { createHash } from "node:crypto";

export type AnalyticsEvent = {
  ts: string;
  type: string;
  visitor: string;
} & Record<string, unknown>;

export const AN_TYPES = new Set([
  "pageview",
  "conversion",
  "cta_click",
  "engagement",
  "consent",
  "scroll_depth",
  "form_start",
]);

const SCROLL_MILESTONES = new Set([25, 50, 75, 100]);

/** Strop pro engagement.seconds — delší hodnoty jsou šum (zapomenutý tab). */
const MAX_ENGAGEMENT_SECONDS = 7200;

const CONSENT_CHOICES = new Set(["granted", "denied"]);

const AN_DEVICES = new Set(["mobile", "tablet", "desktop", "unknown"]);

const BOT_NEEDLES = [
  "bot", "crawl", "spider", "slurp", "facebookexternalhit", "headless",
  "phantomjs", "curl/", "wget/", "python-requests", "ahrefs", "semrush",
  "vercel-screenshot", "lighthouse",
];

/** Substring blocklist v User-Agent; prázdný UA = podezřelé, nelogovat. */
export function isBot(ua: string): boolean {
  const lower = ua.toLowerCase();
  if (lower === "") return true;
  return BOT_NEEDLES.some((needle) => lower.includes(needle));
}

/** Ořízne string na max délku; prázdné / ne-string → null. */
function str(v: unknown, maxLen: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (t === "") return null;
  return t.slice(0, maxLen);
}

/** ISO rok-týden, např. "2026-W27" — určuje rotaci visitor hashe. */
function isoWeek(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** Nevratný hash návštěvníka, rotuje týdně (surová IP se nikam neukládá). */
export function visitorHash(ip: string, ua: string): string {
  // default salt v kódu (privátní repo) → funguje bez konfigurace;
  // env ANALYTICS_SALT ho kdykoli přepíše (= rotace všech hashů)
  const salt = process.env.ANALYTICS_SALT || "3d7e47b59773c2d16513ee9978307b304da4c2dad78b1d31";
  return createHash("sha256")
    .update(`${ip}|${ua}|${isoWeek()}|${salt}`)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Sestaví a zvaliduje event z JSON payloadu (beacon i server-side volání).
 * Vrací null, pokud je typ neznámý nebo chybí povinná pole.
 */
export function buildEvent(payload: unknown, ip: string, ua: string): AnalyticsEvent | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Record<string, unknown>;
  const type = str(p.type, 30);
  if (!type || !AN_TYPES.has(type)) return null;

  const event: AnalyticsEvent = {
    ts: new Date().toISOString(),
    type,
    visitor: visitorHash(ip, ua),
  };

  switch (type) {
    case "pageview": {
      event.path = str(p.path, 300) ?? "/";
      event.host = str(p.host, 100);
      event.ref_host = str(p.ref_host, 200);
      event.utm_source = str(p.utm_source, 100);
      event.utm_medium = str(p.utm_medium, 100);
      event.utm_campaign = str(p.utm_campaign, 100);
      const device = str(p.device, 10) ?? "unknown";
      event.device = AN_DEVICES.has(device) ? device : "unknown";
      break;
    }
    case "conversion": {
      const form = str(p.form, 50);
      if (!form) return null;
      event.form = form;
      event.path = str(p.path, 300);
      break;
    }
    case "cta_click": {
      const id = str(p.id, 100);
      if (!id) return null;
      event.id = id;
      event.path = str(p.path, 300);
      break;
    }
    case "engagement": {
      const seconds = typeof p.seconds === "number" ? Math.round(p.seconds) : NaN;
      if (!Number.isFinite(seconds) || seconds < 1) return null;
      event.seconds = Math.min(seconds, MAX_ENGAGEMENT_SECONDS);
      event.path = str(p.path, 300);
      break;
    }
    case "consent": {
      const choice = str(p.choice, 10);
      if (!choice || !CONSENT_CHOICES.has(choice)) return null;
      event.choice = choice;
      event.path = str(p.path, 300);
      break;
    }
    case "scroll_depth": {
      const depth = typeof p.depth === "number" ? p.depth : NaN;
      if (!SCROLL_MILESTONES.has(depth)) return null;
      event.depth = depth;
      event.path = str(p.path, 300);
      break;
    }
    case "form_start": {
      const form = str(p.form, 50);
      if (!form) return null;
      event.form = form;
      event.path = str(p.path, 300);
      break;
    }
  }

  return event;
}
