package model

type PlaybackRepositoryInterface interface {
	Playback(id string) (string, error)
}
