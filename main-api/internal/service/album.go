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

type AlbumRepositoryInterface interface {
	GetPopularAlbums(ctx context.Context, arg repository.GetPopularAlbumsParams) ([]domain.Album, error)
	GetAlbum(ctx context.Context, albumID string) (*domain.Album, error)
	GetSeveralAlbums(ctx context.Context, albumIDs []string) ([]domain.Album, error)
	GetAlbumByTrackId(ctx context.Context, trackID string) (*domain.Album, error)
	GetAlbumsByArtistId(ctx context.Context, artistID string) ([]domain.Album, error)
}

type AlbumGRPCService struct {
	AlbumRepository AlbumRepositoryInterface
	pb.UnimplementedAlbumServer
}

func (s *AlbumGRPCService) GetPopularAlbums(ctx context.Context, req *pb.GetPopularAlbumsRequest) (*pb.MultipleAlbums, error) {
	limit, offset := utils.CheckLimitAndOffset(utils.CheckLimitAndOffsetParams{
		Limit:  req.Limit,
		Offset: req.Offset,
	})

	albums, err := s.AlbumRepository.GetPopularAlbums(ctx, repository.GetPopularAlbumsParams{
		Limit:  limit,
		Offset: offset,
	})

	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.albumsToMessage(albums), nil
}

func (s *AlbumGRPCService) GetAlbum(ctx context.Context, req *pb.RequestById) (*pb.AlbumMessage, error) {
	album, err := s.AlbumRepository.GetAlbum(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "album not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.albumToMessage(*album), nil
}

func (s *AlbumGRPCService) GetSeveralAlbums(ctx context.Context, req *pb.RequestByIds) (*pb.MultipleAlbums, error) {
	albums, err := s.AlbumRepository.GetSeveralAlbums(ctx, req.Ids)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.albumsToMessage(albums), nil
}

func (s *AlbumGRPCService) GetAlbumByTrackId(ctx context.Context, req *pb.RequestById) (*pb.AlbumMessage, error) {
	album, err := s.AlbumRepository.GetAlbumByTrackId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "track not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.albumToMessage(*album), nil
}

func (s *AlbumGRPCService) GetAlbumsByArtistId(ctx context.Context, req *pb.RequestById) (*pb.MultipleAlbums, error) {
	albums, err := s.AlbumRepository.GetAlbumsByArtistId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "artist not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return s.albumsToMessage(albums), nil
}

func (s *AlbumGRPCService) albumsToMessage(albums []domain.Album) *pb.MultipleAlbums {
	var albumsMessage []*pb.AlbumMessage
	for _, v := range albums {
		albumsMessage = append(albumsMessage, s.albumToMessage(v))
	}

	return &pb.MultipleAlbums{
		Albums: albumsMessage,
	}
}

func (s *AlbumGRPCService) albumToMessage(album domain.Album) *pb.AlbumMessage {
	return &pb.AlbumMessage{
		Id:          album.ID.String(),
		Name:        album.Name,
		Genres:      album.Genres,
		Styles:      album.Styles,
		TotalTracks: album.TotalTracks,
		Spotify: &pb.AlbumSpotify{
			Id:          album.Spotify.ID,
			Popularity:  album.Spotify.Popularity,
			ReleaseData: album.Spotify.ReleaseDate,
			Images:      utils.ImagesToMessage(album.Spotify.Images),
		},
	}
}
