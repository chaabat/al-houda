import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { NavKey } from "@/config/navigation";
import { routing } from "@/i18n/routing";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Validates the locale of a static page and enables static rendering for it. */
export async function initPage({ params }: LocaleParams) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

/** Page <title> taken from the menu label of the page. */
export async function navMetadata({ params }: LocaleParams, key: NavKey): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t(key) };
}
