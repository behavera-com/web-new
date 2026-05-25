"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Image from "next/image";
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

const REPORT_BULLETS = [
  {
    title: "Fit na roli, 0–100 %",
    body: "Skóre vůči vašemu týmu — ne generický psychotest.",
  },
  {
    title: "7 pracovních kompetencí",
    body: "Silné stránky, slepá místa a rizika konkrétně podle role.",
  },
  {
    title: "Manager Playbook",
    body: "Jak člověka vést, kde dohlížet, kde dát volnost. Onboarding tipy.",
  },
  {
    title: "Srovnání s týmem",
    body: "Kde doplní mezery a kde nasedne na stávající kulturu.",
  },
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
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#fff",
          }}
        >
          Stáhnout vzor reportu
        </h2>
        <p
          style={{
            margin: "8px 0 18px",
            fontSize: 13.5,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
          }}
        >
          PDF s reálným anonymizovaným reportem. Pošleme na e-mail, k dispozici hned po odeslání.
        </p>

        {/* Mockup — náhled stránky reportu */}
        <div className="sj-modal-mockup" aria-hidden>
          <div className="sj-modal-mockup-frame">
            <Image
              src="/startupjobs/product/report-culture-fit.png"
              alt=""
              width={1200}
              height={780}
              sizes="480px"
              className="sj-modal-mockup-img"
              priority={false}
            />
            <span className="sj-modal-mockup-corner">app.behavera.cz / report</span>
          </div>
        </div>

        {/* Co v reportu uvidíte */}
        <p
          style={{
            margin: "18px 0 8px",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Co v reportu uvidíte
        </p>
        <ul className="sj-modal-bullets">
          {REPORT_BULLETS.map((b) => (
            <li key={b.title}>
              <span className="sj-modal-bullet-dot" aria-hidden />
              <span>
                <strong>{b.title}</strong>
                <span className="sj-modal-bullet-body"> — {b.body}</span>
              </span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 20 }}>
          <ReportForm
            key={isOpen ? "open" : "closed"}
            variant="modal"
          />
        </div>
      </Modal>
    </ReportModalContext.Provider>
  );
}
