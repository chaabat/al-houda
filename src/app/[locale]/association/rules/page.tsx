import { getTranslations } from "next-intl/server";
import { AssociationNav } from "@/components/association/association-nav";
import { LegalDocument } from "@/components/page/legal-document";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { INTERNAL_RULES } from "@/content/association/rules";
import { localized } from "@/content/localized";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "rules");

export default async function RulesPage(props: LocaleParams) {
  const locale = await initPage(props);
  const doc = localized(INTERNAL_RULES, locale);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={tNav("rules")}
        lead={doc.adopted}
        crumbs={[{ label: tNav("association"), href: "/association" }, { label: tNav("rules") }]}
      />
      <AssociationNav current="/association/rules" />
      <Container className="py-14">
        <LegalDocument doc={doc} />
      </Container>
    </>
  );
}
