package main

import (
	"fmt"
	"log"
	"log/slog"
	"net"
	"os"

	"github.com/nichol20/rhythmicity/search-api/internal/db"
	"github.com/nichol20/rhythmicity/search-api/internal/pb"
	"github.com/nichol20/rhythmicity/search-api/internal/rabbitmq"
	"github.com/nichol20/rhythmicity/search-api/internal/repository"
	"github.com/nichol20/rhythmicity/search-api/internal/service"
	"google.golang.org/grpc"
)

func main() {
	port := 50051
	client := db.ConnectWithElasticsearch()
	grpcServer := grpc.NewServer()

	// RABBITMQ SETUP
	err := rabbitmq.StartRabbitMQClient(os.Getenv("RABBITMQ_URL"))
	if err != nil {
		log.Fatalf("Could not connect to Rabbitmq: %v", err)
	}
	defer rabbitmq.Client.Close()

	err = rabbitmq.Client.DeclarePlayCountQueue()
	if err != nil {
		log.Fatalf("Could not declare play count queue: %v", err)
	}

	msgs, err := rabbitmq.Client.ConsumeFromPlayCountQueue()
	if err != nil {
		log.Fatalf("Failed to register consumer to play count queue: %v", err)
	}

	trackRepository := repository.TrackRepository{
		ESClient: client,
	}

	go func() {
		for d := range msgs {
			err = trackRepository.UpdatePlayCount(string(d.Body))
			if err != nil {
				slog.Error(err.Error())
			}
		}
	}()

	// GRPC SERVER SETUP
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
