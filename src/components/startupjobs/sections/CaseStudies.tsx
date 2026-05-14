"use client";

import DualCta from "../ui/DualCta";

type CaseStat = { value: string; label: string };

type Testimonial = {
  caseNo: string;
  slug: string;
  logo: string;
  logoAlt: string;
  url: string;
  quote: string;
  author: string;
  initials: string;
  photo?: string;
  role: string;
  context: { tag: string; val: string }[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    caseNo: "05",
    slug: "365bank",
    logo: "/startupjobs/logos/365bank.svg",
    logoAlt: "365.bank",
    url: "https://www.behavera.com/case-studies/how-behaveras-data-helped-365-bank-achieve-a-successful-digital-transformation",
    quote:
      "Díky Behaveře jsme dokázali objektivně posoudit, kdo je schopen vést změnu — a kdo potřebuje podporu.",
    author: "Nina Juríková",
    initials: "NJ",
    photo: "/startupjobs/team/nina.png",

    role: "HR Konzultantka · 365.bank",
    context: [
      { tag: "SAMPLE", val: "400+ zaměstnanců" },
      { tag: "SECTOR", val: "Bankovnictví" },
      { tag: "VÝSLEDEK", val: "−14 % fluktuace" },
      { tag: "VÝSLEDEK", val: "+36 % rychlejší nábor" },
    ],
  },
  {
    caseNo: "01",
    slug: "vodafone",
    logo: "/startupjobs/logos/vodafone.svg",
    logoAlt: "Vodafone",
    url: "https://www.behavera.com/case-studies/from-data-to-action-how-vodafone-increased-sales-by-80-and-cut-attrition-by-40",
    quote:
      "Behavera nám pomohla předpovědět, kdo bude ve které roli úspěšný — a proč.",
    author: "Ředitel Call Centra",
    initials: "VF",
    role: "Vodafone Czech Republic",
    context: [
      { tag: "SAMPLE", val: "1 500+ zaměstnanců" },
      { tag: "SECTOR", val: "Telekomunikace" },
      { tag: "VÝSLEDEK", val: "−40 % fluktuace" },
      { tag: "VÝSLEDEK", val: "+70–80 % tržby/hovor" },
    ],
  },
  {
    caseNo: "02",
    slug: "expando",
    logo: "/startupjobs/logos/expando.svg",
    logoAlt: "Expando",
    url: "https://www.behavera.com/case-studies/jak-expando-objevilo-skryty-talent",
    quote:
      "Echo Pulse nám dal objektivní pohled na problémy, které jsme tušili, ale neuměli pojmenovat.",
    author: "Dominik Hegedüs",
    initials: "DH",
    photo: "/startupjobs/team/Dominik.png",
    role: "CEO · Expando",
    context: [
      { tag: "SAMPLE", val: "50+ zaměstnanců" },
      { tag: "SECTOR", val: "E-commerce" },
      { tag: "VÝSLEDEK", val: "+37 % prodejů klienta" },
      { tag: "VÝSLEDEK", val: "€11 000 ušetřeno ročně" },
    ],
  },
  {
    caseNo: "03",
    slug: "valxon",
    logo: "/startupjobs/logos/valxon.svg",
    logoAlt: "Valxon",
    url: "https://www.behavera.com/case-studies/nove-vedeni-a-stiznosti-na-penize",
    quote:
      "Behavera nám ukázala, že lidé neztratili zájem — jen potřebovali lepší podmínky.",
    author: "Karel Poplstein",
    initials: "KP",
    photo: "/startupjobs/team/Karel.png",
    role: "CEO · Valxon",
    context: [
      { tag: "SAMPLE", val: "30+ zaměstnanců" },
      { tag: "SECTOR", val: "Reklamní předměty" },
      { tag: "VÝSLEDEK", val: "+25 % spokojenost" },
      { tag: "VÝSLEDEK", val: "200+ hodin ušetřeno" },
    ],
  },
  {
    caseNo: "06",
    slug: "medevio",
    logo: "/startupjobs/logos/medevio.svg",
    logoAlt: "Medevio",
    url: "https://www.behavera.com/case-studies",
    quote:
      "Behavera mi pomáhá připravit se na pohovory. Vidím, na co se zaměřit, jaké jsou silné a slabé stránky kandidáta — a jestli dobře sedí pro práci ve startupu.",
    author: "Anna Skubková",
    initials: "AS",
    photo: "/startupjobs/team/Anna_Skubkova.jpg",
    role: "Commercial Director · Medevio",
    context: [],
  },
  {
    caseNo: "07",
    slug: "hajduk",
    logo: "/startupjobs/logos/hajduk.png",
    logoAlt: "Hajduk & Partners",
    url: "https://www.behavera.com/case-studies",
    quote:
      "Dříve jsme nabírali lidi čistě na základě právních kvalifikací. Jakmile jsme začali používat Behaveru pro posouzení fit s kulturou a týmem, firma začala fungovat výrazně hladčeji.",
    author: "Adam Swierczek",
    initials: "AS",
    photo: "/startupjobs/team/Adam 2.jpg",
    role: "Partner a advokát · Hajduk & Partners",
    context: [],
  },
  {
    caseNo: "08",
    slug: "o2-sk",
    logo: "/startupjobs/logos/o2.svg",
    logoAlt: "O2 Slovakia",
    url: "https://www.behavera.com/case-studies",
    quote:
      "Online assessmenty Behavery byly zábavné a bez stresu — na rozdíl od assessment center. Náš tým ocenil jejich inovativní formát.",
    author: "Radoslav Volný",
    initials: "RV",
    photo: "/startupjobs/team/radoslav.webp",
    role: "Head of Online Transformation · O2 Slovakia",
    context: [],
  },
];
type CaseCard = {
  slug: string;
  brand: string;
  industry: string;
  size: string;
  tags: string[];
  photo: string;
  /** Two headline metrics displayed on the card (mirrors behavera.com/case-studies). */
  stats: [CaseStat, CaseStat];
  span?: "default" | "wide";
};

