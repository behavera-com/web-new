"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  DoorOpen,
  UserX,
  TrendingDown,
  Target,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const icons = [DoorOpen, UserX, TrendingDown, Target, TrendingUp, Star];
const pillColors = [
  "bg-danger/10 text-danger",
  "bg-coral/10 text-coral",
  "bg-danger/10 text-danger",
  "bg-coral/10 text-coral",
  "bg-accent/10 text-accent",
  "bg-accent/10 text-accent",
];

export default function Problems() {
  const t = useTranslations("problems");
  const tl = useTranslations("labels");
  const tc = useTranslations("common");
  const cards = t.raw("cards") as Array<{
    headline: string;
    stat: string;
    text: string;
    link: string;
  }>;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("challenges")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <Link
                  href={card.link}
                  className="group flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-2.5 bg-gray-100 rounded-xl">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-primary mb-2">
                      {card.headline}
                    </h3>
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${pillColors[i]}`}
                    >
                      {card.stat}
                    </span>
                    <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-accent flex-shrink-0 mt-1 transition-colors" />
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
