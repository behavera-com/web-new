import Image from "next/image";

export default function CoBrandBlock() {
  return (
    <section
      className="sj-grain sj-reveal"
      style={{
        background: "var(--color-paper)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-3">
            <span className="sj-sec-num">06 / SPOLUPRÁCE</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[18ch]">
              Proč StartupJobs <em>×</em> Behavera
            </h2>
          </div>
        </div>

        <div
          className="grid md:grid-cols-2 gap-px"
          style={{
            background: "var(--color-rule)",
            border: "1px solid var(--color-rule)",
          }}
        >
          <div
            className="p-10 md:p-14"
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
            className="p-10 md:p-14"
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
        </div>

        <p
          className="sj-display text-center mt-16 max-w-[40ch] mx-auto"
          style={{ fontSize: 32, lineHeight: 1.3 }}
        >
          Společně pokryjeme celý lifecycle:{" "}
          <em>od kandidáta po stabilního zaměstnance.</em>
        </p>
      </div>
    </section>
  );
}
