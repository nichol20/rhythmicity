package domain

import "errors"

var (
	ErrInternalServerError = errors.New("internal server error")
	ErrNotFound            = errors.New("not found")
	ErrBadRequest          = errors.New("bad request")
)
