import { getTranslations } from "next-intl/server";
import { NAV, type NavKey } from "@/config/navigation";
import { SectionNav } from "./section-nav";

type Props = {
  /** Top-level menu entry whose children become the pills. */
  section: NavKey;
  current: string;
  overviewLabel: string;
  label: string;
  /** Optional shorter labels for some pills. */
  short?: Partial<Record<NavKey, string>>;
};

/** Sub-menu of a menu section ("Notre association", "Commissions"…), built from the main menu config. */
export async function MenuSectionNav({ section, current, overviewLabel, label, short }: Props) {
  const tNav = await getTranslations("nav");
  const entry = NAV.find((item) => item.key === section);
  if (!entry) return null;

  const items = [
    { href: entry.href, label: overviewLabel },
    ...(entry.children ?? [])
      .filter((child) => !child.external)
      .map((child) => ({ href: child.href, label: short?.[child.key] ?? tNav(child.key) })),
  ];

  return <SectionNav items={items} current={current} label={label} />;
}
