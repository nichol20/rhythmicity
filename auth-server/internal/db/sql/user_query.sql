-- name: GetUser :one
SELECT * FROM users WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = $1;

-- name: CreateUser :one
INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;

-- name: CheckIfEmailExists :one
SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) AS emailExists;