package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func ConnectToDb() *sql.DB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	dbname := os.Getenv("DB_NAME")
	sslmode := "verify-full"
	sslrootcert := os.Getenv("DB_ROOT_CERT")
	sslkey := os.Getenv("DB_SSL_KEY")
	sslcert := os.Getenv("DB_SSL_CERT")

	connection := fmt.Sprintf(
		"host=%s port=%s user=%s dbname=%s sslmode=%s sslrootcert=%s sslkey=%s sslcert=%s",
		host, port, user, dbname, sslmode, sslrootcert, sslkey, sslcert,
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
