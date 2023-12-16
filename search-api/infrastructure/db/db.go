package db

import (
	"io/ioutil"
	"os"

	"github.com/elastic/go-elasticsearch/v8"
)

func ConnectWithElasticsearch() *elasticsearch.Client {
	cert, _ := ioutil.ReadFile("./ca.crt")
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
		panic(err)
	}

	return es
}
