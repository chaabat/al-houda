up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

test-api:
	docker compose exec api php artisan test

migrate:
	docker compose exec api php artisan migrate
