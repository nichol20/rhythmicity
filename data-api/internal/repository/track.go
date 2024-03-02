package repository

import (
	"context"
	"database/sql"
	"log"

	"github.com/google/uuid"
	db "github.com/nichol20/rhythmicity/data-api/internal/db/gen"
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
		log.Println(err)
		return "", err
	}
	youtebeId, err := r.queries.GetYoutubeId(ctx, uuid)
	return youtebeId, err
}
