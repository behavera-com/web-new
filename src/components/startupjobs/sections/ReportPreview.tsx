"use client";

import { useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import Modal from "../ui/Modal";
import ReportForm from "./ReportForm";

export default function ReportPreview() {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  return (
    <section
      id="report"
      className="sj-reveal relative"
      style={{
        background:
          "linear-gradient(180deg, var(--color-paper) 0%, #f3eeff 100%)",
        borderTop: "1px solid var(--color-rule)",
        paddingTop: "clamp(72px, 9vw, 112px)",
        paddingBottom: "clamp(72px, 9vw, 112px)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-14">
          <div className="lg:col-span-6">
            <span className="sj-section-anchor mb-5 inline-flex">
              04 · Co dostanete
            </span>
            <h2
              className="sj-h-section"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Report na kandidáta{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                ihned po dokončení
              </em>{" "}
              dotazníku.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 self-end">
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.75)",
              }}
            >
              Fit na roli, fit do týmu, srovnání s ostatními kandidáty, otázky
              k pohovoru — a tipy, jak s nováčkem pracovat po nástupu: na co si
              dát pozor, kde má prostor růst. Tři strany, podle kterých se
              rozhodnete v řádu minut — ne dnů.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="sj-btn-primary"
              >
                Stáhnout ukázku reportu (PDF)
                <ArrowRightIcon size={14} />
              </button>
              <span className="sj-eyebrow">3 strany · 2 MB</span>
            </div>
          </div>
        </div>

        {/* Report frame + annotations */}
        <div className="relative">
          {/* Annotations — positioned OVER the frame edges, Vercel-style */}
          <span
            className="sj-annot hidden lg:flex"
            style={{
              top: 38,
              left: -14,
            }}
          >
            <span className="sj-annot-dot" />
            Fit na roli · 0–100 %
          </span>
          <span
            className="sj-annot sj-annot-green hidden lg:flex"
            style={{
              top: "38%",
              right: -14,
            }}
          >
            <span className="sj-annot-dot" />
            7 pracovních kompetencí
          </span>
          <span
            className="sj-annot sj-annot-amber hidden lg:flex"
            style={{
              top: "72%",
              left: -14,
            }}
          >
            <span className="sj-annot-dot" />
            Tipy pro onboarding · rizika a rozvoj
          </span>

          <div className="sj-report-frame">
            <div className="sj-chrome-bar">
              <span className="sj-chrome-dot" />
              <span className="sj-chrome-dot" />
              <span className="sj-chrome-dot" />
              <span className="sj-chrome-title">
                behavera-report.pdf · Jan Behavera · Obchodník
              </span>
              <span
                className="ml-auto"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.08em",
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                }}
              >
                Náhled
              </span>
            </div>
            <iframe
              src="/startupjobs/report-preview.html"
              title="Ukázka reportu Behavera Echo Pulse"
              className="sj-report-iframe"
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>

          {/* gradient mask shows there's more */}
          <div
            aria-hidden
            className="absolute left-0 right-0 bottom-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(243, 238, 255, 0.95) 90%)",
              borderRadius: "0 0 14px 14px",
            }}
          />
          {/* Mobile / tablet annotation fallback */}
          <ul
            className="lg:hidden mt-6 mb-12 grid grid-cols-1 sm:grid-cols-3 gap-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
            }}
          >
            <li className="flex items-start gap-2">
              <span className="sj-annot-dot mt-1.5" />
              Fit na roli · 0–100 %
            </li>
            <li className="flex items-start gap-2">
              <span className="sj-annot-dot mt-1.5" style={{ background: "var(--sj-signal-green, #16a34a)" }} />
              7 pracovních kompetencí
            </li>
            <li className="flex items-start gap-2">
              <span className="sj-annot-dot mt-1.5" style={{ background: "var(--sj-signal-amber, #f59e0b)" }} />
              Tipy pro onboarding · rizika a rozvoj
            </li>
          </ul>

          <div
            className="relative flex justify-center lg:-mt-[54px]"
            style={{ zIndex: 4 }}
          >
            <button
              type="button"
              onClick={() => setReportModalOpen(true)}
              className="sj-btn-primary-xl"
            >
              Stáhnout ukázku reportu (PDF)
              <ArrowRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        labelledBy="report-preview-modal-title"
      >
        <h2
          id="report-preview-modal-title"
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
            margin: "8px 0 24px",
            fontSize: 14,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.5,
          }}
        >
          PDF s reálným anonymizovaným reportem. Dorazí na váš e-mail do 24 hodin.
        </p>
        <ReportForm
          key={reportModalOpen ? "open" : "closed"}
          variant="modal"
        />
      </Modal>
    </section>
  );
}
