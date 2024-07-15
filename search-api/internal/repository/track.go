package repository

import (
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
)

type TrackRepository struct {
	ESClient *elasticsearch.Client
}

func (r *TrackRepository) UpdatePlayCount(id string) error {
	_, err := r.ESClient.Update(
		"tracks",
		id,
		strings.NewReader(`{
		  "script": {
			"source": "ctx._source.playCount += params.count",
			"lang": "painless",
			"params": {
			  "count": 1
			}
		  }
		}`),
		r.ESClient.Update.WithPretty(),
	)

	return err
}
