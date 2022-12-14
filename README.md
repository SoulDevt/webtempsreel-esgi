## Getting started with docker
```bash
docker-compose build --pull --no-cache
docker-compose up -d
```

## Installation
client :
```bash
docker-compose exec node npm run install:client
```
server :
```bash
docker-compose exec node npm run install:server
```

## Development
client :
```bash
docker-compose exec node npm run dev:client
```
server:
```bash
docker-compose exec node npm run dev:server
```

## End
```bash
docker-compose down --remove-orphans --volumes --timeout 0
```

## Migration BDD
```bash
docker-compose exec node npm run migrate
```


## Client URL

http://127.0.0.1:8000

## DB URL
http://localhost:8080/