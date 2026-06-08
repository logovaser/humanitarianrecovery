"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dictionaries, type Dictionary, type Locale, locales } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && locales.includes(stored as Locale)) {
      setLocaleState(stored as Locale);
    }
  }, []);

  useEffect(() => {
    const dictionary = dictionaries[locale];
    document.documentElement.lang = locale === "uk" ? "uk" : "en";
    document.title = dictionary.meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", dictionary.meta.description);
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
