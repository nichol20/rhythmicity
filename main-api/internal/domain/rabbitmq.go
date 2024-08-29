package domain

import "github.com/google/uuid"

type RabbitmqUpdatePlayCountMessage struct {
	ID        uuid.UUID `json:"id"`
	PlayCount uint64    `json:"playCount"`
}
