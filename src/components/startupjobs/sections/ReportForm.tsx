"use client";

import { useId, useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import FieldTooltip from "../ui/FieldTooltip";

type ReportFormProps = {
  variant?: "inline" | "modal";
};

const FIELD_HELP: Record<"name" | "email" | "phone" | "company", string> = {
  name: 'Abychom vám psali jménem, ne jako „Vážený zákazníku".',
  email: "Sem dorazí link na report. Žádný newsletter, žádný spam.",
  phone:
    "Občas se ozveme s krátkým dotazem, jestli vše dorazilo a report dává smysl. Žádné cold cally.",
  company:
    "Behavera dává smysl od ~50 zaměstnanců nahoru. Pokud jste menší, řekneme to upřímně.",
};

export default function ReportForm({ variant = "inline" }: ReportFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uid = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !company || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
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
    const firstName = name.trim().split(" ")[0];
    return (
      <div style={{ color: "rgba(255,255,255,0.95)" }}>
        <div className="inline-flex items-center gap-2" style={{ fontSize: 15 }}>
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
          <span>Hotovo{firstName ? `, ${firstName}` : ""}. Report máte připravený níže — a poslali jsme ho i na váš e-mail.</span>
        </div>
        <a
          href="/startupjobs/behavera-report-sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="sj-btn-on-dark mt-5 inline-flex justify-center"
        >
          Stáhnout vzor reportu (PDF)
          <ArrowRightIcon />
        </a>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    fontSize: 14,
  };

  const gridGap = variant === "modal" ? "gap-4" : "gap-3";
  const maxW = variant === "modal" ? "" : "max-w-[560px]";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`grid sm:grid-cols-2 ${gridGap} ${maxW}`}
      >
        <div className="sm:col-span-2 sj-field-wrap">
          <input
            id={`${uid}-name`}
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jméno a příjmení"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="Jméno a příjmení"
            aria-describedby={`${uid}-name-help-sr`}
          />
          <FieldTooltip id={`${uid}-name-help`} text={FIELD_HELP.name} />
        </div>

        <div className="sm:col-span-2 sj-field-wrap">
          <input
            id={`${uid}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vase@firma.cz"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="E-mail"
            aria-describedby={`${uid}-email-help-sr`}
          />
          <FieldTooltip id={`${uid}-email-help`} text={FIELD_HELP.email} />
        </div>

        <div className="sj-field-wrap">
          <input
            id={`${uid}-phone`}
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="Telefon"
            aria-describedby={`${uid}-phone-help-sr`}
          />
          <FieldTooltip id={`${uid}-phone-help`} text={FIELD_HELP.phone} />
        </div>

        <div className="sj-field-wrap">
          <input
            id={`${uid}-company`}
            type="text"
            required
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Název firmy"
            className="w-full px-4 py-3 transition-colors placeholder:text-white/40"
            style={inputStyle}
            aria-label="Název firmy"
            aria-describedby={`${uid}-company-help-sr`}
          />
          <FieldTooltip id={`${uid}-company-help`} text={FIELD_HELP.company} />
        </div>

        <button
          type="submit"
          disabled={loading || !name || !email || !phone || !company}
          className="sj-btn-on-dark sm:col-span-2 justify-center disabled:opacity-60"
        >
          {loading ? "Odesílám…" : "Stáhnout report zdarma"}
          <ArrowRightIcon />
        </button>
      </form>
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-3 text-sm"
          style={{ color: "#fca5a5" }}
        >
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
