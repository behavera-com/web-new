"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { questions } from "@/lib/scanner/questions";

interface QuestionScreenProps {
  onComplete: (answers: Record<number, number>) => void;
  onBack: () => void;
}

const answerLetters = ["A", "B", "C", "D"];

const questionTips: Record<number, string> = {
  1: "Tato otázka nám pomůže přizpůsobit výsledky velikosti vaší firmy.",
  2: "Průměrná dobrovolná fluktuace v ČR je kolem 12–15 %. Jak jste na tom vy?",
  3: "Dlouhá doba obsazení pozice = vyšší náklady a zátěž na stávající tým.",
  4: "Správná diagnostika managementu je prvním krokem ke snížení fluktuace a zvýšení celkové efektivity týmu. Behavera analyzuje vzorce chování, nikoliv jen subjektivní pocity.",
  5: "Pravidelná zpětná vazba je základ — bez ní se problémy odhalí příliš pozdě.",
  6: "Angažovaní zaměstnanci jsou až o 23 % produktivnější.",
  7: "60 % zaměstnanců v ČR uvádí, že se v práci cítí pod tlakem.",
  8: "Firemní kultura přímo ovlivňuje retenci — lidé odcházejí z firem, kde se necítí dobře.",
  9: "Transparentní komunikace snižuje nejistotu a zvyšuje důvěru.",
  10: "Vysoká fluktuace nováčků signalizuje problém v onboardingu nebo nesoulad s kulturou.",
};

export default function QuestionScreen({
  onComplete,
  onBack,
}: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState(1);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const selectedAnswer = answers[question.id];

  function handleAnswer(answerIndex: number) {
    const newAnswers = { ...answers, [question.id]: answerIndex };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBack();
    }
  }

  function handleShowResults() {
    onComplete(answers);
  }

  const isLast = currentIndex === questions.length - 1;
  const canShowResults = isLast && selectedAnswer !== undefined;

  return (
    <div className="bg-gradient-to-b from-[#f3f0ff] via-white to-[#f3f0ff]">
      {/* Progress bar */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex-1 max-w-xs mx-8">
            <div className="text-[10px] uppercase tracking-widest text-gray-400 text-center mb-1">
              Diagnostika v procesu
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <span className="text-sm text-gray-500 whitespace-nowrap">
            Otázka {currentIndex + 1} z {questions.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="flex flex-col items-center justify-center px-6 py-12 min-h-[60vh]">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question number */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f3f0ff] border-2 border-[#e0d8ff] text-primary font-bold text-sm">
                  {String(question.id).padStart(2, "0")}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center leading-tight mb-4">
                {question.text}
              </h2>

              {/* Tip - below question */}
              {questionTips[question.id] && (
                <div className="mb-8 p-4 rounded-2xl bg-[#f3f0ff]/60 border border-[#e0d8ff]/50">
                  <div className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e0d8ff] flex items-center justify-center text-primary text-[10px] font-bold mt-0.5">
                      i
                    </span>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {questionTips[question.id]}
                    </p>
                  </div>
                </div>
              )}

              {/* Answer cards */}
              <div className="space-y-3">
                {question.answers.map((answer, idx) => {
                  const isSelected = selectedAnswer === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-primary text-white shadow-lg"
                          : "bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                          isSelected
                            ? "bg-white text-primary border-white"
                            : "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {answerLetters[idx]}
                      </span>
                      <span className="flex-1 font-medium">{answer.text}</span>
                      {isSelected && <Check className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>

              {/* Show results button on last question */}
              {canShowResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <button
                    onClick={handleShowResults}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors cursor-pointer"
                  >
                    Zobrazit výsledky
                  </button>
                </motion.div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-6 py-6 text-center">
        <p className="text-xs text-gray-400">
          Vaše odpovědi jsou anonymní a slouží pouze pro diagnostiku.
        </p>
      </div>
    </div>
  );
}
