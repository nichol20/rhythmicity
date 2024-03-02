package model

import "github.com/google/uuid"

type SpotifyArtist struct {
	Spotify
	Images []Image `json:"images"`
}

type Artist struct {
	ID      uuid.UUID     `json:"id"`
	Name    string        `json:"name"`
	Genres  []string      `json:"genres"`
	Styles  []string      `json:"styles"`
	Spotify SpotifyArtist `json:"spotify"`
	Type    string        `json:"type"`
}
