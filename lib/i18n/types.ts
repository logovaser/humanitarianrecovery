import type { en } from "@/lib/i18n/en";

export type Locale = "en" | "uk";

export const locales: Locale[] = ["en", "uk"];

export type Dictionary = {
  [K in keyof typeof en]: (typeof en)[K] extends string
    ? string
    : (typeof en)[K] extends readonly string[]
      ? readonly string[]
      : {
          [P in keyof (typeof en)[K]]: (typeof en)[K][P] extends string
            ? string
            : (typeof en)[K][P] extends readonly string[]
              ? readonly string[]
              : {
                  [Q in keyof (typeof en)[K][P]]: (typeof en)[K][P][Q] extends string
                    ? string
                    : (typeof en)[K][P][Q] extends readonly string[]
                      ? readonly string[]
                      : {
                          [R in keyof (typeof en)[K][P][Q]]: (typeof en)[K][P][Q][R] extends string
                            ? string
                            : (typeof en)[K][P][Q][R] extends readonly string[]
                              ? readonly string[]
                              : string;
                        };
                };
        };
};
