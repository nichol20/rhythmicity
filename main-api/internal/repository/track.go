package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/google/uuid"
	db "github.com/nichol20/rhythmicity/main-api/internal/db/gen"
	"github.com/nichol20/rhythmicity/main-api/internal/domain"
	"github.com/nichol20/rhythmicity/main-api/internal/utils"
)

type TrackRepository struct {
	queries *db.Queries
}

func NewTrackRepository(dbconn *sql.DB) *TrackRepository {
	return &TrackRepository{
		queries: db.New(dbconn),
	}
}

func (r *TrackRepository) GetYoutubeId(ctx context.Context, trackID string) (string, error) {
	uuid, err := uuid.Parse(trackID)
	if err != nil {
		return "", domain.ErrNotFound
	}
	youtebeId, err := r.queries.GetTrackYoutubeId(ctx, uuid)
	return youtebeId, r.handleError(err)
}

func (r *TrackRepository) IncrementPlayCount(ctx context.Context, trackID string) (int64, error) {
	uuid, err := uuid.Parse(trackID)
	if err != nil {
		return 0, domain.ErrNotFound
	}
	playCount, err := r.queries.IncrementPlayCount(ctx, uuid)
	return playCount, err
}

type GetPopularTracksParams struct {
	Limit  uint32
	Offset uint32
}

func (r *TrackRepository) GetPopularTracks(ctx context.Context, arg GetPopularTracksParams) ([]domain.Track, error) {
	tracksRow, err := r.queries.GetPopularTracks(ctx, db.GetPopularTracksParams{
		Limit:  int32(arg.Limit),
		Offset: int32(arg.Offset),
	})
	if err != nil {
		return nil, err
	}
	var tracks []domain.Track
	for _, v := range tracksRow {
		track, err := r.createTrack(ctx, v)
		if err != nil {
			return nil, err
		}
		tracks = append(tracks, *track)
	}
	return tracks, err
}

