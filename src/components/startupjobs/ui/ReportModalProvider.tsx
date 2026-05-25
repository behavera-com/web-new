"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Modal from "./Modal";
import ReportForm from "../sections/ReportForm";

type ReportModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ReportModalContext = createContext<ReportModalContextValue | null>(null);

export function useReportModal(): ReportModalContextValue {
  const ctx = useContext(ReportModalContext);
  if (!ctx) {
    throw new Error("useReportModal must be used inside <ReportModalProvider>");
  }
  return ctx;
}

type MockRow = { label: string; pct: number; val: string };

const MOCK_ROWS: MockRow[] = [
  { label: "Fit na roli", pct: 88, val: "88 %" },
  { label: "Týmová spolupráce", pct: 74, val: "74 %" },
  { label: "Tlak a deadlines", pct: 62, val: "62 %" },
  { label: "Učení & adaptace", pct: 81, val: "81 %" },
];

const SUMMARY_BULLETS = [
  "Fit na roli (0–100 %)",
  "7 pracovních kompetencí",
  "Manager Playbook",
  "Srovnání s týmem",
];

export function ReportModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ReportModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <Modal
        open={isOpen}
        onClose={close}
        labelledBy="report-modal-title"
      >
        <h2
          id="report-modal-title"
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#fff",
          }}
        >
          Stáhnout vzor reportu
        </h2>
        <p
          style={{
            margin: "6px 0 16px",
            fontSize: 13,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
          }}
        >
          PDF dorazí na e-mail. Co v něm uvidíte ↓
        </p>

        {/* Form — prominent, above the supplementary preview */}
        <ReportForm
          key={isOpen ? "open" : "closed"}
          variant="modal"
        />

        {/* Co v reportu uvidíte — kompaktní 2-sloupcové bullety */}
        <ul className="sj-modal-summary" aria-label="Co v reportu uvidíte">
          {SUMMARY_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        {/* Abstract mockup — CSS-only, no specific screenshot */}
        <div className="sj-modal-mock" aria-hidden>
          <div className="sj-modal-mock-head">
            <span className="sj-modal-mock-title">Ukázka · Fit na roli</span>
            <span className="sj-modal-mock-score">
              Celkové <b>76</b>%
            </span>
          </div>
          <div className="sj-modal-mock-rows">
            {MOCK_ROWS.map((r) => (
              <div key={r.label} className="sj-modal-mock-row">
                <span>{r.label}</span>
                <span className="sj-bar">
                  <i style={{ width: `${r.pct}%` }} />
                </span>
                <span className="sj-val">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </ReportModalContext.Provider>
  );
}
