"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  DoorOpen,
  UserX,
  TrendingDown,
  Target,
  TrendingUp,
  Star,
  Phone,
  LogIn,
  Layers,
  BarChart3,
  Plug,
  ShieldCheck,
  User,
  Users,
  Briefcase,
  Crown,
} from "lucide-react";

const problemIcons = [DoorOpen, UserX, TrendingDown, Target, TrendingUp, Star];
const problemKeys = [
  "turnover",
  "managers",
  "performance",
  "hiring",
  "growth",
  "newCeo",
] as const;
const problemLinks = [
  "/problemy/fluktuace",
  "/problemy/manazeri",
  "/problemy/vykon-tymu",
  "/problemy/chybne-nabory",
  "/problemy/rust-firmy",
  "/problemy/novy-ceo",
];

const roleKeys = ["ceo", "hr", "manager", "teamLead"] as const;
const roleIcons = [Crown, Briefcase, Users, User];
const roleLinks = ["/pro/ceo", "/pro/hr", "/pro/manazer", "/pro/team-lead"];

const productItems = [
  { key: "echoPulse", href: "/echo-pulse", Icon: Star },
  { key: "howItWorks", href: "/jak-to-funguje", Icon: Layers },
  { key: "features", href: "/#dashboard", Icon: BarChart3 },
  { key: "integrations", href: "/#integrations", Icon: Plug },
  { key: "security", href: "/bezpecnost", Icon: ShieldCheck },
] as const;

type DropdownId = "product" | "solutions" | null;

