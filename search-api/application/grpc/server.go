package grpc

import (
	"fmt"
	"log"
	"net"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/nichol20/rhythmicity/search-api/application/grpc/pb"
	"github.com/nichol20/rhythmicity/search-api/infrastructure/repository"
	"google.golang.org/grpc"
)

func StartGrpcServer(ESClient *elasticsearch.Client, port int) {
	grpcServer := grpc.NewServer()

	searchRepository := repository.SearchRepository{
		ESClient: ESClient,
	}
	searchGrpcService := &SearchGrpcService{
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
