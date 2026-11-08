import { ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import { MosqueIcon } from "./mosque-icon";
import { TodayDate } from "./today-date";

const MAWAQIT_LANGS = ["fr", "ar", "en", "de"];

/**
 * Prayer times come from Mawaqit: the mosque updates them in its Mawaqit back-office,
 * the site only embeds the official widget.
 */
export async function PrayerTimesCard({ className }: { className?: string }) {
  const [t, locale] = await Promise.all([getTranslations("home.prayer"), getLocale()]);
  const slug = SITE.mawaqit.slug;
  const lang = MAWAQIT_LANGS.includes(locale) ? locale : "fr";

  return (
    <aside
      id="prayer-times"
      aria-labelledby="prayer-times-title"
      className={cn(
        "scroll-mt-32 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 shadow-brand/15 ring-brand/10",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-brand px-5 py-4 text-white">
        <MosqueIcon className="h-9 w-9 shrink-0 text-white" />
        <div>
          <h2 id="prayer-times-title" className="font-serif text-xl font-semibold">
            {t("title")}
          </h2>
          <p className="text-xs text-white/85">
            <TodayDate prefix={t("today")} />
          </p>
        </div>
      </div>

      <div className="px-3 pt-3">
        {slug ? (
          // Mawaqit "mobile" screen, the same one alhouda.org embeds (clock, 5 prayers, Jumua, Chourouk).
          <iframe
            src={`https://mawaqit.net/${lang}/m/${slug}?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0&view=mobile`}
            title={t("iframeTitle")}
            loading="lazy"
            scrolling="no"
            className="block h-[460px] w-full overflow-hidden rounded-2xl border-0 bg-ink"
          />
        ) : (
          <p className="rounded-2xl bg-sage px-4 py-10 text-center text-sm text-ink/70">
            {t("notConfigured")}
          </p>
        )}
      </div>

      {slug ? (
        <div className="p-4">
          <a
            href={`https://mawaqit.net/${lang}/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-sage px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {t("viewAll")}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      ) : (
        <div className="h-4" />
      )}
    </aside>
  );
}
