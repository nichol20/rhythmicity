package main

import (
	"context"
	"fmt"

	"github.com/joho/godotenv"
	"github.com/nichol20/rhythmicity/search-api/domain/model"
	"github.com/nichol20/rhythmicity/search-api/infrastructure/db"
	"github.com/nichol20/rhythmicity/search-api/infrastructure/repository"
)

func main() {
	godotenv.Load()
	Client := db.ConnectWithElasticsearch()
	fmt.Println("Connected with elastic")
	ctx := context.Background()

	searchRepository := repository.SearchRepository{
		ESClient: Client,
	}

	search := model.Search{
		Query: "Tyler",
	}

	hits, err := searchRepository.Search(ctx, &search)
	if err != nil {
		panic(err)
	}

	for _, hit := range hits {
		fmt.Printf("%+v\n", hit.Source)
	}
}
