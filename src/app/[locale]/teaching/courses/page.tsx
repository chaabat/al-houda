import { BookOpenText, Languages, UserPlus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/page/page-header";
import { TeachingCtas } from "@/components/teaching/teaching-ctas";
import { TeachingNav } from "@/components/teaching/teaching-nav";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SmartLink } from "@/components/ui/smart-link";
import { REGISTRATION_URL } from "@/config/site";
import { TEACHING } from "@/content/teaching/overview";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

const SUBJECT_ICONS = { arabic: Languages, quran: BookOpenText } as const;

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "courses");

export default async function CoursesPage(props: LocaleParams) {
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("teaching")]);

  return (
    <>
      <PageHeader
        eyebrow={TEACHING.eyebrow}
        title={tNav("courses")}
        lead={<span lang="fr">{TEACHING.program.intro}</span>}
        crumbs={[{ label: tNav("teaching"), href: "/teaching" }, { label: tNav("courses") }]}
      >
        <TeachingCtas />
      </PageHeader>
      <TeachingNav current="/teaching/courses" />

      <Container className="space-y-10 py-14">
        {/* The two subjects of the programme (edit src/content/teaching/overview.ts). */}
        <ul lang="fr" dir="ltr" className="grid gap-5 lg:grid-cols-2">
          {TEACHING.program.subjects.map((subject) => {
            const Icon = SUBJECT_ICONS[subject.key as keyof typeof SUBJECT_ICONS];
            return (
              <li
                key={subject.key}
                className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand/10"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-gold">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-serif text-2xl font-semibold text-brand">
                  {subject.title}
                </h2>
                <p className="mt-3 text-ink/85">{subject.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {subject.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col items-start gap-5 rounded-[2rem] bg-sage p-8 ring-1 ring-brand/10 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <p className="max-w-xl font-serif text-2xl text-brand">{t("coursesUi.schedulesSoon")}</p>
          <SmartLink href={REGISTRATION_URL} className={buttonVariants({ size: "lg" })}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            {t("registerCta")}
          </SmartLink>
        </div>
      </Container>
    </>
  );
}
