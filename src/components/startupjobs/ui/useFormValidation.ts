"use client";

import { useCallback, useRef, useState } from "react";

export type FieldStatus =
  | { status: "ok" }
  | { status: "error"; msg: string }
  | { status: "warn"; msg: string };

export type Rule<V = Record<string, string | boolean>> = (
  value: string | boolean,
  all: V,
) => FieldStatus;

const EMAIL_RX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "seznam.cz",
  "centrum.cz",
  "post.cz",
  "email.cz",
  "atlas.cz",
  "volny.cz",
  "icloud.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "yahoo.cz",
  "me.com",
  "live.com",
  "proton.me",
  "protonmail.com",
]);

export const rules = {
  name: (v: string): FieldStatus => {
    const trimmed = v.trim();
    if (trimmed.length < 2) return { status: "error", msg: "Napište prosím celé jméno." };
    if (!/\s/.test(trimmed)) return { status: "warn", msg: "Doplňte i příjmení, ať vás oslovíme správně." };
    return { status: "ok" };
  },

  workEmail: (v: string): FieldStatus => {
    const value = v.trim();
    if (!value) return { status: "error", msg: "E-mail je povinný." };
    if (!EMAIL_RX.test(value)) return { status: "error", msg: "Tohle nevypadá jako e-mail." };
    const domain = value.split("@")[1]?.toLowerCase() ?? "";
    if (FREE_EMAIL_DOMAINS.has(domain)) {
      return { status: "warn", msg: "Pracovní e-mail prosím — pošleme report jen tam." };
    }
    return { status: "ok" };
  },

  phoneCZ: (v: string): FieldStatus => {
    const value = v.trim();
    if (!value) return { status: "error", msg: "Telefon je povinný." };
    const digits = value.replace(/\D/g, "");
    if (digits.length < 9) return { status: "error", msg: "Telefon vypadá zkráceně. Zkuste i s předvolbou." };
    if (digits.length > 15) return { status: "error", msg: "Telefon je moc dlouhý — zkontrolujte ho prosím." };
    return { status: "ok" };
  },

  company: (v: string): FieldStatus => {
    const trimmed = v.trim();
    if (trimmed.length < 2) return { status: "error", msg: "Jak se jmenuje vaše firma?" };
    return { status: "ok" };
  },

  employees: (v: string): FieldStatus => {
    const n = Number(v);
    if (!v.trim() || Number.isNaN(n) || n < 1) {
      return { status: "error", msg: "Odhadem kolik vás je?" };
    }
    return { status: "ok" };
  },

  hiresPerYear: (v: string): FieldStatus => {
    const n = Number(v);
    if (!v.trim() || Number.isNaN(n) || n < 1) {
      return { status: "error", msg: "Kolik lidí letos berete?" };
    }
    return { status: "ok" };
  },

  consent: (v: boolean): FieldStatus => {
    if (!v) return { status: "error", msg: "Bez souhlasu vám report nemůžeme poslat." };
    return { status: "ok" };
  },
} as const;

export type RuleName = keyof typeof rules;

type FieldSpec = {
  /** Which rule to run */
  rule: RuleName;
  /** Treat field as required (warn-only rules will still be soft) */
  required?: boolean;
};

type ValuesMap = Record<string, string | boolean>;

export function useFormValidation<F extends Record<string, FieldSpec>>(
  fields: F,
  getValues: () => ValuesMap,
) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warns, setWarns] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const submitAttemptedRef = useRef(false);

  const runField = useCallback(
    (fieldName: string): FieldStatus => {
      const spec = fields[fieldName as keyof F];
      if (!spec) return { status: "ok" };
      const values = getValues();
      const raw = values[fieldName];
      const rule = rules[spec.rule];
      // rules expect either string or boolean depending on type
      return rule(raw as never);
    },
    [fields, getValues],
  );

  const validateField = useCallback(
    (fieldName: string) => {
      const res = runField(fieldName);
      setErrors((prev) => {
        const next = { ...prev };
        if (res.status === "error") next[fieldName] = res.msg;
        else delete next[fieldName];
        return next;
      });
      setWarns((prev) => {
        const next = { ...prev };
        if (res.status === "warn") next[fieldName] = res.msg;
        else delete next[fieldName];
        return next;
      });
      return res;
    },
    [runField],
  );

  const onBlur = useCallback(
    (fieldName: string) => {
      setTouched((prev) => (prev[fieldName] ? prev : { ...prev, [fieldName]: true }));
      validateField(fieldName);
    },
    [validateField],
  );

  /** Clear errors as user re-types (UX: don't keep red after they start fixing) */
  const onChange = useCallback((fieldName: string) => {
    setErrors((prev) => {
      if (!prev[fieldName]) return prev;
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
    setWarns((prev) => {
      if (!prev[fieldName]) return prev;
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  }, []);

  /** Returns true if all required fields pass (warns OK). Sets errors and marks all touched. */
  const validateAll = useCallback((): { valid: boolean; firstErrorField: string | null } => {
    submitAttemptedRef.current = true;
    const nextErrors: Record<string, string> = {};
    const nextWarns: Record<string, string> = {};
    const nextTouched: Record<string, boolean> = {};
    let firstError: string | null = null;
    const order = Object.keys(fields);
    for (const name of order) {
      nextTouched[name] = true;
      const res = runField(name);
      if (res.status === "error") {
        nextErrors[name] = res.msg;
        if (!firstError) firstError = name;
      } else if (res.status === "warn") {
        nextWarns[name] = res.msg;
      }
    }
    setErrors(nextErrors);
    setWarns(nextWarns);
    setTouched(nextTouched);
    return { valid: !firstError, firstErrorField: firstError };
  }, [fields, runField]);

  const errorCount = Object.keys(errors).length;

  return {
    errors,
    warns,
    touched,
    onBlur,
    onChange,
    validateField,
    validateAll,
    errorCount,
    submitAttempted: submitAttemptedRef.current,
  };
}
