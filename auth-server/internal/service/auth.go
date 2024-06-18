package service

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/nichol20/rhythmicity/auth-server/internal/domain"
	"github.com/nichol20/rhythmicity/auth-server/internal/pb"
	"github.com/nichol20/rhythmicity/auth-server/internal/repository"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserRepository interface {
	GetUser(ctx context.Context, id int32) (*domain.SensitiveUser, error)
	GetUserByEmail(ctx context.Context, email string) (*domain.SensitiveUser, error)
	CreateUser(ctx context.Context, arg repository.CreateUserParams) (*domain.SensitiveUser, error)
}

type AuthService struct {
	UserRepository UserRepository
	pb.UnimplementedAuthServer
}

func (s *AuthService) SignUp(ctx context.Context, req *pb.SignUpMessage) (*pb.User, error) {
	if req.Email == "" || req.Password == "" || req.Username == "" {
		return nil, status.Errorf(codes.InvalidArgument, domain.ErrBadRequest.Error())
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	user, err := s.UserRepository.CreateUser(ctx, repository.CreateUserParams{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hash),
	})

	if err != nil {
		if errors.Is(err, domain.ErrEmailExists) {
			return nil, status.Errorf(codes.AlreadyExists, domain.ErrEmailExists.Error())
		}
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	return &pb.User{
		Id:       user.ID,
		Email:    user.Email,
		Username: user.Username,
	}, nil
}

func (s *AuthService) SignIn(ctx context.Context, req *pb.SignInMessage) (*pb.TokenMessage, error) {
	if req.Email == "" || req.Password == "" {
		return nil, status.Errorf(codes.InvalidArgument, domain.ErrBadRequest.Error())
	}

	user, err := s.UserRepository.GetUserByEmail(ctx, req.Email)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "invalid email or password")
		}
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "invalid email or password")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour).Unix(),
	})

	tokenStr, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	return &pb.TokenMessage{
		Token: tokenStr,
	}, nil
}

func (s *AuthService) ValidateToken(ctx context.Context, req *pb.TokenMessage) (*pb.ValidateTokenResponse, error) {
	token, err := jwt.Parse(req.Token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, status.Errorf(codes.Unauthenticated, "authentication token is expired")
		}

		return nil, status.Errorf(codes.Unauthenticated, "invalid token")
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		user, err := s.UserRepository.GetUser(ctx, int32(claims["sub"].(float64)))
		if err != nil {
			if errors.Is(err, domain.ErrNotFound) {
				return nil, status.Errorf(codes.Unauthenticated, "invalid token")
			}

			slog.Error(err.Error())
			return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
		}

		return &pb.ValidateTokenResponse{
			User: &pb.User{
				Id:       user.ID,
				Email:    user.Email,
				Username: user.Username,
			},
		}, nil
	}

	return nil, status.Errorf(codes.Unauthenticated, "invalid token")
}
