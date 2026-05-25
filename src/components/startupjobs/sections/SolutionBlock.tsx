"use client";

import { useEffect, useRef, useState } from "react";
import DualCta from "../ui/DualCta";

type Pin = {
  x: string;
  y: string;
  /** Short bold headline shown in the popover. */
  label: string;
  /** One-line explanation rendered below the label. */
  description: string;
};

export type SolutionBlockData = {
  num: string;
  tag: string;
  title: React.ReactNode;
  body: React.ReactNode;
  details: React.ReactNode[];
  image: { src: string; alt: string; caption: string; video?: string };
  pins: Pin[];
  reverse?: boolean;
};

export default function SolutionBlock({
  block,
  showCta,
}: {
  block: SolutionBlockData;
  showCta: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const figureRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = figureRef.current;
    if (!node) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Tap-outside / Escape zavře otevřený tooltip — důležité na mobilu, kde
  // není mouseleave.
  useEffect(() => {
    if (hovered === null) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      const fig = figureRef.current;
      if (fig && target && !fig.contains(target)) setHovered(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHovered(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [hovered]);

  const isDimmed = (i: number) => hovered !== null && hovered !== i;

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <figure
        ref={figureRef}
        className={`lg:col-span-4 relative ${
          block.reverse ? "lg:order-2 lg:ml-auto" : "lg:order-1"
        }`}
        style={{ paddingTop: 12, paddingBottom: 12, maxWidth: 360 }}
        data-revealed={revealed ? "true" : "false"}
      >
        {/* atmosferický radial bloom */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "-12%",
            left: "-8%",
            right: "-8%",
            bottom: "-12%",
            background:
              "radial-gradient(60% 55% at 35% 45%, rgba(139,92,246,0.32) 0%, rgba(139,92,246,0.14) 35%, rgba(45,27,105,0.06) 60%, transparent 78%)",
            filter: "blur(8px)",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            right: "-12%",
            width: "55%",
            height: "55%",
            background:
              "radial-gradient(closest-side, rgba(196,176,255,0.28) 0%, rgba(196,176,255,0.08) 55%, transparent 80%)",
            filter: "blur(6px)",
            zIndex: 0,
          }}
        />

        {/* screenshot */}
        <div
          className="relative bg-white"
          style={{
            border: "1px solid var(--color-rule)",
            borderRadius: 2,
            boxShadow:
              "0 40px 80px -32px rgba(45,27,105,0.40), 0 20px 42px -22px rgba(139,92,246,0.28), 0 1px 0 rgba(255,255,255,0.85) inset",
            zIndex: 1,
          }}
        >
          {/* Vnitřní klip jen na image/video — tooltipy a piny zůstávají
              nad oblastí ořezu, takže můžou volně přečnívat přes okraj
              figure bez zaříznutí (jako u úzkých col-span-4 layoutů). */}
          <div style={{ overflow: "hidden", borderRadius: 2 }}>
            {block.image.video ? (
              <video
                src={block.image.video}
                poster={block.image.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={block.image.alt}
                className="block w-full h-auto"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={block.image.src}
                alt={block.image.alt}
                className="block w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>

          {block.pins.map((pin, pi) => {
            const xNum = parseFloat(pin.x);
            const yNum = parseFloat(pin.y);
            // Flip the popover so it never falls off the figure edge.
            const flipX = xNum > 55;
            const flipY = yNum > 60;
            const isOpen = hovered === pi;
            return (
              <div
                key={pi}
                className="sj-pin-wrap"
                style={{
                  position: "absolute",
                  left: pin.x,
                  top: pin.y,
                  transform: "translate(-50%, -50%)",
                  zIndex: isOpen ? 5 : 3,
                }}
              >
                <button
                  type="button"
                  className="sj-pin"
                  data-active={isOpen ? "true" : "false"}
                  data-dimmed={isDimmed(pi) ? "true" : "false"}
                  data-revealed={revealed ? "true" : "false"}
                  onMouseEnter={() => setHovered(pi)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(pi)}
                  onBlur={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHovered(isOpen ? null : pi);
                  }}
                  aria-expanded={isOpen}
                  aria-label={`${pin.label}: ${pin.description}`}
                  style={
                    {
                      ["--pin-i" as string]: String(pi),
                    } as React.CSSProperties
                  }
                >
                  <span className="sj-pin-dot">{pi + 1}</span>
                  <span className="sj-pin-pulse" aria-hidden />
                </button>
                <div
                  role="tooltip"
                  className="sj-pin-tip"
                  data-open={isOpen ? "true" : "false"}
                  data-flip-x={flipX ? "true" : "false"}
                  data-flip-y={flipY ? "true" : "false"}
                >
                  <span className="sj-pin-tip-label">{pin.label}</span>
                  <span className="sj-pin-tip-body">{pin.description}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* corner registration marks */}
        {[
          { top: -8, left: -8, bt: true, bl: true },
          { top: -8, right: -8, bt: true, br: true },
          { bottom: 38, left: -8, bb: true, bl: true },
          { bottom: 38, right: -8, bb: true, br: true },
        ].map((c, ci) => (
          <span
            key={ci}
            aria-hidden
            className="absolute hidden md:block"
            style={{
              top: c.top,
              bottom: c.bottom,
              left: c.left,
              right: c.right,
              width: 12,
              height: 12,
              borderTop: c.bt ? "1.5px solid var(--color-purple-deep)" : undefined,
              borderBottom: c.bb ? "1.5px solid var(--color-purple-deep)" : undefined,
              borderLeft: c.bl ? "1.5px solid var(--color-purple-deep)" : undefined,
              borderRight: c.br ? "1.5px solid var(--color-purple-deep)" : undefined,
              zIndex: 2,
            }}
          />
        ))}

        <figcaption
          className="mt-5"
          style={{ position: "relative", zIndex: 1 }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--color-purple-deep)",
              letterSpacing: "0.18em",
              borderTop: "1px solid var(--color-rule)",
              paddingTop: 6,
              display: "block",
            }}
          >
            {block.image.caption}
          </span>
        </figcaption>
      </figure>

      <div
        className={`lg:col-span-8 ${
          block.reverse ? "lg:order-1 lg:pr-4" : "lg:order-2 lg:pl-4"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span
            className="w-7 h-7 rounded-full text-white flex items-center justify-center"
            style={{
              background: "var(--color-purple-deep)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
            }}
          >
            {block.num}
          </span>
          <span className="sj-step-num">{block.tag}</span>
        </div>

        <h3
          className="sj-display mb-5 max-w-[18ch]"
          style={{
            fontSize: "clamp(28px, 3.2vw, 38px)",
            lineHeight: 1.08,
          }}
        >
          {block.title}
        </h3>

        <p
          className="leading-[1.6] max-w-[44ch]"
          style={{
            fontSize: 17,
            color: "rgba(28,18,55,0.78)",
          }}
        >
          {block.body}
        </p>

        <ul className="mt-7 space-y-2">
          {block.details.map((d, di) => (
            <li
              key={di}
              className="sj-detail-row"
              data-active={hovered === di ? "true" : "false"}
              data-dimmed={isDimmed(di) ? "true" : "false"}
              onMouseEnter={() => setHovered(di)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="sj-detail-num" aria-hidden>
                {di + 1}
              </span>
              <p className="sj-detail-text">{d}</p>
            </li>
          ))}
        </ul>

        {showCta && <DualCta className="mt-10" />}
      </div>
    </div>
  );
}
