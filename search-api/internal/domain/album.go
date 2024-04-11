package domain

type Album struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	ArtistNames []string `json:"artistNames"`
	Genres      []string `json:"genres"`
	Styles      []string `json:"styles"`
	ReleaseDate string   `json:"releaseDate"`
	TotalTracks uint32   `json:"totalTracks"`
	Images      []Image  `json:"images"`
	Popularity  uint32   `json:"popularity"`
	Type        string   `json:"type"`
}
