import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

const FLAGS: Record<Exclude<Locale, "ar">, ReactNode> = {
  fr: (
    <>
      <rect width="20" height="40" fill="#0055A4" />
      <rect x="20" width="20" height="40" fill="#FFFFFF" />
      <rect x="40" width="20" height="40" fill="#EF4135" />
    </>
  ),
  en: (
    <>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="13" />
      <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="8" />
    </>
  ),
  de: (
    <>
      <rect width="60" height="14" fill="#000000" />
      <rect y="13.5" width="60" height="13.5" fill="#DD0000" />
      <rect y="27" width="60" height="13" fill="#FFCE00" />
    </>
  ),
};

export function LanguageFlag({ locale, className }: { locale: Locale; className?: string }) {
  const frame = cn(
    "inline-block h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-black/15",
    className,
  );

  if (locale === "ar") {
    return (
      <span
        aria-hidden="true"
        className={cn(
          frame,
          "grid place-items-center bg-brand-light text-[13px] leading-none font-bold text-white",
        )}
      >
        ع
      </span>
    );
  }

  return (
    <span aria-hidden="true" className={frame}>
      <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        {FLAGS[locale]}
      </svg>
    </span>
  );
}