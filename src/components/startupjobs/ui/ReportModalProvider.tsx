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
            margin: "6px 0 18px",
            fontSize: 13,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.5,
          }}
        >
          PDF dorazí na e-mail. K dispozici i ihned po odeslání.
        </p>

        <div className="sj-modal-grid">
          {/* Desktop: vpravo (order: 2). Mobile: DOM-first = nahoře. */}
          <div className="sj-modal-form-col">
            <ReportForm
              key={isOpen ? "open" : "closed"}
              variant="modal"
            />
          </div>

          {/* Desktop: vlevo (order: 1). Mobile: DOM-second = pod formem. */}
          <aside className="sj-modal-aside-col">
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--font-mono)",
                fontSize: 9.5,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Ukázka reportu
            </p>

            <div className="sj-modal-mock" aria-hidden>
              <div className="sj-modal-mock-bar">
                <span>
                  <span className="sj-modal-mock-bar-dots">
                    <i style={{ background: "#ff6058" }} />
                    <i style={{ background: "#ffbd2e" }} />
                    <i style={{ background: "#28c941" }} />
                  </span>
                  behavera-report.pdf · Jan Behavera
                </span>
                <span>Náhled</span>
              </div>
              <div className="sj-modal-mock-body">
                <div>
                  <div className="sj-modal-mock-eyebrow">
                    Candidate Assessment Report
                  </div>
                  <div className="sj-modal-mock-name">Jan Behavera</div>
                  <div className="sj-modal-mock-role">
                    Hodnocení pro pozici <b>Obchodník / Sales Person</b>
                  </div>
                  <div className="sj-modal-mock-meta">
                    <span>19. 3. 2026</span>
                    <span>28:43 min</span>
                  </div>
                </div>
                <div className="sj-modal-mock-score">
                  <div className="sj-modal-mock-score-num">
                    63<small>%</small>
                  </div>
                  <span className="sj-modal-mock-score-pill">Fit na roli</span>
                </div>

                <div className="sj-modal-mock-summary">
                  <span className="sj-modal-mock-summary-title">
                    Shrnutí kandidáta
                  </span>
                  <div className="sj-modal-mock-summary-lines">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            </div>

            <ul
              className="sj-modal-summary"
              aria-label="Co v reportu uvidíte"
            >
              {SUMMARY_BULLETS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </aside>
        </div>
      </Modal>
    </ReportModalContext.Provider>
  );
}
