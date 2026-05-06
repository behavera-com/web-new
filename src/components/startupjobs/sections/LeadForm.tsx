"use client";

import { useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";

type Props = {
  cost: number;
  save: number;
  positions: number;
  timeToHire: number;
};

export default function LeadForm({ cost, save, positions, timeToHire }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "startupjobs",
          calculator: {
            positions,
            timeToHireDays: timeToHire,
            estimatedAnnualCostCzk: Math.round(cost),
            estimatedAnnualSavingCzk: Math.round(save),
          },
        }),
      });
      if (!res.ok) throw new Error("network");
      setSubmitted(true);
    } catch {
      setError("Nepodařilo se odeslat. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-baseline justify-between mb-3">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--color-muted)",
            letterSpacing: "0.16em",
          }}
        >
          CHCETE PROPOČET PRO VAŠI FIRMU?
        </span>
      </div>
      <p
        className="mb-4 max-w-[44ch] leading-[1.55]"
        style={{ fontSize: 14, color: "rgba(28,18,55,0.75)" }}
      >
        Pošleme vám detailní 1-pager s benchmark daty z vašeho oboru a konkrétní
        propočet pro váš nábor.
      </p>

      {submitted ? (
        <div
          className="inline-flex items-center gap-2"
          style={{ fontSize: 14, color: "var(--color-purple-accent)" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 7.5l3 3 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Hotovo. Posíláme do 24 hodin.</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 max-w-[480px]"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vase@firma.cz"
            className="flex-1 px-4 py-3 transition-colors"
            style={{
              background: "#fff",
              border: "1px solid var(--color-rule)",
              fontSize: 14,
              color: "var(--color-ink)",
            }}
            aria-label="E-mail"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-medium whitespace-nowrap transition-colors disabled:opacity-60"
            style={{
              background: "var(--color-purple-deep)",
              fontSize: 14,
            }}
          >
            {loading ? "Odesílám…" : "Poslat propočet"}
            <ArrowRightIcon />
          </button>
        </form>
      )}
      {error && (
        <p className="mt-3 text-sm" style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}
      <p
        className="mt-3"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--color-muted)",
          letterSpacing: "0.16em",
        }}
      >
        ŽÁDNÝ SPAM · ODHLÁŠENÍ JEDNÍM KLIKEM
      </p>
    </>
  );
}
