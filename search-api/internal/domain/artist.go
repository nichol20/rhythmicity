package domain

type Artist struct {
	ID         string   `json:"id"`
	Name       string   `json:"name"`
	Genres     []string `json:"genres"`
	Styles     []string `json:"styles"`
	Images     []Image  `json:"images"`
	Popularity uint32   `json:"popularity"`
	Type       string   `json:"type"`
}
