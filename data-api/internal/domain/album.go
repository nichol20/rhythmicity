package domain

import "github.com/google/uuid"

type SpotifyAlbum struct {
	Spotify
	Images      []Image `json:"images"`
	ReleaseDate string  `json:"releaseDate"`
}

type Album struct {
	ID          uuid.UUID    `json:"id"`
	Name        string       `json:"name"`
	ArtistIds   []string     `json:"artistIds"`
	TrackIds    []string     `json:"trackIds"`
	TotalTracks int          `json:"totalTracks"`
	Genres      []string     `json:"genres"`
	Styles      []string     `json:"styles"`
	Spotify     SpotifyAlbum `json:"spotify"`
	Type        string       `json:"type"`
}
