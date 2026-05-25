"use client";

import { useEffect, useRef, useState } from "react";

type FieldTooltipProps = {
  id: string;
  text: string;
};

export default function FieldTooltip({ id, text }: FieldTooltipProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
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
    <span
      ref={wrapRef}
      className="sj-tooltip-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="sj-tooltip-btn"
        aria-label="Proč to chceme"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        ?
      </button>
      <span
        role="tooltip"
        id={id}
        className={`sj-tooltip-pop${open ? " is-open" : ""}`}
      >
        {text}
      </span>
      {/* Always-rendered text for screen readers; visually hidden */}
      <span id={`${id}-sr`} className="sj-sr-only">
        {text}
      </span>
    </span>
  );
}
