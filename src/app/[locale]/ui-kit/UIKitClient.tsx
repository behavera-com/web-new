"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X,
  Star,
  Users,
  BarChart3,
  Brain,
  Target,
  Zap,
  Clock,
  Eye,
  Download,
  ExternalLink,
  Play,
  Mail,
  Phone,
  MapPin,
  Globe,
  Settings,
  Lock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Copy,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const sections = [
  { id: "colors", label: "Barvy" },
  { id: "typography", label: "Typografie" },
  { id: "buttons", label: "Tlačítka" },
  { id: "cards", label: "Karty" },
  { id: "badges", label: "Badgy & Labely" },
  { id: "forms", label: "Formuláře" },
  { id: "sections", label: "Section layout" },
  { id: "animations", label: "Animace" },
  { id: "icons", label: "Ikony" },
];

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-24 mb-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-primary">{title}</h2>
      <div className="mt-2 h-1 w-12 bg-accent rounded-full" />
    </div>
  );
}

function Swatch({
  name,
  className,
  hex,
}: {
  name: string;
  className: string;
  hex: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }).catch(() => {});
      }}
      className="text-left group"
    >
      <div
        className={`w-full aspect-[3/2] rounded-xl ${className} ring-1 ring-black/5 transition-transform group-hover:scale-105`}
      />
      <p className="mt-2 text-sm font-semibold text-primary">{name}</p>
      <p className="text-xs text-gray-500 font-mono">
        {copied ? "Zkopírováno!" : hex}
      </p>
    </button>
  );
}

