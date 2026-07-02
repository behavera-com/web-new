import Script from "next/script";

/**
 * AnalyticsBeacon — cookieless first-party analytics beacon (vzor katalogodpadu).
 *
 * Definuje `window.__track(type, payload)` (globální helper, stejný vzor jako
 * `window.gtag`) a při načtení stránky rovnou pošle `pageview` s UTM parametry.
 * Navíc deleguje kliky: elementy s existující GTM konvencí
 * `data-event-cta-id="..."` a fallback kotvy na #consult/#report/#pilot
 * se logují jako `cta_click`.
 *
 * Doba na stránce (`engagement`): počítá se jen aktivní viditelný čas
 * (Page Visibility API) a odesílá se jako delta při schování tabu /
 * opuštění stránky přes sendBeacon — server delty sčítá per návštěvník.
 *
 * Scroll hloubka (`scroll_depth`): milníky 25/50/75/100 % délky stránky,
 * každý max jednou za pageview. Formuláře (`form_start`): první focus do
 * pole formuláře, identifikace přes id formuláře / nejbližší sekce s id.
 *
 * Bez cookies, bez localStorage identifikátoru — server (/api/track) si sám
 * spočítá týdně rotující nevratný hash návštěvníka z IP+UA, klient neposílá
 * žádný identifikátor. Proto beacon běží nezávisle na cookie consentu (na
 * rozdíl od GTM). Na localhost se tiše vypíná; `?track_debug=1` ho zapne.
 */
export default function AnalyticsBeacon() {
  return (
    <Script id="an-beacon" strategy="afterInteractive">
      {`(function () {
  var debug = /(?:\\?|&)track_debug=1/.test(location.search);
  if (!debug && /^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) return;

  function deviceType() {
    var ua = navigator.userAgent || "";
    if (/Mobi|Android(?!.*Tablet)|iPhone/.test(ua)) return "mobile";
    if (/Tablet|iPad/.test(ua)) return "tablet";
    return "desktop";
  }

  window.__track = function (type, extra) {
    try {
      var payload = Object.assign({ type: type }, extra || {});
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      } else {
        fetch("/api/track", { method: "POST", body: body, keepalive: true });
      }
    } catch (e) {
      /* analytika nikdy nesmí ovlivnit stránku */
    }
  };

  var params = new URLSearchParams(location.search);
  var refHost = null;
  try {
    if (document.referrer) refHost = new URL(document.referrer).hostname;
  } catch (e) {
    /* malformed referrer — ignorovat */
  }
  window.__track("pageview", {
    path: location.pathname,
    host: location.hostname,
    ref_host: refHost,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    device: deviceType(),
  });

  // ── doba na stránce ────────────────────────────────────────────────────
  var visibleSince = document.visibilityState === "visible" ? Date.now() : null;
  var accumMs = 0;

  function flushEngagement() {
    if (visibleSince !== null) {
      accumMs += Date.now() - visibleSince;
      visibleSince = Date.now();
    }
    var seconds = Math.round(accumMs / 1000);
    if (seconds >= 1) {
      window.__track("engagement", { seconds: seconds, path: location.pathname });
      accumMs = 0;
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      flushEngagement();
      visibleSince = null;
    } else {
      visibleSince = Date.now();
    }
  });
  // pagehide je spolehlivější než beforeunload (mobilní Safari, bfcache)
  window.addEventListener("pagehide", flushEngagement);

  // ── scroll hloubka ─────────────────────────────────────────────────────
  var milestones = [25, 50, 75, 100];
  var reached = {};
  function checkScroll() {
    var doc = document.documentElement;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return; // stránka kratší než viewport — neměřit
    var y = window.scrollY || doc.scrollTop || 0;
    var pct = Math.round((y / maxScroll) * 100);
    // stránka se při scrollu dorůstá (lazy animace sekcí) a dno se posouvá —
    // "dočteno" proto měříme vzdáleností ode dna s tolerancí, ne přesným 100 %
    if (doc.scrollHeight - (y + window.innerHeight) < 200) pct = 100;
    for (var i = 0; i < milestones.length; i++) {
      var m = milestones[i];
      if (pct >= m && !reached[m]) {
        reached[m] = true;
        window.__track("scroll_depth", { depth: m, path: location.pathname });
      }
    }
  }
  window.addEventListener("scroll", checkScroll, { passive: true });

  // ── začátek vyplňování formuláře ───────────────────────────────────────
  var formsStarted = {};
  document.addEventListener("focusin", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var form = t.closest("form");
    if (!form) return;
    var idEl = form.id ? form : form.closest("[id]");
    var id = (idEl && idEl.id) || "unknown";
    if (formsStarted[id]) return;
    formsStarted[id] = true;
    window.__track("form_start", { form: id, path: location.pathname });
  });

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var tagged = t.closest("[data-event-cta-id]");
    if (tagged) {
      window.__track("cta_click", { id: tagged.getAttribute("data-event-cta-id"), path: location.pathname });
      return;
    }
    var anchor = t.closest('a[href^="#"]');
    if (anchor && /^#(consult|report|pilot)$/.test(anchor.getAttribute("href") || "")) {
      window.__track("cta_click", { id: anchor.getAttribute("href"), path: location.pathname });
    }
  }, true);
})();`}
    </Script>
  );
}
