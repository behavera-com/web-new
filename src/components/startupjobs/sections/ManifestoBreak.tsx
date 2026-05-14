export default function ManifestoBreak() {
  return (
    <section
      className="sj-reveal text-white relative overflow-hidden"
      style={{ background: "var(--color-purple-deep)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.35), transparent 60%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 py-32 md:py-44 text-center">
        <h2
          className="sj-h-manifesto max-w-[20ch] mx-auto"
          style={{ color: "#fff" }}
        >
          HR oddělení, které dodává{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-purple-soft)",
              fontVariationSettings: "'opsz' 144,'SOFT' 80",
            }}
          >
            čísla
          </em>
          ,<br />
          ne výmluvy.
        </h2>
        <p
          className="mt-10 max-w-[34ch] mx-auto"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontVariationSettings: "'opsz' 144,'SOFT' 80",
            fontWeight: 340,
            fontStyle: "italic",
            color: "var(--color-purple-soft)",
            letterSpacing: "-0.01em",
            fontSize: 24,
            lineHeight: 1.4,
          }}
        >
          Místo intuice máte filtr. Místo odchodů ve zkušebce máte tým, který
          drží. Místo obhajoby na boardu máte čísla.
        </p>
        <p
          className="mt-8 max-w-[42ch] mx-auto"
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          Příští čtvrtletí prezentujete vedení něco jiného než výmluvy: tvrdá
          data, která ukazují, koho jste pustili dál a proč u vás zůstává.
        </p>
        <a
          href="#consult"
          className="sj-manifesto-link group mt-14 inline-flex items-center gap-2"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontVariationSettings: "'opsz' 144,'SOFT' 80",
            fontWeight: 360,
            fontSize: 18,
            letterSpacing: "-0.01em",
          }}
        >
          <span className="sj-manifesto-link__text">Chci taková čísla</span>
          <span
            aria-hidden="true"
            className="sj-manifesto-link__arrow"
            style={{ display: "inline-block", transition: "transform 320ms cubic-bezier(.2,.7,.2,1)" }}
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
