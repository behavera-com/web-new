"use client";

import { useId, useRef, useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import FieldTooltip from "../ui/FieldTooltip";
import { generateEventId, setUserProperty, track } from "@/lib/analytics";

type ReportFormProps = {
  variant?: "inline" | "modal";
};

const FORM_ID = "report";

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
  const startedRef = useRef(false);
  const formLocation = variant === "modal" ? "report_modal" : "report_section";

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { form_id: FORM_ID, form_location: formLocation });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !company || loading) return;
    setLoading(true);
    setError(null);
    const eventId = generateEventId();
    track("form_submit", { form_id: FORM_ID, form_location: formLocation });
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
          event_id: eventId,
        }),
      });
      if (!res.ok) throw new Error("network");
      track("generate_lead", {
        form_id: FORM_ID,
        lead_source: "startupjobs-lp",
        value: 0,
        currency: "CZK",
        event_id: eventId,
      });
      setUserProperty("lead_type", FORM_ID);
      setSubmitted(true);
    } catch (err) {
      track("form_error", {
        form_id: FORM_ID,
        form_location: formLocation,
        error_type: "network",
        error_message: err instanceof Error ? err.message : "unknown",
      });
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

  const gridGap = variant === "modal" ? "gap-3.5" : "gap-3";
  const maxW = variant === "modal" ? "" : "max-w-[560px]";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onFocus={onFirstFocus}
        className={`grid sm:grid-cols-2 ${gridGap} ${maxW}`}
      >
        <div className="sm:col-span-2 sj-field">
          <div className="sj-field-row">
            <label htmlFor={`${uid}-name`} className="sj-field-label">
              Jméno a příjmení
            </label>
            <FieldTooltip id={`${uid}-name-help`} text={FIELD_HELP.name} />
          </div>
          <input
            id={`${uid}-name`}
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Např. Jan Novák"
            className="w-full px-4 py-2.5 transition-colors placeholder:text-white/35"
            style={inputStyle}
            aria-describedby={`${uid}-name-help`}
          />
        </div>

        <div className="sm:col-span-2 sj-field">
          <div className="sj-field-row">
            <label htmlFor={`${uid}-email`} className="sj-field-label">
              Pracovní e-mail
            </label>
            <FieldTooltip id={`${uid}-email-help`} text={FIELD_HELP.email} />
          </div>
          <input
            id={`${uid}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vase@firma.cz"
            className="w-full px-4 py-2.5 transition-colors placeholder:text-white/35"
            style={inputStyle}
            aria-describedby={`${uid}-email-help`}
          />
        </div>

        <div className="sj-field">
          <div className="sj-field-row">
            <label htmlFor={`${uid}-phone`} className="sj-field-label">
              Telefon
            </label>
            <FieldTooltip id={`${uid}-phone-help`} text={FIELD_HELP.phone} />
          </div>
          <input
            id={`${uid}-phone`}
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+420 …"
            className="w-full px-4 py-2.5 transition-colors placeholder:text-white/35"
            style={inputStyle}
            aria-describedby={`${uid}-phone-help`}
          />
        </div>

        <div className="sj-field">
          <div className="sj-field-row">
            <label htmlFor={`${uid}-company`} className="sj-field-label">
              Název firmy
            </label>
            <FieldTooltip id={`${uid}-company-help`} text={FIELD_HELP.company} />
          </div>
          <input
            id={`${uid}-company`}
            type="text"
            required
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Firma s.r.o."
            className="w-full px-4 py-2.5 transition-colors placeholder:text-white/35"
            style={inputStyle}
            aria-describedby={`${uid}-company-help`}
          />
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
