"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import SoftScrollCta from "../ui/SoftScrollCta";

type Card = {
  tag: string;
  tagTone: "blue" | "green" | "amber" | "purple";
  title: string;
  desc: string;
  shot: string;
  shotAlt: string;
  shotW: number;
  shotH: number;
  shotVideo?: string;
  variant?: "default" | "alt" | "dark";
  features: string[];
  cta?: { label: string; href: string };
};

const cards: Card[] = [
  {
    tag: "01 · Diagnóza",
    tagTone: "blue",
    title: "Nejdřív pochopíme, jak váš tým reálně funguje.",
    desc:
      "Krátký anonymní assessment přes SMS, e-mail nebo Slack zmapuje kulturu a dynamiku týmu, do kterého nabíráte. Z odpovědí vznikne behaviorální profil týmu — žádné domněnky o tom, „koho hledáme“, ale data o tom, co u vás funguje.",
    shot: "/startupjobs/product/culture-fit-srovnani.png",
    shotAlt: "Behavera — Culture Fit srovnání kandidátů napříč sedmi dimenzemi",
    shotVideo: "/startupjobs/product/culture-fit.mp4",
    shotW: 880,
    shotH: 540,
    variant: "default",
    features: [
      "Mapování kultury napříč 7 dimenzemi",
      "Profil týmu, do kterého nabíráte",
      "Podklad pro blueprint role",
    ],
  },
  {
    tag: "02 · Blueprint",
    tagTone: "purple",
    title: "Z dat o týmu vznikne profil člověka, který tam zapadne.",
    desc:
      "Co konkrétně chybí, co by tým posílilo, jaké chování ve vaší kultuře přežije. Manažer dostane strukturovaný blueprint role — ne generický JD, ale behaviorální profil postavený na realitě vašeho týmu.",
    shot: "/startupjobs/product/manager-playbook.png",
    shotAlt: "Behavera — behaviorální blueprint role: detail dimenze Individualita/Tým s popisem chování a doporučeními.",
    shotW: 682,
    shotH: 568,
    variant: "alt",
    features: [
      "Behaviorální profil role z dat",
      "Gap analýza vs. stávající tým",
      "Otázky k pohovoru šité na míru",
    ],
  },
  {
    tag: "03 · Match",
    tagTone: "green",
    title: "Teprve teď měříme fit konkrétních kandidátů — proti vašemu blueprintu.",
    desc:
      "Hra v prohlížeči (30–60 min) místo psych. testu. Výstup: fit % na vaši roli a váš tým, ne na obecnou personu. Recruiter dostává hotový podklad k pohovoru včetně otázek na rizikové oblasti.",
    shot: "/startupjobs/product/candidate-fit.png",
    shotAlt: "Candidate Fit — behaviorální fit kandidáta na konkrétní roli",
    shotW: 651,
    shotH: 902,
    variant: "default",
    features: [
      "Behaviorální hra místo testu",
      "Fit % na konkrétní tým",
      "Strukturovaná zjištění k pohovoru",
    ],
    cta: { label: "Podívat se na ukázku hry", href: "#demo" },
  },
];

