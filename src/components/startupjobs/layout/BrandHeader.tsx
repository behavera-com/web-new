import BrandLockup from "../ui/BrandLockup";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import SectionNav from "./SectionNav";
import MobileMenu from "./MobileMenu";
import type { Rep } from "../sections/RepCard";

export default function BrandHeader({
  phone,
  email,
  rep,
}: {
  phone: string;
  email: string;
  rep: Rep;
}) {
  return (
    <header
      id="sj-site-header"
      className="sj-site-header fixed top-0 md:top-9 inset-x-0 z-50"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Behavera ve spolupráci s StartupJobs"
        >
          <span className="md:hidden">
            <BrandLockup size="sm" hidePartnerOnMobile priority />
          </span>
          <span className="hidden md:inline-flex">
            <BrandLockup size="sm" showLabel priority />
          </span>
        </a>

        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          <a
            href="#report"
            className="sj-btn-ghost hidden md:inline-flex"
            data-event-name="cta_click"
            data-event-cta-id="header_report"
            data-event-cta-label="Report zdarma"
            data-event-cta-location="header"
            data-event-cta-target="report_anchor"
          >
            Report zdarma
          </a>
          <a
            href="#consult"
            className="sj-btn-primary hidden lg:inline-flex"
            style={{ fontSize: 14, padding: "12px 20px" }}
            data-event-name="cta_click"
            data-event-cta-id="header_consult"
            data-event-cta-label="Domluvit konzultaci"
            data-event-cta-location="header"
            data-event-cta-target="consult"
          >
            Domluvit konzultaci
            <ArrowRightIcon />
          </a>
          <MobileMenu phone={phone} email={email} rep={rep} />
        </div>
      </div>
      <SectionNav />
    </header>
  );
}
