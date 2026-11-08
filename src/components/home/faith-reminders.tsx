"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export type ReminderVerse = { arabic: string; ref: string; surah: string; meaning: string };

type Props = {
  eyebrow: string;
  title: string;
  previous: string;
  next: string;
  goTo: string;
  verses: ReminderVerse[];
  /** Hide the translation line (Arabic page: the verse is already in Arabic). */
  arabicOnly?: boolean;
};

const DELAY = 9000;

// Fixed positions so the server and the browser draw the same sky.
const STARS = Array.from({ length: 46 }, (_, i) => ({
  left: (i * 37.7) % 100,
  top: (i * 53.3) % 100,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.6,
}));

/** Eight-pointed star (Rub el Hizb), drawn as two overlapping squares. */
function IslamicStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none">
      <g stroke="currentColor" strokeWidth="1.2">
        <rect x="40" y="40" width="120" height="120" />
        <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" />
        <circle cx="100" cy="100" r="42" />
        <circle cx="100" cy="100" r="84.85" />
        <rect x="58" y="58" width="84" height="84" transform="rotate(22.5 100 100)" />
        <rect x="58" y="58" width="84" height="84" transform="rotate(67.5 100 100)" />
      </g>
    </svg>
  );
}

export function FaithReminders({
  eyebrow,
  title,
  previous,
  next,
  goTo,
  verses,
  arabicOnly,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = verses.length;

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), DELAY);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const verse = verses[index];
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={title}
      className="relative isolate overflow-hidden bg-brand py-20 text-white lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Night sky */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,164,65,0.18),transparent_60%)]" />
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        <IslamicStar className="absolute -start-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 animate-spin-slow text-gold/15" />
        <IslamicStar className="absolute -end-16 -bottom-24 h-[300px] w-[300px] animate-spin-slow-reverse text-white/10" />
        {/* Crescent */}
        <div className="absolute end-[12%] top-12 hidden h-16 w-16 animate-float rounded-full shadow-[inset_-12px_6px_0_0_var(--color-gold)] drop-shadow-[0_0_18px_rgba(217,164,65,0.55)] md:block rtl:shadow-[inset_12px_6px_0_0_var(--color-gold)]" />
      </div>

      <Container className="relative text-center">
        <p className="flex items-center justify-center gap-3 text-gold">
          <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
          {eyebrow}
          <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">{title}</h2>

        <div className="mx-auto mt-12 flex max-w-4xl items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={previous}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </button>

          <figure
            key={index}
            aria-live="polite"
            className="min-h-[220px] flex-1 animate-verse-in sm:min-h-[200px]"
          >
            <blockquote
              lang="ar"
              dir="rtl"
              className="font-[family-name:var(--font-naskh)] text-3xl leading-[1.9] text-gold sm:text-5xl sm:leading-[1.8]"
            >
              ﴿ {verse.arabic} ﴾
            </blockquote>
            {arabicOnly ? null : (
              <p className="mx-auto mt-5 max-w-2xl font-serif text-lg text-white/90 italic sm:text-xl">
                {verse.meaning}
              </p>
            )}
            <figcaption className="mt-4 text-sm tracking-wide text-white/60">
              {verse.surah} · {verse.ref}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label={next}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-ink"
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {verses.map((item, i) => (
            <button
              key={item.ref}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${goTo} ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
