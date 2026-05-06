"use client";

import { useState, useMemo } from "react";
import LeadForm from "./LeadForm";

const fmt = (n: number) =>
  Math.round(n)
    .toLocaleString("cs-CZ")
    .replace(/ /g, " ");

function TipDot({ tip }: { tip: string }) {
  return (
    <span
      className="sj-kpi-tip"
      tabIndex={0}
      data-tip={tip}
      aria-label={tip}
      style={{ marginLeft: 6 }}
    >
      <span className="sj-info-i" aria-hidden="true">
        i
      </span>
    </span>
  );
}

export default function RoiCalculator() {
  const [emp, setEmp] = useState(20);
  const [turn, setTurn] = useState(65);
  const [sal, setSal] = useState(65000);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const { cost, save, newCost, totalDays, dailyCost } = useMemo(() => {
    const c = emp * (turn / 30) * sal * 2;
    const s = c * 0.38;
    const nc = c - s;
    const td = emp * turn;
    const dc = td > 0 ? c / td : 0;
    return { cost: c, save: s, newCost: nc, totalDays: td, dailyCost: dc };
  }, [emp, turn, sal]);

  const newCostPct = cost > 0 ? Math.max(8, (newCost / cost) * 100) : 0;

  return (
    <section
      className="sj-grain sj-reveal"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
          <div className="lg:col-span-3">
            <span className="sj-sec-num">05 / KALKULAČKA</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="sj-h-section max-w-[22ch]">
              Spočítejte si, kolik vás stojí{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-purple-deep)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 80",
                }}
              >
                pomalý nábor
              </em>
            </h2>
            <p
              className="mt-6 max-w-[56ch] leading-[1.6]"
              style={{ fontSize: 18, color: "rgba(28,18,55,0.75)" }}
            >
              Konzervativní propočet podle vašich dat.
            </p>
          </div>
        </div>

        <div
          className="grid lg:grid-cols-12"
          style={{
            border: "1px solid var(--color-rule)",
            background: "#fff",
          }}
        >
          {/* INPUTS */}
          <div
            className="lg:col-span-4 p-8 md:p-10 space-y-9"
            style={{ borderRight: "1px solid var(--color-rule)" }}
          >
            <div className="flex items-baseline justify-between">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  letterSpacing: "0.16em",
                }}
              >
                VSTUPY
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-purple-accent)",
                  letterSpacing: "0.16em",
                }}
              >
                LIVE
              </span>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label htmlFor="sj-emp" className="sj-eyebrow inline-flex items-center">
                  Otevřených pozic ročně
                  <TipDot tip="Počet pozic, které celkem otevřete během roku — zahrňte i replacements." />
                </label>
                <output
                  id="sj-empOut"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--color-purple-deep)",
                  }}
                >
                  {emp}
                </output>
              </div>
              <input
                id="sj-emp"
                type="range"
                min={5}
                max={100}
                step={1}
                value={emp}
                onChange={(e) => setEmp(parseInt(e.target.value, 10))}
              />
              <div
                className="flex justify-between mt-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                }}
              >
                <span>5</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label htmlFor="sj-turn" className="sj-eyebrow inline-flex items-center">
                  Průměrné time-to-hire
                  <TipDot tip="Dny od otevření pozice po podpis smlouvy." />
                </label>
                <output
                  id="sj-turnOut"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    color: "var(--color-purple-deep)",
                  }}
                >
                  {turn} dní
                </output>
              </div>
              <input
                id="sj-turn"
                type="range"
                min={20}
                max={120}
                step={1}
                value={turn}
                onChange={(e) => setTurn(parseInt(e.target.value, 10))}
              />
              <div
                className="flex justify-between mt-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                }}
              >
                <span>20</span>
                <span>120</span>
              </div>
            </div>

            <div>
              <label
                htmlFor="sj-sal"
                className="sj-eyebrow inline-flex items-center mb-2"
              >
                Průměrná hrubá mzda
                <span className="lowercase opacity-60 ml-1">(Kč / měs.)</span>
                <TipDot tip="Průměrná hrubá měsíční mzda nového pracovníka." />
              </label>
              <input
                id="sj-sal"
                className="sj-num-input"
                type="number"
                min={20000}
                max={300000}
                step={1000}
                value={sal}
                onChange={(e) => setSal(parseFloat(e.target.value) || 0)}
                onBlur={(e) => {
                  const v = parseFloat(e.target.value);
                  if (!Number.isFinite(v) || v < 20000) setSal(20000);
                  else if (v > 300000) setSal(300000);
                }}
              />
            </div>
          </div>

          {/* OUTPUTS */}
          <div
            className="lg:col-span-8 p-8 md:p-12 lg:p-16 flex flex-col gap-12 justify-between"
            style={{ background: "rgba(248,246,255,0.4)" }}
          >
            <div className="flex items-baseline justify-between">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  letterSpacing: "0.16em",
                }}
              >
                VÝSTUP · ROČNÍ HORIZONT
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  letterSpacing: "0.16em",
                }}
              >
                FIG.07
              </span>
            </div>

            <div>
              <span className="sj-eyebrow">Roční náklady na pomalý nábor</span>
              <div
                className="sj-roi-num mt-3"
                style={{ color: "var(--color-ink)" }}
              >
                {fmt(cost)}
                <span
                  className="ml-3 align-baseline"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 36,
                    color: "var(--color-muted)",
                    letterSpacing: "normal",
                  }}
                >
                  Kč
                </span>
              </div>
              <p
                className="mt-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-muted)",
                }}
              >
                otevřené pozice × dny v procesu × ztracená produktivita
              </p>
            </div>

            <div
              className="pt-10"
              style={{ borderTop: "1px solid var(--color-rule)" }}
            >
              <span
                className="sj-eyebrow"
                style={{ color: "var(--color-purple-accent)" }}
              >
                Potenciální úspora s Behaverou
              </span>
              <div
                className="sj-roi-num mt-3"
                style={{ color: "var(--color-purple-deep)" }}
              >
                {fmt(save)}
                <span
                  className="ml-3 align-baseline"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 36,
                    color: "var(--color-muted)",
                    letterSpacing: "normal",
                  }}
                >
                  Kč
                </span>
              </div>
              <p
                className="mt-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--color-muted)",
                }}
              >
                −38 % time-to-hire (průměr klientů Behavera)
              </p>

              <p
                className="mt-8 max-w-[40ch]"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontVariationSettings: "'opsz' 144,'SOFT' 80",
                  fontWeight: 340,
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                  fontSize: 24,
                  lineHeight: 1.35,
                  color: "var(--color-ink)",
                }}
              >
                Tohle je rozdíl mezi reaktivním a strategickým HR.
              </p>
            </div>

            {/* Mini bar chart */}
            <div
              className="pt-8"
              style={{ borderTop: "1px solid var(--color-rule)" }}
            >
              <div className="flex items-baseline justify-between mb-4">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-muted)",
                    letterSpacing: "0.16em",
                  }}
                >
                  VIZUÁLNÍ POROVNÁNÍ
                </span>
                <button
                  type="button"
                  onClick={() => setBreakdownOpen((v) => !v)}
                  className="inline-flex items-center gap-1.5 transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--color-purple-accent)",
                    letterSpacing: "0.16em",
                  }}
                  aria-expanded={breakdownOpen}
                  aria-controls="sj-breakdown-panel"
                >
                  <span>{breakdownOpen ? "SKRÝT BREAKDOWN" : "UKÁZAT BREAKDOWN"}</span>
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                    style={{
                      transition: "transform .2s ease",
                      transform: breakdownOpen ? "rotate(180deg)" : "none",
                    }}
                  >
                    <path
                      d="M2 4l3 3 3-3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--color-ink)",
                      }}
                    >
                      SOUČASNÝ STAV
                    </span>
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--color-ink)",
                      }}
                    >
                      {fmt(cost)} Kč
                    </span>
                  </div>
                  <div
                    className="h-3 relative overflow-hidden"
                    style={{ background: "rgba(229,225,242,0.4)" }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 transition-all duration-300"
                      style={{ width: "100%", background: "var(--color-ink)" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--color-purple-accent)",
                      }}
                    >
                      S BEHAVEROU
                    </span>
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--color-purple-accent)",
                      }}
                    >
                      {fmt(newCost)} Kč
                    </span>
                  </div>
                  <div
                    className="h-3 relative overflow-hidden"
                    style={{ background: "rgba(229,225,242,0.4)" }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 transition-all duration-300"
                      style={{
                        width: `${newCostPct}%`,
                        background: "var(--color-purple-accent)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {breakdownOpen && (
                <div
                  id="sj-breakdown-panel"
                  className="mt-6 pt-6 space-y-2.5"
                  style={{
                    fontSize: 13,
                    borderTop: "1px solid rgba(229,225,242,0.6)",
                  }}
                >
                  {[
                    { label: "Otevřené pozice × dny v procesu", val: `${fmt(totalDays)} dní`, dim: false },
                    { label: "Denní náklad ztracené produktivity", val: `${fmt(dailyCost)} Kč`, dim: false },
                    { label: "Roční ztráta (před Behaverou)", val: `${fmt(cost)} Kč`, dim: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4">
                      <span style={{ color: "var(--color-muted)" }}>{row.label}</span>
                      <span
                        className="tabular-nums"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-ink)",
                        }}
                      >
                        {row.val}
                      </span>
                    </div>
                  ))}
                  <div
                    className="flex items-baseline justify-between gap-4 pt-2"
                    style={{ borderTop: "1px solid rgba(229,225,242,0.4)" }}
                  >
                    <span style={{ color: "var(--color-muted)" }}>Po nasazení Behavera (−38 %)</span>
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-purple-accent)",
                      }}
                    >
                      {fmt(newCost)} Kč
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              className="pt-8"
              style={{ borderTop: "1px solid var(--color-rule)" }}
            >
              <LeadForm cost={cost} save={save} positions={emp} timeToHire={turn} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
