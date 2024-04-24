package domain

type Spotify struct {
	ID         string `json:"id"`
	Popularity uint32 `json:"popularity"`
}

type Image struct {
	Height uint32 `json:"height"`
	Width  uint32 `json:"width"`
	Url    string `json:"url"`
}