func (r *TrackRepository) GetTrack(ctx context.Context, trackID string) (*domain.Track, error) {
	uuid, err := uuid.Parse(trackID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfTrackExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	trackRow, err := r.queries.GetTrack(ctx, uuid)
	if err != nil {
		return nil, err
	}
	track, err := r.createTrack(ctx, trackRow)
	if err != nil {
		return nil, err
	}

	return track, nil
}

func (r *TrackRepository) GetSeveralTracks(ctx context.Context, trackIDs []string) ([]domain.Track, error) {
	filteredIDs := utils.IDsToUUIDs(trackIDs)
	tracksRow, err := r.queries.GetSeveralTracks(ctx, filteredIDs)
	if err != nil {
		return nil, err
	}
	var tracks []domain.Track
	for _, v := range tracksRow {
		track, err := r.createTrack(ctx, v)
		if err != nil {
			return nil, err
		}
		tracks = append(tracks, *track)
	}
	return tracks, nil
}

type GetTracksByArtistIdParms struct {
	Artistid string
	Limit    uint32
	Offset   uint32
}

func (r *TrackRepository) GetTracksByArtistId(ctx context.Context, arg GetTracksByArtistIdParms) ([]domain.Track, error) {
	uuid, err := uuid.Parse(arg.Artistid)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfArtistExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	tracksRow, err := r.queries.GetTracksByArtistId(ctx, db.GetTracksByArtistIdParams{
		Artistid: uuid,
		Limit:    int32(arg.Limit),
		Offset:   int32(arg.Offset),
	})
	if err != nil {
		return nil, err
	}
	var tracks []domain.Track
	for _, v := range tracksRow {
		track, err := r.createTrack(ctx, v)
		if err != nil {
			return nil, err
		}
		tracks = append(tracks, *track)
	}
	return tracks, nil
}

type GetTracksByAlbumIdParams struct {
	Albumid string
	Limit   uint32
	Offset  uint32
}

func (r *TrackRepository) GetTracksByAlbumId(ctx context.Context, arg GetTracksByAlbumIdParams) ([]domain.Track, error) {
	uuid, err := uuid.Parse(arg.Albumid)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfAlbumExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	tracksRow, err := r.queries.GetTracksByAlbumId(ctx, db.GetTracksByAlbumIdParams{
		Albumid: uuid,
		Limit:   int32(arg.Limit),
		Offset:  int32(arg.Offset),
	})
	if err != nil {
		return nil, err
	}
	var tracks []domain.Track
	for _, v := range tracksRow {
		track, err := r.createTrack(ctx, v)
		if err != nil {
			return nil, err
		}
		tracks = append(tracks, *track)
	}
	return tracks, nil
}

func (r *TrackRepository) createTrack(ctx context.Context, row interface{}) (*domain.Track, error) {
	t, err := utils.TypeConverter[db.GetTrackRow](row)
	if err != nil {
		return nil, errors.New("error converting row to db.GetTrackRow")
	}
	details, err := r.getTrackDetails(ctx, t.Trackid, t.Albumid)
	if err != nil {
		return nil, err
	}

	return &domain.Track{
		ID:        t.Trackid,
		AlbumID:   t.Albumid,
		Genres:    details.Genres,
		Styles:    details.Styles,
		Explicit:  t.Explicit,
		PlayCount: uint64(t.Playcount),
		Lyrics:    t.Lyrics.String,
		Spotify: domain.SpotifyTrack{
			Title:       t.Spotifytitle,
			DurationMS:  uint32(t.Spotifydurationms),
			AlbumImages: details.AlbumImages,
			Spotify: domain.Spotify{
				ID:         t.Spotifyid,
				Popularity: uint32(t.Spotifypopularity),
			},
		},
		Youtube: domain.Youtube{
			ID:          t.Youtubeid,
			Title:       t.Youtubetitle,
			DurationMs:  uint32(t.Youtubedurationms),
			PublishedAt: t.Youtubepublishedat.String(),
			Thumbnails:  details.Thumbnails,
			Statistics: domain.YoutubeStatistcs{
				ViewCount:     t.Youtubeviewcount,
				LikeCount:     t.Youtubelikecount,
				FavoriteCount: t.Youtubefavoritecount,
				CommentCount:  t.Youtubefavoritecount,
			},
		},
	}, nil
}

func (r *TrackRepository) handleError(err error) error {
	if err == sql.ErrNoRows {
		return domain.ErrNotFound
	}
	return err
}

type TrackDetails struct {
	Genres      []string
	Styles      []string
	AlbumImages []domain.Image
	Thumbnails  domain.YoutubeThumbnails
}

func (r *TrackRepository) getTrackDetails(ctx context.Context, trackID uuid.UUID, albumID uuid.UUID) (*TrackDetails, error) {
	genres, err := r.queries.GetTrackGenres(ctx, trackID)
	if err != nil {
		return nil, err
	}

	styles, err := r.queries.GetTrackStyles(ctx, trackID)
	if err != nil {
		return nil, err
	}

	albumImages, err := r.getAlbumImages(ctx, albumID)
	if err != nil {
		return nil, err
	}

	thumbnails, err := r.getYoutubeThumbnails(ctx, trackID)
	if err != nil {
		return nil, err
	}

	return &TrackDetails{
		Genres:      genres,
		Styles:      styles,
		AlbumImages: albumImages,
		Thumbnails:  thumbnails,
	}, nil
}

func (r *TrackRepository) getAlbumImages(ctx context.Context, albumID uuid.UUID) ([]domain.Image, error) {
	albumImagesRow, err := r.queries.GetAlbumSpotifyImages(ctx, albumID)
	if err != nil {
		return nil, err
	}

	var albumImages []domain.Image
	for _, v := range albumImagesRow {
		image := domain.Image{
			Height: uint32(v.Height),
			Width:  uint32(v.Width),
			Url:    v.Url,
		}
		albumImages = append(albumImages, image)
	}

	return albumImages, nil
}

func (r *TrackRepository) getYoutubeThumbnails(ctx context.Context, trackID uuid.UUID) (domain.YoutubeThumbnails, error) {
	thumbnailsRow, err := r.queries.GetTrackYoutubeThumbnails(ctx, trackID)
	if err != nil {
		return domain.YoutubeThumbnails{}, err
	}

	thumbnails := domain.YoutubeThumbnails{}
	for _, v := range thumbnailsRow {
		switch v.Type {
		case "default":
			thumbnails.Default = domain.Image{
				Height: uint32(v.Height),
				Width:  uint32(v.Width),
				Url:    v.Url,
			}
		case "medium":
			thumbnails.Medium = domain.Image{
				Height: uint32(v.Height),
				Width:  uint32(v.Width),
				Url:    v.Url,
			}
		case "high":
			thumbnails.High = domain.Image{
				Height: uint32(v.Height),
				Width:  uint32(v.Width),
				Url:    v.Url,
			}
		case "standard":
			thumbnails.Standard = domain.Image{
				Height: uint32(v.Height),
				Width:  uint32(v.Width),
				Url:    v.Url,
			}
		case "maxres":
			thumbnails.Maxres = domain.Image{
				Height: uint32(v.Height),
				Width:  uint32(v.Width),
				Url:    v.Url,
			}
		}
	}

	return thumbnails, nil
}
