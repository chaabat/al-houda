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
import { FrenchOnlyNote } from "@/components/page/french-only-note";
import { PageHeader } from "@/components/page/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";
import { MEMBERSHIP } from "@/content/association/membership";
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
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("association")]);

  // Membership is paid online on HelloAsso, like on alhouda.org.
  const applyHref = SITE.links.membership;

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={MEMBERSHIP.title}
        crumbs={[
          { label: tNav("association"), href: "/association" },
          { label: tNav("membership") },
        ]}
      />
      <AssociationNav current="/association/membership" />

      <Container className="space-y-14 py-14">
        <FrenchOnlyNote />

        <div lang="fr" dir="ltr" className="space-y-14">
          <section className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-brand/10">
              <Image
                src={MEMBERSHIP.photo}
                alt="Mosquée Al-Houda, Illzach"
                width={1052}
                height={480}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-ink/90">
              {MEMBERSHIP.lead.map((paragraph) => (
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
                <span className="font-serif text-6xl font-semibold">{MEMBERSHIP.fee.amount}</span>
                <span className="ms-2 text-lg text-white/80">{MEMBERSHIP.fee.period}</span>
              </p>
              <p className="mt-4 text-sm text-white/75">{MEMBERSHIP.fee.note}</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand/10 lg:col-span-2">
              <div className="flex items-center gap-3 text-brand">
                <CalendarClock className="h-5 w-5" aria-hidden="true" />
                <h2 className="font-serif text-xl font-semibold">
                  {t("membershipUi.frequencies")}
                </h2>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {MEMBERSHIP.frequencies.map((frequency) => (
                  <li key={frequency.label} className="rounded-2xl bg-sage px-4 py-3">
                    <p className="font-semibold text-brand">{frequency.label}</p>
                    <p className="text-sm text-ink/75">{frequency.detail}</p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-semibold text-ink">{t("membershipUi.payment")}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MEMBERSHIP.payment.map((mode) => (
                  <li
                    key={mode}
                    className="rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-ink"
                  >
                    {mode}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink/75">{MEMBERSHIP.paymentNote}</p>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand/10">
              <h2 className="font-serif text-2xl font-semibold text-brand">
                {t("membershipUi.conditions")}
              </h2>
              <CheckList items={MEMBERSHIP.conditions} />
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand/10">
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-6 w-6 text-gold" aria-hidden="true" />
                <h2 className="font-serif text-2xl font-semibold text-brand">
                  {t("membershipUi.active")}
                </h2>
              </div>
              <CheckList items={MEMBERSHIP.active} />
              <p className="mt-5 rounded-2xl bg-sage px-4 py-3 text-sm text-ink/80">
                {MEMBERSHIP.activeNote}
              </p>
            </div>
          </section>

          <section className="flex flex-col items-start gap-6 rounded-[2rem] bg-sage p-8 ring-1 ring-brand/10 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-ink">
                <ReceiptText className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="max-w-xl text-ink/85">{MEMBERSHIP.taxNote}</p>
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
