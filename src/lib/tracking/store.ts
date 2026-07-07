/**
 * store.ts — úložiště analytických eventů, tři backendy podle priority:
 *
 * 1. Upstash Redis přes REST API (env UPSTASH_REDIS_REST_URL + TOKEN) —
 *    žádná npm závislost, jen fetch. Eventy jako JSON řádky v listu po dnech
 *    (`an:events:YYYY-MM-DD`, UTC) s retencí 90 dní přes EXPIRE.
 * 2. Blueboard most (jen produkce; defaulty v kódu → funguje hned po deployi
 *    bez konfigurace): eventy se server-side přeposílají na
 *    katalogodpadu.cz/api/behavera-ingest.php a ukládají do JSONL na disku
 *    hostingu. Přepis env ANALYTICS_REMOTE_URL / ANALYTICS_REMOTE_SECRET;
 *    jakmile přibude Upstash env, most se přestane používat.
 * 3. Lokální dev: JSONL soubory v `.analytics-data/` (gitignored) — testy
 *    z localhostu nešpiní produkční data (vynucení mostu: ANALYTICS_REMOTE=1).
 */

import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { buildEvent, isBot, type AnalyticsEvent } from "./events";

const RETENTION_DAYS = 90;
const KEY_PREFIX = "an:events:";

// Blueboard most — stejný secret žije v behavera-ingest.php na hostingu;
// rotace = přenastavit obě strany přes env (repo je privátní)
// apex bez www — hosting dělá www→apex 301 a POST by se na redirectu ztratil
const REMOTE_DEFAULT_URL = "https://katalogodpadu.cz/api/behavera-ingest.php";
const REMOTE_DEFAULT_SECRET = "bcb644dd523b9aa069326211f4bebf9fe04f2624ac00006d";

function remoteEnabled(): boolean {
  return process.env.NODE_ENV === "production" || process.env.ANALYTICS_REMOTE === "1";
}

function remoteConfig(): { url: string; secret: string } {
  return {
    url: process.env.ANALYTICS_REMOTE_URL || REMOTE_DEFAULT_URL,
    secret: process.env.ANALYTICS_REMOTE_SECRET || REMOTE_DEFAULT_SECRET,
  };
}

