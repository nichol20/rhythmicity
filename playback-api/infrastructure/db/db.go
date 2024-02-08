package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func ConnectToDb() *sql.DB {
	connection := fmt.Sprint(
		" host=db",
		" port=5432",
		" user=postgres",
		" password=postgres", // unecessary
		" dbname=postgres",
		" sslmode=verify-full",
		" sslrootcert=infrastructure/db/certs/root.crt",
		" sslkey=infrastructure/db/certs/client.key",
		" sslcert=infrastructure/db/certs/client.crt",
	)

	db, err := sql.Open("postgres", connection)
	if err != nil {
		log.Fatalf("%s", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatalf("%s", err)
	}

	return db
}
