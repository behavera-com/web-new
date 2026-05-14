"use client";

import { useEffect, useState } from "react";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import PhoneIcon from "../ui/PhoneIcon";
import EnvelopeIcon from "../ui/EnvelopeIcon";
import type { Rep } from "../sections/RepCard";

type Link = { href: string; label: string };

const LINKS: Link[] = [
  { href: "#proc", label: "Proč Behavera" },
  { href: "#produkt", label: "Co děláme" },
  { href: "#demo", label: "Demo" },
  { href: "#report", label: "Report zdarma" },
  { href: "#cases", label: "Případové studie" },
  { href: "#how", label: "Jak to funguje" },
  { href: "#faq", label: "FAQ" },
  { href: "#consult", label: "Kontakt" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

export default function MobileMenu({
  phone,
  email,
  rep,
}: {
  phone: string;
  email: string;
  rep: Rep;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);
  const hasPhone = phone.trim().length > 0;
  const telHref = hasPhone ? `tel:${phone.replace(/\s/g, "")}` : undefined;

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        aria-expanded={open}
        aria-controls="sj-mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className={`sj-menu-trigger lg:hidden ${open ? "is-open" : ""}`}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        aria-hidden={!open}
        onClick={close}
        className={`sj-menu-overlay ${open ? "is-open" : ""}`}
      />

      <aside
        id="sj-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Hlavní menu"
        className={`sj-menu-panel ${open ? "is-open" : ""}`}
      >
        <button
          type="button"
          aria-label="Zavřít menu"
          onClick={close}
          className="sj-menu-close"
        >
          ×
        </button>

        <nav className="sj-menu-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="sj-menu-contact">
          <div className="sj-menu-contact-head">
            {rep.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={rep.photo}
                alt=""
                width={44}
                height={44}
                className="sj-menu-contact-photo"
              />
            ) : (
              <span className="sj-menu-contact-photo sj-menu-contact-initials">
                {initials(rep.name)}
              </span>
            )}
            <div>
              <div className="sj-menu-contact-name">{rep.name}</div>
              <div className="sj-menu-contact-role">{rep.title}</div>
            </div>
          </div>
          <div className="sj-menu-contact-links">
            {hasPhone && (
              <a href={telHref} onClick={close}>
                <span className="sj-menu-contact-icon">
                  <PhoneIcon size={14} />
                </span>
                {phone}
              </a>
            )}
            <a href={`mailto:${email}`} onClick={close}>
              <span className="sj-menu-contact-icon">
                <EnvelopeIcon size={14} />
              </span>
              {email}
            </a>
          </div>
        </div>

        <a
          href="#consult"
          onClick={close}
          className="sj-btn-primary sj-menu-cta"
        >
          Domluvit konzultaci
          <ArrowRightIcon />
        </a>
      </aside>
    </>
  );
}
