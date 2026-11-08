export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  /** `sub` maps an item index to its nested items. */
  | { type: "list"; items: string[]; sub?: Record<string, string[]> };

export type LegalArticle = {
  number: number;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  adopted: string;
  notes?: string[];
  intro?: string;
  identity?: [string, string][];
  signed: string;
  /** Shown on translated versions: only the French text is legally binding. */
  translationNote?: string;
  articles: LegalArticle[];
};
