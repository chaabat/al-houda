import { HeartHandshake, Sprout, TrendingUp, UsersRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FrenchOnlyNote } from "@/components/page/french-only-note";
import { PageHeader } from "@/components/page/page-header";
import { TeachingCtas } from "@/components/teaching/teaching-ctas";
import { TeachingNav } from "@/components/teaching/teaching-nav";
import { Container } from "@/components/ui/container";
import { TEACHING } from "@/content/teaching/overview";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

const VALUE_ICONS = [HeartHandshake, Sprout, TrendingUp];

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "teachers");

export default async function TeamPage(props: LocaleParams) {
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("teaching")]);

  return (
    <>
      <PageHeader
        eyebrow={TEACHING.eyebrow}
        title={tNav("teachers")}
        crumbs={[{ label: tNav("teaching"), href: "/teaching" }, { label: tNav("teachers") }]}
      >
        <TeachingCtas />
      </PageHeader>
      <TeachingNav current="/teaching/team" />

      <Container className="space-y-10 py-14">
        <FrenchOnlyNote />

        <section
          lang="fr"
          dir="ltr"
          className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16"
        >
          <div>
            <h2 className="font-serif text-3xl font-semibold text-brand sm:text-4xl">
              {TEACHING.team.title}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/90">
              {TEACHING.team.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <ul className="space-y-3">
            {TEACHING.team.values.map((value, index) => {
              const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
              return (
                <li
                  key={value}
                  className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brand/10"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-xl font-semibold text-brand">{value}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="mx-auto max-w-2xl rounded-[2rem] bg-sage p-10 text-center ring-1 ring-brand/10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-brand">
            <UsersRound className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-4 text-ink/80">{t("teamUi.soon")}</p>
        </div>
      </Container>
    </>
  );
}
