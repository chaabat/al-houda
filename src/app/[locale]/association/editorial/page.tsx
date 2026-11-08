import { Quote } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AssociationNav } from "@/components/association/association-nav";
import { FrenchOnlyNote } from "@/components/page/french-only-note";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { EDITORIAL } from "@/content/association/editorial";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "editorial");

export default async function EditorialPage(props: LocaleParams) {
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);

  return (
    <>
      <PageHeader
        eyebrow={t("editorialShort")}
        title={EDITORIAL.title}
        crumbs={[
          { label: tNav("association"), href: "/association" },
          { label: t("editorialShort") },
        ]}
      />
      <AssociationNav current="/association/editorial" />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-16">
          <figure className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[2rem] bg-sage shadow-xl ring-1 ring-brand/10">
              <Image
                src={EDITORIAL.photo}
                alt={`${EDITORIAL.signature.role}, ${EDITORIAL.signature.name}`}
                width={540}
                height={810}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="block font-serif text-xl font-semibold text-brand">
                {EDITORIAL.signature.name}
              </span>
              <span className="text-sm text-ink/70">{EDITORIAL.signature.role}</span>
            </figcaption>
          </figure>

          <div className="space-y-6">
            <FrenchOnlyNote />
            <blockquote
              lang="fr"
              dir="ltr"
              className="relative rounded-3xl bg-brand p-8 text-white shadow-lg"
            >
              <Quote
                className="absolute start-6 -top-4 h-9 w-9 rounded-full bg-gold p-2 text-ink"
                aria-hidden="true"
              />
              <p className="font-serif text-2xl leading-snug">{EDITORIAL.quote}</p>
            </blockquote>
            <div lang="fr" dir="ltr" className="space-y-5 text-lg leading-relaxed text-ink/90">
              {EDITORIAL.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <p className="border-t border-brand/10 pt-6 font-serif text-lg text-brand">
              {EDITORIAL.signature.role}
              <br />
              <span className="font-semibold">{EDITORIAL.signature.name}</span>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
