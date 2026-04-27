import { useTranslations } from "next-intl";
import { BarChart3, AlertTriangle, ListOrdered } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const featureIcons = [BarChart3, AlertTriangle, ListOrdered];

export default function DashboardPreview() {
  const t = useTranslations("dashboard");
  const tl = useTranslations("labels");
  const features = t.raw("features") as Array<{
    title: string;
    text: string;
  }>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
              {tl("dashboard")}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {features.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-gray-200">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.text}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                aria-label="Ukázka Behavera dashboardu"
                poster="https://www.behavera.com/dashboard-demo-poster.webp"
                className="w-full h-auto"
              >
                <source
                  src="https://www.behavera.com/dashboard-demo.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
