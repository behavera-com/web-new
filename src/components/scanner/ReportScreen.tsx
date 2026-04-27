"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  Users,
  Heart,
  AlertTriangle,
  Compass,
  MessageCircle,
  CheckCircle,
  Download,
  Share2,
} from "lucide-react";
import RiskRadarChart from "./RiskRadarChart";
import type { DimensionResult } from "@/lib/scanner/scoring";
import { calculateOverallScore } from "@/lib/scanner/scoring";
import { interpretations, levelLabels } from "@/lib/scanner/interpretations";
import type { FinancialImpact } from "@/lib/scanner/financial";
import { formatCZK } from "@/lib/scanner/financial";
import type { Dimension } from "@/lib/scanner/questions";

interface ReportScreenProps {
  results: DimensionResult[];
  financialImpact: FinancialImpact;
  companyName: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingDown,
  Users,
  Heart,
  AlertTriangle,
  Compass,
  MessageCircle,
};

export default function ReportScreen({
  results,
  financialImpact,
  companyName,
}: ReportScreenProps) {
  const overallScore = calculateOverallScore(results);
  const today = new Date().toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  function getScoreColor(score: number) {
    if (score <= 25) return "#2DDBA6";
    if (score <= 50) return "#FFB800";
    if (score <= 75) return "#FF7A00";
    return "#E53E3E";
  }

  const circumference = 2 * Math.PI * 42;
  const dashOffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="bg-gradient-to-b from-[#f3f0ff] via-white to-white">
      {/* Action bar */}
      <div className="px-6 py-3 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex justify-end gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <Download className="w-4 h-4" />
            Stáhnout PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" />
            Sdílet
          </button>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Report header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6"
          >
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-3">
                HR RISK REPORT
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">
                pro {companyName || "Vaši firmu"}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Vygenerováno: {today}
              </p>
            </div>

            {/* Overall score circle */}
            <div className="text-center flex-shrink-0">
              <svg width="110" height="110" className="transform -rotate-90">
                <circle
                  cx="55"
                  cy="55"
                  r="42"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="55"
                  cy="55"
                  r="42"
                  fill="none"
                  stroke={getScoreColor(overallScore)}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="relative -mt-[80px] mb-4">
                <span className="text-3xl font-extrabold text-primary">
                  {overallScore}
                </span>
                <span className="text-sm text-gray-400 block">z 100</span>
              </div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Celkové rizikové skóre
              </p>
            </div>
          </motion.div>

          {/* Grid: Radar + Dimension cards */}
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {/* Radar chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="font-bold text-gray-800 mb-4">Struktura rizik</h3>
              <RiskRadarChart results={results} showValues />
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#E53E3E]" />
                  Vysoké
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                  Zvýšené
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#2DDBA6]" />
                  V pořádku
                </div>
              </div>
            </motion.div>

            {/* Dimension cards */}
            <div className="lg:col-span-3 space-y-4">
              {results.map((result, i) => {
                const interp =
                  interpretations[result.key as Dimension]?.[result.level];
                const Icon = iconMap[result.icon] || AlertTriangle;

                return (
                  <motion.div
                    key={result.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${result.color}15`,
                            color: result.color,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: result.color }}
                          />
                          {levelLabels[result.level]}
                        </span>
                        <h3 className="text-lg font-bold text-primary">
                          {result.label}
                        </h3>
                      </div>
                      <span
                        className="text-lg font-bold"
                        style={{ color: result.color }}
                      >
                        {result.score}/100
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.score}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: result.color }}
                      />
                    </div>

                    {interp && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                            Co to znamená:
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {interp.text}
                          </p>

                          {result.key === "fluktuace" && (
                            <div className="mt-3">
                              <p className="text-xs text-gray-400 mb-1">
                                Finanční dopad:
                              </p>
                              <p className="text-xl font-bold text-primary">
                                ~{formatCZK(financialImpact.annualCost)}{" "}
                                <span className="text-sm font-normal text-gray-400">
                                  ročně
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-accent" />
                            Doporučení:
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {interp.recommendation}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-primary rounded-3xl p-8 sm:p-12 text-center text-white"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Chcete přesná data místo odhadů?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Toto je odhad na základě 10 otázek.{" "}
              <strong className="text-white">Echo Pulse</strong> změří realitu
              přímo od vašich lidí a odhalí skrytá rizika dřív, než se promění v
              náklady.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Otestovat Echo Pulse zdarma
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-full hover:border-white/60 transition-colors"
              >
                Chci demo
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Bez kreditky · Výsledky do 48 hodin
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
