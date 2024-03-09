package repository

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
	db "github.com/nichol20/rhythmicity/data-api/internal/db/gen"
	"github.com/nichol20/rhythmicity/data-api/internal/domain"
)

type TrackRepository struct {
	queries *db.Queries
}

func NewTrackRepository(dbconn *sql.DB) *TrackRepository {
	queries := db.New(dbconn)

	return &TrackRepository{
		queries: queries,
	}
}

func (r *TrackRepository) GetYoutubeId(ctx context.Context, trackId string) (string, error) {
	uuid, err := uuid.Parse(trackId)
	if err != nil {
		return "", domain.ErrNotFound
	}
	youtebeId, err := r.queries.GetYoutubeId(ctx, uuid)
	if err == sql.ErrNoRows {
		return youtebeId, domain.ErrNotFound
	}
	return youtebeId, err
}

func (r *TrackRepository) GetPopularTracks(ctx context.Context, limit int32) (*[]db.GetPopularTracksRow, error) {
	tracks, err := r.queries.GetPopularTracks(ctx, limit)
	return &tracks, err
}

func (r *TrackRepository) GetTrack(ctx context.Context, trackId string) (*db.GetTrackRow, error) {
	uuid, err := uuid.Parse(trackId)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	track, err := r.queries.GetTrack(ctx, uuid)
	if err == sql.ErrNoRows {
		return nil, domain.ErrNotFound
	}

	return &track, err
}

func (r *TrackRepository) GetYoutubeThumbnails(ctx context.Context, youtubeDataId string) (*[]db.TrackThumbnailsYoutube, error) {
	uuid, err := uuid.Parse(youtubeDataId)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	thumbnails, err := r.queries.GetYoutubeThumbnails(ctx, uuid)
	return &thumbnails, err
}

func (r *TrackRepository) GetGenres(ctx context.Context, trackId string) (*[]string, error) {
	uuid, err := uuid.Parse(trackId)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	genres, err := r.queries.GetTrackGenres(ctx, uuid)
	return &genres, err
}

func (r *TrackRepository) GetStyles(ctx context.Context, trackId string) (*[]string, error) {
	uuid, err := uuid.Parse(trackId)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	styles, err := r.queries.GetTrackStyles(ctx, uuid)
	return &styles, err
}

func (r *TrackRepository) GetArtistIds(ctx context.Context, trackId string) (*[]uuid.UUID, error) {
	uuid, err := uuid.Parse(trackId)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	artistIds, err := r.queries.GetTrackArtistIds(ctx, uuid)
	return &artistIds, err
}

func (r *TrackRepository) GetTracksByArtistId(ctx context.Context, artistId string) (*[]db.GetTracksByArtistIdRow, error) {
	uuid, err := uuid.Parse(artistId)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	tracks, err := r.queries.GetTracksByArtistId(ctx, uuid)
	return &tracks, err
}

func (r *TrackRepository) GetTracksByAlbumId(ctx context.Context, albumId string) (*[]db.GetTracksByAlbumIdRow, error) {
	uuid, err := uuid.Parse(albumId)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	tracks, err := r.queries.GetTracksByAlbumId(ctx, uuid)
	return &tracks, err
}
