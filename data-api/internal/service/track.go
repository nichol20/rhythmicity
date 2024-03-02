package service

import (
	"context"
	"fmt"
	"log"

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
		log.Printf("error when trying to playback: %v", err)
		return nil, fmt.Errorf("error when trying to playback: %w", err)
	}

	return &pb.PlaybackResponse{
		YoutubeId: youtubeId,
	}, nil
}
