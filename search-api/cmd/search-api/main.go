package main

import (
	"github.com/joho/godotenv"
	"github.com/nichol20/rhythmicity/search-api/application/grpc"
	"github.com/nichol20/rhythmicity/search-api/infrastructure/db"
)

func main() {
	godotenv.Load()
	client := db.ConnectWithElasticsearch()
	grpc.StartGrpcServer(client, 50051)
}
