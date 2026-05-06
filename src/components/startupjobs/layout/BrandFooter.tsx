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
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  return (
    <footer style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)" }}>
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <BrandLockup size="md" />

        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]"
            style={{ color: "var(--color-ink)" }}
          >
            <a
              href={telHref}
              className="inline-flex items-center gap-2 hover:text-purple-accent transition-colors"
            >
              <PhoneIcon size={13} className="text-purple-accent" />
              <span className="font-medium tabular-nums">{phone}</span>
            </a>
            <span className="hidden md:inline" style={{ color: "var(--color-rule)" }} aria-hidden="true">
              ·
            </span>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 hover:text-purple-accent transition-colors"
            >
              <EnvelopeIcon size={13} className="text-purple-accent" />
              <span className="font-medium">{email}</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-2">
            {["GDPR-ready", "Made in Czechia", "ISO 27001"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full"
                style={{
                  borderColor: "var(--color-rule)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-muted)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--color-purple-accent)" }}
                />{" "}
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--color-rule)" }}>
        <div
          className="max-w-[1240px] mx-auto px-6 md:px-10 py-6"
          style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-muted)" }}
        >
          Tato kampaň vznikla ve spolupráci StartupJobs.cz a Behavera · © 2026
        </div>
      </div>
    </footer>
  );
}
