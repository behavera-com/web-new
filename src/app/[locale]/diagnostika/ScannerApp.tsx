"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen from "@/components/scanner/IntroScreen";
import QuestionScreen from "@/components/scanner/QuestionScreen";
import TeaserScreen from "@/components/scanner/TeaserScreen";
import EmailGateScreen from "@/components/scanner/EmailGateScreen";
import ReportScreen from "@/components/scanner/ReportScreen";
import { calculateResults } from "@/lib/scanner/scoring";
import { calculateFinancialImpact } from "@/lib/scanner/financial";
import { employeeCountMap } from "@/lib/scanner/questions";
import type { DimensionResult } from "@/lib/scanner/scoring";
import type { FinancialImpact } from "@/lib/scanner/financial";

type Screen = "intro" | "questions" | "teaser" | "email" | "report";

export default function ScannerApp() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<DimensionResult[]>([]);
  const [financialImpact, setFinancialImpact] = useState<FinancialImpact | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [employeeCount, setEmployeeCount] = useState(55);
  const [showEmailGate, setShowEmailGate] = useState(false);

  const processResults = useCallback((ans: Record<number, number>) => {
    const dimensionResults = calculateResults(ans);
    setResults(dimensionResults);

    const employeeIndex = ans[1] ?? 0;
    const employees = employeeCountMap[employeeIndex] ?? 55;
    setEmployeeCount(employees);
    const fluktuaceResult = dimensionResults.find((r) => r.key === "fluktuace");
    const impact = calculateFinancialImpact(
      employees,
      fluktuaceResult?.score ?? 50
    );
    setFinancialImpact(impact);
  }, []);

  function handleQuestionsComplete(ans: Record<number, number>) {
    setAnswers(ans);
    processResults(ans);
    setScreen("teaser");
  }

  const handleTeaserContinue = useCallback(() => {
    setShowEmailGate(true);
  }, []);

  async function handleEmailSubmit(data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    employees: string;
  }) {
    setCompanyName(data.company);
    setShowEmailGate(false);

    // Send lead data
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          scores: results,
          overallScore:
            results.length > 0
              ? Math.round(
                  results.reduce((sum, r) => sum + r.score, 0) / results.length
                )
              : 0,
        }),
      });
    } catch {
      // Silently fail — don't block the user from seeing results
    }

    setScreen("report");
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IntroScreen onStart={() => setScreen("questions")} />
          </motion.div>
        )}

        {screen === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionScreen
              onComplete={handleQuestionsComplete}
              onBack={() => setScreen("intro")}
            />
          </motion.div>
        )}

        {screen === "teaser" && (
          <motion.div
            key="teaser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TeaserScreen
              results={results}
              financialImpact={financialImpact}
              employees={employeeCount}
              onContinue={handleTeaserContinue}
            />
          </motion.div>
        )}

        {screen === "report" && financialImpact && (
          <motion.div
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ReportScreen
              results={results}
              financialImpact={financialImpact}
              companyName={companyName}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email gate overlay */}
      <AnimatePresence>
        {showEmailGate && (
          <motion.div
            key="emailgate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmailGateScreen
              onSubmit={handleEmailSubmit}
              onClose={() => setShowEmailGate(false)}
              topRisks={results.filter((r) => r.score > 40)}
              employeeCount={employeeCount}
              financialImpact={financialImpact}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
