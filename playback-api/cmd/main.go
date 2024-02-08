package main

import (
	"fmt"

	_ "github.com/lib/pq"
	database "github.com/nichol20/rhythmicity/playback-api/infrastructure/db"
)

func main() {
	db := database.ConnectToDb()
	rows, err := db.Query("SELECT * FROM tabela")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Iterate over the rows
	for rows.Next() {
		var (
			id   int
			name string
		)
		// Scan the values from the current row into variables
		err := rows.Scan(&name, &id)
		if err != nil {
			panic(err)
		}
		// Print the values
		fmt.Printf("ID: %d, Name: %s\n", id, name)
	}

	// Check for errors during row iteration
	if err = rows.Err(); err != nil {
		panic(err)
	}
}
