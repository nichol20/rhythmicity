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

	"github.com/elastic/go-elasticsearch/v8/esutil"
	"github.com/joho/godotenv"
	"github.com/nichol20/rhythmicity/search-api/internal/db"
	"github.com/nichol20/rhythmicity/search-api/internal/domain"
)

func main() {
	godotenv.Load()
	client := db.ConnectWithElasticsearch()
	ctx := context.Background()

	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Unable to get the current filename")
	}
	dirname := filepath.Dir(filename)
	absPath, err := filepath.Abs(dirname + "/../../internal/data/tracks.json")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}

	// Open file
	tracksFile, err := os.Open(absPath)
	if err != nil {
		log.Fatal(err)
	}
	defer tracksFile.Close()

	// Read the file content
	content, err := io.ReadAll(tracksFile)
	if err != nil {
		log.Fatal(err)
	}

	// Parse the JSON content
	var tracks []domain.Track

	if err := json.Unmarshal(content, &tracks); err != nil {
		log.Fatal(err)
	}

	// Create a bulk indexer
	bulkIndexer, err := esutil.NewBulkIndexer(esutil.BulkIndexerConfig{
		Index:      "tracks",
		Client:     client,
		NumWorkers: 5,
	})
	if err != nil {
		log.Fatal(err)
	}

	// Loop and add documents to the bulk indexer
	for _, document := range tracks {
		data, err := json.Marshal(document)
		if err != nil {
			log.Fatalf("Cannot encode track %s: %s", document.TrackName, err)
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
	fmt.Printf("Tracks indexed on Elasticsearch: %d \n", biStats.NumIndexed)
}
