package grpc

import (
	"context"
	"fmt"
	"log"

	"github.com/nichol20/rhythmicity/playback-api/application/grpc/pb"
	"github.com/nichol20/rhythmicity/playback-api/domain/model"
)

type PlaybackGrpcService struct {
	PlaybackRepository model.PlaybackRepositoryInterface
	pb.UnimplementedPlaybackServer
}

func (s *PlaybackGrpcService) Playback(ctx context.Context, playbackRequest *pb.PlaybackRequest) (*pb.PlaybackResponse, error) {
	youtubeId, err := s.PlaybackRepository.Playback(playbackRequest.Id)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("error when trying to playback")
	}

	return &pb.PlaybackResponse{
		YoutubeId: youtubeId,
	}, nil
}
