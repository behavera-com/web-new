import { useTranslations } from "next-intl";
import { Send, MessageSquare, BarChart3 } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const stepIcons = [Send, MessageSquare, BarChart3];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const tl = useTranslations("labels");
  const steps = t.raw("steps") as Array<{ title: string; text: string }>;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("howItWorks")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Connected steps */}
        <div className="max-w-5xl mx-auto">
          <div className="hidden sm:flex items-center justify-center mb-10">
            {steps.map((_, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent text-primary flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-16 sm:w-32 lg:w-40 border-t-2 border-dashed border-gray-300 mx-2" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <FadeIn key={i} delay={i * 0.1 + 0.3}>
                  <div className="flex sm:block text-left sm:text-center gap-4">
                    <div className="flex-shrink-0 sm:mx-auto w-12 h-12 sm:w-auto sm:h-auto rounded-full bg-accent/10 sm:bg-transparent flex items-center justify-center sm:mb-4 sm:hidden">
                      <span className="text-lg font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <Icon className="h-7 w-7 text-gray-600 mx-auto mb-4 hidden sm:block" />
                    <div>
                      <h3 className="text-lg font-bold text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">{step.text}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <FadeIn delay={0.5}>
          <div className="max-w-2xl mx-auto mt-14 text-center">
            <p className="text-sm text-gray-500 italic mb-4 leading-relaxed">
              &ldquo;{t("quote")}&rdquo;
            </p>
            <p className="text-xs font-semibold text-gray-400">
              {t("quoteAuthor")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
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
