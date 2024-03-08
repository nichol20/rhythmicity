-- name: GetArtist :one
SELECT 
	a.id artistId, a.name, a.spotifyId, sp.popularity spotifyPopularity
FROM artists a
INNER JOIN artist_data_spotify sp ON a.spotifyId = sp.id
WHERE a.id = $1;

-- name: GetArtistSpotifyImages :many
SELECT url, width, height FROM artist_images_spotify WHERE spotifyId = $1

-- name: GetArtistGenres :many
SELECT genre FROM artists_genres ag INNER JOIN genres g ON ag.genreId = g.id WHERE ag.artistId = $1;

-- name: GetArtistStyles :many
SELECT style FROM artists_styles ast INNER JOIN styles s ON ast.styleId = s.id WHERE ast.artistId = $1;

-- name: GetArtistsByTrackId :many
SELECT 
	a.id artistId, a.name, a.spotifyId, sp.popularity spotifyPopularity
FROM artists_tracks at
INNER JOIN artists a ON a.id = at.artistId
INNER JOIN artist_data_spotify sp ON a.spotifyId = sp.id
WHERE at.trackId = $1;

-- name: GetArtistsByAlbumId :many
SELECT 
	a.id artistId, a.name, a.spotifyId, sp.popularity spotifyPopularity
FROM artists_albums aral
INNER JOIN artists a ON aral.artistId = a.id
INNER JOIN artist_data_spotify sp ON a.spotifyId = sp.id
WHERE aral.albumId = $1;
