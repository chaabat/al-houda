import { getTranslations } from "next-intl/server";
import { MenuSectionNav } from "@/components/page/menu-section-nav";

/** Sub-menu shared by all "Pôle enseignement" pages (the external portal stays in the main menu). */
export async function TeachingNav({ current }: { current: string }) {
  const t = await getTranslations("teaching");
  return (
    <MenuSectionNav
      section="teaching"
      current={current}
      overviewLabel={t("overview")}
      label={t("sectionNav")}
    />
  );
}
