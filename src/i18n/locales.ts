export const LOCALES = ["fr", "ar", "en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
  de: "Deutsch",
};

const RTL_LOCALES: readonly string[] = ["ar"];

export function isRtl(locale: string): boolean {
  return RTL_LOCALES.includes(locale);
}
