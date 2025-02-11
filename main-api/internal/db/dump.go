package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"reflect"
	"regexp"
	"runtime"
	"slices"
	"strconv"
	"strings"

	"github.com/nichol20/rhythmicity/main-api/internal/domain"
	"github.com/nichol20/rhythmicity/main-api/internal/repository"
)

func GenerateDump(ds *repository.DataStructure, db *sql.DB) {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		log.Fatal("Unable to get the current filename")
	}

	dirname := filepath.Dir(filename)
	initSQLAbsPath, err := filepath.Abs(dirname + "/sql/init.sql")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}

	initSQL, err := os.ReadFile(initSQLAbsPath)
	if err != nil {
		log.Fatal("Error reading init.sql file:", err)
	}

	dropAllSQLAbsPath, err := filepath.Abs(dirname + "/sql/drop_all.sql")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}

	dropAllSQL, err := os.ReadFile(dropAllSQLAbsPath)
	if err != nil {
		log.Fatal("Error reading drop_all.sql file:", err)
	}

	tableInsertions := make(map[string]string)
	var insertOrder []string

	tableRegex := regexp.MustCompile(`CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\);`)
	matches := tableRegex.FindAllStringSubmatch(string(initSQL), -1)
	for _, match := range matches {
		tableName := match[1]
		insertOrder = append(insertOrder, tableName)
		columns := strings.Split(strings.TrimSpace(match[2]), "\n")
		var columnNames []string
		for _, column := range columns {
			column = strings.TrimSpace(column)
			if strings.Contains(column, "FOREIGN") || strings.Contains(column, "SERIAL") || strings.Split(column, " ")[0] == "PRIMARY" {
				continue
			}

			columnRegex := regexp.MustCompile(`^(\w+)`)
			columnMatch := columnRegex.FindStringSubmatch(column)
			if len(columnMatch) > 1 {
				columnNames = append(columnNames, columnMatch[1])
			}
		}
		tableInsertions[tableName] = formatInsert(tableName, strings.Join(columnNames, ", "))
	}

	for i, genre := range ds.Genres {
		tableInsertions["genres"] += fmt.Sprintf("('%s')", genre) + addEndOfLine(i, len(ds.Genres))
	}

	for i, style := range ds.Styles {
		tableInsertions["styles"] += fmt.Sprintf("('%s')", style) + addEndOfLine(i, len(ds.Styles))
	}

	for i, artist := range ds.Artists {
		endOfLine := addEndOfLine(i, len(ds.Artists))

		tableInsertions["artist_data_spotify"] += fmt.Sprintf(
			"('%s', %d)",
			artist.Spotify.ID, artist.Spotify.Popularity,
		) + endOfLine

		for j, image := range artist.Spotify.Images {
			end := endOfLine
			if len(artist.Spotify.Images)-1 != j {
				end = ",\n"
			}
			tableInsertions["artist_images_spotify"] += fmt.Sprintf(
				"('%s', %d, %d, '%s')",
				image.Url, image.Width, image.Height, artist.Spotify.ID,
			) + end

		}

		tableInsertions["artists"] += fmt.Sprintf(
			"('%s', '%s', '%s')",
			artist.ID, handleSingleQuotationMark(artist.Name), artist.Spotify.ID,
		) + endOfLine

		for j, genre := range artist.Genres {
			end := endOfLine
			if len(artist.Genres)-1 != j {
				end = ",\n"
			}
			genreId := slices.Index(ds.Genres, genre) + 1
			if genreId == 0 {
				log.Fatal("Genre not found.")
			}
			tableInsertions["artists_genres"] += fmt.Sprintf(
				"('%s', %d)",
				artist.ID, genreId,
			) + end
		}

		for j, style := range artist.Styles {
			end := endOfLine
			if len(artist.Styles)-1 != j {
				end = ",\n"
			}

			styleId := slices.Index(ds.Styles, style) + 1
			if styleId == 0 {
				log.Fatal("Style not found.")
			}
			tableInsertions["artists_styles"] += fmt.Sprintf(
				"('%s', %d)",
				artist.ID, styleId,
			) + end
		}
	}

	for i, album := range ds.Albums {
		endOfLine := addEndOfLine(i, len(ds.Albums))

		tableInsertions["album_data_spotify"] += fmt.Sprintf(
			"('%s', %d, '%s')",
			album.Spotify.ID, album.Spotify.Popularity, album.Spotify.ReleaseDate,
		) + endOfLine

		for j, image := range album.Spotify.Images {
			end := endOfLine
			if len(album.Spotify.Images)-1 != j {
				end = ",\n"
			}
			tableInsertions["album_images_spotify"] += fmt.Sprintf(
				"('%s', %d, %d, '%s')",
				image.Url, image.Width, image.Height, album.Spotify.ID,
			) + end
		}

		tableInsertions["albums"] += fmt.Sprintf(
			"('%s', '%s', %d, '%s')",
			album.ID, handleSingleQuotationMark(album.Name), album.TotalTracks, album.Spotify.ID,
		) + endOfLine

		for j, genre := range album.Genres {
			end := endOfLine
			if len(album.Genres)-1 != j {
				end = ",\n"
			}
			genreId := slices.Index(ds.Genres, genre) + 1
			if genreId == 0 {
				log.Fatal("Genre not found.")
			}
			tableInsertions["albums_genres"] += fmt.Sprintf(
				"('%s', %d)",
				album.ID, genreId,
			) + end
		}

		for j, style := range album.Styles {
			end := endOfLine
			if len(album.Styles)-1 != j {
				end = ",\n"
			}
			styleId := slices.Index(ds.Styles, style) + 1
			if styleId == 0 {
				log.Fatal("Style not found.")
			}
			tableInsertions["albums_styles"] += fmt.Sprintf(
				"('%s', %d)",
				album.ID, styleId,
			) + end
		}

		for j, artistId := range album.ArtistIds {
			end := endOfLine
			if len(album.ArtistIds)-1 != j {
				end = ",\n"
			}

			tableInsertions["artists_albums"] += fmt.Sprintf(
				"('%s', '%s')",
				artistId,
				album.ID,
			) + end
		}
	}

	for i, track := range ds.Tracks {
		endOfLine := addEndOfLine(i, len(ds.Tracks))

		tableInsertions["track_data_youtube"] += fmt.Sprintf(
			"('%s', '%s', '%s', %d, '%s' )",
			track.ID,
			track.Youtube.ID,
			handleSingleQuotationMark(track.Youtube.Title),
			track.Youtube.DurationMs,
			track.Youtube.PublishedAt,
		) + endOfLine

		tableInsertions["track_statistics_youtube"] += fmt.Sprintf(
			"('%s', '%s', '%s', '%s', '%s', '%s')",
			track.ID,
			track.Youtube.Statistics.ViewCount,
			track.Youtube.Statistics.LikeCount,
			track.Youtube.Statistics.FavoriteCount,
			track.Youtube.Statistics.CommentCount,
			track.ID,
		) + endOfLine

		values := reflect.ValueOf(track.Youtube.Thumbnails)
		types := values.Type()
		for j := 0; j < values.NumField(); j++ {
			end := endOfLine
			if values.NumField()-1 != j {
				end = ",\n"
			}

			fieldValue := values.Field(j).Interface().(domain.Image)
			tableInsertions["track_thumbnails_youtube"] += fmt.Sprintf(
				"('%s', %d, %d, '%s', '%s')",
				fieldValue.Url,
				fieldValue.Width,
				fieldValue.Height,
				strings.ToLower(types.Field(j).Name),
				track.ID,
			) + end
		}

		tableInsertions["track_data_spotify"] += fmt.Sprintf(
			"('%s', '%s', %d, %d)",
			track.Spotify.ID,
			handleSingleQuotationMark(track.Spotify.Title),
			track.Spotify.Popularity,
			track.Spotify.DurationMS,
		) + endOfLine

		tableInsertions["tracks"] += fmt.Sprintf(
			"('%s', '%s', %t, %d, '%s', '%s', '%s')",
			track.ID,
			track.AlbumId,
			track.Explicit,
			track.PlayCount,
			track.Spotify.ID,
			track.ID,
			strconv.Quote(handleSingleQuotationMark(track.Lyrics)),
		) + endOfLine

		for j, genre := range track.Genres {
			end := endOfLine
			if len(track.Genres)-1 != j {
				end = ",\n"
			}
			genreId := slices.Index(ds.Genres, genre) + 1
			if genreId == 0 {
				log.Fatal("Genre not found.")
			}
			tableInsertions["tracks_genres"] += fmt.Sprintf(
				"('%s', %d)",
				track.ID, genreId,
			) + end
		}

		for j, style := range track.Styles {
			end := endOfLine
			if len(track.Styles)-1 != j {
				end = ",\n"
			}
			styleId := slices.Index(ds.Styles, style) + 1
			if styleId == 0 {
				log.Fatal("Style not found.")
			}
			tableInsertions["tracks_styles"] += fmt.Sprintf(
				"('%s', %d)",
				track.ID, styleId,
			) + end
		}

		for j, artistId := range track.ArtistIds {
			end := endOfLine
			if len(track.ArtistIds)-1 != j {
				end = ",\n"
			}

			tableInsertions["artists_tracks"] += fmt.Sprintf(
				"('%s', '%s')",
				artistId,
				track.ID,
			) + end
		}
	}

	dumpSQL := ""
	for _, key := range insertOrder {
		if tableInsertions[key] == "" {
			log.Fatal("Error when trying to access tableInsertions: key not found!")
		}

		dumpSQL += tableInsertions[key]
	}

	dumpSQL = string(initSQL) + "\n\n" + dumpSQL

	dumpSQLAbsPath, err := filepath.Abs(dirname + "/sql/dump.sql")
	if err != nil {
		log.Fatalf("Error when converting to absolute path: %s", err)
	}

	err = os.WriteFile(dumpSQLAbsPath, []byte(dumpSQL), 0644)
	if err != nil {
		fmt.Println("Error writing dump.sql file:", err)
		return
	}
	fmt.Println("Dump file created successfully.")

	// reset database
	db.Query(string(dropAllSQL))

	_, err = db.Query(dumpSQL)
	if err != nil {
		log.Fatal("Error when trying to dump data: ", err)
	}
	fmt.Println("Dumped successfully into database")

}

func formatInsert(table, columns string) string {
	return fmt.Sprintf("INSERT INTO %s (%s) VALUES \n", table, columns)
}

func handleSingleQuotationMark(str string) string {
	return strings.ReplaceAll(str, "'", "''")
}

func addEndOfLine(currentIndex, arrLength int) string {
	if currentIndex == arrLength-1 {
		return ";\n\n"
	}
	return ",\n"
}
