"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  APP_TRY_URL,
  primaryLinks,
  problemItems,
  productItems,
  roleItems,
} from "@/config/navigation";
import MegaMenuPanel from "./MegaMenuPanel";

type DropdownId = "product" | "solutions" | null;

export default function DesktopNav() {
  const t = useTranslations("nav");
  const tp = useTranslations("nav_problems");
  const [active, setActive] = useState<DropdownId>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function open(id: DropdownId) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActive(id);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setActive(null), 200);
  }

  function triggerClass(id: DropdownId) {
    return `flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      active === id
        ? "text-accent"
        : "text-gray-700 hover:text-primary hover:bg-gray-50"
    }`;
  }

  return (
    <>
      <nav className="hidden lg:flex items-center gap-1">
        <div onMouseEnter={() => open("product")} onMouseLeave={scheduleClose}>
          <button
            aria-expanded={active === "product"}
            className={triggerClass("product")}
          >
            {t("product")}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${active === "product" ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div onMouseEnter={() => open("solutions")} onMouseLeave={scheduleClose}>
          <button
            aria-expanded={active === "solutions"}
            className={triggerClass("solutions")}
          >
            {t("solutions")}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${active === "solutions" ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {primaryLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t(link.key)}
          </Link>
        ))}

        <a
          href={APP_TRY_URL}
          className="ml-3 inline-flex items-center px-5 py-2.5 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
        >
          {t("cta")}
        </a>
      </nav>

      <AnimatePresence>
        {active !== null && (
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
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <MegaMenuPanel
          key="product-mega"
          isOpen={active === "product"}
          onMouseEnter={() => open("product")}
          onMouseLeave={scheduleClose}
        >
          <div style={{ flex: "2 1 0%" }}>
            <ColumnLabel>{t("product")}</ColumnLabel>
            <div className="space-y-1">
              {productItems.map(({ key, href, Icon, badge }) => (
                <Link
                  key={key}
                  href={href}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <IconBox>
                    <Icon className="h-5 w-5" />
                  </IconBox>
                  <div style={{ flex: "1 1 0%" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {t(`productMenu.${key}`)}
                      </span>
                      {badge && <Badge>{badge}</Badge>}
                    </div>
                    <div className="text-gray-500" style={{ fontSize: "12px" }}>
                      {t(`productMenu.${key}Desc`)}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center" style={{ flex: "1 1 0%" }}>
            <div className="bg-gray-50 rounded-2xl p-6">
              <ColumnLabel className="mb-2">{t("cta")}</ColumnLabel>
              <p className="text-sm text-gray-600 mb-4">
                {t("productMenu.howItWorksDesc")}
              </p>
              <a
                href={APP_TRY_URL}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
              >
                {t("cta")}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </MegaMenuPanel>
      </AnimatePresence>

      <AnimatePresence>
        <MegaMenuPanel
          key="solutions-mega"
          isOpen={active === "solutions"}
          onMouseEnter={() => open("solutions")}
          onMouseLeave={scheduleClose}
        >
          <div style={{ flex: "2 1 0%" }}>
            <ColumnLabel>{t("byProblem")}</ColumnLabel>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {problemItems.map(({ key, href, Icon }) => (
                <Link
                  key={key}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <IconBox size={32}>
                    <Icon className="h-4 w-4" />
                  </IconBox>
                  <span className="text-sm text-gray-700 font-medium">
                    {tp(key)}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 0%" }}>
            <ColumnLabel>{t("byRole")}</ColumnLabel>
            <div className="space-y-1">
              {roleItems.map(({ key, href, Icon }) => (
                <Link
                  key={key}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="text-sm text-gray-700">
                    {t(`roleLabels.${key}`)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center" style={{ flex: "1 1 0%" }}>
            <div className="bg-primary rounded-2xl p-6 text-white">
              <p className="text-lg font-bold mb-2">{t("claim")}</p>
              <p className="text-sm text-gray-300 mb-4">
                {t("productMenu.howItWorksDesc")}
              </p>
              <a
                href={APP_TRY_URL}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
              >
                {t("cta")}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </MegaMenuPanel>
      </AnimatePresence>
    </>
  );
}

function ColumnLabel({
  children,
  className = "mb-4",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-semibold text-gray-400 uppercase tracking-wider ${className}`}
      style={{ fontSize: "11px" }}
    >
      {children}
    </p>
  );
}

function IconBox({
  children,
  size = 36,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors"
      style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }}
    >
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded bg-accent/15 text-accent font-semibold uppercase tracking-wider"
      style={{ fontSize: "10px" }}
    >
      {children}
    </span>
  );
}
