package main

import (
	"fmt"
	"log"
	"log/slog"
	"net"

	database "github.com/nichol20/rhythmicity/main-api/internal/db"
	"github.com/nichol20/rhythmicity/main-api/internal/pb"
	"github.com/nichol20/rhythmicity/main-api/internal/repository"
	"github.com/nichol20/rhythmicity/main-api/internal/service"
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

	artistRepository := repository.NewArtistRepository(db)
	artistGRPCService := &service.ArtistGRPCService{
		ArtistRepository: artistRepository,
	}
	pb.RegisterArtistServer(grpcServer, artistGRPCService)

	albumRepository := repository.NewAlbumRepository(db)
	albumGRPCService := &service.AlbumGRPCService{
		AlbumRepository: albumRepository,
	}
	pb.RegisterAlbumServer(grpcServer, albumGRPCService)

	address := fmt.Sprintf("0.0.0.0:%d", port)
	listener, err := net.Listen("tcp", address)

	if err != nil {
		log.Fatal("cannot start grpc server", err)
	}

	slog.Info("gRPC server has been started", "port", port)
	err = grpcServer.Serve(listener)
	if err != nil {
		log.Fatal("cannot start grpc server", err)
	}
}
