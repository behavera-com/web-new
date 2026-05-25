"use client";

import { track } from "@/lib/analytics";
import type { ReactNode } from "react";

export default function FaqItem({
  index,
  question,
  defaultOpen,
  children,
}: {
  index: number;
  question: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  function handleToggle(e: React.SyntheticEvent<HTMLDetailsElement>) {
    if (!e.currentTarget.open) return;
    track("faq_open", {
      faq_index: index,
      faq_question: question.slice(0, 100),
    });
  }

  return (
    <details
      className="sj-faq-item"
      {...(defaultOpen ? { open: true } : {})}
      onToggle={handleToggle}
    >
      <summary>
        {question}
        <span className="sj-faq-icon" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1.5v9M1.5 6h9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </summary>
      <div className="sj-faq-answer">{children}</div>
    </details>
  );
}
