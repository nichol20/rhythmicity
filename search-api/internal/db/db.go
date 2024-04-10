package db

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/elastic/go-elasticsearch/v8"
)

func ConnectWithElasticsearch() *elasticsearch.Client {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Unable to get the current filename")
	}
	dirname := filepath.Dir(filename)
	absPath, err := filepath.Abs(dirname + "/certs/ca/ca.crt")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}
	cert, err := os.ReadFile(absPath)

	if err != nil {
		log.Fatalf("Error reading cert: %s", err)
	}

	cfg := elasticsearch.Config{
		Addresses: []string{
			"https://es01:9200",
		},
		Username: os.Getenv("ELASTIC_USER"),
		Password: os.Getenv("ELASTIC_PASSWORD"),
		CACert:   cert,
	}

	es, err := elasticsearch.NewClient(cfg)

	if err != nil {
		log.Fatalf("Error when connecting with elastic: %s", err)
	}

	fmt.Println("connected with elastic")
	return es
}
