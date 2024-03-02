package main

import (
	"fmt"
	"log"
	"net"

	database "github.com/nichol20/rhythmicity/data-api/internal/db"
	"github.com/nichol20/rhythmicity/data-api/internal/pb"
	"github.com/nichol20/rhythmicity/data-api/internal/repository"
	"github.com/nichol20/rhythmicity/data-api/internal/service"
	"google.golang.org/grpc"
)

func main() {
	db := database.ConnectToDb()
	port := 50051
	grpcServer := grpc.NewServer()

	trackRepository := repository.NewTrackRepository(db)
	trackGRPCService := &service.TrackGRPCService{
		TrackRepository: trackRepository,
	}
	pb.RegisterTrackServer(grpcServer, trackGRPCService)

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
