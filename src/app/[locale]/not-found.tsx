import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const [t, tCommon] = await Promise.all([getTranslations("notFound"), getTranslations("common")]);

  return (
    <Container className="py-24 text-center">
      <h1 className="font-serif text-4xl font-semibold text-brand">{t("title")}</h1>
      <p className="mx-auto mt-4 max-w-md text-ink/80">{t("text")}</p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        {tCommon("backHome")}
      </Link>
    </Container>
  );
}
