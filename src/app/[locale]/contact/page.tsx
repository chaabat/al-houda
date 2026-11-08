import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/page/page-header";
import { Container } from "@/components/ui/container";
import { SITE } from "@/config/site";
import { initPage, navMetadata, type LocaleParams } from "@/lib/page";

const SOCIALS = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
] as const;

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const generateMetadata = (props: LocaleParams) => navMetadata(props, "contact");

export default async function ContactPage(props: LocaleParams) {
  await initPage(props);
  const [tNav, t] = await Promise.all([getTranslations("nav"), getTranslations("contact")]);
  const { contact } = SITE;

  const emails = [
    { label: t("emails.general"), value: contact.email },
    { label: t("emails.secretariat"), value: contact.secretariatEmail },
    { label: t("emails.imam"), value: contact.imamEmail },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));
  const phones = [
    { value: contact.phone, Icon: Phone },
    { value: contact.mobile, Icon: Smartphone },
  ].filter((item): item is { value: string; Icon: typeof Phone } => Boolean(item.value));
  const socials = SOCIALS.flatMap(({ key, label, Icon }) => {
    const href = SITE.social[key];
    return href ? [{ label, href, Icon }] : [];
  });
  const mapQuery = encodeURIComponent(`Mosquée Al-Houda, ${contact.address}`);

  const card = "rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand/10";
  const iconBubble = "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-gold";

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} crumbs={[{ label: tNav("contact") }]} />

      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-10">
          <aside className="space-y-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} flex gap-4 transition hover:shadow-md`}
            >
              <span className={iconBubble}>
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-serif text-lg font-semibold text-brand">
                  {t("address")}
                </span>
                <span className="text-ink/80">{contact.address}</span>
              </span>
            </a>

            {phones.length ? (
              <div className={`${card} flex gap-4`}>
                <span className={iconBubble}>
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold text-brand">{t("phone")}</p>
                  <ul className="mt-1 space-y-1">
                    {phones.map(({ value, Icon }) => (
                      <li key={value}>
                        <a
                          href={tel(value)}
                          className="flex items-center gap-2 text-ink/80 hover:text-brand"
                        >
                          <Icon className="h-4 w-4 text-brand-light" aria-hidden="true" />
                          <span dir="ltr">{value}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {emails.length ? (
              <div className={`${card} flex gap-4`}>
                <span className={iconBubble}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-lg font-semibold text-brand">{t("email")}</p>
                  <ul className="mt-1 space-y-2">
                    {emails.map((item) => (
                      <li key={item.value}>
                        <span className="block text-xs tracking-wide text-ink/55 uppercase">
                          {item.label}
                        </span>
                        <a
                          href={`mailto:${item.value}`}
                          className="break-all text-ink/85 hover:text-brand"
                        >
                          {item.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {socials.length ? (
              <div className="rounded-3xl bg-brand p-6 text-white">
                <p className="font-serif text-lg font-semibold">{t("followUs")}</p>
                <ul className="mt-3 flex gap-2">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-ink"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>

          <section
            aria-labelledby="contact-form-title"
            className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-brand/10 lg:p-10"
          >
            <h2 id="contact-form-title" className="font-serif text-3xl font-semibold text-brand">
              {t("formTitle")}
            </h2>
            <p className="mt-2 text-ink/75">{t("formIntro")}</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </section>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-brand/10">
          <iframe
            title={t("mapTitle")}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0"
          />
        </div>
      </Container>
    </>
  );
}
