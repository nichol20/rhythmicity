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

func (r *TrackRepository) GetYoutubeId(ctx context.Context, id string) (string, error) {
	uuid, err := uuid.Parse(id)
	if err != nil {
		return "", domain.ErrNotFound
	}
	youtebeId, err := r.queries.GetYoutubeId(ctx, uuid)
	if err == sql.ErrNoRows {
		return youtebeId, domain.ErrNotFound
	}
	return youtebeId, err
}
