package main

import (
	"fmt"
	"log"
	"log/slog"
	"net"
	"os"
	"strconv"

	database "github.com/nichol20/rhythmicity/main-api/internal/db"
	"github.com/nichol20/rhythmicity/main-api/internal/pb"
	"github.com/nichol20/rhythmicity/main-api/internal/rabbitmq"
	"github.com/nichol20/rhythmicity/main-api/internal/redis"
	"github.com/nichol20/rhythmicity/main-api/internal/repository"
	"github.com/nichol20/rhythmicity/main-api/internal/service"
	"google.golang.org/grpc"
)

func main() {
	db := database.ConnectToDb()
	port := 50051
	grpcServer := grpc.NewServer()

	// REDIS SETUP
	redisDB, err := strconv.Atoi(os.Getenv("REDIS_DB"))
	if err != nil {
		log.Fatalf("invalid redis db: %v", err)
	}
	err = redis.StartRedisClient(os.Getenv("REDIS_ADDR"), os.Getenv("REDIS_PASSWORD"), redisDB)
	if err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	}

	// RABBITMQ SETUP
	fmt.Println(os.Getenv("RABBITMQ_URL"))
	err = rabbitmq.StartRabbitMQClient(os.Getenv("RABBITMQ_URL"))
	if err != nil {
		log.Fatalf("Could not connect to Rabbitmq: %v", err)
	}
	defer rabbitmq.Client.Close()

	err = rabbitmq.Client.DeclarePlayCountQueue()
	if err != nil {
		log.Fatalf("Could not declare play count queue: %v", err)
	}

	// GRPC SERVER SETUP
	trackRepository := repository.NewTrackRepository(db)
	artistRepository := repository.NewArtistRepository(db)
	albumRepository := repository.NewAlbumRepository(db)

	trackGRPCService := &service.TrackGRPCService{
		TrackRepository:  trackRepository,
		ArtistRepository: artistRepository,
		AlbumRepository:  albumRepository,
	}
	pb.RegisterTrackServer(grpcServer, trackGRPCService)

	artistGRPCService := &service.ArtistGRPCService{
		ArtistRepository: artistRepository,
	}
	pb.RegisterArtistServer(grpcServer, artistGRPCService)

	albumGRPCService := &service.AlbumGRPCService{
		AlbumRepository:  albumRepository,
		ArtistRepository: artistRepository,
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
