"use client";

import { useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";

export default function ReportForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !phone || !company || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          phone,
          company,
          source: "startupjobs-report",
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

  if (submitted) {
    return (
      <div
        className="inline-flex items-center gap-2"
        style={{ fontSize: 15, color: "rgba(255,255,255,0.95)" }}
      >
        <svg
          width="16"
          height="16"
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
        <span>Hotovo. Link na report vám pošleme do 24 hodin.</span>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    fontSize: 14,
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 gap-3 max-w-[560px]"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vase@firma.cz"
          className="px-4 py-3 transition-colors sm:col-span-2 placeholder:text-white/40"
          style={inputStyle}
          aria-label="E-mail"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefon"
          className="px-4 py-3 transition-colors placeholder:text-white/40"
          style={inputStyle}
          aria-label="Telefon"
        />
        <input
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Název firmy"
          className="px-4 py-3 transition-colors placeholder:text-white/40"
          style={inputStyle}
          aria-label="Název firmy"
        />
        <button
          type="submit"
          disabled={loading}
          className="sj-btn-on-dark sm:col-span-2 justify-center disabled:opacity-60"
        >
          {loading ? "Odesílám…" : "Stáhnout report zdarma"}
          <ArrowRightIcon />
        </button>
      </form>
      {error && (
        <p className="mt-3 text-sm" style={{ color: "#fca5a5" }}>
          {error}
        </p>
      )}
      <p
        className="mt-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.16em",
        }}
      >
        ŽÁDNÝ SPAM · POUZE 1 E-MAIL S LINKEM NA REPORT
      </p>
    </>
  );
}
