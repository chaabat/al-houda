# Institution Al-Houda · Illzach

Multilingual website (FR, AR, EN, DE) for the Al-Houda mosque.

## Structure
- `web/` : Next.js (public site)
- `api/` : Laravel + Filament (API + admin)
- `docker/` : infrastructure
- `docs/` : context and decisions

## Stack
Next.js · TypeScript · Tailwind · next-intl · Laravel 12 · Filament · PostgreSQL · Redis · Docker Compose

## Workflow
`main` (protected) + short branches: `feature/api-*`, `feature/web-*`.
Commits: conventional (`feat(api): ...`, `fix(web): ...`, `chore: ...`).

## Dev
`make up` (available after step 0 is done)
