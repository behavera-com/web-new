import ArrowRightIcon from "../ui/ArrowRightIcon";

export default function ReportPreview() {
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
              Tohle dostane HR{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontVariationSettings: '"opsz" 144, "SOFT" 80',
                  color: "var(--color-purple-deep)",
                }}
              >
                do 48 hodin
              </em>{" "}
              po průzkumu.
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
              Žádné PDF s 80 stránkami textu. Čtyři obrazovky se signály nálady,
              doporučeními per tým a hiring angles — připravené k použití v
              kampaních a inzerátech.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 items-center">
              <a
                href="/startupjobs/behavera-report-preview.pdf"
                className="sj-btn-primary"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                Stáhnout vzor (PDF)
                <ArrowRightIcon size={14} />
              </a>
              <span className="sj-eyebrow">4 strany · 1.2 MB</span>
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
            6 signálů nálady · barometr
          </span>
          <span
            className="sj-annot sj-annot-green hidden lg:flex"
            style={{
              top: "38%",
              right: -14,
            }}
          >
            <span className="sj-annot-dot" />
            Doporučení per tým
          </span>
          <span
            className="sj-annot sj-annot-amber hidden lg:flex"
            style={{
              top: "72%",
              left: -14,
            }}
          >
            <span className="sj-annot-dot" />
            Hiring angles · ready-to-use
          </span>

          <div className="sj-report-frame">
            <div className="sj-chrome-bar">
              <span className="sj-chrome-dot" />
              <span className="sj-chrome-dot" />
              <span className="sj-chrome-dot" />
              <span className="sj-chrome-title">
                behavera-report.pdf · Echo Pulse · Leadership
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
                Live preview
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
            className="lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
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
              6 signálů nálady · barometr
            </li>
            <li className="flex items-start gap-2">
              <span className="sj-annot-dot mt-1.5" style={{ background: "var(--sj-signal-green, #16a34a)" }} />
              Doporučení per tým
            </li>
            <li className="flex items-start gap-2">
              <span className="sj-annot-dot mt-1.5" style={{ background: "var(--sj-signal-amber, #f59e0b)" }} />
              Hiring angles · ready-to-use
            </li>
          </ul>

          <div
            className="relative flex justify-center"
            style={{ marginTop: -54, zIndex: 4 }}
          >
            <a href="#consult" className="sj-btn-primary-xl">
              Spustit 3min průzkum
              <ArrowRightIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
