package repository

import (
	"encoding/json"
	"log"
	"os"
	"path/filepath"
	"runtime"
)

type Image struct {
	Height int    `json:"height"`
	Width  int    `json:"width"`
	Url    string `json:"url"`
}

type Spotify struct {
	ID         string `json:"id"`
	Title      string `json:"title"`
	Popularity int    `json:"popularity"`
}

type SpotifyTrack struct {
	Spotify
	DurationMS  int     `json:"durationMs"`
	AlbumImages []Image `json:"albumImages"`
}

type SpotifyArtist struct {
	Spotify
	Images []Image `json:"images"`
}

type SpotifyAlbum struct {
	Spotify
	Images      []Image `json:"images"`
	ReleaseDate string  `json:"releaseDate"`
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
	ID        string       `json:"id"`
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

type Artist struct {
	ID      string        `json:"id"`
	Name    string        `json:"name"`
	Genres  []string      `json:"genres"`
	Styles  []string      `json:"styles"`
	Spotify SpotifyArtist `json:"spotify"`
	Type    string        `json:"type"`
}

type Album struct {
	ID          string       `json:"id"`
	Name        string       `json:"name"`
	ArtistIds   []string     `json:"artistIds"`
	TrackIds    []string     `json:"trackIds"`
	TotalTracks int          `json:"totalTracks"`
	Genres      []string     `json:"genres"`
	Styles      []string     `json:"styles"`
	Spotify     SpotifyAlbum `json:"spotify"`
	Type        string       `json:"type"`
}

type DataStructure struct {
	dataPath string
	Tracks   []Track  `json:"tracks"`
	Artists  []Artist `json:"artists"`
	Albums   []Album  `json:"albums"`
	Genres   []string `json:"genres"`
	Styles   []string `json:"styles"`
}

func NewDataStructure() *DataStructure {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Unable to get the current filename")
	}

	dirname := filepath.Dir(filename)
	dataAbsPath, err := filepath.Abs(dirname + "/../db/data/app")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}

	db := &DataStructure{
		dataPath: dataAbsPath,
	}
	if err := db.LoadData(); err != nil {
		log.Fatalf("Error when loading db data: %s", err)
	}

	return db
}

func (d *DataStructure) LoadData() error {
	tracksData, err := os.ReadFile(filepath.Join(d.dataPath, "tracks.json"))
	if err != nil {
		return err
	}
	if err := json.Unmarshal(tracksData, &d.Tracks); err != nil {
		return err
	}

	artistsData, err := os.ReadFile(filepath.Join(d.dataPath, "artists.json"))
	if err != nil {
		return err
	}
	if err := json.Unmarshal(artistsData, &d.Artists); err != nil {
		return err
	}

	albumsData, err := os.ReadFile(filepath.Join(d.dataPath, "albums.json"))
	if err != nil {
		return err
	}
	if err := json.Unmarshal(albumsData, &d.Albums); err != nil {
		return err
	}

	genresData, err := os.ReadFile(filepath.Join(d.dataPath, "genres.json"))
	if err != nil {
		return err
	}
	if err := json.Unmarshal(genresData, &d.Genres); err != nil {
		return err
	}

	stylesData, err := os.ReadFile(filepath.Join(d.dataPath, "styles.json"))
	if err != nil {
		return err
	}
	if err := json.Unmarshal(stylesData, &d.Styles); err != nil {
		return err
	}

	return nil
}
