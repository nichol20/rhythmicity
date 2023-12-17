package model

import "context"

type Search struct {
	Query string `json:"query"`
}

type Hit struct {
	Source *Track `json:"_source"`
}

type SearchResponse struct {
	Hits struct {
		Total struct {
			Value int64 `json:"value"`
		} `json:"total"`
		Hits []*Hit `json:"hits"`
	} `json:"hits"`
}

type SearchRepositoryInterface interface {
	Search(ctx context.Context, search *Search) ([]*Hit, error)
}
