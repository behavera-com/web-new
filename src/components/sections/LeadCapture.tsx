"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, ArrowRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function LeadCapture() {
  const t = useTranslations("leadCapture");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Connect to email service (ConvertKit, Mailchimp, etc.)
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-6 lg:p-10 border border-gray-200">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4">
                  <BookOpen className="h-3.5 w-3.5" />
                  {t("badge")}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {t("title")}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t("description")}
                </p>
                <ul className="space-y-2">
                  {(t.raw("points") as string[]).map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: form */}
              <div>
                {submitted ? (
                  <div className="text-center py-8">
                    <p className="text-lg font-bold text-primary mb-2">
                      {t("success")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("successDetail")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="lead-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("emailLabel")}
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("emailPlaceholder")}
                        inputMode="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors text-base"
                    >
                      {t("cta")}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      {t("privacy")}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
