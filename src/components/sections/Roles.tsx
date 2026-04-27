"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function Roles() {
  const t = useTranslations("roles");
  const tl = useTranslations("labels");
  const tabs = t.raw("tabs") as Array<{
    role: string;
    headline: string;
    points: string[];
  }>;
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("roles")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto snap-x snap-mandatory [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] sm:[mask-image:none]">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex-1 min-w-[100px] snap-start py-3 px-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    active === i
                      ? "border-accent text-accent"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.role}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  {tabs[active].headline}
                </h3>
                <ul className="space-y-4 mb-8">
                  {tabs[active].points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://app.behavera.com/echo-pulse/try"
                  className="inline-flex items-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
                >
                  {t("cta")}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
