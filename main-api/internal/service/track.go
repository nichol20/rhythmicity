package service

import (
	"context"
	"errors"
	"log/slog"

	"github.com/nichol20/rhythmicity/main-api/internal/domain"
	"github.com/nichol20/rhythmicity/main-api/internal/pb"
	"github.com/nichol20/rhythmicity/main-api/internal/repository"
	"github.com/nichol20/rhythmicity/main-api/internal/utils"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type TrackRepositoryInterface interface {
	GetYoutubeId(ctx context.Context, id string) (string, error)
	GetPopularTracks(ctx context.Context, arg repository.GetPopularTracksParams) ([]domain.Track, error)
	GetTrack(ctx context.Context, trackId string) (*domain.Track, error)
	GetSeveralTracks(ctx context.Context, trackIDs []string) ([]domain.Track, error)
	GetTracksByArtistId(ctx context.Context, arg repository.GetTracksByArtistIdParms) ([]domain.Track, error)
	GetTracksByAlbumId(ctx context.Context, arg repository.GetTracksByAlbumIdParams) ([]domain.Track, error)
}

type TrackGRPCService struct {
	TrackRepository  TrackRepositoryInterface
	ArtistRepository ArtistRepositoryInterface
	AlbumRepository  AlbumRepositoryInterface
	pb.UnimplementedTrackServer
}

func (s *TrackGRPCService) Playback(ctx context.Context, req *pb.RequestById) (*pb.PlaybackResponse, error) {
	youtubeId, err := s.TrackRepository.GetYoutubeId(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "track not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	return &pb.PlaybackResponse{
		YoutubeId: youtubeId,
	}, nil
}

func (s *TrackGRPCService) GetPopularTracks(ctx context.Context, req *pb.GetPopularTracksRequest) (*pb.MultipleTracks, error) {
	limit, offset := utils.CheckLimitAndOffset(utils.CheckLimitAndOffsetParams{
		Limit:  req.Limit,
		Offset: req.Offset,
	})

	tracks, err := s.TrackRepository.GetPopularTracks(ctx, repository.GetPopularTracksParams{
		Limit:  limit,
		Offset: offset,
	})

	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	message, err := s.tracksToMessage(ctx, tracks)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return message, nil
}

func (s *TrackGRPCService) GetTrack(ctx context.Context, req *pb.RequestById) (*pb.TrackMessage, error) {
	track, err := s.TrackRepository.GetTrack(ctx, req.Id)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "track not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	message, err := s.trackToMessage(ctx, *track)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return message, nil
}

func (s *TrackGRPCService) GetSeveralTracks(ctx context.Context, req *pb.RequestByIds) (*pb.MultipleTracks, error) {
	tracks, err := s.TrackRepository.GetSeveralTracks(ctx, req.Ids)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	message, err := s.tracksToMessage(ctx, tracks)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return message, nil
}

func (s *TrackGRPCService) GetTracksByArtistId(ctx context.Context, req *pb.GetTracksByArtistIdRequest) (*pb.MultipleTracks, error) {
	limit, offset := utils.CheckLimitAndOffset(utils.CheckLimitAndOffsetParams{
		Limit:  req.Limit,
		Offset: req.Offset,
	})

	tracks, err := s.TrackRepository.GetTracksByArtistId(ctx, repository.GetTracksByArtistIdParms{
		Artistid: req.Id,
		Limit:    limit,
		Offset:   offset,
	})
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "artist not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	message, err := s.tracksToMessage(ctx, tracks)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return message, nil
}

func (s *TrackGRPCService) GetTracksByAlbumId(ctx context.Context, req *pb.GetTracksByAlbumIdRequest) (*pb.MultipleTracks, error) {
	limit, offset := utils.CheckLimitAndOffset(utils.CheckLimitAndOffsetParams{
		Limit:  req.Limit,
		Offset: req.Offset,
	})

	tracks, err := s.TrackRepository.GetTracksByAlbumId(ctx, repository.GetTracksByAlbumIdParams{
		Albumid: req.Id,
		Limit:   limit,
		Offset:  offset,
	})

	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			return nil, status.Errorf(codes.NotFound, "album not found")
		}

		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}

	message, err := s.tracksToMessage(ctx, tracks)
	if err != nil {
		slog.Error(err.Error())
		return nil, status.Errorf(codes.Internal, domain.ErrInternalServerError.Error())
	}
	return message, nil
}

func (s *TrackGRPCService) tracksToMessage(ctx context.Context, tracks []domain.Track) (*pb.MultipleTracks, error) {
	var tracksMessage []*pb.TrackMessage
	for _, v := range tracks {
		message, err := s.trackToMessage(ctx, v)
		if err != nil {
			return nil, err
		}
		tracksMessage = append(tracksMessage, message)
	}

	return &pb.MultipleTracks{
		Tracks: tracksMessage,
	}, nil
}

func (s *TrackGRPCService) trackToMessage(ctx context.Context, track domain.Track) (*pb.TrackMessage, error) {
	artists, err := s.ArtistRepository.GetSimplifiedArtistsByTrackId(ctx, track.ID.String())
	if err != nil {
		return nil, err
	}
	var artistsMessage []*pb.SimplifiedArtist
	for _, a := range artists {
		artistsMessage = append(artistsMessage, &pb.SimplifiedArtist{
			Id:   a.ID.String(),
			Name: a.Name,
		})
	}

	album, err := s.AlbumRepository.GetSimplifiedAlbum(ctx, track.AlbumID.String())
	if err != nil {
		return nil, err
	}

	return &pb.TrackMessage{
		Id: track.ID.String(),
		Album: &pb.SimplifiedAlbum{
			Id:   album.ID.String(),
			Name: album.Name,
		},
		Artists:   artistsMessage,
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
	}, nil
}