const CASES: CaseCard[] = [
  {
    slug: "prusa",
    brand: "Prusa Research",
    industry: "Technologie / 3D tisk",
    size: "1 000+",
    tags: ["Employer Branding", "Culture", "EVP"],
    photo: "/startupjobs/cases/prusa.webp",
    stats: [
      { value: "3 min", label: "čas na vyplnění" },
      { value: "1000+", label: "zaměstnanců i ve výrobě" },
    ],
  },
  {
    slug: "expando",
    brand: "Expando",
    industry: "E-Commerce",
    size: "50+",
    tags: ["Engagement", "Promotion", "Communication"],
    photo: "/startupjobs/cases/expando.webp",
    stats: [
      { value: "37%", label: "nárůst prodejů klienta" },
      { value: "€11 000", label: "ušetřeno ročně" },
    ],
  },
  {
    slug: "valxon",
    brand: "Valxon",
    industry: "Reklamní předměty",
    size: "30+",
    tags: ["Engagement", "Compensation", "Retention"],
    photo: "/startupjobs/cases/valxon.webp",
    stats: [
      { value: "25%", label: "nárůst spokojenosti zaměstnanců" },
      { value: "200+", label: "hodin ušetřeno díky automatizaci" },
    ],
  },
  {
    slug: "vodafone",
    brand: "Vodafone Czech Republic",
    industry: "Telekomunikace",
    size: "1 500+",
    tags: ["Retention", "Productivity", "Development"],
    photo: "/startupjobs/cases/vodafone.webp",
    stats: [
      { value: "5%", label: "zlepšení vyřešení na první hovor" },
      { value: "70–80%", label: "nárůst tržeb na hovor" },
    ],
    span: "wide",
  },
  {
    slug: "365bank",
    brand: "365.bank",
    industry: "Bankovnictví",
    size: "400+",
    tags: ["Culture", "Turnover", "Leadership"],
    photo: "/startupjobs/cases/365bank.webp",
    stats: [
      { value: "14%", label: "snížení fluktuace zaměstnanců" },
      { value: "36%", label: "rychlejší náborový proces" },
    ],
    span: "wide",
  },
];

const LOGOS: Record<string, string> = {
  prusa: "/startupjobs/logos/prusa.svg",
  expando: "/startupjobs/logos/expando.svg",
  valxon: "/startupjobs/logos/valxon.svg",
  vodafone: "/startupjobs/logos/vodafone.svg",
  "365bank": "/startupjobs/logos/365bank.svg",
};

