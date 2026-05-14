import MarqueeTrack from "./MarqueeTrack";

const logos = [
  { src: "/startupjobs/logos/vodafone.svg", alt: "Vodafone CZ" },
  { src: "/startupjobs/logos/o2.svg", alt: "O2" },
  { src: "/startupjobs/logos/pwc.svg", alt: "PwC" },
  { src: "/startupjobs/logos/oktagon.svg", alt: "OKTAGON MMA" },
  { src: "/startupjobs/logos/kdpcr.png", alt: "Komora daňových poradců ČR" },
  { src: "/startupjobs/logos/365bank.svg", alt: "365.bank" },
  { src: "/startupjobs/logos/prusa.svg", alt: "Průša Research" },
  { src: "/startupjobs/logos/expando.svg", alt: "Expando" },
  { src: "/startupjobs/logos/valxon.svg", alt: "Valxon" },
];

export default function TrustStrip() {
  return (
    <section
      className="sj-reveal"
      style={{
        borderTop: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
        background: "var(--color-paper)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-12">
        <div className="flex items-center gap-3 mb-7 md:justify-center">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--sj-signal-green)" }}
          />
          <span className="sj-eyebrow">
            Důvěřují nám HR týmy ve firmách 50–5 000 zaměstnanců
          </span>
        </div>

        <MarqueeTrack logos={logos} />
        <p
          className="sj-trust-mark"
          style={{
            fontSize: 15,
            textAlign: "center",
            opacity: 0.5,
            marginTop: 18,
          }}
        >
          + desítky dalších klientů
        </p>
      </div>
    </section>
  );
}
