# Institution Al-Houda · Illzach

Site de la mosquée Al-Houda, en 4 langues (français, arabe, anglais, allemand).
Site **100 % statique** en Next.js (export HTML) : aucun serveur ni base de données.

## Stack

Next.js · TypeScript · Tailwind CSS · next-intl · Docker (nginx pour la production)

Services externes : **HelloAsso** (dons, adhésion), **Google Forms** (inscriptions), **FormSubmit** (contact),
**Mawaqit** (horaires de prière), **RosarioSIS** (portail enseignement).

## Développement

```bash
npm install
npm run dev          # http://localhost:3000/fr
```

## Mise en production

```bash
npm run build        # génère le dossier ./out
npm run preview      # aperçu local du dossier ./out
```

Déployer le contenu de `out/` sur Cloudflare Pages, Netlify, GitHub Pages ou tout serveur web.
Sur Cloudflare Pages / Netlify : commande de build `npm run build`, dossier de sortie `out`.

## Docker

| Commande | Rôle |
|---|---|
| `make up` (`docker compose up -d --build web`) | Développement avec rechargement à chaud → http://localhost:3000/fr |
| `make prod` (`docker compose --profile prod up -d --build site`) | Version de production servie par nginx → http://localhost:8080/fr |
| `make logs` | Logs du serveur de développement |
| `make lint` | Lint, types et traductions |
| `make down` | Arrête tout |

Pour la production, `NEXT_PUBLIC_SITE_URL` est lu au moment du build depuis un fichier `.env`
à la racine (ou depuis le shell).

## Variables d'environnement (`.env.local`)

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Adresse publique du site (ex. `https://alhouda.org`) |

## Formulaire de contact

Les messages sont envoyés par [FormSubmit](https://formsubmit.co) (gratuit, sans compte) à l'adresse
du contact choisi : `CONTACT_RECIPIENTS` dans `src/config/site.ts`.

**Activation, une seule fois par adresse :** envoyer un message de test en choisissant ce contact,
puis cliquer sur le lien « Activate Form » reçu par email à cette adresse. Avant l'activation,
les messages vers cette adresse ne sont pas transmis.

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Coordonnées, réseaux sociaux, liens HelloAsso / Google Form / RosarioSIS, Mawaqit | `src/config/site.ts` |
| Menu | `src/config/navigation.ts` |
| Textes des pages (association, statuts, commissions, enseignement) | `src/content/` |
| Textes de l'interface dans les 4 langues | `messages/*.json` (vérifier avec `npm run i18n:check`) |
| Images | `public/images/` |

## Workflow Git

`main` (protégée) + branches courtes `feature/*`.
Commits conventionnels : `feat: ...`, `fix: ...`, `chore: ...`.
