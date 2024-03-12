package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/google/uuid"
	db "github.com/nichol20/rhythmicity/data-api/internal/db/gen"
	"github.com/nichol20/rhythmicity/data-api/internal/domain"
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

func (r *TrackRepository) GetPopularTracks(ctx context.Context, limit int32) ([]domain.Track, error) {
	tracksRow, err := r.queries.GetPopularTracks(ctx, limit)
	var tracks []domain.Track
	for _, v := range tracksRow {
		track, err := r.mapTrack(ctx, v)
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
	exists, err := r.checkIfTrackExists(ctx, uuid)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, domain.ErrNotFound
	}
	trackRow, err := r.queries.GetTrack(ctx, uuid)
	if err != nil {
		return nil, err
	}
	track, err := r.mapTrack(ctx, trackRow)
	if err != nil {
		return nil, err
	}

	return track, nil
}

func (r *TrackRepository) GetTracksByArtistId(ctx context.Context, artistID string) ([]domain.Track, error) {
	uuid, err := uuid.Parse(artistID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	tracksRow, err := r.queries.GetTracksByArtistId(ctx, uuid)
	var tracks []domain.Track
	for _, v := range tracksRow {
		track, err := r.mapTrack(ctx, v)
		if err != nil {
			return nil, err
		}
		tracks = append(tracks, *track)
	}
	return tracks, err
}

func (r *TrackRepository) GetTracksByAlbumId(ctx context.Context, albumID string) ([]domain.Track, error) {
	uuid, err := uuid.Parse(albumID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	tracksRow, err := r.queries.GetTracksByAlbumId(ctx, uuid)
	var tracks []domain.Track
	for _, v := range tracksRow {
		track, err := r.mapTrack(ctx, v)
		if err != nil {
			return nil, err
		}
		tracks = append(tracks, *track)
	}
	return tracks, err
}

func (r *TrackRepository) handleError(err error) error {
	if err == sql.ErrNoRows {
		return domain.ErrNotFound
	}
	return err
}

func (r *TrackRepository) checkIfTrackExists(ctx context.Context, trackID uuid.UUID) (bool, error) {
	exists, err := r.queries.CheckIfTrackExists(ctx, trackID)
	return exists, err
}

type getTrackDetailsRes struct {
	ArtistIds   []uuid.UUID
	Genres      []string
	Styles      []string
	AlbumImages []domain.Image
	Thumbnails  domain.YoutubeThumbnails
}

func (r *TrackRepository) getTrackDetails(ctx context.Context, trackID uuid.UUID, albumID uuid.UUID) (*getTrackDetailsRes, error) {
	artistIds, err := r.queries.GetTrackArtistIds(ctx, trackID)
	if err != nil {
		return nil, err
	}

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

	return &getTrackDetailsRes{
		ArtistIds:   artistIds,
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
			Height: int(v.Height),
			Width:  int(v.Width),
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
				Height: int(v.Height),
				Width:  int(v.Width),
				Url:    v.Url,
			}
		case "medium":
			thumbnails.Medium = domain.Image{
				Height: int(v.Height),
				Width:  int(v.Width),
				Url:    v.Url,
			}
		case "high":
			thumbnails.High = domain.Image{
				Height: int(v.Height),
				Width:  int(v.Width),
				Url:    v.Url,
			}
		case "standard":
			thumbnails.Standard = domain.Image{
				Height: int(v.Height),
				Width:  int(v.Width),
				Url:    v.Url,
			}
		case "maxres":
			thumbnails.Maxres = domain.Image{
				Height: int(v.Height),
				Width:  int(v.Width),
				Url:    v.Url,
			}
		}
	}

	return thumbnails, nil
}

func (r *TrackRepository) mapTrack(ctx context.Context, row interface{}) (*domain.Track, error) {
	t, ok := row.(db.GetTrackRow)
	if !ok {
		return nil, errors.New("Error asserting type as db.GetTrackRow")
	}
	details, err := r.getTrackDetails(ctx, t.Trackid, t.Albumid)
	if err != nil {
		return nil, err
	}
	return &domain.Track{
		ID:        t.Trackid,
		AlbumId:   t.Albumid,
		ArtistIds: details.ArtistIds,
		Genres:    details.Genres,
		Styles:    details.Styles,
		Explicit:  t.Explicit,
		PlayCount: int(t.Playcount),
		Lyrics:    "track.Lyrics",
		Spotify: domain.SpotifyTrack{
			DurationMS:  int(t.Spotifydurationms),
			AlbumImages: details.AlbumImages,
			Spotify: domain.Spotify{
				ID:         t.Spotifyid,
				Title:      t.Spotifytitle,
				Popularity: int(t.Spotifypopularity),
			},
		},
		YouTube: domain.YouTube{
			ID:          t.Youtubeid,
			Title:       t.Youtubetitle,
			DurationMs:  int(t.Youtubedurationms),
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
