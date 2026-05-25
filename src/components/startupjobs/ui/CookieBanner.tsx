"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "sj-cookie-consent-v1";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function pushConsent(value: Consent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cookie_consent_update",
    consent_state: value,
  });
  window.dataLayer.push("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== "granted" && stored !== "denied") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const decide = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    pushConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sj-cookie-title"
      aria-describedby="sj-cookie-desc"
      className="sj-cookie-banner"
    >
      <div className="sj-cookie-backdrop" aria-hidden />
      <div className="sj-cookie-panel">
        <div className="sj-cookie-inner">
          <div className="sj-cookie-icon" aria-hidden>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="#FFE680" stroke="#0B1A2A" strokeWidth="2" />
              <circle cx="14" cy="16" r="2" fill="#0B1A2A" />
              <circle cx="24" cy="14" r="1.6" fill="#0B1A2A" />
              <circle cx="27" cy="22" r="2.4" fill="#0B1A2A" />
              <circle cx="17" cy="26" r="1.8" fill="#0B1A2A" />
              <circle cx="22" cy="29" r="1.4" fill="#0B1A2A" />
            </svg>
          </div>
          <div className="sj-cookie-text">
            <h2 id="sj-cookie-title" className="sj-cookie-title">
              Cookies a souhlas se zpracováním
            </h2>
            <p id="sj-cookie-desc" className="sj-cookie-desc">
              Na <strong>behavera.com/startupjobs</strong> používáme nezbytné cookies
              pro fungování stránky a — s vaším souhlasem — analytické a marketingové
              cookies (Google Analytics, Google Ads, LinkedIn Insight). Bez souhlasu
              spustíme pouze nezbytné. Souhlas můžete kdykoli změnit. Detaily najdete
              v{" "}
              <Link href="/ochrana-udaju" className="sj-cookie-link">
                zásadách ochrany osobních údajů
              </Link>
              .
            </p>
          </div>
          <div className="sj-cookie-actions">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="sj-cookie-btn sj-cookie-btn--ghost"
            >
              Odmítnout vše
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="sj-cookie-btn sj-cookie-btn--primary"
              autoFocus
            >
              Přijmout vše
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
