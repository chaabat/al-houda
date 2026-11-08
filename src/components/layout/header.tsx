import { ChevronDown, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { NAV } from "@/config/navigation";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

export async function Header() {
  const [tNav, tA11y, tHeader] = await Promise.all([
    getTranslations("nav"),
    getTranslations("a11y"),
    getTranslations("header"),
  ]);

  const items = NAV.map((item) => ({
    href: item.href,
    label: tNav(item.key),
    children: item.children?.map((child) => ({
      href: child.href,
      label: tNav(child.key),
      external: child.external,
    })),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-white/95 shadow-sm backdrop-blur">
      <Container className="flex items-center gap-4">
        {/* The logo hangs below the bar like a tab, as on the mockup (desktop only). */}
        <Link
          href="/"
          aria-label={tHeader("home")}
          className="relative z-10 shrink-0 py-2 lg:-mb-5 lg:rounded-b-3xl lg:bg-white lg:px-5 lg:pt-3 lg:pb-4 lg:shadow-lg lg:ring-1 lg:ring-brand/5"
        >
          <Logo />
        </Link>

        <nav aria-label={tA11y("mainNavigation")} className="hidden flex-1 xl:block">
          <ul className="flex items-center justify-center gap-0.5 xl:gap-1">
            {items.map((item) => (
              <li key={item.href} className="group relative">
                <NavLink href={item.href}>
                  {item.label}
                  {item.children ? (
                    <ChevronDown
                      className="h-4 w-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  ) : null}
                </NavLink>

                {item.children ? (
                  <div className="invisible absolute start-0 top-full z-50 min-w-56 pt-2 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-2xl border border-brand/10 bg-white p-2 shadow-xl">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          {child.external ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-ink hover:bg-sage hover:text-brand"
                            >
                              {child.label}
                              <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                            </a>
                          ) : (
                            <Link
                              href={child.href}
                              className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-sage hover:text-brand"
                            >
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 xl:ms-0">
          <div className="hidden xl:block">
            <LanguageSwitcher label={tA11y("language")} />
          </div>
          <MobileNav
            items={items}
            labels={{
              nav: tA11y("mainNavigation"),
              open: tA11y("openMenu"),
              close: tA11y("closeMenu"),
              language: tA11y("language"),
            }}
          />
        </div>
      </Container>
    </header>
  );
}