function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto font-mono">
        {code}
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }).catch(() => {});
        }}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function UIKitClient() {
  const [activeSection, setActiveSection] = useState("colors");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-12">
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
          Interní
        </p>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-primary">
          UI Kit
        </h1>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl">
          Referenční přehled všech UI prvků, barev, typografie a komponent
          používaných na webu Behavera. Kopíruj třídy přímo z ukázek.
        </p>
      </div>

      <div className="flex gap-12">
        {/* Sidebar nav */}
        <nav className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-28 space-y-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeSection === s.id
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-20">
          {/* ========================================================== */}
          {/*  COLORS                                                     */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="colors" title="Barvy" />

            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Brand
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              <Swatch name="Primary" className="bg-primary" hex="#1a1a2e" />
              <Swatch
                name="Primary Light"
                className="bg-primary-light"
                hex="#2d2d4a"
              />
              <Swatch name="Accent" className="bg-accent" hex="#2ddba6" />
              <Swatch
                name="Accent Dark"
                className="bg-accent-dark"
                hex="#25b98d"
              />
              <Swatch name="Danger" className="bg-danger" hex="#ef4444" />
              <Swatch name="Coral" className="bg-coral" hex="#f97066" />
            </div>

            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Gray škála
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
              <Swatch name="50" className="bg-gray-50" hex="#f9fafb" />
              <Swatch name="100" className="bg-gray-100" hex="#f3f4f6" />
              <Swatch name="200" className="bg-gray-200" hex="#e5e7eb" />
              <Swatch name="300" className="bg-gray-300" hex="#d1d5db" />
              <Swatch name="400" className="bg-gray-400" hex="#9ca3af" />
              <Swatch name="500" className="bg-gray-500" hex="#6b7280" />
              <Swatch name="600" className="bg-gray-600" hex="#4b5563" />
              <Swatch name="700" className="bg-gray-700" hex="#374151" />
              <Swatch name="800" className="bg-gray-800" hex="#1f2937" />
              <Swatch name="900" className="bg-gray-900" hex="#111827" />
            </div>

            <div className="mt-6">
              <CodeSnippet
                code={`// Tailwind usage
bg-primary  text-primary
bg-accent   text-accent   hover:bg-accent-dark
bg-danger   text-danger
bg-coral    text-coral
bg-gray-50  bg-gray-100  ...  bg-gray-900`}
              />
            </div>
          </section>

          {/* ========================================================== */}
          {/*  TYPOGRAPHY                                                 */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="typography" title="Typografie" />

            <div className="space-y-8">
              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-4xl sm:text-5xl lg:text-6xl font-extrabold
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.1] tracking-tight">
                  Hero nadpis H1
                </h1>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-3xl lg:text-4xl font-bold
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                  Section nadpis H2
                </h2>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-xl lg:text-2xl font-bold
                </p>
                <h3 className="text-xl lg:text-2xl font-bold text-primary">
                  Podnadpis H3
                </h3>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-lg font-semibold
                </p>
                <h4 className="text-lg font-semibold text-primary">
                  Card nadpis H4
                </h4>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-lg text-gray-600
                </p>
                <p className="text-lg text-gray-600">
                  Subtitle / intro text — používá se pod section nadpisy. Větší
                  velikost pro lepší čitelnost úvodních odstavců.
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-base text-gray-700
                </p>
                <p className="text-base text-gray-700">
                  Body text — základní odstavcový text. Inter font, 16px,
                  normální řádkování. Takhle vypadá běžný text na stránce.
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-sm text-gray-500
                </p>
                <p className="text-sm text-gray-500">
                  Small text — doplňkové informace, popisky, captions. Menší
                  velikost, jemnější barva.
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">
                  text-xs font-bold text-accent uppercase tracking-widest
                </p>
                <p className="text-xs font-bold text-accent uppercase tracking-widest">
                  Section label
                </p>
              </div>

              <div className="bg-primary rounded-xl p-6">
                <p className="text-xs text-gray-400 font-mono mb-3">
                  Na tmavém pozadí:
                </p>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Nadpis na dark bg
                </h2>
                <p className="text-lg text-gray-300 mb-1">Subtitle text</p>
                <p className="text-sm text-gray-400">Small / caption text</p>
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/*  BUTTONS                                                    */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="buttons" title="Tlačítka" />

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Primary (CTA)
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base">
                    Vyzkoušet zdarma
                  </button>
                  <button className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-sm">
                    Menší CTA
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base">
                    S ikonou <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Secondary / Ghost (na tmavém pozadí)
                </h3>
                <div className="bg-primary rounded-xl p-6 flex flex-wrap gap-3">
                  <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base">
                    Chci demo
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors text-base">
                    <Play className="h-4 w-4" /> Přehrát video
                  </button>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 transition-colors" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Dark (na accent pozadí)
                </h3>
                <div className="bg-accent rounded-xl p-6 flex flex-wrap gap-3">
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors text-base">
                    Začít teď
                  </button>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Outline (na světlém pozadí)
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:text-primary transition-colors text-base">
                    Sekundární akce
                  </button>
                  <button className="inline-flex items-center justify-center px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors text-base">
                    Accent outline
                  </button>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Disabled stavy
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    disabled
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-400 font-semibold rounded-lg cursor-not-allowed text-base"
                  >
                    Disabled primary
                  </button>
                  <button
                    disabled
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-gray-300 font-medium rounded-lg cursor-not-allowed text-base"
                  >
                    Disabled outline
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/*  CARDS                                                      */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="cards" title="Karty" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Brain className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-2">
                  Light karta
                </h4>
                <p className="text-sm text-gray-600">
                  Základní varianta karty s bílým pozadím a šedým borderem.
                  Používá se pro features, how-it-works kroky atd.
                </p>
                <p className="text-xs text-gray-400 font-mono mt-4">
                  bg-white rounded-2xl p-6 border border-gray-200
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-primary mb-2">
                  Muted karta
                </h4>
                <p className="text-sm text-gray-600">
                  Jemnější varianta s gray-50 pozadím. Dobré pro alternující
                  sekce nebo méně důrazné bloky.
                </p>
                <p className="text-xs text-gray-400 font-mono mt-4">
                  bg-gray-50 rounded-2xl p-6 border border-gray-200
                </p>
              </div>

              <div className="bg-primary rounded-2xl p-6 text-white">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Dark karta</h4>
                <p className="text-sm text-gray-300">
                  Tmavá varianta s primary pozadím. Pro zdůraznění, premium
                  plány, featured items.
                </p>
                <p className="text-xs text-gray-400 font-mono mt-4">
                  bg-primary rounded-2xl p-6 text-white
                </p>
              </div>

              <div className="bg-accent rounded-2xl p-6 text-primary">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Accent karta</h4>
                <p className="text-sm text-primary/80">
                  Výrazná varianta s accent barvou. Hodí se pro CTA bloky nebo
                  highlight sekce.
                </p>
                <p className="text-xs text-primary/60 font-mono mt-4">
                  bg-accent rounded-2xl p-6 text-primary
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Karta s hover efektem
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {["Engagement", "Výkon", "Retence"].map((label) => (
                  <div
                    key={label}
                    className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-accent/30 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-3 transition-colors">
                      <BarChart3 className="h-4 w-4 text-accent" />
                    </div>
                    <h4 className="text-base font-semibold text-primary">
                      {label}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Popis metriky nebo funkce.
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <CodeSnippet code="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-accent/30 hover:shadow-lg transition-all" />
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/*  BADGES & LABELS                                            */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="badges" title="Badgy & Labely" />

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Pill badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                    AI-powered
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
                    Premium
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-danger/10 text-danger text-sm font-medium">
                    Riziko
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                    Default
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-white/10 bg-gray-900 rounded-full px-2.5 py-1 text-white text-xs">
                    <span className="text-yellow-400">&#9733;</span>
                    4.8/5 G2
                  </span>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Section labels
                </h3>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-accent uppercase tracking-widest">
                    Jak to funguje
                  </p>
                  <p className="text-xs font-bold text-danger uppercase tracking-widest">
                    Varování
                  </p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Neutral label
                  </p>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="text-xs font-bold text-accent uppercase tracking-widest" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Icon badges
                </h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-accent" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                    DS
                  </div>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Trust badges (compliance)
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-accent" />
                    GDPR compliant
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-accent" />
                    Data v EU
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-accent" />
                    ISO 27001
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/*  FORMS                                                      */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="forms" title="Formuláře" />

            <div className="space-y-8 max-w-lg">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Input
                </h3>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="jan@firma.cz"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                />
                <div className="mt-3">
                  <CodeSnippet code="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent/50 focus:border-accent" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Input s chybou
                </h3>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  defaultValue="špatný-email"
                  className="w-full px-4 py-2.5 rounded-lg border border-danger text-primary focus:outline-none focus:ring-2 focus:ring-danger/50 focus:border-danger transition-colors"
                />
                <p className="text-sm text-danger mt-1.5">
                  Zadejte platný e-mail
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Toggle switch
                </h3>
                <ToggleDemo />
                <div className="mt-3">
                  <CodeSnippet
                    code={`<button
  role="switch"
  aria-checked={on}
  className={\`relative w-12 h-6 rounded-full transition-colors \${on ? "bg-accent" : "bg-gray-300"}\`}
>
  <div className={\`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform \${on ? "translate-x-6" : "translate-x-0.5"}\`} />
</button>`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Slider
                </h3>
                <input
                  type="range"
                  min={0}
                  max={3}
                  defaultValue={1}
                  className="w-full accent-accent"
                />
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/*  SECTION LAYOUT                                             */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="sections" title="Section layout" />

            <p className="text-sm text-gray-600 mb-6">
              Standardní pattern pro každou sekci na stránce. Container je vždy{" "}
              <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                max-w-7xl
              </code>{" "}
              s horizontálním paddingem.
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden">
              {/* Light section */}
              <div className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10">
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                      Label
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                      Section s bílým pozadím
                    </h2>
                    <p className="text-lg text-gray-600 mt-3">
                      Standardní section header pattern
                    </p>
                  </div>
                  <div className="h-24 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400">
                    Obsah sekce
                  </div>
                </div>
              </div>

              {/* Gray section */}
              <div className="py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10">
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                      Label
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                      Section s gray-50 pozadím
                    </h2>
                    <p className="text-lg text-gray-600 mt-3">
                      Alternativní pozadí pro vizuální oddělení
                    </p>
                  </div>
                  <div className="h-24 rounded-xl bg-white border-2 border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400">
                    Obsah sekce
                  </div>
                </div>
              </div>

              {/* Dark section */}
              <div className="py-20 bg-primary">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10">
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                      Label
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                      Section s dark pozadím
                    </h2>
                    <p className="text-lg text-gray-300 mt-3">
                      Pro důrazné nebo CTA sekce
                    </p>
                  </div>
                  <div className="h-24 rounded-xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center text-sm text-gray-400">
                    Obsah sekce
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <CodeSnippet
                code={`<section className="py-20 bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">Label</p>
    <h2 className="text-3xl lg:text-4xl font-bold text-primary">Nadpis</h2>
    <p className="text-lg text-gray-600 mt-3">Podnázev</p>
    {/* content */}
  </div>
</section>`}
              />
            </div>
          </section>

          {/* ========================================================== */}
          {/*  ANIMATIONS                                                 */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="animations" title="Animace" />

            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  FadeIn (scroll reveal)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Hlavní animační komponenta. Fade in + slide up při scrollu.
                  Podporuje prop{" "}
                  <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                    delay
                  </code>
                  .
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[0, 0.1, 0.2].map((delay) => (
                    <FadeIn key={delay} delay={delay}>
                      <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                        <p className="text-sm font-medium text-primary">
                          FadeIn delay={delay}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
                <div className="mt-3">
                  <CodeSnippet
                    code={`import FadeIn from "@/components/ui/FadeIn";

<FadeIn delay={0.1}>
  <div>...</div>
</FadeIn>`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  AnimatedCounter
                </h3>
                <div className="flex flex-wrap gap-8">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">
                      <AnimatedCounter value="87" suffix="%" />
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Úspěšnost</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-accent">
                      <AnimatedCounter value="2400" suffix="+" />
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Uživatelů</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">
                      <AnimatedCounter value="34" suffix=" min" />
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Průměrný čas</p>
                  </div>
                </div>
                <div className="mt-3">
                  <CodeSnippet
                    code={`import AnimatedCounter from "@/components/ui/AnimatedCounter";

<AnimatedCounter value="87" suffix="%" />`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Pulse glow
                </h3>
                <div className="flex gap-4 items-center">
                  <button className="animate-pulse-glow inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg text-base">
                    Pulse glow efekt
                  </button>
                </div>
                <div className="mt-3">
                  <CodeSnippet code="animate-pulse-glow" />
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/*  ICONS                                                      */}
          {/* ========================================================== */}
          <section>
            <SectionTitle id="icons" title="Ikony" />

            <p className="text-sm text-gray-600 mb-6">
              Používáme <strong>Lucide React</strong>. Import:{" "}
              <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                {`import { IconName } from "lucide-react"`}
              </code>
            </p>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
              {[
                { icon: Shield, name: "Shield" },
                { icon: ArrowRight, name: "ArrowRight" },
                { icon: Check, name: "Check" },
                { icon: ChevronDown, name: "ChevronDown" },
                { icon: ChevronRight, name: "ChevronRight" },
                { icon: Search, name: "Search" },
                { icon: Menu, name: "Menu" },
                { icon: X, name: "X" },
                { icon: Star, name: "Star" },
                { icon: Users, name: "Users" },
                { icon: BarChart3, name: "BarChart3" },
                { icon: Brain, name: "Brain" },
                { icon: Target, name: "Target" },
                { icon: Zap, name: "Zap" },
                { icon: Clock, name: "Clock" },
                { icon: Eye, name: "Eye" },
                { icon: Download, name: "Download" },
                { icon: ExternalLink, name: "ExternalLink" },
                { icon: Play, name: "Play" },
                { icon: Mail, name: "Mail" },
                { icon: Phone, name: "Phone" },
                { icon: MapPin, name: "MapPin" },
                { icon: Globe, name: "Globe" },
                { icon: Settings, name: "Settings" },
                { icon: Lock, name: "Lock" },
                { icon: AlertTriangle, name: "AlertTriangle" },
                { icon: Info, name: "Info" },
                { icon: CheckCircle, name: "CheckCircle" },
                { icon: XCircle, name: "XCircle" },
                { icon: Copy, name: "Copy" },
              ].map(({ icon: Icon, name }) => (
                <button
                  key={name}
                  onClick={() => {
                    navigator.clipboard.writeText(name).catch(() => {});
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <Icon className="h-5 w-5 text-gray-600 group-hover:text-accent transition-colors" />
                  <span className="text-[10px] text-gray-400 font-mono">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Spacer */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toggle demo                                                        */
/* ------------------------------------------------------------------ */

function ToggleDemo() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-sm font-medium ${!on ? "text-primary" : "text-gray-400"}`}
      >
        Měsíční
      </span>
      <button
        onClick={() => setOn(!on)}
        role="switch"
        aria-checked={on}
        className={`relative w-12 h-6 rounded-full transition-colors ${on ? "bg-accent" : "bg-gray-300"}`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-6" : "translate-x-0.5"}`}
        />
      </button>
      <span
        className={`text-sm font-medium ${on ? "text-primary" : "text-gray-400"}`}
      >
        Roční
      </span>
    </div>
  );
}
