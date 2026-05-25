"use client";

import { useRef, useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import RepCard, { type Rep } from "./RepCard";
import { useFormValidation } from "../ui/useFormValidation";
import { generateEventId, setUserProperty, track } from "@/lib/analytics";

const MSG_MAX = 500;
const FORM_ID = "consult";
const FORM_LOCATION = "consult_section";

const FIELDS = {
  name: { rule: "name" as const, required: true },
  email: { rule: "workEmail" as const, required: true },
  phone: { rule: "phoneCZ" as const, required: true },
  company: { rule: "company" as const, required: true },
  employees: { rule: "employees" as const, required: true },
  hiresPerYear: { rule: "hiresPerYear" as const, required: true },
  consent: { rule: "consent" as const, required: true },
};

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
  const formRef = useRef<HTMLFormElement>(null);

  const validation = useFormValidation(FIELDS, () => ({
    name,
    email,
    phone,
    company,
    employees,
    hiresPerYear,
    consent,
  }));

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { form_id: FORM_ID, form_location: FORM_LOCATION });
  }

  function makeChange(field: string, setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      validation.onChange(field);
    };
  }

  function focusFirstError(fieldName: string) {
    const el = formRef.current?.querySelector<HTMLElement>(
      `[data-field="${fieldName}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = el.querySelector<HTMLElement>("input, textarea, select");
      input?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (website) return; // honeypot: silent drop

    const { valid, firstErrorField } = validation.validateAll();
    if (!valid) {
      track("form_error", {
        form_id: FORM_ID,
        form_location: FORM_LOCATION,
        error_type: "validation",
        error_message: firstErrorField ?? "unknown",
      });
      if (firstErrorField) focusFirstError(firstErrorField);
      return;
    }

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

  const consentError = validation.errors.consent;
  const summaryCount = validation.errorCount;

  return (
    <form
      ref={formRef}
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
          name="name"
          label="Jméno a příjmení"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={makeChange("name", setName)}
          onBlur={() => validation.onBlur("name")}
          placeholder="Jan Novák"
          error={validation.errors.name}
          warn={validation.warns.name}
        />
        <TextField
          name="email"
          label="Pracovní e-mail"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={makeChange("email", setEmail)}
          onBlur={() => validation.onBlur("email")}
          placeholder="jan@firma.cz"
          error={validation.errors.email}
          warn={validation.warns.email}
        />
        <TextField
          name="phone"
          label="Telefon"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={makeChange("phone", setPhone)}
          onBlur={() => validation.onBlur("phone")}
          placeholder="+420 …"
          error={validation.errors.phone}
          warn={validation.warns.phone}
        />
        <TextField
          name="company"
          label="Firma"
          type="text"
          autoComplete="organization"
          required
          value={company}
          onChange={makeChange("company", setCompany)}
          onBlur={() => validation.onBlur("company")}
          placeholder="Behavera s.r.o."
          error={validation.errors.company}
          warn={validation.warns.company}
        />
        <TextField
          name="employees"
          label="Zaměstnanců"
          hint="(odhad)"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          required
          value={employees}
          onChange={makeChange("employees", (v) =>
            setEmployees(v.replace(/[^0-9]/g, "").slice(0, 6)),
          )}
          onBlur={() => validation.onBlur("employees")}
          placeholder="~50"
          error={validation.errors.employees}
          warn={validation.warns.employees}
        />
        <TextField
          name="hiresPerYear"
          label="Náborů ročně"
          hint="(odhad)"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          required
          value={hiresPerYear}
          onChange={makeChange("hiresPerYear", (v) =>
            setHiresPerYear(v.replace(/[^0-9]/g, "").slice(0, 4)),
          )}
          onBlur={() => validation.onBlur("hiresPerYear")}
          placeholder="~10"
          error={validation.errors.hiresPerYear}
          warn={validation.warns.hiresPerYear}
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

      <div data-field="consent">
        <label
          className="flex items-start gap-3 mt-6 cursor-pointer select-none"
          style={{ fontSize: 13, color: "rgba(28,18,55,0.75)", lineHeight: 1.5 }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              validation.onChange("consent");
            }}
            onBlur={() => validation.onBlur("consent")}
            className="mt-1 flex-none"
            style={{ accentColor: "var(--color-purple-deep)" }}
            aria-invalid={!!consentError}
            aria-describedby={consentError ? "consent-error" : undefined}
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
        {consentError && (
          <p
            id="consent-error"
            role="alert"
            className="sj-field-error sj-field-error--light"
            style={{ marginTop: 6, marginLeft: 28 }}
          >
            {consentError}
          </p>
        )}
      </div>

      {summaryCount > 1 && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "#9b1c2c",
            textTransform: "uppercase",
          }}
        >
          {summaryCount} {pluralizePolozku(summaryCount)} k doplnění
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
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

function pluralizePolozku(n: number): string {
  if (n === 1) return "položka";
  if (n >= 2 && n <= 4) return "položky";
  return "položek";
}

/* ---------- Sub-components ---------- */

function FieldLabel({
  children,
  className = "",
  htmlFor,
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={className}
      style={{
        display: "block",
        fontSize: 13,
        fontWeight: 500,
        color: "var(--color-ink)",
        marginBottom: 6,
      }}
    >
      {children}
    </label>
  );
}

function TextField({
  name,
  label,
  type,
  required,
  value,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  inputMode,
  pattern,
  hint,
  error,
  warn,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text" | "url";
  pattern?: string;
  hint?: string;
  error?: string;
  warn?: string;
}) {
  const inputId = `consult-${name}`;
  const msgId = error ? `${inputId}-error` : warn ? `${inputId}-warn` : undefined;
  const status: "error" | "warn" | undefined = error ? "error" : warn ? "warn" : undefined;

  return (
    <div data-field={name} className="block">
      <FieldLabel htmlFor={inputId}>
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
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        pattern={pattern}
        className="sj-consult-input w-full"
        aria-invalid={!!error}
        aria-describedby={msgId}
        data-status={status}
      />
      {error && (
        <p id={msgId} role="alert" className="sj-field-error sj-field-error--light">
          {error}
        </p>
      )}
      {!error && warn && (
        <p id={msgId} className="sj-field-warn sj-field-warn--light">
          {warn}
        </p>
      )}
    </div>
  );
}
