package service

import (
	"context"
	"errors"

	"github.com/nichol20/rhythmicity/data-api/internal/domain"
	"github.com/nichol20/rhythmicity/data-api/internal/pb"
)

type TrackRepositoryInterface interface {
	GetYoutubeId(ctx context.Context, id string) (string, error)
}

type TrackGRPCService struct {
	TrackRepository TrackRepositoryInterface
	pb.UnimplementedTrackServer
}

func (s *TrackGRPCService) Playback(ctx context.Context, playbackRequest *pb.PlaybackRequest) (*pb.PlaybackResponse, error) {
	youtubeId, err := s.TrackRepository.GetYoutubeId(ctx, playbackRequest.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, errors.New("track not found")
		}

		return nil, domain.ErrInternalServerError
	}

	return &pb.PlaybackResponse{
		YoutubeId: youtubeId,
	}, nil
}
