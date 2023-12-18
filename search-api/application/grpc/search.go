package grpc

import (
	"context"
	"fmt"

	"github.com/nichol20/rhythmicity/search-api/application/grpc/pb"
	"github.com/nichol20/rhythmicity/search-api/domain/model"
)

type SearchGrpcService struct {
	SearchRepository model.SearchRepositoryInterface
	pb.UnimplementedSearchServer
}

func (s *SearchGrpcService) Search(ctx context.Context, searchRequest *pb.SearchRequest) (*pb.SearchResponse, error) {
	search := model.Search{
		Query: searchRequest.Query,
	}

	var tracks []*pb.Track

	hits, err := s.SearchRepository.Search(ctx, &search)
	if err != nil {
		return nil, fmt.Errorf("error when trying to search: %s", err)
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
			YoutubeId:   hit.Source.YoutubeID,
			ImageUrl:    hit.Source.ImageUrl,
		})
	}

	return &pb.SearchResponse{
		Tracks: tracks,
	}, nil
}
