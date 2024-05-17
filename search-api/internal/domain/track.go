package domain

type Track struct {
	ID         string             `json:"id"`
	Name       string             `json:"name"`
	Artists    []SimplifiedArtist `json:"artists"`
	Album      SimplifiedAlbum    `json:"album"`
	Lyrics     string             `json:"lyrics"`
	Explicit   bool               `json:"explicit"`
	PlayCount  uint64             `json:"playCount"`
	DurationMs uint32             `json:"durationMs"`
	Genres     []string           `json:"genres"`
	Styles     []string           `json:"styles"`
	Images     []Image            `json:"images"`
	Type       string             `json:"type"`
}