function upstashEnv(): { url: string; token: string } | null {
  // Vercel Upstash/Redis integrace vkládá credentials pod různými názvy podle
  // verze integrace: nativní UPSTASH_REDIS_REST_* nebo Vercel KV_REST_API_*.
  // Obě míří na stejný Upstash REST endpoint (/pipeline), tak přijmeme obojí.
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

/** Které úložiště je právě aktivní (stejná priorita jako append/read). */
export function activeStorage(): "upstash" | "bridge" | "local" {
  if (upstashEnv()) return "upstash";
  if (remoteEnabled()) return "bridge";
  return "local";
}

/**
 * Diagnostika (jen do JSON API, za heslem): které credentials Vercel reálně
 * nastavil. Bez hodnot — jen true/false, ať se pozná mismatch názvů proměnných.
 */
export function storageEnvPresence(): Record<string, boolean> {
  return {
    UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    KV_REST_API_URL: !!process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
    ANALYTICS_SALT: !!process.env.ANALYTICS_SALT,
    ANALYTICS_STATS_KEY: !!process.env.ANALYTICS_STATS_KEY,
  };
}

async function upstashPipeline(commands: (string | number)[][]): Promise<unknown[]> {
  const env = upstashEnv();
  if (!env) throw new Error("upstash env missing");
  const res = await fetch(`${env.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`upstash pipeline failed: ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((item) => {
    if (item.error) throw new Error(`upstash: ${item.error}`);
    return item.result;
  });
}

/** UTC den "YYYY-MM-DD" posunutý o `minusDays` zpět. */
function dayString(minusDays = 0): string {
  const d = new Date(Date.now() - minusDays * 86_400_000);
  return d.toISOString().slice(0, 10);
}

function fsDir(): string {
  return path.join(process.cwd(), ".analytics-data");
}

/** Append eventu — Upstash / Blueboard most / lokální JSONL. Nikdy nehází. */
export async function appendEvent(event: AnalyticsEvent): Promise<void> {
  const day = event.ts.slice(0, 10);
  const line = JSON.stringify(event);
  try {
    if (upstashEnv()) {
      const key = KEY_PREFIX + day;
      await upstashPipeline([
        ["RPUSH", key, line],
        ["EXPIRE", key, RETENTION_DAYS * 86_400],
      ]);
      return;
    }
    if (remoteEnabled()) {
      const { url, secret } = remoteConfig();
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-An-Secret": secret },
        body: line,
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`remote ingest failed: ${res.status}`);
      return;
    }
    const dir = fsDir();
    await mkdir(dir, { recursive: true });
    await appendFile(dir + `/events-${day}.jsonl`, line + "\n", "utf8");
  } catch (err) {
    console.error("[analytics] append failed:", err);
  }
}

function parseLines(lines: string[]): AnalyticsEvent[] {
  const events: AnalyticsEvent[] = [];
  for (const line of lines) {
    try {
      const e = JSON.parse(line) as AnalyticsEvent;
      if (e && typeof e === "object" && typeof e.type === "string") events.push(e);
    } catch {
      /* poškozený řádek — přeskočit */
    }
  }
  return events;
}

/**
 * Přečte eventy za `days` dní počínaje `offset` dní zpátky.
 * offset=0, days=7 → posledních 7 dní včetně dneška (UTC).
 */
export async function readEvents(days: number, offset = 0): Promise<AnalyticsEvent[]> {
  const dayList: string[] = [];
  for (let i = offset; i < offset + days; i++) dayList.push(dayString(i));

  try {
    if (upstashEnv()) {
      const results = await upstashPipeline(
        dayList.map((day) => ["LRANGE", KEY_PREFIX + day, 0, -1])
      );
      return results.flatMap((r) => parseLines(Array.isArray(r) ? (r as string[]) : []));
    }
    if (remoteEnabled()) {
      const { url, secret } = remoteConfig();
      const res = await fetch(`${url}?days=${days}&offset=${offset}`, {
        headers: { "X-An-Secret": secret },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`remote read failed: ${res.status}`);
      const data = (await res.json()) as unknown;
      return Array.isArray(data)
        ? (data as AnalyticsEvent[]).filter((e) => e && typeof e.type === "string")
        : [];
    }
    const chunks = await Promise.all(
      dayList.map(async (day) => {
        try {
          const raw = await readFile(path.join(fsDir(), `events-${day}.jsonl`), "utf8");
          return parseLines(raw.split("\n").filter(Boolean));
        } catch {
          return [];
        }
      })
    );
    return chunks.flat();
  } catch (err) {
    console.error("[analytics] read failed:", err);
    return [];
  }
}

/** Eventy za posledních `minutes` minut (živý náhled) — čte dnešek + včerejšek. */
export async function readRecent(minutes = 30): Promise<AnalyticsEvent[]> {
  const cutoff = Date.now() - minutes * 60_000;
  const events = await readEvents(2, 0);
  return events.filter((e) => {
    const ts = Date.parse(e.ts ?? "");
    return Number.isFinite(ts) && ts >= cutoff;
  });
}

/**
 * Server-side zaznamenání eventu z API route (např. conversion v /api/leads).
 * IP + UA bere z request headers; boti a nevalidní payloady se tiše zahodí.
 */
export async function recordEvent(
  req: Request,
  payload: Record<string, unknown>
): Promise<void> {
  try {
    const ua = req.headers.get("user-agent") ?? "";
    if (isBot(ua)) return;
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
    const event = buildEvent(payload, ip, ua);
    if (event) await appendEvent(event);
  } catch (err) {
    console.error("[analytics] recordEvent failed:", err);
  }
}
