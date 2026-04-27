"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  const t = useTranslations("hero");
  const headlines = t.raw("headlines") as string[];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % headlines.length);
  }, [headlines.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <FadeIn>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              {t("label")}
            </div>

            <div
              className="min-h-[110px] sm:min-h-[120px] lg:min-h-[160px] mb-6"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
                >
                  {headlines[current]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Headline indicators */}
            <div className="flex gap-1 mb-6">
              {headlines.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Titulek ${i + 1}`}
                  className="flex items-center justify-center py-2"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-accent" : "w-4 bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              {t("subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
              >
                {t("ctaPrimary")}
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base"
              >
                {t("ctaSecondary")}
              </a>
            </div>
            <p className="text-sm text-gray-400 mb-3">{t("trust")}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-accent" />
                GDPR compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-accent" />
                Data v EU
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-accent" />
                ISO 27001
              </span>
              <span
                className="inline-flex items-center gap-1.5 border border-white/10 rounded-full px-2.5 py-1"
                style={{ fontSize: "11px" }}
              >
                <span className="text-yellow-400">★</span>
                4.8/5 G2
              </span>
              <span
                className="inline-flex items-center gap-1.5 border border-white/10 rounded-full px-2.5 py-1"
                style={{ fontSize: "11px" }}
              >
                <span className="text-yellow-400">★</span>
                4.7/5 Capterra
              </span>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                  {t("miniTestimonial.author").split(" ").filter(Boolean).map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm text-gray-200 italic leading-relaxed">
                    &ldquo;{t("miniTestimonial.quote")}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {t("miniTestimonial.author")} · {t("miniTestimonial.role")}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300">{t("socialProof")}</p>
              <p className="text-xs text-gray-400 mt-3">{t("stats")}</p>
            </div>
          </FadeIn>

          {/* Dashboard visual */}
          <FadeIn delay={0.2}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="https://www.behavera.com/assets/hero-dashboard-cz-Bkd5AaTw.webp"
                  alt="Behavera Dashboard"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
