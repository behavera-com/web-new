"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { LogIn, Menu, Phone, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { APP_URL, PHONE, PHONE_TEL } from "@/config/navigation";
import DesktopNav from "./header/DesktopNav";
import MobileDrawer from "./header/MobileDrawer";

export default function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Top utility bar */}
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
                href={PHONE_TEL}
                className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {PHONE}
              </a>
              <span
                className="hidden sm:block bg-white/20"
                style={{ width: "1px", height: "14px" }}
                aria-hidden="true"
              />
              <a
                href={APP_URL}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium"
              >
                <LogIn className="h-3.5 w-3.5" />
                {t("login")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`bg-white/95 backdrop-blur transition-[border-color] duration-200 border-b ${scrolled ? "border-gray-200" : "border-transparent"}`}
      >
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

            <DesktopNav />

            <button
              className="lg:hidden p-2.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
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

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
