package model

type SpotifyArtist struct {
	Spotify
	Images []Image `json:"images"`
}

type Artist struct {
	ID      string        `json:"id"`
	Name    string        `json:"name"`
	Genres  []string      `json:"genres"`
	Styles  []string      `json:"styles"`
	Spotify SpotifyArtist `json:"spotify"`
	Type    string        `json:"type"`
}
