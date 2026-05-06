const logos = [
  "Vodafone CZ",
  "365.bank",
  "Průša Research",
  "Expando",
  "Valxon",
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
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-7 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
        <span className="sj-eyebrow flex-none">Důvěřují nám</span>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-8 items-center">
          {logos.map((logo) => (
            <span key={logo} className="sj-trust-mark">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
