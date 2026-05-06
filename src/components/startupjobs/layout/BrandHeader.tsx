import BrandLockup from "../ui/BrandLockup";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import PhoneIcon from "../ui/PhoneIcon";
import EnvelopeIcon from "../ui/EnvelopeIcon";

export default function BrandHeader({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  return (
    <header
      id="sj-site-header"
      className="sj-site-header fixed top-0 inset-x-0 z-50"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-3 md:gap-4"
          aria-label="Behavera × StartupJobs"
        >
          <BrandLockup size="sm" />
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] text-ink/80">
          <a href="#how" className="hover:text-purple-deep transition-colors">
            Jak to funguje
          </a>
          <a href="#cases" className="hover:text-purple-deep transition-colors">
            Případové studie
          </a>
          <a href="#faq" className="hover:text-purple-deep transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={telHref}
            aria-label="Zavolat"
            className="hidden md:inline-flex w-9 h-9 items-center justify-center text-ink/70 hover:text-purple-accent hover:scale-105 transition-all"
          >
            <PhoneIcon />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label="Napsat email"
            className="hidden md:inline-flex w-9 h-9 items-center justify-center text-ink/70 hover:text-purple-accent hover:scale-105 transition-all"
          >
            <EnvelopeIcon />
          </a>
          <a href="#webinar" className="sj-btn-ghost hidden md:inline-flex">
            Webinář
          </a>
          <a
            href="#consult"
            className="sj-btn-primary"
            style={{ fontSize: 14, padding: "12px 20px" }}
          >
            Domluvit konzultaci
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
