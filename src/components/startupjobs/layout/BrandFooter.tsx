import BrandLockup from "../ui/BrandLockup";
import PhoneIcon from "../ui/PhoneIcon";
import EnvelopeIcon from "../ui/EnvelopeIcon";

export default function BrandFooter({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  const hasPhone = phone.trim().length > 0;
  const telHref = hasPhone ? `tel:${phone.replace(/\s/g, "")}` : undefined;

  const headingStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--color-muted)",
  };

  return (
    <footer style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)" }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        {/* Identity column */}
        <div className="md:col-span-6 flex flex-col gap-5">
          <BrandLockup size="md" showLabel />
          <p
            className="max-w-[420px] text-[14px] leading-[1.55]"
            style={{ color: "var(--color-muted)" }}
          >
            Behavera odhalí, co opravdu předpovídá úspěch ve vašem týmu — a
            postaví z toho filtr pro nábor.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {["GDPR compliant", "ISO 27001"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full"
                style={{
                  borderColor: "var(--color-rule)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--color-muted)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-purple-accent)" }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Contact column */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h3 style={headingStyle}>Kontakt</h3>
          <ul className="flex flex-col gap-2 text-[14px]" style={{ color: "var(--color-ink)" }}>
            {hasPhone && (
              <li>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2.5 hover:text-purple-accent transition-colors"
                >
                  <PhoneIcon size={14} className="text-purple-accent" />
                  <span className="tabular-nums">{phone}</span>
                </a>
              </li>
            )}
            <li>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2.5 hover:text-purple-accent transition-colors"
              >
                <EnvelopeIcon size={14} className="text-purple-accent" />
                <span>{email}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Social column */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h3 style={headingStyle}>Sledujte</h3>
          <ul className="flex flex-col gap-2 text-[14px]" style={{ color: "var(--color-ink)" }}>
            <li>
              <a
                href="https://www.linkedin.com/company/behavera"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-purple-accent transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-purple-accent">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/behavera"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-purple-accent transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-purple-accent">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.55a5.87 5.87 0 0 0-2.13 1.39A5.87 5.87 0 0 0 .62 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.55 2.91.3.79.7 1.46 1.39 2.13a5.87 5.87 0 0 0 2.13 1.39c.76.29 1.63.49 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.55a5.87 5.87 0 0 0 2.13-1.39 5.87 5.87 0 0 0 1.39-2.13c.29-.76.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.55-2.91a5.87 5.87 0 0 0-1.39-2.13A5.87 5.87 0 0 0 19.86.62c-.76-.29-1.63-.49-2.91-.55C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/BehaveraTDC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-purple-accent transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-purple-accent">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.02 10.13 11.93v-8.44H7.08v-3.5h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.5h-2.79V24C19.61 23.09 24 18.1 24 12.07z" />
                </svg>
                <span>Facebook</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal strip */}
      <div style={{ borderTop: "1px solid var(--color-rule)" }}>
        <div
          className="max-w-[1240px] mx-auto px-6 md:px-10 py-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 Behavera s.r.o.</span>
            <span aria-hidden="true" style={{ color: "var(--color-rule)" }}>·</span>
            <span>IČO: 03525520</span>
            <span aria-hidden="true" style={{ color: "var(--color-rule)" }}>·</span>
            <span>DIČ: CZ03525520</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href="https://www.behavera.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-accent transition-colors"
            >
              Obchodní podmínky
            </a>
            <a
              href="https://www.behavera.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-accent transition-colors"
            >
              Ochrana osobních údajů
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