/** Per-card gradient fallback when the photo file is missing — keeps the layout intact. */
const FALLBACK_GRADIENTS: Record<string, string> = {
  prusa: "linear-gradient(135deg,#2a1a4e 0%,#4c3a86 55%,#7c66c0 100%)",
  expando: "linear-gradient(135deg,#1c2541 0%,#3a506b 55%,#5bc0be 100%)",
  valxon: "linear-gradient(135deg,#2d1b1b 0%,#4a2c2c 55%,#a26a3a 100%)",
  vodafone: "linear-gradient(135deg,#2d1b69 0%,#5b3aa6 55%,#c4b0ff 100%)",
  "365bank": "linear-gradient(135deg,#0e1429 0%,#1f2a48 55%,#2a4a4a 100%)",
};

function BuildingIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  );
}

function CaseCardItem({ c }: { c: CaseCard }) {
  const fallback = FALLBACK_GRADIENTS[c.slug] ?? FALLBACK_GRADIENTS.vodafone;
  return (
    <article
      className="sj-case-photo group relative overflow-hidden"
      style={{
        aspectRatio: c.span === "wide" ? "16 / 11" : "4 / 5",
        background: fallback,
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 18,
      }}
    >
      {/* Photo (native img — gracefully degrades to the gradient backdrop if the file is missing) */}
      <img
        src={c.photo}
        alt={`${c.brand} — pracovní prostředí`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Layered overlays — dark base + bottom darkening for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,12,42,0.10) 0%, rgba(20,12,42,0.20) 45%, rgba(20,12,42,0.78) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply opacity-40 transition-opacity duration-500 group-hover:opacity-25"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 0%, rgba(45,27,105,0) 40%, rgba(20,12,42,0.55) 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Top row */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3 z-10">
        <div
          className="flex items-center justify-center bg-white"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            boxShadow: "0 6px 18px -8px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src={LOGOS[c.slug]}
            alt={c.brand}
            style={{ maxWidth: 30, maxHeight: 24, objectFit: "contain" }}
            loading="lazy"
          />
        </div>

        <div
          className="inline-flex items-center gap-1.5 text-white"
          style={{
            background: "rgba(20,12,42,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "6px 10px",
            borderRadius: 999,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
          }}
        >
          <BuildingIcon />
          <span>{c.size}</span>
        </div>
      </div>

      {/* Headline metrics overlay — mirrors behavera.com case study cards */}
      <div
        className={`absolute z-10 text-white flex ${c.span === "wide" ? "flex-row" : "flex-col"} gap-2`}
        style={{
          top: 76,
          left: 16,
          right: 16,
        }}
      >
        {c.stats.map((s, i) => (
          <div
            key={i}
            style={{
              flex: c.span === "wide" ? "1 1 0" : undefined,
              minWidth: 0,
              background: "rgba(20,12,42,0.45)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              padding: "8px 12px 10px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: c.span === "wide" ? 30 : 26,
                lineHeight: 1,
                fontVariationSettings: "'opsz' 144,'SOFT' 80",
                fontStyle: "italic",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9.5,
                letterSpacing: "0.08em",
                opacity: 0.85,
                marginTop: 3,
                textTransform: "uppercase",
                lineHeight: 1.25,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom block */}
      <div className="absolute left-5 right-5 bottom-5 z-10 text-white">
        <h3
          className="sj-display"
          style={{
            fontSize: c.span === "wide" ? 28 : 22,
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: 4,
            letterSpacing: "-0.01em",
          }}
        >
          {c.brand}
        </h3>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.72)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {c.industry}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span
              key={t}
              className="transition-colors"
              style={{
                background: "rgba(20,12,42,0.45)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: 999,
                fontSize: 12,
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

    </article>
  );
}

/* ---- pastel sticky-note testimonial mosaic ---- */

const STICKY_PALETTE = [
  {
    bg: "#FCE9D6", // peach
    accent: "rgba(178, 90, 18, 0.18)",
    tagInk: "#7a3d05",
    rotate: -1.2,
  },
  {
    bg: "#ECE5FB", // lavender
    accent: "rgba(75, 53, 144, 0.18)",
    tagInk: "#3a2786",
    rotate: 0.8,
  },
  {
    bg: "#DDF1E6", // mint
    accent: "rgba(29, 158, 117, 0.20)",
    tagInk: "#065042",
    rotate: -0.6,
  },
  {
    bg: "#DCE9F7", // sky
    accent: "rgba(45, 105, 178, 0.20)",
    tagInk: "#1f3a6e",
    rotate: 1.0,
  },
] as const;

function TestimonialNote({
  t,
  palette,
}: {
  t: Testimonial;
  palette: (typeof STICKY_PALETTE)[number];
}) {
  return (
    <article
      className="sj-sticky-note group relative flex flex-col"
      style={{
        background: palette.bg,
        borderRadius: 6,
        padding: "36px 36px 28px",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 22px 36px -24px rgba(45,27,105,0.30), 0 4px 10px -6px rgba(45,27,105,0.18)",
        ["--sj-tilt" as string]: `${palette.rotate}deg`,
        transform: "rotate(var(--sj-tilt))",
        transition: "transform 320ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 320ms ease",
      }}
    >
      {/* Tape strip */}
      <span
        aria-hidden
        className="absolute"
        style={{
          top: -10,
          left: "50%",
          transform: "translateX(-50%) rotate(-2deg)",
          width: 86,
          height: 18,
          background: "rgba(255,255,255,0.55)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 4px 8px -4px rgba(45,27,105,0.18)",
          borderRadius: 2,
        }}
      />

      <div className="flex items-start justify-between gap-4 mb-4">
        <img
          src={t.logo}
          alt={t.logoAlt}
          className="block"
          style={{
            height: 26,
            width: "auto",
            opacity: 0.85,
            filter: "grayscale(35%)",
          }}
          loading="lazy"
          decoding="async"
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: palette.tagInk,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Case {t.caseNo}
        </span>
      </div>

      <blockquote
        className="sj-display flex-1"
        style={{
          fontSize: "clamp(20px, 2vw, 26px)",
          lineHeight: 1.32,
          color: "var(--color-ink)",
          fontStyle: "italic",
          fontVariationSettings: '"opsz" 144, "SOFT" 80',
          fontWeight: 380,
        }}
      >
        „{t.quote}"
      </blockquote>

      <div
        className="mt-6 pt-5 flex items-center gap-3"
        style={{ borderTop: `1px solid ${palette.accent}` }}
      >
        <div
          className="rounded-full overflow-hidden shrink-0"
          style={{
            width: 60,
            height: 60,
            background: "var(--color-purple-deep)",
            boxShadow: "0 4px 12px -6px rgba(45,27,105,0.4)",
          }}
          aria-hidden
        >
          {t.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.photo}
              alt=""
              width={60}
              height={60}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <span
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "var(--font-inter-tight)",
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {t.initials}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-ink)",
              lineHeight: 1.2,
            }}
          >
            {t.author}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(28,18,55,0.65)",
              marginTop: 2,
              lineHeight: 1.3,
            }}
          >
            {t.role}
          </div>
        </div>
      </div>
    </article>
  );
}

