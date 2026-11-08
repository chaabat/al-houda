import { Languages } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

/** Shown on pages whose content only exists in French for now. Hidden in French. */
export async function FrenchOnlyNote() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("page")]);
  if (locale === "fr") return null;

  return (
    <p className="flex items-center gap-2 rounded-2xl bg-gold/15 px-4 py-3 text-sm text-ink">
      <Languages className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
      {t("frenchOnly")}
    </p>
  );
}
