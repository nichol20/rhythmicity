package service

import (
	"context"
	"errors"
	"fmt"

	"github.com/nichol20/rhythmicity/data-api/internal/domain"
	"github.com/nichol20/rhythmicity/data-api/internal/pb"
	"github.com/nichol20/rhythmicity/data-api/internal/utils"
)

type TrackRepositoryInterface interface {
	GetYoutubeId(ctx context.Context, id string) (string, error)
	GetPopularTracks(ctx context.Context, limit int32) ([]domain.Track, error)
	GetTrack(ctx context.Context, trackId string) (*domain.Track, error)
	GetTracksByArtistId(ctx context.Context, artistID string) ([]domain.Track, error)
	GetTracksByAlbumId(ctx context.Context, albumID string) ([]domain.Track, error)
}

type TrackGRPCService struct {
	TrackRepository TrackRepositoryInterface
	pb.UnimplementedTrackServer
}

func (s *TrackGRPCService) Playback(ctx context.Context, req *pb.RequestById) (*pb.PlaybackResponse, error) {
	youtubeId, err := s.TrackRepository.GetYoutubeId(ctx, req.Id)
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

func (s *TrackGRPCService) GetPopularTracks(ctx context.Context, req *pb.GetPopularTracksRequest) (*pb.MultipleTracks, error) {
	max := int32(20)
	limit := max
	if req != nil && req.Limit != nil && *req.Limit > 0 && *req.Limit < max {
		limit = *req.Limit
	}
	tracks, err := s.TrackRepository.GetPopularTracks(ctx, limit)
	if err != nil {
		fmt.Println(err)
		return nil, domain.ErrInternalServerError
	}
	var tracksMessage []*pb.TrackMessage
	for _, v := range tracks {
		tracksMessage = append(tracksMessage, s.trackToMessage(v))
	}

	return &pb.MultipleTracks{
		Tracks: tracksMessage,
	}, nil
}

func (s *TrackGRPCService) GetTrack(ctx context.Context, req *pb.RequestById) (*pb.TrackMessage, error) {
	track, err := s.TrackRepository.GetTrack(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, errors.New("track not found")
		}

		return nil, domain.ErrInternalServerError
	}
	return s.trackToMessage(*track), nil
}

func (s *TrackGRPCService) GetTracksByArtistId(ctx context.Context, req *pb.RequestById) (*pb.MultipleTracks, error) {
	tracks, err := s.TrackRepository.GetTracksByArtistId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, errors.New("artist not found")
		}

		return nil, domain.ErrInternalServerError
	}
	var tracksMessage []*pb.TrackMessage
	for _, v := range tracks {
		tracksMessage = append(tracksMessage, s.trackToMessage(v))
	}

	return &pb.MultipleTracks{
		Tracks: tracksMessage,
	}, nil
}

func (s *TrackGRPCService) GetTracksByAlbumId(ctx context.Context, req *pb.RequestById) (*pb.MultipleTracks, error) {
	tracks, err := s.TrackRepository.GetTracksByAlbumId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, errors.New("album not found")
		}

		return nil, domain.ErrInternalServerError
	}
	var tracksMessage []*pb.TrackMessage
	for _, v := range tracks {
		tracksMessage = append(tracksMessage, s.trackToMessage(v))
	}

	return &pb.MultipleTracks{
		Tracks: tracksMessage,
	}, nil
}

func (s *TrackGRPCService) trackToMessage(track domain.Track) *pb.TrackMessage {
	return &pb.TrackMessage{
		Id:        track.ID.String(),
		ArtistIds: track.ArtistIds.Strings(),
		AlbumId:   track.AlbumId.String(),
		Genres:    track.Genres,
		Styles:    track.Styles,
		Explicit:  track.Explicit,
		PlayCount: track.PlayCount,
		Lyrics:    track.Lyrics,
		Spotify: &pb.TrackSpotify{
			Id:          track.Spotify.ID,
			Title:       track.Spotify.Title,
			Popularity:  track.Spotify.Popularity,
			DurationMs:  track.Spotify.DurationMS,
			AlbumImages: utils.ImagesToMessage(track.Spotify.AlbumImages),
		},
		Youtube: &pb.Youtube{
			Id:          track.Youtube.ID,
			Title:       track.Youtube.Title,
			DurationMs:  track.Youtube.DurationMs,
			PublishedAt: track.Youtube.PublishedAt,
			Statistics: &pb.YoutubeStatistics{
				ViewCount:     track.Youtube.Statistics.ViewCount,
				LikeCount:     track.Youtube.Statistics.LikeCount,
				FavoriteCount: track.Youtube.Statistics.FavoriteCount,
				CommentCount:  track.Youtube.Statistics.CommentCount,
			},
			Thumbnails: &pb.YoutubeThumbnails{
				Default: &pb.Image{
					Height: track.Youtube.Thumbnails.Default.Height,
					Width:  track.Youtube.Thumbnails.Default.Width,
					Url:    track.Youtube.Thumbnails.Default.Url,
				},
				Medium: &pb.Image{
					Height: track.Youtube.Thumbnails.Medium.Height,
					Width:  track.Youtube.Thumbnails.Medium.Width,
					Url:    track.Youtube.Thumbnails.Medium.Url,
				},
				High: &pb.Image{
					Height: track.Youtube.Thumbnails.High.Height,
					Width:  track.Youtube.Thumbnails.High.Width,
					Url:    track.Youtube.Thumbnails.High.Url,
				},
				Standard: &pb.Image{
					Height: track.Youtube.Thumbnails.Standard.Height,
					Width:  track.Youtube.Thumbnails.Standard.Width,
					Url:    track.Youtube.Thumbnails.Standard.Url,
				},
				Maxres: &pb.Image{
					Height: track.Youtube.Thumbnails.Maxres.Height,
					Width:  track.Youtube.Thumbnails.Maxres.Width,
					Url:    track.Youtube.Thumbnails.Maxres.Url,
				},
			},
		},
	}
}
