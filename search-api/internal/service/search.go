package service

import (
	"context"
	"log/slog"
	"strings"

	"github.com/nichol20/rhythmicity/search-api/internal/domain"
	"github.com/nichol20/rhythmicity/search-api/internal/pb"
	"github.com/nichol20/rhythmicity/search-api/internal/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type SearchRepositoryInterface interface {
	SearchAll(ctx context.Context, search *domain.Search) ([]*domain.Hit, error)
	SearchAlbum(ctx context.Context, search *domain.Search) ([]*domain.Hit, error)
	SearchArtist(ctx context.Context, search *domain.Search) ([]*domain.Hit, error)
	SearchTrack(ctx context.Context, search *domain.Search) ([]*domain.Hit, error)
}

type SearchGrpcService struct {
	SearchRepository SearchRepositoryInterface
	pb.UnimplementedSearchServer
}

func (s *SearchGrpcService) Search(ctx context.Context, req *pb.SearchRequest) (*pb.SearchResponse, error) {
	const defaultLimit uint32 = 20

	offset := uint32(0)
	limit := defaultLimit
	kind := "all"
	var genres []string
	var styles []string

	if req != nil {
		if req.Offset != nil && *req.Offset > 0 {
			offset = *req.Offset
		}
		if req.Limit != nil && *req.Limit > 0 && *req.Limit < defaultLimit {
			limit = *req.Limit
		}
		if req.Kind != nil {
			kind = strings.ToLower(req.Kind.String())
		}
		if req.Filters != nil {
			genres = req.Filters.Genres
			styles = req.Filters.Styles
		}
	}

	search := domain.Search{
		Query:  req.Query,
		Offset: offset,
		Limit:  limit,
		Kind:   kind,
		Filters: domain.Filters{
			Genres: genres,
			Styles: styles,
		},
	}

	var tracks []*pb.Track
	var artists []*pb.Artist
	var albums []*pb.Album
	var bestResult *pb.BestResult
	var hits []*domain.Hit
	var err error

	switch search.Kind {
	case "albums":
		hits, err = s.SearchRepository.SearchAlbum(ctx, &search)
		if err != nil {
			slog.Error(err.Error())
			return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
		}
	case "artists":
		hits, err = s.SearchRepository.SearchArtist(ctx, &search)
		if err != nil {
			slog.Error(err.Error())
			return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
		}
	case "tracks":
		hits, err = s.SearchRepository.SearchTrack(ctx, &search)
		if err != nil {
			slog.Error(err.Error())
			return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
		}
	default:
		hits, err = s.SearchRepository.SearchAll(ctx, &search)
		if err != nil {
			slog.Error(err.Error())
			return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
		}
	}

	for i, hit := range hits {
		if (*hit.Source).(map[string]any)["type"] == "track" {
			track, err := utils.TypeConverter[domain.Track](*hit.Source)
			if err == nil {
				pbTrack := &pb.Track{
					Id:          track.ID,
					Name:        track.Name,
					ArtistNames: track.ArtistNames,
					AlbumName:   track.AlbumName,
					Lyrics:      track.Lyrics,
					Explicit:    track.Explicit,
					PlayCount:   track.PlayCount,
					DurationMs:  track.DurationMs,
					Genres:      track.Genres,
					Styles:      track.Styles,
					Images:      utils.ImagesToMessage(track.Images),
					Type:        track.Type,
				}
				if i == 0 {
					bestResult = &pb.BestResult{
						Type: &pb.BestResult_Track{Track: pbTrack},
					}
				}
				tracks = append(tracks, pbTrack)
			}
			if err != nil {
				slog.Error("Error converting hit.Source to domain.Track: %s", err)
			}
		}

		if (*hit.Source).(map[string]any)["type"] == "artist" {
			artist, err := utils.TypeConverter[domain.Artist](*hit.Source)
			if err == nil {
				pbArtist := &pb.Artist{
					Id:         artist.ID,
					Name:       artist.Name,
					Genres:     artist.Genres,
					Styles:     artist.Styles,
					Images:     utils.ImagesToMessage(artist.Images),
					Popularity: artist.Popularity,
					Type:       artist.Type,
				}
				if i == 0 {
					bestResult = &pb.BestResult{
						Type: &pb.BestResult_Artist{Artist: pbArtist},
					}
				}
				artists = append(artists, pbArtist)
			}
			if err != nil {
				slog.Error("Error converting hit.Source to domain.Artist: %s", err)
			}
		}

		if (*hit.Source).(map[string]any)["type"] == "album" {
			album, err := utils.TypeConverter[domain.Album](*hit.Source)
			if err == nil {
				pbAlbum := &pb.Album{
					Id:          album.ID,
					Name:        album.Name,
					ArtistNames: album.ArtistNames,
					Genres:      album.Genres,
					Styles:      album.Styles,
					ReleaseDate: album.ReleaseDate,
					TotalTracks: album.TotalTracks,
					Images:      utils.ImagesToMessage(album.Images),
					Popularity:  album.Popularity,
					Type:        album.Type,
				}
				if i == 0 {
					bestResult = &pb.BestResult{
						Type: &pb.BestResult_Album{Album: pbAlbum},
					}
				}
				albums = append(albums, pbAlbum)
			}
			if err != nil {
				slog.Error("Error converting hit.Source to domain.Album: %s", err)
			}
		}
	}

	return &pb.SearchResponse{
		BestResult: bestResult,
		Tracks:     tracks,
		Artists:    artists,
		Albums:     albums,
	}, nil
}
