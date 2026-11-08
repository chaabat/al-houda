import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/locales";

// "/" has no language: send visitors to the French site (a static meta refresh after export).
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}/`);
}
