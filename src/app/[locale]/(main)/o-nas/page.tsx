import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  FileText,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("seoTitle") };
}

type TeamMember = {
  name: string;
  role: string;
  skills: string;
  bio: string;
  image: string;
};

type ValueItem = {
  title: string;
  text: string;
};

type CaseStudyItem = {
  title: string;
  image: string;
};

type MediaItem = {
  source: string;
  title: string;
  url: string;
  logo: string;
};

export default function AboutPage() {
  const t = useTranslations("about");
  const members = t.raw("team.members") as TeamMember[];
  const values = t.raw("values.items") as ValueItem[];
  const caseStudies = t.raw("caseStudies.items") as CaseStudyItem[];
  const mediaItems = t.raw("media.items") as MediaItem[];

  return (
    <div className="min-h-screen bg-white">
      {/* Back link */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>
      </div>

      {/* Hero / Story */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary leading-tight mb-8">
              {t("hero.title")}
            </h1>
            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>{t("hero.text1")}</p>
              <p>
                {t("hero.text2")}
              </p>
              <p>
                {t("hero.text3")}
              </p>
              <p className="font-semibold text-primary">
                {t("hero.text4")}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/team-photo-1.jpg"
                  alt="Behavera team"
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/team-photo-2.jpg"
                  alt="Behavera team"
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="pt-8">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/team-photo-3.jpg"
                  alt="Behavera team"
                  width={300}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="flex justify-center">
              <Image
                src="/images/about/vision-illustration.svg"
                alt="Vision"
                width={400}
                height={400}
                className="w-full max-w-sm h-auto"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-6">
                {t("vision.title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("vision.text")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-6">
              {t("mission.title")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t("mission.text")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex justify-center">
            <Image
              src="/images/about/mission-illustration.svg"
              alt="Mission"
              width={400}
              height={400}
              className="w-full max-w-sm h-auto"
            />
          </FadeIn>
        </div>
      </section>

      {/* Strengths + stat */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="flex justify-center">
              <Image
                src="/images/about/strengths-illustration.svg"
                alt="Strengths"
                width={400}
                height={400}
                className="w-full max-w-sm h-auto"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-6">
                {t("strengths.title")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t("strengths.text")}
              </p>
              <div className="inline-flex items-baseline gap-2 bg-primary rounded-2xl px-6 py-4">
                <AnimatedCounter
                  value={t("strengths.stat")}
                  className="text-3xl font-extrabold text-accent"
                />
                <span className="text-white/80 text-sm">
                  {t("strengths.statLabel")}
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight mb-6">
              {t("chatbot.title")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t("chatbot.text")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex justify-center">
            <Image
              src="/images/about/chatbot-illustration.svg"
              alt="Chatbot"
              width={400}
              height={400}
              className="w-full max-w-sm h-auto"
            />
          </FadeIn>
        </div>
      </section>

      {/* Core Team */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-12">
              {t("team.title")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {members.slice(0, 4).map((member, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center h-full">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-100">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-primary">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-accent mb-2">
                    {member.role}
                  </p>
                  {member.skills && (
                    <p className="text-xs text-gray-500 mb-3">
                      {member.skills}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 italic">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {members.slice(4).map((member, i) => (
              <FadeIn key={i + 4} delay={(i + 4) * 0.08}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center h-full">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-100">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-primary">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-accent mb-2">
                    {member.role}
                  </p>
                  {member.skills && (
                    <p className="text-xs text-gray-500 mb-3">
                      {member.skills}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 italic">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <p className="text-center text-gray-500 mt-8 text-sm border border-dashed border-gray-300 rounded-2xl p-6 max-w-md mx-auto">
              {t("team.also")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Client logos */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <FadeIn>
          <p className="text-center text-gray-500 text-lg mb-10">
            {t("logos.title")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60 grayscale">
            {["prinx", "martinus", "optimio", "effectix", "socialmind"].map(
              (logo) => (
                <Image
                  key={logo}
                  src={`/images/logos/${logo}.svg`}
                  alt={logo}
                  width={120}
                  height={40}
                  className="h-8 sm:h-10 w-auto"
                />
              )
            )}
          </div>
        </FadeIn>
      </section>

      {/* Testimonial */}
      <section className="bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <FadeIn>
            <div className="text-center">
              <Quote className="h-10 w-10 text-accent mx-auto mb-6" aria-hidden="true" />
              <blockquote className="text-xl sm:text-2xl text-white leading-relaxed mb-8 font-medium">
                &ldquo;{t("testimonial.quote")}&rdquo;
              </blockquote>
              <p className="text-white font-semibold">
                {t("testimonial.author")}
              </p>
              <p className="text-white/60 text-sm">
                {t("testimonial.role")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values / How we work */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center leading-tight mb-12 max-w-3xl mx-auto">
            {t("values.title")}
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
                <h3 className="text-lg font-bold text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-12">
              {t("caseStudies.title")}
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 h-full">
                  <div className="aspect-video bg-gray-100 relative">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-primary leading-snug">
                      {cs.title}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Media mentions */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-12">
            {t("media.title")}
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-3 gap-6">
          {mediaItems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full flex flex-col hover:border-accent/40 hover:shadow-md transition-all group"
              >
                <div className="h-8 mb-4">
                  <Image
                    src={item.logo}
                    alt={item.source}
                    width={120}
                    height={32}
                    className="h-6 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-primary font-semibold leading-snug flex-1">
                  {item.title}
                </p>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-accent mt-4 self-end transition-colors" aria-hidden="true" />
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary mb-8">
                {t("cta.title")}
              </h2>
              <Link
                href="/demo"
                className="inline-flex items-center px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-dark transition-colors text-lg"
              >
                {t("cta.button")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-5 w-5 text-accent" />
                <h3 className="font-bold text-primary">
                  {t("contact.sales.title")}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{t("contact.sales.text")}</p>
              <p className="text-sm font-semibold text-primary">
                {t("contact.sales.email")}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-accent" />
                <h3 className="font-bold text-primary">
                  {t("contact.address.title")}
                </h3>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {t("contact.address.text")}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="h-5 w-5 text-accent" />
                <h3 className="font-bold text-primary">
                  {t("contact.phone.title")}
                </h3>
              </div>
              <p className="text-sm text-gray-500">{t("contact.phone.text")}</p>
              <p className="text-sm font-semibold text-primary">
                {t("contact.phone.number")}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-accent" />
                <h3 className="font-bold text-primary">
                  {t("contact.invoicing.title")}
                </h3>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {t("contact.invoicing.text")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
