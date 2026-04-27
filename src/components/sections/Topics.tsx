import { useTranslations } from "next-intl";
import {
  HeartPulse,
  Coins,
  Gauge,
  Flame,
  Handshake,
  Bot,
  Crown,
  Target,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const topicIcons = [
  HeartPulse,
  Coins,
  Gauge,
  Flame,
  Handshake,
  Bot,
  Crown,
  Target,
];

export default function Topics() {
  const t = useTranslations("topics");
  const tl = useTranslations("labels");
  const allItems = t.raw("items") as Array<{
    name: string;
    description: string;
  }>;

  const selectedNames = [
    "Pulse týmu", "Odměny", "Zátěž", "Vyhoření",
    "Kultura", "AI v práci", "Leadership", "Priority",
  ];
  const items = selectedNames
    .map((name) => allItems.find((item) => item.name === name))
    .filter(Boolean) as Array<{ name: string; description: string }>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("topics")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {items.map((item, i) => {
            const Icon = topicIcons[i];
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200">
                  <Icon className="h-6 w-6 text-gray-600 mb-3 sm:mb-4" />
                  <h3 className="text-sm font-semibold text-primary mb-1 sm:mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-xs text-gray-500 leading-relaxed hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
