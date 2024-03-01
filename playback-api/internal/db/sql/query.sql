-- name: GetYoutubeId :one
SELECT y.youtubeId FROM tracks t INNER JOIN track_data_youtube y ON t.youtubeDataId = y.id WHERE t.id = $1;