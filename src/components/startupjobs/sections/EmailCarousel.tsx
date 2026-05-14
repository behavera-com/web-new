"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export type EmailCard = {
  initial: string;
  name: string;
  meta: string;
  date: string;
  body: string;
  sign: string;
  badge: string;
};

const SWIPE_THRESHOLD = 60;
const PEEK_OFFSET_MOBILE = 78;
const PEEK_OFFSET_DESKTOP = 92;
const SIDE_SCALE = 0.84;
const SIDE_OPACITY = 0.42;
const SIDE_BLUR = 2.4;

export default function EmailCarousel({ emails }: { emails: EmailCard[] }) {
  const [index, setIndex] = useState(0);
  const total = emails.length;
  const hasNav = total > 1;
  const [offsetPct, setOffsetPct] = useState(PEEK_OFFSET_DESKTOP);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function update() {
      setOffsetPct(
        window.innerWidth < 768 ? PEEK_OFFSET_MOBILE : PEEK_OFFSET_DESKTOP,
      );
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  const jumpTo = useCallback((target: number) => setIndex(target), []);

  useEffect(() => {
    if (!hasNav) return;
    function onKey(e: KeyboardEvent) {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, hasNav]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6 md:mb-7 max-w-[760px] mx-auto">
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.16em",
          }}
        >
          ZPRÁVA {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        {hasNav && (
          <div className="flex items-center gap-2">
            <NavButton direction="prev" onClick={() => go(-1)} />
            <NavButton direction="next" onClick={() => go(1)} />
          </div>
        )}
      </div>

      <div
        className="relative overflow-hidden mx-auto"
        style={{ maxWidth: 1200 }}
        aria-roledescription="carousel"
        aria-label="Reálné e-maily kandidátů"
      >
        <div
          className="relative grid place-items-center py-6"
          style={{ gridTemplateAreas: "'stack'" }}
        >
          {emails.map((email, i) => {
            const offset = i - index;
            const abs = Math.abs(offset);
            const isActive = abs === 0;
            const isAdjacent = abs === 1;
            const visible = abs <= 2;

            return (
              <motion.article
                key={i}
                onClick={() => !isActive && isAdjacent && jumpTo(i)}
                drag={isActive && hasNav ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                  else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
                }}
                animate={{
                  x: `${offset * offsetPct}%`,
                  scale: isActive ? 1 : SIDE_SCALE,
                  opacity: isActive ? 1 : isAdjacent ? SIDE_OPACITY : 0,
                  filter: isActive ? "blur(0px)" : `blur(${SIDE_BLUR}px)`,
                  zIndex: isActive ? 10 : Math.max(1, 5 - abs),
                  pointerEvents: visible ? "auto" : "none",
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={
                  "p-7 md:p-12 flex flex-col origin-center " +
                  (isActive
                    ? "cursor-grab active:cursor-grabbing"
                    : isAdjacent
                      ? "cursor-pointer"
                      : "")
                }
                style={{
                  gridArea: "stack",
                  width: "min(560px, calc(100vw - 64px))",
                  background: "var(--color-paper)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "0 28px 60px -28px rgba(0,0,0,0.6), 0 8px 22px -14px rgba(0,0,0,0.4)",
                }}
                aria-roledescription="slide"
                aria-label={`Zpráva ${i + 1} z ${total}`}
                aria-hidden={!isActive}
              >
                <div className="flex items-start gap-3.5 mb-7">
                  <div
                    className="w-11 h-11 rounded-full text-white flex items-center justify-center font-medium flex-none"
                    style={{
                      background: "var(--color-purple-deep)",
                      fontSize: 15,
                    }}
                    aria-hidden="true"
                  >
                    {email.initial}
                  </div>
                  <div className="flex-1 leading-tight min-w-0">
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--color-ink)",
                      }}
                    >
                      {email.name}
                    </div>
                    <div
                      className="mt-1 truncate"
                      style={{ fontSize: 12.5, color: "var(--color-muted)" }}
                    >
                      {email.meta}
                    </div>
                  </div>
                  <span
                    className="flex-none mt-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--color-muted)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    {email.date}
                  </span>
                </div>

                <blockquote
                  className="leading-[1.65] flex-1"
                  style={{ fontSize: 17, color: "var(--color-ink)" }}
                >
                  „{email.body}"
                </blockquote>
                <p
                  className="mt-6"
                  style={{
                    fontSize: 15.5,
                    fontWeight: 500,
                    color: "var(--color-ink)",
                  }}
                >
                  {email.sign}
                </p>

                <div
                  className="mt-8 pt-5 flex items-center justify-between gap-4"
                  style={{ borderTop: "1px solid var(--color-rule)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--color-muted)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    Z REÁLNÉHO E-MAILU
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--color-purple-accent)",
                      letterSpacing: "0.16em",
                    }}
                  >
                    {email.badge}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {hasNav && (
        <div
          className="mt-7 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Vyberte zprávu"
        >
          {emails.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Zpráva ${i + 1} z ${total}`}
              onClick={() => jumpTo(i)}
              className="transition-all"
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background:
                  i === index
                    ? "var(--color-purple-accent)"
                    : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Předchozí zpráva" : "Další zpráva"}
      className="w-10 h-10 inline-flex items-center justify-center transition-colors hover:bg-white/10"
      style={{
        border: "1px solid rgba(255,255,255,0.2)",
        color: "rgba(255,255,255,0.85)",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        style={{ transform: isPrev ? "rotate(180deg)" : "none" }}
      >
        <path
          d="M3 7h8m0 0L7 3m4 4l-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
