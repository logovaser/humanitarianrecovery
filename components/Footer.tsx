"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand px-8 py-5 text-center text-xs text-white/85">
      {t.footer.copyright}
    </footer>
  );
}
