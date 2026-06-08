"use client";

import { localeLabels, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      className="flex items-center rounded-full bg-white/15 p-1"
      role="group"
      aria-label={t.common.languageSwitcherLabel}
    >
      {(["en", "uk"] as const satisfies Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
            locale === code
              ? "bg-white text-brand shadow-sm"
              : "text-white/85 hover:bg-white/10"
          }`}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );
}
