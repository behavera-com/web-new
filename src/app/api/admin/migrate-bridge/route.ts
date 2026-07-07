/**
 * /api/admin/migrate-bridge — JEDNORÁZOVÁ migrace historie Blueboard most → Upstash.
 *
 * DOČASNÝ endpoint. Po úspěšné migraci se celý adresář smaže (další deploy).
 * Server má přístup k obojímu (most = default secret v kódu, Upstash = env),
 * takže se nikam nekopírují žádné credentials.
 *
 *   POST ?key=<ANALYTICS_STATS_KEY>[&dry=1]
 *
 * Idempotentní: dedup podle podpisu eventu (ts+type+visitor+rozlišující pole),
 * takže opakované spuštění nezdvojí data. Testovací eventy (path /__*) se
 * přeskakují. dry=1 → jen spočítá, nic nezapíše.
 */

import { createHash, timingSafeEqual } from "node:crypto";
import { readBridgeRaw, readEvents, appendEvents } from "@/lib/tracking/store";
import type { AnalyticsEvent } from "@/lib/tracking/events";

const DEFAULT_KEY = "behast2026";

function keyOk(given: string | null): boolean {
  const expected = process.env.ANALYTICS_STATS_KEY || DEFAULT_KEY;
  if (!given) return false;
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Podpis eventu pro dedup — rozlišující pole napříč všemi typy. */
function sig(e: AnalyticsEvent): string {
  const g = (k: string) => {
    const v = (e as Record<string, unknown>)[k];
    return typeof v === "string" || typeof v === "number" ? String(v) : "";
  };
  return [e.ts, e.type, e.visitor, g("path"), g("form"), g("id"), g("depth"), g("seconds"), g("choice")].join("|");
}

/** Testovací eventy z ladění (path /__…) — do produkčních dat nepatří. */
function isTestEvent(e: AnalyticsEvent): boolean {
  const p = (e as Record<string, unknown>).path;
  return typeof p === "string" && p.startsWith("/__");
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  if (!keyOk(url.searchParams.get("key"))) {
    return Response.json(
      { error: "forbidden" },
      { status: 403, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  }
  const dryRun = url.searchParams.get("dry") === "1";

  let bridge: AnalyticsEvent[];
  let existing: AnalyticsEvent[];
  try {
    bridge = await readBridgeRaw(90, 0);
    existing = await readEvents(90, 0); // aktivní backend = Upstash
  } catch (err) {
    return Response.json(
      { error: "read failed", detail: String(err) },
      { status: 502, headers: { "X-Robots-Tag": "noindex, nofollow" } }
    );
  }

  const seen = new Set(existing.map(sig));
  const candidates = bridge.filter((e) => !isTestEvent(e));
  const toMigrate = candidates.filter((e) => !seen.has(sig(e)));

  const migrated = dryRun ? 0 : await appendEvents(toMigrate);

  return Response.json(
    {
      dry_run: dryRun,
      bridge_total: bridge.length,
      test_events_skipped: bridge.length - candidates.length,
      already_in_upstash: candidates.length - toMigrate.length,
      to_migrate: toMigrate.length,
      migrated,
    },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
  );
}
