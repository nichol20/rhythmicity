package repository

import "database/sql"

type PlaybackRepository struct {
	DB *sql.DB
}

func (r *PlaybackRepository) Playback(id string) (string, error) {
	rows, err := r.DB.Query("SELECT y.youtubeId FROM tracks t INNER JOIN track_data_youtube y ON t.youtubeDataId = y.id WHERE t.id = $1;", id)
	if err != nil {
		return "", err
	}
	var youtubeId string
	rows.Next()
	err = rows.Scan(&youtubeId)

	return youtubeId, err
}
