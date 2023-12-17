package model

type Track struct {
	ID          string   `json:"id"`
	TrackName   string   `json:"trackName"`
	ArtistNames []string `json:"artistNames"`
	AlbumName   string   `json:"albumName"`
	Lyrics      string   `json:"lyrics"`
	Explicit    bool     `json:"explicit"`
	PlayCount   int64    `json:"playCount"`
	Genres      []string `json:"genres"`
	ImageUrl    string   `json:"imageUrl"`
}
