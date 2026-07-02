/**
 * client.ts — bezpečné volání first-party beaconu z React komponent.
 *
 * `window.__track` definuje AnalyticsBeacon (afterInteractive skript) — když
 * uživatel klikne dřív, než se skript stihne načíst, pošle se event přímým
 * sendBeacon fallbackem se stejným payload tvarem. Nikdy nehází.
 */

declare global {
  interface Window {
    __track?: (type: string, payload?: Record<string, unknown>) => void;
  }
}

export function trackFirstParty(type: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.__track === "function") {
      window.__track(type, payload);
      return;
    }
    // stejný localhost guard jako v beaconu (?track_debug=1 ho vypne)
    const debug = /(?:\?|&)track_debug=1/.test(location.search);
    if (!debug && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
    const body = JSON.stringify({ type, ...payload });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/track", { method: "POST", body, keepalive: true });
    }
  } catch {
    /* analytika nikdy nesmí ovlivnit stránku */
  }
}
