package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/elastic/go-elasticsearch/v8/esapi"
	"github.com/elastic/go-elasticsearch/v8/esutil"
	"github.com/joho/godotenv"
	"github.com/nichol20/rhythmicity/search-api/internal/db"
	"github.com/nichol20/rhythmicity/search-api/internal/domain"
)

func main() {
	godotenv.Load()
	client := db.ConnectWithElasticsearch()
	ctx := context.Background()

	indexTracks(ctx, client)
	indexArtists(ctx, client)
	indexAlbums(ctx, client)
}

func indexTracks(ctx context.Context, client *elasticsearch.Client) {
	indexName := "tracks"
	dbPath := getDbPath()
	tracks := getTracks()
	bulkIndexer := getBulkIndexer(client, indexName)

	mapping := getContentFromFile(dbPath + "/elastic/mappings/tracks.json")
	recreateElasticIndex(client, indexName, bytes.NewReader(mapping))

	for _, document := range tracks {
		data, err := json.Marshal(document)
		if err != nil {
			log.Fatalf("Cannot encode track '%s': %s", document.Name, err)
		}

		err = bulkIndexer.Add(
			ctx,
			esutil.BulkIndexerItem{
				Action:     "index",
				DocumentID: document.ID,
				Body:       bytes.NewReader(data),
			},
		)
		if err != nil {
			log.Fatal(err)
		}
	}

	bulkIndexer.Close(ctx)
	biStats := bulkIndexer.Stats()
	fmt.Printf("%s indexed on Elasticsearch: %d \n", indexName, biStats.NumIndexed)
}

func indexArtists(ctx context.Context, client *elasticsearch.Client) {
	indexName := "artists"
	dbPath := getDbPath()
	artists := getArtists()
	bulkIndexer := getBulkIndexer(client, indexName)

	mapping := getContentFromFile(dbPath + "/elastic/mappings/artists.json")
	recreateElasticIndex(client, indexName, bytes.NewReader(mapping))

	for _, document := range artists {
		data, err := json.Marshal(document)
		if err != nil {
			log.Fatalf("Cannot encode artist '%s': %s", document.Name, err)
		}

		err = bulkIndexer.Add(
			ctx,
			esutil.BulkIndexerItem{
				Action:     "index",
				DocumentID: document.ID,
				Body:       bytes.NewReader(data),
			},
		)
		if err != nil {
			log.Fatal(err)
		}
	}

	bulkIndexer.Close(ctx)
	biStats := bulkIndexer.Stats()
	fmt.Printf("%s indexed on Elasticsearch: %d \n", indexName, biStats.NumIndexed)
}

func indexAlbums(ctx context.Context, client *elasticsearch.Client) {
	indexName := "albums"
	dbPath := getDbPath()
	albums := getAlbums()
	bulkIndexer := getBulkIndexer(client, indexName)

	mapping := getContentFromFile(dbPath + "/elastic/mappings/albums.json")
	recreateElasticIndex(client, indexName, bytes.NewReader(mapping))

	for _, document := range albums {
		data, err := json.Marshal(document)
		if err != nil {
			log.Fatalf("Cannot encode album '%s': %s", document.Name, err)
		}

		err = bulkIndexer.Add(
			ctx,
			esutil.BulkIndexerItem{
				Action:     "index",
				DocumentID: document.ID,
				Body:       bytes.NewReader(data),
			},
		)
		if err != nil {
			log.Fatal(err)
		}
	}

	bulkIndexer.Close(ctx)
	biStats := bulkIndexer.Stats()
	fmt.Printf("%s indexed on Elasticsearch: %d \n", indexName, biStats.NumIndexed)
}

func recreateElasticIndex(client *elasticsearch.Client, indexName string, mapping io.Reader) {
	var (
		res *esapi.Response
		err error
	)
	if res, err = client.Indices.Delete([]string{indexName}, client.Indices.Delete.WithIgnoreUnavailable(true)); err != nil || res.IsError() {
		log.Fatalf("Cannot delete index: %s", err)
	}
	res.Body.Close()

	res, err = client.Indices.Create(indexName, client.Indices.Create.WithBody(mapping))
	if err != nil {
		log.Fatalf("Cannot create index: %s", err)
	}
	if res.IsError() {
		log.Fatalf("Cannot create index: %s", res)
	}
	res.Body.Close()
}

func getBulkIndexer(client *elasticsearch.Client, indexName string) esutil.BulkIndexer {
	bulkIndexer, err := esutil.NewBulkIndexer(esutil.BulkIndexerConfig{
		Index:      indexName,
		Client:     client,
		NumWorkers: runtime.NumCPU(),
	})
	if err != nil {
		log.Fatalf("Error creating bulk indexer: %s", err)
	}

	return bulkIndexer
}

func getTracks() []domain.Track {
	var tracks []domain.Track
	getDataFromFile("/data/tracks.json", &tracks)
	return tracks
}

func getArtists() []domain.Artist {
	var artists []domain.Artist
	getDataFromFile("/data/artists.json", &artists)
	return artists
}

func getAlbums() []domain.Album {
	var albums []domain.Album
	getDataFromFile("/data/albums.json", &albums)
	return albums
}

func getDataFromFile(filePath string, data interface{}) {
	dbPath := getDbPath()
	content := getContentFromFile(dbPath + filePath)

	if err := json.Unmarshal(content, &data); err != nil {
		log.Fatal(err)
	}
}

func getContentFromFile(path string) []byte {
	// Open file
	file, err := os.Open(path)
	if err != nil {
		log.Fatalf("Error opening file %s: %s", path, err)
	}
	defer file.Close()

	// Read the file content
	content, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("Error reading file %s: %s", path, err)
	}

	return content
}

func getDbPath() string {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Unable to get the current filename")
	}
	dirname := filepath.Dir(filename)
	absPath, err := filepath.Abs(dirname + "/../../internal/db")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}
	return absPath
}
