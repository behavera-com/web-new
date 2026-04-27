"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Shield } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function FAQ() {
  const t = useTranslations("faq");
  const tl = useTranslations("labels");
  const filters = t.raw("filters") as string[];
  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
    category: string;
  }>;
  const badges = t.raw("badges") as string[];

  const [activeFilter, setActiveFilter] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filtered =
    activeFilter === 0
      ? items
      : items.filter((item) => item.category === filters[activeFilter]);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("faq")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="max-w-3xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {filters.map((filter, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFilter(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === i
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {filtered.map((item) => {
                const isOpen = openQuestion === item.question;
                return (
                  <div
                    key={item.question}
                    className="bg-white rounded-2xl border border-gray-200"
                  >
                    <button
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : item.question)
                      }
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-primary pr-4">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 text-sm text-gray-600">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Security badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-gray-200"
                >
                  <Shield className="h-4 w-4 text-accent" />
                  <span className="text-xs font-medium text-gray-600">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
