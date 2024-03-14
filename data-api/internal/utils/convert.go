package utils

import (
	"encoding/json"

	"github.com/nichol20/rhythmicity/data-api/internal/domain"
	"github.com/nichol20/rhythmicity/data-api/internal/pb"
)

func TypeConverter[R any](data any) (*R, error) {
	var result R
	b, err := json.Marshal(&data)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(b, &result)
	if err != nil {
		return nil, err
	}
	return &result, err
}

func ImagesToMessage(images []domain.Image) []*pb.Image {
	var i []*pb.Image
	for _, v := range images {
		i = append(i, &pb.Image{
			Height: v.Height,
			Width:  v.Width,
			Url:    v.Url,
		})
	}
	return i
}