function TestimonialMosaic() {
  return (
    <div className="relative">
      <div className="mb-10 md:mb-12">
        <span className="sj-eyebrow">Fig.06 — Citace z reálných reportů</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialNote
            key={t.slug}
            t={t}
            palette={STICKY_PALETTE[i % STICKY_PALETTE.length]}
          />
        ))}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const row1 = CASES.filter((c) => c.span !== "wide");
  const row2 = CASES.filter((c) => c.span === "wide");

  return (
    <section
      id="cases"
      className="sj-grain sj-reveal"
      style={{ background: "var(--color-alt)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Editorial header */}
        <div className="mb-14 md:mb-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <span className="sj-section-anchor mb-5 inline-flex">
              06 · Case Study
            </span>
            <h2
              className="sj-h-section max-w-[26ch]"
              style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
            >
              Firmy, které nabírají rychleji a{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 80",
                }}
              >
                chytřeji
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 self-end">
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(28,18,55,0.7)",
              }}
            >
              Pět týmů, jedno společné: rozhodují daty místo dojmem — a vedení
              vidí dopad v boardroom reportingu. Konkrétní čísla od skutečných
              firem.
            </p>
          </div>
        </div>

        {/* Photo grid: 3 portrait on row 1, 2 landscape (featured) on row 2.
            Skip md:grid-cols-3 — at 768px portrait cards squeeze to ~216px and
            the absolute stat overlay (top:76) collides with the bottom title block. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-5 lg:mb-6">
          {row1.map((c) => (
            <CaseCardItem key={c.slug} c={c} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 mb-16 md:mb-20">
          {row2.map((c) => (
            <CaseCardItem key={c.slug} c={c} />
          ))}
        </div>

        {/* Testimonial slider — real named quotes from behavera.com case studies */}
        <TestimonialMosaic />

        <DualCta align="center" className="mt-16 md:mt-20" />
      </div>
    </section>
  );
}
