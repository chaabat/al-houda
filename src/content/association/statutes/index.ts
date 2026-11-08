import type { Localized } from "@/content/localized";
import type { LegalDocument } from "../types";
import { ar } from "./ar";
import { de } from "./de";
import { en } from "./en";
import { fr } from "./fr";

export const STATUTES: Localized<LegalDocument> = { fr, en, de, ar };
