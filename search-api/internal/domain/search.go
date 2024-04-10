package domain

import "context"

type Search struct {
	Query  string `json:"query"`
	Offset uint32 `json:"offset"`
	Limit  uint32 `json:"limit"`
	Kind   string `json:"kind"`
}

type Hit struct {
	Source *Track `json:"_source"`
}

type SearchResponse struct {
	Hits struct {
		Total struct {
			Value uint64 `json:"value"`
		} `json:"total"`
		Hits []*Hit `json:"hits"`
	} `json:"hits"`
}

type SearchRepositoryInterface interface {
	Search(ctx context.Context, search *Search) ([]*Hit, error)
}
