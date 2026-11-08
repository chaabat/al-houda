import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";

/** Content written in each of the site's 4 languages. */
export type Localized<T> = Record<Locale, T>;

/** Content in the page's language (French if the language is unknown). */
export function localized<T>(content: Localized<T>, locale: string): T {
  return content[locale as Locale] ?? content[DEFAULT_LOCALE];
}
