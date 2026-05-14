"use client";

import { useRef } from "react";
import EmailInbox, { type EmailCard } from "./EmailInbox";
import { CountUpNumber, useCountUp } from "../ui/useCountUp";

type Impact = {
  tag: string;
  bigSign: "−" | "+" | "";
  bigNum: number;
  bigSuffix: "dní" | "%";
  numColor: string;
  title: string;
  body: string;
  baseline: { label: string; before: string; after: string; tone: "good" };
  proof?: { href: string; label: string };
};

const impacts: Impact[] = [
  {
    tag: "TIME-TO-HIRE",
    bigSign: "−",
    bigNum: 15,
    bigSuffix: "dní",
    numColor: "#fff",
    title: "Z přijetí životopisu k offeru o 15 dní rychleji.",
    body: "Strukturovaný screening odřízne slepá kola hned na začátku. Vedení rozhoduje na základě dat, ne pocitu.",
    baseline: { label: "Industry baseline → Behavera", before: "37 dní", after: "22 dní", tone: "good" },
  },
  {
    tag: "NEW HIRE RETENTION",
    bigSign: "+",
    bigNum: 36,
    bigSuffix: "%",
    numColor: "#fff",
    title: "Vyšší retence nových lidí v prvním roce.",
    body: "Když je predikce role i kultury jasná ještě před offerem, noví lidé z firmy po půl roce neodcházejí.",
    baseline: { label: "12mo retention", before: "58 %", after: "79 %", tone: "good" },
  },
  {
    tag: "CANDIDATE EXPERIENCE",
    bigSign: "",
    bigNum: 97,
    bigSuffix: "%",
    numColor: "#fff",
    title: "Kandidátů hodnotí náš proces jako pozitivní.",
    body: "Behavioral games a chat s asistentem lidé dokončí — a baví je to. Vaše značka odchází silnější.",
    baseline: { label: "NPS na konci procesu", before: "+22", after: "+71", tone: "good" },
    proof: { href: "#kandidati-pisi", label: "Důkaz místo slibu" },
  },
];

const emails: EmailCard[] = [
  {
    initial: "E",
    name: "Evi S.",
    meta: "komu: Bára (Behavera)",
    date: "04 / 2026",
    subject: "Re: Behavera — první kolo",
    body: "Ahoj Báro, tak to bylo zábavné! Rozhodně nejkreativnější první kolo, co jsem zatím zažila. Těším se, co tam máte dál! 😊",
    sign: "— Evi",
    badge: "KANDIDÁTKA · CZ",
  },
  {
    initial: "D",
    name: "Diana V.",
    meta: "komu: Barbara (Behavera)",
    date: "03 / 2026",
    subject: "Re: Prescreening — hotovo",
    body: "Ahoj, Barbara. Hru a otázky s chat botom mám za sebou. Musím povedať, že táto forma prescreeningu bola skvelá a nápaditá! Bolo príjemné si vyskúšať simuláciu a mať z nej ešte výstup k mojej osobnosti.",
    sign: "— Diana",
    badge: "KANDIDÁTKA · SK",
  },
  {
    initial: "L",
    name: "Laura",
    meta: "komu: Behavera",
    date: "03 / 2026",
    subject: "Quick note after the assessment",
    body: "Právě jsem dokončila hru od Behavery a chtěla bych vám napsat, že mě to fakt bavilo. S ničím takovým jsem se zatím nesetkala a moc si toho vážím.",
    sign: "— Laura",
    badge: "KANDIDÁTKA · EN",
  },
  {
    initial: "D",
    name: "Daria",
    meta: "komu: Behavera",
    date: "02 / 2026",
    subject: "Thanks — really enjoyed the game",
    body: "S ničím takovým jsem se v náborovém procesu zatím nesetkala — bylo to milé překvapení! Skvělý způsob, jak vidět, v čem jsem dobrá a kde mám ještě prostor se posunout.",
    sign: "— Daria",
    badge: "KANDIDÁTKA · EN",
  },
  {
    initial: "B",
    name: "Bruno",
    meta: "komu: Behavera",
    date: "01 / 2026",
    subject: "Feedback after the simulation",
    body: "Pracovní den, kterým jsem si ve hře prošel, byl zábavný — a navíc jsem se o sobě dozvěděl něco nového. Díky za příležitost!",
    sign: "— Bruno",
    badge: "KANDIDÁT · EN",
  },
];

