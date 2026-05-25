import ArrowRightIcon from "../ui/ArrowRightIcon";

export default function DesktopStickyCta() {
  return (
    <a
      id="sj-desktop-cta"
      href="#consult"
      className="sj-desktop-cta sj-btn-primary-xl hidden md:inline-flex"
    >
      Domluvit konzultaci
      <span
        className="opacity-60 -ml-1"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
      >
        15 min
      </span>
      <ArrowRightIcon size={15} />
    </a>
  );
}
