"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

const ITEMS: Item[] = [
  { id: "top", label: "Úvod" },
  { id: "proc", label: "Proč" },
  { id: "produkt", label: "5 fází" },
  { id: "demo", label: "Demo" },
  { id: "metodika", label: "Metodika" },
  { id: "compliance", label: "Pro HR & odbory" },
  { id: "pilot", label: "Pilot 2026" },
  { id: "how", label: "Postup" },
  { id: "faq", label: "FAQ" },
  { id: "consult", label: "Kontakt" },
];

// "top" is the <main> wrapper containing every other section — never observe it
// directly, otherwise IO sees it as always "most visible" and overrides peers.
const TRACKED = ITEMS.filter((i) => i.id !== "top");

export default function SectionNav() {
  const [active, setActive] = useState<string>("top");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = TRACKED.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (targets.length === 0) return;

    const HEADER_OFFSET = 160;

    const computeActive = () => {
      const scrollY = window.scrollY;
      const firstTop =
        targets[0].getBoundingClientRect().top + scrollY - HEADER_OFFSET;

      // Above the first tracked section → "Úvod"
      if (scrollY < firstTop) {
        setActive("top");
        return;
      }

      // Pick the last section whose top has crossed the header line.
      // This keeps the active state stable through gap-sections without IDs
      // (TrustStrip, SolutionSection, ManifestoBreak, CoBrandBlock).
      let current = targets[0].id;
      for (const el of targets) {
        const top = el.getBoundingClientRect().top + scrollY - HEADER_OFFSET;
        if (scrollY >= top) current = el.id;
        else break;
      }
      setActive(current);
    };

    computeActive();
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        computeActive();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", computeActive);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Center the active tab using native horizontal scroll on the viewport.
  // Native scroll keeps the bar swipeable on touch devices while we still
  // animate to the active tab as the user moves through the page.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const tab = track.querySelector<HTMLAnchorElement>(
      `a[data-sn-id="${active}"]`,
    );
    if (!tab) return;
    const target = tab.offsetLeft - viewport.offsetWidth / 2 + tab.offsetWidth / 2;
    viewport.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  const activeIdx = ITEMS.findIndex((i) => i.id === active);

  return (
    <nav
      aria-label="Sekce stránky"
      className="sj-section-nav border-t border-ink/5"
    >
      <div
        ref={viewportRef}
        className="sj-section-nav-viewport max-w-[1240px] mx-auto"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          touchAction: "pan-x pan-y",
        }}
      >
        <div
          ref={trackRef}
          className="sj-section-nav-track flex items-center gap-1 whitespace-nowrap"
          style={{
            width: "max-content",
            minWidth: "100%",
            justifyContent: "center",
            padding: "0 16px",
          }}
        >
          {ITEMS.map((item, i) => {
            const dist = Math.abs(i - activeIdx);
            const state =
              dist === 0 ? "active" : dist === 1 ? "neighbor" : "far";
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-sn-id={item.id}
                aria-current={state === "active" ? "true" : undefined}
                data-state={state}
                className="sj-section-tab"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 44,
                  padding: "10px 14px",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