export default function ProductTriptych() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + cards.length) % cards.length,
      ),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % cards.length)),
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
    <section
      id="produkt"
      className="sj-reveal sj-grain scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{
        paddingTop: "clamp(72px, 9vw, 112px)",
        paddingBottom: "clamp(72px, 9vw, 112px)",
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-5 inline-flex">
              02 · Platforma
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Většina firem hledá kandidáty dřív, než ví, koho potřebuje.{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                My
              </em>{" "}
              to děláme obráceně.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 self-end">
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.7)",
              }}
            >
              Behavera nejdřív zmapuje vaši kulturu a tým — z toho vznikne
              behaviorální profil role. Teprve pak měříme, kteří kandidáti
              reálně zapadnou. Tři vrstvy, jeden datový základ.
            </p>
          </div>
        </div>

        <div className="sj-triptych-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 items-stretch">
          {cards.map((c, i) => (
            <div key={c.tag} className="sj-triptych-cell relative flex h-full">
            <article
              className={`sj-product-card flex-1 h-full ${
                c.variant === "alt"
                  ? "sj-product-card--alt"
                  : c.variant === "dark"
                  ? "sj-product-card--dark"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`sj-tag sj-tag-${c.tagTone}`}>{c.tag}</span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 380,
                  fontSize: 24,
                  lineHeight: 1.18,
                  letterSpacing: "-0.02em",
                  color:
                    c.variant === "dark" ? "#f3eeff" : "var(--color-ink)",
                  textWrap: "balance",
                }}
              >
                {c.title}
              </h3>

              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color:
                    c.variant === "dark"
                      ? "rgba(243,238,255,0.7)"
                      : "rgba(28,18,55,0.7)",
                }}
              >
                {c.desc}
              </p>

              <ul className="flex flex-col gap-1.5 mt-1">
                {c.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5"
                    style={{
                      fontSize: 13,
                      color:
                        c.variant === "dark"
                          ? "rgba(243,238,255,0.85)"
                          : "var(--color-ink)",
                    }}
                  >
                    <span
                      className="inline-block"
                      style={{
                        width: 14,
                        height: 1,
                        background:
                          c.variant === "dark"
                            ? "rgba(243,238,255,0.5)"
                            : "var(--color-purple-deep)",
                        opacity: 0.7,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {c.cta && (
                <a
                  href={c.cta.href}
                  className="sj-triptych-cta"
                >
                  {c.cta.label}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}

              <div className="sj-product-shot mt-auto">
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Zvětšit náhled: ${c.shotAlt}`}
                  className="sj-product-shot-link group relative block w-full overflow-hidden rounded-t-lg text-left"
                  style={{
                    /* Aspect 3:4 (portrait) — sized to fit the tallest media
                       (card 03 phone screenshot 651×902). Video 16:9 a
                       landscape obrázky se vycentrují s pillarbox/letterbox,
                       který splývá s gradient pozadím. Click → otevře
                       lightbox (stejný pattern jako ReportGallery). */
                    aspectRatio: "3 / 4",
                    border: "1px solid var(--color-rule)",
                    borderBottom: 0,
                    background:
                      "linear-gradient(180deg, #fbfafd 0%, #f4eefc 100%)",
                    boxShadow:
                      "0 20px 40px -22px rgba(45, 27, 105, 0.18)",
                    cursor: "zoom-in",
                    padding: 0,
                  }}
                >
                  {c.shotVideo ? (
                    <video
                      src={c.shotVideo}
                      poster={c.shot}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={c.shotAlt}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center center",
                        pointerEvents: "none",
                      }}
                    />
                  ) : (
                    <Image
                      src={c.shot}
                      alt={c.shotAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center center",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  {/* Hover zoom affordance — appears on hover/focus */}
                  <span
                    aria-hidden
                    className="sj-product-shot-zoom"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px 6px 8px",
                      borderRadius: 999,
                      background: "rgba(28,18,55,0.78)",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      opacity: 0,
                      transform: "translateY(-4px)",
                      transition:
                        "opacity 240ms ease, transform 240ms cubic-bezier(0.2,0.8,0.2,1)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      pointerEvents: "none",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <circle cx="11" cy="11" r="7" />
                      <line x1="16.5" y1="16.5" x2="21" y2="21" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    <span>Klik · zvětšit</span>
                  </span>
                </button>
              </div>
            </article>
            {i < cards.length - 1 && (
              <span className="sj-triptych-arrow" aria-hidden="true">
                →
              </span>
            )}
            </div>
          ))}
        </div>

        <SoftScrollCta target="#demo" label="Ukázat v praxi" />
      </div>

      {isOpen && openIndex !== null && typeof document !== "undefined" &&
        createPortal(
          <Lightbox
            card={cards[openIndex]}
            index={openIndex}
            total={cards.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />,
          document.body,
        )}
    </section>
  );
}

function Lightbox({
  card,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  card: Card;
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
      aria-label={`Náhled: ${card.tag}`}
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
        {card.shotVideo ? (
          <video
            src={card.shotVideo}
            poster={card.shot}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="sj-lightbox-img"
            aria-label={card.shotAlt}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={card.shot} alt={card.shotAlt} className="sj-lightbox-img" />
        )}
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
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          {card.tag} — {card.title}
        </figcaption>
      </figure>
    </div>
  );
}
