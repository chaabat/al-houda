"use client";

import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useId, useRef, useState, useTransition, type KeyboardEvent } from "react";
import { LOCALE_NAMES, LOCALES, type Locale } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageFlag } from "./language-flag";

type Props = {
  label: string;
  variant?: "dropdown" | "inline";
  onChange?: () => void;
};

export function LanguageSwitcher({ label, variant = "dropdown", onChange }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const change = (code: Locale) => {
    setOpen(false);
    onChange?.();
    if (code === locale) return;
    startTransition(() => router.replace(pathname, { locale: code }));
  };

  useEffect(() => {
    if (!open) return;

    rootRef.current?.querySelector<HTMLButtonElement>("[aria-current='true']")?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      rootRef.current?.querySelector<HTMLButtonElement>("[aria-controls]")?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onMenuKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();

    const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % items.length
        : (index - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  if (variant === "inline") {
    return (
      <ul aria-label={label} className="flex flex-wrap items-center gap-2">
        {LOCALES.map((code) => (
          <li key={code}>
            <button
              type="button"
              lang={code}
              aria-label={LOCALE_NAMES[code]}
              aria-current={code === locale ? "true" : undefined}
              disabled={isPending}
              onClick={() => change(code)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                code === locale
                  ? "border-brand bg-brand text-white"
                  : "border-brand/15 bg-white text-ink hover:bg-sage",
              )}
            >
              <LanguageFlag locale={code} />
              <span className="uppercase">{code}</span>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={`${label}: ${LOCALE_NAMES[locale]}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-busy={isPending}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-sage"
      >
        <LanguageFlag locale={locale} />
        <span className="uppercase">{locale}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          id={menuId}
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className="absolute end-0 top-full z-50 mt-2 w-48 rounded-2xl border border-brand/10 bg-white p-1.5 shadow-xl"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                lang={code}
                aria-current={code === locale ? "true" : undefined}
                disabled={isPending}
                onClick={() => change(code)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-start text-sm transition-colors hover:bg-sage",
                  code === locale ? "font-semibold text-brand" : "text-ink",
                )}
              >
                <LanguageFlag locale={code} />
                <span>{LOCALE_NAMES[code]}</span>
                {code === locale ? (
                  <Check className="ms-auto h-4 w-4 text-brand" aria-hidden="true" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}