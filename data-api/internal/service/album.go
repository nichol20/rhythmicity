package service

import (
	"context"
	"errors"

	"github.com/nichol20/rhythmicity/data-api/internal/domain"
	"github.com/nichol20/rhythmicity/data-api/internal/pb"
	"github.com/nichol20/rhythmicity/data-api/internal/utils"
)

type AlbumRepositoryInterface interface {
	GetPopularAlbums(ctx context.Context, limit int32) ([]domain.Album, error)
	GetAlbum(ctx context.Context, albumID string) (*domain.Album, error)
	GetAlbumByTrackId(ctx context.Context, trackID string) (*domain.Album, error)
	GetAlbumsByArtistId(ctx context.Context, artistID string) ([]domain.Album, error)
}

type AlbumGRPCService struct {
	AlbumRepository AlbumRepositoryInterface
	pb.UnimplementedAlbumServer
}

func (s *AlbumGRPCService) GetPopularAlbums(ctx context.Context, req *pb.GetPopularAlbumsRequest) (*pb.MultipleAlbums, error) {
	max := int32(20)
	limit := max
	if req != nil && req.Limit != nil && *req.Limit > 0 && *req.Limit < max {
		limit = *req.Limit
	}
	albums, err := s.AlbumRepository.GetPopularAlbums(ctx, limit)
	if err != nil {
		return nil, domain.ErrInternalServerError
	}
	var albumsMessage []*pb.AlbumMessage
	for _, v := range albums {
		albumsMessage = append(albumsMessage, s.albumToMessage(v))
	}

	return &pb.MultipleAlbums{
		Albums: albumsMessage,
	}, nil
}

func (s *AlbumGRPCService) GetAlbum(ctx context.Context, req *pb.RequestById) (*pb.AlbumMessage, error) {
	album, err := s.AlbumRepository.GetAlbum(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, errors.New("album not found")
		}

		return nil, domain.ErrInternalServerError
	}
	return s.albumToMessage(*album), nil
}

func (s *AlbumGRPCService) GetAlbumByTrackId(ctx context.Context, req *pb.RequestById) (*pb.AlbumMessage, error) {
	album, err := s.AlbumRepository.GetAlbumByTrackId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, errors.New("track not found")
		}

		return nil, domain.ErrInternalServerError
	}
	return s.albumToMessage(*album), nil
}

func (s *AlbumGRPCService) GetAlbumsByArtistId(ctx context.Context, req *pb.RequestById) (*pb.MultipleAlbums, error) {
	albums, err := s.AlbumRepository.GetAlbumsByArtistId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, errors.New("artist not found")
		}

		return nil, domain.ErrInternalServerError
	}
	var albumsMessage []*pb.AlbumMessage
	for _, v := range albums {
		albumsMessage = append(albumsMessage, s.albumToMessage(v))
	}

	return &pb.MultipleAlbums{
		Albums: albumsMessage,
	}, nil
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
