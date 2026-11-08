import { ExternalLink, UserPlus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { SmartLink, isExternal } from "@/components/ui/smart-link";
import { REGISTRATION_URL, SITE } from "@/config/site";

/** "Register my child" + "Teaching portal" buttons, shown in the teaching banners. */
export async function TeachingCtas({ register = true }: { register?: boolean }) {
  const t = await getTranslations("teaching");
  const portal = SITE.links.teachingPortal;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {register ? (
        <SmartLink
          href={REGISTRATION_URL}
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          {t("registerCta")}
          {isExternal(REGISTRATION_URL) ? (
            <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
          ) : null}
        </SmartLink>
      ) : null}
      {portal ? (
        <a
          href={portal}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "lg",
            className: "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20",
          })}
        >
          {t("portalCta")}
          <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
