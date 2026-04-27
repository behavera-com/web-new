"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Shield } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const tiers = [
  { employees: 50, monthly: 129, yearly: 99 },
  { employees: 100, monthly: 119, yearly: 95 },
  { employees: 200, monthly: 109, yearly: 89 },
  { employees: 350, monthly: 99, yearly: 79 },
];

export default function Pricing() {
  const t = useTranslations("pricing");
  const tl = useTranslations("labels");
  const features = t.raw("features") as string[];
  const [yearly, setYearly] = useState(true);
  const [tierIdx, setTierIdx] = useState(0);

  const tier = tiers[tierIdx];
  const price = yearly ? tier.yearly : tier.monthly;
  const total = price * tier.employees;
  const yearlyTotal = tier.yearly * tier.employees * 12;
  const monthlyTotal = tier.monthly * tier.employees * 12;
  const savings = monthlyTotal - yearlyTotal;

  return (
    <section id="cenik" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("pricing")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mt-3">{t("subtitle")}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span
              className={`text-sm font-medium ${!yearly ? "text-primary" : "text-gray-400"}`}
            >
              {t("monthly")}
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              role="switch"
              aria-checked={yearly}
              aria-label="Roční fakturace"
              className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? "bg-accent" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${yearly ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </button>
            <span
              className={`text-sm font-medium ${yearly ? "text-primary" : "text-gray-400"}`}
            >
              {t("yearly")}
            </span>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left: Slider + Features */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-primary mb-6">
                {t("setupTitle")}
              </h3>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{t("companySize")}</span>
                <span className="text-sm font-bold text-primary">
                  {tier.employees}
                  {tier.employees === 350 ? "+" : ""} {t("employees")}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={tierIdx}
                onChange={(e) => setTierIdx(Number(e.target.value))}
                className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer mb-1"
              />
              <div className="flex justify-between text-xs text-gray-400 mb-8">
                {tiers.map((t) => (
                  <span key={t.employees}>
                    {t.employees}
                    {t.employees === 350 ? "+" : ""}
                  </span>
                ))}
              </div>

              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Price Card */}
            <div className="relative bg-accent rounded-2xl p-6 text-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                {t("popular")}
              </div>

              <h3 className="text-lg font-bold mb-6 text-center">
                {t("estimateTitle")}
              </h3>

              <div className="text-center mb-4">
                <p className="text-5xl font-bold">
                  {total.toLocaleString("cs-CZ")} Kč
                </p>
                <p className="text-sm opacity-80 mt-1">{t("perMonth")}</p>
              </div>

              <div className="text-center text-sm opacity-80 space-y-1 mb-6">
                <p>
                  {price} {t("perEmployee")}
                </p>
                {yearly && savings > 0 && (
                  <p className="inline-block mt-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold">
                    {t("savingsPrefix")} {savings.toLocaleString("cs-CZ")} {t("savingsSuffix")}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <a
                  href="https://app.behavera.com/echo-pulse/try"
                  className="block text-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors text-base"
                >
                  {t("ctaPrimary")}
                </a>
                <a
                  href="/start"
                  className="block text-center px-6 py-3 border-2 border-primary/20 text-primary font-semibold rounded-lg hover:border-primary/40 transition-colors text-base"
                >
                  {t("ctaSecondary")}
                </a>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="max-w-3xl mx-auto mt-14 bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-lg font-bold text-primary text-center mb-6">
              {t("roiTitle")}
            </h3>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Turnover cost */}
              <div className="flex-1 bg-white rounded-xl p-5 border border-gray-100 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  {t("roiTurnoverCost")}
                </p>
                <p className="text-2xl font-bold text-danger">
                  {t("roiTurnoverRange")}
                </p>
              </div>
              {/* Behavera cost */}
              <div className="flex-1 bg-white rounded-xl p-5 border border-gray-100 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  {t("roiBehaveraCost")}
                </p>
                <p className="text-2xl font-bold text-accent">
                  {yearlyTotal.toLocaleString("cs-CZ")} Kč
                </p>
              </div>
              {/* ROI multiplier */}
              <div className="flex-1 bg-primary rounded-xl p-5 text-center text-white">
                <p className="text-sm text-gray-300 mb-2">
                  {t("roiSaved")}
                </p>
                <p className="text-2xl font-bold">
                  {yearlyTotal > 0
                    ? `${Math.round(450000 / yearlyTotal)}×`
                    : "—"}{" "}
                  <span className="text-base font-medium text-gray-300">
                    {t("roiReturn")}
                  </span>
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              {t("roiNote")}
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {["GDPR", "AES-256", "Data v EU", "ISO 27001"].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <Shield className="h-3.5 w-3.5 text-accent" />
                {badge}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
