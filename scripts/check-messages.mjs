// Checks that ar/en/de have exactly the same keys as fr (the reference language).
import { readFileSync } from "node:fs";
import process from "node:process";

const load = (locale) =>
  JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

const flat = (object, prefix = "") =>
  Object.entries(object).flatMap(([key, value]) =>
    value && typeof value === "object" ? flat(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );

const reference = new Set(flat(load("fr")));
let problems = 0;

for (const locale of ["ar", "en", "de"]) {
  const keys = new Set(flat(load(locale)));
  for (const key of reference) {
    if (!keys.has(key)) {
      console.log(`${locale}: missing ${key}`);
      problems++;
    }
  }
  for (const key of keys) {
    if (!reference.has(key)) {
      console.log(`${locale}: extra ${key}`);
      problems++;
    }
  }
}

console.log(problems ? `${problems} problem(s)` : "All languages have the same keys");
process.exit(problems ? 1 : 0);
