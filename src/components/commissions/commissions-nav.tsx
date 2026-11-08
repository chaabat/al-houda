import { getTranslations } from "next-intl/server";
import { MenuSectionNav } from "@/components/page/menu-section-nav";

/** Sub-menu shared by all "Commissions" pages. */
export async function CommissionsNav({ current }: { current: string }) {
  const t = await getTranslations("commissions");
  return (
    <MenuSectionNav
      section="commissions"
      current={current}
      overviewLabel={t("overview")}
      label={t("sectionNav")}
    />
  );
}
