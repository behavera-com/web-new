"use client";

import Image from "next/image";
import SoftScrollCta from "../ui/SoftScrollCta";

type Logo = { src: string; name: string };

type Pain = {
  tag: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  signal: string;
  remedy: string;
  logos?: Logo[];
};

const SHADOW_AI_LOGOS: Logo[] = [
  { src: "/startupjobs/ai-logos/chatgpt.svg", name: "ChatGPT" },
  { src: "/startupjobs/ai-logos/anthropic.svg", name: "Claude" },
  { src: "/startupjobs/ai-logos/googlegemini.svg", name: "Gemini" },
  { src: "/startupjobs/ai-logos/githubcopilot.svg", name: "GitHub Copilot" },
  { src: "/startupjobs/ai-logos/perplexity.svg", name: "Perplexity" },
];

const PAINS: Pain[] = [
  {
    tag: "Shadow AI",
    icon: <GhostIcon />,
    title: "Lidé používají AI, o které vedení neví.",
    body: "Týmy testují ChatGPT, Claude, Gemini, Copilot, Perplexity — bez schválení, bez policy, bez auditní stopy. Citlivá data odcházejí ven, prompty s firemním know-how končí v cizích modelech.",
    signal: "Neviditelný governance risk",
    remedy:
      "Behavera anonymně zmapuje, které týmy AI používají a na co — bez sledování konkrétních lidí. Dostanete podklad pro policy, který lidi nepřežene do ještě hlubšího podzemí.",
    logos: SHADOW_AI_LOGOS,
  },
  {
    tag: "Žádná visibility",
    icon: <EyeOffIcon />,
    title: "Nevíte, kdo AI reálně používá a kdo jen předstírá.",
    body: "Licence jste koupili, školení proběhlo, policy je v Confluence — ale management nemá ponětí, jak vypadá adopce na úrovni týmů. Pulse dotazníky ukazují sentiment, ne chování.",
    signal: "Reporting bez dat o reálném používání",
    remedy:
      "Behavera dodá týmovou heat-mapu adopce + confidence — uvidíte, kde reálně investice dopadla a kde stojí. Místo dohadů máte data pro steering.",
  },
  {
    tag: "Stagnující ROI",
    icon: <FlatlineIcon />,
    title: "Investice běží, dopad na produktivitu se nedostavuje.",
    body: "Nákup tooling šel skrz IT, change management proběhl, ale po šesti měsících KPI vypadá stejně. Šéf chce vědět proč — a nikdo nedokáže ukázat, kde se hodnota tvoří a kde se pálí čas.",
    signal: "ROI bez možnosti vysvětlení",
    remedy:
      "Behavera ukáže, kde AI mění workload a kde ne — společně s důvodem (confidence, skill gap, nejasné zadání). Vedení dostane vysvětlení, ne další tabulku.",
  },
];

export default function PainSection() {
  return (
    <section
      id="proc"
      className="sj-grain sj-grain-dark sj-reveal text-white relative overflow-hidden scroll-mt-[140px] lg:scroll-mt-[160px]"
      style={{ background: "#1C1237" }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 78% 100%, rgba(139, 92, 246, 0.22), transparent 60%), radial-gradient(ellipse at 12% 0%, rgba(45, 27, 105, 0.4), transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <span
              className="sj-section-anchor"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <span style={{ color: "var(--color-purple-soft)" }}>01</span>
              <span>Proč to firmy potřebují</span>
            </span>
            <h2
              className="sj-h-section mt-5"
              style={{
                color: "#fff",
                fontSize: "clamp(34px, 4.5vw, 56px)",
              }}
            >
              Tři místa,
              <br />
              kam vedení{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-soft)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                běžně nedohlédne
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 17, color: "rgba(255,255,255,0.72)" }}
            >
              Většina firem postupuje stejně: nakoupí nástroje, udělá školení,
              pošle policy — a čeká, že se dopad dostaví sám. Realita je{" "}
              <span style={{ color: "#fff" }}>tichá fragmentace</span>, kterou
              nevidíte v reportingu.
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {PAINS.map((pain) => (
            <PainCard key={pain.tag} pain={pain} />
          ))}
        </div>

        <SoftScrollCta target="#produkt" label="Co s tím Behavera dělá" tone="dark" />
      </div>
    </section>
  );
}

function PainCard({ pain }: { pain: Pain }) {
  return (
    <article
      className="p-9 md:p-10 flex flex-col gap-6"
      style={{ background: "#1C1237" }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        {pain.tag}
      </span>

      <div
        className="inline-flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: "rgba(139,92,246,0.12)",
          border: "1px solid rgba(139,92,246,0.25)",
          color: "var(--color-purple-soft)",
        }}
        aria-hidden
      >
        {pain.icon}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-fraunces)",
          fontVariationSettings: '"opsz" 144, "SOFT" 30',
          fontWeight: 380,
          fontSize: "clamp(22px, 2.2vw, 28px)",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "#fff",
          textWrap: "balance",
        }}
      >
        {pain.title}
      </h3>

      <p
        style={{
          color: "rgba(255,255,255,0.66)",
          fontSize: 15,
          lineHeight: 1.6,
        }}
      >
        {pain.body}
      </p>

      {pain.logos && pain.logos.length > 0 && (
        <ul
          className="flex flex-wrap items-center gap-2"
          aria-label="AI nástroje, které lidé typicky používají"
        >
          {pain.logos.map((l) => (
            <li
              key={l.name}
              title={l.name}
              className="inline-flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#fff",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <Image
                src={l.src}
                alt={l.name}
                width={20}
                height={20}
                style={{ width: 20, height: 20, objectFit: "contain" }}
              />
            </li>
          ))}
        </ul>
      )}

      <div
        className="mt-auto pt-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="flex items-center gap-2 mb-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--sj-signal-green-soft)",
            fontWeight: 500,
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--sj-signal-green)" }}
            aria-hidden
          />
          Co s tím
        </div>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          {pain.remedy}
        </p>
        <div
          className="mt-4 pt-3 flex items-center gap-2"
          style={{
            borderTop: "1px dashed rgba(255,255,255,0.06)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {pain.signal}
        </div>
      </div>
    </article>
  );
}

function GhostIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 11a7 7 0 0 1 14 0v10l-2.5-2-2 2-2-2-2 2-2-2L5 21z" />
      <circle cx="9.5" cy="11" r="0.9" fill="currentColor" />
      <circle cx="14.5" cy="11" r="0.9" fill="currentColor" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12s3.5-6 9-6 9 6 9 6-1 1.7-2.7 3.3" />
      <path d="M9.5 9.5a3.5 3.5 0 0 0 5 5" />
      <path d="M3 3l18 18" />
      <path d="M14.5 14.5a3.5 3.5 0 0 1-5-5" />
    </svg>
  );
}

function FlatlineIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12h4l2-4 3 8 2-4h7" />
      <path d="M3 19h18" />
    </svg>
  );
}
