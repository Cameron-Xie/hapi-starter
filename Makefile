SecretKeySize=64

up:
	@make create-env
	@make start-containers

down:
	@make stop-containers

start-containers:
	@docker-compose up --build -d

stop-containers:
	@docker-compose down -v

create-env:
	@test -e .env || sed -e "s/\(SECRET_KEY=\).*$$/\1/g" -e "s/\(SECRET_KEY=\)/\1$$(openssl rand -hex $(SecretKeySize))/g" .env.example > .env