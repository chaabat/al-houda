import { Quote } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AssociationNav } from "@/components/association/association-nav";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { EDITORIAL, EDITORIAL_PHOTO } from "@/content/association/editorial";
import { localized } from "@/content/localized";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "editorial");

export default async function EditorialPage(props: LocaleParams) {
  const locale = await initPage(props);
  const editorial = localized(EDITORIAL, locale);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);

  return (
    <>
      <PageHeader
        eyebrow={t("editorialShort")}
        title={editorial.title}
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
                src={EDITORIAL_PHOTO}
                alt={`${editorial.signature.role}, ${editorial.signature.name}`}
                width={540}
                height={810}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="block font-serif text-xl font-semibold text-brand">
                {editorial.signature.name}
              </span>
              <span className="text-sm text-ink/70">{editorial.signature.role}</span>
            </figcaption>
          </figure>

          <div className="space-y-6">
            <blockquote className="relative rounded-3xl bg-brand p-8 text-white shadow-lg">
              <Quote
                className="absolute start-6 -top-4 h-9 w-9 rounded-full bg-gold p-2 text-ink"
                aria-hidden="true"
              />
              <p className="font-serif text-2xl leading-snug">{editorial.quote}</p>
            </blockquote>
            <div className="space-y-5 text-lg leading-relaxed text-ink/90">
              {editorial.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <p className="border-t border-brand/10 pt-6 font-serif text-lg text-brand">
              {editorial.signature.role}
              <br />
              <span className="font-semibold">{editorial.signature.name}</span>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
