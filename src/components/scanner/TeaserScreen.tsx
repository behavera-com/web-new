"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import RiskRadarChart from "./RiskRadarChart";
import type { DimensionResult } from "@/lib/scanner/scoring";
import type { FinancialImpact } from "@/lib/scanner/financial";
import { formatCZK } from "@/lib/scanner/financial";
import { levelLabels, getCeoImpact } from "@/lib/scanner/interpretations";
import type { Dimension } from "@/lib/scanner/questions";
import { employeeCountMap } from "@/lib/scanner/questions";

interface TeaserScreenProps {
  results: DimensionResult[];
  financialImpact: FinancialImpact | null;
  employees: number;
  onContinue: () => void;
}

export default function TeaserScreen({
  results,
  financialImpact,
  employees,
  onContinue,
}: TeaserScreenProps) {
  const companyCtx = { employees, financialImpact };
  const riskAreas = results.filter((r) => r.score > 40);

  // Auto-open email popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="bg-gradient-to-b from-[#f3f0ff] via-white to-[#f3f0ff]">
      <div className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-2">
              Vaše diagnostika je hotová.
            </h1>
            <p className="text-gray-500 text-center mb-10">
              Identifikovali jsme {riskAreas.length} rizikov
              {riskAreas.length === 1
                ? "ou oblast"
                : riskAreas.length < 5
                  ? "é oblasti"
                  : "ých oblastí"}{" "}
              ve vaší firmě.
            </p>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <RiskRadarChart results={results} showValues />
          </motion.div>

          {/* Risk badges with CEO impact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 mb-10"
          >
            {riskAreas.map((r) => {
              const impact = getCeoImpact(r.key as Dimension, r.level, companyCtx);
              return (
                <div
                  key={r.key}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{
                    backgroundColor: `${r.color}10`,
                    border: `1px solid ${r.color}25`,
                  }}
                >
                  <span
                    className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: r.color }}
                    >
                      {r.label} — {levelLabels[r.level]}
                    </span>
                    {impact && (
                      <p className="text-xs text-gray-500 mt-0.5">{impact}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Annual cost + savings */}
          {financialImpact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary rounded-2xl p-8 text-center text-white mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                Odhadované roční náklady: {formatCZK(financialImpact.annualCost)}
              </h2>
              <p className="text-gray-300 text-sm mb-6">
                Na základě vašich odpovědí
              </p>

              <div className="border-t border-white/20 pt-6 grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">S Behavera ušetříte</p>
                  <p className="text-xl font-bold text-accent">
                    {formatCZK(financialImpact.savingsIf3pctReduction)}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    při snížení fluktuace o 3 %
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Behavera stojí</p>
                  <p className="text-xl font-bold">
                    {formatCZK(financialImpact.behaveraCostYearly)}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">ročně</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Návratnost</p>
                  <p className="text-xl font-bold text-accent">
                    {financialImpact.roi} %
                  </p>
                  <p className="text-gray-400 text-xs mt-1">ROI</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blurred preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative mb-10"
          >
            <div className="blur-[6px] select-none pointer-events-none p-8 bg-white rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Detailní analýza a doporučení
              </h3>
              <p className="text-gray-600 mb-3">
                Na základě vašich odpovědí jsme identifikovali klíčové oblasti
                rizik. Pro každou oblast nabízíme konkrétní kroky, které můžete
                podniknout...
              </p>
              <p className="text-gray-600 mb-3">
                Fluktuace: Vaše firma ztrácí lidi rychleji než je zdravé.
                Doporučujeme zavést pravidelné pulse měření...
              </p>
              <p className="text-gray-600">
                Leadership: Identifikujte manažery, kteří potřebují rozvoj.
                70 % engagementu závisí na přímém nadřízeném...
              </p>
            </div>
          </motion.div>

          {/* Manual CTA button */}
          <div className="text-center">
            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors cursor-pointer"
            >
              Zobrazit kompletní report →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
