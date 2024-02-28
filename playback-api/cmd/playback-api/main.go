package main

import (
	_ "github.com/lib/pq"
	grpc "github.com/nichol20/rhythmicity/playback-api/application"
	database "github.com/nichol20/rhythmicity/playback-api/infrastructure/db"
)

func main() {
	db := database.ConnectToDb()
	grpc.StartGRPCServer(db, 50051)
}
