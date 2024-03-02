package model

import "github.com/google/uuid"

type SpotifyTrack struct {
	Spotify
	DurationMS  int     `json:"durationMs"`
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

type YouTube struct {
	ID          string            `json:"id"`
	Title       string            `json:"title"`
	DurationMs  int               `json:"durationMs"`
	PublishedAt string            `json:"publishedAt"`
	Statistics  YoutubeStatistcs  `json:"statistics"`
	Thumbnails  YoutubeThumbnails `json:"thumbnails"`
}

type Track struct {
	ID        uuid.UUID    `json:"id"`
	ArtistIds []string     `json:"artistIds"`
	AlbumId   string       `json:"albumId"`
	Genres    []string     `json:"genres"`
	Styles    []string     `json:"styles"`
	Explicit  bool         `json:"explicit"`
	PlayCount int          `json:"playCount"`
	Spotify   SpotifyTrack `json:"spotify"`
	YouTube   YouTube      `json:"youtube"`
	Lyrics    string       `json:"lyrics"`
	Type      string       `json:"type"`
}
