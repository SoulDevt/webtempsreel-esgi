## Getting started with docker
docker-compose build --pull --no-cache
docker-compose up -d


## Commandes utiles & install and run client
docker-compose exec node npm run install:client
docker-compose exec node npm run dev:client


## Client URL
http://127.0.0.1:8000

## DB URL
http://localhost:8080/