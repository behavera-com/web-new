/**
 * /api/track — cookieless first-party analytics beacon (vzor katalogodpadu).
 *
 * POST JSON tělo (viz lib/tracking/events.ts) → append do úložiště.
 * Fire-and-forget: nikdy nevrací chybu do klienta — vždy 204, i při zahození
 * neplatného / cizího / bot requestu. Analytika nikdy nesmí ovlivnit stránku.
 */

import { buildEvent, isBot } from "@/lib/tracking/events";
import { appendEvent } from "@/lib/tracking/store";

const MAX_BODY_BYTES = 8192;

/** Obrana proti cizímu embedu beaconu — Origin/Referer musí být náš web. */
function originOk(req: Request): boolean {
  const src = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
  let host = "";
  try {
    host = new URL(src).hostname;
  } catch {
    return false;
  }
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "behavera.com" ||
    host.endsWith(".behavera.com") ||
    host.endsWith(".vercel.app")
  );
}

export async function POST(req: Request) {
  const done = () => new Response(null, { status: 204 });

  const ua = req.headers.get("user-agent") ?? "";
  if (!originOk(req) || isBot(ua)) return done();
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return done();

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return done();
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const event = buildEvent(payload, ip, ua);
  if (event) await appendEvent(event);

  return done();
}
