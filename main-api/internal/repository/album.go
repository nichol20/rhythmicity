package repository

import (
	"context"
	"database/sql"
	"errors"

	"github.com/google/uuid"
	db "github.com/nichol20/rhythmicity/main-api/internal/db/gen"
	"github.com/nichol20/rhythmicity/main-api/internal/domain"
	"github.com/nichol20/rhythmicity/main-api/internal/utils"
)

type AlbumRepository struct {
	queries *db.Queries
}

func NewAlbumRepository(dbconn *sql.DB) *AlbumRepository {
	return &AlbumRepository{
		queries: db.New(dbconn),
	}
}

type GetPopularAlbumsParams struct {
	Limit  uint32
	Offset uint32
}

func (r *AlbumRepository) GetPopularAlbums(ctx context.Context, arg GetPopularAlbumsParams) ([]domain.Album, error) {
	albumsRow, err := r.queries.GetPopularAlbums(ctx, db.GetPopularAlbumsParams{
		Limit:  int32(arg.Limit),
		Offset: int32(arg.Offset),
	})
	if err != nil {
		return nil, err
	}
	var albums []domain.Album
	for _, v := range albumsRow {
		album, err := r.createAlbum(ctx, v)
		if err != nil {
			return nil, err
		}
		albums = append(albums, *album)
	}
	return albums, err
}

func (r *AlbumRepository) GetAlbum(ctx context.Context, albumID string) (*domain.Album, error) {
	uuid, err := uuid.Parse(albumID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfAlbumExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	albumRow, err := r.queries.GetAlbum(ctx, uuid)
	if err != nil {
		return nil, err
	}
	album, err := r.createAlbum(ctx, albumRow)
	return album, err
}

func (r *AlbumRepository) GetSimplifiedAlbum(ctx context.Context, albumID string) (*domain.SimplifiedAlbum, error) {
	uuid, err := uuid.Parse(albumID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfAlbumExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	albumRow, err := r.queries.GetSimplifiedAlbum(ctx, uuid)
	if err != nil {
		return nil, err
	}

	return &domain.SimplifiedAlbum{
		ID:   albumRow.ID,
		Name: albumRow.Name,
	}, nil
}

func (r *AlbumRepository) GetSeveralAlbums(ctx context.Context, albumIDs []string) ([]domain.Album, error) {
	filteredIDs := utils.IDsToUUIDs(albumIDs)
	albumsRow, err := r.queries.GetSeveralAlbums(ctx, filteredIDs)
	if err != nil {
		return nil, err
	}
	var albums []domain.Album
	for _, v := range albumsRow {
		album, err := r.createAlbum(ctx, v)
		if err != nil {
			return nil, err
		}
		albums = append(albums, *album)
	}
	return albums, nil
}

func (r *AlbumRepository) GetAlbumByTrackId(ctx context.Context, trackID string) (*domain.Album, error) {
	uuid, err := uuid.Parse(trackID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfTrackExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	albumRow, err := r.queries.GetAlbumByTrackId(ctx, uuid)
	if err != nil {
		return nil, err
	}
	album, err := r.createAlbum(ctx, albumRow)
	return album, err
}

func (r *AlbumRepository) GetAlbumsByArtistId(ctx context.Context, artistID string) ([]domain.Album, error) {
	uuid, err := uuid.Parse(artistID)
	if err != nil {
		return nil, domain.ErrNotFound
	}
	if exists, err := r.queries.CheckIfArtistExists(ctx, uuid); err != nil {
		return nil, err
	} else if !exists {
		return nil, domain.ErrNotFound
	}
	albumsRow, err := r.queries.GetAlbumsByArtistId(ctx, uuid)
	if err != nil {
		return nil, err
	}
	var albums []domain.Album
	for _, v := range albumsRow {
		album, err := r.createAlbum(ctx, v)
		if err != nil {
			return nil, err
		}
		albums = append(albums, *album)
	}
	return albums, nil
}

func (r *AlbumRepository) createAlbum(ctx context.Context, row interface{}) (*domain.Album, error) {
	a, err := utils.TypeConverter[db.GetAlbumRow](row)
	if err != nil {
		return nil, errors.New("error converting row to db.GetAlbumRow")
	}
	details, err := r.getAlbumDetails(ctx, a.Albumid)
	if err != nil {
		return nil, err
	}

	return &domain.Album{
		ID:          a.Albumid,
		Name:        a.Name,
		TotalTracks: uint32(a.Totaltracks),
		Genres:      details.Genres,
		Styles:      details.Styles,
		Spotify: domain.SpotifyAlbum{
			Images:      details.Images,
			ReleaseDate: a.Spotifyreleasedate.String(),
			Spotify: domain.Spotify{
				ID:         a.Spotifyid,
				Popularity: uint32(a.Spotifypopularity),
			},
		},
	}, nil
}

type AlbumDetails struct {
	ArtistIds []uuid.UUID
	TrackIds  []uuid.UUID
	Genres    []string
	Styles    []string
	Images    []domain.Image
}

func (r *AlbumRepository) getAlbumDetails(ctx context.Context, albumID uuid.UUID) (*AlbumDetails, error) {
	genres, err := r.queries.GetAlbumGenres(ctx, albumID)
	if err != nil {
		return nil, err
	}
	styles, err := r.queries.GetAlbumStyles(ctx, albumID)
	if err != nil {
		return nil, err
	}
	images, err := r.getSpotifyImages(ctx, albumID)
	if err != nil {
		return nil, err
	}
	return &AlbumDetails{
		Genres: genres,
		Styles: styles,
		Images: images,
	}, nil
}

func (r *AlbumRepository) getSpotifyImages(ctx context.Context, albumID uuid.UUID) ([]domain.Image, error) {
	imagesRow, err := r.queries.GetAlbumSpotifyImages(ctx, albumID)
	if err != nil {
		return nil, err
	}

	var images []domain.Image
	for _, v := range imagesRow {
		image := domain.Image{
			Height: uint32(v.Height),
			Width:  uint32(v.Width),
			Url:    v.Url,
		}
		images = append(images, image)
	}

	return images, nil
}
