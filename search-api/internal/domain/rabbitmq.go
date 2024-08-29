package domain

type RabbitmqUpdatePlayCountMessage struct {
	ID        string `json:"id"`
	PlayCount uint64 `json:"playCount"`
}
