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

func (r *SearchRepository) SearchAll(ctx context.Context, search *domain.Search) ([]*domain.Hit, error) {
	searchStructure := r.mountSearchStructure(search)
	return r.getHits(ctx, searchStructure, "_all")
}

func (r *SearchRepository) SearchAlbum(ctx context.Context, search *domain.Search) ([]*domain.Hit, error) {
	searchStructure := r.mountSearchStructure(search)
	return r.getHits(ctx, searchStructure, "albums")
}

func (r *SearchRepository) SearchArtist(ctx context.Context, search *domain.Search) ([]*domain.Hit, error) {
	searchStructure := r.mountSearchStructure(search)
	return r.getHits(ctx, searchStructure, "artists")
}

func (r *SearchRepository) SearchTrack(ctx context.Context, search *domain.Search) ([]*domain.Hit, error) {
	searchStructure := r.mountSearchStructure(search)
	return r.getHits(ctx, searchStructure, "tracks")
}

func (r *SearchRepository) mountSearchStructure(search *domain.Search) map[string]any {
	var query string
	queries := strings.Split(search.Query, " ")

	for _, q := range queries {
		query += "*" + q + "* "
	}

	filter := []map[string]any{}

	if len(search.Filters.Genres) > 0 {
		filter = append(filter, map[string]any{
			"terms": map[string]any{
				"genres": search.Filters.Genres,
			},
		})
	}

	if len(search.Filters.Styles) > 0 {
		filter = append(filter, map[string]any{
			"terms": map[string]any{
				"styles": search.Filters.Styles,
			},
		})
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
							"fields": []string{"artists.name", "name^2", "lyrics", "album.name"},
						},
					},
				},
			},
		},
	}

	searchStructure["query"].(map[string]any)["bool"].(map[string]any)["filter"] = filter

	return searchStructure
}

func (r *SearchRepository) getHits(ctx context.Context, searchStructure map[string]any, indexName string) ([]*domain.Hit, error) {
	var searchBuffer bytes.Buffer

	if err := json.NewEncoder(&searchBuffer).Encode(searchStructure); err != nil {
		return nil, fmt.Errorf("error encoding query: %s", err)
	}

	res, err := r.ESClient.Search(
		r.ESClient.Search.WithContext(ctx),
		r.ESClient.Search.WithIndex(indexName),
		r.ESClient.Search.WithBody(&searchBuffer),
		r.ESClient.Search.WithTrackTotalHits(true),
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
