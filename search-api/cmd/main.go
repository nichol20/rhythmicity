package main

import (
	"context"

	"github.com/joho/godotenv"
	"github.com/nichol20/rhythmicity/search-api/application/grpc"
	"github.com/nichol20/rhythmicity/search-api/application/grpc/pb"
	"github.com/nichol20/rhythmicity/search-api/infrastructure/db"
)

type SearchServer struct {
	pb.UnimplementedSearchServer
}

func (s SearchServer) Search(context.Context, *pb.SearchRequest) (*pb.SearchResponse, error) {
	return nil, nil
}

func main() {
	godotenv.Load()
	Client := db.ConnectWithElasticsearch()
	grpc.StartGrpcServer(Client, 50051)
}
