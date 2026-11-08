"use client";

import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { isExternal, SmartLink } from "@/components/ui/smart-link";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const external = isExternal(href);
  const active =
    !external &&
    (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <SmartLink
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors xl:px-3.5",
        active ? "bg-brand text-white" : "text-ink hover:bg-sage hover:text-brand",
        className,
      )}
    >
      {children}
      {external ? <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden="true" /> : null}
    </SmartLink>
  );
}
