# About

microservice responsible for storing the most informative data and for the playback call.

# How to run

run services with compose

```bash
docker compose up -d
```

enter the container

```bash
docker compose exec main-api sh
```

If this is your first time, run this command to add the data to the database (see [instructions on how to initialize the project](<!-- TODO: Add link -->))

```bash
go run cmd/setup/main.go
```

run (inside the container)

```bash
go run cmd/main-api/main.go
```
