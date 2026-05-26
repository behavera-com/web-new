"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

function kebabToSnake(s: string): string {
  return s.replace(/-/g, "_");
}

/**
 * Reads data-event-* attrs (e.g. data-event-cta-id) and returns a params object
 * with snake_case keys (cta_id). data-event-name is the GA4 event name.
 */
function readEventDataset(el: HTMLElement): { event: string; params: Record<string, string> } | null {
  const attrs = el.attributes;
  let eventName = "";
  const params: Record<string, string> = {};
  for (let i = 0; i < attrs.length; i++) {
    const a = attrs[i];
    if (!a.name.startsWith("data-event-")) continue;
    const key = a.name.slice("data-event-".length);
    if (key === "name") {
      eventName = a.value;
    } else {
      params[kebabToSnake(key)] = a.value;
    }
  }
  return eventName ? { event: eventName, params } : null;
}

function findLinkLocation(el: HTMLElement): string | undefined {
  let cur: HTMLElement | null = el;
  while (cur) {
    const v = cur.getAttribute("data-link-location");
    if (v) return v;
    cur = cur.parentElement;
  }
  return undefined;
}

export default function AnalyticsBridge() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest<HTMLElement>("a, button, [data-event-name]");
      if (!anchor) return;

      // 1) Explicit declarative tracking via data-event-* attrs.
      const explicit = readEventDataset(anchor);
      if (explicit) {
        track(explicit.event, explicit.params);
        return;
      }

      // 2) Auto-detect tel: / mailto: clicks.
      if (anchor.tagName === "A") {
        const href = (anchor as HTMLAnchorElement).getAttribute("href") || "";
        if (href.startsWith("tel:")) {
          track("phone_click", { link_location: findLinkLocation(anchor) || "unknown" });
        } else if (href.startsWith("mailto:")) {
          track("email_click", { link_location: findLinkLocation(anchor) || "unknown" });
        }
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
