import { FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { LegalBlock, LegalDocument as Doc } from "@/content/association/types";
import { FrenchOnlyNote } from "./french-only-note";

/** Bold the clause number at the start of a paragraph ("14.2.", "4-3", "a.") so long articles scan easily. */
function Numbered({ text }: { text: string }) {
  const match = text.match(/^(\d+(?:[.-]\d+)*\.?|[a-z]\.)\s+([\s\S]*)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong className="font-semibold text-brand">{match[1]}</strong> {match[2]}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "heading":
      return <h3 className="pt-2 font-serif text-lg font-semibold text-brand">{block.text}</h3>;
    case "subheading":
      return <h4 className="pt-1 font-semibold text-ink">{block.text}</h4>;
    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden="true"
              />
              <div>
                {item}
                {block.sub?.[String(index)] ? (
                  <ul className="mt-2 space-y-1.5 ps-4 text-ink/80">
                    {block.sub[String(index)].map((child) => (
                      <li key={child} className="flex gap-3">
                        <span
                          className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-brand/30"
                          aria-hidden="true"
                        />
                        {child}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p>
          <Numbered text={block.text} />
        </p>
      );
  }
}

/** Official document (statutes, internal rules): table of contents on the side, one card per article. */
export async function LegalDocument({ doc }: { doc: Doc }) {
  const t = await getTranslations("association");

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto">
        <nav
          aria-label={t("toc")}
          className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brand/10"
        >
          <p className="font-serif text-lg font-semibold text-brand">{t("toc")}</p>
          <ol lang="fr" dir="ltr" className="mt-3 space-y-0.5 text-sm">
            {doc.articles.map((article) => (
              <li key={article.number}>
                <a
                  href={`#article-${article.number}`}
                  className="flex gap-2 rounded-lg px-2 py-1.5 text-ink/80 hover:bg-sage hover:text-brand"
                >
                  <span className="w-6 shrink-0 font-semibold text-gold">{article.number}</span>
                  <span>{article.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div className="space-y-5">
        <FrenchOnlyNote />

        <div lang="fr" dir="ltr" className="space-y-5">
          <header className="rounded-3xl bg-sage p-6 ring-1 ring-brand/10 lg:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-serif text-xl font-semibold text-brand">{doc.title}</p>
                <p className="mt-1 text-sm text-ink/75">{doc.adopted}</p>
              </div>
            </div>
            {doc.notes?.length ? (
              <ul className="mt-4 space-y-1 text-sm text-ink/80">
                {doc.notes.map((note) => (
                  <li key={note}>— {note}</li>
                ))}
              </ul>
            ) : null}
            {doc.intro ? <p className="mt-4 text-ink/85">{doc.intro}</p> : null}
            {doc.identity?.length ? (
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {doc.identity.map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white px-4 py-3">
                    <dt className="text-xs tracking-wide text-ink/60 uppercase">{label}</dt>
                    <dd className="font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </header>

          {doc.articles.map((article) => (
            <article
              key={article.number}
              id={`article-${article.number}`}
              className="scroll-mt-32 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand/10 lg:p-8"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
                {t("article")} {article.number}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-brand">{article.title}</h2>
              <div className="mt-4 space-y-3 leading-relaxed text-ink/90">
                {article.blocks.map((block, index) => (
                  <Block key={index} block={block} />
                ))}
              </div>
            </article>
          ))}

          <p className="pt-2 text-end font-serif text-ink/70 italic">{doc.signed}</p>
        </div>
      </div>
    </div>
  );
}
