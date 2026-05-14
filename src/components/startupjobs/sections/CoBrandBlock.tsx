import Image from "next/image";

export default function CoBrandBlock() {
  return (
    <section
      className="sj-grain sj-reveal"
      style={{
        background: "var(--color-alt)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-3">
            <span className="sj-section-anchor">× StartupJobs × Behavera</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[18ch]">
              Proč StartupJobs <em>×</em> Behavera
            </h2>
          </div>
        </div>

        <div
          className="relative grid md:grid-cols-2 gap-px"
          style={{
            background: "var(--color-rule)",
            border: "1px solid var(--color-rule)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            className="p-10 md:p-14 sj-on-light"
            style={{ background: "var(--color-paper)" }}
          >
            <Image
              src="/startupjobs/logo-startupjobs.svg"
              alt="StartupJobs"
              width={160}
              height={32}
              style={{ height: 32, width: "auto", marginBottom: 32 }}
            />
            <p
              className="sj-display max-w-[20ch]"
              style={{ fontSize: 30, lineHeight: 1.2 }}
            >
              Doručíme vám <em>kandidáty</em>.
            </p>
          </div>
          <div
            className="p-10 md:p-14 sj-on-light"
            style={{ background: "var(--color-paper)" }}
          >
            <Image
              src="/startupjobs/logo-behavera.png"
              alt="Behavera"
              width={140}
              height={28}
              style={{ height: 28, width: "auto", marginBottom: 32 }}
            />
            <p
              className="sj-display max-w-[20ch]"
              style={{ fontSize: 30, lineHeight: 1.2 }}
            >
              Pomůžeme vám vybrat <em>ty správné</em> — a měřitelně to dokážeme.
            </p>
          </div>
          {/* Centered × ampersand badge bridging the two columns */}
          <span
            aria-hidden="true"
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-[88px] h-[88px] rounded-full sj-on-light"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontVariationSettings: "'opsz' 144,'SOFT' 80",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 56,
              lineHeight: 1,
              color: "var(--color-purple-accent)",
              background: "var(--color-paper)",
              border: "1px solid var(--color-rule)",
              boxShadow: "0 12px 32px -16px rgba(45,27,105,0.35)",
            }}
          >
            ×
          </span>
        </div>

        <p
          className="sj-display text-center mt-16 max-w-[40ch] mx-auto"
          style={{ fontSize: 32, lineHeight: 1.3 }}
        >
          1 + 1 = celý lifecycle:{" "}
          <em>od kandidáta po stabilního zaměstnance.</em>
        </p>
      </div>
    </section>
  );
}
