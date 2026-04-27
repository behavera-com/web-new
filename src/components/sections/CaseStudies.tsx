"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const caseImages = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  "https://cdn.prod.website-files.com/63d2c5297fe3f5119d5e8eba/68932021e3812af317591450_2025-05-13-expando-by-lukasneasi-48%20(1).jpg",
  "https://cdn.prod.website-files.com/63d2c5297fe3f5119d5e8eba/67c9b914d0abe99293d51d3b_Karel%20Valxon%202.jpeg",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
];

export default function CaseStudies() {
  const t = useTranslations("caseStudies");
  const cases = t.raw("cases") as Array<{
    company: string;
    segment: string;
    size: string;
    metrics: string;
    link: string;
  }>;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const firstCard = el.querySelector("a");
      const cardWidth = firstCard
        ? firstCard.offsetWidth + 16
        : 288;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIdx(Math.min(idx, cases.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [cases.length]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                {t("label")}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                {t("title")}
              </h2>
              <p className="text-lg text-gray-600 mt-2">{t("subtitle")}</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </FadeIn>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {cases.map((cs, i) => (
            <FadeIn key={i} delay={i * 0.1} className="flex-shrink-0">
              <a
                href={cs.link}
                className="group block w-[272px] sm:w-[320px] bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all snap-start"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={caseImages[i]}
                    alt={cs.company}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur rounded-md text-xs font-medium text-gray-600">
                    {cs.segment}
                  </div>
                </div>
                <div className="p-5 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold text-primary">
                      {cs.company}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Users className="h-3 w-3" />
                      {cs.size}
                    </span>
                  </div>
                  <p className="text-sm text-accent font-semibold mb-3">
                    {cs.metrics}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 group-hover:text-accent transition-colors">
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Číst případovku {cs.company}</span>
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {cases.map((_, i) => (
            <button
              key={i}
              aria-label={`Case study ${i + 1}`}
              onClick={() => {
                const firstCard = scrollRef.current?.querySelector("a");
                const cardWidth = firstCard
                  ? firstCard.offsetWidth + 16
                  : 288;
                scrollRef.current?.scrollTo({
                  left: i * cardWidth,
                  behavior: "smooth",
                });
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIdx ? "w-6 bg-accent" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
