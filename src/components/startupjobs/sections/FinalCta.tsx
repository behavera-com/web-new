import ConsultForm from "./ConsultForm";
import EnvelopeIcon from "../ui/EnvelopeIcon";
import PhoneIcon from "../ui/PhoneIcon";
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
          <div className="lg:col-span-5">
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

            <div
              className="mt-10 sj-on-light"
              style={{
                background: "#fff",
                border: "1px solid var(--color-rule)",
                borderRadius: 2,
                padding: "20px 20px 20px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "var(--color-purple-deep)",
                  marginBottom: 14,
                }}
              >
                OZVE SE VÁM
              </div>
              <div className="flex items-center gap-4">
                {/* Overlapping avatars */}
                <div className="flex items-center shrink-0" style={{ marginRight: 4 }}>
                  {consultReps.map((r, i) => (
                    <div
                      key={r.name}
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        overflow: "hidden",
                        background: "var(--color-purple-deep)",
                        border: "2px solid #fff",
                        marginLeft: i > 0 ? -16 : 0,
                        position: "relative",
                        zIndex: consultReps.length - i,
                        boxShadow: "0 4px 12px -6px rgba(45,27,105,0.4)",
                      }}
                    >
                      {r.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={r.photo}
                          alt={r.name}
                          width={52}
                          height={52}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        <span style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 500 }}>
                          {r.name[0]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {/* Names + titles */}
                <div className="flex-1 min-w-0">
                  {consultReps.map((r) => (
                    <div key={r.name}>
                      <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-ink)" }}>{r.name}</span>
                      <span style={{ fontSize: 12, color: "var(--color-muted)", marginLeft: 6 }}>{r.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Contacts */}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2" style={{ fontSize: 13 }}>
                <a href={`mailto:${consultReps[0].email}`} className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-purple-deep)]" style={{ color: "var(--color-ink)" }}>
                  <EnvelopeIcon />
                  <span>{consultReps[0].email}</span>
                </a>
                {consultReps[0].phone && (
                  <a href={`tel:${consultReps[0].phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-purple-deep)]" style={{ color: "var(--color-ink)" }}>
                    <PhoneIcon />
                    <span>{consultReps[0].phone}</span>
                  </a>
                )}
              </div>
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

          {/* RIGHT — form card (sticks on desktop until end of section) */}
          <div className="lg:col-span-7 sj-on-light lg:sticky lg:top-24">
            <ConsultForm rep={rep} />
          </div>
        </div>
      </div>
    </section>
  );
}
