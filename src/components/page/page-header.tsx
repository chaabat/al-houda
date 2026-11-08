import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  eyebrow?: string;
  lead?: ReactNode;
  /** Trail after "Home"; the last crumb is the current page. */
  crumbs: Crumb[];
  children?: ReactNode;
};

/** Green page banner with the mosque photo in the background, used on every inner page. */
export async function PageHeader({ title, eyebrow, lead, crumbs, children }: Props) {
  const t = await getTranslations("page");
  const trail: Crumb[] = [{ label: t("home"), href: "/" }, ...crumbs];

  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      <Image
        src="/images/hero-al-houda.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[60%_65%] opacity-35 rtl:-scale-x-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand via-brand/90 to-brand/60 rtl:bg-linear-to-l"
      />

      <Container className="py-12 lg:py-16">
        <nav aria-label={t("breadcrumb")}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/75">
            {trail.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 ? (
                  <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                ) : null}
                {crumb.href && index < trail.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-gold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? (
          <p className="mt-8 flex items-center gap-3 text-gold">
            <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight font-semibold sm:text-5xl">
          {title}
        </h1>
        {lead ? <div className="mt-4 max-w-2xl text-lg text-white/85">{lead}</div> : null}
        {children}
      </Container>
    </section>
  );
}
