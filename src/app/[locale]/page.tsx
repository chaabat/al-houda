import { getTranslations } from "next-intl/server";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { EventsAgenda } from "@/components/home/events-agenda";
import { FaithReminders } from "@/components/home/faith-reminders";
import { Hero } from "@/components/home/hero";
import { NamesMarquee } from "@/components/home/names-marquee";
import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";
import { EVENTS, HOME_FAITH, NAMES, VERSES } from "@/content/home/faith";
import { localized } from "@/content/localized";
import { initPage, type LocaleParams } from "@/lib/page";

const SOCIALS = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
] as const;

export default async function HomePage(props: LocaleParams) {
  const locale = await initPage(props);
  const t = await getTranslations("home");
  const faith = localized(HOME_FAITH, locale);
  const isArabic = locale === "ar";

  const socials = SOCIALS.flatMap(({ key, label, Icon }) => {
    const href = SITE.social[key];
    return href ? [{ label, href, Icon }] : [];
  });

  const events = EVENTS.map((event) => ({
    ...event,
    title: localized(event.title, locale),
    text: localized(event.text, locale),
  }));
  const verses = VERSES.map((verse) => ({
    arabic: verse.arabic,
    ref: verse.ref,
    surah: localized(verse.surah, locale),
    meaning: localized(verse.meaning, locale),
  }));
  const names = NAMES.map((name) => ({
    arabic: name.arabic,
    latin: name.latin,
    meaning: localized(name.meaning, locale),
  }));

  return (
    <>
      <Hero />

      <EventsAgenda
        texts={faith.events}
        events={events}
        mawaqitUrl={`https://mawaqit.net/${locale}/${SITE.mawaqit.slug}`}
      />

      <FaithReminders {...faith.reminders} verses={verses} arabicOnly={isArabic} />

      <NamesMarquee {...faith.names} names={names} showLatin={!isArabic} />

      {/* News are published on the mosque's social networks. */}
      {socials.length ? (
        <section className="py-16">
          <Container>
            <div className="flex flex-col gap-6 rounded-[2rem] bg-sage p-8 ring-1 ring-brand/10 md:flex-row md:items-center md:justify-between lg:p-12">
              <div className="max-w-xl">
                <h2 className="font-serif text-3xl font-semibold text-brand">{t("news.title")}</h2>
                <p className="mt-3 text-ink/80">{t("news.text")}</p>
              </div>
              <ul className="flex flex-wrap gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-light"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
