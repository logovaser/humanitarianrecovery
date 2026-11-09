import { en } from "@/lib/i18n/en";
import { uk } from "@/lib/i18n/uk";
import type { Dictionary, Locale } from "@/lib/i18n/types";

export type { Dictionary, Locale };
export { locales } from "@/lib/i18n/types";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  uk,
};

// A cookie, not localStorage: the server reads it to render the visitor's
// language into the HTML, so Ukrainian visitors never see English first.
export const LOCALE_COOKIE = "locale";

export function toLocale(value: string | undefined): Locale {
  return value === "uk" ? "uk" : "en";
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
};
