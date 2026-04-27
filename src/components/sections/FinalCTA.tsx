"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, Mail, Phone, Calendar, ArrowRight, Clock, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/ui/FadeIn";

export default function FinalCTA() {
  const t = useTranslations("finalCta");
  const points = t.raw("points") as string[];

  return (
    <section className="py-20 bg-[#eeedf8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: copy */}
            <div>
              <p className="text-sm font-bold text-accent mb-3 tracking-wide">
                {t("label")}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 leading-tight">
                {t("title")}
              </h2>
              <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                {t("subtitle")}
              </p>

              <ul className="space-y-3 mb-10">
                {points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Contact person */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                  {/* TODO: replace with real photo */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                </div>
                <div>
                  <p className="font-bold text-primary text-lg">
                    {t("contactName")}
                  </p>
                  <p className="text-sm text-gray-500">{t("contactRole")}</p>
                </div>
              </div>

              <div className="mb-6">
                <a
                  href={t("bookingUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
                >
                  <Calendar className="h-4 w-4" />
                  {t("bookingCta")}
                </a>
                <p className="text-xs text-gray-500 mt-2">
                  {t("bookingTooltip")}
                </p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <a
                    href={`mailto:${t("contactEmail")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {t("contactEmail")}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <a
                    href={`tel:${t("contactPhone").replace(/\s/g, "")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {t("contactPhone")}
                  </a>
                </p>
              </div>
            </div>

            {/* Right: CTA card */}
            <div className="bg-primary rounded-2xl p-8 lg:p-10 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4 leading-snug">
                  {t("formTitle")}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {t("subtitle")}
                </p>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-gray-200">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 flex-shrink-0">
                      <Clock className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm">{t("demoPoint1")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-200">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 flex-shrink-0">
                      <Users className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm">{t("demoPoint2")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-200">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 flex-shrink-0">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm">{t("demoPoint3")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-dark transition-colors text-base"
                >
                  {t("demoCta")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://app.behavera.com/echo-pulse/try"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  {t("tryCta")}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
