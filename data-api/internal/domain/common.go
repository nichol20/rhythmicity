package domain

type Spotify struct {
	ID         string `json:"id"`
	Popularity int    `json:"popularity"`
}

type Image struct {
	Height int    `json:"height"`
	Width  int    `json:"width"`
	Url    string `json:"url"`
}
