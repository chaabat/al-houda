import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

export const isExternal = (href: string) => /^https?:\/\//.test(href);

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/** Internal links stay localized (next-intl); external ones (HelloAsso…) open in a new tab. */
export function SmartLink({ href, children, ...props }: Props) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
