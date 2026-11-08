import {
  Cairo,
  Inter,
  Noto_Naskh_Arabic,
  Playfair_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});
// Titles across the site: a clean, modern sans-serif.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  style: ["normal", "italic"],
  display: "swap",
});
// Only used by the logo wordmark.
export const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});
export const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});
export const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-naskh",
  display: "swap",
});

export const fontVariables = [inter, jakarta, playfair, cairo, naskh]
  .map((font) => font.variable)
  .join(" ");
