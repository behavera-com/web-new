"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("sj-js-ready");

    const header = document.getElementById("sj-site-header");
    const mobileCta = document.getElementById("sj-mobile-cta");
    const desktopCta = document.getElementById("sj-desktop-cta");

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // ---- Scroll-linked state (progress, parallax, sticky CTAs) ----
    let rafScroll = 0;
    let lastY = -1;
    const updateScroll = () => {
      rafScroll = 0;
      const y = window.scrollY;
      if (y === lastY) return;
      lastY = y;

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? y / docH : 0;

      root.style.setProperty("--sj-y", String(y));
      root.style.setProperty("--sj-progress", pct.toFixed(4));

      const scrolled = y > 12;
      if (header) header.classList.toggle("is-scrolled", scrolled);
      root.classList.toggle("sj-scrolled", scrolled);

      if (mobileCta) {
        mobileCta.classList.toggle("is-shown", pct > 0.25);
      }

      if (desktopCta) {
        const inOwnCta = ["#consult", "#report"].some((sel) => {
          const el = document.querySelector(sel) as HTMLElement | null;
          if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.3;
        });
        const show = y > window.innerHeight * 0.7 && pct < 0.92 && !inOwnCta;
        desktopCta.classList.toggle("is-shown", show);
      }
    };
    const onScroll = () => {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScroll();

    // ---- Pointer-following spotlight (desktop, no reduced motion) ----
    let rafPointer = 0;
    let pendingX = 0.5;
    let pendingY = 0.3;
    const applyPointer = () => {
      rafPointer = 0;
      root.style.setProperty("--sj-mx", pendingX.toFixed(4));
      root.style.setProperty("--sj-my", pendingY.toFixed(4));
    };
    const onPointer = (e: PointerEvent) => {
      pendingX = e.clientX / window.innerWidth;
      pendingY = e.clientY / window.innerHeight;
      if (!rafPointer) rafPointer = requestAnimationFrame(applyPointer);
    };
    const isFinePointer =
      window.matchMedia?.("(pointer: fine)").matches ?? false;
    if (isFinePointer && !prefersReduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    // ---- Reveal on intersect ----
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
      );

      // Auto-tag every direct section of <main> for a reveal — keeps the long page
      // feeling animated without touching each section file.
      document
        .querySelectorAll("main > section, main > div > section")
        .forEach((s) => s.classList.add("sj-reveal"));

      document
        .querySelectorAll(".sj-reveal, .sj-reveal-up, .sj-reveal-left, .sj-reveal-right, .sj-reveal-fade, .sj-reveal-stagger")
        .forEach((s) => io!.observe(s));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (rafScroll) cancelAnimationFrame(rafScroll);
      if (rafPointer) cancelAnimationFrame(rafPointer);
      io?.disconnect();
      root.classList.remove("sj-js-ready");
      root.classList.remove("sj-scrolled");
    };
  }, []);

  return null;
}
