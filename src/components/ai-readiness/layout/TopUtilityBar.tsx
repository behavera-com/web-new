import EnvelopeIcon from "../ui/EnvelopeIcon";
import PhoneIcon from "../ui/PhoneIcon";

export default function TopUtilityBar({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  const hasPhone = phone.trim().length > 0;
  const telHref = hasPhone ? `tel:${phone.replace(/\s/g, "")}` : undefined;

  return (
    <div className="sj-utility-bar hidden md:block fixed top-0 inset-x-0 z-[51]" data-link-location="utility_bar">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-9 flex items-center justify-end">
        <div className="flex items-center gap-5">
          {hasPhone && (
            <a
              href={telHref}
              className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-purple-deep)]"
              style={{
                fontSize: 12.5,
                color: "var(--color-ink)",
                fontWeight: 500,
              }}
            >
              <PhoneIcon size={13} />
              <span>{phone}</span>
            </a>
          )}
          <span
            aria-hidden="true"
            style={{
              width: 1,
              height: 12,
              background: "var(--color-rule)",
              display: "inline-block",
            }}
          />
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-purple-deep)]"
            style={{
              fontSize: 12.5,
              color: "var(--color-ink)",
              fontWeight: 500,
            }}
          >
            <EnvelopeIcon size={13} />
            <span>{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
