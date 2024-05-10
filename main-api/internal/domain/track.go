package domain

import "github.com/google/uuid"

type SpotifyTrack struct {
	Spotify
	Title       string  `json:"title"`
	DurationMS  uint32  `json:"durationMs"`
	AlbumImages []Image `json:"albumImages"`
}

type YoutubeStatistcs struct {
	ViewCount     string `json:"viewCount"`
	LikeCount     string `json:"likeCount"`
	FavoriteCount string `json:"favoriteCount"`
	CommentCount  string `json:"commentCount"`
}

type YoutubeThumbnails struct {
	Default  Image `json:"default"`
	Medium   Image `json:"medium"`
	High     Image `json:"high"`
	Standard Image `json:"standard"`
	Maxres   Image `json:"maxres"`
}

type Youtube struct {
	ID          string            `json:"id"`
	Title       string            `json:"title"`
	DurationMs  uint32            `json:"durationMs"`
	PublishedAt string            `json:"publishedAt"`
	Statistics  YoutubeStatistcs  `json:"statistics"`
	Thumbnails  YoutubeThumbnails `json:"thumbnails"`
}

type Track struct {
	ID        uuid.UUID    `json:"id"`
	AlbumID   uuid.UUID    `json:"albumId"`
	Genres    []string     `json:"genres"`
	Styles    []string     `json:"styles"`
	Explicit  bool         `json:"explicit"`
	PlayCount uint64       `json:"playCount"`
	Spotify   SpotifyTrack `json:"spotify"`
	Youtube   Youtube      `json:"youtube"`
	Lyrics    string       `json:"lyrics"`
}

type SetupTrack struct {
	Track
	ArtistIds uuid.UUIDs `json:"artistIds"`
	AlbumId   uuid.UUID  `json:"albumId"`
}
