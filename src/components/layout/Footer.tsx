import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import LocaleSwitcher from "@/components/ui/LocaleSwitcher";
function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="https://www.behavera.com/logo-behavera.png"
              alt="Behavera"
              width={140}
              height={32}
              className="h-8 w-auto brightness-0 invert mb-4"
            />
            <p className="text-gray-300 text-sm max-w-xs">{tNav("claim")}</p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/company/behavera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://instagram.com/behavera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com/behavera"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t("product")}</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <a
                  href="https://app.behavera.com"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  {t("productLinks.app")}
                </a>
              </li>
              <li>
                <Link
                  href="/jak-to-funguje"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  {t("productLinks.howItWorks")}
                </Link>
              </li>
              <li>
                <Link
                  href="/cenik"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  {t("productLinks.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  {t("productLinks.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t("company")}</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link
                  href="/o-nas"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  {t("companyLinks.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/pripadovky"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  {t("companyLinks.caseStudies")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  {t("companyLinks.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support + Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t("contact")}</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:hello@behavera.com"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  hello@behavera.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+420605839456"
                  className="inline-block py-1.5 hover:text-white transition-colors"
                >
                  +420 605 839 456
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-gray-400" style={{ fontSize: "12px" }}>
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            GDPR compliant
          </span>
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ISO 27001
          </span>
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            AES-256
          </span>
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Data v EU
          </span>
          <span className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3 py-1">
            <span className="text-yellow-400">★</span>
            4.8/5 G2
          </span>
          <span className="inline-flex items-center gap-2 border border-white/10 rounded-full px-3 py-1">
            <span className="text-yellow-400">★</span>
            4.7/5 Capterra
          </span>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 Behavera s.r.o. | IČO: 03525520</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2">
            <Link href="/bezpecnost" className="hover:text-white transition-colors">
              {t("supportLinks.security")}
            </Link>
            <Link href="/obchodni-podminky" className="hover:text-white transition-colors">
              {t("supportLinks.terms")}
            </Link>
            <Link href="/ochrana-udaju" className="hover:text-white transition-colors">
              {t("supportLinks.privacy")}
            </Link>
            <div className="border-l border-white/10 pl-4 ml-1">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
