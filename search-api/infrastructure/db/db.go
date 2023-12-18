package db

import (
	"fmt"
	"log"
	"os"

	"github.com/elastic/go-elasticsearch/v8"
)

func ConnectWithElasticsearch() *elasticsearch.Client {
	cert, err := os.ReadFile("./ca.crt")
	if err != nil {
		log.Fatalf("Error reading cert: %s", err)
	}

	cfg := elasticsearch.Config{
		Addresses: []string{
			"https://localhost:9200",
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
