package repository

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/nichol20/rhythmicity/search-api/internal/domain"
)

type SearchRepository struct {
	ESClient *elasticsearch.Client
}

func (r *SearchRepository) Search(ctx context.Context, search *domain.Search) ([]*domain.Hit, error) {
	var searchBuffer bytes.Buffer
	indexName := r.getIndexNameByKind(search.Kind)
	var query string
	queries := strings.Split(search.Query, " ")

	for _, q := range queries {
		query += "*" + q + "*"
	}

	filter := []map[string]any{
		{
			"terms": map[string]any{},
		},
	}

	if len(search.Filters.Genres) > 0 {
		filter[0]["terms"].(map[string]any)["genres"] = search.Filters.Genres
	}

	if len(search.Filters.Styles) > 0 {
		filter[0]["terms"].(map[string]any)["styles"] = search.Filters.Styles
	}

	searchStructure := map[string]any{
		"from": search.Offset,
		"size": search.Limit,
		"query": map[string]any{
			"bool": map[string]any{
				"must": []map[string]any{
					{
						"query_string": map[string]any{
							"query":  query,
							"fields": []string{"artistNames", "name^2", "lyrics", "albumName"},
						},
					},
				},
			},
		},
	}

	if len(search.Filters.Genres) > 0 || len(search.Filters.Styles) > 0 {
		searchStructure["query"].(map[string]any)["bool"].(map[string]any)["filter"] = filter
	}

	if err := json.NewEncoder(&searchBuffer).Encode(searchStructure); err != nil {
		return nil, fmt.Errorf("error encoding query: %s", err)
	}

	res, err := r.ESClient.Search(
		r.ESClient.Search.WithContext(ctx),
		r.ESClient.Search.WithIndex(indexName),
		r.ESClient.Search.WithBody(&searchBuffer),
		r.ESClient.Search.WithTrackTotalHits(true),
		r.ESClient.Search.WithPretty(),
	)

	if err != nil {
		return nil, fmt.Errorf("error searching: %s", err)
	}

	if res.IsError() {
		return nil, fmt.Errorf("error in search response: %+v", res)
	}

	defer res.Body.Close()

	var searchResponse = domain.SearchResponse{}

	if err = json.NewDecoder(res.Body).Decode(&searchResponse); err != nil {
		return nil, fmt.Errorf("error parsing the response body: %s", err)
	}

	return searchResponse.Hits.Hits, nil
}

func (r *SearchRepository) getIndexNameByKind(kind string) string {
	switch kind {
	case "artists":
		return "artists"
	case "albums":
		return "albums"
	case "tracks":
		return "tracks"
	default:
		return "_all"
	}
}
