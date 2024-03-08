-- name: GetYoutubeId :one
SELECT y.youtubeId FROM tracks t INNER JOIN track_data_youtube y ON t.youtubeDataId = y.id WHERE t.id = $1;

-- name: GetPopularTracks :many
SELECT 
	t.id trackId, t.albumId, t.explicit, t.playCount, t.spotifyId, t.lyrics,
	sp.title spotifyTitle, sp.popularity spotifyPopularity, sp.durationMs spotifyDurationMs,
    y.youtubeId, y.title youtubeTitle, y.durationMs youtubeDurationMs, y.publishedAt youtubePublishedAt,
    sy.viewCount youtubeViewCount, sy.likeCount youtubeLikeCount, sy.favoriteCount youtubeFavoriteCount, 
    sy.commentCount youtubeCommentCount
FROM tracks t
INNER JOIN track_data_spotify sp ON t.spotifyId = sp.id
INNER JOIN track_data_youtube y ON t.youtubeDataId = y.id
INNER JOIN track_statistics_youtube sy ON y.id = sy.youtubeDataId 
ORDER BY sp.popularity DESC 
LIMIT $1;

-- name: GetTrack :one
SELECT 
	t.id trackId, t.albumId, t.explicit, t.playCount, t.spotifyId, t.lyrics,
	sp.title spotifyTitle, sp.popularity spotifyPopularity, sp.durationMs spotifyDurationMs,
    y.youtubeId, y.title youtubeTitle, y.durationMs youtubeDurationMs, y.publishedAt youtubePublishedAt,
    sy.viewCount youtubeViewCount, sy.likeCount youtubeLikeCount, sy.favoriteCount youtubeFavoriteCount, 
    sy.commentCount youtubeCommentCount
FROM tracks t
INNER JOIN track_data_spotify sp ON t.spotifyId = sp.id
INNER JOIN track_data_youtube y ON t.youtubeDataId = y.id
INNER JOIN track_statistics_youtube sy ON y.id = sy.youtubeDataId
WHERE t.id = $1;

-- name: GetYoutubeThumbnails :many
SELECT * FROM track_thumbnails_youtube WHERE youtubeDataId = $1;

-- name: GetTrackGenres :many
SELECT genre FROM tracks_genres tg INNER JOIN genres g ON tg.genreId = g.id WHERE tg.trackId = $1;

-- name: GetTrackStyles :many
SELECT style FROM tracks_styles ts INNER JOIN styles s ON ts.styleId = s.id WHERE ts.trackId = $1;

-- name: GetTrackArtistIds :many
SELECT artistId FROM artists_tracks WHERE trackId = $1;

-- name: GetTracksByArtistId :many
SELECT 
	t.id trackId, t.albumId, t.explicit, t.playCount, t.spotifyId, t.lyrics,
	sp.title spotifyTitle, sp.popularity spotifyPopularity, sp.durationMs spotifyDurationMs,
    y.youtubeId, y.title youtubeTitle, y.durationMs youtubeDurationMs, y.publishedAt youtubePublishedAt,
    sy.viewCount youtubeViewCount, sy.likeCount youtubeLikeCount, sy.favoriteCount youtubeFavoriteCount, 
    sy.commentCount youtubeCommentCount
FROM artists_tracks at
INNER JOIN tracks t ON t.id = at.trackId
INNER JOIN track_data_spotify sp ON t.spotifyId = sp.id
INNER JOIN track_data_youtube y ON t.youtubeDataId = y.id
INNER JOIN track_statistics_youtube sy ON y.id = sy.youtubeDataId
WHERE at.artistId = $1;

-- name: GetTracksByAlbumId :many
SELECT 
	t.id trackId, t.albumId, t.explicit, t.playCount, t.spotifyId, t.lyrics,
	sp.title spotifyTitle, sp.popularity spotifyPopularity, sp.durationMs spotifyDurationMs,
    y.youtubeId, y.title youtubeTitle, y.durationMs youtubeDurationMs, y.publishedAt youtubePublishedAt,
    sy.viewCount youtubeViewCount, sy.likeCount youtubeLikeCount, sy.favoriteCount youtubeFavoriteCount, 
    sy.commentCount youtubeCommentCount
FROM tracks t
INNER JOIN track_data_spotify sp ON t.spotifyId = sp.id
INNER JOIN track_data_youtube y ON t.youtubeDataId = y.id
INNER JOIN track_statistics_youtube sy ON y.id = sy.youtubeDataId
WHERE t.albumId = $1;