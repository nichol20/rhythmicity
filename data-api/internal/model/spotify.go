package model

type Spotify struct {
	ID         string `json:"id"`
	Title      string `json:"title"`
	Popularity int    `json:"popularity"`
}
