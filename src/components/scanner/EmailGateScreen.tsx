"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, X, AlertTriangle } from "lucide-react";
import type { DimensionResult } from "@/lib/scanner/scoring";
import { getCeoImpact } from "@/lib/scanner/interpretations";
import type { Dimension } from "@/lib/scanner/questions";
import type { FinancialImpact } from "@/lib/scanner/financial";

interface EmailGateScreenProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    employees: string;
  }) => void;
  onClose?: () => void;
  topRisks?: DimensionResult[];
  employeeCount?: number;
  financialImpact?: FinancialImpact | null;
}

export default function EmailGateScreen({ onSubmit, onClose, topRisks = [], employeeCount = 55, financialImpact = null }: EmailGateScreenProps) {
  const companyCtx = { employees: employeeCount, financialImpact };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [employees, setEmployees] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);

  const isValid =
    name.trim() && email.trim() && email.includes("@") && gdprConsent;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ name, email, phone, company, employees });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f3f0ff]/80 backdrop-blur-sm px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative"
      >
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Risk warning */}
        {topRisks.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-red-700">
                Identifikovali jsme {topRisks.length} rizik{topRisks.length === 1 ? "o" : topRisks.length < 5 ? "a" : ""} ve vaší firmě
              </span>
            </div>
            <ul className="space-y-1.5">
              {topRisks.map((r) => {
                const impact = getCeoImpact(r.key as Dimension, r.level, companyCtx);
                return (
                  <li key={r.key} className="flex items-start gap-2 text-xs">
                    <span
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                      style={{ backgroundColor: r.color }}
                    />
                    <span className="text-gray-700">
                      <strong style={{ color: r.color }}>
                        {r.label}:
                      </strong>{" "}
                      {impact}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <h2 className="text-2xl font-extrabold text-primary text-center mb-2">
          Zjistěte, jak to napravit
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Zadejte email — pošleme vám report s doporučeními.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jméno
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jan Novák"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pracovní email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jan@firma.cz"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+420 123 456 789"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Název firmy
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Behavera s.r.o."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Počet zaměstnanců
              </label>
              <select
                value={employees}
                onChange={(e) => setEmployees(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
              >
                <option value="">Vyberte</option>
                <option value="do 30">do 30</option>
                <option value="30–80">30–80</option>
                <option value="80–200">80–200</option>
                <option value="200+">200+</option>
              </select>
            </div>
          </div>

          {/* GDPR checkbox */}
          <label className="flex items-start gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-600">
              Souhlasím se zpracováním osobních údajů
            </span>
          </label>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full flex items-center justify-center gap-2 py-4 font-semibold text-lg rounded-full transition-all cursor-pointer ${
              isValid
                ? "bg-primary text-white hover:bg-primary-light shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Zobrazit můj report
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Žádný spam. GDPR compliant. Odhlásíte se jedním klikem.
        </p>

        {/* Trust logos */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">
            Důvěřuje 40+ firem
          </p>
          <div className="flex items-center justify-center gap-6">
            {["Vodafone", "Prusa", "365.bank"].map((name, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-bold">
                  {name[0]}
                </span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
