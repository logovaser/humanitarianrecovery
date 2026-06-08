import { en } from "@/lib/i18n/en";
import { uk } from "@/lib/i18n/uk";
import type { Dictionary, Locale } from "@/lib/i18n/types";

export type { Dictionary, Locale };
export { locales } from "@/lib/i18n/types";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  uk,
};

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
};
