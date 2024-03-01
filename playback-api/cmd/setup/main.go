package main

import (
	"github.com/nichol20/rhythmicity/playback-api/internal/db"
	"github.com/nichol20/rhythmicity/playback-api/internal/repository"
)

func main() {
	database := db.ConnectToDb()
	dataStructure := repository.NewDataStructure()
	db.GenerateDump(dataStructure, database)
}
