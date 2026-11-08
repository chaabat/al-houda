import { HeartHandshake, Mail, ShieldCheck, Wrench } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { CommissionsNav } from "@/components/commissions/commissions-nav";
import { PageHeader } from "@/components/page/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { initPage, navMetadata } from "@/lib/page";

// Commissions whose page is still empty on the official site: a "coming soon" page for now.
const PENDING = {
  women: HeartHandshake,
  maintenance: Wrench,
  security: ShieldCheck,
} as const;
type Slug = keyof typeof PENDING;

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Object.keys(PENDING).map((slug) => ({ locale, slug })),
  );
}

const isSlug = (slug: string): slug is Slug => slug in PENDING;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return isSlug(slug) ? navMetadata({ params }, slug) : {};
}

export default async function PendingCommissionPage({ params }: Props) {
  await initPage({ params });
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("commissions")]);
  const Icon = PENDING[slug];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={tNav(slug)}
        crumbs={[{ label: tNav("commissions"), href: "/commissions" }, { label: tNav(slug) }]}
      />
      <CommissionsNav current={`/commissions/${slug}`} />

      <Container className="py-14">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-sm ring-1 ring-brand/10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage text-brand">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-brand">{t("soonTitle")}</h2>
          <p className="mt-3 text-ink/75">{t("soonText")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t("join")}
            </Link>
            <Link
              href="/commissions"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t("allCommissions")}
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
