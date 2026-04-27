"use client";

import { useTranslations } from "next-intl";
import { Mail, MessageSquare, Phone, Monitor, Link2 } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const channelIcons = [Mail, MessageSquare, Phone, Monitor, Link2];

export default function Integrations() {
  const t = useTranslations("integrations");
  const channels = t.raw("channels") as Array<{
    name: string;
    description: string;
  }>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {channels.map((channel, i) => {
            const Icon = channelIcons[i] || Mail;
            return (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-gray-500">{channel.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4}>
          <div className="text-center mt-10">
            <a
              href="https://app.behavera.com/echo-pulse/try"
              className="inline-flex items-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
            >
              {t("cta")}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
