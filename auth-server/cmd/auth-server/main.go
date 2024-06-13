package main

import (
	"fmt"
	"log"
	"log/slog"
	"net"

	database "github.com/nichol20/rhythmicity/auth-server/internal/db"
	"github.com/nichol20/rhythmicity/auth-server/internal/pb"
	"github.com/nichol20/rhythmicity/auth-server/internal/repository"
	"github.com/nichol20/rhythmicity/auth-server/internal/service"
	"google.golang.org/grpc"
)

func main() {
	db := database.ConnectToDb()
	port := 50051
	grpcServer := grpc.NewServer()

	userRepository := repository.NewUserRepository(db)
	authGRPCService := &service.AuthService{
		UserRepository: userRepository,
	}
	pb.RegisterAuthServer(grpcServer, authGRPCService)

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
