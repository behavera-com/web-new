"use client";

import { useRef, useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import RepCard, { type Rep } from "./RepCard";
import { generateEventId, setUserProperty, track } from "@/lib/analytics";

const MSG_MAX = 500;
const FORM_ID = "consult";
const FORM_LOCATION = "consult_section";

export default function ConsultForm({ rep }: { rep?: Rep }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [employees, setEmployees] = useState("");
  const [hiresPerYear, setHiresPerYear] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { form_id: FORM_ID, form_location: FORM_LOCATION });
  }

  const canSubmit =
    !!name &&
    !!email &&
    !!phone &&
    !!company &&
    !!employees &&
    !!hiresPerYear &&
    consent &&
    !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    if (website) return; // honeypot: silent drop
    setLoading(true);
    setError(null);
    const eventId = generateEventId();
    track("form_submit", { form_id: FORM_ID, form_location: FORM_LOCATION });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          source: "startupjobs-consult",
          event_id: eventId,
          consult: {
            employees: Number(employees) || undefined,
            hiresPerYear: Number(hiresPerYear) || undefined,
            message: message.trim() || undefined,
          },
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
        form_location: FORM_LOCATION,
        error_type: "network",
        error_message: err instanceof Error ? err.message : "unknown",
      });
      setError("Nepodařilo se odeslat. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="sj-consult-card p-10 md:p-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 mb-6"
          style={{
            background: "var(--color-purple-deep)",
            color: "#fff",
            borderRadius: "999px",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2.5 7.5l3 3 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
          }}
        >
          Hotovo. Ozveme se do 24 hodin.
        </h3>
        <p
          className="mt-4 max-w-[44ch] mx-auto leading-[1.55]"
          style={{ fontSize: 15, color: "rgba(28,18,55,0.7)" }}
        >
          {rep ? `${rep.name.split(" ")[0]} vám pošle` : "Náš konzultant vám pošle"}
          {" 2–3 termíny pro 15minutový hovor na vámi uvedený e-mail."}
        </p>
        {rep && (
          <div
            className="mt-8 inline-block text-left"
            style={{
              border: "1px solid var(--color-rule)",
              background: "var(--color-alt)",
              padding: "10px 16px",
              borderRadius: 2,
            }}
          >
            <RepCard rep={rep} variant="compact" />
          </div>
        )}
        <p
          className="mt-8"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "rgba(28,18,55,0.45)",
            letterSpacing: "0.18em",
          }}
        >
          POTVRZENÍ DORAZILO NA {email.toUpperCase()}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={onFirstFocus}
      className="sj-consult-card p-7 md:p-10"
      noValidate
    >
      {/* Honeypot — visually hidden */}
      <label
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        Website
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField
          label="Jméno a příjmení"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={setName}
          placeholder="Jan Novák"
        />
        <TextField
          label="Pracovní e-mail"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={setEmail}
          placeholder="jan@firma.cz"
        />
        <TextField
          label="Telefon"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={setPhone}
          placeholder="+420 …"
        />
        <TextField
          label="Firma"
          type="text"
          autoComplete="organization"
          required
          value={company}
          onChange={setCompany}
          placeholder="Behavera s.r.o."
        />
        <TextField
          label="Zaměstnanců"
          hint="(odhad)"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          required
          value={employees}
          onChange={(v) => setEmployees(v.replace(/[^0-9]/g, "").slice(0, 6))}
          placeholder="~50"
        />
        <TextField
          label="Náborů ročně"
          hint="(odhad)"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          required
          value={hiresPerYear}
          onChange={(v) => setHiresPerYear(v.replace(/[^0-9]/g, "").slice(0, 4))}
          placeholder="~10"
        />
      </div>

      <div className="mt-4">
        <FieldLabel>
          Co bychom měli vědět před hovorem?{" "}
          <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>
            (volitelné)
          </span>
        </FieldLabel>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MSG_MAX))}
          rows={3}
          placeholder="Co teď v náboru řešíte, kolik pozic obsazujete…"
          className="sj-consult-input mt-2 resize-none w-full"
        />
      </div>

      <label
        className="flex items-start gap-3 mt-6 cursor-pointer select-none"
        style={{ fontSize: 13, color: "rgba(28,18,55,0.75)", lineHeight: 1.5 }}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 flex-none"
          style={{ accentColor: "var(--color-purple-deep)" }}
          required
          aria-label="Souhlas se zpracováním osobních údajů"
        />
        <span>
          Souhlasím se zpracováním osobních údajů za účelem domluvení
          konzultace. Více v{" "}
          <a
            href="/cs/ochrana-udaju"
            className="underline"
            style={{ color: "var(--color-purple-deep)" }}
            target="_blank"
            rel="noopener"
          >
            ochraně osobních údajů
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="sj-btn-primary-xl justify-center mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ padding: "18px 28px", fontSize: 16, width: "100%" }}
      >
        {loading ? "Odesílám…" : "Domluvit konzultaci"}
        {!loading && <ArrowRightIcon size={16} />}
      </button>

      <p
        className="mt-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "rgba(28,18,55,0.55)",
          letterSpacing: "0.16em",
        }}
      >
        ODPOVĚĎ DO 24 H · 15 MIN · ŽÁDNÝ OBCHODNÍ TLAK
      </p>
      {error && (
        <p className="mt-3 text-sm" style={{ color: "#b91c1c" }}>
          {error}
        </p>
      )}
    </form>
  );
}

/* ---------- Sub-components ---------- */

function FieldLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: "var(--color-ink)",
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

function TextField({
  label,
  type,
  required,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  pattern,
  hint,
}: {
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text" | "url";
  pattern?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>
        {label}
        {required && (
          <span style={{ color: "var(--color-purple-accent)" }}> *</span>
        )}
        {hint && (
          <span
            style={{
              color: "var(--color-muted)",
              fontWeight: 400,
              marginLeft: 6,
            }}
          >
            {hint}
          </span>
        )}
      </FieldLabel>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        className="sj-consult-input w-full"
      />
    </label>
  );
}
