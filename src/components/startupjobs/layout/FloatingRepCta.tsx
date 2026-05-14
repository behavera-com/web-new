import ArrowRightIcon from "../ui/ArrowRightIcon";
import { consultReps } from "../sections/rep-data";

export default function FloatingRepCta() {
  return (
    <a
      id="sj-desktop-cta"
      href="#consult"
      aria-label="Nezávazný hovor s naším týmem, 15 minut"
      className="sj-desktop-cta sj-floating-rep hidden xl:inline-flex"
    >
      {/* Overlapping avatars */}
      <span className="flex items-center shrink-0" aria-hidden="true" style={{ marginRight: 2 }}>
        {consultReps.map((rep, i) => (
          <span
            key={rep.name}
            className="sj-floating-rep-avatar"
            style={{ marginLeft: i > 0 ? -12 : 0, position: "relative", zIndex: consultReps.length - i }}
          >
            {rep.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={rep.photo}
                alt=""
                width={44}
                height={44}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <span>{rep.name[0]}</span>
            )}
          </span>
        ))}
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
          Promluvte si s námi
        </span>
      </span>
      <ArrowRightIcon size={16} />
    </a>
  );
}
