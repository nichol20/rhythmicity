# About

microservice responsible for the app's search calls

# How to run

run services with compose

```bash
docker compose up -d
```

enter the container

```bash
docker compose exec search-api sh
```

If this is your first time, run this command to add the data to the database (see [instructions on how to initialize the project](<!-- TODO: Add link -->))

```bash
go run cmd/index-documents/main.go
```

run (inside the container)

```bash
go run cmd/search-api/main.go
```
