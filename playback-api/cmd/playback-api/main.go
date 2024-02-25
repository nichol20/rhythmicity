package main

import (
	"fmt"

	_ "github.com/lib/pq"
	database "github.com/nichol20/rhythmicity/playback-api/infrastructure/db"
)

func main() {
	db := database.ConnectToDb()
	rows, err := db.Query("SELECT * FROM styles")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Iterate over the rows
	for rows.Next() {
		var (
			id    int
			genre string
		)
		// Scan the values from the current row into variables
		err := rows.Scan(&id, &genre)
		if err != nil {
			panic(err)
		}
		// Print the values
		fmt.Printf("ID: %d, Genre: %s\n", id, genre)
	}

	// Check for errors during row iteration
	if err = rows.Err(); err != nil {
		panic(err)
	}
}
