package repository

import (
	"encoding/json"
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/nichol20/rhythmicity/data-api/internal/domain"
)

type DataStructure struct {
	dataPath string
	Tracks   []domain.SetupTrack `json:"tracks"`
	Artists  []domain.Artist     `json:"artists"`
	Albums   []domain.SetupAlbum `json:"albums"`
	Genres   []string            `json:"genres"`
	Styles   []string            `json:"styles"`
}

func NewDataStructure() *DataStructure {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Unable to get the current filename")
	}

	dirname := filepath.Dir(filename)
	dataAbsPath, err := filepath.Abs(dirname + "/../db/data")
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
