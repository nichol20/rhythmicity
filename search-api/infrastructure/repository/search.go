package repository

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/nichol20/rhythmicity/search-api/domain/model"
)

type SearchRepository struct {
	ESClient *elasticsearch.Client
}

func (r *SearchRepository) Search(ctx context.Context, search *model.Search) ([]*model.Hit, error) {
	var searchBuffer bytes.Buffer

	searchStructure := map[string]interface{}{
		"query": map[string]interface{}{
			"multi_match": map[string]interface{}{
				"query": search.Query,
				"fields": []string{
					"artistNames",
					"trackName",
					"lyrics",
				},
			},
		},
	}

	if err := json.NewEncoder(&searchBuffer).Encode(searchStructure); err != nil {
		return nil, fmt.Errorf("error encoding query: %s", err)
	}

	res, err := r.ESClient.Search(
		r.ESClient.Search.WithContext(ctx),
		r.ESClient.Search.WithIndex("tracks"),
		r.ESClient.Search.WithBody(&searchBuffer),
		r.ESClient.Search.WithTrackTotalHits(true),
		r.ESClient.Search.WithPretty(),
	)

	if err != nil {
		return nil, fmt.Errorf("error searching: %s", err)
	}
	defer res.Body.Close()

	var searchResponse = model.SearchResponse{}

	if err = json.NewDecoder(res.Body).Decode(&searchResponse); err != nil {
		return nil, fmt.Errorf("error parsing the response body: %s", err)
	}

	return searchResponse.Hits.Hits, nil
}
