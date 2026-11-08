import { Mail, MapPin, MoonStar, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";

const SOCIALS = [
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
] as const;

const itemClass = "flex items-center gap-2 transition-colors hover:text-gold";
const iconButton =
  "grid h-8 w-8 place-items-center rounded-full text-white transition-colors hover:bg-white/15 hover:text-gold focus-visible:outline-white";

export async function TopBar() {
  const t = await getTranslations("topbar");

  const contact = SITE.contact;
  const social = SITE.social;
  const socialLinks = SOCIALS.flatMap(({ key, label, Icon }) => {
    const href = social[key];
    return href ? [{ label, href, Icon }] : [];
  });

  return (
    <div className="bg-brand text-[13px] text-white">
      <Container className="flex items-center justify-between gap-4 py-1.5">
        <ul className="flex items-center gap-5">
          {contact.address ? (
            <li className="max-md:hidden">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("map")}: ${contact.address}`}
                className={itemClass}
              >
                <MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{contact.address}</span>
              </a>
            </li>
          ) : null}
          {contact.phone ? (
            <li>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={itemClass}>
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span dir="ltr">{contact.phone}</span>
              </a>
            </li>
          ) : null}
        </ul>

        <div className="flex items-center gap-3">
          <p className="flex items-center gap-2 text-white/90 max-lg:hidden">
            <MoonStar className="h-4 w-4 text-gold" aria-hidden="true" />
            {t("tagline")}
          </p>
          <ul className="flex items-center gap-0.5">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={iconButton}
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
            {contact.email ? (
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  aria-label={t("email")}
                  title={contact.email}
                  className={iconButton}
                >
                  <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>
    </div>
  );
}