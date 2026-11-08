import { ArrowRight, BookOpen, CalendarDays, HandHeart, Heart, Users } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SmartLink } from "@/components/ui/smart-link";
import { DONATION_URL } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { PrayerTimesCard } from "./prayer-times-card";

const CHIPS = [
  { key: "teaching", href: "/teaching", Icon: BookOpen },
  { key: "prayerTimes", href: "/#prayer-times", Icon: CalendarDays },
  { key: "community", href: "/association", Icon: Users },
  { key: "donations", href: DONATION_URL, Icon: Heart },
] as const;

const FEATURES = [
  { key: "teaching", href: "/teaching", Icon: BookOpen },
  { key: "events", href: "/#events", Icon: CalendarDays },
  { key: "donations", href: DONATION_URL, Icon: HandHeart },
  { key: "community", href: "/association", Icon: Users },
] as const;

export async function Hero() {
  const t = await getTranslations("home");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-cream">
        {/* Photo across the whole banner, with a light veil behind the text for readability. */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-al-houda.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_65%] rtl:-scale-x-100"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-cream/80 via-cream/55 to-cream/30 lg:bg-linear-to-r lg:from-cream/80 lg:from-20% lg:via-cream/45 lg:via-45% lg:to-transparent lg:to-65% rtl:lg:bg-linear-to-l"
        />

        <Container className="grid items-center gap-10 pt-14 pb-28 lg:grid-cols-[minmax(0,1fr)_340px] lg:pt-20 lg:pb-32">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-lg text-brand">
              <span className="h-0.5 w-12 bg-gold" aria-hidden="true" />
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] font-semibold text-brand sm:text-5xl lg:text-[64px]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink/85 lg:text-xl">{t("hero.subtitle")}</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {CHIPS.map(({ key, href, Icon }) => (
                <li key={key}>
                  <SmartLink
                    href={href}
                    className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-ink shadow-sm ring-1 ring-brand/5 backdrop-blur transition-colors hover:bg-white hover:text-brand"
                  >
                    <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                    {t(`chips.${key}`)}
                  </SmartLink>
                </li>
              ))}
            </ul>

            <Link href="/association" className={buttonVariants({ size: "lg", className: "mt-8" })}>
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <PrayerTimesCard className="w-full max-w-sm justify-self-center lg:justify-self-end" />
        </Container>
      </section>

      {/* Feature strip overlapping the bottom of the hero, as on the mockup. */}
      <Container className="relative z-10 -mt-16">
        <ul className="grid gap-6 rounded-3xl bg-white/95 p-6 shadow-xl ring-1 shadow-brand/10 ring-brand/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-7">
          {FEATURES.map(({ key, href, Icon }) => (
            <li key={key} className="lg:border-e lg:border-brand/10 lg:px-6 lg:last:border-e-0">
              <SmartLink href={href} className="group flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors group-hover:bg-brand-light">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-serif text-xl font-semibold text-brand">
                    {t(`features.${key}.title`)}
                  </span>
                  <span className="block text-sm text-ink/75">{t(`features.${key}.text`)}</span>
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
