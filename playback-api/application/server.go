package grpc

import (
	"database/sql"
	"fmt"
	"log"
	"net"

	"github.com/nichol20/rhythmicity/playback-api/application/grpc/pb"
	"github.com/nichol20/rhythmicity/playback-api/infrastructure/repository"
	"google.golang.org/grpc"
)

func StartGRPCServer(db *sql.DB, port int) {
	grpcServer := grpc.NewServer()

	playbackRepository := repository.PlaybackRepository{
		DB: db,
	}
	playbackGRPCService := &PlaybackGrpcService{
		PlaybackRepository: &playbackRepository,
	}
	pb.RegisterPlaybackServer(grpcServer, playbackGRPCService)

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
