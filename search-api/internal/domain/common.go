package domain

type Image struct {
	Width  uint32 `json:"width"`
	Height uint32 `json:"height"`
	Url    string `json:"url"`
}
