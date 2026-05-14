"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  APP_TRY_URL,
  APP_URL,
  PHONE,
  PHONE_TEL,
  primaryLinks,
  problemItems,
  productItems,
  roleItems,
} from "@/config/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ open, onClose }: Props) {
  const t = useTranslations("nav");
  const tp = useTranslations("nav_problems");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
        >
          <div
            className="px-4 py-4 space-y-1 overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            <SectionLabel>{t("product")}</SectionLabel>
            {productItems.map(({ key, href, Icon, badge }) => (
              <Link
                key={key}
                href={href}
                className="flex items-center gap-3 py-2.5"
                onClick={onClose}
              >
                <Icon className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-700">
                  {t(`productMenu.${key}`)}
                </span>
                {badge && (
                  <span
                    className="inline-flex items-center px-1.5 py-0.5 rounded bg-accent/15 text-accent font-semibold uppercase tracking-wider"
                    style={{ fontSize: "10px" }}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            ))}

            <Divider />

            <SectionLabel>{t("solutions")} — {t("byProblem")}</SectionLabel>
            {problemItems.map(({ key, href, Icon }) => (
              <Link
                key={key}
                href={href}
                className="flex items-center gap-3 py-2.5"
                onClick={onClose}
              >
                <Icon className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-700">{tp(key)}</span>
              </Link>
            ))}

            <Divider />

            <SectionLabel>{t("byRole")}</SectionLabel>
            {roleItems.map(({ key, href, Icon }) => (
              <Link
                key={key}
                href={href}
                className="flex items-center gap-3 py-2.5"
                onClick={onClose}
              >
                <Icon className="h-5 w-5 text-accent" />
                <span className="text-sm text-gray-700">
                  {t(`roleLabels.${key}`)}
                </span>
              </Link>
            ))}

            <Divider />

            {primaryLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="block py-3 text-sm font-medium text-gray-700"
                onClick={onClose}
              >
                {t(link.key)}
              </Link>
            ))}

            <Divider />

            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 py-2.5 text-sm text-gray-600"
            >
              <Phone className="h-4 w-4 text-gray-400" />
              {PHONE}
            </a>

            <div className="pt-2 space-y-2">
              <a
                href={APP_TRY_URL}
                className="block w-full text-center px-5 py-3 bg-accent text-primary text-sm font-semibold rounded-lg"
              >
                {t("cta")}
              </a>
              <a
                href={APP_URL}
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
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-semibold text-gray-400 uppercase tracking-wider pb-1"
      style={{ fontSize: "11px" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="border-gray-100 my-2" />;
}
