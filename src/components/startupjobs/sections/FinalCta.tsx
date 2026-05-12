import ArrowRightIcon from "../ui/ArrowRightIcon";

export default function FinalCta() {
  return (
    <section
      id="consult"
      className="sj-grain sj-reveal"
      style={{
        background: "var(--color-alt)",
        borderTop: "1px solid var(--color-rule)",
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-28 md:py-40 text-center">
        <span className="sj-sec-num">08 / ZAČNĚTE</span>
        <h2 className="sj-h-manifesto mt-8 max-w-[18ch] mx-auto">
          Nabírejte tak, aby to <em>bylo vidět v reportingu.</em>
        </h2>
        <p
          className="mt-10 max-w-[58ch] mx-auto leading-[1.6]"
          style={{ fontSize: 19, color: "rgba(28,18,55,0.75)" }}
        >
          15minutová konzultace.{" "}
          <span className="sj-hl-dark">Žádný obchodní tlak</span> — projdeme
          váš náborový proces a řekneme, kde Behavera dává smysl.
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          <a href="#consult" className="sj-btn-primary-xl">
            Domluvit konzultaci
            <span
              className="opacity-60 -ml-1"
              style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}
            >
              15 min
            </span>
            <ArrowRightIcon size={16} />
          </a>
          <a href="#report" className="sj-btn-textlink">
            Stáhnout report zdarma
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
