"use client";

import { useEffect, useId, useRef, useState } from "react";

type UseFieldTooltipResult = {
  tooltipBtn: React.ReactNode;
  tooltipBody: React.ReactNode;
};

/**
 * Hook + render helpers for a per-field "?" tooltip. The `?` button is rendered
 * inline (e.g. next to a label) and the helper body is a sibling that slides
 * down where you place it (e.g. below the input). Both share state via this
 * single hook call.
 *
 * Behavior:
 * - Click `?` toggles open
 * - ESC closes
 * - Click outside both elements closes
 *
 * A11y:
 * - `aria-controls`, `aria-expanded` on the button
 * - Hidden `<span id="${id}-sr">` text is always available to screen readers
 */
export function useFieldTooltip(id: string, text: string): UseFieldTooltipResult {
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

  const tooltipBtn = (
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
  );

  const tooltipBody = (
    <>
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

  return { tooltipBtn, tooltipBody };
}
