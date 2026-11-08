import {
  BookOpenText,
  CalendarDays,
  Clock,
  Mail,
  Moon,
  MoonStar,
  Scale,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CommissionsNav } from "@/components/commissions/commissions-nav";
import { MosqueIcon } from "@/components/home/mosque-icon";
import { PageHeader } from "@/components/page/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";
import { WORSHIP as WORSHIP_CONTENT } from "@/content/commissions/worship";
import { localized } from "@/content/localized";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

const DOMAIN_ICONS = { quran: BookOpenText, fiqh: Scale, sira: ScrollText } as const;
const MOMENT_ICONS = [Clock, Users, MoonStar, Moon, Sparkles, CalendarDays];

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "worship");

function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 ${light ? "text-gold" : "text-brand-light"}`}>
      <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

export default async function WorshipPage(props: LocaleParams) {
  const locale = await initPage(props);
  const WORSHIP = localized(WORSHIP_CONTENT, locale);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("commissions")]);
  const imamEmail = SITE.contact.imamEmail;

  return (
    <>
      <PageHeader
        eyebrow={WORSHIP.eyebrow}
        title={WORSHIP.title}
        lead={WORSHIP.intro[0]}
        crumbs={[{ label: tNav("commissions"), href: "/commissions" }, { label: tNav("worship") }]}
      />
      <CommissionsNav current="/commissions/worship" />

      <div className="space-y-20 pt-12 pb-6">
        {/* Imam */}
        <Container>
          <section className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
            <div>
              <Eyebrow>{WORSHIP.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand sm:text-4xl">
                {WORSHIP.imam.title}
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/90">
                {WORSHIP.imam.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] bg-brand p-8 text-white shadow-xl">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10">
                <MosqueIcon className="h-8 w-8 text-gold" />
              </span>
              <p className="mt-6 font-serif text-xl leading-snug">{WORSHIP.intro[1]}</p>
              {imamEmail ? (
                <a
                  href={`mailto:${imamEmail}`}
                  className={buttonVariants({ variant: "secondary", className: "mt-8 w-full" })}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {t("contactImam")}
                </a>
              ) : null}
              {imamEmail ? (
                <p className="mt-3 text-center text-sm text-white/70">{imamEmail}</p>
              ) : null}
            </aside>
          </section>
        </Container>

        {/* Lessons and teaching domains */}
        <Container>
          <section>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-semibold text-brand sm:text-4xl">
                {WORSHIP.lessons.title}
              </h2>
              <div className="mt-5 space-y-4 text-lg text-ink/85">
                {WORSHIP.lessons.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <ul className="mt-12 grid gap-5 lg:grid-cols-3">
              {WORSHIP.domains.map((domain) => {
                const Icon = DOMAIN_ICONS[domain.key];
                return (
                  <li
                    key={domain.key}
                    className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-brand/10"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-sage text-brand">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl leading-snug font-semibold text-brand">
                      {domain.title}
                    </h3>
                    <div className="mt-4 space-y-3 text-ink/85">
                      {domain.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </Container>

        {/* Key moments of the year */}
        <section className="bg-sage py-16">
          <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>{WORSHIP.eyebrow}</Eyebrow>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand sm:text-4xl">
                {WORSHIP.moments.title}
              </h2>
              <p className="mt-5 text-lg text-ink/85">{WORSHIP.moments.text}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {WORSHIP.moments.items.map((item, index) => {
                const Icon = MOMENT_ICONS[index % MOMENT_ICONS.length];
                return (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-brand/5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-ink">{item}</span>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>

        {/* Close to the faithful + mission */}
        <Container className="space-y-10">
          <section className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-semibold text-brand sm:text-4xl">
              {WORSHIP.close.title}
            </h2>
            <div className="mt-5 space-y-4 text-lg text-ink/85">
              {WORSHIP.close.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] bg-brand p-8 text-white lg:p-14">
            <Eyebrow light>{WORSHIP.eyebrow}</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold sm:text-5xl">
              {WORSHIP.mission.title}
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-lg text-white/85">
              {WORSHIP.mission.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 font-serif text-gold italic">{WORSHIP.mission.signature}</p>
          </section>
        </Container>
      </div>
    </>
  );
}
