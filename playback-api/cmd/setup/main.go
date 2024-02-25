package main

import (
	"github.com/nichol20/rhythmicity/playback-api/infrastructure/db"
	"github.com/nichol20/rhythmicity/playback-api/infrastructure/repository"
)

func main() {
	database := db.ConnectToDb()
	dataStructure := repository.NewDataStructure()
	db.GenerateDump(dataStructure, database)
}
