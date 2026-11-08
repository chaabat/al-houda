import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { NAV } from "@/config/navigation";
import { SITE } from "@/config/site";
import { SmartLink } from "@/components/ui/smart-link";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

const SOCIALS = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
] as const;

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export async function Footer() {
  const [t, tNav] = await Promise.all([getTranslations("footer"), getTranslations("nav")]);

  const contact = SITE.contact;
  const links = NAV;
  const socials = SOCIALS.flatMap(({ key, label, Icon }) => {
    const href = SITE.social[key];
    return href ? [{ label, href, Icon }] : [];
  });

  return (
    <footer className="mt-16 bg-brand text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="inline-block rounded-xl bg-white p-3">
            <Logo />
          </div>
          <p className="max-w-sm text-sm text-white/85">{t("about")}</p>
          {socials.length ? (
            <div>
              <p className="text-sm font-semibold">{t("followUs")}</p>
              <ul className="mt-2 flex gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-ink"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold">{t("quickLinks")}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {links.map((item) => (
              <li key={item.href}>
                <SmartLink
                  href={item.href}
                  className="text-white/85 hover:text-white hover:underline"
                >
                  {tNav(item.key)}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg font-semibold">{t("contact")}</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            {contact.address ? (
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {contact.address}
              </li>
            ) : null}
            {[
              { value: contact.phone, Icon: Phone },
              { value: contact.mobile, Icon: Smartphone },
            ].map(({ value, Icon }) =>
              value ? (
                <li key={value}>
                  <a href={tel(value)} className="flex gap-2 hover:underline">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span dir="ltr">{value}</span>
                  </a>
                </li>
              ) : null,
            )}
            {[contact.email, contact.secretariatEmail].map((email) =>
              email ? (
                <li key={email}>
                  <a href={`mailto:${email}`} className="flex gap-2 hover:underline">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {email}
                  </a>
                </li>
              ) : null,
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/75 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Association Al-Houda · Illzach. {t("rights")}
          </p>
          <Link href="/association/rules" className="hover:underline">
            {t("privacy")}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
