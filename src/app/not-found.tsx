import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

// Served as out/404.html by static hosts for any unknown URL.
export default function RootNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="grid min-h-dvh place-items-center bg-cream px-4 font-sans text-ink antialiased">
        <main className="max-w-md text-center">
          <p className="font-serif text-7xl font-semibold text-gold">404</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-brand">Page introuvable</h1>
          <p className="mt-3 text-ink/75">
            La page que vous cherchez n’existe pas ou a été déplacée.
          </p>
          <Link
            href="/fr/"
            className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-light"
          >
            Retour à l’accueil
          </Link>
        </main>
      </body>
    </html>
  );
}
