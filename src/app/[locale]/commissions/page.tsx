import { ArrowRight, HeartHandshake, ShieldCheck, Wrench } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CommissionsNav } from "@/components/commissions/commissions-nav";
import { MosqueIcon } from "@/components/home/mosque-icon";
import { FrenchOnlyNote } from "@/components/page/french-only-note";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { COMMISSIONS_OVERVIEW } from "@/content/commissions/overview";
import { Link } from "@/i18n/navigation";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

const COMMISSIONS = [
  { key: "worship", href: "/commissions/worship", Icon: MosqueIcon },
  { key: "women", href: "/commissions/women", Icon: HeartHandshake },
  { key: "maintenance", href: "/commissions/maintenance", Icon: Wrench },
  { key: "security", href: "/commissions/security", Icon: ShieldCheck },
] as const;

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "commissions");

export default async function CommissionsPage(props: LocaleParams) {
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("commissions")]);

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={<span lang="fr">{COMMISSIONS_OVERVIEW.intro}</span>}
        crumbs={[{ label: tNav("commissions") }]}
      />
      <CommissionsNav current="/commissions" />

      <Container className="space-y-14 py-14">
        <FrenchOnlyNote />

        <ul className="grid gap-5 md:grid-cols-2">
          {COMMISSIONS.map(({ key, href, Icon }) => {
            const ready = key === "worship";
            return (
              <li key={key}>
                <Link
                  href={href}
                  className="group flex h-full gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand/10 transition hover:-translate-y-0.5 hover:shadow-lg lg:p-8"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-serif text-2xl font-semibold text-brand">
                        {tNav(key)}
                      </span>
                      {!ready ? (
                        <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-medium text-ink">
                          {t("soonBadge")}
                        </span>
                      ) : null}
                    </span>
                    <span lang="fr" className="mt-2 flex-1 text-ink/75">
                      {ready ? COMMISSIONS_OVERVIEW.commissions.worship : t("soonCard")}
                    </span>
                    <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand">
                      {t("readMore")}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <section
          lang="fr"
          dir="ltr"
          className="grid gap-5 rounded-[2rem] bg-brand p-8 text-white md:grid-cols-3 lg:p-12"
        >
          {COMMISSIONS_OVERVIEW.points.map((point) => (
            <div key={point.title}>
              <p className="font-serif text-xl font-semibold text-gold">{point.title}</p>
              <p className="mt-2 text-sm text-white/85">{point.text}</p>
            </div>
          ))}
        </section>
      </Container>
    </>
  );
}
