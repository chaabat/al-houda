import type messages from "../../messages/fr.json";
import { REGISTRATION_URL, SITE } from "./site";

export type NavKey = keyof (typeof messages)["nav"];

export type NavChild = { key: NavKey; href: string; external?: boolean };

export type NavItem = {
  key: NavKey;
  href: string;
  children?: NavChild[];
};

// Same structure as the association's official site (alhouda.org).
export const NAV: NavItem[] = [
  { key: "home", href: "/" },
  {
    key: "association",
    href: "/association",
    children: [
      { key: "membership", href: "/association/membership" },
      { key: "editorial", href: "/association/editorial" },
      { key: "statutes", href: "/association/statutes" },
      { key: "rules", href: "/association/rules" },
      { key: "projects", href: "/association/projects" },
    ],
  },
  {
    key: "commissions",
    href: "/commissions",
    children: [
      { key: "worship", href: "/commissions/worship" },
      { key: "women", href: "/commissions/women" },
      { key: "maintenance", href: "/commissions/maintenance" },
      { key: "security", href: "/commissions/security" },
    ],
  },
  {
    key: "teaching",
    href: "/teaching",
    children: [
      {
        key: "registration",
        href: REGISTRATION_URL,
        external: REGISTRATION_URL.startsWith("http"),
      },
      { key: "courses", href: "/teaching/courses" },
      { key: "teachers", href: "/teaching/team" },
      ...(SITE.links.teachingPortal
        ? [{ key: "portal" as const, href: SITE.links.teachingPortal, external: true }]
        : []),
    ],
  },
  // Donations are collected on HelloAsso (falls back to the local page if the link is removed).
  { key: "donations", href: SITE.links.helloasso || "/donations" },
  { key: "contact", href: "/contact" },
];
