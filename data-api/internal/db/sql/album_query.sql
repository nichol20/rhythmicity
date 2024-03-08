-- name: GetAlbum :one
SELECT a.id albumId, a.name, a.totalTracks, a.spotifyId, sp.popularity spotifyPopularity, sp.releaseDate spotifyReleaseDate
FROM albums a
INNER JOIN album_data_spotify sp ON a.spotifyId = sp.id
WHERE a.id = $1;

-- name: GetAlbumSpotifyImages :many
SELECT url, width, height FROM album_images_spotify WHERE spotifyId = $1;

-- name: GetAlbumGenres :many
SELECT genre FROM albums_genres ag INNER JOIN genres g ON ag.genreId = g.id WHERE ag.albumId = $1;

-- name: GetAlbumStyles :many
SELECT style FROM albums_styles ast INNER JOIN styles s ON ast.styleId = s.id WHERE ast.albumId = $1;

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