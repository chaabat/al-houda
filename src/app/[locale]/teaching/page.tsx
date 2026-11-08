import {
  Award,
  BookOpenText,
  Languages,
  MonitorSmartphone,
  MoonStar,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FrenchOnlyNote } from "@/components/page/french-only-note";
import { PageHeader } from "@/components/page/page-header";
import { TeachingCtas } from "@/components/teaching/teaching-ctas";
import { TeachingNav } from "@/components/teaching/teaching-nav";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SmartLink } from "@/components/ui/smart-link";
import { REGISTRATION_URL, SITE } from "@/config/site";
import { TEACHING } from "@/content/teaching/overview";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

const SUBJECT_ICONS = { arabic: Languages, quran: BookOpenText } as const;

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "teaching");

function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 ${light ? "text-gold" : "text-brand-light"}`}>
      <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

export default async function TeachingPage(props: LocaleParams) {
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("teaching")]);
  const portal = SITE.links.teachingPortal;

  return (
    <>
      <PageHeader
        eyebrow={TEACHING.eyebrow}
        title={TEACHING.title}
        lead={<span lang="fr">{TEACHING.intro}</span>}
        crumbs={[{ label: tNav("teaching") }]}
      >
        <TeachingCtas />
      </PageHeader>
      <TeachingNav current="/teaching" />

      <Container className="pt-12">
        <FrenchOnlyNote />
      </Container>

      <div lang="fr" dir="ltr" className="space-y-20 pt-8">
        {/* Key figures + trust */}
        <Container>
          <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {TEACHING.stats.map((stat, index) => (
                <li
                  key={stat.label}
                  className={`flex items-center gap-5 rounded-3xl p-6 shadow-sm ring-1 ring-brand/10 ${index === 0 ? "bg-brand text-white" : "bg-white"}`}
                >
                  <span
                    className={`font-serif text-5xl font-semibold ${index === 0 ? "text-gold" : "text-brand"}`}
                  >
                    {stat.value}
                  </span>
                  <span className={index === 0 ? "text-white/85" : "text-ink/75"}>
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
            <div>
              <Eyebrow>{TEACHING.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand sm:text-4xl">
                {TEACHING.trust.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink/90">{TEACHING.trust.text}</p>
            </div>
          </section>
        </Container>

        {/* Program */}
        <section className="bg-sage py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-semibold text-brand sm:text-4xl">
                {TEACHING.program.title}
              </h2>
              <p className="mt-5 text-lg text-ink/85">{TEACHING.program.intro}</p>
            </div>
            <ul className="mt-10 grid gap-5 lg:grid-cols-2">
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
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand">
                      {subject.title}
                    </h3>
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
            <blockquote className="mx-auto mt-10 max-w-3xl text-center font-serif text-2xl leading-snug text-brand">
              « {TEACHING.program.goal} »
            </blockquote>
          </Container>
        </section>

        {/* Team + religious knowledge */}
        <Container>
          <section className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-brand/10 lg:p-10">
              <Eyebrow>{TEACHING.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand">
                {TEACHING.team.title}
              </h2>
              <div className="mt-5 space-y-4 text-ink/85">
                {TEACHING.team.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {TEACHING.team.values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] bg-brand p-8 text-white shadow-lg lg:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
                <MoonStar className="h-6 w-6 text-gold" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-semibold">{TEACHING.religion.title}</h2>
              <p className="mt-4 text-white/85">{TEACHING.religion.text}</p>
            </div>
          </section>
        </Container>

        {/* Digital */}
        <Container>
          <section className="grid items-center gap-10 rounded-[2rem] bg-sage p-8 ring-1 ring-brand/10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12 lg:p-12">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-white text-brand shadow-sm">
              <MonitorSmartphone className="h-11 w-11" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-serif text-3xl font-semibold text-brand">
                {TEACHING.digital.title}
              </h2>
              <div className="mt-4 space-y-4 text-ink/85">
                {TEACHING.digital.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              {portal ? (
                <a
                  href={portal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ className: "mt-6" })}
                >
                  {t("portalCta")}
                </a>
              ) : null}
            </div>
          </section>
        </Container>

        {/* Motivation */}
        <Container>
          <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
            <div>
              <Eyebrow>{TEACHING.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand sm:text-4xl">
                {TEACHING.motivation.title}
              </h2>
              <div className="mt-5 space-y-4 text-lg text-ink/85">
                {TEACHING.motivation.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <aside className="relative overflow-hidden rounded-[2rem] bg-gold p-8 text-ink shadow-lg">
              <Sparkles
                className="absolute -end-4 -top-4 h-28 w-28 text-white/30"
                aria-hidden="true"
              />
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-gold">
                <Award className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-semibold text-brand">
                {TEACHING.motivation.highlight.title}
              </h3>
              <p className="mt-3">{TEACHING.motivation.highlight.text}</p>
            </aside>
          </section>
        </Container>

        {/* Closing */}
        <Container>
          <section className="rounded-[2rem] bg-brand p-8 text-white lg:p-14">
            <Eyebrow light>{TEACHING.eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold sm:text-5xl">
              {TEACHING.closing.title}
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-white/85">{TEACHING.closing.text}</p>
            <p className="mt-6 font-serif text-gold italic">{TEACHING.closing.signature}</p>
            <SmartLink
              href={REGISTRATION_URL}
              className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-8" })}
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              {t("registerCta")}
            </SmartLink>
          </section>
        </Container>
      </div>
    </>
  );
}
