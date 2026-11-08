import { ExternalLink, HandHeart, Hammer } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AssociationNav } from "@/components/association/association-nav";
import { PageHeader } from "@/components/page/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "projects");

export default async function ProjectsPage(props: LocaleParams) {
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);
  const helloasso = SITE.links.helloasso;

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={tNav("projects")}
        crumbs={[{ label: tNav("association"), href: "/association" }, { label: tNav("projects") }]}
      />
      <AssociationNav current="/association/projects" />

      <Container className="py-14">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-brand/10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage text-brand">
            <Hammer className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-brand">
            {t("projectsUi.soon")}
          </h2>
          <p className="mt-3 text-ink/75">{t("projectsUi.support")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {helloasso ? (
              <a
                href={helloasso}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <HandHeart className="h-4 w-4" aria-hidden="true" />
                {t("projectsUi.donate")}
                <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </>
  );
}
