declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type TrackParams = Record<string, unknown>;

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "ev_" + Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

export function setUserProperty(name: string, value: string): void {
  track("set_user_property", { user_properties: { [name]: value } });
}
