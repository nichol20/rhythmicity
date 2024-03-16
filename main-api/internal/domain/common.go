package domain

type Spotify struct {
	ID         string `json:"id"`
	Popularity int32  `json:"popularity"`
}

type Image struct {
	Height int32  `json:"height"`
	Width  int32  `json:"width"`
	Url    string `json:"url"`
}
