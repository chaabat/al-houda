import { Container } from "@/components/ui/container";

type Name = { arabic: string; latin: string; meaning: string };

type Props = { eyebrow: string; title: string; text: string; names: Name[]; showLatin: boolean };

function Row({
  names,
  reverse,
  showLatin,
}: {
  names: Name[];
  reverse?: boolean;
  showLatin: boolean;
}) {
  return (
    // The track is always laid out left-to-right so the loop is seamless in every language.
    <div
      dir="ltr"
      className="group flex overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 gap-4 pe-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        >
          {names.map((name) => (
            <li
              key={name.latin}
              className="flex w-56 shrink-0 flex-col items-center rounded-3xl bg-white px-5 py-6 text-center shadow-sm ring-1 ring-brand/10 transition hover:-translate-y-1 hover:shadow-lg hover:ring-gold/60"
            >
              <span
                lang="ar"
                className="font-[family-name:var(--font-naskh)] text-4xl leading-normal text-brand"
              >
                {name.arabic}
              </span>
              {showLatin ? (
                <span className="mt-1 text-sm font-semibold tracking-wide text-gold">
                  {name.latin}
                </span>
              ) : null}
              <span dir="auto" className="mt-1 text-sm text-ink/70">
                {name.meaning}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Names of Allah scrolling gently in two rows. */
export function NamesMarquee({ eyebrow, title, text, names, showLatin }: Props) {
  const half = Math.ceil(names.length / 2);

  return (
    <section className="overflow-hidden bg-sage py-20">
      <Container className="text-center">
        <p className="flex items-center justify-center gap-3 text-brand-light">
          <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
          {eyebrow}
          <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-brand sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-ink/75 italic">{text}</p>
      </Container>

      <div className="mt-12 space-y-4">
        <Row names={names.slice(0, half)} showLatin={showLatin} />
        <Row names={names.slice(half)} showLatin={showLatin} reverse />
      </div>
    </section>
  );
}