export default function Header() {
  const t = useTranslations("nav");
  const tp = useTranslations("nav_problems");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownId>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openDropdown(id: DropdownId) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(id);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  }

  return (
    <div className="sticky top-0 z-50">
      {/* ── Top utility bar ── */}
      <div
        className="bg-gray-900 text-gray-300 border-b border-white/5"
        style={{ fontSize: "13px", paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-end"
            style={{ height: "36px" }}
          >
            <div className="flex items-center gap-6 ml-auto">
              <a
                href="tel:+420605839456"
                className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                +420 605 839 456
              </a>
              <span
                className="hidden sm:block bg-white/20"
                style={{ width: "1px", height: "14px" }}
                aria-hidden="true"
              />
              <a
                href="https://app.behavera.com"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <LogIn className="h-3.5 w-3.5" />
                {t("login")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header className={`bg-white/95 backdrop-blur transition-[border-color] duration-200 border-b ${scrolled && !activeDropdown ? "border-gray-200" : "border-transparent"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between"
            style={{ height: "64px" }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://www.behavera.com/logo-behavera.png"
                alt="Behavera"
                width={140}
                height={32}
                className="h-8 w-auto"
                style={{ flexShrink: 0 }}
                priority
              />
              <span
                className="hidden md:block bg-gray-200"
                style={{ width: "1px", height: "20px" }}
                aria-hidden="true"
              />
              <span
                className="hidden md:block font-medium text-primary/70 whitespace-nowrap"
                style={{ fontSize: "13px", letterSpacing: "-0.01em" }}
              >
                {t("claim")}
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Produkt */}
              <div
                onMouseEnter={() => openDropdown("product")}
                onMouseLeave={scheduleClose}
              >
                <button
                  aria-expanded={activeDropdown === "product"}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeDropdown === "product"
                      ? "text-accent"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {t("product")}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "product" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* Řešení */}
              <div
                onMouseEnter={() => openDropdown("solutions")}
                onMouseLeave={scheduleClose}
              >
                <button
                  aria-expanded={activeDropdown === "solutions"}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeDropdown === "solutions"
                      ? "text-accent"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {t("solutions")}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <Link
                href="/pripadovky"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t("caseStudies")}
              </Link>
              <Link
                href="/cenik"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t("pricing")}
              </Link>
              <Link
                href="/demo"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
              >
                Demo
              </Link>

              <a
                href="https://app.behavera.com/echo-pulse/try"
                className="ml-3 inline-flex items-center px-5 py-2.5 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
              >
                {t("cta")}
              </a>
            </nav>

            {/* Mobile burger */}
            <button
              className="lg:hidden p-2.5"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Backdrop overlay (only below header) ── */}
      <AnimatePresence>
        {activeDropdown !== null && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              top: "100px",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.55)",
              zIndex: 30,
            }}
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Full-width mega-menu panels (overlay on top of content) ── */}
      <AnimatePresence>
        {activeDropdown === "product" && (
          <motion.div
            key="product-mega"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="bg-white shadow-xl"
            style={{ position: "absolute", left: 0, width: "100%", zIndex: 40 }}
            onMouseEnter={() => openDropdown("product")}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex gap-10">
                {/* Col 1: Product items */}
                <div style={{ flex: "1 1 0%" }}>
                  <p
                    className="font-semibold text-gray-400 uppercase tracking-wider mb-4"
                    style={{ fontSize: "11px" }}
                  >
                    {t("product")}
                  </p>
                  <div className="space-y-1">
                    {productItems.map(({ key, href, Icon }) => (
                      <Link
                        key={key}
                        href={href}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div
                          className="flex items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors"
                          style={{ width: "36px", height: "36px", flexShrink: 0 }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div style={{ flex: "1 1 0%" }}>
                          <div className="text-sm font-medium text-gray-900">
                            {t(`productMenu.${key}`)}
                          </div>
                          <div
                            className="text-gray-500"
                            style={{ fontSize: "12px" }}
                          >
                            {t(`productMenu.${key}Desc`)}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Col 2: By Role */}
                <div style={{ flex: "1 1 0%" }}>
                  <p
                    className="font-semibold text-gray-400 uppercase tracking-wider mb-4"
                    style={{ fontSize: "11px" }}
                  >
                    {t("byRole")}
                  </p>
                  <div className="space-y-1">
                    {roleKeys.map((key, i) => {
                      const Icon = roleIcons[i];
                      return (
                        <Link
                          key={key}
                          href={roleLinks[i]}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Icon className="h-5 w-5 text-accent" />
                          <span className="text-sm text-gray-700">
                            {t(`roleLabels.${key}`)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Col 3: CTA card */}
                <div
                  className="flex flex-col justify-center"
                  style={{ flex: "1 1 0%" }}
                >
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p
                      className="font-semibold text-gray-400 uppercase tracking-wider mb-2"
                      style={{ fontSize: "11px" }}
                    >
                      {t("cta")}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {t("productMenu.howItWorksDesc")}
                    </p>
                    <a
                      href="https://app.behavera.com/echo-pulse/try"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                    >
                      {t("cta")}
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeDropdown === "solutions" && (
          <motion.div
            key="solutions-mega"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="bg-white shadow-xl"
            style={{ position: "absolute", left: 0, width: "100%", zIndex: 40 }}
            onMouseEnter={() => openDropdown("solutions")}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex gap-10">
                {/* Col 1: By Problem */}
                <div style={{ flex: "2 1 0%" }}>
                  <p
                    className="font-semibold text-gray-400 uppercase tracking-wider mb-4"
                    style={{ fontSize: "11px" }}
                  >
                    {t("byProblem")}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    {problemKeys.map((key, i) => {
                      const Icon = problemIcons[i];
                      return (
                        <Link
                          key={key}
                          href={problemLinks[i]}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div
                            className="flex items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors"
                            style={{
                              width: "32px",
                              height: "32px",
                              flexShrink: 0,
                            }}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {tp(key)}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Col 2: CTA card */}
                <div
                  className="flex flex-col justify-center"
                  style={{ flex: "1 1 0%" }}
                >
                  <div className="bg-primary rounded-2xl p-6 text-white">
                    <p className="text-lg font-bold mb-2">{t("claim")}</p>
                    <p className="text-sm text-gray-300 mb-4">
                      {t("productMenu.howItWorksDesc")}
                    </p>
                    <a
                      href="https://app.behavera.com/echo-pulse/try"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
                    >
                      {t("cta")}
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 overflow-y-auto" style={{ maxHeight: "80vh" }}>
              <p
                className="font-semibold text-gray-400 uppercase tracking-wider pb-1"
                style={{ fontSize: "11px" }}
              >
                {t("product")}
              </p>
              {productItems.map(({ key, href, Icon }) => (
                <Link
                  key={key}
                  href={href}
                  className="flex items-center gap-3 py-2.5"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="text-sm text-gray-700">
                    {t(`productMenu.${key}`)}
                  </span>
                </Link>
              ))}

              <hr className="border-gray-100 my-2" />

              <p
                className="font-semibold text-gray-400 uppercase tracking-wider pb-1"
                style={{ fontSize: "11px" }}
              >
                {t("byProblem")}
              </p>
              {problemKeys.map((key, i) => {
                const Icon = problemIcons[i];
                return (
                  <Link
                    key={key}
                    href={problemLinks[i]}
                    className="flex items-center gap-3 py-2.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="text-sm text-gray-700">{tp(key)}</span>
                  </Link>
                );
              })}

              <hr className="border-gray-100 my-2" />

              <p
                className="font-semibold text-gray-400 uppercase tracking-wider pb-1"
                style={{ fontSize: "11px" }}
              >
                {t("byRole")}
              </p>
              {roleKeys.map((key, i) => {
                const Icon = roleIcons[i];
                return (
                  <Link
                    key={key}
                    href={roleLinks[i]}
                    className="flex items-center gap-3 py-2.5"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-5 w-5 text-accent" />
                    <span className="text-sm text-gray-700">
                      {t(`roleLabels.${key}`)}
                    </span>
                  </Link>
                );
              })}

              <hr className="border-gray-100 my-2" />

              <Link
                href="/pripadovky"
                className="block py-3 text-sm font-medium text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                {t("caseStudies")}
              </Link>
              <Link
                href="/cenik"
                className="block py-3 text-sm font-medium text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                {t("pricing")}
              </Link>
              <Link
                href="/demo"
                className="block py-3 text-sm font-medium text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                Demo
              </Link>

              <hr className="border-gray-100 my-2" />

              <a
                href="tel:+420605839456"
                className="flex items-center gap-2 py-2.5 text-sm text-gray-600"
              >
                <Phone className="h-4 w-4 text-gray-400" />
                +420 605 839 456
              </a>

              <div className="pt-2 space-y-2">
                <a
                  href="https://app.behavera.com/echo-pulse/try"
                  className="block w-full text-center px-5 py-3 bg-accent text-primary text-sm font-semibold rounded-lg"
                >
                  {t("cta")}
                </a>
                <a
                  href="https://app.behavera.com"
                  className="flex items-center justify-center gap-1.5 w-full px-5 py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg"
                >
                  <LogIn className="h-4 w-4" />
                  {t("login")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
