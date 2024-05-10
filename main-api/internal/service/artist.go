package service

import (
	"context"
	"errors"
	"log/slog"

	"github.com/nichol20/rhythmicity/main-api/internal/domain"
	"github.com/nichol20/rhythmicity/main-api/internal/pb"
	"github.com/nichol20/rhythmicity/main-api/internal/repository"
	"github.com/nichol20/rhythmicity/main-api/internal/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ArtistRepositoryInterface interface {
	GetPopularArtists(ctx context.Context, arg repository.GetPopularArtistsParams) ([]domain.Artist, error)
	GetArtist(ctx context.Context, artistID string) (*domain.Artist, error)
	GetSeveralArtists(ctx context.Context, artistIDs []string) ([]domain.Artist, error)
	GetArtistsByTrackId(ctx context.Context, trackID string) ([]domain.Artist, error)
	GetArtistsByAlbumId(ctx context.Context, albumID string) ([]domain.Artist, error)
	GetSimplifiedArtistsByTrackId(ctx context.Context, trackID string) ([]domain.SimplifiedArtist, error)
	GetSimplifiedArtistsByAlbumId(ctx context.Context, albumID string) ([]domain.SimplifiedArtist, error)
}

type ArtistGRPCService struct {
	ArtistRepository ArtistRepositoryInterface
	pb.UnimplementedArtistServer
}

func (s *ArtistGRPCService) GetPopularArtists(ctx context.Context, req *pb.GetPopularArtistsRequest) (*pb.MultipleArtists, error) {
	limit, offset := utils.CheckLimitAndOffset(utils.CheckLimitAndOffsetParams{
		Limit:  req.Limit,
		Offset: req.Offset,
	})

	artists, err := s.ArtistRepository.GetPopularArtists(ctx, repository.GetPopularArtistsParams{
		Limit:  limit,
		Offset: offset,
	})

	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.artistsToMessage(artists), nil
}

func (s *ArtistGRPCService) GetArtist(ctx context.Context, req *pb.RequestById) (*pb.ArtistMessage, error) {
	artist, err := s.ArtistRepository.GetArtist(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "artist not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.artistToMessage(*artist), nil
}

func (s *ArtistGRPCService) GetSeveralArtists(ctx context.Context, req *pb.RequestByIds) (*pb.MultipleArtists, error) {
	artists, err := s.ArtistRepository.GetSeveralArtists(ctx, req.Ids)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.artistsToMessage(artists), nil
}

func (s *ArtistGRPCService) GetArtistsByTrackId(ctx context.Context, req *pb.RequestById) (*pb.MultipleArtists, error) {
	artists, err := s.ArtistRepository.GetArtistsByTrackId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "track not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.artistsToMessage(artists), nil
}

func (s *ArtistGRPCService) GetArtistsByAlbumId(ctx context.Context, req *pb.RequestById) (*pb.MultipleArtists, error) {
	artists, err := s.ArtistRepository.GetArtistsByAlbumId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "track not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.artistsToMessage(artists), nil
}

func (s *ArtistGRPCService) artistsToMessage(artists []domain.Artist) *pb.MultipleArtists {
	var artistsMessage []*pb.ArtistMessage
	for _, v := range artists {
		artistsMessage = append(artistsMessage, s.artistToMessage(v))
	}

	return &pb.MultipleArtists{
		Artists: artistsMessage,
	}
}

func (s *ArtistGRPCService) artistToMessage(artist domain.Artist) *pb.ArtistMessage {
	return &pb.ArtistMessage{
		Id:     artist.ID.String(),
		Name:   artist.Name,
		Genres: artist.Genres,
		Styles: artist.Genres,
		Spotify: &pb.ArtistSpotify{
			Id:         artist.Spotify.ID,
			Popularity: artist.Spotify.Popularity,
			Images:     utils.ImagesToMessage(artist.Spotify.Images),
		},
	}
}
