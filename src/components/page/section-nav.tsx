import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string };

/** Pill navigation between the pages of one menu section, overlapping the banner. */
export function SectionNav({
  items,
  current,
  label,
}: {
  items: Item[];
  current: string;
  label: string;
}) {
  return (
    <Container className="relative z-10 -mt-7">
      <nav
        aria-label={label}
        className="overflow-x-auto rounded-full bg-white p-1.5 shadow-lg ring-1 shadow-brand/10 ring-brand/5"
      >
        <ul className="flex w-max min-w-full gap-1">
          {items.map((item) => {
            const active = item.href === current;
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-2.5 text-center text-sm font-medium whitespace-nowrap transition-colors",
                    active ? "bg-brand text-white" : "text-ink hover:bg-sage hover:text-brand",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Container>
  );
}
