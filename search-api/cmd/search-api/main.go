package main

import (
	"fmt"
	"log"
	"net"

	"github.com/joho/godotenv"
	"github.com/nichol20/rhythmicity/search-api/internal/db"
	"github.com/nichol20/rhythmicity/search-api/internal/pb"
	"github.com/nichol20/rhythmicity/search-api/internal/repository"
	"github.com/nichol20/rhythmicity/search-api/internal/service"
	"google.golang.org/grpc"
)

func main() {
	godotenv.Load()
	port := 50051
	client := db.ConnectWithElasticsearch()
	grpcServer := grpc.NewServer()

	searchRepository := repository.SearchRepository{
		ESClient: client,
	}
	searchGrpcService := &service.SearchGrpcService{
		SearchRepository: &searchRepository,
	}
	pb.RegisterSearchServer(grpcServer, searchGrpcService)

	address := fmt.Sprintf("0.0.0.0:%d", port)
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatal("cannot start grpc server", err)
	}

	log.Printf("gRPC server has been started on port %d", port)
	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatal("cannot start grpc server", err)
	}
}
