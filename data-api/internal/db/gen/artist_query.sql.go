// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: artist_query.sql

package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const checkIfArtistExists = `-- name: CheckIfArtistExists :one
SELECT EXISTS(SELECT 1 FROM artists WHERE id = $1) AS idExists
`

func (q *Queries) CheckIfArtistExists(ctx context.Context, id uuid.UUID) (bool, error) {
	row := q.db.QueryRowContext(ctx, checkIfArtistExists, id)
	var idexists bool
	err := row.Scan(&idexists)
	return idexists, err
}

const getArtist = `-- name: GetArtist :one
SELECT 
	a.id artistId, a.name, a.spotifyId, sp.popularity spotifyPopularity
FROM artists a
INNER JOIN artist_data_spotify sp ON a.spotifyId = sp.id
WHERE a.id = $1
`

type GetArtistRow struct {
	Artistid          uuid.UUID
	Name              string
	Spotifyid         sql.NullString
	Spotifypopularity int32
}

func (q *Queries) GetArtist(ctx context.Context, id uuid.UUID) (GetArtistRow, error) {
	row := q.db.QueryRowContext(ctx, getArtist, id)
	var i GetArtistRow
	err := row.Scan(
		&i.Artistid,
		&i.Name,
		&i.Spotifyid,
		&i.Spotifypopularity,
	)
	return i, err
}

const getArtistGenres = `-- name: GetArtistGenres :many
SELECT genre FROM artists_genres ag INNER JOIN genres g ON ag.genreId = g.id WHERE ag.artistId = $1
`

func (q *Queries) GetArtistGenres(ctx context.Context, artistid uuid.UUID) ([]string, error) {
	rows, err := q.db.QueryContext(ctx, getArtistGenres, artistid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []string
	for rows.Next() {
		var genre string
		if err := rows.Scan(&genre); err != nil {
			return nil, err
		}
		items = append(items, genre)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getArtistSpotifyImages = `-- name: GetArtistSpotifyImages :many
SELECT ip.url, ip.width, ip.height 
FROM artists a
INNER JOIN artist_images_spotify ip ON ip.spotifyId = a.spotifyId
WHERE a.id = $1
`

type GetArtistSpotifyImagesRow struct {
	Url    string
	Width  int32
	Height int32
}

func (q *Queries) GetArtistSpotifyImages(ctx context.Context, id uuid.UUID) ([]GetArtistSpotifyImagesRow, error) {
	rows, err := q.db.QueryContext(ctx, getArtistSpotifyImages, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetArtistSpotifyImagesRow
	for rows.Next() {
		var i GetArtistSpotifyImagesRow
		if err := rows.Scan(&i.Url, &i.Width, &i.Height); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getArtistStyles = `-- name: GetArtistStyles :many
SELECT style FROM artists_styles ast INNER JOIN styles s ON ast.styleId = s.id WHERE ast.artistId = $1
`

func (q *Queries) GetArtistStyles(ctx context.Context, artistid uuid.UUID) ([]string, error) {
	rows, err := q.db.QueryContext(ctx, getArtistStyles, artistid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []string
	for rows.Next() {
		var style string
		if err := rows.Scan(&style); err != nil {
			return nil, err
		}
		items = append(items, style)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getArtistsByAlbumId = `-- name: GetArtistsByAlbumId :many
SELECT 
	a.id artistId, a.name, a.spotifyId, sp.popularity spotifyPopularity
FROM artists_albums aral
INNER JOIN artists a ON aral.artistId = a.id
INNER JOIN artist_data_spotify sp ON a.spotifyId = sp.id
WHERE aral.albumId = $1
`

type GetArtistsByAlbumIdRow struct {
	Artistid          uuid.UUID
	Name              string
	Spotifyid         sql.NullString
	Spotifypopularity int32
}

func (q *Queries) GetArtistsByAlbumId(ctx context.Context, albumid uuid.UUID) ([]GetArtistsByAlbumIdRow, error) {
	rows, err := q.db.QueryContext(ctx, getArtistsByAlbumId, albumid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetArtistsByAlbumIdRow
	for rows.Next() {
		var i GetArtistsByAlbumIdRow
		if err := rows.Scan(
			&i.Artistid,
			&i.Name,
			&i.Spotifyid,
			&i.Spotifypopularity,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getArtistsByTrackId = `-- name: GetArtistsByTrackId :many
SELECT 
	a.id artistId, a.name, a.spotifyId, sp.popularity spotifyPopularity
FROM artists_tracks at
INNER JOIN artists a ON a.id = at.artistId
INNER JOIN artist_data_spotify sp ON a.spotifyId = sp.id
WHERE at.trackId = $1
`

type GetArtistsByTrackIdRow struct {
	Artistid          uuid.UUID
	Name              string
	Spotifyid         sql.NullString
	Spotifypopularity int32
}

func (q *Queries) GetArtistsByTrackId(ctx context.Context, trackid uuid.UUID) ([]GetArtistsByTrackIdRow, error) {
	rows, err := q.db.QueryContext(ctx, getArtistsByTrackId, trackid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetArtistsByTrackIdRow
	for rows.Next() {
		var i GetArtistsByTrackIdRow
		if err := rows.Scan(
			&i.Artistid,
			&i.Name,
			&i.Spotifyid,
			&i.Spotifypopularity,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getPopularArtists = `-- name: GetPopularArtists :many
SELECT 
	a.id artistId, a.name, a.spotifyId, sp.popularity spotifyPopularity
FROM artists a
INNER JOIN artist_data_spotify sp ON a.spotifyId = sp.id
ORDER BY sp.popularity DESC
LIMIT $1
`

type GetPopularArtistsRow struct {
	Artistid          uuid.UUID
	Name              string
	Spotifyid         sql.NullString
	Spotifypopularity int32
}

func (q *Queries) GetPopularArtists(ctx context.Context, limit int32) ([]GetPopularArtistsRow, error) {
	rows, err := q.db.QueryContext(ctx, getPopularArtists, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetPopularArtistsRow
	for rows.Next() {
		var i GetPopularArtistsRow
		if err := rows.Scan(
			&i.Artistid,
			&i.Name,
			&i.Spotifyid,
			&i.Spotifypopularity,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
