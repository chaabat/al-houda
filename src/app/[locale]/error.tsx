"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <Container className="py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold text-brand">{t("title")}</h1>
      <Button className="mt-8" onClick={reset}>
        {t("retry")}
      </Button>
    </Container>
  );
}
