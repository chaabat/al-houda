"use client";

import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SmartLink } from "@/components/ui/smart-link";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";

export type MobileNavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string; external?: boolean }[];
};

type Props = {
  items: MobileNavItem[];
  labels: { nav: string; open: string; close: string; language: string };
};

export function MobileNav({ items, labels }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Close and unlock scrolling if the window becomes wide enough for the desktop menu.
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = "";
    };
  }, [open]);

  const rowClass = "block rounded-xl px-3 py-3 font-medium text-ink hover:bg-sage";

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="grid h-11 w-11 place-items-center rounded-full text-brand hover:bg-sage"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Tapping outside the panel closes the menu. */}
      {open ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className="absolute inset-x-0 top-full h-dvh bg-ink/40"
        />
      ) : null}

      <nav
        id="mobile-nav"
        aria-label={labels.nav}
        hidden={!open}
        className="absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-brand/10 bg-white shadow-xl"
      >
        <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4">
          {items.map((item) => (
            <li key={item.href}>
              {item.children ? (
                <details className="group">
                  <summary
                    className={`${rowClass} flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden`}
                  >
                    {item.label}
                    <ChevronDown
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <ul className="ms-3 border-s border-brand/15 ps-3 pb-2">
                    {[{ href: item.href, label: item.label }, ...item.children].map((child) => (
                      <li key={child.href}>
                        {"external" in child && child.external ? (
                          <a
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={close}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-sage"
                          >
                            {child.label}
                            <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                          </a>
                        ) : (
                          <Link
                            href={child.href}
                            onClick={close}
                            className="block rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-sage"
                          >
                            {child.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <SmartLink href={item.href} onClick={close} className={rowClass}>
                  {item.label}
                </SmartLink>
              )}
            </li>
          ))}

          <li className="space-y-3 px-3 pt-4">
            <LanguageSwitcher label={labels.language} variant="inline" onChange={close} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
