import type { en } from "@/lib/i18n/en";

export type Locale = "en" | "uk";

export const locales: Locale[] = ["en", "uk"];

type DeepString<T> = T extends string
  ? string
  : T extends readonly string[]
    ? readonly string[]
    : { [K in keyof T]: DeepString<T[K]> };

export type Dictionary = DeepString<typeof en>;
