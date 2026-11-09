"use client";

import { useLanguage } from "@/components/LanguageProvider";

const FOUNDED = 2022;

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand px-8 py-5 text-center text-sm font-semibold text-white">
      © {FOUNDED}-{new Date().getFullYear()} {t.footer.copyright}
    </footer>
  );
}
