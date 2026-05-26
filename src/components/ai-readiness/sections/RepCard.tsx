import EnvelopeIcon from "../ui/EnvelopeIcon";
import PhoneIcon from "../ui/PhoneIcon";

export type Rep = {
  name: string;
  title: string;
  email: string;
  phone?: string;
  photo?: string;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

export default function RepCard({
  rep,
  variant = "default",
}: {
  rep: Rep;
  variant?: "default" | "compact";
}) {
  const isCompact = variant === "compact";
  const size = isCompact ? 48 : 64;

  return (
    <div
      className="flex items-center gap-4"
      style={{
        padding: isCompact ? "12px 0" : "16px 18px",
        border: isCompact ? "0" : "1px solid var(--color-rule)",
        background: isCompact ? "transparent" : "#ffffff",
        borderRadius: 2,
      }}
    >
      <div
        className="flex-none overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: "999px",
          background: "var(--color-purple-deep)",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-fraunces)",
          fontSize: isCompact ? 18 : 22,
          fontWeight: 500,
          letterSpacing: "0.02em",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.18) inset, 0 8px 22px -10px rgba(45,27,105,0.5)",
        }}
        aria-hidden={rep.photo ? "true" : undefined}
      >
        {rep.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={rep.photo}
            alt={rep.name}
            width={size}
            height={size}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span aria-hidden="true">{initials(rep.name)}</span>
        )}
      </div>

      <div className="min-w-0">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--color-purple-deep)",
            marginBottom: 4,
          }}
        >
          OZVE SE VÁM
        </div>
        <div
          className="truncate"
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "var(--color-ink)",
            lineHeight: 1.2,
          }}
        >
          {rep.name}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--color-muted)",
            marginTop: 2,
          }}
        >
          {rep.title}
        </div>

        {!isCompact && (
          <div
            className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ fontSize: 13 }}
            data-link-location="rep_card"
          >
            <a
              href={`mailto:${rep.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-purple-deep)]"
              style={{ color: "var(--color-ink)" }}
            >
              <EnvelopeIcon />
              <span>{rep.email}</span>
            </a>
            {rep.phone && (
              <a
                href={`tel:${rep.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-purple-deep)]"
                style={{ color: "var(--color-ink)" }}
              >
                <PhoneIcon />
                <span>{rep.phone}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
