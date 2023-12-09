package db

import (
	"github.com/elastic/go-elasticsearch/v8"
)

func ConnectWithElasticsearch() *elasticsearch.Client {
	newClient, err := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{
			"http://localhost:9200",
		},
	})

	if err != nil {
		panic(err)
	}

	return newClient
}
