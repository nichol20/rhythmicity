package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/nichol20/rhythmicity/auth-server/internal/db"
)

func main() {
	database := db.ConnectToDb()

	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Unable to get the current filename")
	}

	dirname := filepath.Dir(filename)
	absPath, err := filepath.Abs(dirname + "/../../internal/db/sql/init.sql")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}

	initSQL, err := os.ReadFile(absPath)
	if err != nil {
		log.Fatal("Error reading init.sql file:", err)
	}

	_, err = database.Query(string(initSQL))
	if err != nil {
		log.Fatal("Error when trying to dump data: ", err)
	}

	fmt.Println("setup completed successfully")
}
