import { ArrowRight, HandHeart, Landmark, Megaphone, ScrollText, UserPlus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AssociationNav } from "@/components/association/association-nav";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { OVERVIEW } from "@/content/association/overview";
import { localized } from "@/content/localized";
import { Link } from "@/i18n/navigation";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

const PAGES = [
  { key: "membership", href: "/association/membership", Icon: UserPlus },
  { key: "editorial", href: "/association/editorial", Icon: Megaphone },
  { key: "statutes", href: "/association/statutes", Icon: Landmark },
  { key: "rules", href: "/association/rules", Icon: ScrollText },
  { key: "projects", href: "/association/projects", Icon: HandHeart },
] as const;

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "association");

export default async function AssociationPage(props: LocaleParams) {
  const locale = await initPage(props);
  const overview = localized(OVERVIEW, locale);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title="Association Al-Houda"
        lead={overview.intro}
        crumbs={[{ label: tNav("association") }]}
      />
      <AssociationNav current="/association" />

      <Container className="space-y-14 py-14">
        <div className="space-y-14">
          <section aria-labelledby="facts-title">
            <h2 id="facts-title" className="sr-only">
              {t("keyFacts")}
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {overview.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand/10"
                >
                  <dt className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                    {fact.label}
                  </dt>
                  <dd
                    dir="auto"
                    className="mt-2 font-serif text-xl font-semibold text-brand rtl:text-right"
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="pages-title">
            <h2 id="pages-title" className="font-serif text-3xl font-semibold text-brand">
              {t("discover")}
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PAGES.map(({ key, href, Icon }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand/10 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white transition-colors group-hover:bg-gold group-hover:text-ink">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="mt-4 font-serif text-xl font-semibold text-brand">
                      {key === "editorial" ? t("editorialShort") : tNav(key)}
                    </span>
                    <span className="mt-1 flex-1 text-sm text-ink/75">{overview.pages[key]}</span>
                    <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand">
                      {t("readMore")}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="values-title"
            className="rounded-[2rem] bg-brand p-8 text-white lg:p-12"
          >
            <p className="flex items-center gap-3 text-gold">
              <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
              Association Al-Houda
            </p>
            <h2 id="values-title" className="mt-3 font-serif text-3xl font-semibold">
              {t("ourValues")}
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {overview.values.map((value) => (
                <li key={value.title} className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="font-serif text-xl font-semibold text-gold">{value.title}</p>
                  <p className="mt-2 text-sm text-white/85">{value.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
