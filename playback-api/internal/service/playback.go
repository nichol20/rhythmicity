package service

import (
	"context"
	"fmt"
	"log"

	"github.com/nichol20/rhythmicity/playback-api/internal/pb"
)

type PlaybackRepositoryInterface interface {
	Playback(id string) (string, error)
}

type PlaybackGrpcService struct {
	PlaybackRepository PlaybackRepositoryInterface
	pb.UnimplementedPlaybackServer
}

func (s *PlaybackGrpcService) Playback(ctx context.Context, playbackRequest *pb.PlaybackRequest) (*pb.PlaybackResponse, error) {
	youtubeId, err := s.PlaybackRepository.Playback(playbackRequest.Id)
	if err != nil {
		log.Printf("error when trying to playback: %v", err)
		return nil, fmt.Errorf("error when trying to playback: %w", err)
	}

	return &pb.PlaybackResponse{
		YoutubeId: youtubeId,
	}, nil
}
