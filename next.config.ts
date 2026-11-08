import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Fully static site: `npm run build` writes plain HTML/CSS/JS to ./out (no Node server, no API).
const nextConfig: NextConfig = {
  output: "export",
  // "/fr/contact/" → out/fr/contact/index.html, served as-is by any static host.
  trailingSlash: true,
  // The image optimizer needs a server; images are served as they are.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
