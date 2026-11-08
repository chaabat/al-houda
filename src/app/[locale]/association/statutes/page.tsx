import { getTranslations } from "next-intl/server";
import { AssociationNav } from "@/components/association/association-nav";
import { LegalDocument } from "@/components/page/legal-document";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { STATUTES } from "@/content/association/statutes";
import { localized } from "@/content/localized";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "statutes");

export default async function StatutesPage(props: LocaleParams) {
  const locale = await initPage(props);
  const doc = localized(STATUTES, locale);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={tNav("statutes")}
        lead={doc.adopted}
        crumbs={[{ label: tNav("association"), href: "/association" }, { label: tNav("statutes") }]}
      />
      <AssociationNav current="/association/statutes" />
      <Container className="py-14">
        <LegalDocument doc={doc} />
      </Container>
    </>
  );
}
