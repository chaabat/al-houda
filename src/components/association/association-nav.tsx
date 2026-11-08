import { getTranslations } from "next-intl/server";
import { MenuSectionNav } from "@/components/page/menu-section-nav";

/** Sub-menu shared by all "Notre association" pages. */
export async function AssociationNav({ current }: { current: string }) {
  const t = await getTranslations("association");
  return (
    <MenuSectionNav
      section="association"
      current={current}
      overviewLabel={t("overview")}
      label={t("sectionNav")}
      short={{ editorial: t("editorialShort") }}
    />
  );
}
