package repository

import (
	"fmt"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
)

type TrackRepository struct {
	ESClient *elasticsearch.Client
}

func (r *TrackRepository) UpdatePlayCount(id string, playCount uint64) error {
	reqBody := fmt.Sprintf(`{
        "doc": {
            "playCount": %d
        }
    }`, playCount)

	_, err := r.ESClient.Update(
		"tracks",
		id,
		strings.NewReader(reqBody),
	)

	return err
}
