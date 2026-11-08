"use client";

import { useFormatter } from "next-intl";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
// Same value for the whole day, so React does not re-render in a loop.
const today = () => new Date().toDateString();
// Nothing at build time: the page is static and the build date would be wrong the next day.
const atBuild = () => null;

/** Today's date, computed in the visitor's browser. */
export function TodayDate({ prefix }: { prefix: string }) {
  const format = useFormatter();
  const day = useSyncExternalStore(subscribe, today, atBuild);

  if (!day) return <span className="invisible">{prefix}</span>;

  return (
    <span>
      {prefix} - {format.dateTime(new Date(day), { dateStyle: "long", timeZone: "Europe/Paris" })}
    </span>
  );
}
