"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FadeIn from "@/components/ui/FadeIn";

const cardColors = [
  "border-t-danger",
  "border-t-coral",
  "border-t-accent",
];

export default function Costs() {
  const t = useTranslations("costs");
  const tl = useTranslations("labels");
  const tc = useTranslations("common");
  const cards = t.raw("cards") as Array<{
    label: string;
    stat: string;
    text: string;
    source: string;
  }>;
  const [expanded, setExpanded] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomInView = useInView(bottomRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("hiddenCosts")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className={`bg-white rounded-2xl p-8 border-t-4 ${cardColors[i]} hover:shadow-lg transition-all`}
              >
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  {card.label}
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                  <AnimatedCounter value={card.stat} />
                </p>
                <div
                  className={`grid transition-all duration-300 ${
                    expanded === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{card.text}</p>
                    <p className="text-xs text-gray-400">
                      {tc("source")}: {card.source}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="mt-4 flex items-center gap-1.5 text-sm text-accent font-medium"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                  {expanded === i ? tc("less") : tc("more")}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        <div ref={bottomRef} className="text-center mt-14">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              bottomInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl lg:text-3xl font-bold text-white mb-4"
          >
            {t("bottom")}
          </motion.p>
          <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
            {t("bottomSub")}
          </p>
          <p className="text-gray-400 text-xs italic mb-8 max-w-md mx-auto">
            &ldquo;{t("bottomQuote")}&rdquo; — {t("bottomQuoteAuthor")}
          </p>
          <a
            href="https://app.behavera.com/echo-pulse/try"
            className="inline-flex items-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
