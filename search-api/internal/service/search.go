package service

import (
	"context"
	"log/slog"
	"strings"

	"github.com/nichol20/rhythmicity/search-api/internal/domain"
	"github.com/nichol20/rhythmicity/search-api/internal/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type SearchGrpcService struct {
	SearchRepository domain.SearchRepositoryInterface
	pb.UnimplementedSearchServer
}

func (s *SearchGrpcService) Search(ctx context.Context, req *pb.SearchRequest) (*pb.SearchResponse, error) {
	const defaultLimit uint32 = 20

	offset := uint32(0)
	limit := defaultLimit
	kind := "all"

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
	}

	search := domain.Search{
		Query:  req.Query,
		Offset: offset,
		Limit:  limit,
		Kind:   kind,
	}

	var tracks []*pb.Track

	hits, err := s.SearchRepository.Search(ctx, &search)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	for _, hit := range hits {
		tracks = append(tracks, &pb.Track{
			Id:          hit.Source.ID,
			TrackName:   hit.Source.TrackName,
			ArtistNames: hit.Source.ArtistNames,
			AlbumName:   hit.Source.AlbumName,
			Lyrics:      hit.Source.Lyrics,
			Explicit:    hit.Source.Explicit,
			PlayCount:   hit.Source.PlayCount,
			Genres:      hit.Source.Genres,
			Styles:      hit.Source.Styles,
			ImageUrl:    hit.Source.ImageUrl,
		})
	}

	return &pb.SearchResponse{
		Tracks: tracks,
	}, nil
}
