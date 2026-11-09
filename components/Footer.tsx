"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  // snap-end: the scroll container snaps mandatorily, so a footer without its
  // own snap point could not be scrolled into view below the Contacts section.
  return (
    <footer className="snap-end bg-brand px-8 py-5 text-center text-xs text-white/85">
      {t.footer.copyright}
    </footer>
  );
}
