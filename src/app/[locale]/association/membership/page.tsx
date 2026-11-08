import {
  BadgeCheck,
  CalendarClock,
  CircleCheck,
  ExternalLink,
  ReceiptText,
  UserPlus,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AssociationNav } from "@/components/association/association-nav";
import { PageHeader } from "@/components/page/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";
import { MEMBERSHIP, MEMBERSHIP_PHOTO } from "@/content/association/membership";
import { localized } from "@/content/localized";
import { Link } from "@/i18n/navigation";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "membership");

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-light" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function MembershipPage(props: LocaleParams) {
  const locale = await initPage(props);
  const membership = localized(MEMBERSHIP, locale);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);

  // Membership is paid online on HelloAsso, like on alhouda.org.
  const applyHref = SITE.links.membership;

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={membership.title}
        crumbs={[
          { label: tNav("association"), href: "/association" },
          { label: tNav("membership") },
        ]}
      />
      <AssociationNav current="/association/membership" />

      <Container className="space-y-14 py-14">
        <div className="space-y-14">
          <section className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-brand/10">
              <Image
                src={MEMBERSHIP_PHOTO}
                alt={membership.photoAlt}
                width={1052}
                height={480}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-ink/90">
              {membership.lead.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {applyHref ? (
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: "lg", className: "mt-2" })}
                >
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  {t("membershipUi.apply")}
                  <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-brand p-8 text-white shadow-lg">
              <div className="flex items-center gap-3 text-gold">
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-semibold">{t("membershipUi.fee")}</h2>
              </div>
              <p className="mt-6">
                <span className="font-serif text-6xl font-semibold">{membership.fee.amount}</span>
                <span className="ms-2 text-lg text-white/80">{membership.fee.period}</span>
              </p>
              <p className="mt-4 text-sm text-white/75">{membership.fee.note}</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand/10 lg:col-span-2">
              <div className="flex items-center gap-3 text-brand">
                <CalendarClock className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-serif text-xl font-semibold">
                  {t("membershipUi.frequencies")}
                </h2>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {membership.frequencies.map((frequency) => (
                  <li key={frequency.label} className="rounded-2xl bg-sage px-4 py-3">
                    <p className="font-semibold text-brand">{frequency.label}</p>
                    <p className="text-sm text-ink/75">{frequency.detail}</p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-semibold text-ink">{t("membershipUi.payment")}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {membership.payment.map((mode) => (
                  <li
                    key={mode}
                    className="rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-ink"
                  >
                    {mode}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink/75">{membership.paymentNote}</p>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand/10">
              <h2 className="font-serif text-2xl font-semibold text-brand">
                {t("membershipUi.conditions")}
              </h2>
              <CheckList items={membership.conditions} />
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand/10">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-6 w-6 text-gold" aria-hidden="true" />
                <h2 className="font-serif text-2xl font-semibold text-brand">
                  {t("membershipUi.active")}
                </h2>
              </div>
              <CheckList items={membership.active} />
              <p className="mt-5 rounded-2xl bg-sage px-4 py-3 text-sm text-ink/80">
                {membership.activeNote}
              </p>
            </div>
          </section>

          <section className="flex flex-col items-start gap-6 rounded-[2rem] bg-sage p-8 ring-1 ring-brand/10 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-ink">
                <ReceiptText className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="max-w-xl text-ink/85">{membership.taxNote}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {applyHref ? (
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants()}
                >
                  {t("membershipUi.apply")}
                  <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
                </a>
              ) : null}
              <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
                {t("membershipUi.contact")}
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
