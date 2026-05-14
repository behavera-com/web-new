import ConsultForm from "./ConsultForm";
import RepCard from "./RepCard";
import { consultReps, consultRep as rep } from "./rep-data";

const bullets: { tag: string; body: string }[] = [
  {
    tag: "PROČ TENHLE HOVOR",
    body: "Řekněte nám jednu roli, kde vás nejvíc bolí odchody ve zkušebce. Z hovoru odejdete s pojmenováním 2–3 prediktorů, které vám ve screeningu chybí.",
  },
  {
    tag: "CO Z TOHO MÁTE",
    body: "Konkrétní výstup, ne generická prezentace. Pokud Behavera u vás nedává smysl, řekneme to rovnou.",
  },
];

export default function FinalCta() {
  return (
    <section
      id="consult"
      className="sj-grain sj-grain-dark sj-reveal sj-on-dark"
      style={{
        background: "var(--color-purple-deep)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — headline + rep + trust copy */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="sj-section-anchor">09 · Začněte</span>
            <h2 className="sj-h-manifesto mt-6 max-w-[14ch]" style={{ fontSize: "clamp(44px, 6.4vw, 76px)" }}>
              15 minut.{" "}
              <em>Nula obchodního tlaku.</em>
            </h2>
            <p
              className="mt-8 max-w-[44ch] leading-[1.6]"
              style={{ fontSize: 18, color: "rgba(255,255,255,0.78)" }}
            >
              <span className="sj-hl-on-dark">Žádný obchodní tlak</span> — projdeme
              váš náborový proces a řekneme, kde Behavera dává smysl, a kde ne.
            </p>

            <div className="mt-10 sj-on-light flex flex-col gap-3">
              {consultReps.map((r) => (
                <RepCard key={r.name} rep={r} />
              ))}
            </div>

            <ul className="mt-8 space-y-6">
              {bullets.map((b) => (
                <li key={b.tag}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "var(--color-purple-soft)",
                    }}
                  >
                    {b.tag}
                  </div>
                  <p
                    className="mt-2 leading-[1.55]"
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.78)" }}
                  >
                    {b.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — form card */}
          <div className="lg:col-span-7 sj-on-light">
            <ConsultForm rep={rep} />
          </div>
        </div>
      </div>
    </section>
  );
}
