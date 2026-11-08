# Raccourcis Docker (Git Bash / WSL / Linux / macOS).

up:            ## Lance le site en développement → http://localhost:3000/fr
	docker compose up -d --build web

down:          ## Arrête tous les conteneurs
	docker compose --profile prod down

logs:          ## Affiche les logs du serveur de développement
	docker compose logs -f web

prod:          ## Construit et lance la version de production (nginx) → http://localhost:8080/fr
	docker compose --profile prod up -d --build site

lint:          ## Vérifie le code et les traductions
	docker compose exec web sh -c "npm run lint && npm run typecheck && npm run i18n:check"

.PHONY: up down logs prod lint
