import ArrowRightIcon from "../ui/ArrowRightIcon";
import type { Rep } from "../sections/RepCard";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

export default function FloatingRepCta({ rep }: { rep: Rep }) {
  const firstName = rep.name.split(" ")[0];

  return (
    <a
      id="sj-desktop-cta"
      href="#consult"
      aria-label={`Nezávazný hovor s ${firstName}, 15 minut`}
      className="sj-desktop-cta sj-floating-rep hidden xl:inline-flex"
    >
      <span className="sj-floating-rep-avatar" aria-hidden="true">
        {rep.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={rep.photo}
            alt=""
            width={44}
            height={44}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <span>{initials(rep.name)}</span>
        )}
      </span>
      <span className="flex flex-col leading-tight">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
          }}
        >
          Nezávazný hovor · 15 min
        </span>
        <span
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "#fff",
            marginTop: 2,
          }}
        >
          Promluvte si s {firstName}
        </span>
      </span>
      <ArrowRightIcon size={16} />
    </a>
  );
}
