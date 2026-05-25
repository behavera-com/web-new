"use client";

import { useId, useRef, useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import FieldTooltip from "../ui/FieldTooltip";
import { useFormValidation } from "../ui/useFormValidation";
import { generateEventId, setUserProperty, track } from "@/lib/analytics";

type ReportFormProps = {
  variant?: "inline" | "modal";
};

const FORM_ID = "report";

const FIELDS = {
  name: { rule: "name" as const, required: true },
  email: { rule: "workEmail" as const, required: true },
  phone: { rule: "phoneCZ" as const, required: true },
  company: { rule: "company" as const, required: true },
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
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const formLocation = variant === "modal" ? "report_modal" : "report_section";

  const validation = useFormValidation(FIELDS, () => ({
    name,
    email,
    phone,
    company,
  }));

  function onFirstFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { form_id: FORM_ID, form_location: formLocation });
  }

  function focusFirstError(fieldName: string) {
    const el = formRef.current?.querySelector<HTMLElement>(
      `[data-field="${fieldName}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = el.querySelector<HTMLInputElement>("input");
      input?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    const { valid, firstErrorField } = validation.validateAll();
    if (!valid) {
      track("form_error", {
        form_id: FORM_ID,
        form_location: formLocation,
        error_type: "validation",
        error_message: firstErrorField ?? "unknown",
      });
      if (firstErrorField) focusFirstError(firstErrorField);
      return;
    }

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

  const renderField = (
    fieldName: "name" | "email" | "phone" | "company",
    label: string,
    inputType: string,
    autoComplete: string,
    placeholder: string,
    value: string,
    setter: (v: string) => void,
    colSpanFull: boolean,
  ) => {
    const err = validation.errors[fieldName];
    const wrn = validation.warns[fieldName];
    const inputId = `${uid}-${fieldName}`;
    const helpId = `${inputId}-help`;
    const msgId = err ? `${inputId}-error` : wrn ? `${inputId}-warn` : undefined;
    const status: "error" | "warn" | undefined = err ? "error" : wrn ? "warn" : undefined;

    return (
      <div
        data-field={fieldName}
        className={`${colSpanFull ? "sm:col-span-2 " : ""}sj-field`}
      >
        <div className="sj-field-row">
          <label htmlFor={inputId} className="sj-field-label">
            {label}
          </label>
          <FieldTooltip id={helpId} text={FIELD_HELP[fieldName]} />
        </div>
        <input
          id={inputId}
          type={inputType}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => {
            setter(e.target.value);
            validation.onChange(fieldName);
          }}
          onBlur={() => validation.onBlur(fieldName)}
          placeholder={placeholder}
          className="sj-report-input w-full px-4 py-2.5 transition-colors placeholder:text-white/35"
          style={inputStyle}
          aria-invalid={!!err}
          aria-describedby={[helpId, msgId].filter(Boolean).join(" ") || undefined}
          data-status={status}
        />
        {err && (
          <p id={msgId} role="alert" className="sj-field-error sj-field-error--dark">
            {err}
          </p>
        )}
        {!err && wrn && (
          <p id={msgId} className="sj-field-warn sj-field-warn--dark">
            {wrn}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onFocus={onFirstFocus}
        className={`grid sm:grid-cols-2 ${gridGap} ${maxW}`}
        noValidate
      >
        {renderField("name", "Jméno a příjmení", "text", "name", "Např. Jan Novák", name, setName, true)}
        {renderField("email", "Pracovní e-mail", "email", "email", "vase@firma.cz", email, setEmail, true)}
        {renderField("phone", "Telefon", "tel", "tel", "+420 …", phone, setPhone, false)}
        {renderField("company", "Název firmy", "text", "organization", "Firma s.r.o.", company, setCompany, false)}

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
