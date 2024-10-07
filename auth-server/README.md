# About

microservice responsible for managing user authentication data

# How to run

run services with compose

```bash
docker compose up -d
```

enter the container

```bash
docker compose exec auth-server sh
```

run (inside the container)

```bash
go run cmd/auth-server/main.go
```
