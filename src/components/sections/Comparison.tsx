"use client";

import { useTranslations } from "next-intl";
import { X, Check, Quote } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function Comparison() {
  const t = useTranslations("comparison");
  const tl = useTranslations("labels");
  const headers = t.raw("headers") as string[];
  const rows = t.raw("rows") as string[][];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("comparison")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mt-3">{t("subtitle")}</p>
          </div>
        </FadeIn>

        {/* Desktop table */}
        <FadeIn delay={0.1}>
          <div className="hidden md:block max-w-3xl mx-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className={`py-3 px-4 text-left text-sm font-bold ${
                        i === 2
                          ? "text-accent bg-accent/5 rounded-t-lg"
                          : "text-gray-500"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-4 px-4 text-sm font-medium text-gray-700">
                      {row[0]}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <X className="h-4 w-4 text-danger flex-shrink-0" />
                        {row[1]}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700 bg-accent/5">
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-accent flex-shrink-0" />
                        {row[2]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  {row[0]}
                </p>
                <div className="flex items-start gap-2 mb-3">
                  <X className="h-4 w-4 text-danger flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-500">{row[1]}</p>
                </div>
                <div className="flex items-start gap-2 pt-3 border-t border-gray-200">
                  <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-gray-700">{row[2]}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 max-w-3xl mx-auto bg-gray-50 rounded-2xl p-6">
            <Quote className="h-8 w-8 text-accent/30 mb-4" />
            <p className="text-lg text-gray-700 italic mb-4">{t("quote")}</p>
            <p className="text-sm font-semibold text-gray-500">
              {t("quoteAuthor")}
            </p>
            <a
              href="https://app.behavera.com/echo-pulse/try"
              className="inline-flex items-center mt-6 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
            >
              {t("cta")}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
