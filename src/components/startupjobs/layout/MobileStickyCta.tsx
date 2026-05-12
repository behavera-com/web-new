import ArrowRightIcon from "../ui/ArrowRightIcon";
import PhoneIcon from "../ui/PhoneIcon";
import EnvelopeIcon from "../ui/EnvelopeIcon";

export default function MobileStickyCta({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  const hasPhone = phone.trim().length > 0;
  const telHref = hasPhone ? `tel:${phone.replace(/\s/g, "")}` : undefined;
  return (
    <div
      id="sj-mobile-cta"
      className="sj-mobile-cta md:hidden fixed bottom-0 inset-x-0 z-40 bg-paper/95 backdrop-blur-md border-t border-rule p-3"
      style={{ background: "rgba(251,250,253,0.95)" }}
    >
      <div className="flex items-stretch gap-2">
        {hasPhone && (
          <a
            href={telHref}
            aria-label="Zavolat"
            className="flex-none w-12 h-12 inline-flex items-center justify-center border border-rule bg-paper text-ink hover:border-purple-accent hover:text-purple-accent transition-colors"
            style={{ background: "var(--color-paper)" }}
          >
            <PhoneIcon size={18} />
          </a>
        )}
        <a
          href={`mailto:${email}`}
          aria-label="Napsat"
          className="flex-none w-12 h-12 inline-flex items-center justify-center border border-rule bg-paper text-ink hover:border-purple-accent hover:text-purple-accent transition-colors"
          style={{ background: "var(--color-paper)" }}
        >
          <EnvelopeIcon size={18} />
        </a>
        <a href="#consult" className="sj-btn-primary flex-1 justify-center">
          Konzultace
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}
