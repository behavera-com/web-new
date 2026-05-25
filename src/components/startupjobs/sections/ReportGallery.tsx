"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Slide = {
  key: string;
  src: string;
  alt: string;
  label: string;
  benefit: string;
  objectPosition?: string;
};

type LegendItem = {
  idx: string;
  label: string;
  icon: ReactNode;
};

const legend: LegendItem[] = [
  {
    idx: "01",
    label: "kulturní fit",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    idx: "02",
    label: "manažerské kompetence",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="8" x2="20" y2="8" />
        <line x1="4" y1="14" x2="20" y2="14" />
        <circle cx="9" cy="8" r="2.2" fill="#fff" />
        <circle cx="15" cy="14" r="2.2" fill="#fff" />
      </svg>
    ),
  },
  {
    idx: "03",
    label: "kulturní preference",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8.5" cy="9" r="3.2" />
        <circle cx="15.5" cy="9" r="3.2" />
        <path d="M4 19c1.6-2.6 4-4 4.5-4M20 19c-1.6-2.6-4-4-4.5-4" />
      </svg>
    ),
  },
  {
    idx: "04",
    label: "interpretace",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 5h9l3 3v11H6z" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    idx: "05",
    label: "pracovní kompetence",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 18l5-5 3 3 4-5 4 5" />
        <circle cx="6" cy="7" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
];

const slides: Slide[] = [
  {
    key: "fit",
    src: "/startupjobs/product/report-culture-fit.png",
    alt: "Behavera — Culture Fit srovnání více kandidátů (Claire Gibson, Paul Gillies, Andrew Irvine, Elisa Moore, Jason Gilbert) napříč sedmi dimenzemi.",
    label: "Kulturní fit",
    benefit: "Srovnání kandidátů s profilem role na 7 dimenzích — na první pohled vidíte, kdo sedí a kde si kdo nárokuje pozornost.",
    objectPosition: "center center",
  },
  {
    key: "kompetence",
    src: "/startupjobs/product/report-manager-comp.png",
    alt: "Behavera — detail manažerských kompetencí kandidátky s rozkladem silných stránek, rizik a doporučení pro rozvoj.",
    label: "Manažerské kompetence",
    benefit: "Co si v pohovoru ověřit a co naopak využít.",
  },
  {
    key: "culture",
    src: "/startupjobs/product/report-culture-pref.png",
    alt: "Behavera — culture preference Výkon/Vztahy s konkrétními doporučeními jak motivovat, vést a odměňovat.",
    label: "Kulturní preference",
    benefit: "Konkrétní návod, jak člověka vést, motivovat a odměnit.",
  },
  {
    key: "interpretace",
    src: "/startupjobs/product/report-interpretation.png",
    alt: "Behavera — interpretace osobních preferencí kandidáta v kontextu role: Jistota/Dynamika, Nezávislost/Hierarchie, Otevřenost/Tradicionalismus a Individualita/Tým.",
    label: "Interpretace",
    benefit: "Osobní preference přeložené do kontextu konkrétní role.",
  },
  {
    key: "pracovni",
    src: "/startupjobs/product/report-work-comp.png",
    alt: "Behavera — přehled pracovních kompetencí kandidáta s flagem oblasti Numerické a logické myšlení k ověření v pohovoru.",
    label: "Pracovní kompetence",
    benefit: "Flagy oblastí, které stojí za to ověřit v pohovoru.",
  },
];

export default function ReportGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isOpen = openIndex !== null;


  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + slides.length) % slides.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % slides.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  return (
    <>
      <div className="sj-report-legend" role="tablist" aria-label="Náhledy reportu">
        {legend.map((l, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={l.idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`report-slide-${slides[i].key}`}
              onClick={() => { setActiveIndex(i); setOpenIndex(i); }}
              className={isActive ? "is-active" : undefined}
            >
              <span className="sj-report-legend-icon" aria-hidden="true">{l.icon}</span>
              <b>{l.idx}</b>
              <span>{l.label}</span>
            </button>
          );
        })}
      </div>
      <div className="sj-report-grid">
        {slides.map((s, i) => {
          const isHero = i === 0;
          return (
            <div
              key={s.key}
              id={`report-slide-${s.key}`}
              data-slide-index={i}
              data-hero={isHero ? "true" : undefined}
              data-active={activeIndex === i ? "true" : undefined}
              className="sj-report-slide"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Zvětšit náhled: ${s.label} — ${s.benefit}`}
                className="sj-report-tile"
              >
                <div className="sj-tile-shell">
                  <div className="sj-tile-chrome" aria-hidden="true">
                    <span className="sj-tile-dot" data-tone="r" />
                    <span className="sj-tile-dot" data-tone="y" />
                    <span className="sj-tile-dot" data-tone="g" />
                    <span className="sj-tile-url">app.behavera.cz / report</span>
                  </div>
                  <div className="sj-tile-frame">
                    <img
                      src={s.src}
                      alt={s.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
                    />
                    <span className="sj-tile-index" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </span>
                    <span className="sj-tile-zoom" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>Klik · zvětšit</span>
                    </span>
                  </div>
                </div>
                <div className="sj-tile-caption">
                  <span className="sj-tile-caption-meta">
                    <span className="sj-tile-caption-idx">
                      {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </span>
                    <span>{s.label}</span>
                  </span>
                  <span className="sj-tile-caption-benefit">{s.benefit}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {isOpen && openIndex !== null && typeof document !== "undefined" &&
        createPortal(
          <Lightbox
            slide={slides[openIndex]}
            index={openIndex}
            total={slides.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />,
          document.body,
        )}
    </>
  );
}

function Lightbox({
  slide,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  slide: Slide;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Náhled: ${slide.label}`}
      onClick={onClose}
      className="sj-lightbox"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Zavřít náhled"
        className="sj-lightbox-close"
      >
        ×
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Předchozí snímek"
        className="sj-lightbox-nav sj-lightbox-nav--prev"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Další snímek"
        className="sj-lightbox-nav sj-lightbox-nav--next"
      >
        ›
      </button>

      <figure
        onClick={(e) => e.stopPropagation()}
        className="sj-lightbox-figure"
      >
        <img src={slide.src} alt={slide.alt} className="sj-lightbox-img" />
        <figcaption
          className="sj-lightbox-caption"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span style={{ color: "#c4b0ff", marginRight: 10 }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {slide.label} — {slide.benefit}
        </figcaption>
      </figure>
    </div>
  );
}
