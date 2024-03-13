-- name: CheckIfAlbumExists :one
SELECT EXISTS(SELECT 1 FROM albums WHERE id = $1) AS idExists;

-- name: GetPopularAlbums :many
SELECT a.id albumId, a.name, a.totalTracks, a.spotifyId, sp.popularity spotifyPopularity, sp.releaseDate spotifyReleaseDate
FROM albums a
INNER JOIN album_data_spotify sp ON a.spotifyId = sp.id
ORDER BY sp.popularity DESC
LIMIT $1;

-- name: GetAlbum :one
SELECT a.id albumId, a.name, a.totalTracks, a.spotifyId, sp.popularity spotifyPopularity, sp.releaseDate spotifyReleaseDate
FROM albums a
INNER JOIN album_data_spotify sp ON a.spotifyId = sp.id
WHERE a.id = $1;

-- name: GetAlbumSpotifyImages :many
SELECT ip.url, ip.width, ip.height 
FROM albums a
INNER JOIN album_images_spotify ip ON ip.spotifyId = a.spotifyId
WHERE a.id = $1;

-- name: GetAlbumGenres :many
SELECT genre FROM albums_genres ag INNER JOIN genres g ON ag.genreId = g.id WHERE ag.albumId = $1;

-- name: GetAlbumStyles :many
SELECT style FROM albums_styles ast INNER JOIN styles s ON ast.styleId = s.id WHERE ast.albumId = $1;

-- name: GetAlbumArtistIds :many
SELECT artistId FROM artists_albums WHERE albumId = $1;

-- name: GetAlbumTrackIds :many
SELECT id FROM tracks WHERE albumId = $1;

-- name: GetAlbumByTrackId :one
SELECT a.id albumId, a.name, a.totalTracks, a.spotifyId, sp.popularity spotifyPopularity, sp.releaseDate spotifyReleaseDate
FROM tracks t
INNER JOIN albums a ON t.albumId = a.id
INNER JOIN album_data_spotify sp ON a.spotifyId = sp.id
WHERE t.id = $1;

-- name: GetAlbumsByArtistId :many
SELECT a.id albumId, a.name, a.totalTracks, a.spotifyId, sp.popularity spotifyPopularity, sp.releaseDate spotifyReleaseDate
FROM artists_albums aral
INNER JOIN albums a ON aral.albumId = a.id
INNER JOIN album_data_spotify sp ON a.spotifyId = sp.id
WHERE aral.artistId = $1;