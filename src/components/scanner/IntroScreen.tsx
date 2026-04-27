"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Clock,
  Zap,
  TrendingDown,
  Users,
  Heart,
  AlertTriangle,
  Compass,
  MessageCircle,
} from "lucide-react";

interface IntroScreenProps {
  onStart: () => void;
}

const mockDimensions = [
  { label: "Fluktuace", score: 82, color: "#E53E3E" },
  { label: "Leadership", score: 67, color: "#FF7A00" },
  { label: "Přetížení", score: 58, color: "#FF7A00" },
  { label: "Engagement", score: 42, color: "#FFB800" },
  { label: "Komunikace", score: 42, color: "#FFB800" },
  { label: "Kultura", score: 25, color: "#2DDBA6" },
];

function RadarPreview() {
  const count = mockDimensions.length;
  const cx = 50;
  const cy = 50;
  const maxR = 38;

  const points = mockDimensions.map((d, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const r = (d.score / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const labelPoints = mockDimensions.map((d, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const r = maxR + 10;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Grid circles */}
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={maxR * r}
          fill="none"
          stroke="#e0d8ff"
          strokeWidth="0.3"
        />
      ))}
      {/* Grid lines */}
      {mockDimensions.map((_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + maxR * Math.cos(angle)}
            y2={cy + maxR * Math.sin(angle)}
            stroke="#e0d8ff"
            strokeWidth="0.2"
          />
        );
      })}
      {/* Shape */}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="#6C3CE0"
        fillOpacity="0.12"
        stroke="#6C3CE0"
        strokeWidth="0.5"
      />
      {/* Dots */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="1.5"
          fill={mockDimensions[i].color}
          stroke="white"
          strokeWidth="0.5"
        />
      ))}
      {/* Labels */}
      {labelPoints.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#6b7280"
          fontSize="3.2"
          fontWeight="600"
        >
          {mockDimensions[i].label} ({mockDimensions[i].score})
        </text>
      ))}
    </svg>
  );
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="relative bg-gradient-to-b from-[#f3f0ff] via-white to-[#f3f0ff] overflow-hidden">
      {/* Radar preview - positioned to the right, partially visible */}
      <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="w-[550px] h-[550px]"
        >
          <RadarPreview />
        </motion.div>
      </div>

      {/* Subtle gradient overlay to fade the radar on the left edge */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[600px] pointer-events-none bg-gradient-to-r from-[#f3f0ff] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#e0d8ff] text-sm font-medium text-primary shadow-sm">
                <span className="w-5 h-5 rounded bg-primary flex items-center justify-center text-white text-[10px] font-bold">
                  b
                </span>
                HR RISK SCANNER
                <span className="ml-1 px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-bold">
                  ZDARMA
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                Pro CEO a majitele firem
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.1] tracking-tight mb-4">
              Víte, kolik vás stojí problémy s lidmi?
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-[#6C3CE0] mb-6">
              Zjistěte za 90 sekund. Zcela zdarma.
            </p>

            <p className="text-gray-500 text-lg mb-6 max-w-lg">
              10 otázek. Žádné registrace. Žádné poplatky.
              <br />
              Dostanete report s konkrétními čísly — kolik vás stojí fluktuace, špatný management a demotivace.
            </p>

            {/* Value props */}
            <div className="flex flex-wrap gap-3 mb-10 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200">
                <Clock className="w-3.5 h-3.5 text-primary" />
                90 sekund
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200">
                <Zap className="w-3.5 h-3.5 text-primary" />
                Okamžité výsledky
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200">
                <Shield className="w-3.5 h-3.5 text-primary" />
                100% anonymní
              </span>
            </div>

            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-white font-semibold text-lg rounded-full hover:bg-primary-light transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              Spustit bezplatnou diagnostiku
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-6 text-sm text-gray-400">
              Vyplnilo 2 400+ CEO a HR lídrů · Průměrná doba: 90 sekund
            </p>
          </motion.div>
        </div>
      </div>

      {/* Common problems section — bold & loud */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-3">
                Tohle se ve firmách děje každý den
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                A většina CEO se to dozví, až když je pozdě.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: TrendingDown,
                  color: "#E53E3E",
                  bg: "#FEF2F2",
                  border: "#FECACA",
                  title: "Skrytá fluktuace",
                  stat: "375 000 Kč",
                  statLabel: "stojí jeden odchod",
                  impact:
                    "Firma se 100 lidmi a 15% fluktuací ztratí 5,6 mil. Kč ročně. A vy to zjistíte z výpovědi.",
                },
                {
                  icon: Users,
                  color: "#E53E3E",
                  bg: "#FEF2F2",
                  border: "#FECACA",
                  title: "Toxický management",
                  stat: "50 %",
                  statLabel: "lidí odchází kvůli šéfovi",
                  impact:
                    "Jeden špatný manažer = ztráta celého týmu. To je 2–4 mil. Kč škoda. A kdo to je?",
                },
                {
                  icon: Heart,
                  color: "#FF7A00",
                  bg: "#FFF7ED",
                  border: "#FED7AA",
                  title: "Tichá demotivace",
                  stat: "−30 %",
                  statLabel: "produktivity = miliony ročně",
                  impact:
                    "Quiet quitting u 100 lidí = ztráta výkonu 30 zaměstnanců. Nevidíte to v žádném reportu.",
                },
                {
                  icon: AlertTriangle,
                  color: "#E53E3E",
                  bg: "#FEF2F2",
                  border: "#FECACA",
                  title: "Vyhoření klíčových lidí",
                  stat: "1,2–1,8 mil. Kč",
                  statLabel: "stojí jeden burnout",
                  impact:
                    "A přijdete o toho nejlepšího — toho, kdo to táhne za všechny. 2–3 roční platy pryč.",
                },
                {
                  icon: Compass,
                  color: "#FF7A00",
                  bg: "#FFF7ED",
                  border: "#FED7AA",
                  title: "Kultura jen na papíře",
                  stat: "30 %+",
                  statLabel: "nováčků odejde do 6 měsíců",
                  impact:
                    "Každý neúspěšný nábor stojí 250–500 tis. Kč. Při 10 nováčcích ročně = miliony v koši.",
                },
                {
                  icon: MessageCircle,
                  color: "#FF7A00",
                  bg: "#FFF7ED",
                  border: "#FED7AA",
                  title: "Komunikační vakuum",
                  stat: "80 %",
                  statLabel: "problémů začíná špatnou komunikací",
                  impact:
                    "Ztracená důvěra → vyšší fluktuace → vyšší náklady. Řetězová reakce za stovky tisíc.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative p-5 rounded-2xl border-2 transition-shadow hover:shadow-md"
                  style={{
                    backgroundColor: item.bg,
                    borderColor: item.border,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon
                        className="w-5 h-5"
                        style={{ color: item.color }}
                      />
                    </div>
                    <h3 className="text-base font-bold text-primary">
                      {item.title}
                    </h3>
                  </div>
                  <div className="mb-2">
                    <span
                      className="text-2xl font-extrabold"
                      style={{ color: item.color }}
                    >
                      {item.stat}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {item.statLabel}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.impact}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: show small radar below content */}
      <div className="lg:hidden px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-64 h-64 mx-auto"
        >
          <RadarPreview />
        </motion.div>
      </div>
    </div>
  );
}
