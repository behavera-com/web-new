"use client";

import { useEffect, useId, useRef, useState } from "react";

type FieldTooltipProps = {
  id: string;
  text: string;
};

/**
 * Inline-expanding "?" helper. Click toggles a slide-down text below the
 * input — flows naturally within the field column, never overflows modal.
 * ESC + outside-click close it. Screen readers always get the text via a
 * visually-hidden span (id="${id}-sr") regardless of expanded state.
 */
export default function FieldTooltip({ id, text }: FieldTooltipProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reactiveId = useId();
  const btnId = `${reactiveId}-btn`;

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (bodyRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        id={btnId}
        type="button"
        className="sj-tip-btn"
        aria-label={open ? "Skrýt vysvětlení" : "Proč to chceme"}
        aria-controls={id}
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
      >
        ?
      </button>
      <div
        ref={bodyRef}
        id={id}
        role="region"
        aria-labelledby={btnId}
        className={`sj-tip-body${open ? " is-open" : ""}`}
      >
        <div className="sj-tip-body-inner">{text}</div>
      </div>
      <span id={`${id}-sr`} className="sj-sr-only">
        {text}
      </span>
    </>
  );
}