export default function PainSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);
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
              <span>Tři čísla pro vedení</span>
            </span>
            <h2
              className="sj-h-section mt-5"
              style={{
                color: "#fff",
                fontSize: "clamp(34px, 4.5vw, 56px)",
              }}
            >
              Tři čísla,
              <br />
              která{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-soft)",
                  fontVariationSettings: '"opsz" 144,"SOFT" 80',
                }}
              >
                ukáže vedení
              </em>
              .
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p
              className="leading-[1.55]"
              style={{ fontSize: 17, color: "rgba(255,255,255,0.72)" }}
            >
              Rychlejší time-to-hire, vyšší retence, lepší zkušenost kandidáta —
              metriky, které dělají z HR{" "}
              <span style={{ color: "#fff" }}>respektovaného partnera vedení</span>.
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {impacts.map((c, idx) => (
            <ImpactCard
              key={c.tag}
              impact={c}
              triggerRef={gridRef}
              delayMs={idx * 220}
            />
          ))}
        </div>

        {/* Candidate voices */}
        <div id="kandidati-pisi" className="mt-24 md:mt-32 scroll-mt-24 md:scroll-mt-32">
          <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-14">
            <div className="lg:col-span-5">
              <span
                className="sj-section-anchor"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <span style={{ color: "var(--color-purple-soft)" }}>01·b</span>
                <span>Kandidáti mluví sami</span>
              </span>
              <h3
                className="sj-display mt-4"
                style={{ color: "#fff", fontSize: "clamp(28px, 3.6vw, 42px)" }}
              >
                E-maily od kandidátů.{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: "var(--color-purple-soft)",
                    fontVariationSettings: '"opsz" 144,"SOFT" 80',
                  }}
                >
                  Bez úprav.
                </em>
              </h3>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 self-end">
              <p
                className="leading-[1.6]"
                style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}
              >
                97 % nestojí na NPS dotazníku, ale na tom, co kandidáti{" "}
                <span style={{ color: "#fff" }}>píšou sami od sebe</span> po
                dokončení prescreeningu.
              </p>
            </div>
          </div>

          <EmailInbox emails={emails} />

          <p
            className="mt-8 leading-relaxed max-w-[64ch] mx-auto text-center"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            Zpětná vazba kandidátů našim klientům
          </p>
        </div>
      </div>
    </section>
  );
}

function ImpactCard({
  impact,
  triggerRef,
  delayMs,
}: {
  impact: Impact;
  triggerRef: React.RefObject<HTMLElement | null>;
  delayMs: number;
}) {
  const { value: bigValue, pulse: bigPulse } = useCountUp({
    target: impact.bigNum,
    delayMs,
    durationMs: 1500,
    triggerRef,
  });

  const isPercent = impact.bigSuffix === "%";

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
        {impact.tag}
      </span>

      <div
        className="sj-pain-num"
        style={{ color: impact.numColor, fontSize: "clamp(60px, 7vw, 96px)" }}
      >
        <span
          style={{
            display: "inline-block",
            transformOrigin: "left center",
            transform: bigPulse ? "scale(1.18)" : "scale(1)",
            transition: bigPulse
              ? "transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 460ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
          {impact.bigSign && <em>{impact.bigSign}</em>}
          {bigValue}
          {isPercent ? (
            <span
              style={{
                fontStyle: "italic",
                fontVariationSettings: '"opsz" 144, "SOFT" 80',
                color: "var(--color-purple-soft)",
              }}
            >
              %
            </span>
          ) : (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.28em",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.6)",
                marginLeft: "0.18em",
                textTransform: "uppercase",
                verticalAlign: "0.45em",
              }}
            >
              dní
            </span>
          )}
        </span>
      </div>

      {/* Před → Po mini bar */}
      <div className="flex flex-col gap-1.5">
        <div
          className="flex justify-between"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}
        >
          <span>Před</span>
          <span>{impact.baseline.label}</span>
          <span>Po</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 380,
              fontSize: 17,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {impact.baseline.before}
          </span>
          <span
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <span
              className="block h-full rounded-full"
              style={{
                width: "100%",
                background:
                  "linear-gradient(90deg, rgba(139,92,246,0.4), var(--sj-signal-green))",
              }}
            />
          </span>
          <CountUpNumber
            target={impact.baseline.after}
            delayMs={delayMs + 350}
            durationMs={1400}
            triggerRef={triggerRef}
            pulseScale={1.3}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontWeight: 380,
              fontSize: 17,
              color: "var(--sj-signal-green-soft)",
              transformOrigin: "right center",
            }}
          />
        </div>
      </div>

      <div
        className="font-medium pt-3"
        style={{
          fontSize: 16,
          lineHeight: 1.4,
          color: "#fff",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {impact.title}
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.62)",
          fontSize: 14.5,
          lineHeight: 1.6,
        }}
      >
        {impact.body}
      </p>

      {impact.proof && (
        <a
          href={impact.proof.href}
          className="sj-proof-link group mt-auto inline-flex items-center gap-2 self-start"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-purple-soft)",
            paddingTop: 4,
            borderTop: "1px solid rgba(255,255,255,0.0)",
          }}
        >
          <span className="sj-proof-link-label">{impact.proof.label}</span>
          <span
            aria-hidden="true"
            className="sj-proof-link-arrow"
            style={{
              display: "inline-block",
              width: 14,
              height: 14,
              lineHeight: "14px",
              textAlign: "center",
            }}
          >
            ↓
          </span>
        </a>
      )}
    </article>
  );
}
