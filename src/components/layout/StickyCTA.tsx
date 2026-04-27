"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Rocket, Calendar } from "lucide-react";

export default function StickyCTA() {
  const t = useTranslations("sticky");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 600) {
        setVisible(false);
        return;
      }

      // Hide when pricing or final CTA section is in view
      const pricing = document.getElementById("cenik");
      const finalCta = document.querySelector("section.bg-primary:last-of-type");

      if (pricing || finalCta) {
        const viewportBottom = scrollY + window.innerHeight;
        const pricingTop = pricing?.offsetTop ?? Infinity;
        const finalTop =
          finalCta instanceof HTMLElement
            ? finalCta.offsetTop
            : Infinity;
        const hideFrom = Math.min(pricingTop, finalTop);

        setVisible(scrollY > 600 && viewportBottom < hideFrom + 200);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur border-t border-white/10 py-3 px-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-3 max-w-lg mx-auto">
        <a
          href="https://app.behavera.com/echo-pulse/try"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
        >
          <Rocket className="h-4 w-4" />
          {t("trial")}
        </a>
        <a
          href="/demo"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-white/30 text-white text-sm font-semibold rounded-lg hover:border-white/60 transition-colors"
        >
          <Calendar className="h-4 w-4" />
          {t("demo")}
        </a>
      </div>
    </div>
  );
}
