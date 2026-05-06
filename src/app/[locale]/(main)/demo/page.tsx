"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Calendar, Clock, CheckCircle, Users, BarChart3, Lightbulb } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const demoPoints = [
  {
    icon: Users,
    title: "Ukážeme vám produkt živě",
    text: "Reálná data, reálný dashboard. Žádné slidedeck.",
  },
  {
    icon: BarChart3,
    title: "Odpovíme na vaše otázky",
    text: "Cena, GDPR, integrace, anonymita — cokoli vás zajímá.",
  },
  {
    icon: Lightbulb,
    title: "Doporučení pro váš tým",
    text: "Jak Behavera nasadit konkrétně ve vaší firmě a co čekat.",
  },
];

export default function DemoPage() {
  const t = useTranslations("finalCta");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    size: "",
    note: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "demo-page" }),
      });
      setSubmitted(true);
    } catch {
      // fail silently — show success anyway to not block conversions
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
            Demo zdarma
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            30 minut, které změní váš přístup k lidem.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Živá ukázka Behavera na reálných datech. Žádný sales pitch — jen
            odpovědi na vaše otázky.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              30 minut
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              Online, v termínu, který vám vyhovuje
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              Bez závazků
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: what you get + calendly */}
          <FadeIn>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                Co vám demo přinese
              </h2>
              <div className="space-y-5 mb-10">
                {demoPoints.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calendly CTA */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  Preferujete si rovnou vybrat čas?
                </p>
                <a
                  href="https://calendly.com/behavera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Vybrat termín v Calendly
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right: contact form */}
          <FadeIn delay={0.1}>
            {submitted ? (
              <div className="bg-accent/10 rounded-2xl p-10 text-center border border-accent/20">
                <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">
                  Skvěle! Ozveme se vám brzy.
                </h3>
                <p className="text-gray-600">
                  Zkontrolujte e-mail — potvrzení přijde do pár minut. Typicky
                  se ozveme do 24 hodin.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-primary mb-6">
                  Zanechte kontakt — ozveme se do 24 hodin
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jméno
                      </label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({ ...form, firstName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                        placeholder="Jan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Příjmení
                      </label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({ ...form, lastName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                        placeholder="Novák"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pracovní e-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                      placeholder="jan@firma.cz"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                      placeholder="+420 731 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vaše role
                    </label>
                    <select
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
                    >
                      <option value="">Vyberte roli</option>
                      {t.raw("roles").map((r: string) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Počet zaměstnanců
                    </label>
                    <select
                      value={form.size}
                      onChange={(e) =>
                        setForm({ ...form, size: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent bg-white"
                    >
                      <option value="">Vyberte velikost</option>
                      <option>Do 50</option>
                      <option>50–150</option>
                      <option>150–500</option>
                      <option>500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Poznámka (nepovinné)
                    </label>
                    <textarea
                      value={form.note}
                      onChange={(e) =>
                        setForm({ ...form, note: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent resize-none"
                      placeholder="Co vás zajímá nejvíce?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-60"
                  >
                    {loading ? "Odesílám…" : "Rezervovat demo"}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Žádný spam. Ozveme se vám ohledně dema, nic víc.
                  </p>
                </form>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
