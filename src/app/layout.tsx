import type { ReactNode } from "react";

// A root layout is required by Next.js. The <html> tag is rendered in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
