"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import hrLogo from "@/images/HR logo 2.svg";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/gallery", label: t.header.gallery },
    { href: "/education-request", label: t.header.educationRequest },
    { href: "/", label: t.header.events },
  ];

  // The panel covers the page, so Escape has to dismiss it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed left-0 top-0 z-30 w-full bg-brand font-bold text-white shadow-2xl">
      <div className="flex h-[var(--header-height)] items-center justify-between px-5 sm:px-8">
        <Link href="/" onClick={() => setOpen(false)}>
          {/* Narrower on phones: at 164px the logo, switcher and button together
              overrun a 375px screen. */}
          <Image
            src={hrLogo.src}
            alt={t.common.logoAlt}
            width={491}
            height={160}
            className="h-auto w-[132px] md:w-[164px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="p-4">
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* The switcher stays out of the panel: on a bilingual site, changing
            language should not be two taps deep. */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/15"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/15 px-5 pb-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-4 last:border-b-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
