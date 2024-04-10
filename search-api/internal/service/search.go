package service

import (
	"context"
	"log/slog"

	"github.com/nichol20/rhythmicity/search-api/internal/domain"
	"github.com/nichol20/rhythmicity/search-api/internal/pb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type SearchGrpcService struct {
	SearchRepository domain.SearchRepositoryInterface
	pb.UnimplementedSearchServer
}

func (s *SearchGrpcService) Search(ctx context.Context, searchRequest *pb.SearchRequest) (*pb.SearchResponse, error) {
	search := domain.Search{
		Query: searchRequest.Query,
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
