"use client";

import {
  BellRing,
  CalendarDays,
  ExternalLink,
  Moon,
  MoonStar,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useFormatter } from "next-intl";
import { useSyncExternalStore } from "react";
import { Container } from "@/components/ui/container";
import type { HomeFaithTexts, MosqueEvent } from "@/content/home/faith";

export type AgendaEvent = Omit<MosqueEvent, "title" | "text"> & { title: string; text: string };

type Props = { texts: HomeFaithTexts["events"]; events: AgendaEvent[]; mawaqitUrl: string };

const ICONS = {
  moon: Moon,
  star: Star,
  lantern: MoonStar,
  sparkles: Sparkles,
  calendar: CalendarDays,
} as const;

const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;

// Clock that ticks once a minute; nothing at build time (the page is static).
const subscribe = (onChange: () => void) => {
  const timer = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(timer);
};
const currentMinute = () => Math.floor(Date.now() / MINUTE) * MINUTE;
const atBuild = () => null;

function Countdown({ ms, texts }: { ms: number; texts: Props["texts"] }) {
  if (ms <= 0) return <p className="mt-6 font-serif text-2xl text-gold">{texts.today}</p>;
  const days = Math.floor(ms / DAY);
  const hours = Math.floor((ms % DAY) / (60 * MINUTE));
  const minutes = Math.floor((ms % (60 * MINUTE)) / MINUTE);
  const parts = [
    { value: days, label: texts.days },
    { value: hours, label: texts.hours },
    { value: minutes, label: texts.minutes },
  ];
  return (
    <dl className="mt-6 grid grid-cols-3 gap-3">
      {parts.map((part) => (
        <div
          key={part.label}
          className="rounded-2xl bg-white/10 px-2 py-4 text-center ring-1 ring-white/10"
        >
          <dd className="font-serif text-4xl font-semibold text-gold tabular-nums sm:text-5xl">
            {String(part.value).padStart(2, "0")}
          </dd>
          <dt className="mt-1 text-xs tracking-wide text-white/70 uppercase">{part.label}</dt>
        </div>
      ))}
    </dl>
  );
}

export function EventsAgenda({ texts, events, mawaqitUrl }: Props) {
  const format = useFormatter();
  const now = useSyncExternalStore(subscribe, currentMinute, atBuild);

  // Keep an event visible until the end of its day.
  const upcoming =
    now === null ? events : events.filter((event) => new Date(event.date).getTime() + DAY > now);
  const [next, ...later] = upcoming;

  const day = (date: string) =>
    format.dateTime(new Date(date), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Paris",
    });

  return (
    <section id="events" className="scroll-mt-24 py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-brand-light">
            <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
            {texts.eyebrow}
            <span className="h-0.5 w-10 bg-gold" aria-hidden="true" />
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand sm:text-4xl">
            {texts.title}
          </h2>
          <p className="mt-4 text-lg text-ink/75">{texts.text}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Next event + countdown */}
          <div className="flex flex-col gap-6">
            {next ? (
              <article className="relative overflow-hidden rounded-[2rem] bg-brand p-8 text-white shadow-xl lg:p-10">
                <MoonStar
                  className="absolute -end-6 -top-6 h-40 w-40 animate-float text-gold/15"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold tracking-wide text-gold uppercase">
                  {texts.next}
                </p>
                <h3 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">{next.title}</h3>
                <p className="mt-2 text-white/80 first-letter:uppercase">{day(next.date)}</p>
                <p className="mt-3 text-white/75">{next.text}</p>
                {now === null ? (
                  <div className="mt-6 h-[104px]" aria-hidden="true" />
                ) : (
                  <Countdown ms={new Date(next.date).getTime() - now} texts={texts} />
                )}
                {next.estimated ? (
                  <p className="mt-5 inline-flex rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
                    {texts.estimated}
                  </p>
                ) : null}
              </article>
            ) : null}

            <article className="flex gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand/10">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage text-brand">
                <Users className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-brand">
                  {texts.weekly.title}
                </h3>
                <p className="mt-1 text-ink/75">{texts.weekly.text}</p>
              </div>
            </article>
          </div>

          {/* Timeline */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-brand/10 lg:p-8">
            <ol className="relative space-y-1 before:absolute before:inset-y-4 before:start-[27px] before:w-px before:bg-brand/15">
              {later.map((event) => {
                const Icon = ICONS[event.icon];
                return (
                  <li
                    key={event.id}
                    className="relative flex gap-5 rounded-2xl p-2 transition-colors hover:bg-sage/70"
                  >
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-gold ring-4 ring-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="pb-3">
                      <p className="text-sm font-medium text-brand-light first-letter:uppercase">
                        {day(event.date)}
                        {event.estimated ? (
                          <span className="ms-2 text-xs text-ink/50">· {texts.estimated}</span>
                        ) : null}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-brand">{event.title}</h3>
                      <p className="text-sm text-ink/70">{event.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 border-t border-brand/10 pt-4 text-xs text-ink/55">
              {texts.estimatedNote}
            </p>
          </div>
        </div>

        {/* Live announcements are managed by the mosque in Mawaqit. */}
        <div className="mt-6 flex flex-col items-start gap-5 rounded-[2rem] bg-gold/15 p-6 ring-1 ring-gold/40 sm:flex-row sm:items-center lg:p-8">
          <span className="grid h-14 w-14 shrink-0 animate-ring place-items-center rounded-full bg-gold text-ink">
            <BellRing className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h3 className="font-serif text-2xl font-semibold text-brand">{texts.mawaqit.title}</h3>
            <p className="mt-1 text-ink/75">{texts.mawaqit.text}</p>
          </div>
          <a
            href={mawaqitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-light"
          >
            {texts.mawaqit.cta}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
