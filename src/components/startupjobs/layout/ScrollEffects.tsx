"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const header = document.getElementById("sj-site-header");
    const mobileCta = document.getElementById("sj-mobile-cta");
    const desktopCta = document.getElementById("sj-desktop-cta");

    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 12);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? y / docH : 0;

      if (mobileCta) {
        if (pct > 0.25) mobileCta.classList.add("is-shown");
        else mobileCta.classList.remove("is-shown");
      }

      if (desktopCta) {
        if (y > window.innerHeight * 0.7 && pct < 0.92)
          desktopCta.classList.add("is-shown");
        else desktopCta.classList.remove("is-shown");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let io: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      document.querySelectorAll("section.sj-reveal").forEach((s) => io!.observe(s));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return null;
}
