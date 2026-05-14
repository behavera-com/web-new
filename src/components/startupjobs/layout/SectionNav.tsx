"use client";

import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string };

const ITEMS: Item[] = [
  { id: "top", label: "Úvod" },
  { id: "proc", label: "Proč" },
  { id: "produkt", label: "Produkt" },
  { id: "demo", label: "Demo" },
  { id: "report", label: "Report" },
  { id: "cases", label: "Případovky" },
  { id: "how", label: "Jak to funguje" },
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

  // Center the active tab via translateX on the inner track
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const tab = track.querySelector<HTMLAnchorElement>(
      `a[data-sn-id="${active}"]`,
    );
    if (!tab) return;
    const viewportW = viewport.offsetWidth;
    const tabLeft = tab.offsetLeft;
    const tabW = tab.offsetWidth;
    const shift = viewportW / 2 - tabLeft - tabW / 2;
    track.style.transform = `translateX(${shift}px)`;
  }, [active]);

  const activeIdx = ITEMS.findIndex((i) => i.id === active);

  return (
    <nav
      aria-label="Sekce stránky"
      className="sj-section-nav border-t border-ink/5"
    >
      <div
        ref={viewportRef}
        className="max-w-[1240px] mx-auto h-[44px] relative overflow-hidden"
      >
        <div
          ref={trackRef}
          className="absolute top-1/2 left-0 flex items-center gap-1 whitespace-nowrap will-change-transform"
          style={{
            transform: "translateX(0)",
            translate: "0 -50%",
            transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
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
