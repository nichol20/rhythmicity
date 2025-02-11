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
	TotalTracks uint32       `json:"totalTracks"`
	Genres      []string     `json:"genres"`
	Styles      []string     `json:"styles"`
	Spotify     SpotifyAlbum `json:"spotify"`
}

type SimplifiedAlbum struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

type SetupAlbum struct {
	Album
	ArtistIds uuid.UUIDs `json:"artistIds"`
	TrackIds  uuid.UUIDs `json:"trackIds"`
}
