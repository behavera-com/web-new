"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type EmailCard = {
  initial: string;
  name: string;
  meta: string;
  date: string;
  subject: string;
  body: string;
  sign: string;
  badge: string;
};

function snippet(body: string, max = 88) {
  const clean = body.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trim() + "…" : clean;
}


export default function EmailInbox({ emails }: { emails: EmailCard[] }) {
  const [index, setIndex] = useState(0);
  const total = emails.length;
  const active = emails[index];

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + total) % total),
    [total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      )
        return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="relative mx-auto" style={{ maxWidth: 1180 }}>
      {/* Frame */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "var(--color-paper)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 40px 80px -40px rgba(0,0,0,0.7), 0 16px 36px -22px rgba(0,0,0,0.45)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between px-5 md:px-6 py-3.5"
          style={{
            borderBottom: "1px solid var(--color-rule)",
            background:
              "linear-gradient(180deg, #f4f1fa 0%, var(--color-paper) 100%)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#e35b54" }}
              aria-hidden
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#e2b350" }}
              aria-hidden
            />
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#5fb463" }}
              aria-hidden
            />
            <span
              className="ml-3 hidden sm:inline"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.18em",
                color: "var(--color-muted)",
                textTransform: "uppercase",
              }}
            >
              Doručená pošta · Behavera
            </span>
          </div>
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.18em",
              color: "var(--color-muted)",
              textTransform: "uppercase",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--sj-signal-green)" }}
              aria-hidden
            />
            <span>Připojeno · {String(total).padStart(2, "0")} zpráv</span>
          </div>
        </div>

        {/* Body: list + reader */}
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr]">
          {/* List */}
          <ul
            role="tablist"
            aria-label="Seznam zpráv"
            className="max-h-[420px] md:max-h-[560px] overflow-y-auto"
            style={{ borderRight: "1px solid var(--color-rule)" }}
          >
            {emails.map((email, i) => {
              const isActive = i === index;
              return (
                <li key={i}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setIndex(i)}
                    className="group block w-full text-left px-5 py-4 transition-colors"
                    style={{
                      borderBottom: "1px solid var(--color-rule)",
                      background: isActive
                        ? "linear-gradient(90deg, rgba(139,92,246,0.10), rgba(139,92,246,0.02))"
                        : "transparent",
                      borderLeft: isActive
                        ? "3px solid var(--color-purple-accent)"
                        : "3px solid transparent",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-none text-white"
                        style={{
                          background: isActive
                            ? "var(--color-purple-deep)"
                            : "linear-gradient(135deg, #5b3aa8 0%, #2d1b69 100%)",
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                        aria-hidden
                      >
                        {email.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className="truncate"
                            style={{
                              fontSize: 14,
                              fontWeight: isActive ? 600 : 500,
                              color: "var(--color-ink)",
                            }}
                          >
                            {email.name}
                          </span>
                          <span
                            className="flex-none"
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 9.5,
                              letterSpacing: "0.14em",
                              color: "var(--color-muted)",
                            }}
                          >
                            {email.date}
                          </span>
                        </div>
                        <div
                          className="mt-0.5 truncate"
                          style={{
                            fontSize: 12.5,
                            color: "var(--color-ink)",
                            opacity: 0.88,
                            fontWeight: 500,
                          }}
                        >
                          {email.subject}
                        </div>
                        <div
                          className="mt-1 line-clamp-2"
                          style={{
                            fontSize: 12,
                            color: "var(--color-muted)",
                            lineHeight: 1.45,
                          }}
                        >
                          {snippet(email.body)}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 9,
                              letterSpacing: "0.16em",
                              color: "var(--color-purple-accent)",
                              border: "1px solid rgba(139,92,246,0.3)",
                              padding: "2px 6px",
                              borderRadius: 2,
                            }}
                          >
                            {email.badge.split("·")[1]?.trim() || "CZ"}
                          </span>
                          {isActive && (
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 9,
                                letterSpacing: "0.16em",
                                color: "var(--sj-signal-green)",
                              }}
                            >
                              ● ČTENO
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Reader */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 md:p-10 lg:p-12 flex flex-col h-full"
                aria-live="polite"
              >
                {/* Headers */}
                <header className="flex items-start gap-4 pb-5" style={{ borderBottom: "1px solid var(--color-rule)" }}>
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-none text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #6b46e0 0%, var(--color-purple-deep) 100%)",
                      fontSize: 18,
                      fontWeight: 500,
                      boxShadow: "0 8px 20px -8px rgba(45,27,105,0.5)",
                    }}
                    aria-hidden
                  >
                    {active.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        style={{
                          fontFamily: "var(--font-fraunces)",
                          fontSize: 19,
                          fontWeight: 500,
                          color: "var(--color-ink)",
                        }}
                      >
                        {active.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          letterSpacing: "0.16em",
                          color: "var(--color-purple-accent)",
                          textTransform: "uppercase",
                          background: "rgba(139,92,246,0.08)",
                          border: "1px solid rgba(139,92,246,0.22)",
                          padding: "2px 7px",
                          borderRadius: 2,
                        }}
                      >
                        {active.badge}
                      </span>
                    </div>
                    <div
                      className="mt-2"
                      style={{
                        fontFamily: "var(--font-fraunces)",
                        fontSize: 17,
                        color: "var(--color-ink)",
                        fontWeight: 500,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {active.subject}
                    </div>
                  </div>
                  <span
                    className="hidden sm:inline-block flex-none"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      color: "var(--color-muted)",
                    }}
                  >
                    {active.date}
                  </span>
                </header>

                {/* Body */}
                <blockquote
                  className="py-7 md:py-9 flex-1"
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "clamp(17px, 1.5vw, 21px)",
                    lineHeight: 1.65,
                    color: "var(--color-ink)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      display: "block",
                      fontFamily: "var(--font-fraunces)",
                      fontStyle: "italic",
                      fontSize: 56,
                      lineHeight: 0.6,
                      color: "var(--color-purple-soft)",
                      marginBottom: 6,
                      fontVariationSettings: '"opsz" 144,"SOFT" 80',
                    }}
                  >
                    „
                  </span>
                  {active.body}
                  <p
                    className="mt-6"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: 16,
                      fontWeight: 500,
                      color: "var(--color-ink)",
                    }}
                  >
                    {active.sign}
                  </p>
                </blockquote>

                {/* Footer */}
                <footer
                  className="pt-5 flex items-center justify-between gap-4 flex-wrap"
                  style={{ borderTop: "1px solid var(--color-rule)" }}
                >
                  <span
                    className="inline-flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
                      <rect x="0.5" y="0.5" width="11" height="9" stroke="currentColor" />
                      <path d="M0.5 0.5L6 5.5L11.5 0.5" stroke="currentColor" />
                    </svg>
                    Z reálného e-mailu · ověřeno
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Předchozí zpráva"
                      className="w-9 h-9 inline-flex items-center justify-center transition-colors hover:bg-black/5"
                      style={{ border: "1px solid var(--color-rule)", color: "var(--color-ink)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden style={{ transform: "rotate(180deg)" }}>
                        <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        color: "var(--color-muted)",
                        minWidth: 56,
                        textAlign: "center",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Další zpráva"
                      className="w-9 h-9 inline-flex items-center justify-center transition-colors hover:bg-black/5"
                      style={{ border: "1px solid var(--color-rule)", color: "var(--color-ink)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </footer>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Wax-seal style watermark */}
      <div
        className="hidden lg:block absolute -top-3 -right-3 rotate-6"
        aria-hidden
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          letterSpacing: "0.22em",
          color: "var(--color-purple-soft)",
          background: "rgba(28,18,55,0.92)",
          border: "1px solid rgba(196,176,255,0.35)",
          padding: "6px 10px",
          textTransform: "uppercase",
        }}
      >
        ARCHIV · BEHAVERA
      </div>
    </div>
  );
}
